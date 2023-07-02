use std::fs;

use std::sync::{Arc, RwLock};

use fltk::{   
    button::*,
    dialog,
    enums::{CallbackTrigger, Color},
    frame::*,
    group::*,
    menu::*,
    prelude::*,
    text::*,
};

use chrono::prelude::*;
use tokio;

use crate::apps::scripts::*;

use super::wgt_editor_dnd;

#[derive(Clone)]
pub struct WgtScriptRunner {
    input: TextEditor,
    output: TextDisplay,
    run_button: Button,
    input_button: MenuButton,
    output_button: MenuButton,
    script_id: String,
    script_manager: ScriptManager,
}

impl WgtScriptRunner {
    pub fn new(grp: &Group, script_id: String, script_manager: ScriptManager) -> Self {
        let mut flex = Flex::default_fill().column();
        flex.set_margin(15);

        let mut row = Flex::default_fill().row();
        let mut input_button = MenuButton::default();
        input_button.set_label("Script");
        row.set_size(&input_button, 100);
        let _frame = Frame::default();
        let mut run_button = Button::default();
        run_button.set_label("Run");
        row.set_size(&run_button, 100);
        row.end();
        flex.set_size(&row, 30);

        let mut input = TextEditor::default().with_size(400, 360);
        input.wrap_mode(fltk::text::WrapMode::AtBounds, 0);
        input.set_linenumber_width(32);
        input.set_linenumber_fgcolor(Color::from_u32(0x008b_8386));



        let mut row = Flex::default_fill().row();
        let mut output_button = MenuButton::default();
        output_button.set_label("Output");
        row.set_size(&output_button, 100);
        row.end();
        flex.set_size(&row, 30);

        let mut output = TextDisplay::default();
        output.wrap_mode(WrapMode::AtBounds, 0);
        flex.set_size(&output, 200);

        flex.end();

        grp.end();

        Self {
            input: input,
            output: output,
            run_button: run_button,
            input_button: input_button,
            output_button: output_button,
            script_id: script_id,
            script_manager: script_manager,
        }
    }

    pub fn init(&mut self) {
        let mut input_buf = TextBuffer::default();
        let output_buf = TextBuffer::default();
        self.input.set_buffer(input_buf.clone());
        self.input.set_trigger(CallbackTrigger::Changed);

        wgt_editor_dnd::attach_event(&mut self.input, &mut input_buf);

        input_buf.set_text(
            self.script_manager
                .get_script_text(&self.script_id)
                .as_str(),
        );

        self.output.set_buffer(output_buf.clone());
        let output_buf = Arc::new(RwLock::new(output_buf));

        self.input_button.add_choice("Clear");
        self.input_button.add_choice("Load file");

        self.input_button.set_callback({
            let mut input_buf2 = input_buf.clone();
            move |btn| match btn.choice().unwrap().as_str() {
                "Clear" => {
                    input_buf2.set_text("");
                }
                "Load file" => {
                    let mut chooser =
                        dialog::NativeFileChooser::new(dialog::FileDialogType::BrowseFile);
                    chooser.show();
                    let filename = chooser.filename().to_string_lossy().to_string();
                    if !filename.is_empty() {
                        //let text = fs::read(filename).unwrap();
                        //let text = String::from_utf8_lossy(&text).to_string();
                        //input_buf2.set_text(text.as_str());
                        input_buf2.load_file(filename).unwrap();
                    }
                }
                _ => {}
            }
        });

        let dialog_x = (self.output.x() + self.output.width() / 2) as i32 - 200;
        let dialog_y = (self.output.y() + self.output.height() / 2) as i32 - 100;

        self.output_button.add_choice("Save as text file");

        self.output_button.set_callback({
            let output_buf2 = output_buf.clone();
            move |btn| match btn.choice().unwrap().as_str() {
                "Save as text file" => {
                    let mut chooser =
                        dialog::NativeFileChooser::new(dialog::FileDialogType::BrowseSaveFile);
                    chooser.set_option(dialog::FileDialogOptions::SaveAsConfirm);
                    chooser.show();
                    let filename = chooser.filename().to_string_lossy().to_string();
                    if !filename.is_empty() {
                        let file_content = output_buf2.write().unwrap().text();
                        fs::write(filename, file_content).unwrap_or_else(|_| {
                            dialog::alert(dialog_x, dialog_y, "Save as text file failure!")
                        });
                    }
                }
                _ => {}
            }
        });

        self.run_button.set_callback({
            let script_manager2 = self.script_manager.clone();
            let run_button2 = self.run_button.clone();
            let run_button3 = self.run_button.clone();
            move |_| {
                let mut script_manager2 = script_manager2.clone();
                let input_buf2 = input_buf.clone();
                let output_buf2 = output_buf.clone();
                let output_buf3 = output_buf.clone();
                let run_button3 = run_button3.clone();

                output_buf2.write().unwrap().set_text("");
                if !input_buf2.text().is_empty() {
                    let mut run_button2 = run_button2.clone();
                    run_button2.deactivate();

                    tokio::task::spawn_blocking(move || {
                        std::panic::set_hook(Box::new(move |panic_info| {
                            println!("{:?}", panic_info);
                            let output_buf3 = output_buf3.clone();
                            let mut run_button3 = run_button3.clone();
                            let payload = panic_info.payload().downcast_ref::<&str>();
                            match payload {
                                Some(_msg) => {
                                    output_buf3
                                        .write()
                                        .unwrap()
                                        .append("\n\n[Error]An unexpected error occurred");
                                }
                                None => {
                                    let payload = panic_info.payload().downcast_ref::<String>();
                                    match payload {
                                        Some(_msg) => {
                                            output_buf3
                                                .write()
                                                .unwrap()
                                                .append("\n\n[Error]An unexpected error occurred");
                                        }
                                        None => {
                                            output_buf3
                                                .write()
                                                .unwrap()
                                                .append("\n\n[Error]An unexpected error occurred");
                                        }
                                    }
                                }
                            }
                            run_button3.activate();
                        }));

                        let result = script_manager2.run_script(&input_buf2.clone().text(), {
                            let output_buf2 = output_buf2.clone();
                            move |s| {
                                output_buf2.write().unwrap().append(s);
                            }
                        });

                        match result {
                            Ok(val) => {
                                if !val.is_empty() {
                                    output_buf2
                                        .write()
                                        .unwrap()
                                        .append(format!("\n\n[Result]\n{}", val).as_str());
                                }
                            }
                            Err(e) => {
                                output_buf2
                                    .write()
                                    .unwrap()
                                    .append(format!("\n\n[Error]\n{:?}", e).as_str());
                            }
                        }

                        let now: DateTime<Local> = Local::now();

                        output_buf2.write().unwrap().append(
                            format!(
                                "\n\nFinished at {}",
                                now.format("%Y-%m-%d %H:%M:%S").to_string()
                            )
                            .as_str(),
                        );

                        run_button2.activate();
                    });
                }
            }
        });
    }
}

unsafe impl Sync for WgtScriptRunner {}

unsafe impl Send for WgtScriptRunner {}
