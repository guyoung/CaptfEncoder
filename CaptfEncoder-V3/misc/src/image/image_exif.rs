use std::collections::HashMap;
use std::fmt::Write;
use std::fs::File;


use super::internal::anyhow::Result;

use super::internal::exif;

use crate::MiscResult;

pub fn execute(input: &str, _options: Option<HashMap<String, String>>) -> Result<MiscResult> {
    let file = File::open(input)?;

    let mut bufreader = std::io::BufReader::new(&file);
    let exifreader = exif::Reader::new();
    let exif = exifreader.read_from_container(&mut bufreader)?;

    let mut out = String::new();

    for f in exif.fields() {
        writeln!(
            &mut out,
            "{} {} {}",
            f.tag,
            f.ifd_num,
            f.display_value().with_unit(&exif)
        )?;
    }

    let result = MiscResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
