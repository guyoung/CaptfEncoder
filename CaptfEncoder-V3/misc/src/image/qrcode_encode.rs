use std::collections::HashMap;

use super::internal::anyhow::Result;

use super::internal::base64;
use super::internal::image;
use super::internal::qrcode;

use crate::MiscResult;

pub fn execute(input: &str, _options: Option<HashMap<String, String>>) -> Result<MiscResult> {
      
    let res = qrcode::QrCode::new(input.as_bytes())?;

    let img_buffer = res.render::<image::Luma<u8>>().build();

    let img = image::DynamicImage::ImageLuma8(img_buffer);

    let mut buffer = vec![];
    img.write_to(&mut buffer, image::ImageOutputFormat::Png)?;

    let out = base64::encode(&buffer);

    let result = MiscResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
