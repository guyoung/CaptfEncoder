use std::collections::HashMap;

use super::internal::anyhow::Result;

use crate::get_option;
use crate::EncodingResult;

use crate::to_hex;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::bcrypt_pbkdf::bcrypt_pbkdf;

    let rounds: u32 = get_option("rounds", &options, "4").parse()?;
    let salt = get_option("salt", &options, "");

    let mut out = [0u8; 24];

    let _ = bcrypt_pbkdf(input,  salt.as_bytes(),  rounds, &mut out);

    let result = EncodingResult {
        successed: true,
        val: to_hex(&out),
        message: String::from(""),
    };

    Ok(result)
}
