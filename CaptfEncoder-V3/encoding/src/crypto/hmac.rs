use std::collections::HashMap;

use super::internal::anyhow::Result;
use super::internal::anyhow::*;

use crate::get_option;
use crate::EncodingResult;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    let hash_type = get_option("hash_type", &options, "MD5");
    let secure_key = get_option("secure_key", &options, "");

    use super::internal::hmac::{Hmac, Mac, NewMac};
    use super::internal::md5::Md5;
    use super::internal::sha1::Sha1;
    use super::internal::sha2::{Sha224, Sha256, Sha384, Sha512};

    let val = {
        match hash_type.as_str() {
            "MD5" => {
                type Hmac_ = Hmac<Md5>;
                let mut mac = Hmac_::new_from_slice(secure_key.as_bytes()).or_else(|e| Err(anyhow!("{:?}", e)))?;
                mac.update(input.as_bytes());
                let val = mac.finalize();
                let val = val.into_bytes();
                format!("{:x}", val)
            },
            "SHA1" => {
                type Hmac_ = Hmac<Sha1>;
                let mut mac = Hmac_::new_from_slice(secure_key.as_bytes()).or_else(|e| Err(anyhow!("{:?}", e)))?;
                mac.update(input.as_bytes());
                let val = mac.finalize();
                let val = val.into_bytes();
                format!("{:x}", val)
                
            },
            "SHA256" => {
                type Hmac_ = Hmac<Sha256>;
                
                let mut mac = Hmac_::new_from_slice(secure_key.as_bytes()).or_else(|e| Err(anyhow!("{:?}", e)))?;
                mac.update(input.as_bytes());
                let val = mac.finalize();
                let val = val.into_bytes();
                format!("{:x}", val)
            },
            "SHA224" => {
                type Hmac_ = Hmac<Sha224>;
                
                let mut mac = Hmac_::new_from_slice(secure_key.as_bytes()).or_else(|e| Err(anyhow!("{:?}", e)))?;
                mac.update(input.as_bytes());
                let val = mac.finalize();
                let val = val.into_bytes();
                format!("{:x}", val)
            },
            "SHA384" => {
                type Hmac_ = Hmac<Sha384>;
                
                let mut mac = Hmac_::new_from_slice(secure_key.as_bytes()).or_else(|e| Err(anyhow!("{:?}", e)))?;
                mac.update(input.as_bytes());
                let val = mac.finalize();
                let val = val.into_bytes();
                format!("{:x}", val)
            },
            "SHA512" => {
                type Hmac_ = Hmac<Sha512>;
                let mut mac = Hmac_::new_from_slice(secure_key.as_bytes()).or_else(|e| Err(anyhow!("{:?}", e)))?;
                mac.update(input.as_bytes());
                let val = mac.finalize();
                let val = val.into_bytes();
                format!("{:x}", val)
            },
            _ => {                
               String::from("")
            }
        }
    };

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };

    Ok(result)
}
