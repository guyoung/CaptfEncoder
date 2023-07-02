//! The Affine cipher is a special case of the more general monoalphabetic substitution cipher.
//!
//! The cipher is less secure than a substitution cipher as it is vulnerable to all of the attacks
//! that work against substitution ciphers, in addition to other attacks. The cipher's primary
//! weakness comes from the fact that if the cryptanalyst can discover the plaintext of two
//! ciphertext characters, then the key can be obtained by solving a simultaneous equation
//!
use super::common::alphabet::Alphabet;
use super::common::cipher::Cipher;
use super::common::{alphabet, substitute};
use num::integer::gcd;

/// An Affine cipher.
///
/// This struct is created by the `new()` method. See its documentation for more.
pub struct Affine {
    a: usize,
    b: usize,
}

impl Cipher for Affine {
    type Key = (usize, usize);
    type Algorithm = Affine;

    /// Initialise an Affine cipher given the key (`a`, `b`).
    ///
    /// # Panics
    /// * `a` or `b` are not in the inclusive range `1 - 26`.
    /// * `a` has a factor in common with 26.
    ///
    fn new(key: (usize, usize)) -> Affine {
        let (a, b) = key;
        if (a < 1 || b < 1) || (a > 26 || b > 26) {
            panic!("The keys a & b must be within the range 1 <= n <= 26.");
        }

        if gcd(a, 26) > 1 {
            panic!("The key 'a' cannot share a common factor with 26.");
        }

        Affine { a, b }
    }

    /// Encrypt a message using an Affine cipher.
    ///
    /// # Examples
    /// Basic usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Affine};
    ///
    /// let a = Affine::new((3, 7));
    /// assert_eq!("Hmmhnl hm qhvu!", a.encrypt("Attack at dawn!").unwrap());
    /// ```
    ///
    fn encrypt(&self, message: &str) -> Result<String, &'static str> {
        // Encryption of a letter:
        //         E(x) = (ax + b) mod 26
        // Where;  x    = position of letter in alphabet
        //         a, b = the numbers of the affine key
        Ok(substitute::shift_substitution(message, |idx| {
            alphabet::STANDARD.modulo(((self.a * idx) + self.b) as isize)
        }))
    }

    /// Decrypt a message using an Affine cipher.
    ///
    /// # Examples
    /// Basic usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Affine};
    ///
    /// let a = Affine::new((3, 7));
    /// assert_eq!("Attack at dawn!", a.decrypt("Hmmhnl hm qhvu!").unwrap());
    /// ```
    ///
    fn decrypt(&self, ciphertext: &str) -> Result<String, &'static str> {
        // Decryption of a letter:
        //         D(x) = (a^-1*(x - b)) mod 26
        // Where;  x    = position of letter in alphabet
        //         a^-1 = multiplicative inverse of the key number `a`
        //         b    = a number of the affine key
        let a_inv = alphabet::STANDARD
            .multiplicative_inverse(self.a as isize)
            .expect("Multiplicative inverse for 'a' could not be calculated.");

        Ok(substitute::shift_substitution(ciphertext, |idx| {
            alphabet::STANDARD.modulo(a_inv as isize * (idx as isize - self.b as isize))
        }))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn encrypt_message() {
        let a = Affine::new((3, 7));
        assert_eq!("Hmmhnl hm qhvu!", a.encrypt("Attack at dawn!").unwrap());
    }

    #[test]
    fn decrypt_message() {
        let a = Affine::new((3, 7));
        assert_eq!("Attack at dawn!", a.decrypt("Hmmhnl hm qhvu!").unwrap());
    }

    #[test]
    fn with_utf8() {
        let a = Affine::new((15, 10));
        let message = "Peace ✌️ Freedom and Liberty!";

        assert_eq!(message, a.decrypt(&a.encrypt(message).unwrap()).unwrap());
    }

    #[test]
    fn exhaustive_encrypt() {
        //Test with every combination of a and b
        let message = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for a in 1..27 {
            if gcd(a, 26) > 1 {
                continue;
            }

            for b in 1..27 {
                let a = Affine::new((a, b));
                assert_eq!(message, a.decrypt(&a.encrypt(message).unwrap()).unwrap());
            }
        }
    }

    #[test]
    fn valid_key() {
        Affine::new((15, 17));
    }

    #[test]
    fn b_shares_factor() {
        Affine::new((15, 2));
    }

    #[test]
    #[should_panic]
    fn a_shares_factor() {
        Affine::new((2, 15));
    }

    #[test]
    #[should_panic]
    fn keys_to_small() {
        Affine::new((0, 10));
    }

    #[test]
    #[should_panic]
    fn keys_to_big() {
        Affine::new((30, 51));
    }
}
