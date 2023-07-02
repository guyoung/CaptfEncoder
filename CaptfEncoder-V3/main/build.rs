#[cfg(windows)]
extern crate winresource;

fn main() {
    if std::env::var("CARGO_CFG_TARGET_OS").unwrap() == "windows" {
        let mut res = winresource::WindowsResource::new();
        res.set_icon("app.ico");
        res.compile().unwrap();
    }
}
