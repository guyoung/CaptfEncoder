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
        let mut options: Vec<ExtensionOption> = Vec::new();

		options.push(ExtensionOption {
            name: "use_distinct_alphabet".to_string(),
            label: "Distinct".to_string(),
            datatype: "select".to_string(),
            default: "false".to_string(),
            tooltip:"Use distinct alphabet".to_string(),
            items: vec!["true".to_string(), "false".to_string()]
        });
     
        let mut wgt_encoder = WgtEncoder::new(&grp, &options);

	

        wgt_encoder.init(self);
    }
}

impl super::super::IEncoderHandler for Component {
    fn encode(&self, input: &str, options: &HashMap<String, String>) -> Option<Box<dyn IExtensionResult>> {
        let result = encoding::classical::baconian::encode(input, Some(options.clone()));
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
       let result = encoding::classical::baconian::decode(input, Some(options.clone()));
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
