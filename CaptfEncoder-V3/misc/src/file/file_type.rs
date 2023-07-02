use std::collections::HashMap;
use std::fmt::Write;
use std::fs::File;
use std::io::Read;

use super::internal::anyhow::Result;

use super::internal::file_format::FileFormat;

use crate::MiscResult;

pub fn execute(input: &str, _options: Option<HashMap<String, String>>) -> Result<MiscResult> {
    /// Maximum number of bytes to read to detect the `FileFormat`.
    const MAX_BYTES: u64 = 36870;
    let mut buffer = [0; MAX_BYTES as usize];

    let read = File::open(input)?.take(MAX_BYTES).read(&mut buffer)?;

    let res = FileFormat::from_bytes(&buffer[0..read]);

    let mut out = String::new();

    writeln!(&mut out, "Media type: {}", res.media_type())?;
    writeln!(&mut out, "Extension: {}", res.extension())?;

    let result = MiscResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
