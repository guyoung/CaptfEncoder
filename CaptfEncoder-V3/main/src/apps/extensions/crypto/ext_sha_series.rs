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
            default: "SHA1".to_string(),
            tooltip:"".to_string(),
            items: vec![
                "SHA1".to_string(),
                "SHA256".to_string(),
                "SHA224".to_string(),
                "SHA384".to_string(),   
                "SHA512".to_string(),
                "SHA3-224".to_string(),
                "SHA3-256".to_string(),
                "SHA3-384".to_string(),
                "SHA3-512".to_string(),            
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
            "SHA1" => encoding::crypto::sha1::encode(input, Some(options.clone())),
            "SHA256" => encoding::crypto::sha256::encode(input, Some(options.clone())),
            "SHA224" => encoding::crypto::sha224::encode(input, Some(options.clone())),
            "SHA384" => encoding::crypto::sha384::encode(input, Some(options.clone())),    
            "SHA512" => encoding::crypto::sha512::encode(input, Some(options.clone())),
            "SHA3-224" => encoding::crypto::sha3_224::encode(input, Some(options.clone())),
            "SHA3-256" => encoding::crypto::sha3_256::encode(input, Some(options.clone())),
            "SHA3-384" => encoding::crypto::sha3_384::encode(input, Some(options.clone())),
            "SHA3-512" => encoding::crypto::sha3_512::encode(input, Some(options.clone())),
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
