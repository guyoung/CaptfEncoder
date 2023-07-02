use std::collections::HashMap;

use super::internal::anyhow::Result;
use super::internal::base64;

use crate::get_option;
use crate::EncodingResult;

use crate::to_hex;
use crate::from_hex;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::block_modes::block_padding::{
        AnsiX923, Iso7816, NoPadding, Pkcs7, ZeroPadding,
    };
    use super::internal::block_modes::BlockMode;
    use super::internal::block_modes::{Cbc, Cfb, Ecb, Ofb};
    use super::internal::des::Des;

    let key = get_option("key", &options, "");
    let iv = get_option("iv", &options, "");
    let cipher_mode = get_option("cipher_mode", &options, "ECB");
    let padding_mode = get_option("padding_mode", &options, "Pkcs7");
    let output_mode = get_option("output_mode", &options, "Hex");  

    let val = {
        match cipher_mode.as_str() {
            "CBC" => match padding_mode.as_str() {
                "Pkcs7" => {
                    type Des_ = Cbc<Des, Pkcs7>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "AnsiX923" => {
                    type Des_ = Cbc<Des, AnsiX923>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "Iso7816" => {
                    type Des_ = Cbc<Des, Iso7816>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "NoPadding" => {
                    type Des_ = Cbc<Des, NoPadding>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "ZeroPadding" => {
                    type Des_ = Cbc<Des, ZeroPadding>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                _ => None,
            },
            "ECB" => match padding_mode.as_str() {
                "Pkcs7" => {
                    type Des_ = Ecb<Des, Pkcs7>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "AnsiX923" => {
                    type Des_ = Ecb<Des, AnsiX923>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "Iso7816" => {
                    type Des_ = Ecb<Des, Iso7816>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "NoPadding" => {
                    type Des_ = Ecb<Des, NoPadding>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "ZeroPadding" => {
                    type Des_ = Ecb<Des, ZeroPadding>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                _ => None,
            },
            "CFB" => match padding_mode.as_str() {
                "Pkcs7" => {
                    type Des_ = Cfb<Des, Pkcs7>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "AnsiX923" => {
                    type Des_ = Cfb<Des, AnsiX923>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "Iso7816" => {
                    type Des_ = Cfb<Des, Iso7816>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "NoPadding" => {
                    type Des_ = Cfb<Des, NoPadding>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "ZeroPadding" => {
                    type Des_ = Cfb<Des, ZeroPadding>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                _ => None,
            },
            "OFB" => match padding_mode.as_str() {
                "Pkcs7" => {
                    type Des_ = Ofb<Des, Pkcs7>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "AnsiX923" => {
                    type Des_ = Ofb<Des, AnsiX923>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "Iso7816" => {
                    type Des_ = Ofb<Des, Iso7816>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "NoPadding" => {
                    type Des_ = Ofb<Des, NoPadding>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "ZeroPadding" => {
                    type Des_ = Ofb<Des, ZeroPadding>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                _ => None,
            },
            _ => None,
        }
    };

    match val {
        Some(val) => {
            let mut out: String = String::from("");

            if output_mode == "Hex" {
                out = to_hex(&val);
            } else if output_mode == "Base64" {
                out = base64::encode(&val);
            }
            let result = EncodingResult {
                successed: true,
                val: out,
                message: String::from(""),
            };

            Ok(result)
        }
        None => {
            let result = EncodingResult {
                successed: true,
                val: String::from(""),
                message: String::from(""),
            };

            Ok(result)
        }
    }
}

pub fn decode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    use super::internal::block_modes::block_padding::{
        AnsiX923, Iso7816, NoPadding, Pkcs7, ZeroPadding,
    };
    use super::internal::block_modes::BlockMode;
    use super::internal::block_modes::{Cbc, Cfb, Ecb, Ofb};
    use super::internal::des::Des;

    let key = get_option("key", &options, "");
    let iv = get_option("iv", &options, "");
    let cipher_mode = get_option("cipher_mode", &options, "ECB");
    let padding_mode = get_option("padding_mode", &options, "Pkcs7");
    let output_mode = get_option("output_mode", &options, "Hex");

    let input = {
        if output_mode == "Hex" {
            Some(from_hex(input)?)
        } else if output_mode == "Base64" {
           Some(base64::decode(input.as_bytes())?)
        }else {
            None
        }        
    };

    if input.is_none(){
        let result = EncodingResult {
            successed: true,
            val: String::from(""),
            message: String::from(""),
        };

        return Ok(result);
    }

  

    let val = {
        match cipher_mode.as_str() {
            "CBC" => match padding_mode.as_str() {
                "Pkcs7" => {
                    type Des_ = Cbc<Des, Pkcs7>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "AnsiX923" => {
                    type Des_ = Cbc<Des, AnsiX923>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "Iso7816" => {
                    type Des_ = Cbc<Des, Iso7816>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "NoPadding" => {
                    type Des_ = Cbc<Des, NoPadding>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "ZeroPadding" => {
                    type Des_ = Cbc<Des, ZeroPadding>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                _ => None,
            },
            "ECB" => match padding_mode.as_str() {
                "Pkcs7" => {
                    type Des_ = Ecb<Des, Pkcs7>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "AnsiX923" => {
                    type Des_ = Ecb<Des, AnsiX923>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "Iso7816" => {
                    type Des_ = Ecb<Des, Iso7816>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "NoPadding" => {
                    type Des_ = Ecb<Des, NoPadding>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "ZeroPadding" => {
                    type Des_ = Ecb<Des, ZeroPadding>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                _ => None,
            },
            "CFB" => match padding_mode.as_str() {
                "Pkcs7" => {
                    type Des_ = Cfb<Des, Pkcs7>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "AnsiX923" => {
                    type Des_ = Cfb<Des, AnsiX923>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "Iso7816" => {
                    type Des_ = Cfb<Des, Iso7816>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "NoPadding" => {
                    type Des_ = Cfb<Des, NoPadding>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "ZeroPadding" => {
                    type Des_ = Cfb<Des, ZeroPadding>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                _ => None,
            },
            "OFB" => match padding_mode.as_str() {
                "Pkcs7" => {
                    type Des_ = Ofb<Des, Pkcs7>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "AnsiX923" => {
                    type Des_ = Ofb<Des, AnsiX923>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "Iso7816" => {
                    type Des_ = Ofb<Des, Iso7816>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "NoPadding" => {
                    type Des_ = Ofb<Des, NoPadding>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "ZeroPadding" => {
                    type Des_ = Ofb<Des, ZeroPadding>;
                    let cipher = Des_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                _ => None,
            },
            _ => None,
        }
    };

    match val {
       Some(val) => {    
            
            let out = String::from_utf8_lossy(&val).to_string();

            let result = EncodingResult {
                successed: true,
                val: out,
                message: String::from(""),
            };

            Ok(result)
        }
        None => {
            let result = EncodingResult {
                successed: true,
                val: String::from(""),
                message: String::from(""),
            };

            Ok(result)
        }
    }
}
