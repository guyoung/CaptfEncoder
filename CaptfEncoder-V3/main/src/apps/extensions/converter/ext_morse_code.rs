use std::collections::HashMap;

use fltk::group::*;

use crate::apps::widgets::WgtEncoder;

use super::super::ExtensionOption;
use super::super::encoding;
use super::super::IExtensionResult;

#[derive(Clone, Debug)]
pub struct Component {}

impl super::super::IExtensionComponent for Component {
    fn render(&self, grp: &Group) {
        let options: Vec<ExtensionOption> = Vec::new();
     
        let mut wgt_encoder = WgtEncoder::new(&grp, &options);

        wgt_encoder.init(self);
    }
}

impl super::super::IEncoderHandler for Component {
    fn encode(&self, input: &str, options: &HashMap<String, String>) -> Option<Box<dyn IExtensionResult>> {
        let result = encoding::converter::morse_code::encode(input, Some(options.clone()));
match result {
	Ok(val) => Some(Box::new(val)),
	Err(e) => {                
		Some(Box::new(encoding::EncodingResult
			{
				successed: false,
				val: String::from(""),
				message: format!("{:?}", e),
			}
		))
	},
}
    }

    fn decode(&self, input: &str, options: &HashMap<String, String>) -> Option<Box<dyn IExtensionResult>> {
        let result = encoding::converter::morse_code::decode(input, Some(options.clone()));
match result {
	Ok(val) => Some(Box::new(val)),
	Err(e) => {                
		Some(Box::new(encoding::EncodingResult
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
