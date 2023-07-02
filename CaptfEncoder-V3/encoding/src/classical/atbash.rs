use std::collections::HashMap;

use super::internal::anyhow::*;
use super::internal::anyhow::Result;

use crate::EncodingResult;

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::ciphers::{Cipher, Atbash};

    let encoder = Atbash::new();

    let result = encoder.encipher(input).or_else(|e| Err(anyhow!("{:?}", e)))?;

    let result = EncodingResult {
	successed: true,
	val: result,
	message: String::from(""),
};

Ok(result)
}

pub fn decode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::ciphers::{Cipher, Atbash};

    let encoder = Atbash::new();

    let result = encoder.decipher(input).or_else(|e| Err(anyhow!("{:?}", e)))?;

    let result = EncodingResult {
	successed: true,
	val: result,
	message: String::from(""),
};

Ok(result)
}
