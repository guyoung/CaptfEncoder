// https://rosettacode.org/wiki/UTF-8_encode_and_decode#Rust
// UTF-8 encode and decode

fn main() {
    let chars = vec!('A', 'ö', 'Ж', '€', '𝄞');
    chars.iter().for_each(|c| {
        let mut encoded = vec![0; c.len_utf8()];
        c.encode_utf8(&mut encoded);
        let decoded = String::from_utf8(encoded.to_vec()).unwrap();
        let encoded_string = encoded.iter().fold(String::new(), |acc, val| format!("{}{:X}", acc, val));
        println!("Character: {}, Unicode:{}, UTF-8 encoded:{}, Decoded: {}", c, c.escape_unicode(), encoded_string , decoded);
    });
}