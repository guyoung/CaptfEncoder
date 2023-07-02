use std::collections::HashMap;

use super::internal::anyhow::Result;

use crate::EncodingResult;

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::sm3::{Digest, Sm3};
    
    let mut hasher = Sm3::new();

    hasher.update(input.as_bytes());
 
    let val = hasher.finalize();

    let result = EncodingResult {
        successed: true,
        val: format!("{:x}", val),
        message: String::from(""),
    };

    Ok(result)
}
