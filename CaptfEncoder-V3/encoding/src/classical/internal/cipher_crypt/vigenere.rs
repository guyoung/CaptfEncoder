//! The Vigenère Cipher is a polyalphabetic substitution cipher. It was considered 'le chiffre
//! indéchiffrable' for 300 years until Friedrich Kasiski broke it in 1863.
//!
//! For example, given the message `ATTACK AT DAWN` and the key was `CRYPT` then the calculated
//! encoding key would be `CRYPTC RY PTCR`.
//!
//!
use super::common::alphabet;
use super::common::alphabet::Alphabet;
use super::common::cipher::Cipher;
use super::common::keygen::cyclic_keystream;
use super::common::substitute;

/// A Vigenère cipher.
///
/// This struct is created by the `new()` method. See its documentation for more.
pub struct Vigenere {
    key: String,
}

impl Cipher for Vigenere {
    type Key = String;
    type Algorithm = Vigenere;

    /// Initialise a Vigenère cipher given a specific key.
    ///
    /// # Panics
    /// * The `key` is empty.
    /// * The `key` contains a non-alphabetic symbol.
    ///
    fn new(key: String) -> Vigenere {
        if key.is_empty() {
            panic!("The key is empty.");
        }
        if !alphabet::STANDARD.is_valid(&key) {
            panic!("The key contains a non-alphabetic symbol.");
        }

        Vigenere { key }
    }

    /// Encrypt a message using a Vigenère cipher.
    ///
    /// # Examples
    /// Basic usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Vigenere};
    ///
    /// let v = Vigenere::new(String::from("giovan"));
    /// assert_eq!("O vsqee mmh vnl izsyig!", v.encrypt("I never get any credit!").unwrap());
    /// ```
    ///
    fn encrypt(&self, message: &str) -> Result<String, &'static str> {
        // Encryption of a letter in a message:
        //         Ci = Ek(Mi) = (Mi + Ki) mod 26
        // Where;  Mi = position within the alphabet of ith char in message
        //         Ki = position within the alphabet of ith char in key
        Ok(substitute::key_substitution(
            message,
            &cyclic_keystream(&self.key, message),
            |mi, ki| alphabet::STANDARD.modulo((mi + ki) as isize),
        ))
    }

    /// Decrypt a message using a Vigenère cipher.
    ///
    /// # Examples
    /// Basic usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Vigenere};
    ///
    /// let v = Vigenere::new(String::from("giovan"));
    /// assert_eq!("I never get any credit!", v.decrypt("O vsqee mmh vnl izsyig!").unwrap());
    /// ```
    ///
    fn decrypt(&self, ciphertext: &str) -> Result<String, &'static str> {
        // Decryption of a letter in a message:
        //         Mi = Dk(Ci) = (Ci - Ki) mod 26
        // Where;  Ci = position within the alphabet of ith char in cipher text
        //         Ki = position within the alphabet of ith char in key
        Ok(substitute::key_substitution(
            ciphertext,
            &cyclic_keystream(&self.key, ciphertext),
            |ci, ki| alphabet::STANDARD.modulo(ci as isize - ki as isize),
        ))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn encrypt_test() {
        let message = "attackatdawn";
        let v = Vigenere::new(String::from("lemon"));
        assert_eq!("lxfopvefrnhr", v.encrypt(message).unwrap());
    }

    #[test]
    fn decrypt_test() {
        let ciphertext = "lxfopvefrnhr";
        let v = Vigenere::new(String::from("lemon"));
        assert_eq!("attackatdawn", v.decrypt(ciphertext).unwrap());
    }

    #[test]
    fn mixed_case() {
        let message = "Attack at Dawn!";
        let v = Vigenere::new(String::from("giovan"));

        let ciphertext = v.encrypt(message).unwrap();
        let plain_text = v.decrypt(&ciphertext).unwrap();

        assert_eq!(plain_text, message);
    }

    #[test]
    fn with_utf8() {
        let v = Vigenere::new(String::from("utfeightisfun"));
        let message = "Peace 🗡️ Freedom and Liberty!";
        let encrypted = v.encrypt(message).unwrap();
        let decrypted = v.decrypt(&encrypted).unwrap();

        assert_eq!(decrypted, message);
    }

    #[test]
    fn valid_key() {
        Vigenere::new(String::from("LeMon"));
    }

    #[test]
    #[should_panic]
    fn key_with_symbols() {
        Vigenere::new(String::from("!em@n"));
    }

    #[test]
    #[should_panic]
    fn key_with_whitespace() {
        Vigenere::new(String::from("wow this key is a real lemon"));
    }
}
