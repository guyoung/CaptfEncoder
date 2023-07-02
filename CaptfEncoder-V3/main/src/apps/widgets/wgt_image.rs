
use base64;
use fltk;
use image::{self, DynamicImage, GenericImageView};
use anyhow::Result;

#[derive(Debug)]
pub struct WgtImage {}

impl WgtImage {
    
    fn resize(img: &DynamicImage, max_width: u32, max_height: u32) -> DynamicImage {
        let (mut w, mut h) = img.dimensions();

        let w_ratio = (max_width as f64) / (w as f64);
        let h_ratio = (max_height as f64) / (h as f64);
        let mut ratio = 1.0;
        if max_width == 0 {
            if h_ratio < 1.0 {
                ratio = h_ratio;
            }
        } else if max_height == 0 {
            if w_ratio < 1.0 {
                ratio = w_ratio;
            }
        } else if w_ratio < 1.0 || h_ratio < 1.0 {
            if w_ratio <= h_ratio {
                ratio = w_ratio;
            } else {
                ratio = h_ratio;
            }
        }

        if ratio < 1.0 {
            w = ((w as f64) * ratio) as u32;
            h = ((h as f64) * ratio) as u32;
        }

        let img = img.resize(w, h, image::imageops::FilterType::Triangle);

        img
    }

    pub fn create_empty_image(width: u32, height: u32) -> Result<fltk::image::PngImage> {       
        let img = DynamicImage::new_rgba8(width, height);

        let mut buffer = vec![];
        img.write_to(&mut buffer, image::ImageOutputFormat::Png)?;
        let img: fltk::image::PngImage;

        img = fltk::image::PngImage::from_data(&buffer)?;

        Ok(img)
    }

    
    pub fn load_image_by_file(
        input: &str,
        max_width: u32,
        max_height: u32,
    ) -> Result<fltk::image::PngImage> {
        let img = image::open(input)?;

        let img = WgtImage::resize(&img, max_width, max_height);

        let mut buffer = vec![];
        img.write_to(&mut buffer, image::ImageOutputFormat::Png)?;
        let img: fltk::image::PngImage;

        img = fltk::image::PngImage::from_data(&buffer)?;

        Ok(img)
    }

    pub fn load_image_by_base64(
        input: &str,
        max_width: u32,
        max_height: u32,
    ) -> Result<fltk::image::PngImage> {
        let img_data = base64::decode(input)?;

        let img = image::load_from_memory(&img_data)?;

        let img = WgtImage::resize(&img, max_width, max_height);

        let mut buffer = vec![];
        img.write_to(&mut buffer, image::ImageOutputFormat::Png)?;
        let img: fltk::image::PngImage;

        img = fltk::image::PngImage::from_data(&buffer)?;

        Ok(img)
    }
}
