use std::collections::HashMap;

use super::internal::anyhow::Result;

use crate::get_option;
use crate::EncodingResult;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::md5::{Md5, Digest};

    let bits = get_option("bits", &options, "32");

    let mut hasher = Md5::new();
    hasher.update(input);
    let val = hasher.finalize();
    let mut val = format!("{:x}", val);

    if bits == "16" {
        val = (&val[8..24]).to_owned();
    }

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };

    Ok(result)
}
