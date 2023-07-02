// https://github.com/murtyjones/uuencode

pub fn uuencode(input: &[u8]) -> String {
    let mut output: Vec<u8> = Vec::new();
    for line in input.chunks(45) {
        let line_length = line.len() as u8 + 32;
        output.push(line_length);
        for c in line.chunks(3) {
            output.extend(uuencode_chuck(c).into_iter());
        }
        output.push(b'\n');
    }
    output.extend(b"`\n");


    String::from_utf8(output).unwrap()
}

pub fn uudecode(input: &str) -> String {

    let lines = input.lines();

    let mut output: Vec<u8> = Vec::new();

    for line in lines {
        if let Some(chr) = line.chars().nth(0) {
            match chr {
                '`' => break,
                ' '..='_' => {
                    let line = maybe_pad_line(line);
                    for dc in line[1..].as_bytes().chunks(4) {
                        output.extend( uudecode_chunk(dc) );
                    }
                },
                _ => break
            }
        }
    }

    String::from_utf8(output).unwrap()
}

/// Encodes a few bytes
fn uuencode_chuck(input: &[u8]) -> [u8; 4] {
    // padding is hard
    let i = [
        input[0],
        *input.get(1).unwrap_or(&0),
        *input.get(2).unwrap_or(&0),
    ];

    [
        32 + (i[0] >> 2),
        32 + ((i[0] << 6 | i[1] >> 2) >> 2),
        32 + ((i[1] << 4 | i[2] >> 4) >> 2),
        32 + ((i[2] << 2) >> 2),
    ]
}

/// Decodes a few bytes
fn uudecode_chunk(input: &[u8]) -> impl Iterator<Item = u8> {
    let combined: u32 = input.iter().enumerate().fold(0, |acc, (index, &val)| {
        acc + (((val as u32) - 32) << 6 * (3 - index))
    });

    (0..3).rev().map(move |val| {
        let val = (combined >> (8 * val)) & 255;
        val as u8
    })
}

/// Ensure that a line has sufficient padding
fn maybe_pad_line(line: &str) -> String {
    const REQUIRED_LENGTH: usize = 61;
    let actual_length = line.len();
    let diff = REQUIRED_LENGTH - actual_length;
    match diff {
        d if d <= 0 => String::from(line),
        _ => {
            let mut padded = String::from(line);
            for _i in 1..=diff {
                padded.push(' ');
            }
            return padded;
        }
    }
}
