use std::collections::HashMap;
use std::fmt::Write;

use super::internal::anyhow::Result;

use crate::from_hex;

use crate::EncodingResult;

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let delimiter = "\\x";

    let bytes = input.as_bytes();

    let mut out = String::new();

    for i in 0..bytes.len() {
        write!(&mut out, "{}", delimiter).unwrap();
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
    let delimiter = "\\x";

    let val: String;

    val = input.replace(delimiter, "");

    let bytes: Vec<u8> = from_hex(&val)?;

    let out = String::from_utf8_lossy(&bytes).to_string();

    let result = EncodingResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
