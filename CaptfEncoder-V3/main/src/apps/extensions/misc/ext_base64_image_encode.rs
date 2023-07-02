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
        let mut wgt_executor = WgtExecutorInimage::new(&grp,  "Image", "Select image...", &options);

        wgt_executor.init(self);
    }
}

impl super::super::IExecutorHandler for Component {
    fn execute(
        &self,
        input: &str,
        options: &HashMap<String, String>,
    ) -> Option<Box<dyn IExtensionResult>> {
        let result = misc_::image::base64_image_encode::execute(input, Some(options.clone()));
        match result {
            Ok(val) => Some(Box::new(val)),
            Err(e) => {                
                Some(Box::new(misc_::MiscResult
                    {
                        successed: false,
                        val: String::from(""),
                        message: format!("{:?}", e),
                    }
                ))
            },
        }
    }
}
