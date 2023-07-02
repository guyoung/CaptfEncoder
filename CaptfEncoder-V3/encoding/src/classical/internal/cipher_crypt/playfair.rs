//! The Playfair cipher is the first bigram substitution cipher.
//! Invented in 1854 by Charles Wheatstone, its name honors Lord
//! Lyon Playfair for promoting its use.
//!
//! [Reference](https://en.wikipedia.org/wiki/Playfair_cipher)
//!
//! The Playfair cipher operates on a 5x5 table. The key, omitting repeated
//! characters, is written from left to right starting on the first row
//! of the table. Other key layout patterns in the table can be used
//! but are less common. Note that a letter must either be omitted
//! (typically 'Q') or two letters can occupy the same space (I=J).
//! This implementation uses the *latter* design, replacing all
//! encountered 'J' characters with 'I'.
//!
use super::common::{alphabet, alphabet::Alphabet, cipher::Cipher, keygen::playfair_table};

type Bigram = (char, char);

/// A Playfair cipher.
///
/// This struct is created by the `new()` method. See its documentation for more.
pub struct Playfair {
    /// The Playfair key table (5x5)
    rows: [String; 5],
    cols: [String; 5],
    null_char: char,
}

impl Cipher for Playfair {
    type Key = (String, Option<char>);
    type Algorithm = Playfair;

    /// Initialize a Playfair cipher.
    ///
    /// The `key` tuple maps to the following `(String, Option<char>) = (keystream, null_char)`.
    /// Where ...
    ///
    /// * The `keystream` is used to generate a playfair table.
    /// * The `null_char` is the character that is used to pad uneven messages
    /// during the encryption process. This value will default to 'X'.
    ///
    /// # Panics
    /// * The `keystream` must not be empty.
    /// * The `keystream` must not exceed the length of the playfair alphabet (25 characters).
    /// * The `keystream` must not contain non-alphabetic symbols or the letter 'J'.
    ///
    fn new(key: (String, Option<char>)) -> Playfair {
        let null_char = key.1.unwrap_or('X').to_ascii_uppercase();
        let (rows, cols) = playfair_table(&key.0);

        Playfair {
            rows,
            cols,
            null_char,
        }
    }

    /// Encrypt a message with the Playfair cipher.
    ///
    /// # Warning
    /// * The 5x5 key table requires any 'J' characters in the message
    /// to be substituted with 'I' characters (i.e. I = J).
    /// * The resulting ciphertext will be fully uppercase with no whitespace.
    ///
    /// # Errors
    /// * Message contains a non-alphabetic character.
    /// * Message contains the null character.
    /// * Message contains whitespace.
    ///
    /// # Examples
    ///
    /// Basic Usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Playfair};
    ///
    /// let c = Playfair::new(("playfairexample".to_string(), None));
    /// assert_eq!(
    ///     c.encrypt("Hidethegoldinthetreestump").unwrap(),
    ///     "BMODZBXDNABEKUDMUIXMKZZRYI"
    /// );
    /// ```
    ///
    fn encrypt(&self, message: &str) -> Result<String, &'static str> {
        if !alphabet::PLAYFAIR.is_valid(&message) {
            return Err("Message must only consist of alphabetic characters.");
        } else if message.to_uppercase().contains(self.null_char) {
            return Err("Message cannot contain the null character.");
        }

        // Handles Rule 1 (Bigrams)
        let bmsg = self.bigram(&message.to_uppercase());

        self.apply_rules(bmsg, |v, first, second| {
            (v[(first + 1) % 5], v[(second + 1) % 5])
        })
    }

    /// Decrypt a message with the Playfair cipher.
    ///
    /// # Warning
    /// * The 5x5 key table requires any 'J' characters in the message
    /// to be substituted with 'I' characters (i.e. I = J).
    /// * The resulting plaintext will be fully uppercase with no whitespace.
    /// * The resulting plaintext may contain added null characters.
    ///
    /// # Errors
    /// * Message contains a non-alphabetic character.
    /// * Message contains whitespace.
    ///
    /// # Examples
    ///
    /// Basic Usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Playfair};
    ///
    /// let c = Playfair::new(("playfairexample".to_string(), None));
    /// assert_eq!(
    ///     c.decrypt("BMODZBXDNABEKUDMUIXMKZZRYI").unwrap(),
    ///     "HIDETHEGOLDINTHETREXSTUMPX"
    /// );
    ///
    /// ```
    ///
    fn decrypt(&self, message: &str) -> Result<String, &'static str> {
        if !alphabet::PLAYFAIR.is_valid(&message) {
            return Err("Message must only consist of alphabetic characters.");
        }
        // Handles Rule 1
        let bmsg = self.bigram(&message.to_uppercase());

        //Must be wary of negative wrap-around in modulo
        self.apply_rules(bmsg, |v, first, second| {
            (
                v[first.checked_sub(1).unwrap_or(v.len() - 1)],
                v[second.checked_sub(1).unwrap_or(v.len() - 1)],
            )
        })
    }
}

impl Playfair {
    /// Apply the PlayFair cipher algorithm.
    ///
    /// The operations for encrypt and decrypt are identical
    /// except for the direction of the substitution choice.
    ///
    fn apply_rules<F>(&self, bigrams: Vec<Bigram>, shift: F) -> Result<String, &'static str>
    where
        F: Fn(Vec<char>, usize, usize) -> Bigram,
    {
        let mut text = String::new();
        for bigram in bigrams {
            let chars: Bigram;
            if let Some(b) = self.apply_slice(bigram, &self.rows, &shift) {
                // Rule 2 (Row)
                chars = b;
            } else if let Some(b) = self.apply_slice(bigram, &self.cols, &shift) {
                // Rule 3 (Column)
                chars = b;
            } else {
                // Rule 4 (Rectangle)
                chars = self.apply_rectangle(bigram);
            }

            text.push(chars.0);
            text.push(chars.1);
        }
        Ok(text)
    }

    /// Apply rule 1 (bigrams).
    ///
    /// # Rule 1
    ///
    /// If both letters are the same (or only one letter is left), add the null_char
    /// after the first letter. Encrypt the new pair and continue.
    ///
    /// [Reference](https://en.wikipedia.org/wiki/Playfair_cipher#Description)
    ///
    fn bigram(&self, message: &str) -> Vec<Bigram> {
        if message.contains(char::is_whitespace) {
            panic!("Message contains whitespace.");
        }
        if !alphabet::PLAYFAIR.is_valid(&message) {
            panic!("Message must only consist of alphabetic characters.");
        }

        let mut bigrams: Vec<Bigram> = Vec::new();
        let mut msg_iter = message.chars().peekable();
        let mut skip = false;

        while let Some(current) = msg_iter.next() {
            if skip {
                skip = false;
                continue;
            }

            if let Some(next) = msg_iter.peek() {
                if next == &current {
                    bigrams.push((current, self.null_char)); // Add the null character for repeating chars
                    skip = true;
                } else {
                    bigrams.push((current, *next)); // Add the next two letters
                    skip = true;
                }
            } else {
                bigrams.push((current, self.null_char)); //It's uneven - add the null char
            }
        }

        bigrams
    }

    /// Apply rule 2 (Row) or rule 3 (Column).
    ///
    /// # Rule 2
    ///
    /// If the letters appear on the same row of your table, replace them
    /// with the letters to their immediate right respectively (wrapping
    /// around to the left side of the row if a letter in the original pair
    /// was on the right side of the row).
    ///
    /// # Rule 3
    ///
    /// If the letters appear on the same column of your table, replace them
    /// with the letters immediately below respectively (wrapping around to the
    /// top side of the column if a letter in the original pair was on the
    /// bottom side of the column).
    ///
    /// [Reference](https://en.wikipedia.org/wiki/Playfair_cipher#Description)
    ///
    fn apply_slice<F>(&self, b: Bigram, slices: &[String; 5], shift: &F) -> Option<Bigram>
    where
        F: Fn(Vec<char>, usize, usize) -> Bigram,
    {
        for slice in slices.iter() {
            if let Some(first) = slice.find(b.0) {
                if let Some(second) = slice.find(b.1) {
                    return Some(shift(slice.chars().collect(), first, second));
                }
            }
        }
        None
    }

    /// Apply rule 4 (Rectangle).
    ///
    /// # Rule 4
    ///
    /// If the letters are not on the same row or column, replace them with
    /// the letters on the same row respectively but at the other pair of
    /// corners of the rectangle defined by the original pair. The order is
    /// important – the first letter of the encrypted pair is the one that
    /// lies on the same row as the first letter of the plaintext pair.
    ///
    /// [Reference](https://en.wikipedia.org/wiki/Playfair_cipher#Description)
    ///
    fn apply_rectangle(&self, b: Bigram) -> Bigram {
        let row_indices = find_corners(b, &self.cols);
        let col_indices = find_corners(b, &self.rows);

        let row0: Vec<char> = self.rows[row_indices.0].chars().collect();
        let row1: Vec<char> = self.rows[row_indices.1].chars().collect();

        (row0[col_indices.1], row1[col_indices.0])
    }
}

/// Identifies 2 corners of the rectangle.
fn find_corners(b: Bigram, slices: &[String; 5]) -> (usize, usize) {
    let mut indices = (0, 0);
    for slice in slices.iter() {
        if let Some(pos) = slice.find(b.0) {
            indices.0 = pos;
        } else if let Some(pos) = slice.find(b.1) {
            indices.1 = pos;
        }
    }
    indices
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn bigram_handles_repeats() {
        let pf = Playfair::new(("test".to_string(), Some('X')));
        let message = "FIZZBAR";
        assert_eq!(
            vec![('F', 'I'), ('Z', 'X'), ('B', 'A'), ('R', 'X'),],
            pf.bigram(message)
        );
    }

    #[test]
    fn bigram_handles_odd_length() {
        let pf = Playfair::new(("test".to_string(), Some('Z')));
        let message = "WORLD";
        assert_eq!(
            vec![('W', 'O'), ('R', 'L'), ('D', 'Z'),],
            pf.bigram(message)
        );
    }

    #[test]
    fn invalid_encrypt_message_whitespace() {
        let pf = Playfair::new(("playfairexample".to_string(), None));
        assert!(pf.encrypt("This contains whitespace").is_err());
    }

    #[test]
    fn invalid_encrypt_message_null_char() {
        let pf = Playfair::new(("playfairexample".to_string(), Some('Z')));
        assert!(pf.encrypt("Thiscontainsthenullcharz").is_err());
    }

    #[test]
    fn invalid_decrypt_message_symbols() {
        let pf = Playfair::new(("playfairexample".to_string(), None));
        assert!(pf.decrypt("This!contains!whitespace").is_err());
    }

    #[test]
    fn simple_encrypt() {
        let pf = Playfair::new(("playfairexample".to_string(), None));
        assert_eq!(
            "BMODZBXDNABEKUDMUIXMKZZRYI",
            pf.encrypt("Hidethegoldinthetreestump").unwrap(),
        );
    }

    #[test]
    fn simple_decrypt() {
        let pf = Playfair::new(("playfairexample".to_string(), None));
        assert_eq!(
            "HIDETHEGOLDINTHETREXSTUMPX",
            pf.decrypt("BMODZBXDNABEKUDMUIXMKZZRYI").unwrap(),
        );
    }

    #[test]
    fn negative_wrap_around() {
        let pf = Playfair::new(("apt".to_string(), None));
        let msg = "HELLOWORLD";
        assert_eq!("HELXOWORLD", pf.decrypt(&pf.encrypt(msg).unwrap()).unwrap());
    }
}
