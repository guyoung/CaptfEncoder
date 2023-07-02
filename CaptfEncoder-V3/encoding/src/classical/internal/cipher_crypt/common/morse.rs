//! Contains helpful constants and functions used in Morse-based ciphers.
//!

// The Morse alphabet (Obtained from https://morsecode.scphillips.com/morse2.html)
const MORSE_ALPHABET: [(&str, &str); 49] = [
    ("A", ".-"),
    ("B", "-..."),
    ("C", "-.-."),
    ("D", "-.."),
    ("E", "."),
    ("F", "..-."),
    ("G", "--."),
    ("H", "...."),
    ("I", ".."),
    ("J", ".---"),
    ("K", "-.-"),
    ("L", ".-.."),
    ("M", "--"),
    ("N", "-."),
    ("O", "---"),
    ("P", ".--."),
    ("Q", "--.-"),
    ("R", ".-."),
    ("S", "..."),
    ("T", "-"),
    ("U", "..-"),
    ("V", "...-"),
    ("W", ".--"),
    ("X", "-..-"),
    ("Y", "-.--"),
    ("Z", "--.."),
    ("1", ".----"),
    ("2", "..---"),
    ("3", "...--"),
    ("4", "....-"),
    ("5", "....."),
    ("6", "-...."),
    ("7", "--..."),
    ("8", "---.."),
    ("9", "----."),
    ("0", "-----"),
    (".", ".-.-.-"),
    (",", "--..--"),
    (":", "---..."),
    ("\"", ".----."),
    ("'", ".-..-."),
    ("!", "-.-.--"),
    ("?", "..--.."),
    ("@", ".--.-."),
    ("-", "-....-"),
    (";", "-.-.-."),
    ("(", "-.--."),
    (")", "-.--.-"),
    ("=", "-...-"),
];

/// Attempts to decode a morsecode sequence into a character of the known alphabet.
///
/// Will return None if the Morse code isn't present in the alphabet
pub fn decode_sequence(seq: &str) -> Option<String> {
    match MORSE_ALPHABET.iter().find(|&e| e.1 == seq) {
        Some(entry) => Some(entry.0.to_string()),
        None => None,
    }
}

/// Attempts to convert a character into a morse code sequence
///
/// Will return None if the character isn't present in the known alphabet
pub fn encode_character(c: char) -> Option<String> {
    match MORSE_ALPHABET
        .iter()
        .find(|&e| e.0 == c.to_uppercase().to_string())
    {
        Some(entry) => Some(entry.1.to_string()),
        None => None,
    }
}
