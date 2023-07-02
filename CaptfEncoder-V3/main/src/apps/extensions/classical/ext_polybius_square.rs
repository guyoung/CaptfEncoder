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
            name: "alphabet_key".to_string(),
            label: "Alphabet key".to_string(),
            datatype: "text".to_string(),
            default: "or0an3ge".to_string(),
            tooltip:"".to_string(),
            items: vec![]
        });

		options.push(ExtensionOption {
            name: "column_ids".to_string(),
            label: "Column_ids".to_string(),
            datatype: "text".to_string(),
            default: "A,Z,C,D,E,F".to_string(),
            tooltip:"".to_string(),
            items: vec![]
        });

		options.push(ExtensionOption {
            name: "row_ids".to_string(),
            label: "row_ids".to_string(),
            datatype: "text".to_string(),
            default: "A,B,G,D,E,F".to_string(),
            tooltip:"".to_string(),
            items: vec![]
        });
     
        let mut wgt_encoder = WgtEncoder::new(&grp, &options);

        wgt_encoder.init(self);
    }
}

impl super::super::IEncoderHandler for Component {
    fn encode(&self, input: &str, options: &HashMap<String, String>) -> Option<Box<dyn IExtensionResult>> {
        let result = encoding::classical::polybius_square::encode(input, Some(options.clone()));
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
       let result = encoding::classical::polybius_square::decode(input, Some(options.clone()));
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
