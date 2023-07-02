use std::collections::HashMap;
use std::fmt::Write;

use super::internal::anyhow::Result;

use crate::get_option;
use crate::EncodingResult;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let delimiter = " ";
    let base = get_option("base", &options, "16");

    let bytes = input.as_bytes();

    let mut out = String::new();

    for i in 0..bytes.len() {
        match base.as_str() {
            "2" => write!(&mut out, "{:b}", bytes[i]).unwrap(),
            "8" => write!(&mut out, "{:o}", bytes[i]).unwrap(),
            "10" => write!(&mut out, "{}", bytes[i]).unwrap(),
            "16" => write!(&mut out, "{:02x}", bytes[i]).unwrap(),
            _ => {}
        }

        if i < bytes.len() - 1 {
            write!(&mut out, "{}", delimiter).unwrap();
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
    let delimiter = " ";
    let base = get_option("base", &options, "16");

    let arr = input.split(delimiter);

    let mut bytes: Vec<u8> = Vec::new();

    for s in arr {
        let b = match base.as_str() {
            "2" => u8::from_str_radix(&s, 2)?,
            "8" => u8::from_str_radix(&s, 8)?,
            "10" => u8::from_str_radix(&s, 10)?,
            "16" => u8::from_str_radix(&s, 16)?,
            _ => u8::from_str_radix(&s, 16)?,
        };

        bytes.push(b);
    }

    let out = String::from_utf8_lossy(&bytes).to_string();

    let result = EncodingResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
