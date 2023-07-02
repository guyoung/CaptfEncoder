use std::collections::HashMap; 

use super::internal::anyhow::Result;

use crate::EncodingResult;

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let val = super::internal::base91::slice_encode(input.as_bytes());

    let result = EncodingResult {
        successed: true,
        val: String::from_utf8_lossy(&val).to_string(),
        message: String::from(""),
    };
    
    Ok(result)
}

pub fn decode(input: &str, _options: Option<HashMap<String, String>>)-> Result<EncodingResult> {
    let val = super::internal::base91::slice_decode(input.as_bytes());

    let result = EncodingResult {
        successed: true,
        val: String::from_utf8_lossy(&val).to_string(),
        message: String::from(""),
    };
    
    Ok(result)
}
