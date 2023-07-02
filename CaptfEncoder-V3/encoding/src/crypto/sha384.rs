use std::collections::HashMap;

use super::internal::anyhow::Result;

use crate::EncodingResult;

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::sha2::{Digest, Sha384};

    let mut hasher = Sha384::new();
    hasher.update(input.as_bytes());
	
    let val = hasher.finalize();

    let result = EncodingResult {
        successed: true,
        val: format!("{:x}", val),
        message: String::from(""),
    };

    Ok(result)
}
