use std::collections::HashMap;

use rulinalg::matrix::Matrix;

use super::internal::anyhow::Result;
use super::internal::anyhow::*;

use crate::get_option;
use crate::EncodingResult;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::cipher_crypt::{Cipher, Hill};

    let rows: usize = get_option("rows", &options, "3").parse()?;
    let cols: usize = get_option("cols", &options, "3").parse()?;
    let data: Vec<isize> = get_option("data", &options, "")
        .split(",")
        .map(|x| x.trim().parse::<isize>().unwrap())
        .collect();

    let encoder = Hill::new(Matrix::new(rows, cols, data));

    let result = encoder.encrypt(input).or_else(|e| Err(anyhow!("{}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };

    Ok(result)
}

pub fn decode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::cipher_crypt::{Cipher, Hill};

    let rows: usize = get_option("rows", &options, "3").parse()?;
    let cols: usize = get_option("cols", &options, "3").parse()?;
    let data: Vec<isize> = get_option("data", &options, "")
        .split(",")
        .map(|x| x.parse::<isize>().unwrap())
        .collect();

    let encoder = Hill::new(Matrix::new(rows, cols, data));

    let result = encoder.decrypt(input).or_else(|e| Err(anyhow!("{}", e)))?;

    let result = EncodingResult {
        successed: true,
        val: result,
        message: String::from(""),
    };

    Ok(result)
}
