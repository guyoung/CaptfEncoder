use std::collections::HashMap;

use super::internal::anyhow::Result;

use crate::EncodingResult;

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::zero85::ToZ85;
    let result = input.as_bytes().to_z85()?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };

    Ok(result)
}

pub fn decode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::zero85::FromZ85;
    
    let result = input.from_z85()?;

    let val = String::from_utf8_lossy(&result).to_string();

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };

    Ok(result)
}
