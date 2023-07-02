use std::cell::RefCell;
use std::collections::HashMap;

use std::rc::Rc;

use fltk::{
    button::*,
    dialog,
    enums::{Align, CallbackTrigger, Color},
    frame::*,
    group::*,
    input::*,
    menu::*,
    prelude::*,
    text::*,
};

use crate::apps::extensions::{ExtensionOption, IExecutorHandler};

use super::wgt_executor_handle;
use super::wgt_executor_menu;
use super::wgt_option;
use super::WgtOptionComp;


#[derive(Clone)]
pub struct WgtExecutorInfile {
    input_text: Input,
    output_text: TextDisplay,
    button: Button,
    output_button: MenuButton,
    message_frame: Frame,
    option_data: Rc<RefCell<wgt_option::OptionData>>,
    option_comps: Vec<Box<dyn WgtOptionComp>>,
}

impl WgtExecutorInfile {
    pub fn new(
        grp: &Group,
        input_label: &str,
        button_label: &str,
        options: &Vec<ExtensionOption>,
    ) -> Self {
        let option_data: Rc<RefCell<wgt_option::OptionData>> =
            Rc::new(RefCell::new(wgt_option::OptionData {
                options: options.clone(),
                values: HashMap::new(),
            }));
        let mut flex = Flex::default_fill().column();
        flex.set_margin(15);

        let option_comps = wgt_option::generate_options(&option_data, &mut flex);

        let mut row = Flex::default_fill().row();
        let mut frame = Frame::default();
        frame.set_label(input_label);
        frame.set_align(Align::Right | Align::Inside);
        row.set_size(&frame, 100);
        let mut input_text = Input::default();
        input_text.set_readonly(true);
        input_text.set_value("");
        row.end();
        flex.set_size(&row, 25);

        let mut row = Flex::default_fill().row();
        let _frame = Frame::default();
        let mut button = Button::default();
        button.set_label(button_label);
        row.set_size(&button, 100);
        row.end();
        flex.set_size(&row, 25);

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

        let mut output_text = TextDisplay::default();
        output_text.wrap_mode(WrapMode::AtBounds, 0);

        flex.end();

        grp.end();

        Self {
            input_text: input_text,
            output_text: output_text,
            button: button,
            output_button: output_button,
            message_frame: message_frame,
            option_data: option_data,
            option_comps: option_comps,
        }
    }

    pub fn init<F>(&mut self, handler: &F)
    where
        F: IExecutorHandler + Clone + Send + 'static,
    {
        self.input_text.set_trigger(CallbackTrigger::Changed);

        let output_buf = TextBuffer::default();
        self.output_text.set_buffer(output_buf.clone());
    

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

        wgt_executor_menu::generate_output_menu(
            &mut self.output_button.clone(),
            &self.output_text.clone(),
            &output_buf,
        );

        self.button.set_callback({
            let handler2 = handler.clone();
            let mut input_text2 = self.input_text.clone();
            let output_buf2 = output_buf.clone();
            let option_data2 = Rc::clone(&(self.option_data));
            let button2 = self.button.clone();
            let message_frame2 = self.message_frame.clone();
            move |_| {
                let mut chooser =
                    dialog::NativeFileChooser::new(dialog::FileDialogType::BrowseFile);
                chooser.show();
                let filename = chooser.filename().to_string_lossy().to_string();
                if !filename.is_empty() {
                    input_text2.set_value(filename.as_str());
                    wgt_executor_handle::execute(
                        &handler2,
                        &input_text2,
                        &output_buf2,
                        &option_data2.borrow_mut().values,
                        &button2,
                        &message_frame2,
                    );
                }
            }
        });
    }
}
