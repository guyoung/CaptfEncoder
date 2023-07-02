use std::collections::HashMap;
use std::fmt::Write;

use super::internal::anyhow::Result;

use crate::from_hex;

use crate::get_option;
use crate::EncodingResult;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let delimiter = get_option("delimiter", &options, "&#x");

    let chars = input.chars();

    let mut out = String::new();

    for c in chars {
        write!(&mut out, "{}", delimiter).unwrap();
        match delimiter.as_str() {
            "&#" => write!(&mut out, "{:04}", c as i32).unwrap(),
            _ => write!(&mut out, "{:04x}", c as i32).unwrap(),
        }
    }
    let result = EncodingResult {
        successed: true,
        val: out,
        message: String::from(""),
    };
    Ok(result)
}

pub fn decode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let delimiter = get_option("delimiter", &options, "None");

    let val: String;

    match delimiter.as_str() {
        "None" => val = input.to_owned(),
        "Space" => val = input.replace(" ", ""),
        "LF" => val = input.replace("\n", ""),
        "CRLF" => val = input.replace("\r\n", ""),
        _ => val = input.replace(delimiter.as_str(), ""),
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
