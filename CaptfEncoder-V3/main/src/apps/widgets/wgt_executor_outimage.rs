use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

use fltk::{
    enums::{Align, CallbackTrigger, Color},
    frame::*,
    group::*,
    menu::*,
    prelude::*,
    text::*,
};

use crate::apps::extensions::{ExtensionOption, IExecutorHandler};

use super::wgt_executor_handle;
use super::wgt_executor_menu;
use super::wgt_editor_dnd;
use super::wgt_option;
use super::WgtOptionComp;


#[derive(Clone)]
pub struct WgtExecutorOutimage {
    input_text: TextEditor,
    output_frame: Frame,
    input_button: MenuButton,
    output_button: MenuButton,
    message_frame: Frame,

    option_data: Rc<RefCell<wgt_option::OptionData>>,
    option_comps: Vec<Box<dyn WgtOptionComp>>,
}

impl WgtExecutorOutimage {
    pub fn new(grp: &Group, options: &Vec<ExtensionOption>) -> Self {
        let option_data: Rc<RefCell<wgt_option::OptionData>> =
            Rc::new(RefCell::new(wgt_option::OptionData {
                options: options.clone(),
                values: HashMap::new(),
            }));

        let mut flex = Flex::default_fill().column();
        flex.set_margin(15);

        let option_comps = wgt_option::generate_options(&option_data, &mut flex);

        let mut row = Flex::default_fill().row();
        let mut input_button = MenuButton::default();
        input_button.set_label("Input");
        row.set_size(&input_button, 100);
        row.end();
        flex.set_size(&row, 30);

        let mut input_text = TextEditor::default();
        input_text.wrap_mode(WrapMode::AtBounds, 0);

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

        let mut output_frame = Frame::default().with_align(Align::Center | Align::Inside);
        output_frame.set_label("");

        flex.end();

        grp.end();

        Self {
            input_text: input_text,
            output_frame: output_frame,
            input_button: input_button,
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
        let mut input_buf = TextBuffer::default();
        let output_buf = TextBuffer::default();

        self.input_text.set_buffer(input_buf.clone());
        self.input_text.set_trigger(CallbackTrigger::Changed);

        wgt_editor_dnd::attach_event(&mut self.input_text, &mut input_buf);

        for mut option_comp in self.option_comps.clone() {
            option_comp.set_callback(Box::new({
                let handler2 = handler.clone();

                let input_buf2 = input_buf.clone();
                let output_buf2 = output_buf.clone();
                let output_frame2 = self.output_frame.clone();
                let option_data2 = Rc::clone(&(self.option_data));
                let message_frame2 = self.message_frame.clone();
                move |comp| {
                    option_data2
                        .borrow_mut()
                        .values
                        .insert(comp.name(), comp.value());

                    wgt_executor_handle::execute_outimage(
                        &handler2,
                        &input_buf2,
                        &output_buf2,
                        &output_frame2,
                        &option_data2.borrow_mut().values,
                        &message_frame2,
                    );
                }
            }));
        }

        let cb = {
            let handler2 = handler.clone();
            let input_buf2 = input_buf.clone();
            let output_buf2 = output_buf.clone();
            let output_frame2 = self.output_frame.clone();
            let option_data2 = Rc::clone(&(self.option_data));
            let message_frame2 = self.message_frame.clone();
            move || {
                if !input_buf2.text().is_empty() {
                    wgt_executor_handle::execute_outimage(
                        &handler2,
                        &input_buf2,
                        &output_buf2,
                        &output_frame2,
                        &option_data2.borrow_mut().values,
                        &message_frame2,
                    );
                }
            }
        };

        wgt_executor_menu::generate_input_menu(
            &mut self.input_button.clone(),
            &self.input_text.clone(),
            &input_buf,
            cb,
        );

        wgt_executor_menu::generate_outimage_menu(
            &mut self.output_button.clone(),
            &output_buf,
            &self.output_frame,
        );

        self.input_text.set_callback({
            let handler2 = handler.clone();
            let input_buf2 = input_buf.clone();
            let output_buf2 = output_buf.clone();
            let output_frame2 = self.output_frame.clone();
            let option_data2 = Rc::clone(&(self.option_data));
            let message_frame2 = self.message_frame.clone();
            move |_| {
                if !input_buf2.text().is_empty() {
                    wgt_executor_handle::execute_outimage(
                        &handler2,
                        &input_buf2,
                        &output_buf2,
                        &output_frame2,
                        &option_data2.borrow_mut().values,
                        &message_frame2,
                    );
                }
            }
        });
    }
}
