use fltk::{
    app,
    enums::{Color, Event, Font, Key, Shortcut},
    prelude::{DisplayExt, WidgetBase},
    text::{SimpleTerminal, StyleTableEntry, TextBuffer},
    utils,
};
use std::io::{BufRead, BufReader};

use std::process::{Command, Stdio};

pub trait TerminalFuncs {
    fn append_txt(&mut self, txt: &str);
    fn append_dir(&mut self, dir: &str);
    fn append_error(&mut self, txt: &str);
    fn run_command(&mut self, cmd: &str, cwd: &mut String, receiver: app::Receiver<bool>);
}

impl TerminalFuncs for SimpleTerminal {
    fn append_txt(&mut self, txt: &str) {
        self.append(txt);
        self.style_buffer().unwrap().append(&"A".repeat(txt.len()));
    }

    fn append_dir(&mut self, dir: &str) {
        self.append(dir);
        self.style_buffer().unwrap().append(&"C".repeat(dir.len()));
    }

    fn append_error(&mut self, txt: &str) {
        self.append(txt);
        self.style_buffer().unwrap().append(&"B".repeat(txt.len()));
    }

    fn run_command(&mut self, cmd: &str, cwd: &mut String, receiver: app::Receiver<bool>) {
        let args: Vec<String> = cmd.split_whitespace().map(|s| s.to_owned()).collect();
        if !args.is_empty() {
            let proc = if cfg!(target_os = "windows") {
                Command::new("cmd")
                    .arg("/c")
                    .arg(&args[0])
                    .args(&args[1..])
                    .stderr(Stdio::piped())
                    .stdout(Stdio::piped())
                    .spawn()
            } else {
                Command::new("sh")
                    .arg("-c")
                    .arg(&args[0])
                    .args(&args[1..])
                    .stderr(Stdio::piped())
                    .stdout(Stdio::piped())
                    .spawn()
            };

            if proc.is_err() {
                self.append_error("Command not found!");
                self.append_txt("\n");
                self.append_dir(cwd);
                return;
            }

            let reader = BufReader::new(proc.unwrap().stdout.unwrap());
            let mut term = self.clone();
            let cwd = cwd.clone();
            std::thread::spawn(move || {
                reader
                    .lines()
                    .filter_map(|line| line.ok())
                    .try_for_each(|line| {
                        if let Some(msg) = receiver.recv() {
                            match msg {
                                true => {
                                    term.append_error("Received sigint signal!\n");
                                    app::awake();
                                    return None;
                                }
                                false => (),
                            }
                        }
                        term.append_txt(&line);
                        term.append_txt("\n");
                        app::awake();
                        Some(())
                    });
                term.append_dir(&cwd);
            });
        }
    }
}

#[derive(Debug, Clone)]
pub struct WgtTerminal {
    //term: SimpleTerminal,
}

impl WgtTerminal {
    pub fn new(x: i32, y: i32, w: i32, h: i32) -> Self {
        let mut cmd = String::new();

        // Enable different colored text in TestDisplay
        let styles: Vec<StyleTableEntry> = vec![
            StyleTableEntry {
                color: Color::Green,
                font: Font::Courier,
                size: 16,
            },
            StyleTableEntry {
                color: Color::Red,
                font: Font::Courier,
                size: 16,
            },
            StyleTableEntry {
                color: Color::from_u32(0x8000ff),
                font: Font::Courier,
                size: 16,
            },
        ];

        let mut sbuf = TextBuffer::default();
        let mut term = SimpleTerminal::new(x, y, w, h, "");

        term.set_highlight_data(sbuf.clone(), styles);

        /*
        let mut curr = std::env::current_dir()
            .unwrap()
            .to_string_lossy()
            .to_string();
        curr.push_str("$ ");
        */

        let mut curr = "$ ".to_string();

        term.append_dir(&curr);

        let (s, r) = app::channel();

        term.handle(move |t, ev| {          
            match ev {
                Event::KeyDown => match app::event_key() {
                    Key::Enter => {
                        t.append_txt("\n");
                        t.run_command(&cmd, &mut curr, r);
                        cmd.clear();
                        true
                    }
                    Key::BackSpace => {
                        if !cmd.is_empty() {
                            let c = cmd.pop().unwrap();
                            let len = if c.is_ascii() {
                                1
                            } else {
                                utils::char_len(c) as i32
                            };
                            let text_len = t.text().len() as i32;
                            t.buffer().unwrap().remove(text_len - len, text_len);
                            sbuf.remove(text_len - len, text_len);
                            true
                        } else {
                            false
                        }
                    }
                    _ => {
                        if let Some(ch) = app::event_text().chars().next() {
                            if app::compose().is_some() {
                                let temp = ch.to_string();
                                cmd.push_str(&temp);
                                t.append_txt(&temp);
                                true
                            } else {
                                false
                            }
                        } else {
                            false
                        }
                    }
                },
                Event::KeyUp => {
                    if app::event_state() == Shortcut::Ctrl
                        && app::event_key() == Key::from_char('c')
                    {
                        s.send(true);
                    }
                    false
                }
                _ => false,
            }
        });

        Self { 
            //term 
        }
    }
}
