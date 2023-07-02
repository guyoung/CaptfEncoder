use std::collections::HashMap; 

use super::internal::anyhow::Result;

use crate::EncodingResult;

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let val = super::internal::urlencoding::encode(input).into_owned();

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    
    Ok(result)
}

pub fn decode(input: &str, _options: Option<HashMap<String, String>>)-> Result<EncodingResult> {
    let val = super::internal::urlencoding::decode(input)?;

    let result = EncodingResult {
        successed: true,
        val: val.into_owned(),
        message: String::from(""),
    };
    
    Ok(result)
}
