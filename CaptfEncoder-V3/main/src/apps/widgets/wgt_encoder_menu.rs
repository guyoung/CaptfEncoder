use std::fs;

use fltk::{dialog, menu::*, prelude::*, text::*};

use clipboard::{ClipboardContext, ClipboardProvider};

use super::from_hex;

pub fn generate_input_menu<F: Fn() + 'static>(
    input_button: &mut MenuButton,
    _input_text: &TextEditor,
    input_buf: &TextBuffer,
    cb: F,
) {
    let mut input_buf = input_buf.clone();

    input_button.add_choice("Clear");
    input_button.add_choice("Copy");
    input_button.add_choice("Paste");
    input_button.add_choice("Uppercase");
    input_button.add_choice("Lowercase");
    input_button.add_choice("Clear space");
    input_button.add_choice("Clear linefeed");
    input_button.add_choice("Load file");

    input_button.set_callback(move |btn| {
        match btn.choice().unwrap().as_str() {
            "Clear" => {
                input_buf.set_text("");
            }
            "Copy" => {
                let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();

                ctx.set_contents((&input_buf.text()).to_owned()).unwrap();
            }
            "Paste" => {
                let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();

                input_buf.set_text(ctx.get_contents().unwrap_or_default().as_str());
            }
            "Uppercase" => {
                input_buf.set_text(input_buf.text().to_uppercase().as_str());
            }
            "Lowercase" => {
                input_buf.set_text(input_buf.text().to_lowercase().as_str());
            }
            "Clear space" => {
                input_buf.set_text(&input_buf.text().replace(" ", "").as_str());
            }
            "Clear linefeed" => {
                input_buf.set_text(
                    &input_buf
                        .text()
                        .replace("\r", "")
                        .replace("\n", "")
                        .as_str(),
                );
            }
            "Load file" => {
                let mut chooser =
                    dialog::NativeFileChooser::new(dialog::FileDialogType::BrowseFile);
                chooser.show();
                let filename = chooser.filename().to_string_lossy().to_string();
                if !filename.is_empty() {
                    let text = fs::read(filename).unwrap();
                    let text = String::from_utf8_lossy(&text).to_string();
                    input_buf.set_text(text.as_str());
                }
            }

            _ => {}
        };

        cb();
    });
}

pub fn generate_output_menu<F: Fn() + 'static>(
    output_button: &mut MenuButton,
    output_text: &TextDisplay,
    input_buf: &TextBuffer,
    output_buf: &TextBuffer,
    cb: F,
) {
    let dialog_x = (output_text.x() + output_text.width() / 2) as i32 - 200;
    let dialog_y = (output_text.y() + output_text.height() / 2) as i32 - 100;
    let mut input_buf = input_buf.clone();
    let mut output_buf = output_buf.clone();

    output_button.add_choice("Clear");
    output_button.add_choice("Copy");
    output_button.add_choice("Uppercase");
    output_button.add_choice("Lowercase");
    output_button.add_choice("Clear space");
    output_button.add_choice("Clear linefeed");
    output_button.add_choice("Sync");
    output_button.add_choice("Save as text file");
    output_button.add_choice("Save as binary file");

    output_button.set_callback(move |btn| match btn.choice().unwrap().as_str() {
        "Clear" => {
            output_buf.set_text("");
        }
        "Copy" => {
            let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();

            ctx.set_contents((output_buf.text()).to_owned()).unwrap();
        }
        "Uppercase" => {
            output_buf.set_text(output_buf.text().to_uppercase().as_str());
        }
        "Lowercase" => {
            output_buf.set_text(output_buf.text().to_lowercase().as_str());
        }
        "Clear space" => {
            output_buf.set_text(output_buf.text().replace(" ", "").as_str());
        }
        "Clear linefeed" => {
            output_buf.set_text(
                output_buf
                    .text()
                    .replace("\r", "")
                    .replace("\n", "")
                    .as_str(),
            );
        }
        "Sync" => {
            input_buf.set_text(&output_buf.text());

            cb();
        }
        "Save as text file" => {
            let mut chooser =
                dialog::NativeFileChooser::new(dialog::FileDialogType::BrowseSaveFile);
            chooser.set_option(dialog::FileDialogOptions::SaveAsConfirm);
            chooser.show();
            let filename = chooser.filename().to_string_lossy().to_string();
            if !filename.is_empty() {
                let file_content = output_buf.text();
                fs::write(filename, file_content).unwrap_or_else(|_| {
                    dialog::alert(dialog_x, dialog_y, "Save as text file failure!")
                });
            }
        }
        "Save as binary file" => {
            let mut chooser =
                dialog::NativeFileChooser::new(dialog::FileDialogType::BrowseSaveFile);
            chooser.set_option(dialog::FileDialogOptions::SaveAsConfirm);
            chooser.show();
            let filename = chooser.filename().to_string_lossy().to_string();
            if !filename.is_empty() {
                let file_content = output_buf.text();

                let file_content = from_hex(file_content.as_str());

                match file_content {
                    Ok(val) => {
                        fs::write(filename, val).unwrap_or_else(|_| {
                            dialog::alert(dialog_x, dialog_y, "Save as binary file failure!");
                        });
                    }
                    Err(_) => {
                        dialog::alert(dialog_x, dialog_y, "Save as binary file failure!");
                    }
                }
            }
        }
        _ => {}
    });
}
