use super::TABLE;
use std::error::Error;

fn decode_digit(digit: u8, counter: &mut usize, chunk: &mut u32, result: &mut Vec<u8>) {
    let byte = digit - 33;

    *chunk += byte as u32 * TABLE[*counter];

    if *counter == 4 {
        result.extend_from_slice(&chunk.to_be_bytes());
        *chunk = 0;
        *counter = 0;
    } else {
        *counter += 1;
    }
}

pub fn decode(input: &str) -> Result<Vec<u8>, Box<dyn Error>> {
    let mut result = Vec::with_capacity(4 * (input.len() / 5 + 16));

    let mut counter = 0;
    let mut chunk = 0;

    for digit in input
        .trim_start()
        //.trim_start_matches("<~")
        .trim_end()
        //.trim_end_matches("~>")
        .bytes()
        .filter(|c| !c.is_ascii_whitespace())
    {
        if digit == b'z' {
            if counter == 0 {
                result.extend_from_slice(&[0, 0, 0, 0]);
            } else {
                return Err("Missaligned z in input".into());
            }
        }

        if digit < 33 || digit > 117 {
            return Err("Input char is out of range for Ascii85".into());
        }

        decode_digit(digit, &mut counter, &mut chunk, &mut result);
    }

    let mut to_remove = 0;

    while counter != 0 {
        decode_digit(b'u', &mut counter, &mut chunk, &mut result);
        to_remove += 1;
    }

    result.drain((result.len() - to_remove)..result.len());

    Ok(result)
}