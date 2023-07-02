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
            name: "key".to_string(),
            label: "Key(length: 16)".to_string(),
            datatype: "text".to_string(),
            default: "abcdefghijklmnop".to_string(),
            tooltip:"".to_string(),
            items: vec![                          
            ],
        });
        options.push(ExtensionOption {
            name: "iv".to_string(),
            label: "iv".to_string(),
            datatype: "text".to_string(),
            default: "".to_string(),
            tooltip:"".to_string(),
            items: vec![                          
            ],
        });


      
        options.push(ExtensionOption {
            name: "output_mode".to_string(),
            label: "Output mode".to_string(),
            datatype: "select".to_string(),
            default: "Hex".to_string(),
            tooltip:"".to_string(),
            items: vec![
                "Hex".to_string(),
                "Base64".to_string(),
                                        
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
        let result = encoding::crypto::rabbit::encode(input, Some(options.clone()));
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
        let result = encoding::crypto::rabbit::decode(input, Some(options.clone()));
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
