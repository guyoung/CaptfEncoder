use std::collections::HashMap;

use super::internal::anyhow::Result;
use super::internal::base64;

use crate::get_option;
use crate::EncodingResult;

use crate::to_hex;
use crate::from_hex;

pub fn encode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
  
    use super::internal::crypto::rc4::Rc4;
    use super::internal::crypto::symmetriccipher::SynchronousStreamCipher;

    let key = get_option("key", &options, "");
    let output_mode = get_option("output_mode", &options, "Hex");  

    let mut cipher = Rc4::new(&key.as_bytes());

    let input = input.as_bytes();

    let mut output = input.clone().to_owned();   

    cipher.process(input, &mut output);   

 

    let mut out: String = String::from("");

    if output_mode == "Hex" {
        out = to_hex(&output );
    } else if output_mode == "Base64" {
        out = base64::encode(&output);
    }
    let result = EncodingResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}

pub fn decode(input: &str, options: Option<HashMap<String, String>>) -> Result<EncodingResult> {
    
    use super::internal::crypto::rc4::Rc4;
    use super::internal::crypto::symmetriccipher::SynchronousStreamCipher;

    let key = get_option("key", &options, "");
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

    let mut cipher = Rc4::new(&key.as_bytes());    

    let mut output = input.clone().unwrap();   

    cipher.process(&input.unwrap(), &mut output);    
  
    let out = String::from_utf8_lossy(&output).to_string();

    let result = EncodingResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}

