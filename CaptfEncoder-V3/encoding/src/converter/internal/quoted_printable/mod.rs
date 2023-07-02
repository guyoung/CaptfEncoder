// https://github.com/staktrace/quoted-printable



pub use std::fmt;  
pub use std::vec::Vec;
pub use std::string::String;

const LINE_LENGTH_LIMIT: usize = 76;

static HEX_CHARS: &[char] = &[
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
];

/// A flag that allows control over the decoding strictness.

#[derive(Debug, PartialEq)]
pub enum ParseMode {
    /// Perform strict checking over the input, and return an error if any
    /// input appears malformed.
    Strict,
    /// Perform robust parsing, and gracefully handle any malformed input. This
    /// can result in the decoded output being different than what was intended.
    Robust,
}

/// An error type that represents different kinds of decoding errors.
#[derive(Debug)]
pub enum QuotedPrintableError {
    /// A byte was found in the input that was outside of the allowed range. The
    /// allowed range is the horizontal tab (ASCII 0x09), CR/LF characters (ASCII
    /// 0x0D and 0x0A), and anything in the ASCII range 0x20 to 0x7E, inclusive.
    InvalidByte,
    /// Lines where found in the input that exceeded 76 bytes in length, excluding
    /// the terminating CRLF.
    LineTooLong,
    /// An '=' character was found in the input without the proper number of
    /// hex-characters following it. This includes '=' characters followed
    /// by a single character and then the CRLF pair, for example.
    IncompleteHexOctet,
    /// An '=' character was found with two following characters, but they were
    /// not hex characters. '=Hi' for example would be an invalid encoding.
    InvalidHexOctet,
    /// An '=' character was found with two following hex characters, but the
    /// hex characters were lowercase rather than uppercase. The spec explicitly
    /// requires uppercase hex to be used, so this is considered an error.
    LowercaseHexOctet,
}

impl fmt::Display for QuotedPrintableError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match *self {
            QuotedPrintableError::InvalidByte => {
                write!(
                    f,
                    "A unallowed byte was found in the quoted-printable input"
                )
            }
            QuotedPrintableError::LineTooLong => {
                write!(
                    f,
                    "A line length in the quoted-printed input exceeded 76 bytes"
                )
            }
            QuotedPrintableError::IncompleteHexOctet => {
                write!(
                    f,
                    "A '=' followed by only one character was found in the input"
                )
            }
            QuotedPrintableError::InvalidHexOctet => {
                write!(
                    f,
                    "A '=' followed by non-hex characters was found in the input"
                )
            }
            QuotedPrintableError::LowercaseHexOctet => {
                write!(f, "A '=' was followed by lowercase hex characters")
            }
        }
    }
}

#[cfg(feature = "std")]
impl std::error::Error for QuotedPrintableError {
    fn description(&self) -> &str {
        "invalid quoted-printable input"
    }

    fn cause(&self) -> Option<&dyn std::error::Error> {
        None
    }
}

/// Decodes a piece of quoted-printable data.
///
/// The quoted-printable transfer-encoding is defined in IETF RFC 2045, section
/// 6.7. This function attempts to decode input that is conformant with that
/// spec. Note that quoted-printable encoding is independent of charset, and so
/// this function returns a Vec<u8> of bytes upon success. It is up to the caller
/// to convert that to a String if desired; the charset required to do so must
/// come from somewhere else.
///
/// # Examples
///
/// ```
///     use quoted_printable::{decode, ParseMode};
///     let decoded = decode("hello=3Dworld=0D=0A".as_bytes(), ParseMode::Robust).unwrap();
///     assert_eq!("hello=world\r\n", String::from_utf8(decoded).unwrap());
/// ```
///
/// # Errors
///
/// If this function is called with ParseMode::Strict, then it may return
/// a QuotedPrintableError if it detects that the input does not strictly conform
/// to the quoted-printable spec. If this function is called with ParseMode::Robust,
/// then it will attempt to gracefully handle any errors that arise. This might
/// result in input bytes being stripped out and ignored in some cases. Refer
/// to IETF RFC 2045, section 6.7 for details on what constitutes valid and
/// invalid input, and what a "robust" implementation would do in the face of
/// invalid input.
#[inline(always)]
pub fn decode<R: AsRef<[u8]>>(
    input: R,
    mode: ParseMode,
) -> Result<Vec<u8>, QuotedPrintableError> {
    _decode(input.as_ref(), mode)
}

fn _decode(input: &[u8], mode: ParseMode) -> Result<Vec<u8>, QuotedPrintableError> {
    let filtered = input
        .into_iter()
        .filter_map(|&c| match c {
            b'\t' | b'\r' | b'\n' | b' '..=b'~' => Some(c as char),
            _ => None,
        })
        .collect::<String>();
    if mode == ParseMode::Strict && filtered.len() != input.len() {
        return Err(QuotedPrintableError::InvalidByte);
    }
    let mut decoded = Vec::new();
    let mut lines = filtered.lines();
    let mut add_line_break = None;
    loop {
        let mut bytes = match lines.next() {
            Some(v) => v.trim_end().bytes(),
            None => {
                if mode == ParseMode::Strict && add_line_break == Some(false) {
                    return Err(QuotedPrintableError::IncompleteHexOctet);
                }
                break;
            }
        };

        if mode == ParseMode::Strict && bytes.len() > LINE_LENGTH_LIMIT {
            return Err(QuotedPrintableError::LineTooLong);
        }

        if add_line_break == Some(true) {
            decoded.push(b'\r');
            decoded.push(b'\n');
            add_line_break = Some(false);
        }

        loop {
            let byte = match bytes.next() {
                Some(v) => v,
                None => {
                    add_line_break = Some(true);
                    break;
                }
            };

            if byte == b'=' {
                let upper = match bytes.next() {
                    Some(v) => v,
                    None => break,
                };
                let lower = match bytes.next() {
                    Some(v) => v,
                    None => {
                        if mode == ParseMode::Strict {
                            return Err(QuotedPrintableError::IncompleteHexOctet);
                        }
                        decoded.push(byte);
                        decoded.push(upper);
                        add_line_break = Some(true);
                        break;
                    }
                };
                let upper_char = upper as char;
                let lower_char = lower as char;
                if upper_char.is_digit(16) && lower_char.is_digit(16) {
                    if mode == ParseMode::Strict {
                        if upper_char.to_uppercase().next() != Some(upper_char)
                            || lower_char.to_uppercase().next() != Some(lower_char)
                        {
                            return Err(QuotedPrintableError::LowercaseHexOctet);
                        }
                    }
                    let combined =
                        upper_char.to_digit(16).unwrap() << 4 | lower_char.to_digit(16).unwrap();
                    decoded.push(combined as u8);
                } else {
                    if mode == ParseMode::Strict {
                        return Err(QuotedPrintableError::InvalidHexOctet);
                    }
                    decoded.push(byte);
                    decoded.push(upper);
                    decoded.push(lower);
                }
            } else {
                decoded.push(byte);
            }
        }
    }
    Ok(decoded)
}

fn append(
    result: &mut String,
    to_append: &[char],
    bytes_on_line: &mut usize,
    backup_pos: &mut usize,
) {
    if *bytes_on_line + to_append.len() > LINE_LENGTH_LIMIT {
        if *bytes_on_line == LINE_LENGTH_LIMIT {
            // We're already at the max length, so inserting the '=' in the soft
            // line break would put us over. Instead, we insert the soft line
            // break at the backup pos, which is just before the last thing
            // appended.
            *bytes_on_line = result.len() - *backup_pos;
            result.insert_str(*backup_pos, "=\r\n");
        } else {
            result.push_str("=\r\n");
            *bytes_on_line = 0;
        }
    }
    result.extend(to_append);
    *bytes_on_line = *bytes_on_line + to_append.len();
    *backup_pos = result.len() - to_append.len();
}

/// Encodes some bytes into quoted-printable format.
///
/// The quoted-printable transfer-encoding is defined in IETF RFC 2045, section
/// 6.7. This function encodes a set of raw bytes into a format conformant with
/// that spec. The output contains CRLF pairs as needed so that each line is
/// wrapped to 76 characters or less (not including the CRLF).
///
/// # Examples
///
/// ```
///     use quoted_printable::encode;
///     let encoded = encode("hello, \u{20ac} zone!");
///     assert_eq!("hello, =E2=82=AC zone!", String::from_utf8(encoded).unwrap());
/// ```
#[inline(always)]
pub fn encode<R: AsRef<[u8]>>(input: R) -> Vec<u8> {
    let encoded_as_string = _encode(input.as_ref());
    encoded_as_string.into()
}

fn _encode(input: &[u8]) -> String {
    let mut result = String::new();
    let mut on_line: usize = 0;
    let mut backup_pos: usize = 0;
    let mut was_cr = false;
    let mut it = input.iter();

    while let Some(&byte) = it.next() {
        if was_cr {
            if byte == b'\n' {
                result.push_str("\r\n");
                on_line = 0;
                was_cr = false;
                continue;
            }
            // encode the CR ('\r') we skipped over before
            append(&mut result, &['=', '0', 'D'], &mut on_line, &mut backup_pos);
        }
        if byte == b'\r' {
            // remember we had a CR ('\r') but do not encode it yet
            was_cr = true;
            continue;
        } else {
            was_cr = false;
        }
        encode_byte(&mut result, byte, &mut on_line, &mut backup_pos);
    }

    // we haven't yet encoded the last CR ('\r') so do it now
    if was_cr {
        append(&mut result, &['=', '0', 'D'], &mut on_line, &mut backup_pos);
    }

    result
}

/// Encodes some bytes into quoted-printable format.
///
/// The difference to `encode` is that this function returns a `String`.
///
/// The quoted-printable transfer-encoding is defined in IETF RFC 2045, section
/// 6.7. This function encodes a set of raw bytes into a format conformant with
/// that spec. The output contains CRLF pairs as needed so that each line is
/// wrapped to 76 characters or less (not including the CRLF).
///
/// # Examples
///
/// ```
///     use quoted_printable::encode_to_str;
///     let encoded = encode_to_str("hello, \u{20ac} zone!");
///     assert_eq!("hello, =E2=82=AC zone!", encoded);
/// ```
#[inline(always)]
pub fn encode_to_str<R: AsRef<[u8]>>(input: R) -> String {
    _encode(input.as_ref())
}

#[inline]
fn encode_byte(
    result: &mut String,
    to_append: u8,
    on_line: &mut usize,
    backup_pos: &mut usize,
) {
    match to_append {
        b'=' => append(result, &['=', '3', 'D'], on_line, backup_pos),
        b'\t' | b' '..=b'~' => append(result, &[char::from(to_append)], on_line, backup_pos),
        _ => append(result, &hex_encode_byte(to_append), on_line, backup_pos),
    }
}

#[inline(always)]
fn hex_encode_byte(byte: u8) -> [char; 3] {
    [
        '=',
        lower_nibble_to_hex(byte >> 4),
        lower_nibble_to_hex(byte),
    ]
}

#[inline(always)]
fn lower_nibble_to_hex(half_byte: u8) -> char {
    HEX_CHARS[(half_byte & 0x0F) as usize]
}
