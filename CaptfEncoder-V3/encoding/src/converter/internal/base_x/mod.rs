// https://github.com/OrKoN/base-x-rs

use std::fmt;

pub mod alphabet;
mod bigint;
pub mod decoder;
pub mod encoder;

pub use alphabet::Alphabet;


#[derive(Debug)]
pub struct DecodeError;

impl fmt::Display for DecodeError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Failed to decode the given data")
    }
}


impl std::error::Error for DecodeError {
    fn description(&self) -> &str {
        "Can not decode the provided data"
    }
}

/// Encode an input vector using the given alphabet.
pub fn encode<A: Alphabet>(alphabet: A, input: &[u8]) -> String {
    alphabet.encode(input)
}

/// Decode an input vector using the given alphabet.
pub fn decode<A: Alphabet>(alphabet: A, input: &str) -> Result<Vec<u8>, DecodeError> {
    alphabet.decode(input)
}

