//! # Input Validation
//!
//! ...

use super::{CipherInputError, CipherResult};
use std::collections::HashSet;

pub fn is_alpha(input: &str) -> CipherResult {
    for c in input.chars() {
        if !c.is_ascii_alphabetic() {
            return Err(CipherInputError::NotAlphabetic);
        }
    }
    Ok(String::new())
}

pub fn is_ascii(input: &str) -> CipherResult {
    for c in input.chars() {
        if !c.is_ascii() {
            return Err(CipherInputError::NotAscii);
        }
    }
    Ok(String::new())
}

pub fn in_alphabet(input: &str, alphabet: &str) -> CipherResult {
    for c in input.chars() {
        match alphabet.find(c) {
            None => return Err(CipherInputError::NotInAlphabet),
            _ => (),
        }
    }
    Ok(String::new())
}

pub fn no_repeated_chars(input: &str) -> CipherResult {
    let mut bytes = HashSet::new();

    for b in input.bytes() {
        if bytes.contains(&b) {
            return Err(CipherInputError::BadInput(String::from(
                "`input` contains repeated chars",
            )));
        }

        bytes.insert(b);
    }

    Ok(String::new())
}
