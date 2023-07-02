//! An autokey cipher (also known as the autoclave cipher) is a cipher which incorporates the
//! message (the plaintext) into the key.
//!
//! For example, say the message was `ATTACK AT DAWN` and the key was `CRYPT` then the calculated
//! keystream would be `CRYPTA TT ACKA`. It was invented by Blaise de Vigenère in 1586, and is
//! generally more secure than the Vigenere cipher.
use super::common::alphabet::Alphabet;
use super::common::cipher::Cipher;
use super::common::keygen::concatonated_keystream;
use super::common::{alphabet, substitute};

/// An Autokey cipher.
///
/// This struct is created by the `new()` method. See its documentation for more.
pub struct Autokey {
    key: String,
}

impl Cipher for Autokey {
    type Key = String;
    type Algorithm = Autokey;

    /// Initialise an Autokey cipher given a specific key.
    ///
    /// # Panics
    /// * The `key` contains non-alphabetic symbols.
    /// * The `key` is empty.
    ///
    fn new(key: String) -> Autokey {
        if key.is_empty() {
            panic!("The key must contain at least one character.");
        } else if !alphabet::STANDARD.is_valid(&key) {
            panic!("The key cannot contain non-alphabetic symbols.");
        }

        Autokey { key }
    }

    /// Encrypt a message using an Autokey cipher.
    ///
    /// # Examples
    /// Basic usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Autokey};
    ///
    /// let a = Autokey::new(String::from("fort"));
    /// assert_eq!("Fhktcd 🗡 mhg otzx aade", a.encrypt("Attack 🗡 the east wall").unwrap());
    /// ```
    ///
    fn encrypt(&self, message: &str) -> Result<String, &'static str> {
        // Encryption of a letter in a message:
        //         Ci = Ek(Mi) = (Mi + Ki) mod 26
        // Where;  Mi = position within the alphabet of ith char in message
        //         Ki = position within the alphabet of ith char in key
        Ok(substitute::key_substitution(
            message,
            &concatonated_keystream(&self.key, message),
            |mi, ki| alphabet::STANDARD.modulo((mi + ki) as isize),
        ))
    }

    /// Decrypt a message using an Autokey cipher.
    ///
    /// # Examples
    /// Basic usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Autokey};
    ///
    /// let a = Autokey::new(String::from("fort"));;
    /// assert_eq!("Attack 🗡 the east wall", a.decrypt("Fhktcd 🗡 mhg otzx aade").unwrap());
    /// ```
    ///
    fn decrypt(&self, ciphertext: &str) -> Result<String, &'static str> {
        //As each character of the ciphertext is decrypted, the un-encrypted char is appended
        //to the base key 'keystream', so that it may be used to decrypt the latter part
        //of the ciphertext
        let mut plaintext = String::new();
        let mut keystream: Vec<char> = self.key.clone().chars().collect();
        let mut stream_idx: usize = 0;

        for ct in ciphertext.chars() {
            let ctpos = alphabet::STANDARD.find_position(ct);
            match ctpos {
                Some(ci) => {
                    let decrypted_character: char;
                    if let Some(kc) = keystream.get(stream_idx) {
                        if let Some(ki) = alphabet::STANDARD.find_position(*kc) {
                            //Calculate the index and retrieve the letter to substitute
                            let si = alphabet::STANDARD.modulo(ci as isize - ki as isize);
                            decrypted_character =
                                alphabet::STANDARD.get_letter(si, ct.is_uppercase());
                        } else {
                            panic!("Keystream contains a non-alphabetic symbol.");
                        }
                    } else {
                        panic!("Keystream is not large enough for full substitution of message.");
                    }

                    plaintext.push(decrypted_character);
                    keystream.push(decrypted_character);
                    stream_idx += 1;
                }
                None => plaintext.push(ct), //Push non-alphabetic chars 'as-is'
            }
        }

        Ok(plaintext)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn with_utf8() {
        let m = "Attack 🗡️ the east wall";
        let a = Autokey::new(String::from("fort"));

        assert_eq!(m, a.decrypt(&a.encrypt(m).unwrap()).unwrap());
    }

    #[test]
    fn simple_encrypt_decrypt_test() {
        let message = "defend the east wall of the castle";
        let v = Autokey::new(String::from("fortification"));

        let c_text = v.encrypt(message).unwrap();
        let p_text = v.decrypt(&c_text).unwrap();

        assert_eq!(message, p_text);
    }

    #[test]
    fn decrypt_test() {
        let ciphertext = "lxfopktmdcgn";
        let v = Autokey::new(String::from("lemon"));
        assert_eq!("attackatdawn", v.decrypt(ciphertext).unwrap());
    }

    #[test]
    fn valid_key() {
        Autokey::new(String::from("LeMon"));
    }

    #[test]
    #[should_panic]
    fn key_with_symbols() {
        Autokey::new(String::from("!em@n"));
    }

    #[test]
    #[should_panic]
    fn key_with_whitespace() {
        Autokey::new(String::from("wow this key is a real lemon"));
    }
}
