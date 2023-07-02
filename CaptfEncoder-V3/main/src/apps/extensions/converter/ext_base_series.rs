use std::collections::HashMap;

use fltk::group::*;

use anyhow::anyhow;

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
            name: "enctype".to_string(),
            label: "Type".to_string(),
            datatype: "select".to_string(),
            default: "Base64".to_string(),
            tooltip:"".to_string(),
            items: vec![
                "Base64".to_string(),
                "Base16".to_string(),
                "Base32".to_string(),
                "Base36".to_string(),
                "Base58".to_string(),
                "Base62".to_string(),
                "Base91".to_string(),
                "Base92".to_string(),
                "Base85(ascii85)".to_string(),
                "Base85(zero85)".to_string(),
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
        let enctype = options.get("enctype").unwrap();
        let result = match enctype.as_str() {
            "Base64" => encoding::converter::base64::encode(input, Some(options.clone())),
            "Base16" => encoding::converter::base16::encode(input, Some(options.clone())),
            "Base32" => encoding::converter::base32::encode(input, Some(options.clone())),
            "Base36" => encoding::converter::base36::encode(input, Some(options.clone())),
            "Base58" => encoding::converter::base58::encode(input, Some(options.clone())),
            "Base62" => encoding::converter::base62::encode(input, Some(options.clone())),
            "Base91" => encoding::converter::base91::encode(input, Some(options.clone())),
            "Base92" => encoding::converter::base92::encode(input, Some(options.clone())),
            "Base85(ascii85)" => encoding::converter::base85_ascii85::encode(input, Some(options.clone())),
            "Base85(zero85)" => encoding::converter::base85_zero85::encode(input, Some(options.clone())),
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
        input: &str,
        options: &HashMap<String, String>,
    ) -> Option<Box<dyn IExtensionResult>> {
        let enctype = options.get("enctype").unwrap();
        let result = match enctype.as_str() {
            "Base64" => encoding::converter::base64::decode(input, Some(options.clone())),
            "Base16" => encoding::converter::base16::decode(input, Some(options.clone())),
            "Base32" => encoding::converter::base32::decode(input, Some(options.clone())),
            "Base36" => encoding::converter::base36::decode(input, Some(options.clone())),
            "Base58" => encoding::converter::base58::decode(input, Some(options.clone())),
            "Base62" => encoding::converter::base62::decode(input, Some(options.clone())),
            "Base91" => encoding::converter::base91::decode(input, Some(options.clone())),
            "Base92" => encoding::converter::base92::decode(input, Some(options.clone())),
            "Base85(ascii85)" => encoding::converter::base85_ascii85::decode(input, Some(options.clone())),
            "Base85(zero85)" => encoding::converter::base85_zero85::decode(input, Some(options.clone())),
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
}
