use std::collections::HashMap;
use std::fmt::Write;

use super::internal::anyhow::Result;

use crate::ascii_string_from;
use crate::from_hex;

use crate::get_option;
use crate::EncodingResult;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let delimiter = get_option("delimiter", &options, "None");

    let bytes = input.as_bytes();

    let mut out = String::new();

    for i in 0..bytes.len() {
        if delimiter == "0x".to_string() || delimiter == "\\x".to_string() {
            write!(&mut out, "{}", delimiter).unwrap();
            write!(&mut out, "{:02x}", bytes[i]).unwrap();
        } else {
            write!(&mut out, "{:02x}", bytes[i]).unwrap();
            if i < bytes.len() - 1 {
                if delimiter == "None" {
                } else if delimiter == "Space" {
                    write!(&mut out, "{}", " ").unwrap();
                } else if delimiter == "LF" {
                    write!(&mut out, "{}", "\n").unwrap();
                } else if delimiter == "CRLF" {
                    write!(&mut out, "{}", "\r\n").unwrap();
                } else {
                    write!(&mut out, "{}", delimiter).unwrap();
                }
            }
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
    let encoding = get_option("encoding", &options, "utf-8");

    let val: String;

    match delimiter.as_str() {
        "None" => val = input.to_owned(),
        "Space" => val = input.replace(" ", ""),
        "LF" => val = input.replace("\n", ""),
        "CRLF" => val = input.replace("\r\n", ""),
        _ => val = input.replace(delimiter.as_str(), ""),
    }

    let bytes: Vec<u8> = from_hex(&val)?;

    let val = match encoding.as_str() {
        "utf-8" => String::from_utf8_lossy(&bytes).to_string(),
        "ascii" => ascii_string_from(&bytes),
        _ => String::from_utf8_lossy(&bytes).to_string(),
    };
    
    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };

    Ok(result)
}
