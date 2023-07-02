//! # Four-Square Cipher
//!
//! Implements the functionality for the Four-Square cipher.
//!
//! The following excerpt is from [Wikipedia](https://en.wikipedia.org/wiki/Four-square_cipher).
//! > The four-square cipher is a manual symmetric encryption technique. It was invented by the
//! famous French cryptographer Felix Delastelle.
//!
//! > The technique encrypts pairs of letters (digraphs), and thus falls into a category of ciphers
//! known as polygraphic substitution ciphers. This adds significant strength to the encryption when
//! compared with monographic substitution ciphers which operate on single chaWracters. The use of
//! digraphs makes the four-square technique less susceptible to frequency analysis attacks, as the
//! analysis must be done on 676 possible digraphs rather than just 26 for monographic substitution.
//!
//! > The frequency analysis of digraphs is possible, but considerably more difficult - and it
//! generally requires a much larger ciphertext in order to be useful.

use super::{input, Cipher, CipherInputError, CipherResult};

/// A Four-Square cipher implementation.
pub struct FourSquare {
    key1: String,
    key2: String,
    alphabet: String,
    pad: u8,
}

impl FourSquare {
    /// Takes the two keys for the Four-Square cipher and
    /// returns a corresponding FourSquare struct.
    ///
    /// # Panics
    /// * If `alphabet` is not 25 chars in length.
    /// * If `alphabet` is not valid ascii.
    /// * If `alphabet` contains repeated chars.
    /// * If `key1` is not 25 chars in length.
    /// * If `key1` contains repeated chars.
    /// * If any of the chars in `key1` are not contained in `alphabet`.
    /// * If `key2` is not 25 chars in length.
    /// * If `key2` contains repeated chars.
    /// * If any of the chars in `key2` are not contained in `alphabet`.
    /// * If `pad` is not contained in `alphabet`.
    pub fn new(key1: &str, key2: &str, alphabet: &str, pad: char) -> Self {
        if alphabet.len() != 25 {
            panic!("alphabet` must be 25 chars in length");
        }
        input::is_ascii(alphabet).expect("`alphabet` must be valid ascii");
        input::no_repeated_chars(alphabet).expect("`alphabet` cannot contain repeated chars");

        if key1.len() != 25 {
            panic!("`key1` must be 25 chars in length");
        }
        input::no_repeated_chars(key1).expect("`key1` cannot contain repeated chars");
        input::in_alphabet(key1, alphabet)
            .expect("all chars in `key1` must be contained in `alphabet`");
        if key2.len() != 25 {
            panic!("`key2` must be 25 chars in length");
        }
        input::no_repeated_chars(key2).expect("`key2` cannot contain repeated chars");
        input::in_alphabet(key2, alphabet)
            .expect("all chars in `key2` must be contained in `alphabet`");

        if alphabet.find(pad) == None {
            panic!("`alphabet` must contain `pad`");
        }       

        Self {
            key1: String::from(key1),
            key2: String::from(key2),
            alphabet: String::from(alphabet),
            pad: pad as u8,
        }
    }
}

impl Cipher for FourSquare {
    /// Enciphers the given plaintext (a str reference) using the Four-Square
    /// cipher and returns the ciphertext as a `CipherResult`.
    ///
    /// # Example
    /// ```
    /// use ciphers::{Cipher, FourSquare};
    ///
    /// let four_square = FourSquare::new(
    ///     "ZGPTFOIHMUWDRCNYKEQAXVSBL",
    ///     "MFNBDCRHSAXYOGVITUEWLQZKP",
    ///     "ABCDEFGHIKLMNOPQRSTUVWXYZ",
    ///     'X',
    /// );
    ///
    /// let ctext = four_square.encipher("ATTACKATDAWN");
    /// assert_eq!(ctext.unwrap(), "TIYBFHTIZBSY");
    /// ```
    fn encipher(&self, ptext: &str) -> CipherResult {
        input::in_alphabet(ptext, &self.alphabet)?;

        let mut ptext: Vec<u8> = ptext.bytes().collect();
        if ptext.len() % 2 != 0 {
            ptext.push(self.pad);
        }

        let key1 = self.key1.as_bytes();
        let key2 = self.key2.as_bytes();

        let mut ctext = Vec::with_capacity(ptext.len());
        for i in (0..ptext.len()).step_by(2) {
            let yx1 = match self.alphabet.bytes().position(|c| c == ptext[i]) {
                Some(val) => val,
                None => return Err(CipherInputError::NotInAlphabet),
            };
            let yx2 = match self.alphabet.bytes().position(|c| c == ptext[i + 1]) {
                Some(val) => val,
                None => return Err(CipherInputError::NotInAlphabet),
            };

            let (y1, x1) = (yx1 / 5, yx1 % 5);
            let (y2, x2) = (yx2 / 5, yx2 % 5);

            ctext.push(key1[y1 * 5 + x2]);
            ctext.push(key2[y2 * 5 + x1]);
        }

        Ok(String::from_utf8(ctext).unwrap())
    }

    /// Deciphers the given ciphertext (a str reference) using the Four-Square
    /// cipher and returns the plaintext as a `CipherResult`.
    ///
    /// # Example
    /// ```
    /// use ciphers::{Cipher, FourSquare};
    ///
    /// let four_square = FourSquare::new(
    ///     "ZGPTFOIHMUWDRCNYKEQAXVSBL",
    ///     "MFNBDCRHSAXYOGVITUEWLQZKP",
    ///     "ABCDEFGHIKLMNOPQRSTUVWXYZ",
    ///     'X',
    /// );
    ///
    /// let ptext = four_square.decipher("TIYBFHTIZBSY");
    /// assert_eq!(ptext.unwrap(), "ATTACKATDAWN");
    /// ```
    fn decipher(&self, ctext: &str) -> CipherResult {
        input::in_alphabet(ctext, &self.alphabet)?;
        if ctext.len() % 2 != 0 {
            return Err(CipherInputError::BadInput(String::from(
                "`ctext` must contain an even number of chars",
            )));
        }

        let ctext = ctext.as_bytes();

        let mut ptext = Vec::with_capacity(ctext.len());
        for i in (0..ctext.len()).step_by(2) {
            let yx1 = match self.key1.find(|c| c == ctext[i] as char) {
                Some(val) => val,
                None => return Err(CipherInputError::NotInAlphabet),
            };
            let yx2 = match self.key2.find(|c| c == ctext[i + 1] as char) {
                Some(val) => val,
                None => return Err(CipherInputError::NotInAlphabet),
            };

            let (y1, x2) = (yx1 / 5, yx1 % 5);
            let (y2, x1) = (yx2 / 5, yx2 % 5);

            ptext.push(self.alphabet.as_bytes()[y1 * 5 + x1]);
            ptext.push(self.alphabet.as_bytes()[y2 * 5 + x2]);
        }

        Ok(String::from_utf8(ptext).unwrap())
    }
}
