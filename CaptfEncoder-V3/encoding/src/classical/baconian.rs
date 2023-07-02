use std::collections::HashMap;

use super::internal::anyhow::Result;
use super::internal::anyhow::*;

use crate::get_option;
use crate::EncodingResult;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let use_distinct_alphabet: bool =
        get_option("use_distinct_alphabet", &options, "false").parse()?;
    let encoder = super::internal::baconian::Baconian::new(use_distinct_alphabet).or_else(|e| Err(anyhow!("{}", e)))?;

    let result = encoder.encipher(input).or_else(|e| Err(anyhow!("{}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };

    Ok(result)
}

pub fn decode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let use_distinct_alphabet: bool =
        get_option("use_distinct_alphabet", &options, "false").parse()?;

    let encoder = super::internal::baconian::Baconian::new(use_distinct_alphabet).or_else(|e| Err(anyhow!("{}", e)))?;

    let result = encoder.decipher(input).or_else(|e| Err(anyhow!("{}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };

    Ok(result)
}
