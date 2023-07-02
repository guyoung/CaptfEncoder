use std::collections::HashMap;
use std::fmt::Write;
use std::fs::File;
use std::io::Read;

use super::internal::anyhow::Result;

use crate::MiscResult;

use super::internal::crypto::digest::Digest;
use super::internal::crypto::*;

use super::internal::crc32fast;

pub fn execute(input: &str, _options: Option<HashMap<String, String>>) -> Result<MiscResult> {
    let mut file = File::open(input)?;

    let mut buffer: Vec<u8> = Vec::new();
    file.read_to_end(&mut buffer)?;

    let mut out = String::new();

    let mut hasher = md5::Md5::new();
    hasher.input(&buffer);
    writeln!(&mut out, "MD5: {}", hasher.result_str())?;

    let mut hasher = sha1::Sha1::new();
    hasher.input(&buffer);
    writeln!(&mut out, "SHA1: {}", hasher.result_str())?;
    
    let mut hasher = sha2::Sha256::new();
    hasher.input(&buffer);
    writeln!(&mut out, "SHA256: {}", hasher.result_str())?;

    let mut hasher = crc32fast::Hasher::new();
    hasher.update(&buffer);
    writeln!(&mut out, "CRC32: {}", hasher.finalize())?;

    let result = MiscResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
