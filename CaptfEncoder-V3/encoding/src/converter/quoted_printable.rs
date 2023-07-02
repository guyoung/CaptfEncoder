use std::collections::HashMap;

use super::internal::anyhow::Result;
use super::internal::anyhow::*;

use crate::EncodingResult;

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let val = super::internal::quoted_printable::encode_to_str(input.as_bytes());

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    Ok(result)
}

pub fn decode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::quoted_printable;

    let val = quoted_printable::decode(input.as_bytes(), quoted_printable::ParseMode::Strict)
        .or_else(|e| Err(anyhow!("{:?}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: String::from_utf8_lossy(&val).to_string(),
        message: String::from(""),
    };
    Ok(result)
}
