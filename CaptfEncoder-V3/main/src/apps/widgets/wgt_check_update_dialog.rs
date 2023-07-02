use std::str;
use std::thread;
use std::time::Duration;

use fltk::{
    app,
    button::*,
    enums::{Align, Color, FrameType},
    frame::*,
    group::*,
    image::*,
    misc::*,
    prelude::*,
    window::*,
};

use reqwest;
use reqwest::Client;

use serde_json;

use tokio;

use pollster;

use webbrowser;

use crate::apps::AssetRes;
use crate::apps::ConfigRes;

async fn get_remote() -> Result<serde_json::Value, Box<dyn std::error::Error>> {
    let client = Client::builder()
        .timeout(Duration::from_secs(10))
        .danger_accept_invalid_certs(true)
        .build()?;

    let res = client
        .get("https://raw.githubusercontent.com/guyoung/CaptfEncoder/master/product.json")
        .send()
        .await?;

    let text = res.text().await?;

    let content: serde_json::Value = serde_json::from_str(text.as_str())?;

    Ok(content)
}

pub struct WgtCheckUpdateDialog {}

impl WgtCheckUpdateDialog {
    pub fn new() -> Self {
        WgtCheckUpdateDialog {}
    }

    pub fn show(&self) {
        let local_product_data = ConfigRes::get("product.json").unwrap();
        let local_product_data =
            str::from_utf8(local_product_data.data.as_ref()).unwrap_or_default();
        let local_product_data: serde_json::Value =
            serde_json::from_str(local_product_data).unwrap_or_default();

        let mut dialog = Window::default().with_size(400, 300).center_screen();
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
        let mut frame = Frame::new(10, 10, 360, 20, "Check Update");
        frame.set_align(Align::Inside | Align::Left);
        frame.set_label_size(18);
        frame.set_label_color(Color::from_hex(0x2c2c2c));
        grp.end();

        let pack = Pack::new(30, 60, 360, 260, "");

        let mut frame = Frame::new(5, 60, 350, 40, "");
        frame.set_align(Align::Inside | Align::Left);
        frame.set_label("CaptfEncoder V3");
        frame.set_label_size(28);
        let mut frame = Frame::new(5, 100, 350, 40, "");
        frame.set_align(Align::Inside | Align::Left);                        
        frame.set_label("A rapid cross platform network security toolkit");
        frame.set_label_size(15);
        let _frame = Frame::new(5, 140, 350, 20, "");
        let mut progress = Progress::new(5, 100, 400, 20, "");
        progress.set_align(Align::Inside | Align::Left);
        progress.set_selection_color(Color::Blue);
        progress.set_minimum(0.0);
        progress.set_maximum(100.0);
        let mut frame = Frame::new(5, 160, 350, 50, "");
        frame.set_align(Align::Inside | Align::Left);
        frame.set_label_size(15);
        frame.hide();
        let mut btn = Button::new(50, 220, 200, 25, "");
        btn.set_label("Download new version");
        btn.hide();
       
        btn.set_callback(|_| {
            if let Err(_) = webbrowser::open("https://github.com/guyoung/CaptfEncoder/releasesr") {}
        });

        pack.end();

        dialog.end();

        dialog.show();

        let thread_progress = tokio::task::spawn_blocking({
            let mut progress2 = progress.clone();
            move || loop {
                thread::sleep(Duration::from_millis(100));
                progress2.set_value(progress2.value() + 1.0);
            }
        });

        thread_progress.abort();

        tokio::task::spawn_blocking({
            let mut frame2 = frame.clone();
            let mut btn2 = btn.clone();
            let mut progress2 = progress.clone();
            let local_version = local_product_data["productVersions"][0]["version"].clone();
            let local_version_number =
                local_product_data["productVersions"][0]["versionNumber"].clone();
            let local_version_number: u64 = local_version_number.as_u64().unwrap_or_default();
            move || {
                let remote = pollster::block_on(get_remote());

                match remote {
                    Ok(remote_product_data) => {
                        let remote_version = &remote_product_data["productVersions"][0]["version"];
                        let remote_version_number =
                            &remote_product_data["productVersions"][0]["versionNumber"];
                        let remote_version_number =
                            remote_version_number.as_u64().unwrap_or_default();

                        if remote_version_number > local_version_number {
                            let label = format!(
                                "Current version: {} New version: {}",
                                local_version, remote_version
                            )
                            .replace("\"", "");
                            frame2.set_label(label.as_str());
                            frame2.show();
                            btn2.show();
                        } else {
                            let label = format!(
                                "Current version: {}\nNo updates are currently available!",
                                local_version
                            )
                            .replace("\"", "");
                            frame2.set_label(label.as_str());
                            frame2.show();
                        }
                    }
                    Err(_) => {
                        let label = format!(
                            "Current version: {}\nNo updates are currently available!",
                            local_version
                        )
                        .replace("\"", "");
                        frame2.set_label(label.as_str());
                        frame2.show();                     
                    }
                }

                thread_progress.abort();
                progress2.hide();
            }
        });

        while dialog.shown() {
            let _ = app::wait();
        }
    }
}
