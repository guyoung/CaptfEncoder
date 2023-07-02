use std::collections::HashMap;
use std::fmt::Write;

use super::internal::anyhow::Result;
use super::internal::anyhow::*;

use super::internal::bardecoder;
use super::internal::image;

use crate::MiscResult;

pub fn execute(input: &str, _options: Option<HashMap<String, String>>) -> Result<MiscResult> {
    let img = image::open(input)?;
    let decoder = bardecoder::default_decoder();

    let results = decoder.decode(&img);

    let mut out = String::new();

    for result in results {
        let result = result.or_else(|e| Err(anyhow!("{:?}", e)))?;
        writeln!(&mut out, "{}", result)?;
    }

    let result = MiscResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
