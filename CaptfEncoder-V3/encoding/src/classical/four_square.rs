use std::collections::HashMap;

use super::internal::anyhow::Result;
use super::internal::anyhow::*;

use crate::get_option;
use crate::EncodingResult;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::ciphers::{Cipher, FourSquare};

    let alphabet = get_option("alphabet", &options, "");
    let key1 = get_option("key1", &options, "");
    let key2 = get_option("key2", &options, "");
    let pad: char = get_option("pad", &options, "X").parse()?;
    
    let input = input.to_uppercase();

    let encoder = FourSquare::new(alphabet.as_str(), key1.as_str(), key2.as_str(), pad);

    let result = encoder
        .encipher(&input)
        .or_else(|e| Err(anyhow!("{:?}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };

    Ok(result)
}

pub fn decode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::ciphers::{Cipher, FourSquare};

    let alphabet = get_option("alphabet", &options, "");
    let key1 = get_option("key1", &options, "");
    let key2 = get_option("key2", &options, "");
    let pad: char = get_option("pad", &options, "X").parse()?;

    let input = input.to_uppercase();

    let encoder = FourSquare::new(alphabet.as_str(), key1.as_str(), key2.as_str(), pad);
    
    let result = encoder
        .decipher(&input)
        .or_else(|e| Err(anyhow!("{:?}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };

    Ok(result)
}
