use std::collections::HashMap;

use super::internal::anyhow::*;
use super::internal::anyhow::Result;

use crate::EncodingResult;

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let val = super::internal::ascii85::encode(input.as_bytes());

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    Ok(result)
}

pub fn decode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let result = super::internal::ascii85::decode(input).or_else(|e| Err(anyhow!("{:?}", e)))?;

    let val = String::from_utf8_lossy(&result).to_string();

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };

    Ok(result)
}
