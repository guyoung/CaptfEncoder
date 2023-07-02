//! The Railfence Cipher is a transposition cipher. It has a very low keyspace and is therefore
//! incredibly insecure.
//!
//! This implementation currently transposes all input characters including whitespace and
//! punctuation.

/// A Railfence cipher.
///
/// This struct is created by the `new()` method. See its documentation for more.
use super::common::cipher::Cipher;

pub struct Railfence {
    rails: usize,
}

impl Cipher for Railfence {
    type Key = usize;
    type Algorithm = Railfence;

    /// Initialise a Railfence cipher given a specific key (number of rails).
    ///
    /// # Panics
    /// * The `key` is 0.
    ///
    fn new(key: usize) -> Railfence {
        if key == 0 {
            panic!("The key is 0.");
        }

        Railfence { rails: key }
    }

    /// Encrypt a message using a Railfence cipher.
    ///
    /// # Examples
    /// Basic usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Railfence};
    ///
    /// let r = Railfence::new(3);
    /// assert_eq!("Src s!ue-ertmsaepseeg", r.encrypt("Super-secret message!").unwrap());
    /// ```
    ///
    fn encrypt(&self, message: &str) -> Result<String, &'static str> {
        // Encryption process:
        //   First a table is created with a height given by the key and a length
        //   given by the message length.
        //   e.g.
        //   For a key of 3 and the message "Hello, World!" of length 13:
        //      .............
        //      .............
        //      .............
        //   The message can then be written onto the grid in a zigzag going right:
        //      H...o...o...!
        //      .e.l.,.W.r.d.
        //      ..l... ...l..
        //   The encrypted message is then read line by line:
        //      Hoo!el,Wrdl l

        // We simply return the message as the 'encrypted' message when there is one rail.
        // This is because the message is transposed along a single rail without being altered.
        if self.rails == 1 {
            return Ok(message.to_string());
        }

        // Initialise the fence (a simple table)
        // The form of an entry is (bool, char) => (is_msg_element, msg_element)
        let mut table = vec![vec![(false, '.'); message.len()]; self.rails];

        //Transpose the message along the fence
        for (col, element) in message.chars().enumerate() {
            //Given the column (ith element of the message), determine which row to place the
            //character on
            let rail = Railfence::calc_current_rail(col, self.rails);
            table[rail][col] = (true, element);
        }

        Ok(table
            .iter()
            .flatten()
            .filter(|(is_element, _)| *is_element)
            .map(|(_, element)| element)
            .collect::<String>())
    }

    /// Decrypt a message using a Railfence cipher.
    ///
    /// # Examples
    /// Basic usage:
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Railfence};
    ///
    /// let r = Railfence::new(3);
    /// assert_eq!("Super-secret message!", r.decrypt("Src s!ue-ertmsaepseeg").unwrap());
    /// ```
    ///
    fn decrypt(&self, ciphertext: &str) -> Result<String, &'static str> {
        // Decryption process:
        //   First a table is created with a height given by the key and a length
        //   given by the ciphertext length.
        //   e.g.
        //   For a key of 3 and the ciphertext "Hoo!el,Wrdl l" of length 13:
        //      .............
        //      .............
        //      .............
        //   The positions in the table that would be used to encrypt a message are identified
        //      x...x...x...x
        //      .x.x.x.x.x.x.
        //      ..x...x...x..
        //   The ciphertext is then written onto the identified positions, line by line
        //      H...o...o...!
        //      .e.l.,.W.r.d.
        //      ..l... ...l..
        //   The decrypted message is then read in a zigzag:
        //      Hello, World!

        // As mentioned previously, a single rail means that the original message has not been
        // altered
        if self.rails == 1 {
            return Ok(ciphertext.to_string());
        }

        let mut table = vec![vec![(false, '.'); ciphertext.len()]; self.rails];

        // Traverse the table and mark the elements that will be filled by the cipher text
        for col in 0..ciphertext.len() {
            let rail = Railfence::calc_current_rail(col, self.rails);
            table[rail][col].0 = true;
        }

        // Fill the identified positions in the table with the ciphertext, line by line
        let mut ct_chars = ciphertext.chars();
        'outer: for row in &mut table {
            // For each element in the row, determine if a char should be placed there
            for element in row.iter_mut() {
                if element.0 {
                    if let Some(c) = ct_chars.next() {
                        *element = (element.0, c);
                    } else {
                        // We have transposed all chars of the cipher text
                        break 'outer;
                    }
                }
            }
        }

        // From the transposed cipher text construct the original message
        let mut message = String::new();
        for col in 0..ciphertext.len() {
            // For this column, determine which row we should read from to get the next char
            // of the message
            let rail = Railfence::calc_current_rail(col, self.rails);
            message.push(table[rail][col].1);
        }

        Ok(message)
    }
}

impl Railfence {
    /// For a given column and the total number of 'rails' (rows), determine the current rail
    /// that should be referenced.
    ///
    fn calc_current_rail(col: usize, total_rails: usize) -> usize {
        // In the Railfence cipher the letters are placed diagonally in a zigzag,
        // so, with a key of 4 say, the row numbers will go
        //      0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 2, 1, 0, ...
        // This repeats with a cycle (or period) given by (2*key - 2)
        //      [0, 1, 2, 3, 2, 1], [0, 1, 2, 3, 2, 1], 0, ...
        // This cycle is always even.
        let cycle = 2 * total_rails - 2;

        // For the first half of a cycle, the row is given by the index,
        // but for the second half it decreases and is therefore given by the reverse index,
        // the distance from the end of the cycle.
        if col % cycle <= cycle / 2 {
            col % cycle
        } else {
            cycle - col % cycle
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn encrypt_test() {
        let message = "attackatdawn";
        let r = Railfence::new(6);
        assert_eq!("awtantdatcak", r.encrypt(message).unwrap());
    }

    #[test]
    fn encrypt_mixed_case() {
        let message = "Hello, World!";
        let r = Railfence::new(3);
        assert_eq!("Hoo!el,Wrdl l", r.encrypt(message).unwrap());
    }

    #[test]
    fn encrypt_short_key() {
        let message = "attackatdawn";
        let r = Railfence::new(1);
        assert_eq!("attackatdawn", r.encrypt(message).unwrap());
    }

    #[test]
    fn encrypt_long_key() {
        let message = "attackatdawn";
        let r = Railfence::new(20);
        assert_eq!("attackatdawn", r.encrypt(message).unwrap());
    }

    #[test]
    fn decrypt_test() {
        let message = "awtantdatcak";
        let r = Railfence::new(6);
        assert_eq!("attackatdawn", r.decrypt(message).unwrap());
    }

    #[test]
    fn decrypt_short_key() {
        let message = "attackatdawn";
        let r = Railfence::new(1);
        assert_eq!("attackatdawn", r.decrypt(message).unwrap());
    }

    #[test]
    fn decrypt_mixed_case() {
        let message = "Hoo!el,Wrdl l";
        let r = Railfence::new(3);
        assert_eq!("Hello, World!", r.decrypt(message).unwrap());
    }

    #[test]
    fn decrypt_long_key() {
        let message = "attackatdawn";
        let r = Railfence::new(20);
        assert_eq!("attackatdawn", r.decrypt(message).unwrap());
    }

    #[test]
    #[should_panic]
    fn incorrect_key_test() {
        Railfence::new(0);
    }

    #[test]
    fn unicode_test() {
        let r = Railfence::new(3);
        let message = "ÂƮƮäƈķ ɑƬ Ðawŋ ✓";
        assert_eq!("ÂƈƬwƮäķɑ aŋ✓Ʈ Ð ", r.encrypt(message).unwrap());
    }
}
