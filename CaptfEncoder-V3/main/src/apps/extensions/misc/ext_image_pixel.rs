use std::collections::HashMap;

use fltk::group::*;



use crate::apps::widgets::WgtExecutorInimage;


use super::super::misc_;
use super::super::ExtensionOption;
use super::super::IExtensionResult;

#[derive(Clone, Debug)]
pub struct Component {}

impl super::super::IExtensionComponent for Component {
    fn render(&self, grp: &Group) {
        let options: Vec<ExtensionOption> = Vec::new();
        let mut wgt_executor = WgtExecutorInimage::new(&grp, "Image", "Select image...", &options);

        wgt_executor.init(self);
    }
}

impl super::super::IExecutorHandler for Component {
    fn execute(
        &self,
        _input: &str,
        _options: &HashMap<String, String>,
    ) -> Option<Box<dyn IExtensionResult>> {
       

       

        let val = misc_::MiscResult {
            successed: true,
            val: String::from(""),
            message: String::from(""),
        };
        Some(Box::new(val))
    }
}
