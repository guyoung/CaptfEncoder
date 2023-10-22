use std::collections::HashMap;

use fltk::group::*;

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
            name: "hash_type".to_string(),
            label: "Hash type".to_string(),
            datatype: "select".to_string(),
            default: "MD5".to_string(),
            tooltip:"".to_string(),
            items: vec![
                "MD5".to_string(),
                "SHA1".to_string(),
                "SHA256".to_string(),
                "SHA224".to_string(),   
                "SHA384".to_string(),     
                "SHA512".to_string(),                 
            ],
        });

        options.push(ExtensionOption {
            name: "secure_key".to_string(),
            label: "Secure key".to_string(),
            datatype: "text".to_string(),
            default: "key".to_string(),
            tooltip:"".to_string(),
            items: vec![
                         
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
        let result = encoding::crypto::hmac::encode(input, Some(options.clone()));
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

