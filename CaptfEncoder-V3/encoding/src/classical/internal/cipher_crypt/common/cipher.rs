pub trait Cipher {
    type Key;
    type Algorithm;

    /// Initialise a cipher given a specific `key`.
    ///
    fn new(key: Self::Key) -> Self::Algorithm;

    /// Encrypt a `message` using a cipher's algorithm.
    ///
    fn encrypt(&self, message: &str) -> Result<String, &'static str>;

    /// Decrypt a `message` using a cipher's algorithm.
    ///
    fn decrypt(&self, message: &str) -> Result<String, &'static str>;
}
