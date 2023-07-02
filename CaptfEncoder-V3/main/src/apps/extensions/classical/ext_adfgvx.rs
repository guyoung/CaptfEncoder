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
            name: "polybius_key".to_string(),
            label: "Polybius key".to_string(),
            datatype: "text".to_string(),
            default: "ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8".to_string(),
            tooltip:"".to_string(),
            items: vec![],
        });

        options.push(ExtensionOption {
            name: "columnar_key".to_string(),
            label: "Columnar key".to_string(),
            datatype: "text".to_string(),
            default: "GERMAN".to_string(),
            tooltip:"".to_string(),
            items: vec![],
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
        let result = encoding::classical::adfgvx::encode(input, Some(options.clone()));
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
        let result = encoding::classical::adfgvx::decode(input, Some(options.clone()));
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
