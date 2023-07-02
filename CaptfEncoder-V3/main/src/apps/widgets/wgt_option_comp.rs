use dyn_clone::DynClone;
use fltk::{
    enums::{CallbackTrigger, Color, FrameType},   
    input::*,
    misc::*,
    prelude::*,
};
use std::ops::{Deref, DerefMut};

use crate::apps::extensions::ExtensionOption;

pub trait WgtOptionComp: DynClone {
    fn name(&self) -> String;
    fn value(&self) -> String;
    fn hide(&mut self);
    fn set_color(&mut self, color: Color); 
    fn set_value(&mut self, val: &str);
    fn redraw_input(&mut self);
    fn set_callback(&mut self, cb: Box<dyn Fn(Box<dyn WgtOptionComp>)>);
}

dyn_clone::clone_trait_object!(WgtOptionComp);

#[derive(Clone)]
pub struct WgtOptionNumber {
    pub name: String,
    pub input: IntInput,
}

impl WgtOptionNumber {
    pub fn new(option: &ExtensionOption) -> Self {
        let mut input = IntInput::default();
        input.set_value(option.default.as_str());
        input.set_trigger(CallbackTrigger::Changed);
        Self {
            name: option.name.clone(),
            input,
        }
    }
}

impl WgtOptionComp for WgtOptionNumber {
    fn name(&self) -> String {
        self.name.clone()
    }
    fn value(&self) -> String {
        self.input.value()
    }
    fn hide(&mut self) {
        self.input.hide();
    }
    fn set_color(&mut self, color: Color) {
        self.input.set_color(color);
    }
    fn set_value(&mut self, val: &str) {
        self.input.set_value(val);
    }

    fn redraw_input(&mut self) {
        self.input.redraw()
    }

    fn set_callback(&mut self, cb: Box<dyn Fn(Box<dyn WgtOptionComp>)>) {
        self.input.set_callback({
            let comp = self.clone();
            move |_| cb(Box::new(comp.clone()))
        });
    }
}

impl Deref for WgtOptionNumber {
    type Target = IntInput;

    fn deref(&self) -> &Self::Target {
        &self.input
    }
}

impl DerefMut for WgtOptionNumber {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.input
    }
}

#[derive(Clone)]
pub struct WgtOptionText {
    pub name: String,
    pub input: Input,
}

impl WgtOptionText {
    pub fn new(option: &ExtensionOption) -> Self {
        let mut input = Input::default();
        input.set_value(option.default.as_str());
        input.set_trigger(CallbackTrigger::Changed);

        Self {
            name: option.name.clone(),
            input,
        }
    }
}

impl WgtOptionComp for WgtOptionText {
    fn name(&self) -> String {
        self.name.clone()
    }
    fn value(&self) -> String {
        self.input.value()
    }
    fn hide(&mut self) {
        self.input.hide();
    }
    fn set_color(&mut self, color: Color) {
        self.input.set_color(color);
    }
    fn set_value(&mut self, val: &str) {
        self.input.set_value(val);
    }

    fn redraw_input(&mut self) {
        self.input.redraw()
    }

    fn set_callback(&mut self, cb: Box<dyn Fn(Box<dyn WgtOptionComp>)>) {
        self.input.set_callback({
            let comp = self.clone();
            move |_| cb(Box::new(comp.clone()))
        });
    }
}

impl Deref for WgtOptionText {
    type Target = Input;

    fn deref(&self) -> &Self::Target {
        &self.input
    }
}

impl DerefMut for WgtOptionText {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.input
    }
}

#[derive(Clone)]
pub struct WgtOptionSelect {
    pub name: String,
    pub input: InputChoice,
}

impl WgtOptionSelect {
    pub fn new(option: &ExtensionOption) -> Self {
        let mut input = InputChoice::default();
        input.set_frame(FrameType::DownFrame);
        for item in option.items.iter() {
            input.add(item);
        }
        input.set_value(option.default.as_str());

        input.set_trigger(CallbackTrigger::Changed);

        Self {
            name: option.name.clone(),
            input,
        }
    }
}

impl WgtOptionComp for WgtOptionSelect {
    fn name(&self) -> String {
        self.name.clone()
    }
    fn value(&self) -> String {
        self.input.value().unwrap_or_default()
    }
    fn hide(&mut self) {
        self.input.hide();
    }
    fn set_color(&mut self, color: Color) {
        self.input.set_color(color);
    }
    fn set_value(&mut self, val: &str) {
        self.input.set_value(val);
    }

    fn redraw_input(&mut self) {
        self.input.redraw()
    }

    fn set_callback(&mut self, cb: Box<dyn Fn(Box<dyn WgtOptionComp>)>) {
        self.input.set_callback({
            let comp = self.clone();
            move |_| cb(Box::new(comp.clone()))
        });
    }
}

impl Deref for WgtOptionSelect {
    type Target = InputChoice;

    fn deref(&self) -> &Self::Target {
        &self.input
    }
}

impl DerefMut for WgtOptionSelect {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.input
    }
}

#[derive(Clone)]
pub struct WgtOptionTextarea {
    pub name: String,
    pub input: MultilineInput,
}

impl WgtOptionTextarea {
    pub fn new(option: &ExtensionOption) -> Self {
        let mut input = MultilineInput::default();
        input.set_wrap(true);
        input.set_value(option.default.as_str());
        input.set_trigger(CallbackTrigger::Changed);

        Self {
            name: option.name.clone(),
            input,
        }
    }
}

impl WgtOptionComp for WgtOptionTextarea {
    fn name(&self) -> String {
        self.name.clone()
    }
    fn value(&self) -> String {
        self.input.value()
    }
    fn hide(&mut self) {
        self.input.hide();
    }
    fn set_color(&mut self, color: Color) {
        self.input.set_color(color);
    }

    fn set_value(&mut self, val: &str) {
        self.input.set_value(val);
    }
    fn redraw_input(&mut self) {
        self.input.redraw()
    }

    fn set_callback(&mut self, cb: Box<dyn Fn(Box<dyn WgtOptionComp>)>) {
        self.input.set_callback({
            let comp = self.clone();
            move |_| cb(Box::new(comp.clone()))
        });
    }
}

impl Deref for WgtOptionTextarea {
    type Target = MultilineInput;

    fn deref(&self) -> &Self::Target {
        &self.input
    }
}

impl DerefMut for WgtOptionTextarea {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.input
    }
}
