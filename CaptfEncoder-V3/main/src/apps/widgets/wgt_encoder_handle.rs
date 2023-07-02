use std::collections::HashMap;

use tokio;

use fltk::{frame::*, prelude::*, text::*};

use crate::apps::extensions::IEncoderHandler;

pub fn execute<F>(
    handler: &F,
    _input_text: &TextEditor,
    input_buf: &TextBuffer,
    output_buf: &TextBuffer,
    options: &HashMap<String, String>,
    message_frame: &Frame,
    decode: bool,
) where
    F: IEncoderHandler + Clone + Send + 'static,
{
    output_buf.clone().set_text("");

    let _execute = move || {
        let handler2 = handler.clone();
        let options2 = options.clone();
        /*
        let mut input_text2 = input_text.clone();
        let focus = input_text2.has_focus();
        let pos = input_text2.insert_position();
        input_text2.deactivate();
        */
        let input_buf2 = input_buf.clone();
        let output_buf2 = output_buf.clone();
        let mut message_frame2 = message_frame.clone();
        let message_frame3 = message_frame.clone();

        tokio::task::spawn_blocking(move || {
            std::panic::set_hook(Box::new(move |panic_info| {
                let mut message_frame3 = message_frame3.clone();
                let payload = panic_info.payload().downcast_ref::<&str>();
                //let payload = panic_info.payload().downcast_ref::<String>();
                match payload {
                    Some(msg) => {
                        message_frame3.set_label(format!("Error: {}", msg).as_str());
                    }
                    None => {
                        message_frame3
                            .set_label(format!("Error: {:?}", &panic_info.to_string()).as_str());
                    }
                }
            }));

            let result = match decode {
                false => handler2.encode(input_buf2.text().as_str(), &options2),
                true => handler2.decode(input_buf2.text().as_str(), &options2),
            };
            match result {
                Some(result) => {
                    if result.successed() {
                        output_buf2.clone().set_text(&result.val());
                    } else {
                        //println!("{}", result.message());
                        message_frame2.set_label(format!("Error: {}", result.message()).as_str());
                    }
                }
                None => {}
            }

            /*
            if focus {
                if let Ok(_) = input_text2.take_focus() {

                }
            }
            input_text2.set_insert_position(pos);
            input_text2.activate();
            */
        });
    };

    output_buf.clone().set_text("");
    message_frame.clone().set_label("");

    if !input_buf.text().is_empty() {
        _execute();
    }
}
