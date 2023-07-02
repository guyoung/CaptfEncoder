use std::collections::HashMap;

use fltk::group::*;

use crate::apps::widgets::WgtEncoder;

use super::super::encoding;
use super::super::ExtensionOption;
use super::super::IExtensionResult;

#[derive(Clone, Debug)]
pub struct Component {}

impl super::super::IExtensionComponent for Component {
	fn render(&self, grp: &Group) {
		let mut options: Vec<ExtensionOption> = Vec::new();

		options.push(ExtensionOption {
			name: "delimiter".to_string(),
			label: "Delimiter".to_string(),		
			datatype: "select".to_string(),
			default: "&#x".to_string(),
			tooltip:"".to_string(),
			items: vec![
				"&#x".to_string(),
				"&#".to_string(),
				"\\\\u".to_string(),
				"\\\\u+".to_string(),				
			],
		});

		let mut wgt_encoder = WgtEncoder::new(&grp, &options);

		wgt_encoder.init(self);
	}
}

impl super::super::IEncoderHandler for Component {
	fn encode(
		&self,
		input: &str,
		options: &HashMap<String, String>,
	) -> Option<Box<dyn IExtensionResult>> {
		let result = encoding::converter::unicode::encode(input, Some(options.clone()));
		match result {
			Ok(val) => Some(Box::new(val)),
			Err(e) => Some(Box::new(encoding::EncodingResult {
				successed: false,
				val: String::from(""),
				message: format!("{:?}", e),
			})),
		}
	}

	fn decode(
		&self,
		input: &str,
		options: &HashMap<String, String>,
	) -> Option<Box<dyn IExtensionResult>> {
		let result = encoding::converter::unicode::decode(input, Some(options.clone()));
		match result {
			Ok(val) => Some(Box::new(val)),
			Err(e) => Some(Box::new(encoding::EncodingResult {
				successed: false,
				val: String::from(""),
				message: format!("{:?}", e),
			})),
		}
	}
}
