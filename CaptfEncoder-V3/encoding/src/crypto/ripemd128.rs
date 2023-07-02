use std::collections::HashMap;

use super::internal::anyhow::Result;

use crate::EncodingResult;

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::ripemd128::{Ripemd128, Digest};
    
    let mut hasher = Ripemd128::new();

    hasher.input(input.as_bytes());
 
    let val = hasher.result();

    let result = EncodingResult {
        successed: true,
        val: format!("{:x}", val),
        message: String::from(""),
    };

    Ok(result)
}
