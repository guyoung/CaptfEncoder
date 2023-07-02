use std::collections::HashMap;

use super::internal::anyhow::Result;
use super::internal::base64;

use crate::get_option;
use crate::EncodingResult;

use crate::to_hex;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::rabbit::cipher::{StreamCipher};
    use super::internal::rabbit::Rabbit;

    let key = get_option("key", &options, "");
    let iv = get_option("iv", &options, "");
    let output_mode = get_option("output_mode", &options, "Hex");

    let mut cipher: Rabbit;

    let key = <&[u8; 16]>::try_from(key.as_bytes())?;

    if iv.is_empty() {
        cipher = Rabbit::setup_without_iv(*key);
    } else {
        let iv = <&[u8; 8]>::try_from(iv.as_bytes())?;

        cipher = Rabbit::setup(*key, *iv);
    }

    let mut buffer = input.as_bytes().to_owned();

    let _ = cipher.apply_keystream(&mut buffer);

    let mut _out: String = String::from("");

    if output_mode == "Hex" {
        _out = to_hex(&buffer);
    } else if output_mode == "Base64" {
        _out = base64::encode(&buffer);
    }

    
    let result = EncodingResult {
        successed: true,
        val: String::from(""),
        message: String::from(""),
    };

    Ok(result)
}

pub fn decode(_input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let result = EncodingResult {
        successed: true,
        val: String::from(""),
        message: String::from(""),
    };

    Ok(result)
}
