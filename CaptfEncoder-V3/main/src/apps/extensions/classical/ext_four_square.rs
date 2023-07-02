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
            name: "alphabet".to_string(),
            label: "Alphabet".to_string(),
            datatype: "text".to_string(),
            default: "ZGPTFOIHMUWDRCNYKEQAXVSBL".to_string(),
            tooltip:"".to_string(),
            items: vec![]
        });

		options.push(ExtensionOption {
            name: "key1".to_string(),
            label: "Key 1".to_string(),
            datatype: "text".to_string(),
            default: "MFNBDCRHSAXYOGVITUEWLQZKP".to_string(),
            tooltip:"".to_string(),
            items: vec![]
        });
     
		options.push(ExtensionOption {
            name: "key2".to_string(),
            label: "Key 2".to_string(),
            datatype: "text".to_string(),
            default: "ABCDEFGHIKLMNOPQRSTUVWXYZ".to_string(),
            tooltip:"".to_string(),
            items: vec![]
        });
     
		options.push(ExtensionOption {
            name: "pad".to_string(),
            label: "Pad".to_string(),
            datatype: "text".to_string(),
            default: "X".to_string(),
            tooltip:"".to_string(),
            items: vec![]
        });
     
     
        let mut wgt_encoder = WgtEncoder::new(&grp, &options);

        wgt_encoder.init(self);
    }
}

impl super::super::IEncoderHandler for Component {
    fn encode(&self, input: &str, options: &HashMap<String, String>) -> Option<Box<dyn IExtensionResult>> {
        let result = encoding::classical::four_square::encode(input, Some(options.clone()));
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
       let result = encoding::classical::four_square::decode(input, Some(options.clone()));
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
