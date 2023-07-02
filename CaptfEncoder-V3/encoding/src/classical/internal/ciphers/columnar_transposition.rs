//! # Columnar Transposition Cipher
//!
//! Implements the functionality for the Columnar Transpositon cipher.
//!
//! The following excerpt is from
//! [Wikipedia](https://en.wikipedia.org/wiki/Transposition_cipher#Columnar_transposition).
//! > In a columnar transposition, the message is written out in rows of a fixed length, and then
//! read out again column by column, and the columns are chosen in some scrambled order. Both the
//! width of the rows and the permutation of the columns are usually defined by a keyword.
//!
//! > For example, the keyword ZEBRAS is of length 6 (so the rows are of length 6), and the
//! permutation is defined by the alphabetical order of the letters in the keyword. In this case,
//! the order would be "6 3 2 4 1 5".

use super::{input, Cipher, CipherResult};
use std::collections::HashMap;

/// A Columnar Transposition cipher implementation.
pub struct ColumnarTransposition {
    key: String,
}

impl ColumnarTransposition {
    /// Takes the key for the Columnar Transposition cipher and
    /// returns a corresponding ColumnarTransposition struct.
    ///
    /// # Panics
    /// * If `key` is not valid ascii.
    pub fn new(key: &str) -> Self {
        input::is_ascii(key).expect("`key` must be valid ascii");

        Self {
            key: String::from(key),
        }
    }
}

impl Cipher for ColumnarTransposition {
    /// Enciphers the given plaintext (a str reference) using the Columnar
    /// Transposition cipher and returns the ciphertext as a `CipherResult`.
    ///
    /// # Example
    /// ```
    /// use ciphers::{Cipher, ColumnarTransposition};
    ///
    /// let ct = ColumnarTransposition::new("GERMAN");
    ///
    /// let ctext = ct.encipher("DEFENDTHEEASTWALLOFTHECASTLE");
    /// assert_eq!(ctext.unwrap(), "NALCEHWTTDTTFSEELEEDSOAFEAHL")
    /// ```
    fn encipher(&self, ptext: &str) -> CipherResult {
        input::is_ascii(ptext)?;

        let mut key: Vec<u8> = self.key.bytes().collect();
        let ptext = ptext.as_bytes();
        let mut matrix: HashMap<u8, Vec<u8>> = HashMap::with_capacity(key.len());

        // populate matrix
        for i in 0..ptext.len() {
            matrix.entry(key[i % key.len()]).or_insert(vec![]);
            matrix.get_mut(&key[i % key.len()]).unwrap().push(ptext[i]);
        }

        key.sort();

        let mut ctext = vec![];
        for k in key.iter() {
            for byte in matrix.get(&k).unwrap() {
                ctext.push(*byte);
            }
        }

        Ok(String::from_utf8(ctext).unwrap())
    }

    /// Deciphers the given ciphertext (a str reference) using the Columnar
    /// Transposition cipher and returns the plaintext as a `CipherResult`.
    ///
    /// # Example
    /// ```
    /// use ciphers::{Cipher, ColumnarTransposition};
    ///
    /// let ct = ColumnarTransposition::new("GERMAN");
    ///
    /// let ptext = ct.decipher("NALCEHWTTDTTFSEELEEDSOAFEAHL");
    /// assert_eq!(ptext.unwrap(), "DEFENDTHEEASTWALLOFTHECASTLE");
    /// ```
    fn decipher(&self, ctext: &str) -> CipherResult {
        input::is_ascii(ctext)?;

        let key: Vec<u8> = self.key.bytes().collect();
        let ctext = ctext.as_bytes();
        let mut matrix: HashMap<u8, Vec<u8>> = HashMap::with_capacity(key.len());

        let mut sorted_key = key.clone();
        sorted_key.sort();

        for k in sorted_key.iter() {
            matrix.insert(*k, vec![]);
        }

        // populate matrix
        let mut i = 0usize;
        let mut k = 0usize;
        while i < ctext.len() {
            // calculate length of current entry
            let col = key.iter().position(|&c| c == sorted_key[k]).unwrap();
            let len = if col < ctext.len() % key.len() {
                ctext.len() / key.len() + 1
            } else {
                ctext.len() / key.len()
            };

            for _ in 0..len {
                matrix.entry(sorted_key[k]).or_insert(vec![]);
                matrix.get_mut(&sorted_key[k]).unwrap().push(ctext[i]);
                i += 1;
            }

            k += 1;
        }

        let mut ptext = vec![];
        for i in 0..ctext.len() {
            ptext.push(matrix.get_mut(&key[i % key.len()]).unwrap().remove(0));
        }

        Ok(String::from_utf8(ptext).unwrap())
    }
}
