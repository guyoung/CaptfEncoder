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
            name: "rows".to_string(),
            label: "Rows".to_string(),
            datatype: "number".to_string(),
            default: "3".to_string(),
            tooltip:"".to_string(),
            items: vec![]
        });

		
		options.push(ExtensionOption {
            name: "cols".to_string(),
            label: "Cols".to_string(),
            datatype: "number".to_string(),
            default: "3".to_string(),
            tooltip:"".to_string(),
            items: vec![]
        });

		options.push(ExtensionOption {
            name: "data".to_string(),
            label: "Data".to_string(),
            datatype: "text".to_string(),
            default: "2,4,5,9,2,1,3,17,7".to_string(),
            tooltip:"".to_string(),
            items: vec![]
        });
     
        let mut wgt_encoder = WgtEncoder::new(&grp, &options);

        wgt_encoder.init(self);
    }
}

impl super::super::IEncoderHandler for Component {
    fn encode(&self, input: &str, options: &HashMap<String, String>) -> Option<Box<dyn IExtensionResult>> {
        let result = encoding::classical::hill::encode(input, Some(options.clone()));
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
       let result = encoding::classical::hill::decode(input, Some(options.clone()));
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
