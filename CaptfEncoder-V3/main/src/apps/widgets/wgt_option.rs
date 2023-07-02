use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

use fltk::{enums::Align, frame::*, group::*, prelude::*};

use crate::apps::extensions::ExtensionOption;

use super::WgtOptionComp;
use super::WgtOptionNumber;
use super::WgtOptionSelect;
use super::WgtOptionText;
use super::WgtOptionTextarea;

#[derive(Debug, Clone)]
pub struct OptionData {
    pub options: Vec<ExtensionOption>,
    pub values: HashMap<String, String>,
}

pub fn generate_options(
    option_data: &Rc<RefCell<OptionData>>,
    parent: &mut Flex,
) -> Vec<Box<dyn WgtOptionComp>> {
    let mut option_comps: Vec<Box<dyn WgtOptionComp>> = Vec::new();

    let options_len = option_data.borrow().options.len();

    for i in 0..options_len {
        let option_data = Rc::clone(&option_data);
        let options = option_data.borrow().options.clone();
        let option = options[i].clone();
        option_data
            .borrow_mut()
            .values
            .insert(option.name.clone(), option.default.clone());

        let mut row = Flex::default_fill().row();

        let mut option_label = Frame::default();
        option_label.set_align(Align::Inside | Align::Right);
        option_label.set_label(option.label.as_str());
        if !option.tooltip.is_empty() {
            option_label.set_tooltip(option.tooltip.as_str());
        }
        row.set_size(&option_label, 100);

        let option_comp: Box<dyn WgtOptionComp> = match option.datatype.as_str() {
            "number" => {
                let c = WgtOptionNumber::new(&option);
                row.set_size(&c.input, 100);
                Box::new(c)
            }
            "text" => {
                let c = WgtOptionText::new(&option);
                //row.set_size(&c.input, 480);
                Box::new(c)
            }
            "select" => {
                let c = WgtOptionSelect::new(&option);
                row.set_size(&c.input, 200);
                Box::new(c)
            }
            "textarea" => {
                let c = WgtOptionTextarea::new(&option);
                //row.set_size(&c.input, 480);
                Box::new(c)
            }
            _ => {
                let c = WgtOptionText::new(&option);
                //row.set_size(&c.input, 480);
                Box::new(c)
            }
        };

        row.end();

        match option.datatype.as_str() {
            "textarea" => parent.set_size(&row, 75),
            _ => parent.set_size(&row, 25),
        }

        option_comps.push(option_comp);
    }

    return option_comps;
}
