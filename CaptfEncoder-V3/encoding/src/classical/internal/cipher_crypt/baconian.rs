//! Bacon's cipher, or the Baconian cipher, hides a secret message in plain sight rather than
//! generating ciphertext (steganography). It was devised by Sir Francis Bacon in 1605.
//!
//! Each character of the plaintext message is encoded as a 5-bit binary character.
//! These characters are then "hidden" in a decoy message through the use of font variation.
//! This cipher is very easy to crack once the method of hiding is known. As such, this implementation includes
//! the option to set whether the substitution is use_distinct_alphabet for the whole alphabet,
//! or whether it follows the classical method of treating 'I' and 'J', and 'U' and 'V' as
//! interchangeable characters - as would have been the case in Bacon's time.
//!
//! If no concealing text is given and the boilerplate of "Lorem ipsum..." is used,
//! a plaintext message of up to ~50 characters may be hidden.
//!
use super::common::cipher::Cipher;
use lipsum::lipsum;
use std::collections::HashMap;
use std::string::String;

// The default code length
const CODE_LEN: usize = 5;

// Code mappings:
//  * note: that str is preferred over char as it cannot be guaranteed that
//     there will be a single codepoint for a given character.
lazy_static! {
    static ref CODE_MAP: HashMap<&'static str, &'static str> = hashmap! {
        "A" => "AAAAA",
        "B" => "AAAAB",
        "C" => "AAABA",
        "D" => "AAABB",
        "E" => "AABAA",
        "F" => "AABAB",
        "G" => "AABBA",
        "H" => "AABBB",
        "I" => "ABAAA",
        "J" => "ABAAB",
        "K" => "ABABA",
        "L" => "ABABB",
        "M" => "ABBAA",
        "N" => "ABBAB",
        "O" => "ABBBA",
        "P" => "ABBBB",
        "Q" => "BAAAA",
        "R" => "BAAAB",
        "S" => "BAABA",
        "T" => "BAABB",
        "U" => "BABAA",
        "V" => "BABAB",
        "W" => "BABBA",
        "X" => "BABBB",
        "Y" => "BBAAA",
        "Z" => "BBAAB"
    };
}

// A mapping of alphabet to italic UTF-8 italic codes
lazy_static! {
    static ref ITALIC_CODES: HashMap<&'static str, char> = hashmap!{
        // Using Mathematical Italic
        "A" => '\u{1D434}',
        "B" => '\u{1D435}',
        "C" => '\u{1D436}',
        "D" => '\u{1D437}',
        "E" => '\u{1D438}',
        "F" => '\u{1D439}',
        "G" => '\u{1D43a}',
        "H" => '\u{1D43b}',
        "I" => '\u{1D43c}',
        "J" => '\u{1D43d}',
        "K" => '\u{1D43e}',
        "L" => '\u{1D43f}',
        "M" => '\u{1D440}',
        "N" => '\u{1D441}',
        "O" => '\u{1D442}',
        "P" => '\u{1D443}',
        "Q" => '\u{1D444}',
        "R" => '\u{1D445}',
        "S" => '\u{1D446}',
        "T" => '\u{1D447}',
        "U" => '\u{1D448}',
        "V" => '\u{1D449}',
        "W" => '\u{1D44a}',
        "X" => '\u{1D44b}',
        "Y" => '\u{1D44c}',
        "Z" => '\u{1D44d}',
        // Using Mathematical Sans-Serif Italic
        "a" => '\u{1D622}',
        "b" => '\u{1D623}',
        "c" => '\u{1D624}',
        "d" => '\u{1D625}',
        "e" => '\u{1D626}',
        "f" => '\u{1D627}',
        "g" => '\u{1D628}',
        "h" => '\u{1D629}',
        "i" => '\u{1D62a}',
        "j" => '\u{1D62b}',
        "k" => '\u{1D62c}',
        "l" => '\u{1D62d}',
        "m" => '\u{1D62e}',
        "n" => '\u{1D62f}',
        "o" => '\u{1D630}',
        "p" => '\u{1D631}',
        "q" => '\u{1D632}',
        "r" => '\u{1D633}',
        "s" => '\u{1D634}',
        "t" => '\u{1D635}',
        "u" => '\u{1D636}',
        "v" => '\u{1D637}',
        "w" => '\u{1D638}',
        "x" => '\u{1D639}',
        "y" => '\u{1D63a}',
        "z" => '\u{1D63b}'
    };
}

/// Get the code for a given key (source character)
fn get_code(use_distinct_alphabet: bool, key: &str) -> String {
    let mut code = String::new();
    // Need to handle 'I'/'J' and 'U'/'V'
    //  for traditional usage.
    let mut key_upper = key.to_uppercase();
    if !use_distinct_alphabet {
        match key_upper.as_str() {
            "J" => key_upper = "I".to_string(),
            "U" => key_upper = "V".to_string(),
            _ => {}
        }
    }
    if CODE_MAP.contains_key(key_upper.as_str()) {
        code.push_str(CODE_MAP.get(key_upper.as_str()).unwrap());
    }
    code
}

/// Gets the key (the source character) for a given cipher text code
fn get_key(code: &str) -> String {
    let mut key = String::new();

    for (_key, val) in CODE_MAP.iter() {
        if val == &code {
            key.push_str(_key);
        }
    }
    key
}

/// This struct is created by the `new()` method. See its documentation for more.
pub struct Baconian {
    use_distinct_alphabet: bool,
    decoy_text: String,
}

impl Cipher for Baconian {
    type Key = (bool, Option<String>);
    type Algorithm = Baconian;

    /// Initialise a Baconian cipher
    ///
    /// The `key` tuple maps to the following: `(bool, Option<str>) = (use_distinct_alphabet, decoy_text)`.
    /// Where ...
    ///
    /// * The encoding will be use_distinct_alphabet for all alphabetical characters, or classical
    ///     where I, J, U and V are mapped to the same value pairs
    /// * An optional decoy message that will will be used to hide the message -
    ///     default is boilerplate "Lorem ipsum" text.
    ///
    fn new(key: (bool, Option<String>)) -> Baconian {
        Baconian {
            use_distinct_alphabet: key.0,
            decoy_text: key.1.unwrap_or_else(|| lipsum(160)),
        }
    }

    /// Encrypt a message using the Baconian cipher
    ///
    /// * The message to be encrypted can only be ~18% of the decoy_text as each character
    ///     of message is encoded by 5 encoding characters `AAAAA`, `AAAAB`, etc.
    /// * The italicised ciphertext is then hidden in a decoy text, where, for each 'B'
    ///     in the ciphertext, the character is italicised in the decoy_text.
    ///
    /// # Examples
    /// Basic usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Baconian};
    ///
    /// let b = Baconian::new((false, None));;
    /// let message = "Hello";
    /// let cipher_text = "Lo𝘳𝘦𝘮 ip𝘴um d𝘰l𝘰𝘳 s𝘪t 𝘢𝘮e𝘵, 𝘤𝘰n";
    ///
    /// assert_eq!(cipher_text, b.encrypt(message).unwrap());
    /// ```
    fn encrypt(&self, message: &str) -> Result<String, &'static str> {
        let num_non_alphas = self
            .decoy_text
            .chars()
            .filter(|c| !c.is_alphabetic())
            .count();

        // Check whether the message fits in the decoy
        // Note: that non-alphabetical characters will be skipped.
        if (message.len() * CODE_LEN) > self.decoy_text.len() - num_non_alphas {
            return Err("Message too long for supplied decoy text.");
        }

        // Iterate through the message encoding each char (ignoring non-alphabetical chars)
        let secret: String = message
            .chars()
            .map(|c| get_code(self.use_distinct_alphabet, &c.to_string()))
            .collect();

        let mut num_alphas = 0;
        let mut num_non_alphas = 0;
        for c in self.decoy_text.chars() {
            if num_alphas == secret.len() {
                break;
            }
            if c.is_alphabetic() {
                num_alphas += 1
            } else {
                num_non_alphas += 1
            };
        }

        let decoy_slice: String = self
            .decoy_text
            .chars()
            .take(num_alphas + num_non_alphas)
            .collect();

        // We now have an encoded message, `secret`, in which each character of of the
        // original plaintext is now represented by a 5-bit binary character,
        // "AAAAA", "ABABA" etc.
        // We now overlay the encoded text onto the decoy slice, and
        // where the binary 'B' is found the decoy slice char is swapped for an italic
        let mut decoy_msg = String::new();
        let mut secret_iter = secret.chars();
        for c in decoy_slice.chars() {
            if c.is_alphabetic() {
                if let Some(sc) = secret_iter.next() {
                    if sc == 'B' {
                        // match the binary 'B' and swap for italic
                        let italic = *ITALIC_CODES.get(c.to_string().as_str()).unwrap();
                        decoy_msg.push(italic);
                    } else {
                        decoy_msg.push(c);
                    }
                }
            } else {
                decoy_msg.push(c);
            }
        }

        Ok(decoy_msg)
    }

    /// Decrypt a message that was encrypted with the Baconian cipher
    ///
    /// # Examples
    /// Basic usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Baconian};
    ///
    /// let b = Baconian::new((false, None));;
    /// let cipher_text = "Lo𝘳𝘦𝘮 ip𝘴um d𝘰l𝘰𝘳 s𝘪t 𝘢𝘮e𝘵, 𝘯𝘦 t";
    ///
    /// assert_eq!("HELLO", b.decrypt(cipher_text).unwrap());
    /// ```
    ///
    fn decrypt(&self, message: &str) -> Result<String, &'static str> {
        // The message is decoy text
        // Iterate through swapping any alphabetical chars found in the ITALIC_CODES
        // set to be 'B', else 'A', skip anything else.
        let ciphertext: String = message
            .chars()
            .filter(|c| c.is_alphabetic())
            .map(|c| {
                if ITALIC_CODES.iter().any(|e| *e.1 == c) {
                    'B'
                } else {
                    'A'
                }
            })
            .collect();

        let mut plaintext = String::new();
        let mut code = String::new();
        for c in ciphertext.chars() {
            code.push(c);
            if code.len() == CODE_LEN {
                // If we have the right length code
                plaintext += &get_key(&code);
                code.clear();
            }
        }

        Ok(plaintext)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn encrypt_simple() {
        let b = Baconian::new((false, None));
        let message = "Hello";
        let cipher_text = "Lo𝘳𝘦𝘮 ip𝘴um d𝘰l𝘰𝘳 s𝘪t 𝘢𝘮e𝘵, 𝘤𝘰n";
        assert_eq!(cipher_text, b.encrypt(message).unwrap());
    }
    // Need to test that the traditional and use_distinct_alphabet codes give different results
    #[test]
    fn encrypt_trad_v_dist() {
        let b_trad = Baconian::new((false, None));
        let b_dist = Baconian::new((true, None));
        let message = "I JADE YOU VERVENT UNICORN";

        assert_ne!(
            b_dist.encrypt(&message).unwrap(),
            b_trad.encrypt(message).unwrap()
        );
    }

    #[test]
    fn encrypt_message_spaced() {
        let decoy_text = String::from(
            // The Life of Man, verse 1
            "The world's a bubble; and the life of man less than a span. \
             In his conception wretched; from the womb so to the tomb: \
             Curst from the cradle, and brought up to years, with cares and fears. \
             Who then to frail mortality shall trust, \
             But limns the water, or but writes in dust. \
             Yet, since with sorrow here we live oppress'd, what life is best? \
             Courts are but only superficial schools to dandle fools: \
             The rural parts are turn'd into a den of savage men: \
             And where's a city from all vice so free, \
             But may be term'd the worst of all the three?",
        );
        let b = Baconian::new((false, Some(decoy_text)));
        let message = "Peace, Freedom 🗡️ and Liberty!";
        let cipher_text = "T𝘩𝘦 𝘸𝘰rl𝘥\'s a bubble; an𝘥 the 𝘭ife o𝘧 m𝘢𝘯 les𝘴 th𝘢n a sp𝘢n. \
                           In hi𝘴 𝘤o𝘯𝘤𝘦pt𝘪𝘰n wretche𝘥; 𝘧r𝘰m th𝘦 𝘸o𝘮b 𝘴𝘰 t𝘰 the tomb: \
                           𝐶ur𝘴t f𝘳om t𝘩𝘦 cr𝘢𝘥𝘭𝘦, and";
        assert_eq!(cipher_text, b.encrypt(message).unwrap());
    }
    // use_distinct_alphabet lexicon
    #[test]
    #[should_panic(expected = r#"Message too long for supplied decoy text."#)]
    fn encrypt_decoy_too_short() {
        let b = Baconian::new((false, None));
        let message = "This is a long message that will be too long to encode using \
                       the default decoy text. In order to have a long message encoded you need a \
                       decoy text that is at least five times as long, plus the non-alphabeticals.";

        b.encrypt(message).unwrap();
    }

    #[test]
    fn encrypt_with_use_distinct_alphabet_codeset() {
        let message = "Peace, Freedom 🗡️ and Liberty!";
        let decoy_text = String::from(
            // The Life of Man, verse 1
            "The world's a bubble; and the life of man less than a span. \
             In his conception wretched; from the womb so to the tomb: \
             Curst from the cradle, and brought up to years, with cares and fears. \
             Who then to frail mortality shall trust, \
             But limns the water, or but writes in dust. \
             Yet, since with sorrow here we live oppress'd, what life is best? \
             Courts are but only superficial schools to dandle fools: \
             The rural parts are turn'd into a den of savage men: \
             And where's a city from all vice so free, \
             But may be term'd the worst of all the three?",
        );
        let cipher_text = "T𝘩𝘦 𝘸𝘰rl𝘥's a bubble; an𝘥 the 𝘭ife o𝘧 m𝘢𝘯 les𝘴 th𝘢n a sp𝘢n. \
                           In hi𝘴 𝘤o𝘯𝘤𝘦pt𝘪𝘰n wretche𝘥; 𝘧r𝘰m th𝘦 𝘸o𝘮b 𝘴𝘰 t𝘰 the tomb: \
                           𝐶ur𝘴t f𝘳om t𝘩𝘦 cr𝘢𝘥𝘭𝘦, and";
        let b = Baconian::new((true, Some(decoy_text)));
        assert_eq!(cipher_text, b.encrypt(message).unwrap());
    }

    #[test]
    fn decrypt_a_classic() {
        let cipher_text = String::from("Let's c𝘰mp𝘳𝘰𝘮is𝘦. 𝐻old off th𝘦 at𝘵a𝘤k");
        let message = "ATTACK";
        let decoy_text = String::from("Let's compromise. Hold off the attack");
        let b = Baconian::new((true, Some(decoy_text)));
        assert_eq!(message, b.decrypt(&cipher_text).unwrap());
    }

    #[test]
    fn decrypt_traditional() {
        let cipher_text = String::from(
            "T𝘩e wor𝘭d's a bubble; an𝘥 𝘵he 𝘭if𝘦 𝘰f man 𝘭𝘦𝘴s 𝘵h𝘢n 𝘢 𝘴p𝘢n. \
             𝐼n h𝘪s c𝘰nce𝘱𝘵i𝘰n 𝘸re𝘵che𝘥; 𝘧r𝘰𝘮 th𝘦 𝘸𝘰m𝘣 s𝘰 t𝘰 𝘵h𝘦 t𝘰mb: \
             Curs𝘵 fr𝘰𝘮 𝘵h𝘦 cra𝘥l𝘦, 𝘢n𝘥",
        );
        // Note: the substitution for 'I'/'J' and 'U'/'V'
        let message = "IIADEYOVVERVENTVNICORN";
        let decoy_text = String::from(
            // The Life of Man, verse 1
            "The world's a bubble; and the life of man less than a span. \
             In his conception wretched; from the womb so to the tomb: \
             Curst from the cradle, and brought up to years, with cares and fears. \
             Who then to frail mortality shall trust, \
             But limns the water, or but writes in dust. \
             Yet, since with sorrow here we live oppress'd, what life is best? \
             Courts are but only superficial schools to dandle fools: \
             The rural parts are turn'd into a den of savage men: \
             And where's a city from all vice so free, \
             But may be term'd the worst of all the three?",
        );
        let b = Baconian::new((false, Some(decoy_text)));
        assert_eq!(message, b.decrypt(&cipher_text).unwrap());
    }
}
