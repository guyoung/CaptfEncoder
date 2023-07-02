//! The Caesar cipher is named after Julius Caesar, who used it (allegedly) with a shift of three
//! to protect messages of military significance.
//!
//! As with all single-alphabet substitution ciphers, the Caesar cipher is easily broken
//! and in modern practice offers essentially no communication security.
//!
use super::common::alphabet::Alphabet;
use super::common::cipher::Cipher;
use super::common::{alphabet, substitute};

/// A Caesar cipher.
///
/// This struct is created by the `new()` method. See its documentation for more.
pub struct Caesar {
    shift: usize,
}

impl Cipher for Caesar {
    type Key = usize;
    type Algorithm = Caesar;

    /// Initialise a Caesar cipher given a specific shift value.
    ///
    /// # Panics
    /// * `shift` is not in the inclusive range `1 - 26`.
    ///
    fn new(shift: usize) -> Caesar {
        if shift < 1 || shift > 26 {
            panic!("The shift factor must be within the range 1 <= n <= 26.");
        }

        Caesar { shift }
    }

    /// Encrypt a message using a Caesar cipher.
    ///
    /// # Examples
    /// Basic usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Caesar};
    ///
    /// let c = Caesar::new(3);
    /// assert_eq!("Dwwdfn dw gdzq!", c.encrypt("Attack at dawn!").unwrap());
    /// ```
    ///
    fn encrypt(&self, message: &str) -> Result<String, &'static str> {
        // Encryption of a letter:
        //         E(x) = (x + n) mod 26
        // Where;  x = position of letter in alphabet
        //         n = shift factor (or key)

        Ok(substitute::shift_substitution(message, |idx| {
            alphabet::STANDARD.modulo((idx + self.shift) as isize)
        }))
    }

    /// Decrypt a message using a Caesar cipher.
    ///
    /// # Examples
    /// Basic usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Caesar};
    ///
    /// let c = Caesar::new(3);
    /// assert_eq!("Attack at dawn!", c.decrypt("Dwwdfn dw gdzq!").unwrap());
    /// ```
    ///
    fn decrypt(&self, ciphertext: &str) -> Result<String, &'static str> {
        // Decryption of a letter:
        //         D(x) = (x - n) mod 26
        // Where;  x = position of letter in alphabet
        //         n = shift factor (or key)

        Ok(substitute::shift_substitution(ciphertext, |idx| {
            alphabet::STANDARD.modulo(idx as isize - self.shift as isize)
        }))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn encrypt_message() {
        let c = Caesar::new(2);
        assert_eq!("Cvvcem cv fcyp!", c.encrypt("Attack at dawn!").unwrap());
    }

    #[test]
    fn decrypt_message() {
        let c = Caesar::new(2);
        assert_eq!("Attack at dawn!", c.decrypt("Cvvcem cv fcyp!").unwrap());
    }

    #[test]
    fn with_utf8() {
        let c = Caesar::new(3);
        let message = "Peace, Freedom and Liberty! 🗡️";
        let encrypted = c.encrypt(message).unwrap();
        let decrypted = c.decrypt(&encrypted).unwrap();

        assert_eq!(decrypted, message);
    }

    #[test]
    fn exhaustive_encrypt() {
        //Test with every possible shift combination
        let message = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for i in 1..27 {
            let c = Caesar::new(i);
            let encrypted = c.encrypt(message).unwrap();
            let decrypted = c.decrypt(&encrypted).unwrap();
            assert_eq!(decrypted, message);
        }
    }

    #[test]
    #[should_panic]
    fn key_to_small() {
        Caesar::new(0);
    }

    #[test]
    #[should_panic]
    fn key_to_big() {
        Caesar::new(27);
    }
}
