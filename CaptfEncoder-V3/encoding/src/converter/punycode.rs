use std::collections::HashMap;

use super::internal::anyhow::Result;
use super::internal::anyhow::*;

use crate::EncodingResult;

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let val = super::internal::punycode::encode(input).or_else(|_| Err(anyhow!("Error")))?;

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    Ok(result)
}

pub fn decode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let val = super::internal::punycode::decode(input).or_else(|_| Err(anyhow!("Error")))?;

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    Ok(result)
}
