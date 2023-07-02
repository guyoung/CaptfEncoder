use std::collections::HashMap;

use super::internal::anyhow::Result;
use super::internal::anyhow::*;

use crate::EncodingResult;
use crate::get_option;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::cipher_crypt::{Affine, Cipher};

    let a: usize = get_option("a", &options, "3").parse().unwrap();
    let b: usize =  get_option("b", &options, "7").parse().unwrap();
    let encoder = Affine::new((a, b));

    let result = encoder.encrypt(input).or_else(|e| Err(anyhow!("{}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };
    Ok(result)
}

pub fn decode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::cipher_crypt::{Affine, Cipher};

    let a: usize = get_option("a", &options, "3").parse()?;
    let b: usize =  get_option("b", &options, "7").parse()?;
    let encoder = Affine::new((a, b));

    let result = encoder.decrypt(input).or_else(|e| Err(anyhow!("{}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };

    Ok(result)
}
