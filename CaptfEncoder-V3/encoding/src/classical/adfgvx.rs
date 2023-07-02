use std::collections::HashMap;

use super::internal::anyhow::Result;
use super::internal::anyhow::*;

use crate::get_option;
use crate::EncodingResult;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::cipher_crypt::{Cipher, ADFGVX};

    let polybius_key = get_option("polybius_key", &options, "");
    let columnar_key = get_option("columnar_key", &options, "");
    let null_char = None;

    let encoder = ADFGVX::new((polybius_key, columnar_key, null_char));

    let result = encoder.encrypt(input).or_else(|e| Err(anyhow!("{}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };
    Ok(result)
}

pub fn decode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::cipher_crypt::{Cipher, ADFGVX};

    let polybius_key = get_option("polybius_key", &options, "");
    let columnar_key = get_option("columnar_key", &options, "");
    let null_char = None;

    let encoder = ADFGVX::new((polybius_key, columnar_key, null_char));
    let result = encoder.decrypt(input).or_else(|e| Err(anyhow!("{}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };
    Ok(result)
}
