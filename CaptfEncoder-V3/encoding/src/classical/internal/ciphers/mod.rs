// https://github.com/sradley/ciphers


//! # Ciphers
//!
//! Ciphers is a Rust library that provides implementations of many different
//! classical ciphers.
//!
//! ## 1. Supported Ciphers
//! There are currently **16 different supported ciphers**.
//!
//! | Transposition          | Monoalphabetic      | Polyalphabetic | Polygraphic | Other  |
//! | ---------------------- | ------------------- | -------------- | ----------- | ------ |
//! | Rail-fence             | Simple Substitution | Vigenere       | Playfair    | ADFGX  |
//! | Columnar Transposition | Caesar              | Beaufort       | Four-Square | ADFGVX |
//! |                        | Affine              | Autokey        |             |        |
//! |                        | Polybius Square     | Running Key    |             |        |
//! |                        | Atbash              | Porta          |             |        |
//!
//! ## 2. Installation
//! Simply put the following in your **Cargo.toml**.
//!
//! ```toml
//! [dependencies]
//! ciphers = "0.1.0"
//! ```
//!
//! ## 3. Example Usage
//! E.g. using the **Vigenere** cipher.
//!
//! ```
//! use ciphers::{Cipher, Vigenere};
//!
//! fn main() {
//!     let vigenere = Vigenere::new("examplekey");
//!
//!     // encipher
//!     let ctext = vigenere.encipher("someexampletexthere").unwrap();
//!     println!("ciphertext: {}", ctext);
//!
//!     // decipher
//!     let ptext = vigenere.decipher(&ctext).unwrap();
//!     println!("plaintext:  {}", ptext);
//! }
//! ```
//!
//! ## 4. To be Implemented
//! There are currently **6 different ciphers to be implemented**.
//!
//! | Transposition | Monoalphabetic | Polyalphabetic | Polygraphic | Other                 |
//! | ------------- | -------------- | -------------- | ----------- | --------------------- |
//! |               | Rot13          | Gronsfeld      | Hill        | Bifid                 |
//! |               |                |                |             | Trifid                |
//! |               |                |                |             | Straddle Checkerboard |

//mod adfgvx;
mod adfgx;
//mod affine;
mod atbash;
//mod autokey;
mod beaufort;
//mod caesar;
mod columnar_transposition;
mod four_square;
//mod playfair;
mod polybius_square;
//mod porta;
//mod rail_fence;
mod running_key;
mod substitution;
//mod vigenere;

mod input;

// re-exports
//pub use adfgvx::ADFGVX;
pub use adfgx::ADFGX;
//pub use affine::Affine;
pub use atbash::Atbash;
//pub use autokey::Autokey;
pub use beaufort::Beaufort;
//pub use caesar::Caesar;
//pub use columnar_transposition::ColumnarTransposition;
pub use four_square::FourSquare;
//pub use playfair::Playfair;
//pub use polybius_square::PolybiusSquare;
//pub use porta::Porta;
//pub use rail_fence::RailFence;
pub use running_key::RunningKey;
pub use substitution::Substitution;
//pub use vigenere::Vigenere;

/// Errors that can result when giving a cipher method bad input.
#[derive(Debug, PartialEq)]
pub enum CipherInputError {
    NotAlphabetic,
    NotAscii,
    NotInAlphabet,
    BadInput(String),
}

/// A Result alias where the `Err` case is `ciphers::CipherInputError`.
pub type CipherResult = Result<String, CipherInputError>;

/// Defines the implementation for cipher functionality.
pub trait Cipher {
    /// Should take plaintext as a string reference, and return the enciphered ciphertext as
    /// a `CipherResult`.
    fn encipher(&self, ptext: &str) -> CipherResult;

    /// Should take the ciphertext as a string reference, and return the deciphered plaintext
    /// as a `CipherResult`.
    fn decipher(&self, ctext: &str) -> CipherResult;
}

static TABULA_RECTA: [[u8; 26]; 26] = [
    [
        65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87,
        88, 89, 90,
    ],
    [
        66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
        89, 90, 65,
    ],
    [
        67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
        90, 65, 66,
    ],
    [
        68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
        65, 66, 67,
    ],
    [
        69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 65,
        66, 67, 68,
    ],
    [
        70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 65, 66,
        67, 68, 69,
    ],
    [
        71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 65, 66, 67,
        68, 69, 70,
    ],
    [
        72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 65, 66, 67, 68,
        69, 70, 71,
    ],
    [
        73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 65, 66, 67, 68, 69,
        70, 71, 72,
    ],
    [
        74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 65, 66, 67, 68, 69, 70,
        71, 72, 73,
    ],
    [
        75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 65, 66, 67, 68, 69, 70, 71,
        72, 73, 74,
    ],
    [
        76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 65, 66, 67, 68, 69, 70, 71, 72,
        73, 74, 75,
    ],
    [
        77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 65, 66, 67, 68, 69, 70, 71, 72, 73,
        74, 75, 76,
    ],
    [
        78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
        75, 76, 77,
    ],
    [
        79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
        76, 77, 78,
    ],
    [
        80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,
        77, 78, 79,
    ],
    [
        81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77,
        78, 79, 80,
    ],
    [
        82, 83, 84, 85, 86, 87, 88, 89, 90, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
        79, 80, 81,
    ],
    [
        83, 84, 85, 86, 87, 88, 89, 90, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
        80, 81, 82,
    ],
    [
        84, 85, 86, 87, 88, 89, 90, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        81, 82, 83,
    ],
    [
        85, 86, 87, 88, 89, 90, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81,
        82, 83, 84,
    ],
    [
        86, 87, 88, 89, 90, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
        83, 84, 85,
    ],
    [
        87, 88, 89, 90, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
        84, 85, 86,
    ],
    [
        88, 89, 90, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
        85, 86, 87,
    ],
    [
        89, 90, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85,
        86, 87, 88,
    ],
    [
        90, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
        87, 88, 89,
    ],
];
