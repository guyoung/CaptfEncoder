use std::collections::HashMap; 

use super::internal::anyhow::Result;

use crate::EncodingResult;

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let val = super::internal::html_escape::encode_text(input);

    let result = EncodingResult {
        successed: true,
        val: val.into_owned(),
        message: String::from(""),
    };
    
    Ok(result)
}

pub fn decode(input: &str, _options: Option<HashMap<String, String>>)-> Result<EncodingResult> {

    let mut val = String::new(); 

    let _ = super::internal::html_escape::decode_html_entities_to_string(input, &mut val);

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    
    Ok(result)
}
