use std::collections::HashMap;

use super::internal::anyhow::*;
use super::internal::anyhow::Result;

use crate::get_option;
use crate::EncodingResult;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::cipher_crypt::{Cipher, Scytale};

    let key: usize = get_option("key", &options, "key").parse().unwrap();

    let encoder = Scytale::new(key);

    let result = encoder.encrypt(input).or_else(|e| Err(anyhow!("{}", e)))?;

    let result = EncodingResult {
	successed: true,
	val: result,
	message: String::from(""),
};

Ok(result)
}

pub fn decode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::cipher_crypt::{Cipher, Scytale};

    let key: usize = get_option("key", &options, "key").parse().unwrap();

    let encoder = Scytale::new(key);

    let result = encoder.decrypt(input).or_else(|e| Err(anyhow!("{}", e)))?;

    let result = EncodingResult {
	successed: true,
	val: result,
	message: String::from(""),
};

Ok(result)
}
