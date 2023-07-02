use std::collections::HashMap;

use super::internal::anyhow::Result;

use crate::EncodingResult;

const BASE62: &'static str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let val = super::internal::base_x::encode(BASE62, input.as_bytes());

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    
    Ok(result)
}

pub fn decode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let result = super::internal::base_x::decode(BASE62, input)?;

    let val = String::from_utf8_lossy(&result).to_string();

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };

    Ok(result)
  
}
