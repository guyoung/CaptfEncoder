// https://rosettacode.org/wiki/MAC_Vendor_Lookup#Rust

extern crate reqwest;
 
use std::{thread, time};
 
fn get_vendor(mac: &str) -> Option<String> {
    let mut url = String::from("http://api.macvendors.com/");
    url.push_str(mac);
    let url_ref = &url;
    match reqwest::get(url_ref) {
        Ok(mut res) => match res.text() {
            Ok(text) => {
                if text.contains("Not Found") {
                    Some("N/A".to_string())
                } else {
                    Some(text)
                }
            }
            Err(e) => {
                println!("{:?}", e);
                None
            }
        },
        Err(e) => {
            println!("{:?}", e);
            None
        }
    }
}
 
fn main() {
    let duration = time::Duration::from_millis(1000);
    match get_vendor("88:53:2E:67:07:BE") {
        None => println!("Error!"),
        Some(text) => println!("{}", text),
    }
    thread::sleep(duration);
    match get_vendor("FC:FB:FB:01:FA:21") {
        None => println!("Error!"),
        Some(text) => println!("{}", text),
    }
    thread::sleep(duration);
    match get_vendor("FC-A1-3E") {
        None => println!("Error!"),
        Some(text) => println!("{}", text),
    }
    thread::sleep(duration);
    match get_vendor("abcdefg") {
        None => println!("Error!"),
        Some(text) => println!("{}", text),
    }
}