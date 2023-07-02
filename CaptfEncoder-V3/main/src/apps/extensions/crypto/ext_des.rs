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
            label: "Key".to_string(),
            datatype: "text".to_string(),
            default: "abcdefgh".to_string(),
            tooltip: "Length 8".to_string(),
            items: vec![],
        });
        options.push(ExtensionOption {
            name: "iv".to_string(),
            label: "iv".to_string(),
            datatype: "text".to_string(),
            default: "".to_string(),
            tooltip: "ECB mod can be empty,other mod length 8".to_string(),
            items: vec![],
        });

        options.push(ExtensionOption {
            name: "cipher_mode".to_string(),
            label: "Cipher mode".to_string(),
            datatype: "select".to_string(),
            default: "ECB".to_string(),
            tooltip: "".to_string(),
            items: vec![
                "CBC".to_string(),
                "ECB".to_string(),
                "CFB".to_string(),
                "OFB".to_string(),
            ],
        });

        options.push(ExtensionOption {
            name: "padding_mode".to_string(),
            label: "Padding mode".to_string(),
            datatype: "select".to_string(),
            default: "Pkcs7".to_string(),
            tooltip: "".to_string(),
            items: vec![
                "Pkcs7".to_string(),
                "AnsiX923".to_string(),
                "Iso7816".to_string(),
                "NoPadding".to_string(),
                "ZeroPadding".to_string(),
            ],
        });
        options.push(ExtensionOption {
            name: "output_mode".to_string(),
            label: "Output mode".to_string(),
            datatype: "select".to_string(),
            default: "Hex".to_string(),
            tooltip: "".to_string(),
            items: vec!["Hex".to_string(), "Base64".to_string()],
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
        let result = encoding::crypto::des::encode(input, Some(options.clone()));
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
        let result = encoding::crypto::des::decode(input, Some(options.clone()));
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
