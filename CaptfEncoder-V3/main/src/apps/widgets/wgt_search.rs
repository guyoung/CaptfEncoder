use std::collections::HashMap;
use std::ops::{Deref, DerefMut};

use fltk::{
    app, browser::*, enums::CallbackTrigger, enums::FrameType, group::*, input::*,
    prelude::*,
};

use crate::apps::extensions::*;

use crate::apps::message::Message;

#[derive(Clone)]
pub struct WgtSearch {
    pub flex: Flex,
}

impl WgtSearch {
    pub fn new(        
        s: &app::Sender<Message>,
        extensions: &Vec<Extension>,
    ) -> Self {
        let mut flex = Flex::default_fill().column();
        flex.set_margin(5);

        let mut search_input = Input::default();
        search_input.set_trigger(CallbackTrigger::Changed);
        search_input.set_frame(FrameType::FlatBox);
        flex.set_size(&mut search_input, 25);

        let mut search_list = HoldBrowser::default();
        search_list.set_trigger(CallbackTrigger::Changed);       

        flex.end();       

        let mut extensions_dict: HashMap<String, String> = HashMap::new();
        let mut extension_names: Vec<String> = Vec::new();

        for extension in extensions {
            extensions_dict.insert(extension.name.clone(), extension.id.clone());
            extension_names.push(extension.name.clone());
        }
        extension_names.sort();

        for extension_name in extension_names.clone() {
            search_list.add(extension_name.as_str());
        }

        search_input.set_callback({
            let mut search_list2 = search_list.clone();
            move |t| {
                search_list2.clear();
                let extension_names = extension_names
                    .clone()
                    .iter()
                    .filter_map(|x| {
                        let x = x.clone();
                        let i = x.to_lowercase().find(&t.value().to_lowercase());

                        match i {
                            Some(_) => Some(x.clone()),
                            None => None,
                        }
                    })
                    .collect::<Vec<String>>();

                for extension_name in extension_names {
                    search_list2.add(extension_name.as_str());
                }
            }
        });

        search_list.set_callback({
            let sender = s.clone();
            move |t| {
                let extension_name = t.selected_text();

                if extension_name.is_some() {
                    if let Some(id) = extensions_dict.clone().get(&extension_name.unwrap()) {
                        sender.send(Message::Extension(id.to_owned()));
                    } else {
                    }
                }
            }
        });

        Self { flex }
    }
}

impl Deref for WgtSearch {
    type Target = Flex;

    fn deref(&self) -> &Self::Target {
        &self.flex
    }
}

impl DerefMut for WgtSearch {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.flex
    }
}
