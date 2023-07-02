use std::collections::HashMap;

use super::internal::anyhow::Result;
use super::internal::anyhow::*;

use crate::get_option;
use crate::EncodingResult;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::ciphers::{Cipher, RunningKey};

    let key = get_option("key", &options, "");

    let encoder = RunningKey::new(key.as_str());

    let result = encoder
        .encipher(input)
        .or_else(|e| Err(anyhow!("{:?}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };

    Ok(result)
}

pub fn decode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::ciphers::{Cipher, RunningKey};

    let key = get_option("key", &options, "");

    let encoder = RunningKey::new(key.as_str());

    let result = encoder
        .decipher(input)
        .or_else(|e| Err(anyhow!("{:?}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };

    Ok(result)
}
