use std::collections::HashMap;

use super::internal::anyhow::*;
use super::internal::anyhow::Result;
use super::internal::base64;

use crate::MiscResult;

pub fn execute(input: &str, _options: Option<HashMap<String, String>>) -> Result<MiscResult> {

    if !input.starts_with("data:") {
        return Err(anyhow!("not a valid base64 image"));
    }

    let mut base64_str = input.to_string();

    let offset = input.find(',').unwrap_or(input.len()) + 1;

    let _ = base64_str.drain(..offset);  

    let img_data = base64::decode(base64_str.clone())?;

    let _ = image::load_from_memory(&img_data)?;

    let out = base64_str.clone();

    let result = MiscResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
