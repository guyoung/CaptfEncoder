use std::collections::HashMap;
use std::fs::File;
use std::io::Read;

use super::internal::anyhow::Result;
use super::internal::base64;
use crate::file::file_format::FileFormat;

use crate::MiscResult;

pub fn execute(input: &str, _options: Option<HashMap<String, String>>) -> Result<MiscResult> {
    let mut file = File::open(input)?;
    let mut vec = Vec::new();
    let _ = file.read_to_end(&mut vec);

    let mut len = vec.len();

    if len > 36870 {
        len = 36780;
    }
    let vec2 = &(vec.clone())[0..len];
    let base64_str = base64::encode(vec);

    let file_format = FileFormat::from_bytes(vec2);

    let out = format!("data:{};base64,{}", file_format.media_type(), base64_str);
    let result = MiscResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
