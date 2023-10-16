use std::str;

use fltk::{
    app,
    button::*,
    enums::{Align, Color, FrameType},
    frame::*,
    group::*,
    image::*,
    prelude::*,
    window::*,
};

use serde_json;

use crate::apps::AssetRes;
use crate::apps::ConfigRes;

pub struct WgtAboutDialog {}

impl WgtAboutDialog {
    pub fn new() -> Self {
        WgtAboutDialog {}
    }

    pub fn show(&self) {
        let product_data = ConfigRes::get("product.json").unwrap();
        let product_data = str::from_utf8(product_data.data.as_ref()).unwrap_or_default();
        let product_data: serde_json::Value =
            serde_json::from_str(product_data).unwrap_or_default();


        let mut dialog = Window::default().with_size(400, 240).center_screen();
        dialog.make_resizable(false);
        dialog.make_modal(true);
        dialog.set_border(false);

        let mut grp = Group::new(0, 0, 400, 40, "");
        grp.set_frame(FrameType::FlatBox);
        grp.set_color(Color::from_rgb(255, 255, 255));
        let mut btn = Button::new(360, 10, 40, 40, "");
        let image_cl = AssetRes::get("icon/close_main-2.svg").unwrap();
        let image_cl = str::from_utf8(image_cl.data.as_ref()).unwrap();
        let mut image_cl = SvgImage::from_data(image_cl).unwrap();
        image_cl.scale(16, 16, true, true);
        btn.set_image(Some(image_cl));
        btn.set_frame(FrameType::NoBox);
        btn.set_callback({
            let mut win2 = dialog.clone();
            move |_| {
                win2.hide();
            }
        });
        let mut frame = Frame::new(10, 10, 360, 20, "About CaptfEncoder");
        frame.set_align(Align::Inside | Align::Left);
        frame.set_label_size(18);
        frame.set_label_color(Color::from_hex(0x2c2c2c));
        grp.end();

        let pack = Pack::new(30, 60, 360, 240, "");

        let mut frame = Frame::new(5, 60, 350, 40, "");
        frame.set_align(Align::Inside | Align::Left);
        frame.set_label("CaptfEncoder V3");
        frame.set_label_size(28);
        let mut frame = Frame::new(5, 100, 350, 40, "");
        frame.set_align(Align::Inside | Align::Left);
        frame.set_label("A opensource rapid cross platform network security toolkit");
        frame.set_label_size(15);
        let _frame = Frame::new(5, 140, 350, 20, "");
        let mut frame = Frame::new(5, 160, 350, 25, "");
        frame.set_align(Align::Inside | Align::Left);
        frame.set_label(
            format!("Version: {}", product_data["productVersions"][0]["version"])
                .replace("\"", "")
                .as_str(),
        );
        frame.set_label_size(16);
        let mut frame = Frame::new(5, 185, 350, 25, "");
        frame.set_align(Align::Inside | Align::Left);
        frame.set_label(
            format!(
                "Build date: {}",
                product_data["productVersions"][0]["builddate"]
            )
            .replace("\"", "")
            .as_str(),
        );
        frame.set_label_size(16);
        pack.end();

        dialog.end();

        dialog.show();

        while dialog.shown() {
            let _ = app::wait();
        }
    }
}
