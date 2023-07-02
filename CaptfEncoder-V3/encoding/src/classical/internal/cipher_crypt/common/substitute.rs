//! Contains substitution methods that are used by a variety of ciphers
//!
use super::alphabet;
use super::alphabet::Alphabet;

/// Performs a shift substitution of letters within a piece of text based on the index of them
/// within the alphabet.
///
/// This substitution is defined by the closure `calc_index(ti)`.
///     * ti = the index of the character to shift
///     * note; the closure should shift the value set within the bounds of the standard alphabet
pub fn shift_substitution<F>(text: &str, calc_index: F) -> String
where
    F: Fn(usize) -> usize,
{
    let mut s_text = String::new();
    for c in text.chars() {
        //Find the index of the character in the alphabet (if it exists in there)
        let pos = alphabet::STANDARD.find_position(c);
        match pos {
            Some(pos) => {
                let si = calc_index(pos); //Calculate substitution index
                s_text.push(alphabet::STANDARD.get_letter(si, c.is_uppercase()));
            }
            None => s_text.push(c), //Push non-alphabetic chars 'as-is'
        }
    }

    s_text
}

/// Performs a poly-substitution on a piece of text based on the index of its characters
/// (within the alphabet) and the keystream `k`.
///
/// This substitution is defined by the closure `calc_index(ti, ki)`.
/// Where:
///     * ti = the index of the character to shift
///     * ki = the index of the next key character in the stream
pub fn key_substitution<F>(text: &str, keystream: &str, calc_index: F) -> String
where
    F: Fn(usize, usize) -> usize,
{
    let mut s_text = String::new();
    let mut keystream_iter = keystream.chars().peekable();
    for tc in text.chars() {
        //Find the index of the character in the alphabet (if it exists in there)
        let tpos = alphabet::STANDARD.find_position(tc);
        match tpos {
            Some(ti) => {
                if let Some(kc) = keystream_iter.peek() {
                    if let Some(ki) = alphabet::STANDARD.find_position(*kc) {
                        //Calculate the index and retrieve the letter to substitute
                        let si = calc_index(ti, ki);
                        s_text.push(alphabet::STANDARD.get_letter(si, tc.is_uppercase()));
                    } else {
                        panic!("Keystream contains a non-alphabetic symbol.");
                    }
                } else {
                    panic!("Keystream is not large enough for full substitution of message.");
                }
                keystream_iter.next();
            }
            None => s_text.push(tc), //Push non-alphabetic chars 'as-is'
        }
    }

    s_text
}
