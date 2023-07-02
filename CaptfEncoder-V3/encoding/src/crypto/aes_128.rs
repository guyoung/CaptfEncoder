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
    use super::internal::aes::Aes128;

    let key = get_option("key", &options, "");
    let iv = get_option("iv", &options, "");
    let cipher_mode = get_option("cipher_mode", &options, "ECB");
    let padding_mode = get_option("padding_mode", &options, "Pkcs7");
    let output_mode = get_option("output_mode", &options, "Hex");

    let val = {
        match cipher_mode.as_str() {
            "CBC" => match padding_mode.as_str() {
                "Pkcs7" => {
                    type Aes128_ = Cbc<Aes128, Pkcs7>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "AnsiX923" => {
                    type Aes128_ = Cbc<Aes128, AnsiX923>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "Iso7816" => {
                    type Aes128_ = Cbc<Aes128, Iso7816>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "NoPadding" => {
                    type Aes128_ = Cbc<Aes128, NoPadding>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "ZeroPadding" => {
                    type Aes128_ = Cbc<Aes128, ZeroPadding>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                _ => None,
            },
            "ECB" => match padding_mode.as_str() {
                "Pkcs7" => {
                    type Aes128_ = Ecb<Aes128, Pkcs7>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "AnsiX923" => {
                    type Aes128_ = Ecb<Aes128, AnsiX923>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "Iso7816" => {
                    type Aes128_ = Ecb<Aes128, Iso7816>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "NoPadding" => {
                    type Aes128_ = Ecb<Aes128, NoPadding>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "ZeroPadding" => {
                    type Aes128_ = Ecb<Aes128, ZeroPadding>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                _ => None,
            },
            "CFB" => match padding_mode.as_str() {
                "Pkcs7" => {
                    type Aes128_ = Cfb<Aes128, Pkcs7>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "AnsiX923" => {
                    type Aes128_ = Cfb<Aes128, AnsiX923>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "Iso7816" => {
                    type Aes128_ = Cfb<Aes128, Iso7816>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "NoPadding" => {
                    type Aes128_ = Cfb<Aes128, NoPadding>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "ZeroPadding" => {
                    type Aes128_ = Cfb<Aes128, ZeroPadding>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                _ => None,
            },
            "OFB" => match padding_mode.as_str() {
                "Pkcs7" => {
                    type Aes128_ = Ofb<Aes128, Pkcs7>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "AnsiX923" => {
                    type Aes128_ = Ofb<Aes128, AnsiX923>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "Iso7816" => {
                    type Aes128_ = Ofb<Aes128, Iso7816>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "NoPadding" => {
                    type Aes128_ = Ofb<Aes128, NoPadding>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.encrypt_vec(input.as_bytes()))
                }
                "ZeroPadding" => {
                    type Aes128_ = Ofb<Aes128, ZeroPadding>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
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
    use super::internal::aes::Aes128;

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
                    type Aes128_ = Cbc<Aes128, Pkcs7>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "AnsiX923" => {
                    type Aes128_ = Cbc<Aes128, AnsiX923>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "Iso7816" => {
                    type Aes128_ = Cbc<Aes128, Iso7816>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "NoPadding" => {
                    type Aes128_ = Cbc<Aes128, NoPadding>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "ZeroPadding" => {
                    type Aes128_ = Cbc<Aes128, ZeroPadding>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                _ => None,
            },
            "ECB" => match padding_mode.as_str() {
                "Pkcs7" => {
                    type Aes128_ = Ecb<Aes128, Pkcs7>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "AnsiX923" => {
                    type Aes128_ = Ecb<Aes128, AnsiX923>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "Iso7816" => {
                    type Aes128_ = Ecb<Aes128, Iso7816>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "NoPadding" => {
                    type Aes128_ = Ecb<Aes128, NoPadding>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "ZeroPadding" => {
                    type Aes128_ = Ecb<Aes128, ZeroPadding>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                _ => None,
            },
            "CFB" => match padding_mode.as_str() {
                "Pkcs7" => {
                    type Aes128_ = Cfb<Aes128, Pkcs7>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "AnsiX923" => {
                    type Aes128_ = Cfb<Aes128, AnsiX923>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "Iso7816" => {
                    type Aes128_ = Cfb<Aes128, Iso7816>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "NoPadding" => {
                    type Aes128_ = Cfb<Aes128, NoPadding>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "ZeroPadding" => {
                    type Aes128_ = Cfb<Aes128, ZeroPadding>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                _ => None,
            },
            "OFB" => match padding_mode.as_str() {
                "Pkcs7" => {
                    type Aes128_ = Ofb<Aes128, Pkcs7>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "AnsiX923" => {
                    type Aes128_ = Ofb<Aes128, AnsiX923>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "Iso7816" => {
                    type Aes128_ = Ofb<Aes128, Iso7816>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "NoPadding" => {
                    type Aes128_ = Ofb<Aes128, NoPadding>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
                    Some(cipher.decrypt_vec(&input.unwrap())?)
                }
                "ZeroPadding" => {
                    type Aes128_ = Ofb<Aes128, ZeroPadding>;
                    let cipher = Aes128_::new_from_slices(&key.as_bytes(), &iv.as_bytes())?;
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
