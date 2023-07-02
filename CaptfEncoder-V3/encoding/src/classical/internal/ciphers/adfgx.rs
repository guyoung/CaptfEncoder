//! # ADFGX Cipher
//!
//! Implements the functionality for the ADFGX cipher.
//!
//! > The ADFGX cipher was a field cipher used by the German Army during World War I. It is closely
//! related to the ADFGXC cipher (i.e. ADFGX is the predecessor to ADFGVX).
//!
//! > The cipher was a fractionating transposition cipher which combined a modified Polybius square
//! with a single columnar transposition.
//!
//! > The cipher is named after the five possible letters used in the ciphertext: A, D, F, G and X.
//! The letters were chosen deliberately because they are very different from one another in the
//! Morse code. That reduced the possibility of operator error.

use super::{Cipher, CipherResult, columnar_transposition::ColumnarTransposition, polybius_square::PolybiusSquare};

/// An ADFGX cipher implementation.
pub struct ADFGX {
    key: String,
    keyword: String,
}

impl ADFGX {
    /// Takes the key and keyword for the ADFGX cipher and returns a
    /// corresponding ADFGX struct.
    ///
    /// # Panics
    /// * If `key` is not 25 chars in length.
    /// * If `key` contains repeated chars.
    /// * If `key` is not valid ascii.
    /// * If `keyword` is not valid ascii.
    pub fn new(key: &str, keyword: &str) -> Self {
        if  key.len() != 25 {
            panic!("`key` must be 25 chars in length");
        }

        Self {
            key: String::from(key),
            keyword: String::from(keyword),
        }
    }
}

impl Cipher for ADFGX {
    /// Enciphers the given plaintext (a str reference) using the ADFGX cipher
    /// and returns the ciphertext as a `CipherResult`.
    ///
    /// # Example
    /// ```
    /// use ciphers::{Cipher, ADFGX};
    ///
    /// let adfgx = ADFGX::new("PHQGMEAYNOFDXKRCVSZWBUTIL", "GERMAN");
    ///
    /// let ctext = adfgx.encipher("DEFENDTHEEASTWALLOFTHECASTLE");
    /// assert_eq!(ctext.unwrap(), "FFDGDDADXDAFAFXAAFAFDXDXXFDGDAGDDXXFAFADAFDXDDXDDADGXXGX");
    /// ```
    fn encipher(&self, input: &str) -> CipherResult {
        if  input.len() < 3  {
            panic!("`input` length cannot be less than 3");
        }

        let ps = PolybiusSquare::new(&self.key, "ADFGX");
        let ct = ColumnarTransposition::new(&self.keyword);

        ct.encipher(&ps.encipher(input)?)
    }

    /// Deciphers the given ciphertext (a str reference) using the ADFGX cipher
    /// and returns the plaintext as a `CipherResult`.
    ///
    /// # Example
    /// ```
    /// use ciphers::{Cipher, ADFGX};
    ///
    /// let adfgx = ADFGX::new("PHQGMEAYNOFDXKRCVSZWBUTIL", "GERMAN");
    ///
    /// let ptext = adfgx.decipher("FFDGDDADXDAFAFXAAFAFDXDXXFDGDAGDDXXFAFADAFDXDDXDDADGXXGX");
    /// assert_eq!(ptext.unwrap(), "DEFENDTHEEASTWALLOFTHECASTLE");
    /// ```
    fn decipher(&self, ctext: &str) -> CipherResult {
        let ps = PolybiusSquare::new(&self.key, "ADFGX");
        let ct = ColumnarTransposition::new(&self.keyword);

        ps.decipher(&ct.decipher(ctext)?)
    }
}
