use std::collections::HashMap;

use super::internal::anyhow::Result;

use crate::EncodingResult;

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::sha3::{Digest, Sha3_256};
    
    let mut hasher = Sha3_256::new();

    hasher.update(input.as_bytes());
 
    let val = hasher.finalize();

    let result = EncodingResult {
        successed: true,
        val: format!("{:x}", val),
        message: String::from(""),
    };

    Ok(result)
}
