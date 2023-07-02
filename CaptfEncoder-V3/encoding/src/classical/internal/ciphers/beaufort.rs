//! # Beaufort Cipher
//!
//! Implements the functionality for the Beaufort cipher.
//!
//! The following excerpt is from [Wikipedia](https://en.wikipedia.org/wiki/Beaufort_cipher).
//! > The Beaufort cipher, created by Sir Francis Beaufort, is a substitution cipher similar to the
//! Vigenère cipher, with a slightly modified enciphering mechanism and tableau. Its most famous
//! application was in a rotor-based cipher machine, the Hagelin M-209.
//!
//! > The Beaufort cipher is based on the Beaufort square which is essentially the same as a
//! Vigenère square but in reverse order starting with the letter "Z" in the first row, where the
//! first row and the last column serve the same purpose.

use super::{input, Cipher, CipherResult, TABULA_RECTA};

/// A Beaufort cipher implementation.
pub struct Beaufort {
    key: String,
}

impl Beaufort {
    /// Takes the key for the Beaufort cipher and returns a corresponding
    /// Beaufort struct.
    ///
    /// # Panics
    /// * If `key` is not alphabetic.
    pub fn new(key: &str) -> Self {
        input::is_alpha(key).expect("`key` must be alphabetic");

        Self {
            key: key.to_ascii_uppercase(),
        }
    }
}

impl Cipher for Beaufort {
    /// Enciphers the given plaintext (a str reference) using the Beaufort cipher
    /// and returns the ciphertext as a `CipherResult`.
    ///
    /// # Example
    /// ```
    /// use ciphers::{Cipher, Beaufort};
    ///
    /// let beaufort = Beaufort::new("FORTIFICATION");
    ///
    /// let ctext = beaufort.encipher("DEFENDTHEEASTWALLOFTHECASTLE");
    /// assert_eq!(ctext.unwrap(), "CKMPVCPVWPIWUJOGIUAPVWRIWUUK");
    /// ```
    fn encipher(&self, ptext: &str) -> CipherResult {
        input::is_alpha(ptext)?;

        let ptext = ptext.to_ascii_uppercase();
        let key = self.key.as_bytes();

        let ctext = ptext
            .bytes()
            .enumerate()
            .map(|(i, c)| {
                let y = c as usize - 65;
                let x = TABULA_RECTA[y]
                    .iter()
                    .position(|&j| j == key[i % key.len()])
                    .unwrap();

                TABULA_RECTA[0][x]
            })
            .collect();

        Ok(String::from_utf8(ctext).unwrap())
    }

    /// Deciphers the given ciphertext (a str reference) using the Beaufort cipher
    /// and returns the plaintext as a `CipherResult`.
    ///
    /// Note that the Beaufort cipher is reciprocal.
    ///
    /// # Example
    /// ```
    /// use ciphers::{Cipher, Beaufort};
    ///
    /// let beaufort = Beaufort::new("FORTIFICATION");
    ///
    /// let ptext = beaufort.decipher("CKMPVCPVWPIWUJOGIUAPVWRIWUUK");
    /// assert_eq!(ptext.unwrap(), "DEFENDTHEEASTWALLOFTHECASTLE");
    /// ```
    fn decipher(&self, ctext: &str) -> CipherResult {
        self.encipher(&ctext)
    }
}
