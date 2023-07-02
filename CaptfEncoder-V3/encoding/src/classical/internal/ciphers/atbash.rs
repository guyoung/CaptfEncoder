//! # Atbash Cipher
//!
//! Implements the functionality for the Atbash cipher.
//!
//! The following is an excerpt from [Wikipedia](https://en.wikipedia.org/wiki/Atbash).
//! > The Atbash cipher is a particular type of monoalphabetic cipher formed by taking the alphabet
//! (or abjad, syllabary, etc.) and mapping it to its reverse, so that the first letter becomes the
//! last letter, the second letter becomes the second to last letter, and so on.
//!
//! > Due to the fact that there is only one way to perform this, the Atbash cipher provides no
//! communications security, as it lacks any sort of key. If multiple collating orders are
//! available, which one was used in encryption can be used as a key, but this does not provide
//! significantly more security.

use super::{input, Cipher, CipherResult};

/// An Atbash cipher implementation.
pub struct Atbash;

impl Atbash {
    /// Returns a new Atbash struct.
    pub fn new() -> Self {
        Self {}
    }
}

impl Cipher for Atbash {
    /// Enciphers the given plaintext (a str reference) using the Atbash cipher
    /// and returns the ciphertext as a `CipherResult`.
    ///
    /// # Example
    /// ```
    /// use ciphers::{Cipher, Atbash};
    ///
    /// let atbash = Atbash::new();
    ///
    /// let ctext = atbash.encipher("ATTACKATDAWN");
    /// assert_eq!(ctext.unwrap(), "ZGGZXPZGWZDM");
    /// ```
    fn encipher(&self, ptext: &str) -> CipherResult {
        input::is_alpha(ptext)?;

        let ptext = ptext.to_ascii_uppercase();
        let ctext = ptext.bytes().map(|c| 90 - c + 65).collect();

        Ok(String::from_utf8(ctext).unwrap())
    }

    /// Deciphers the given ciphertext (a str reference) using the Atbash cipher
    /// and returns the plaintext as a `CipherResult`.
    ///
    /// Note that the Atbash cipher is reciprocal.
    ///
    /// # Example
    /// ```
    /// use ciphers::{Cipher, Atbash};
    ///
    /// let atbash = Atbash::new();
    ///
    /// let ptext = atbash.decipher("ZGGZXPZGWZDM");
    /// assert_eq!(ptext.unwrap(), "ATTACKATDAWN");
    /// ```
    fn decipher(&self, ctext: &str) -> CipherResult {
        input::is_alpha(ctext)?;

        let ctext = ctext.to_ascii_uppercase();
        self.encipher(&ctext)
    }
}
