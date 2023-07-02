// https://github.com/mcarton/rust-punycode

//! Fonctions to decode and encode [RFC-3492 Punycode](https://tools.ietf.org/html/rfc3492).

// See [RFC-3492, section 4](https://tools.ietf.org/html/rfc3492#section-4).
const BASE: u32 = 36;
const TMIN: u32 = 1;
const TMAX: u32 = 26;
const SKEW: u32 = 38;
const DAMP: u32 = 700;
const INITIAL_BIAS: u32 = 72;
const INITIAL_N: u32 = 128;
const DELIMITER: char = '-';

/// Decode the string as Punycode. The string should not contain the initial `xn--` and must
/// contain only ASCII characters.
/// # Example
/// ```
/// assert_eq!(
///     punycode::decode("acadmie-franaise-npb1a").unwrap(),
///     "académie-française"
/// );
/// ```
pub fn decode(input: &str) -> Result<String, ()> {
    if !input.is_ascii() {
        return Err(());
    }

    let mut n = INITIAL_N;
    let mut i = 0;
    let mut bias = INITIAL_BIAS;

    let (mut output, input) = if let Some(i) = input.rfind(DELIMITER) {
        (input[0..i].chars().collect(), &input[i + 1..])
    } else {
        (vec![], &input[..])
    };

    let mut it = input.chars().peekable();
    while it.peek() != None {
        let oldi = i;
        let mut w = 1;

        for k in 1.. {
            let c = if let Some(c) = it.next() {
                c
            } else {
                return Err(());
            };

            let k = k * BASE;

            let digit = decode_digit(c);

            if digit == BASE {
                return Err(());
            }

            // overflow check
            if digit > (std::u32::MAX - i) / w {
                return Err(());
            }
            i += digit * w;

            let t = clamped_sub(TMIN, k, bias, TMAX);
            if digit < t {
                break;
            }

            // overflow check
            if BASE > (std::u32::MAX - t) / w {
                return Err(());
            }
            w *= BASE - t;
        }

        let len = (output.len() + 1) as u32;
        bias = adapt(i - oldi, len, oldi == 0);

        let il = i / len;
        // overflow check
        if n > std::u32::MAX - il {
            return Err(());
        }
        n += il;
        i %= len;

        if let Some(c) = std::char::from_u32(n) {
            output.insert(i as usize, c);
        } else {
            return Err(());
        }

        i += 1;
    }

    Ok(output.iter().cloned().collect())
}

/// Encode a string as punycode. The result string will contain only ASCII characters. The result
/// string does not start with `xn--`.
/// # Example
/// ```
/// assert_eq!(
///     punycode::encode("académie-française").unwrap(),
///     "acadmie-franaise-npb1a"
/// );
/// ```
pub fn encode(input: &str) -> Result<String, ()> {
    encode_slice(&input.chars().collect::<Vec<char>>())
}

fn encode_slice(input: &[char]) -> Result<String, ()> {
    let mut n = INITIAL_N;
    let mut delta = 0;
    let mut bias = INITIAL_BIAS;

    let mut output: String = input.iter().filter(|&&c| c.is_ascii()).cloned().collect();
    let mut h = output.len() as u32;
    let b = h;

    if b > 0 {
        output.push(DELIMITER)
    }

    while h < input.len() as u32 {
        let m = *input.iter().filter(|&&c| (c as u32) >= n).min().unwrap() as u32;

        if m - n > (std::u32::MAX - delta) / (h + 1) {
            return Err(());
        }
        delta += (m - n) * (h + 1);

        n = m;

        for c in input {
            let c = *c as u32;
            if c < n {
                delta += 1;
            } else if c == n {
                let mut q = delta;

                for k in 1.. {
                    let k = k * BASE;

                    let t = clamped_sub(TMIN, k, bias, TMAX);

                    if q < t {
                        break;
                    }

                    output.push(encode_digit(t + (q - t) % (BASE - t)));

                    q = (q - t) / (BASE - t);
                }

                output.push(encode_digit(q));

                bias = adapt(delta, h + 1, h == b);
                delta = 0;
                h += 1;
            }
        }

        delta += 1;
        n += 1;
    }

    Ok(output)
}

fn adapt(delta: u32, numpoint: u32, firsttime: bool) -> u32 {
    let mut delta = if firsttime { delta / DAMP } else { delta / 2 };

    delta += delta / numpoint;
    let mut k = 0;

    while delta > (BASE - TMIN) * TMAX / 2 {
        delta /= BASE - TMIN;
        k += BASE
    }

    k + (BASE - TMIN + 1) * delta / (delta + SKEW)
}

/// Compute `lhs-rhs`. Result will be clamped in [min, max].
fn clamped_sub<T>(min: T, lhs: T, rhs: T, max: T) -> T
where
    T: Ord + std::ops::Add<Output = T> + std::ops::Sub<Output = T> + Copy,
{
    if min + rhs >= lhs {
        min
    } else if max + rhs <= lhs {
        max
    } else {
        lhs - rhs
    }
}

fn decode_digit(c: char) -> u32 {
    let cp = c as u32;

    match c {
        '0'..='9' => cp - ('0' as u32) + 26,
        'A'..='Z' => cp - ('A' as u32),
        'a'..='z' => cp - ('a' as u32),
        _ => BASE,
    }
}

fn encode_digit(d: u32) -> char {
    let r = (d + 22 + (if d < 26 { 75 } else { 0 })) as u8 as char;

    assert!(
        ('0' <= r && r <= '9') || ('a' <= r && r <= 'z'),
        "r = {}",
        r
    );

    r
}
