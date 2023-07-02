//! The Porta Cipher is a polyalphabetic substitution cipher. It was invented
//! by Giovanni Battista della Porta, an Italian polymath, in 1563.
//!
//! To generate the keystream for encryption, a key is repeated as often as
//! needed to match the number of (alphabetic) symbols in the plaintext message.
//! Finally, the (alphabetic) symbols of the message are substituted using a
//! substitution table. Since Porta is a reciprocal cipher, decryption works
//! the same as encryption.
//!
//! This implementation uses the following substitution table:
//! ```text
//! Keys| a b c d e f g h i j k l m n o p q r s t u v w x y z
//! ---------------------------------------------------------
//! A,B | n o p q r s t u v w x y z a b c d e f g h i j k l m
//! C,D | o p q r s t u v w x y z n m a b c d e f g h i j k l
//! E,F | p q r s t u v w x y z n o l m a b c d e f g h i j k
//! G,H | q r s t u v w x y z n o p k l m a b c d e f g h i j
//! I,J | r s t u v w x y z n o p q j k l m a b c d e f g h i
//! K,L | s t u v w x y z n o p q r i j k l m a b c d e f g h
//! M,N | t u v w x y z n o p q r s h i j k l m a b c d e f g
//! O,P | u v w x y z n o p q r s t g h i j k l m a b c d e f
//! Q,R | v w x y z n o p q r s t u f g h i j k l m a b c d e
//! S,T | w x y z n o p q r s t u v e f g h i j k l m a b c d
//! U,V | x y z n o p q r s t u v w d e f g h i j k l m a b c
//! W,X | y z n o p q r s t u v w x c d e f g h i j k l m a b
//! ```
//! For every key-message symbol pair `(k, m)`, the corresponding ciphertext
//! symbol is determined by selecting the table row according to `k` and the
//! column according to `m`.
//!
use super::common::alphabet::{self, Alphabet};
use super::common::cipher::Cipher;
use super::common::keygen::cyclic_keystream;
use super::common::substitute;

#[rustfmt::skip]
const SUBSTITUTION_TABLE: [[usize; 26]; 13] = [
    [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12],
    [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 13, 12,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11],
    [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 13, 14, 11, 12,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10],
    [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 13, 14, 15, 10, 11, 12,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9],
    [17, 18, 19, 20, 21, 22, 23, 24, 25, 13, 14, 15, 16,  9, 10, 11, 12,  0,  1,  2,  3,  4,  5,  6,  7,  8],
    [18, 19, 20, 21, 22, 23, 24, 25, 13, 14, 15, 16, 17,  8,  9, 10, 11, 12,  0,  1,  2,  3,  4,  5,  6,  7],
    [19, 20, 21, 22, 23, 24, 25, 13, 14, 15, 16, 17, 18,  7,  8,  9, 10, 11, 12,  0,  1,  2,  3,  4,  5,  6],
    [20, 21, 22, 23, 24, 25, 13, 14, 15, 16, 17, 18, 19,  6,  7,  8,  9, 10, 11, 12,  0,  1,  2,  3,  4,  5],
    [21, 22, 23, 24, 25, 13, 14, 15, 16, 17, 18, 19, 20,  5,  6,  7,  8,  9, 10, 11, 12,  0,  1,  2,  3,  4],
    [22, 23, 24, 25, 13, 14, 15, 16, 17, 18, 19, 20, 21,  4,  5,  6,  7,  8,  9, 10, 11, 12,  0,  1,  2,  3],
    [23, 24, 25, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12,  0,  1,  2],
    [24, 25, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12,  0,  1],
    [25, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12,  0],
];

/// A Porta cipher.
///
/// This struct is created by the `new()` method. See its documentation for more.
pub struct Porta {
    key: String,
}

impl Cipher for Porta {
    type Key = String;
    type Algorithm = Porta;

    /// Initialize a Porta cipher given a specific key.
    ///
    /// # Panics
    /// * The `key` is empty.
    /// * The `key` contains a non-alphabetic symbol.
    ///
    fn new(key: String) -> Porta {
        if key.is_empty() {
            panic!("The key is empty.");
        }
        if !alphabet::STANDARD.is_valid(&key) {
            panic!("The key contains a non-alphabetic symbol.");
        }

        Porta { key }
    }

    /// Encrypt a message using a Porta cipher.
    ///
    /// # Examples
    /// Basic usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Porta};
    ///
    /// let v = Porta::new("melon".into());
    /// assert_eq!(v.encrypt("We ride at dawn!").unwrap(), "Dt mpwx pb xtdl!");
    /// ```
    ///
    fn encrypt(&self, message: &str) -> Result<String, &'static str> {
        Ok(substitute::key_substitution(
            message,
            &cyclic_keystream(&self.key, message),
            |mi, ki| SUBSTITUTION_TABLE[ki / 2][mi],
        ))
    }

    /// Decrypt a message using a Porta cipher.
    ///
    /// # Examples
    /// Basic usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Porta};
    ///
    /// let v = Porta::new(String::from("melon"));
    /// assert_eq!(v.decrypt("Dt mpwx pb xtdl!").unwrap(), "We ride at dawn!");
    /// ```
    ///
    fn decrypt(&self, ciphertext: &str) -> Result<String, &'static str> {
        self.encrypt(ciphertext)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn encrypt() {
        let message = "attackatdawn";
        let porta = Porta::new("lemon".into());
        assert_eq!(porta.encrypt(message).unwrap(), "seauvppaxtel");
    }

    #[test]
    fn decrypt() {
        let ciphertext = "seauvppaxtel";
        let porta = Porta::new("lemon".into());
        assert_eq!(porta.decrypt(ciphertext).unwrap(), "attackatdawn");
    }

    #[test]
    fn mixed_case() {
        let message = "Attack at Dawn!";
        let porta = Porta::new("lemon".into());
        let ciphertext = porta.encrypt(message).unwrap();
        let decrypted = porta.decrypt(&ciphertext).unwrap();

        assert_eq!(decrypted, message);
    }

    #[test]
    fn with_utf8() {
        let message = "Peace 🗡️ Freedom and Liberty!";
        let porta = Porta::new("utfeightisfun".into());
        let ciphertext = porta.encrypt(message).unwrap();
        let decrypted = porta.decrypt(&ciphertext).unwrap();

        assert_eq!(decrypted, message);
    }

    #[test]
    fn valid_key() {
        Porta::new("LeMon".into());
    }

    #[test]
    #[should_panic]
    fn key_with_symbols() {
        Porta::new("!em@n".into());
    }

    #[test]
    #[should_panic]
    fn key_with_whitespace() {
        Porta::new("wow this key is a real lemon".into());
    }
}
