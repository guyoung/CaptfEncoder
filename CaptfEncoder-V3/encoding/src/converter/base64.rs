use std::collections::HashMap;

use super::internal::anyhow::Result;

use crate::EncodingResult;

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let val = super::internal::base64::encode(input);

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    
    Ok(result)
}

pub fn decode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let result = super::internal::base64::decode(input)?;

    let val = String::from_utf8_lossy(&result).to_string();

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };

    Ok(result)
}
