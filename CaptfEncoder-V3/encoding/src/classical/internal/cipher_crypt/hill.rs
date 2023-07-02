//! In classical cryptography, the Hill cipher is a polygraphic substitution cipher based on
//! linear algebra.
//!
//! Invented by Lester S. Hill in 1929, it was the first polygraphic cipher in which it was
//! practical (though barely) to operate on more than three symbols at once. The matrix used for
//! encryption is the cipher key, and it should be chosen randomly from the set of invertible n ×
//! n matrices (modulo 26).
//!
//! Please note that this cipher uses the external library
//! [rulinalg](https://crates.io/crates/rulinalg) to perform the linear algebra calculations. If
//! you want to create an instance of the `Hill` struct using the `new` function, then you will
//! need to add a dependency on the `rulinalg` crate in `Cargo.toml`. Alternatively, you could
//! avoid dealing with matrices altogether by creating an instance of `Hill` via the function
//! `Hill::from_phrase(...)`.
//!
use super::common::alphabet;
use super::common::alphabet::Alphabet;
use super::common::cipher::Cipher;
use num::integer::gcd;
use rulinalg::matrix::{BaseMatrix, BaseMatrixMut, Matrix};

/// A Hill cipher.
///
/// This struct is created by the `new()` method. See its documentation for more.
pub struct Hill {
    key: Matrix<isize>,
}

impl Cipher for Hill {
    type Key = Matrix<isize>;
    type Algorithm = Hill;

    /// Initialise a Hill cipher given a key matrix.
    ///
    /// # Panics
    /// * The `key` matrix is not a square
    /// * The `key` matrix is non-invertible
    /// * The inverse determinant of the `key` matrix cannot be calculated such that
    /// `d*d^-1 == 1 mod 26`
    ///
    /// # Examples
    ///
    /// ```
    /// extern crate rulinalg;
    /// extern crate cipher_crypt;
    ///
    /// use rulinalg::matrix::Matrix;
    /// use cipher_crypt::{Cipher, Hill};
    ///
    /// fn main() {
    ///     //Initialise a Hill cipher from a 3 x 3 matrix
    ///     let m = Matrix::new(3, 3, vec![2, 4, 5, 9, 2, 1, 3, 17, 7]);
    ///     let h = Hill::new(m);
    /// }
    /// ```
    ///
    fn new(key: Matrix<isize>) -> Hill {
        if key.cols() != key.rows() {
            panic!("The key is not a square matrix.");
        }

        //We want to restrict the caller to supplying matrices of type isize
        //However, the majority of the matrix operations will be done with type f64
        let m: Matrix<f64> = key
            .clone()
            .try_into()
            .expect("Could not convert Matrix of type `isize` to `f64`.");

        if m.clone().inverse().is_err() || Hill::calc_inverse_key(m.clone()).is_err() {
            panic!("The inverse of this matrix cannot be calculated for decryption.");
        }

        if gcd(m.det() as isize, 26) != 1 {
            panic!("The inverse determinant of the key cannot be calculated.");
        }

        Hill { key }
    }

    /// Encrypt a message using a Hill cipher.
    ///
    /// It is expected that this message contains alphabetic characters only. Due to the nature of
    /// the hill cipher it is very difficult to transpose whitespace or symbols during the
    /// encryption process. It will reject with `Err` if the message contains any non-alphabetic
    /// symbols.
    ///
    /// You may also notice that your encrypted message is longer than the original. This will
    /// occur when the length of the message is not a multiple of the key matrix size. To
    /// accommodate for this potential difference, the algorithm will add `n` amount of padding
    /// characters so that encryption can occur. It is important that these extra padding
    /// characters are not removed till *after* the decryption process, otherwise the message will
    /// not be transposed properly.
    ///
    /// # Example
    /// Basic usage:
    ///
    /// ```
    /// extern crate rulinalg;
    /// extern crate cipher_crypt;
    ///
    /// use rulinalg::matrix::Matrix;
    /// use cipher_crypt::{Cipher, Hill};
    ///
    /// fn main() {
    ///     let h = Hill::new(Matrix::new(3, 3, vec![2, 4, 5, 9, 2, 1, 3, 17, 7]));
    ///     //Padding characters are added during the encryption process
    ///     assert_eq!("PFOGOAUCIMpf", h.encrypt("ATTACKEAST").unwrap());
    /// }
    /// ```
    ///
    fn encrypt(&self, message: &str) -> Result<String, &'static str> {
        //A small insight into the theory behind encrypting with the hill cipher will be explained
        //thusly.
        /*
            The basic process is to break a message up into chunks (a set of character vectors),
            whose individual length is equal to the length of the square matrix key.

            Once we have obtained these chunks, we transform them so that the character is replaced
            with its index within the alphabet. For example:
            ['A', 'T', 'T'] = [0, 19, 19]

            Once we have this list of indices, we perform a matrix multiplication of this
            vector/matrix with the key matrix. For example say we had a key `k` ...

                k * [0, 19, 19] mod 26 = [15, 5, 14] -> ['P', 'F', 'O'] encrypted characters

                where k = [2, 4, 5; 9, 2, 1; 3, 17, 7]

            This is repeated until all the 'chunks' of the message have been consumed/transformed.
        */
        Hill::transform_message(&self.key.clone().try_into().unwrap(), message)
    }

    /// Decrypt a message using a Hill cipher.
    ///
    /// It is expected that this message contains alphabetic characters only. Due to the nature of
    /// the hill cipher it is very difficult to transpose whitespace or symbols during the
    /// encryption process. It will reject with `Err` if the message contains any non-alphabetic
    /// symbols.
    ///
    /// You may also notice that your encrypted message is longer than the original. This will
    /// occur when the length of the message is not a multiple of the key matrix size. See encrypt
    /// function for more information.
    ///
    /// # Examples
    /// Example with stripping out padding:
    ///
    /// ```
    /// extern crate rulinalg;
    /// extern crate cipher_crypt;
    ///
    /// use rulinalg::matrix::Matrix;
    /// use cipher_crypt::{Cipher, Hill};
    ///
    /// fn main() {
    ///     let m = "ATTACKEAST";
    ///     let h = Hill::new(Matrix::new(3, 3, vec![2, 4, 5, 9, 2, 1, 3, 17, 7]));;
    ///
    ///     let c = h.encrypt(m).unwrap();
    ///     let padding = c.len() - m.len();
    ///
    ///     let p = h.decrypt(&c).unwrap();
    ///     assert_eq!(m, p[0..(p.len() - padding)].to_string());
    /// }
    /// ```
    ///
    fn decrypt(&self, ciphertext: &str) -> Result<String, &'static str> {
        /*
        The decryption process is very similar to the encryption process as explained in
        its function. However, the key is inverted in such way that performing a matrix
        multiplication on the character vector will result in the original unencrypted chars.

        For example, given the chunk [15, 5, 14] = ['P', 'F', 'O], and the inverse of the key
        `k`, `k^-1`. Decryption occurs like so:

            k^-1 * [15, 5, 14] mod 26 = [0, 19, 19] -> ['A', 'T', 'T'] decrypted characters

        This is repeated until all the 'chunks' of the message have been consumed/transformed.
        */
        let inverse_key = Hill::calc_inverse_key(self.key.clone().try_into().unwrap())?;

        Hill::transform_message(&inverse_key, ciphertext)
    }
}

impl Hill {
    /// Initialise a Hill cipher given a phrase.
    ///
    /// The position of each character within the alphabet is used to construct the
    /// matrix key of the cipher. The variable `chunk_size` defines how many chars (or chunks)
    /// of a message will be transposed during encryption/decryption.
    ///
    ///
    /// # Panics
    /// * The `chunk_size` is less than 2
    /// * The square of `chunk_size` is not equal to the phrase length
    /// * The phrase contains non-alphabetic symbols
    /// * Any of the Err conditions as stipulated by the `new()` fn
    ///
    /// # Example
    ///
    /// ```
    /// use cipher_crypt::{Cipher, Hill};
    ///
    /// let h = Hill::from_phrase("CEFJCBDRH", 3);
    /// h.encrypt("thing");
    /// ```
    ///
    pub fn from_phrase(phrase: &str, chunk_size: usize) -> Hill {
        if chunk_size < 2 {
            panic!("The chunk size must be greater than 1.");
        }

        if chunk_size * chunk_size != phrase.len() {
            panic!("The square of the chunk size must equal the length of the phrase.");
        }

        if !alphabet::STANDARD.is_valid(phrase) {
            panic!("Phrase cannot contain non-alphabetic symbols.");
        }

        let matrix: Vec<isize> = phrase
            .chars()
            .map(|c| alphabet::STANDARD.find_position(c).unwrap() as isize)
            .collect();

        Hill::new(Matrix::new(chunk_size, chunk_size, matrix))
    }

    /// Core logic of the hill cipher. Transposing messages with matrices
    ///
    fn transform_message(key: &Matrix<f64>, message: &str) -> Result<String, &'static str> {
        //Only allow chars in the alphabet (no whitespace or symbols)
        if !alphabet::STANDARD.is_valid(message) {
            return Err("Message cannot contain non-alphabetic symbols.");
        }

        let mut transformed_message = String::new();
        let mut buffer = message.to_string();
        let chunk_size = key.rows();

        //The message is processed/transposed in multiples of the matrix size, therefore
        //the message length must be a multiple of this value. If not, add extra padding to make
        //it so.
        if buffer.len() % chunk_size > 0 {
            let padding = chunk_size - (buffer.len() % chunk_size);
            for _ in 0..padding {
                buffer.push('a');
            }
        }

        //For each set of chunks in the message, transform based on the key.
        let mut i = 0;
        while i < buffer.len() {
            match Hill::transform_chunk(key, &buffer[i..(i + chunk_size)]) {
                Ok(s) => transformed_message.push_str(&s),
                Err(e) => return Err(e),
            }

            i += chunk_size;
        }

        //Return the transformed message - this may have extra padding appended
        Ok(transformed_message)
    }

    /// Transforming a chunk of the message, whose length is determined by the size of the matrix
    ///
    fn transform_chunk(key: &Matrix<f64>, chunk: &str) -> Result<String, &'static str> {
        let mut transformed = String::new();

        if !alphabet::STANDARD.is_valid(chunk) {
            panic!("Chunk contains a non-alphabetic symbol.");
        }

        if key.rows() != chunk.len() {
            return Err("Cannot perform transformation on unequal vector lengths");
        }

        //Find the integer representation of the characters
        //e.g. ['A', 'T', 'T'] -> [0, 19, 19]
        let index_representation: Vec<f64> = chunk
            .chars()
            .map(|c| alphabet::STANDARD.find_position(c).unwrap() as f64)
            .collect();

        //Perform the transformation `k * [0, 19, 19] mod 26`
        let mut product = key * Matrix::new(index_representation.len(), 1, index_representation);
        product = product.apply(&|x| (x % 26.0).round());

        //Convert the transformed indices back into characters of the alphabet
        for (i, pos) in product.iter().enumerate() {
            let orig = chunk
                .chars()
                .nth(i)
                .expect("Expected to find char at index.");

            transformed.push(alphabet::STANDARD.get_letter(*pos as usize, orig.is_uppercase()));
        }

        Ok(transformed)
    }

    /// Calculates the inverse key for decryption
    ///
    fn calc_inverse_key(key: Matrix<f64>) -> Result<Matrix<f64>, &'static str> {
        let det = key.clone().det();

        //Find the inverse determinant such that: d*d^-1 = 1 mod 26
        if let Some(det_inv) = alphabet::STANDARD.multiplicative_inverse(det as isize) {
            return Ok(key.inverse().unwrap().apply(&|x| {
                let y = (x * det as f64).round() as isize;
                (alphabet::STANDARD.modulo(y) as f64 * det_inv as f64) % 26.0
            }));
        }

        Err("Inverse for determinant could not be found.")
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn keygen_from_phrase() {
        Hill::from_phrase("CEFJCBDRH", 3);
    }

    #[test]
    #[should_panic]
    fn invalid_phrase() {
        Hill::from_phrase("killer", 2);
    }

    #[test]
    fn encrypt_no_padding_req() {
        let h = Hill::new(Matrix::new(3, 3, vec![2, 4, 5, 9, 2, 1, 3, 17, 7]));

        let m = "ATTACKatDAWN";
        assert_eq!(m, h.decrypt(&h.encrypt(m).unwrap()).unwrap());
    }

    #[test]
    fn encrypt_with_symbols() {
        let h = Hill::from_phrase("CEFJCBDRH", 3);
        assert!(h.encrypt("This won!t w@rk").is_err());
    }

    #[test]
    fn decrypt_with_symbols() {
        let h = Hill::from_phrase("CEFJCBDRH", 3);
        assert!(h.decrypt("This won!t w@rk").is_err());
    }

    #[test]
    fn encrypt_padding_req() {
        let h = Hill::new(Matrix::new(3, 3, vec![2, 4, 5, 9, 2, 1, 3, 17, 7]));
        let m = "ATTACKATDAWNz";

        let e = h.encrypt(m).unwrap();
        assert_eq!("PFOGOANPGXFXyrx", e);

        let d = h.decrypt(&e).unwrap();
        assert_eq!("ATTACKATDAWNzaa", d);
    }

    #[test]
    fn valid_key() {
        Hill::new(Matrix::new(3, 3, vec![2, 4, 5, 9, 2, 1, 3, 17, 7]));
    }

    #[test]
    #[should_panic]
    fn non_square_matrix() {
        //A 3 x 2 matrix
        Hill::new(Matrix::new(3, 2, vec![2, 4, 9, 2, 3, 17]));
    }

    #[test]
    #[should_panic]
    fn non_invertable_matrix() {
        Hill::new(Matrix::new(3, 3, vec![2, 2, 3, 6, 6, 9, 1, 4, 8]));
    }
}
