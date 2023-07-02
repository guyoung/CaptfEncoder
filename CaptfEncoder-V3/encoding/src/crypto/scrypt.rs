use std::collections::HashMap;

use super::internal::anyhow::Result;

use crate::EncodingResult;

pub fn encode(input: &str, _options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::scrypt::{
        password_hash::{
            rand_core::OsRng, PasswordHasher,  SaltString,
        },
        Scrypt,
    };

    let salt = SaltString::generate(&mut OsRng);


    let val = Scrypt.hash_password(input.as_bytes(), &salt)?;

   

    let result = EncodingResult {
        successed: true,
        val: val.to_string(),
        message: String::from(""),
    };

    Ok(result)
}
