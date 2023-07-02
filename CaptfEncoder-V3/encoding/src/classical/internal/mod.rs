pub extern crate anyhow;
pub extern crate regex;


pub const ALPHABET: &str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

pub fn binary_to_char(bin: &str) -> Result<char, String> {
    let binary = bin.as_bytes().iter().map(|b| b - 48).collect::<Vec<u8>>();
    for bit in &binary {
        if *bit > 1 {
            return Err(String::from("Must be a valid binary number"));
        }
    }

    Ok((binary.iter().fold(0, |x, &b| x * 2 + b as u8) + 65) as char)
}

pub mod cipher_crypt;
pub mod ciphers;
pub mod baconian;