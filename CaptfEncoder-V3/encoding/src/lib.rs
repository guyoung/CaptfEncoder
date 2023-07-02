#![allow(dead_code)]

use std::collections::HashMap;
use std::fmt::Write;
use std::num::ParseIntError;

#[derive(Clone, Debug)]
pub struct EncodingResult {
    pub successed: bool,
    pub val: String,
    pub message: String,
}

pub fn get_option(key: &str, options: &Option<HashMap<String, String>>, default: &str) -> String {
    let mut result = default;

    if let Some(options) = options {
        if let Some(val) = options.get(key) {
            result = val;
        }
    }

    result.to_owned()
}

pub mod asymmetric;
pub mod classical;
pub mod converter;
pub mod crypto;

#[macro_use]
extern crate lazy_static;
extern crate lipsum;
#[macro_use]
extern crate maplit;

#[macro_use]
extern crate enum_primitive;

pub fn from_hex(s: &str) -> Result<Vec<u8>, ParseIntError> {
    let mut s = s.to_owned();
    if s.len() % 2 == 1 {
        s = "0".to_owned() + &s;
    }

    (0..s.len())
        .step_by(2)
        .map(|i| u8::from_str_radix(&s[i..i + 2], 16))
        .collect()
}

pub fn to_hex(bytes: &[u8]) -> String {
    let mut s = String::with_capacity(bytes.len() * 2);
    for &b in bytes {
        write!(&mut s, "{:02x}", b).unwrap();
    }
    s
}

pub fn ascii_string_from(bytes: &[u8]) -> String {
    let mut s = String::new();
    for &b in bytes {
        let c = char::from_u32(b as u32);

        if let Some(c) = c {
            write!(&mut s, "{}", c).unwrap();
        } else {
            write!(&mut s, "\\x{:02x}", b).unwrap();
        }
    }
    format!("{:?}", s).replace("\"", "")  
}
