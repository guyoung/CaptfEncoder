use std::collections::HashMap;

use super::internal::anyhow::*;
use super::internal::anyhow::Result;

use crate::EncodingResult;
use crate::get_option;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::ciphers::{Cipher, Beaufort};

    let key = get_option("key", &options, "");    

    let input = input.to_uppercase();

    let encoder = Beaufort::new(key.as_str());

    let result = encoder.encipher(&input).or_else(|e| Err(anyhow!("{:?}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };
    
    Ok(result)
}

pub fn decode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::ciphers::{Cipher, Beaufort};

    let key = get_option("key", &options, "");    

    let input = input.to_uppercase();

    let encoder = Beaufort::new(key.as_str());

    let result = encoder.decipher(&input).or_else(|e| Err(anyhow!("{:?}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };
    
    Ok(result)
}