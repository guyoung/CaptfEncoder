//! Contains helpful constants and functions used in substitution ciphers.
//!
const ALPHABET_LOWER: [char; 26] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z',
];

const ALPHABET_UPPER: [char; 26] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];

const NUMERIC: [char; 10] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

pub const STANDARD: Standard = Standard;
pub const ALPHANUMERIC: Alphanumeric = Alphanumeric;
pub const PLAYFAIR: Playfair = Playfair;

pub trait Alphabet {
    /// Attempts to find the position of the character in the alphabet.
    ///
    fn find_position(&self, c: char) -> Option<usize>;

    /// Returns a letter from within the alphabet at a specific index.
    ///
    /// # Panics
    /// Will panic if the index is out of the alphabet's bounds.
    fn get_letter(&self, index: usize, is_uppercase: bool) -> char;

    /// Performs a modulo on an index so that its value references a position within the alphabet.
    /// This function handles negative wrap around modulo as rust does not natievly support it.
    ///
    fn modulo(&self, i: isize) -> usize {
        (((i % self.length() as isize) + self.length() as isize) % self.length() as isize) as usize
    }

    /// Will check if the text contains valid alphabetic symbols only.
    ///
    fn is_valid(&self, text: &str) -> bool {
        text.chars().all(|c| self.find_position(c).is_some())
    }

    /// Will scrub non-alphabetic characters from the text and return the scrubed version.
    ///
    fn scrub(&self, text: &str) -> String {
        text.chars()
            .filter(|&c| self.find_position(c).is_some())
            .collect()
    }

    /// Finds the multiplicative inverse of an index such that `a*x = 1 (mod n)`. Where `a`
    /// is the number we are inverting, `x` is the multiplicative inverse, and `n` is the length of
    /// the alphabet.
    ///
    fn multiplicative_inverse(&self, a: isize) -> Option<usize> {
        for x in 1..self.length() {
            if self.modulo((a * x as isize) as isize) == 1 {
                return Some(x as usize);
            }
        }

        None
    }

    /// Returns the length of the alphabet
    ///
    fn length(&self) -> usize;
}

pub struct Standard;
impl Alphabet for Standard {
    fn find_position(&self, c: char) -> Option<usize> {
        ALPHABET_LOWER
            .iter()
            .position(|&a| a == c)
            .or_else(|| ALPHABET_UPPER.iter().position(|&a| a == c))
    }

    fn get_letter(&self, index: usize, is_uppercase: bool) -> char {
        if index > self.length() {
            panic!("Invalid index to the alphabet: {}.", index);
        }

        if is_uppercase {
            ALPHABET_UPPER[index]
        } else {
            ALPHABET_LOWER[index]
        }
    }

    fn length(&self) -> usize {
        26
    }
}

pub struct Alphanumeric;
impl Alphabet for Alphanumeric {
    fn find_position(&self, c: char) -> Option<usize> {
        if let Some(pos) = STANDARD.find_position(c) {
            return Some(pos);
        }

        if let Some(pos) = NUMERIC.iter().position(|&n| n == c) {
            return Some(pos + 26);
        }

        None
    }

    fn get_letter(&self, index: usize, is_uppercase: bool) -> char {
        if index > self.length() {
            panic!("Invalid index to the alphabet: {}.", index);
        }

        if index > 25 {
            NUMERIC[index - 26]
        } else if is_uppercase {
            ALPHABET_UPPER[index]
        } else {
            ALPHABET_LOWER[index]
        }
    }

    fn length(&self) -> usize {
        36
    }
}

pub struct Playfair;
impl Alphabet for Playfair {
    fn find_position(&self, c: char) -> Option<usize> {
        if c == 'J' || c == 'j' {
            return None;
        }

        if let Some(pos) = STANDARD.find_position(c) {
            if pos > 8 {
                return Some(pos - 1); //The J is missing from the alphabet
            }
            return Some(pos);
        }

        None
    }

    fn get_letter(&self, index: usize, is_uppercase: bool) -> char {
        if index > self.length() {
            panic!("Invalid index to the alphabet: {}.", index);
        }

        if is_uppercase {
            if index <= 8 {
                return ALPHABET_UPPER[index];
            }
            ALPHABET_UPPER[index + 1]
        } else {
            if index <= 8 {
                return ALPHABET_LOWER[index];
            }
            ALPHABET_LOWER[index + 1]
        }
    }

    fn length(&self) -> usize {
        25
    }
}

/// Determines if the char is a number.
///
pub fn is_numeric(c: char) -> bool {
    NUMERIC.iter().any(|&n| n == c)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn valid_standard_char() {
        let valid_iter = ALPHABET_LOWER.iter().chain(ALPHABET_UPPER.iter());
        for c in valid_iter {
            assert!(STANDARD.is_valid(&c.to_string()))
        }
    }

    #[test]
    fn invalid_standard_char() {
        let invalid_iter = "!🗡️@#$%^&*()!~-+=`':;.,<>?/}{][|]}0123456789".chars();
        for c in invalid_iter {
            assert!(!STANDARD.is_valid(&c.to_string()))
        }
    }

    #[test]
    fn valid_alphanumeric_char() {
        let valid_iter = ALPHABET_LOWER
            .iter()
            .chain(ALPHABET_UPPER.iter())
            .chain(NUMERIC.iter());
        for c in valid_iter {
            assert!(ALPHANUMERIC.is_valid(&c.to_string()))
        }
    }

    #[test]
    fn invalid_alphanumeric_char() {
        let invalid_iter = "!🗡️@#$%^&*()!~-+=`':;.,<>?/}{][|]}".chars();
        for c in invalid_iter {
            assert!(!ALPHANUMERIC.is_valid(&c.to_string()))
        }
    }

    #[test]
    fn find_j_in_playfiar() {
        assert!(PLAYFAIR.find_position('j').is_none());
    }

    #[test]
    fn check_playfair_positions() {
        for (i, former) in "abcdefghi".chars().enumerate() {
            assert_eq!(PLAYFAIR.find_position(former).unwrap(), i);
        }

        for (i, latter) in "klmnopqrstuvwxyz".chars().enumerate() {
            assert_eq!(PLAYFAIR.find_position(latter).unwrap(), 9 + i);
        }
    }

    #[test]
    fn check_playfair_retrieval() {
        for (i, former) in "abcdefghi".chars().enumerate() {
            assert_eq!(PLAYFAIR.get_letter(i, false), former);
            assert_eq!(PLAYFAIR.get_letter(i, true), former.to_ascii_uppercase());
        }

        for (i, latter) in "klmnopqrstuvwxyz".chars().enumerate() {
            assert_eq!(PLAYFAIR.get_letter(9 + i, false), latter);
            assert_eq!(
                PLAYFAIR.get_letter(9 + i, true),
                latter.to_ascii_uppercase()
            );
        }
    }
}
