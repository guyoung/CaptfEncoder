use super::TABLE;
use std::borrow::Cow;
use std::convert::TryInto;

pub fn encode(input: &[u8]) -> String {
    let mut result = String::with_capacity(5 * (input.len() / 4 + 16));

    //result.push_str("<~");

    for chunk in input.chunks(4) {
        let (chunk, count) = if chunk.len() == 4 {
            (Cow::from(chunk), 5)
        } else {
            let mut new_chunk = Vec::new();
            new_chunk.resize_with(4, || 0);
            new_chunk[..chunk.len()].copy_from_slice(chunk);
            (Cow::from(new_chunk), 5 - (4 - chunk.len()))
        };

        let number = u32::from_be_bytes(chunk.as_ref().try_into().expect("Internal Error"));

        for i in 0..count {
            let digit = (((number / TABLE[i]) % 85) + 33) as u8;
            result.push(digit as char);
        }
    }

    //result.push_str("~>");

    result
}
