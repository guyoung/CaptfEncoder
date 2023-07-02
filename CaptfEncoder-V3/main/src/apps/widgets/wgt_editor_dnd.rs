use fltk::{app, dialog, enums::Event, prelude::*, text::*};

pub fn attach_event(editor: &mut TextEditor, buf: &mut TextBuffer) {
    editor.handle({
        let mut dnd = false;
        let mut released = false;
        let buf2 = buf.clone();
        let dialog_x = (editor.x() + editor.width() / 2) as i32 - 200;
        let dialog_y = (editor.y() + editor.height() / 2) as i32 - 100;
        move |_, ev| match ev {
            Event::DndEnter => {
                dnd = true;
                true
            }
            Event::DndDrag => true,
            Event::DndRelease => {
                released = true;
                true
            }
            Event::Paste => {
                if dnd && released {
                    let path = app::event_text();
                    let path = path.trim();
                    let path = path.replace("file://", "");
                    let path = std::path::PathBuf::from(&path);
                    if path.exists() {
                        // we use a timeout to avoid pasting the path into the buffer
                        app::add_timeout3(0.0, {
                            let mut buf2 = buf2.clone();
                            move |_| match buf2.load_file(&path) {
                                Ok(_) => (),
                                Err(e) => dialog::alert(
                                    dialog_x,
                                    dialog_y,
                                    &format!("An issue occured while loading the file: {}", e),
                                ),
                            }
                        });
                    }
                    dnd = false;
                    released = false;
                    true
                } else {
                    false
                }
            }
            Event::DndLeave => {
                dnd = false;
                released = false;
                true
            }
            _ => false,
        }
    });
}
