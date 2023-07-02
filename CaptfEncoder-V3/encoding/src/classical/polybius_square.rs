use std::collections::HashMap;

use super::internal::anyhow::Result;
use super::internal::anyhow::*;

use crate::get_option;
use crate::EncodingResult;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::cipher_crypt::{Cipher, Polybius};

    let alphabet_key = get_option("alphabet_key", &options, "");
    let column_ids: Vec<char> = get_option("column_ids", &options, "")
        .split(",")
        .map(|x| x.trim().parse::<char>().unwrap())
        .collect();
    let column_ids: [char; 6] = column_ids.try_into().or_else(|v: Vec<char>| {
        Err(anyhow!(
            "Expected a Vec of length {} but it was {}",
            6,
            v.len()
        ))
    })?;
    let row_ids: Vec<char> = get_option("row_ids", &options, "")
        .split(",")
        .map(|x| x.trim().parse::<char>().unwrap())
        .collect();
    let row_ids: [char; 6] = row_ids.try_into().or_else(|v: Vec<char>| {
        Err(anyhow!(
            "Expected a Vec of length {} but it was {}",
            6,
            v.len()
        ))
    })?;

    let encoder = Polybius::new((alphabet_key, column_ids, row_ids));

    let result = encoder.encrypt(input).or_else(|e| Err(anyhow!("{}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };

    Ok(result)
}

pub fn decode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::cipher_crypt::{Cipher, Polybius};

    let alphabet_key = get_option("alphabet_key", &options, "");
    let column_ids: Vec<char> = get_option("column_ids", &options, "")
        .split(",")
        .map(|x| x.trim().parse::<char>().unwrap())
        .collect();
    let column_ids: [char; 6] = column_ids.try_into().or_else(|v: Vec<char>| {
        Err(anyhow!(
            "Expected a Vec of length {} but it was {}",
            6,
            v.len()
        ))
    })?;
    let row_ids: Vec<char> = get_option("row_ids", &options, "")
        .split(",")
        .map(|x| x.trim().parse::<char>().unwrap())
        .collect();
    let row_ids: [char; 6] = row_ids.try_into().or_else(|v: Vec<char>| {
        Err(anyhow!(
            "Expected a Vec of length {} but it was {}",
            6,
            v.len()
        ))
    })?;

    let encoder = Polybius::new((alphabet_key, column_ids, row_ids));

    let result = encoder.decrypt(input).or_else(|e| Err(anyhow!("{}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };

    Ok(result)
}
