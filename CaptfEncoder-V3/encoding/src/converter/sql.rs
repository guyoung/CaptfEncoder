use std::collections::HashMap;
use std::fmt::Write;

use super::internal::anyhow::Result;

use crate::from_hex;

use crate::EncodingResult;

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let bytes = input.as_bytes();

    let mut out = String::new();
    write!(&mut out, "{}", "0x").unwrap();

    for i in 0..bytes.len() {
        write!(&mut out, "{:02x}", bytes[i]).unwrap();
    }

    let result = EncodingResult {
        successed: true,
        val: out,
        message: String::from(""),
    };
    Ok(result)
}

pub fn decode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let val: String;

    if input.starts_with("0x") {
        val = input[2..].to_owned();
    } else {
        val = input.to_owned();
    }

    let bytes: Vec<u8> = from_hex(&val)?;

    let out = String::from_utf8_lossy(&bytes).to_string();
    let result = EncodingResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
