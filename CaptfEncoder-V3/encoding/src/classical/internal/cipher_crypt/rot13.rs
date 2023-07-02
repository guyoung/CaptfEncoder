//! ROT13 ("rotate by 13 places"), is a simple implementation of the Caesar cipher. It substitutes
//! a letter with the one 13 places after it in the alphabet.
//!
//! ROT13 is its own inverse. That is, `ROT13(ROT13(message)) = message`. Due to its simplicity,
//! this module does not implement the `Cipher` trait.
//!
use super::common::alphabet::Alphabet;
use super::common::{alphabet, substitute};

/// Encrypt a message using the Rot13 substitute cipher.
///
/// # Examples
/// Basic usage:
///
/// ```
/// use cipher_crypt::Rot13;
///
/// let m = "I am my own inverse";
/// assert_eq!(m, &Rot13::decrypt(&Rot13::encrypt(m)));
/// ```
///
pub fn encrypt(message: &str) -> String {
    substitute::shift_substitution(message, |i| alphabet::STANDARD.modulo((i + 13) as isize))
}

/// Decrypt a message using the Rot13 substitute cipher.
///
/// # Examples
/// Basic usage:
///
/// ```
/// use cipher_crypt::Rot13;
///
/// let m = "I am my own inverse";
/// assert_eq!(m, &Rot13::decrypt(&Rot13::encrypt(m)));
/// ```
///
pub fn decrypt(message: &str) -> String {
    substitute::shift_substitution(message, |i| alphabet::STANDARD.modulo((i + 13) as isize))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn with_utf8() {
        let message = "Peace, Freedom and Liberty! 🗡️";
        let encrypted = encrypt(message);
        let decrypted = decrypt(&encrypted);

        assert_eq!(decrypted, message);
    }

    #[test]
    fn alphabet_encrypt() {
        let message = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        let encrypted = encrypt(message);
        let decrypted = decrypt(&encrypted);

        assert_eq!(decrypted, message);
    }
}
