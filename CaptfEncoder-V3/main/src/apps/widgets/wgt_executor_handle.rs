use std::collections::HashMap;

use tokio;

use fltk::{button::*, frame::*, input::*, prelude::*, text::*};

use super::WgtImage;

use crate::apps::extensions::IExecutorHandler;

pub fn execute<F>(
    handler: &F,
    input_text: &Input,
    output_buf: &TextBuffer,
    options: &HashMap<String, String>,
    button: &Button,
    message_frame: &Frame,
) where
    F: IExecutorHandler + Clone + Send + 'static,
{
    let _execute = move || {
        let handler2 = handler.clone();
        let options2 = options.clone();
        let input2 = input_text.value();
        let mut output_buf2 = output_buf.clone();
        let mut button2 = button.clone();
        button2.deactivate();
        let mut message_frame2 = message_frame.clone();
        let message_frame3 = message_frame.clone();
        let button3 = button2.clone();

        tokio::task::spawn_blocking(move || {
            std::panic::set_hook(Box::new(move |panic_info| {
                let mut message_frame3 = message_frame3.clone();
                let mut button3 = button3.clone();
                let payload = panic_info.payload().downcast_ref::<&str>();
                //let payload = panic_info.payload().downcast_ref::<String>();
                match payload {
                    Some(msg) => {
                        message_frame3.set_label(format!("Error: {}", msg).as_str());
                    }
                    None => {
                        message_frame3.set_label(format!("Error: {:?}", &panic_info.to_string()).as_str());
                    }
                }

                button3.activate();
            }));

            let result = handler2.execute(&input2, &options2);
            match result {
                Some(result) => {
                    if result.successed() {
                        output_buf2.set_text(result.val().as_str());
                    } else {
                        message_frame2.set_label(format!("Error: {}", result.message()).as_str());
                    }
                }
                None => {}
            }

            button2.activate();
        });
    };

    output_buf.clone().set_text("");

    message_frame.clone().set_label("");

    if !input_text.value().is_empty() {
        _execute();
    }
}

pub fn execute_outimage<F>(
    handler: &F,
    input_buf: &TextBuffer,
    output_buf: &TextBuffer,
    output_frame: &Frame,
    options: &HashMap<String, String>,
    message_frame: &Frame,
) where
    F: IExecutorHandler + Clone + Send + 'static,
{
    let _execute = move || {
        let handler2 = handler.clone();
        let options2 = options.clone();
        let input_buf2 = input_buf.clone();
        let mut output_buf2 = output_buf.clone();
        let mut output_frame2 = output_frame.clone();

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
                        message_frame3.set_label(format!("Error: {:?}", &panic_info.to_string()).as_str());
                    }
                }

            }));

            let result = handler2.execute(&input_buf2.text(), &options2);
            match result {
                Some(result) => {
                    if result.successed() {
                        output_buf2.set_text(result.val().as_str());
                        let image = WgtImage::load_image_by_base64(&result.val(), 200, 200);

                        match image {
                            Ok(image) => {
                                output_frame2.set_image(Some(image));
                                output_frame2.redraw();
                            }
                            Err(_) => {}
                        }
                    } else {
                        message_frame2.set_label(format!("Error: {}", result.message()).as_str());
                    }
                }
                None => {}
            }
        });
    };

    output_buf.clone().set_text("");
    let image = WgtImage::create_empty_image(200, 200).unwrap();
    output_frame.clone().set_image(Some(image));
    output_frame.clone().redraw();

    message_frame.clone().set_label("");

    if !input_buf.text().is_empty() {
        _execute();
    }
}
