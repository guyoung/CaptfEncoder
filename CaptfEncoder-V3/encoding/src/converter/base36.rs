use std::collections::HashMap;

use super::internal::anyhow::Result;

use crate::EncodingResult;

const BASE36: &'static str = "0123456789abcdefghijklmnopqrstuvwxyz";

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let val = super::internal::base_x::encode(BASE36, input.as_bytes());

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    
    Ok(result)
}

pub fn decode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let result = super::internal::base_x::decode(BASE36, input)?;

    let val = String::from_utf8_lossy(&result).to_string();

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };

    Ok(result)  
}
