use std::collections::HashMap;

use super::internal::rsa::RsaPrivateKey;
use super::internal::rsa::RsaPublicKey;
use super::internal::rand::rngs::OsRng;
use super::internal::rsa::pkcs1::*;
use super::internal::rsa::pkcs8::FromPublicKey;


use super::internal::anyhow::Result;

use super::internal::base64;

use crate::get_option;

pub struct RSAKey {
    pub key_format: String,
    pub bits: usize,
    pub public_key: String,
    pub private_key: String,
}

pub fn generate_key(options: Option<HashMap<String, String>>) -> Result<RSAKey> {
    let bits: usize = get_option("bits", &options, "2048").parse()?;
    let key_format = get_option("key_format", &options, "PEM");

    let mut rng = OsRng;

    let private_key = RsaPrivateKey::new(&mut rng, bits)?;
    let public_key = RsaPublicKey::from(&private_key);

    let private_key = {
        match key_format.as_str() {
            "PEM" => {
                let key = private_key.to_pkcs1_pem()?;
                (&*key).to_owned()
            }
            "DER" => {
                let key = private_key.to_pkcs1_der()?;
                base64::encode(key.as_der())
            }
            _ => String::from(""),
        }
    };
    let public_key = {
        match key_format.as_str() {
            "PEM" => {
                let key = public_key.to_pkcs1_pem()?;
                (&*key).to_owned()
            }
            "DER" => {
                let key = public_key.to_pkcs1_der()?;
                base64::encode(key.as_der())
            }
            _ => String::from(""),
        }
    };

    Ok(RSAKey {
        key_format: key_format,
        bits: bits,
        public_key: public_key,
        private_key: private_key,
    })
}

pub fn public_key_from_der(der: &[u8]) -> Result<RsaPublicKey> {
    let k =
        RsaPublicKey::from_public_key_der(der).or_else(|_| RsaPublicKey::from_pkcs1_der(der))?;
    Ok(k)
}

pub fn public_key_from_pem(pem: &str) -> Result<RsaPublicKey> {
    let pem = pem.trim();
    let k =
        RsaPublicKey::from_public_key_pem(pem).or_else(|_| RsaPublicKey::from_pkcs1_pem(pem))?;
    Ok(k)
}

pub fn private_key_from_der(der: &[u8]) -> Result<RsaPrivateKey> {
    let k = RsaPrivateKey::from_pkcs1_der(der)?;

    Ok(k)
}

pub fn private_key_from_pem(pem: &str) -> Result<RsaPrivateKey> {
    let pem = pem.trim();
    let k = RsaPrivateKey::from_pkcs1_pem(pem)?;
    Ok(k)
}