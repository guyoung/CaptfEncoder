use std::collections::HashMap;
use std::rc::Rc;
use std::cell::RefCell;

use tokio;

use fltk::{
    button::*,
    enums::{Align, Color},
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
    public_key_output: TextDisplay,
    private_key_output: TextDisplay,
    button: Button,
    public_key_output_button: MenuButton,
    private_key_output_button: MenuButton,
    message_frame: Frame,
    option_data: Rc<RefCell<wgt_option::OptionData>>,
    option_comps: Vec<Box<dyn WgtOptionComp>>,
}

impl WgtExecutor {
    pub fn new(grp: &Group) -> Self {
        let mut options: Vec<ExtensionOption> = Vec::new();

        options.push(ExtensionOption {
            name: "bits".to_string(),
            label: "Bits".to_string(),
            datatype: "select".to_string(),
            default: "2048".to_string(),
            tooltip: "".to_string(),
            items: vec![
                "256".to_string(),
                "512".to_string(),
                "1024".to_string(),
                "2048".to_string(),
            ],
        });

        options.push(ExtensionOption {
            name: "key_format".to_string(),
            label: "Key format".to_string(),
            datatype: "select".to_string(),
            default: "PEM".to_string(),
            tooltip: "".to_string(),
            items: vec!["PEM".to_string(), "DER".to_string()],
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
        let mut button = Button::default();
        button.set_label("Generate key");
        row.set_size(&button, 160);
        row.end();
        flex.set_size(&row, 30);

        let mut message_frame = Frame::default().with_align(Align::Center | Align::Wrap);
        message_frame.set_label_color(Color::DarkRed);
        message_frame.set_label("");
        flex.set_size(&message_frame, 30);

        let mut row = Flex::default_fill().row();
        let mut public_key_output_button = MenuButton::default();
        public_key_output_button.set_label("Public key");
        row.set_size(&public_key_output_button, 160);
        row.end();
        flex.set_size(&row, 30);

        let mut public_key_output = TextDisplay::default();
        public_key_output.wrap_mode(WrapMode::AtBounds, 0);

        let mut row = Flex::default_fill().row();
        let mut private_key_output_button = MenuButton::default();
        private_key_output_button.set_label("Public key");
        row.set_size(&private_key_output_button, 160);
        row.end();
        flex.set_size(&row, 30);

        let mut private_key_output = TextDisplay::default();
        private_key_output.wrap_mode(WrapMode::AtBounds, 0);

        flex.end();

        grp.end();
        Self {
            public_key_output: public_key_output,
            private_key_output: private_key_output,
            button: button,
            public_key_output_button: public_key_output_button,
            private_key_output_button: private_key_output_button,
            message_frame: message_frame,
            option_data: option_data,
            option_comps: option_comps,
        }
    }

    pub fn init(&mut self) {
        let public_key_output_buf = TextBuffer::default();
        self.public_key_output
            .set_buffer(public_key_output_buf.clone());

        let private_key_output_buf = TextBuffer::default();
        self.private_key_output
            .set_buffer(private_key_output_buf.clone());

        for mut option_comp in self.option_comps.clone() {
            option_comp.set_callback(Box::new({
                let option_data2 = Rc::clone(&(self.option_data));
                let message_frame2 = self.message_frame.clone();
                let public_key_output_buf2 = public_key_output_buf.clone();
                let private_key_output_buf2 =private_key_output_buf.clone();
                move |comp| {
                    message_frame2.clone().set_label("");
                    public_key_output_buf2.clone().set_text("");
                    private_key_output_buf2.clone().set_text("");
                    option_data2
                        .borrow_mut()
                        .values
                        .insert(comp.name(), comp.value());
                }
            }));
        }

        wgt_executor_menu::generate_output_menu(
            &mut self.public_key_output_button.clone(),
            &self.public_key_output.clone(),
            &public_key_output_buf,
        );

        wgt_executor_menu::generate_output_menu(
            &mut self.private_key_output_button.clone(),
            &self.private_key_output.clone(),
            &private_key_output_buf,
        );

        self.button.set_callback({
            let button2 = self.button.clone();
            let message_frame2 = self.message_frame.clone();
            let option_data2 = Rc::clone(&(self.option_data));
            move |_| {
                let mut public_key_output_buf2 = public_key_output_buf.clone();
                public_key_output_buf2.set_text("");
                let mut private_key_output_buf2 = private_key_output_buf.clone();
                private_key_output_buf2.set_text("");
                let options = option_data2.borrow_mut().values.clone();
                let mut message_frame2 = message_frame2.clone();
                message_frame2.set_label("");

                let mut button2 = button2.clone();
                button2.deactivate();

                tokio::task::spawn_blocking(move || {                    
                    let result = encoding::asymmetric::rsa_tool::generate_key(Some(options));

                    match result {
                        Ok(result) => {
                            let public_key = result.public_key;
                            let private_key = result.private_key;
                            public_key_output_buf2.set_text(&public_key);
                            private_key_output_buf2.set_text(&private_key);
                        }
                        Err(e) => {
                            message_frame2.set_label(&format!("Error: {:?}", e));
                        }
                    }

                    button2.activate();
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
