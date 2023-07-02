//! The ADFGVX cipher was a field cipher used by the German Army on the Western Front during World War I.
//!
//! ADFGVX was an extension of an earlier cipher called ADFGX. It uses a polybius square and a
//! columnar transposition cipher.
//!
use super::columnar_transposition::ColumnarTransposition;
use super::common::cipher::Cipher;
use super::common::{alphabet, keygen};
use super::Polybius;
use std::string::String;

const ADFGVX_CHARS: [char; 6] = ['A', 'D', 'F', 'G', 'V', 'X'];

/// This struct is created by the `new()` method. See its documentation for more.
pub struct ADFGVX {
    polybius_cipher: Polybius,
    columnar_cipher: ColumnarTransposition,
}

impl Cipher for ADFGVX {
    type Key = (String, String, Option<char>);
    type Algorithm = ADFGVX;

    /// Initialise a ADFGVX cipher.
    ///
    /// The `key` tuple maps to the following `(String, String, Option<char>) = (polybius_key,
    /// columnar_key, null_char)`. Where ...
    ///
    /// * The `polybius_key` is used to init a polybius cipher. See it's documentation for more
    /// information.
    /// * The `columnar_key` is used to init a columnar transposition cipher. See it's
    /// documentation for more information.
    /// * The `null_char` is an optional character that will be used to pad uneven messages
    /// during the columnar transposition stage. See the `columnar_transposition` documentation
    /// for more information.
    ///
    /// # Panics
    /// * If a non-alphanumeric symbol is part of the key.
    ///
    fn new(key: (String, String, Option<char>)) -> ADFGVX {
        // Generate the keyed alphabet key for the polybius square
        let p_key = keygen::keyed_alphabet(&key.0, &alphabet::ALPHANUMERIC, false);

        ADFGVX {
            polybius_cipher: Polybius::new((p_key, ADFGVX_CHARS, ADFGVX_CHARS)),
            columnar_cipher: ColumnarTransposition::new((key.1, key.2)),
        }
    }

    /// Encrypt a message using a ADFGVX cipher.
    ///
    /// # Examples
    /// Basic usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, ADFGVX};
    ///
    /// let polybius_key = String::from("ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8");
    /// let columnar_key = String::from("GERMAN");
    /// let null_char = None;
    ///
    /// let a = ADFGVX::new((
    ///     polybius_key,
    ///     columnar_key,
    ///     null_char
    /// ));
    ///
    /// let cipher_text = concat!(
    ///     "gfxffgxgDFAXDAVGDgxvadaaxxXFDDFGGGFdfaxdavgdVDAGFAXVVxfdd",
    ///     "fgggfVVVAGFFAvvvagffaGXVADAAXXvdagfaxvvGFXFFGXG"
    /// );
    ///
    /// assert_eq!(
    ///     cipher_text,
    ///     a.encrypt("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
    ///         .unwrap()
    /// );
    /// ```
    ///
    fn encrypt(&self, message: &str) -> Result<String, &'static str> {
        //Step 1: encrypt using polybius
        let step_one = self.polybius_cipher.encrypt(message)?;
        //Step 2: encrypt with columnar and return
        self.columnar_cipher.encrypt(&step_one)
    }

    /// Decrypt a message using a ADFGVX cipher.
    ///
    /// # Examples
    /// Basic usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, ADFGVX};
    ///
    /// let polybius_key = String::from("ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8");
    /// let columnar_key = String::from("GERMAN");
    /// let null_char = None;
    ///
    /// let a = ADFGVX::new((
    ///     polybius_key,
    ///     columnar_key,
    ///     null_char
    /// ));
    ///
    /// let cipher_text = concat!(
    ///     "gfxffgxgDFAXDAVGD gxvadaaxxXFDDFGGGFdfaxdav",
    ///     "gdVDAGFAXVVxfddfgggfVVVAGFFA vvvagffaGXVADAAXX vdagfaxvvGFXFFGXG "
    /// );
    ///
    /// assert_eq!(
    ///     "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    ///      a.decrypt(cipher_text).unwrap()
    /// );
    /// ```
    ///
    fn decrypt(&self, ciphertext: &str) -> Result<String, &'static str> {
        //Step 1: decrypt using columnar
        let step_one = self.columnar_cipher.decrypt(ciphertext)?;
        //Step 2: decrypt using polybius
        self.polybius_cipher.decrypt(&step_one)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn encrypt_simple() {
        let a = ADFGVX::new((
            String::from("ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8"),
            String::from("GERMAN"),
            None,
        ));

        let cipher_text = concat!(
            "gfxffgxgDFAXDAVGDgxvadaaxxXFDDFGGGFdfaxdavgdVDAGFAX",
            "VVxfddfgggfVVVAGFFAvvvagffaGXVADAAXXvdagfaxvvGFXFFGXG"
        );
        assert_eq!(
            cipher_text,
            a.encrypt("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
                .unwrap()
        );
    }

    #[test]
    fn encrypt_with_space_padding() {
        let a = ADFGVX::new((
            String::from("ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8"),
            String::from("GERMAN"),
            Some(' '),
        ));

        // Note: this works as per crate version 0.11.0 - and leaves a trailing
        //       ' ' in the ciphertext.
        let cipher_text = concat!(
            "gfxffgxgDFAXDAVGD gxvadaaxxXFDDFGGGFdfaxdavgdVDAGFAX",
            "VVxfddfgggfVVVAGFFA vvvagffaGXVADAAXX vdagfaxvvGFXFFGXG "
        );
        assert_eq!(
            cipher_text,
            a.encrypt("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
                .unwrap()
        );
    }

    #[test]
    fn decrypt_message() {
        let a = ADFGVX::new((
            String::from("ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8"),
            String::from("GERMAN"),
            None,
        ));

        let cipher_text = concat!(
            "gfxffgxgDFAXDAVGDgxvadaaxxXFDDFGGGFdfaxdavgdVDAGFAX",
            "VVxfddfgggfVVVAGFFAvvvagffaGXVADAAXXvdagfaxvvGFXFFGXG"
        );
        assert_eq!(
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            a.decrypt(cipher_text).unwrap()
        );
    }

    #[test]
    fn decrypt_with_space_padding() {
        let a = ADFGVX::new((
            String::from("ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8"),
            String::from("GERMAN"),
            Some(' '),
        ));

        // Note: this works as per crate version 0.11.0 - and leaves a trailing
        //       ' ' in the ciphertext.
        let cipher_text = concat!(
            "gfxffgxgDFAXDAVGD gxvadaaxxXFDDFGGGFdfaxdavgdVDAGFAX",
            "VVxfddfgggfVVVAGFFA vvvagffaGXVADAAXX vdagfaxvvGFXFFGXG "
        );
        assert_eq!(
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            a.decrypt(cipher_text).unwrap()
        );
    }

    #[test]
    fn simple() {
        let a = ADFGVX::new((
            String::from("ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8"),
            String::from("VICTORY"),
            None,
        ));

        let plain_text = concat!(
            "We attack at dawn, not later when it is light, ",
            "or at some strange time of the clock. Only at dawn."
        );
        assert_eq!(
            a.decrypt(&a.encrypt(plain_text).unwrap()).unwrap(),
            plain_text
        );
    }

    #[test]
    fn simple_with_padding() {
        let a = ADFGVX::new((
            String::from("ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8"),
            String::from("VICTORY"),
            Some('\u{0}'),
        ));

        let plain_text = concat!(
            "We attack at dawn, not later when it is light, ",
            "or at some strange time of the clock. Only at dawn."
        );
        assert_eq!(
            a.decrypt(&a.encrypt(plain_text).unwrap()).unwrap(),
            plain_text
        );
    }

    #[test]
    fn plaintext_with_padding() {
        let a = ADFGVX::new((
            String::from("ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8"),
            String::from("VICTORY"),
            Some(' '),
        ));

        let plain_text = "This will fail because of spaces.";
        assert!(a.encrypt(plain_text).is_err());
    }

    #[test]
    fn with_utf8() {
        let plain_text = "Attack 🗡️ the east wall";
        let a = ADFGVX::new((
            String::from("ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8"),
            String::from("GERMAN"),
            None,
        ));

        assert_eq!(
            plain_text,
            a.decrypt(&a.encrypt(plain_text).unwrap()).unwrap()
        );
    }

    #[test]
    fn with_utf8_with_padding() {
        let plain_text = "Attack 🗡️ the east wall";
        let a = ADFGVX::new((
            String::from("ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8"),
            String::from("GERMAN"),
            Some('\u{0}'),
        ));

        assert_eq!(
            plain_text,
            a.decrypt(&a.encrypt(plain_text).unwrap()).unwrap()
        );
    }

    #[test]
    #[should_panic]
    fn invalid_key_phrase() {
        ADFGVX::new((String::from("F@il"), String::from("GERMAN"), None));
    }
}
