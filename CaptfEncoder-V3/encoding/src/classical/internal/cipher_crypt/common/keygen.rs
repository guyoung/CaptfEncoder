//! This module contains functions for the generation of keys.
//!
use super::alphabet;
use super::alphabet::{Alphabet, ALPHANUMERIC, PLAYFAIR, STANDARD};
use std::collections::HashMap;

/// Generates a scrambled alphabet using a key phrase for a given alphabet type.
/// Lets consider the key `or0an3ge` for an alphanumeric alphabet. The resulting keyed alphabet
/// would be `or0an3gebcdfhijklmpqstuvwxyz12456789`.
///
/// # Panics
/// * The `key` contains a non-alphabetic symbol.
pub fn keyed_alphabet<T: Alphabet>(key: &str, alpha_type: &T, to_uppercase: bool) -> String {
    if !alpha_type.is_valid(key) {
        panic!("Key contains a non-alphabetic symbol.");
    }

    //Loop through each value in the key and add to our keyed alphabet if it isn't already there
    let mut keyed_alphabet = String::new();
    for c in key.chars() {
        if keyed_alphabet
            .chars()
            .find(|a| a.eq_ignore_ascii_case(&c))
            .is_none()
        {
            let add = if to_uppercase {
                c.to_uppercase().to_string()
            } else {
                c.to_lowercase().to_string()
            };
            keyed_alphabet.push_str(&add);
        }
    }

    // Add remaining letters to the end of the keyed alphabet.
    for index in 0..alpha_type.length() {
        let c = alpha_type.get_letter(index, to_uppercase);
        if keyed_alphabet
            .chars()
            .find(|a| a.eq_ignore_ascii_case(&c))
            .is_none()
        {
            keyed_alphabet.push(c);
        }
    }

    keyed_alphabet
}

/// Validate and return a Columnar Transposition key given a specific keystream.
///
/// # Panics
/// * The `keystream` length is 0.
/// * The `keystream` contains non-alphanumeric symbols.
/// * The `keystream` contains duplicate characters.
pub fn columnar_key(keystream: &str) -> Vec<(char, Vec<char>)> {
    let unique_chars: HashMap<_, _> = keystream.chars().map(|c| (c, c)).collect();

    //Validate key
    if keystream.is_empty() {
        panic!("The keystream is empty.");
    } else if keystream.len() - unique_chars.len() > 0 {
        panic!("The keystream cannot contain duplicate alphanumeric characters.");
    } else if !ALPHANUMERIC.is_valid(keystream) {
        panic!("The keystream cannot contain non-alphanumeric symbols.");
    }

    keystream
        .chars()
        .map(|c| (c, Vec::new()))
        .collect::<Vec<(char, Vec<char>)>>()
}

/// Generate a 6x6 polybius square hashmap from an alphanumeric key.
/// For successfull generation, the following must be met:
///
/// # Panics
/// * The `key` must have a length of 36.
/// * The `key` must contain each character of the alphanumeric alphabet `a-z`, `0-9`.
/// * The `key` must contain alphanumeric characters only.
/// * The `column` and `row_ids` must contain alphabetic characters only.
/// * The `column` or `row_ids` contain repeated characters.
///
/// # Example
/// Lets say the key was `or0ange1bcdf2hijk3lmp4qs5tu6vw7x8y9z` and the ids were
/// `column_ids = ['A','B','C','D','E', 'F']` `row_ids = ['A','B','C','D','E', 'F']`. Then the
/// polybius square would look like ...
///
/// __ A B C D E F
/// A| o r 0 a n g
/// B| e 1 b c d f
/// C| 2 h i j k 3
/// D| l m p 4 q s
/// E| 5 t u 6 v w
/// F| 7 x 8 y 9 z
///
/// `let square = keygen::polybius_square("or0ange1bcdf2hijk3lmp4qs5tu6vw7x8y9z",
///     ['A','B','C','D','E', 'F'], ['A','B','C','D','E', 'F']).unwrap();`
///
/// `assert_eq!(&'c', square.get("bd").unwrap());`
pub fn polybius_square(
    key: &str,
    column_ids: &[char; 6],
    row_ids: &[char; 6],
) -> HashMap<String, char> {
    let unique_chars: HashMap<_, _> = key.chars().map(|c| (c, c)).collect();

    //Validate the key
    if key.len() != 36 {
        panic!("The key must contain each character of the alphanumeric alphabet a-z 0-9.");
    } else if key.len() - unique_chars.len() > 0 {
        panic!("The key cannot contain duplicate alphanumeric characters.");
    } else if !ALPHANUMERIC.is_valid(key) {
        panic!("The key cannot contain non-alphanumeric symbols.");
    }

    //Check that the column and row ids are valid
    if !STANDARD.is_valid(&column_ids.iter().collect::<String>())
        || !STANDARD.is_valid(&row_ids.iter().collect::<String>())
    {
        panic!("The column and row ids cannot contain non-alphabetic symbols.");
    }

    //We need to check that each character within the row or column is unique
    let unique_cols: HashMap<_, _> = column_ids
        .iter()
        .map(|c| (c.to_ascii_lowercase(), c))
        .collect();

    let unique_rows: HashMap<_, _> = row_ids
        .iter()
        .map(|c| (c.to_ascii_lowercase(), c))
        .collect();

    if column_ids.len() - unique_cols.len() > 0 || row_ids.len() - unique_rows.len() > 0 {
        panic!("The column or row ids cannot contain repeated characters.");
    }

    let mut polybius_square = HashMap::new();
    let mut values = key.chars();

    for row in row_ids.iter().take(6) {
        for column in column_ids.iter().take(6) {
            let k = row.to_string() + &column.to_string();
            let v = values.next().expect("Alphabet square is invalid.");

            if alphabet::is_numeric(v) {
                //Numbers dont have case, so we just insert one entry
                polybius_square.insert(k.to_uppercase(), v.to_ascii_uppercase());
            } else {
                //Insert entry for both the upper and lowercase version of the character
                polybius_square.insert(k.to_lowercase(), v.to_ascii_lowercase());
                polybius_square.insert(k.to_uppercase(), v.to_ascii_uppercase());
            }
        }
    }

    polybius_square
}

/// Create a new Playfair key table
///
/// The table is a 5x5 (I=J) matrix. Any repeated characters are removed
/// and the key fills in the table from left to right starting on the
/// first row. The remaining, unused characters in the alphabet are then
/// appended to complete the table. Keys should not exceed 25 characters
/// in length.
///
/// # Panics
/// * The `keystream` must not be empty.
/// * The `keystream` must not exceed the length of the playfair alphabet (25 characters).
/// * The `keystream` must not contain non-alphabetic symbols or the letter 'J'.
///
/// # Examples
///
/// Given the key "PLAYFAIR EXAMPLE", the following table is generated:
///
/// P L A Y F
/// I R E X M
/// B C D G H
/// K N O Q S
/// T U V W Z
///
pub fn playfair_table(keystream: &str) -> ([String; 5], [String; 5]) {
    if keystream.is_empty() {
        panic!("The keystream cannot be empty.")
    } else if keystream.len() > PLAYFAIR.length() {
        panic!("The keystream length cannot exceed 25 characters.");
    } else if !PLAYFAIR.is_valid(keystream) {
        panic!("The keystream cannot contain non-alphabetic symbols or the letter 'J'.");
    }

    //Construct a unique key from the keystream and the remainder of the playfair aplhabet.
    let mut unique: Vec<char> = Vec::new();
    let upper = keystream.to_uppercase();
    let keystream_iter = upper
        .chars()
        .chain((0..PLAYFAIR.length()).map(|i| alphabet::PLAYFAIR.get_letter(i, true)));

    for c in keystream_iter {
        if !unique.contains(&c) {
            unique.push(c);
        }
    }

    let mut rows: [String; 5] = Default::default();
    for (i, r) in unique.chunks(5).enumerate() {
        rows[i] = r.iter().collect();
    }

    let mut cols: [String; 5] = Default::default();
    for i in 0..5 {
        for r in unique.chunks(5) {
            cols[i].push(r[i]);
        }
    }

    (rows, cols)
}

/// Generate a cyclic keystream.
///
/// For this, we simply repeat the key until we have enough symbols to
/// encrypt all alphabetic symbols of the message.
pub fn cyclic_keystream(key: &str, message: &str) -> String {
    let scrubbed_msg = alphabet::STANDARD.scrub(message);
    key.chars().cycle().take(scrubbed_msg.len()).collect()
}

/// Generate a concatonated keystream (key + message).
///
pub fn concatonated_keystream(key: &str, message: &str) -> String {
    //The key will only be used to encrypt the portion of the message that is alphabetic
    let scrubbed_msg = alphabet::STANDARD.scrub(message);

    //The key is large enough for the message already
    if key.len() >= scrubbed_msg.len() {
        return key.chars().take(scrubbed_msg.len()).collect();
    }

    //The keystream is simply a concatonation of the base key + the scrubbed message
    key.chars()
        .chain(scrubbed_msg.chars().take(scrubbed_msg.len() - key.len()))
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn cyclic_smaller_base_key() {
        assert_eq!(
            "lemonlemonlemon",
            cyclic_keystream("lemon", "We are under seige!")
        );
    }

    #[test]
    fn cyclic_larger_base_key() {
        assert_eq!("le", cyclic_keystream("lemon", "hi"));
    }

    #[test]
    fn concatonated_larger_base_key() {
        assert_eq!("forti", concatonated_keystream("fortification", "Hello"));
    }

    #[test]
    fn concatonated_smaller_base_key() {
        assert_eq!(
            "lemonWeareunder",
            concatonated_keystream("lemon", "We are under seige")
        );
    }

    //Polybius tests
    #[test]
    fn polybius_hashmap_order() {
        let p = polybius_square(
            "abcdefghijklmnopqrstuvwxyz0123456789",
            &['a', 'b', 'c', 'd', 'e', 'f'],
            &['a', 'b', 'c', 'd', 'e', 'f'],
        );

        assert_eq!(&'a', &p["aa"]);
        assert_eq!(&'c', &p["ac"]);
        assert_eq!(&'e', &p["ae"]);
        assert_eq!(&'h', &p["bb"]);
        assert_eq!(&'z', &p["eb"]);
    }

    #[test]
    #[should_panic]
    fn polybius_duplicate_characters() {
        polybius_square(
            "abcdefghijklnnopqrstuvwxyz0123456789",
            &['a', 'b', 'c', 'd', 'e', 'f'],
            &['a', 'b', 'c', 'd', 'e', 'f'],
        );
    }

    #[test]
    #[should_panic]
    fn polybius_missing_characters() {
        polybius_square(
            "adefghiklnnopqrstuvwxyz",
            &['a', 'b', 'c', 'd', 'e', 'f'],
            &['a', 'b', 'c', 'd', 'e', 'f'],
        );
    }

    #[test]
    #[should_panic]
    fn polybius_non_alpha_characters() {
        polybius_square(
            "abcd@#!ghiklnnopqrstuvwxyz0123456789",
            &['a', 'b', 'c', 'd', 'e', 'f'],
            &['a', 'b', 'c', 'd', 'e', 'f'],
        );
    }

    #[test]
    #[should_panic]
    fn polybius_repeated_column_ids() {
        polybius_square(
            "abcdefghijklmnopqrstuvwxyz0123456789",
            &['a', 'a', 'c', 'd', 'e', 'f'],
            &['a', 'b', 'c', 'd', 'e', 'f'],
        );
    }

    #[test]
    #[should_panic]
    fn polybius_repeated_row_ids() {
        polybius_square(
            "abcdefghijklmnopqrstuvwxyz0123456789",
            &['a', 'b', 'c', 'd', 'e', 'f'],
            &['a', 'b', 'c', 'c', 'e', 'f'],
        );
    }

    //Keyed alphabet tests
    #[test]
    fn generate_numeric_alphabet() {
        let keyed_alphabet = keyed_alphabet("or0ange", &ALPHANUMERIC, false);
        assert_eq!(keyed_alphabet, "or0angebcdfhijklmpqstuvwxyz123456789");
    }

    #[test]
    fn generate_standard_alphabet() {
        let keyed_alphabet = keyed_alphabet("test", &STANDARD, false);
        assert_eq!(keyed_alphabet, "tesabcdfghijklmnopqruvwxyz");
    }

    #[test]
    fn generate_alphabet_mixed_key() {
        let keyed_alphabet = keyed_alphabet("ALphaBEt", &STANDARD, false);
        assert_eq!(keyed_alphabet, "alphbetcdfgijkmnoqrsuvwxyz");
    }

    #[test]
    fn generate_uppercase_alphabet() {
        let keyed_alphabet = keyed_alphabet("OranGE", &STANDARD, true);
        assert_eq!(keyed_alphabet, "ORANGEBCDFHIJKLMPQSTUVWXYZ");
    }

    #[test]
    #[should_panic]
    fn generate_alphabet_bad_key() {
        keyed_alphabet("bad@key", &STANDARD, false);
    }

    #[test]
    fn generate_alphabet_no_key() {
        let keyed_alphabet = keyed_alphabet("", &STANDARD, false);
        assert_eq!(keyed_alphabet, "abcdefghijklmnopqrstuvwxyz");
    }

    #[test]
    fn generate_alphabet_long_key() {
        let keyed_alphabet = keyed_alphabet("nnhhyqzabguuxwdrvvctspefmjoklii", &STANDARD, true);
        assert_eq!(keyed_alphabet, "NHYQZABGUXWDRVCTSPEFMJOKLI");
    }

    #[test]
    fn generate_columnar_key() {
        assert_eq!(
            vec![
                ('z', vec![]),
                ('e', vec![]),
                ('b', vec![]),
                ('r', vec![]),
                ('a', vec![]),
                ('s', vec![]),
            ],
            columnar_key("zebras")
        );
    }

    #[test]
    #[should_panic]
    fn generate_columnar_empty_key() {
        columnar_key("");
    }

    #[test]
    #[should_panic]
    fn generate_columnar_invalid_key() {
        columnar_key("Fx !@#$");
    }

    // PlayfairTable Tests
    #[test]
    fn playfair_accepts_simple_key() {
        let (rows, cols) = playfair_table("playfairexample");
        assert_eq!(["PLAYF", "IREXM", "BCDGH", "KNOQS", "TUVWZ"], rows);
        assert_eq!(["PIBKT", "LRCNU", "AEDOV", "YXGQW", "FMHSZ"], cols);
    }

    #[test]
    fn playfair_accepts_alphabet() {
        let (rows, cols) = playfair_table("ABCDEFGHIKLMNOPQRSTUVWXYZ");
        assert_eq!(["ABCDE", "FGHIK", "LMNOP", "QRSTU", "VWXYZ"], rows);
        assert_eq!(["AFLQV", "BGMRW", "CHNSX", "DIOTY", "EKPUZ"], cols);
    }

    #[test]
    #[should_panic]
    fn playfair_rejects_whitespace() {
        playfair_table("Foo Bar");
    }

    #[test]
    #[should_panic]
    fn playfair_rejects_alphanumeric_key() {
        playfair_table("Bad123");
    }

    #[test]
    #[should_panic]
    fn playfair_rejects_ascii_key() {
        playfair_table("Bad?");
    }

    #[test]
    #[should_panic]
    fn playfair_rejects_unicode_key() {
        playfair_table("Bad☢");
    }

    #[test]
    #[should_panic]
    fn playfair_rejects_empty_key() {
        playfair_table("");
    }

    #[test]
    #[should_panic]
    fn playfair_rejects_j() {
        playfair_table("HelloWorldThisWilljFail");
    }

    #[test]
    #[should_panic]
    fn playfair_rejects_long_key() {
        playfair_table("ABCDEFGHIJKLMNOPQRSTUVWXYZA");
    }
}
