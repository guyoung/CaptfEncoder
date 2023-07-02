use std::collections::HashMap;

use super::internal::rand::rngs::OsRng;
use super::internal::rsa::PaddingScheme;
use super::internal::rsa::PublicKey;


use super::internal::anyhow::Result;

use super::internal::base64;

use crate::get_option;
use crate::EncodingResult;

use super::rsa_tool;



pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let key_format = get_option("key_format", &options, "PEM");
    let public_key = get_option("public_key", &options, "");

    if key_format == "PEM" {
        let public_key = rsa_tool::public_key_from_pem(&public_key)?;

        let mut rng = OsRng;

        let val = public_key.encrypt(
            &mut rng,
            PaddingScheme::new_pkcs1v15_encrypt(),
            input.as_bytes(),
        )?;

        let result = EncodingResult {
            successed: true,
            val: base64::encode(val),
            message: String::from(""),
        };
        return Ok(result);
    } else if key_format == "DER" {
    }

    let result = EncodingResult {
        successed: true,
        val: String::from(""),
        message: String::from(""),
    };
    Ok(result)
}

pub fn decode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let key_format = get_option("key_format", &options, "PEM");
    let private_key = get_option("private_key", &options, "");


    let input = base64::decode(input)?;

    if key_format == "PEM" {
        let private_key = rsa_tool::private_key_from_pem(&private_key)?;

        let val = private_key.decrypt(PaddingScheme::new_pkcs1v15_encrypt(), &input)?;

        let result = EncodingResult {
            successed: true,
            val: String::from_utf8_lossy(&val).to_string(),
            message: String::from(""),
        };
        return Ok(result);
    } else if key_format == "DER" {
    }

    let result = EncodingResult {
        successed: true,
        val: String::from(""),
        message: String::from(""),
    };
    Ok(result)
}
