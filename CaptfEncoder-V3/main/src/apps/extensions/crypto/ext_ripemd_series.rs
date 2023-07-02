use std::collections::HashMap;

use fltk::group::*;

use anyhow::anyhow;

use crate::apps::widgets::WgtEncoderEncode;

use super::super::encoding;
use super::super::ExtensionOption;
use super::super::IExtensionResult;

#[derive(Clone, Debug)]
pub struct Component {}

impl super::super::IExtensionComponent for Component {
    fn render(&self, grp: &Group) {
        let mut options: Vec<ExtensionOption> = Vec::new();
        
        options.push(ExtensionOption {
            name: "enctype".to_string(),
            label: "Type".to_string(),
            datatype: "select".to_string(),
            default: "RIPEMD-128".to_string(),
            tooltip:"".to_string(),
            items: vec![
                "RIPEMD-128".to_string(),
                "RIPEMD-160".to_string(),
                "RIPEMD-256".to_string(),
                "RIPEMD-320".to_string(),               
            ],
        });

        let mut wgt_encoder = WgtEncoderEncode::new(&grp, &options);

        wgt_encoder.init(self);
    }
}

impl super::super::IEncoderHandler for Component {
    fn encode(
        &self,
        input: &str,
        options: &HashMap<String, String>,
    ) -> Option<Box<dyn IExtensionResult>> {
        let enctype = options.get("enctype").unwrap();
        let result = match enctype.as_str() {
            "RIPEMD-128" => encoding::crypto::ripemd128::encode(input, Some(options.clone())),
            "RIPEMD-160" => encoding::crypto::ripemd160::encode(input, Some(options.clone())),
            "RIPEMD-256" => encoding::crypto::ripemd256::encode(input, Some(options.clone())),
            "RIPEMD-320" => encoding::crypto::ripemd320::encode(input, Some(options.clone())),          
            _ => Err(anyhow!("not a valid enctype")),
        };
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
        _input: &str,
        _options: &HashMap<String, String>,
    ) -> Option<Box<dyn IExtensionResult>> {
        None
    }
    
}
