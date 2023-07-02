// https://rosettacode.org/wiki/Extract_file_extension#Rust

use std::path::Path;
 
fn main() {
    let filenames = &[
        "http://example.com/download.tar.gz",
        "CharacterModel.3DS",
        ".desktop",
        "document",
        "document.txt_backup",
        "/etc/pam.d/login",
    ];
 
    for filename in filenames {
        println!(
            "{:34} | {:8} | {:?}",
            filename,
            extension(filename),
            Path::new(filename).extension()
        );
    }
}
 
fn extension(filename: &str) -> &str {
    filename
        .rfind('.')
        .map(|idx| &filename[idx..])
        .filter(|ext| ext.chars().skip(1).all(|c| c.is_ascii_alphanumeric()))
        .unwrap_or("")
}