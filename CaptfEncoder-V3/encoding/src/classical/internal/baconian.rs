use super::regex::{Captures, Regex};
use super::binary_to_char;

/// Baconian Cipher
///
/// The struct is generated through the new() function.
///
pub struct Baconian {
    distinct: bool,
}

impl Baconian {
    /// Initializes a rail fence cipher with a supplied height.
    ///
    /// # Examples
    ///
    /// ```
    /// use kryptos::ciphers::baconian::Baconian;
    ///
    /// let b = Baconian::new(true).unwrap();
    /// ```
    ///
    pub fn new(distinct: bool) -> Result<Self, String> {
        Ok(Baconian { distinct })
    }

    /// Enciphers a message with a baconian cipher.
    ///
    /// # Examples
    ///
    /// ```
    /// use kryptos::ciphers::baconian::Baconian;
    ///
    /// let b = Baconian::new(true).unwrap();
    /// assert_eq!("ABBAABABAABAABABAABB AAAABAABAA ABABAAABAAABBBBBAABB AAAAA BAABAAABAAAAABABAAABAABAABAABB", b.encipher("Must be kept a secret").unwrap());
    /// ```
    ///
    pub fn encipher(&self, plaintext: &str) -> Result<String, String> {
        if self.distinct {
            return Ok(self.distinct_encipher(plaintext).unwrap());
        }
        Ok(String::from(plaintext))
    }

    /// Deciphers a message with a baconian cipher.
    ///
    /// # Examples
    ///
    /// ```
    /// use kryptos::ciphers::baconian::Baconian;
    ///
    /// let b = Baconian::new(true).unwrap();
    /// assert_eq!("MUST BE KEPT A SECRET", b.decipher("ABBAABABAABAABABAABB AAAABAABAA ABABAAABAAABBBBBAABB AAAAA BAABAAABAAAAABABAAABAABAABAABB").unwrap());
    /// ```
    ///
    pub fn decipher(&self, ciphertext: &str) -> Result<String, String> {
        let binary = ciphertext
            .chars()
            .map(|c| match c {
                'A' => '0',
                'B' => '1',
                _ => c,
            })
            .collect::<String>();

        let re = Regex::new(r"[01]{5}").unwrap();
        let result = re.replace_all(&binary, |caps: &Captures| {
            format!("{}", binary_to_char(&caps[0]).unwrap())
        });

        Ok(result.to_string())
    }

    // Encipher the text using the distinct method.
    fn distinct_encipher(&self, plaintext: &str) -> Result<String, String> {
        let binary = plaintext
            .chars()
            .map(|c| match c as u8 {
                65..=90 => format!("{:05b}", c as u8 - 65),
                97..=122 => format!("{:05b}", c as u8 - 97),
                _ => c.to_string(),
            })
            .collect::<String>();

        Ok(binary
            .chars()
            .map(|c| match c {
                '0' => 'A',
                '1' => 'B',
                _ => c,
            })
            .collect::<String>())
    }
}
