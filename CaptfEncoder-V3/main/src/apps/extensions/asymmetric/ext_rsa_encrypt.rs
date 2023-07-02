use std::collections::HashMap;
use std::rc::Rc;
use std::cell::RefCell;

use tokio;

use fltk::{
    button::*,
    enums::{Align, CallbackTrigger, Color},
    frame::*,
    group::*,
    menu::*,
    prelude::*,
    text::*,
};

use super::super::encoding;

use crate::apps::extensions::ExtensionOption;

use crate::apps::widgets::wgt_executor_menu;
use crate::apps::widgets::wgt_option;
use crate::apps::widgets::WgtOptionComp;

#[derive(Clone)]
struct WgtExecutor {
    input: TextEditor,
    output: TextDisplay,
    encrypt_button: Button,
    decrypt_button: Button,
    input_button: MenuButton,
    output_button: MenuButton,
    message_frame: Frame,
    option_data: Rc<RefCell<wgt_option::OptionData>>,
    option_comps: Vec<Box<dyn WgtOptionComp>>,
}

impl WgtExecutor {
    pub fn new(grp: &Group) -> Self {
        let mut options: Vec<ExtensionOption> = Vec::new();

        options.push(ExtensionOption {
            name: "key_format".to_string(),
            label: "Key format".to_string(),
            datatype: "select".to_string(),
            default: "PEM".to_string(),
            tooltip: "".to_string(),
            items: vec!["PEM".to_string()],
        });

        options.push(ExtensionOption {
            name: "public_key".to_string(),
            label: "Public Key".to_string(),
            datatype: "textarea".to_string(),
            default: "".to_string(),
            tooltip: "".to_string(),
            items: vec![],
        });

        options.push(ExtensionOption {
            name: "private_key".to_string(),
            label: "Private Key".to_string(),
            datatype: "textarea".to_string(),
            default: "".to_string(),
            tooltip: "".to_string(),
            items: vec![],
        });

        let option_data: Rc<RefCell<wgt_option::OptionData>> =
            Rc::from(RefCell::from(wgt_option::OptionData {
                options: options.clone(),
                values: HashMap::new(),
            }));

        let mut flex = Flex::default_fill().column();
        flex.set_margin(15);

   
        let option_comps = wgt_option::generate_options(&option_data, &mut flex);

        let mut row = Flex::default_fill().row();
        let _frame = Frame::default();
        let mut encrypt_button = Button::new(60, 0, 18, 25, "");
        encrypt_button.set_label("Encrypt");
        encrypt_button.set_tooltip("Public key encrypt");
        row.set_size(&encrypt_button, 100);
        let mut decrypt_button = Button::new(80, 0, 18, 25, "");
        decrypt_button.set_label("Decrypt");
        decrypt_button.set_tooltip("Private key decrypt");
        row.set_size(&decrypt_button, 100);

        row.end();
        flex.set_size(&row, 30);

        let mut row = Flex::default_fill().row();
        let mut input_button = MenuButton::default();
        input_button.set_label("Input");
        row.set_size(&input_button, 100);
        row.end();
        flex.set_size(&row, 30);

        let mut input = TextEditor::default();
        input.wrap_mode(WrapMode::AtBounds, 0);

        let mut message_frame = Frame::default().with_align(Align::Center | Align::Wrap);
        message_frame.set_label_color(Color::DarkRed);
        message_frame.set_label("");
        flex.set_size(&message_frame, 30);

        let mut row = Flex::default_fill().row();
        let mut output_button = MenuButton::default();
        output_button.set_label("Output");
        row.set_size(&output_button, 100);
        row.end();
        flex.set_size(&row, 30);

        let mut output = TextDisplay::default();
        output.wrap_mode(WrapMode::AtBounds, 0);

        flex.end();

        grp.end();

        Self {
            input: input,
            output: output,
            encrypt_button: encrypt_button,
            decrypt_button: decrypt_button,
            input_button: input_button,
            output_button: output_button,
            message_frame: message_frame,
            option_data: option_data,
            option_comps: option_comps,
        }
    }

    pub fn init(&mut self) {
        let input_buf = TextBuffer::default();
        let output_buf = TextBuffer::default();

        self.input.set_buffer(input_buf.clone());
        self.input.set_trigger(CallbackTrigger::Changed);

        self.output.set_buffer(output_buf.clone());

        for mut option_comp in self.option_comps.clone() {
            option_comp.set_callback(Box::new({
                let option_data2 = Rc::clone(&(self.option_data));
                let message_frame2 = self.message_frame.clone();
                let output_buf2 = output_buf.clone();
                move |comp| {
                    message_frame2.clone().set_label("");
                    output_buf2.clone().set_text("");
                    option_data2
                        .borrow_mut()
                        .values
                        .insert(comp.name(), comp.value());
                }
            }));
        }

        wgt_executor_menu::generate_input_menu(
            &mut self.input_button.clone(),
            &self.input.clone(),
            &input_buf,
            || {},
        );

        wgt_executor_menu::generate_output_menu(
            &mut self.output_button.clone(),
            &self.output.clone(),
            &output_buf,
        );

        self.input.set_callback({
            let mut message_frame2 = self.message_frame.clone();
            let mut output_buf2 = output_buf.clone();
            move |_| {
                message_frame2.set_label("");
                output_buf2.set_text("");
            }
        });

        self.encrypt_button.set_callback({
            let input_buf2 = input_buf.clone();
            let output_buf2 = output_buf.clone();
            let option_data2 = Rc::clone(&(self.option_data));
            let message_frame2 = self.message_frame.clone();
            let encrypt_button2 = self.encrypt_button.clone();
            move |_| {
                let input_buf2 = input_buf2.clone();
                let mut output_buf2 = output_buf2.clone();
                output_buf2.set_text("");
                let options = option_data2.borrow_mut().values.clone();
                let mut message_frame2 = message_frame2.clone();
                message_frame2.set_label("");

                let mut encrypt_button2 = encrypt_button2.clone();
                encrypt_button2.deactivate();

                tokio::task::spawn_blocking(move || {        
                    let result = encoding::asymmetric::rsa::encode(
                        input_buf2.text().as_str(),
                        Some(options),
                    );

                    match result {
                        Ok(result) => {
                            output_buf2.clone().set_text(&result.val);
                        }
                        Err(e) => {
                            message_frame2.set_label(&format!("Error: {:?}", e));
                        }
                    }

                    encrypt_button2.activate();
                });
            }
        });

        self.decrypt_button.set_callback({
            let input_buf2 = input_buf.clone();
            let output_buf2 = output_buf.clone();
            let option_data2 = Rc::clone(&(self.option_data));
            let message_frame2 = self.message_frame.clone();
            let decrypt_button2 = self.decrypt_button.clone();

            move |_| {
                let input_buf2 = input_buf2.clone();
                let mut output_buf2 = output_buf2.clone();
                output_buf2.set_text("");
                let options = option_data2.borrow_mut().values.clone();
                let mut message_frame2 = message_frame2.clone();
                message_frame2.set_label("");

                let mut decrypt_button2 = decrypt_button2.clone();
                decrypt_button2.deactivate();

                tokio::task::spawn_blocking(move || {
                    
                    let result = encoding::asymmetric::rsa::decode(
                        input_buf2.text().as_str(),
                        Some(options),
                    );

                    match result {
                        Ok(result) => {
                            output_buf2.clone().set_text(&result.val);
                        }
                        Err(e) => {
                            message_frame2.set_label(&format!("Error: {:?}", e));
                        }
                    }

                    decrypt_button2.activate();
                });
            }
        });
    }
}

#[derive(Clone, Debug)]
pub struct Component {}

impl super::super::IExtensionComponent for Component {
    fn render(&self, grp: &Group) {
        let mut wgt_encoder = WgtExecutor::new(&grp);

        wgt_encoder.init();
    }
}
