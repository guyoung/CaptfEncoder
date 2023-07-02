#![windows_subsystem = "windows"]

#[allow(dead_code)]

use fltk::{app, dialog};
use std::panic;

mod apps;

pub fn center() -> (i32, i32) {
    (
        (app::screen_size().0 / 2.0) as i32,
        (app::screen_size().1 / 2.0) as i32,
    )
}


#[tokio::main(flavor = "multi_thread")]
async fn main() {
    panic::set_hook(Box::new(|info| {
        if let Some(s) = info.payload().downcast_ref::<&str>() {
            dialog::message(center().0 - 200, center().1 - 100, s);
        } else {
            dialog::message(center().0 - 200, center().1 - 100, &info.to_string());
        }
    }));
    let mut bootstrap = apps::app::Bootstrap::new();

    bootstrap.start();
}
