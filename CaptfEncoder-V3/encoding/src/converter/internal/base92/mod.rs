use super::anyhow::Result;
use super::anyhow::*;

fn base92_chr(val: u32) -> Result<String> {
    if val >= 91 {
        return Err(anyhow!("val must be in [0, 91]"));
    }
    if val == 0 {
        return Ok("!".to_string());
    } else if val <= 61 {
        let c = char::from_u32(('#' as u32) + val - 1);
        return Ok(format!("{}", c.unwrap()));
    } else {
        let c = char::from_u32(('a' as u32) + val - 62);
        return Ok(format!("{}", c.unwrap()));
    }
}

fn base92_ord(val: char) -> Result<u32> {
    let num = val as u32;
    if val == '!' {
        return Ok(0);
    } else if '#' as u32 <= num && num <= '_' as u32 {
        return Ok(num - '#' as u32 + 1);
    } else if 'a' as u32 <= num && num <= '}' as u32 {
        return Ok(num - 'a' as u32 + 62);
    } else {
        return Err(anyhow!("val is not a base92 character"));
    }
}

pub fn base92_encode(input: &str) -> Result<String> {
    let mut input = input.to_string();

    if input.is_empty() {
        return Ok("~".to_string());
    }

    let mut bitstr = String::new();

    while bitstr.len() < 13 && !input.is_empty() {
        bitstr.push_str(&format!("{:08b}", input.chars().nth(0).unwrap() as u32));

        input = input[1..].to_string();
    }

    let mut resstr = String::new();

    while bitstr.len() > 13 || !input.is_empty() {
        let i: u32 = u32::from_str_radix(&bitstr[..13], 2)?;

        resstr.push_str(&base92_chr((i / 91) as u32)?);

        resstr.push_str(&base92_chr((i % 91) as u32)?);

        bitstr = bitstr[13..].to_string();

        while bitstr.len() < 13 && !input.is_empty() {
            bitstr.push_str(&format!("{:08b}", input.chars().nth(0).unwrap() as u32));
            input = input[1..].to_string();
        }
    }

    if !bitstr.is_empty() {
        if bitstr.len() < 7 {
            let end = (6 - bitstr.len()) as usize;
            for _n in 0..end {
                bitstr.push_str("0");
            }
            let i: u32 = u32::from_str_radix(&bitstr, 2)?;
            resstr.push_str(&base92_chr(i)?);
        } else {
            let end = (13 - bitstr.len()) as usize;
            for _n in 0..end {
                bitstr.push_str("0");
            }
            let i: u32 = u32::from_str_radix(&bitstr, 2)?;
            resstr.push_str(&base92_chr((i / 91) as u32)?);
            resstr.push_str(&base92_chr((i % 91) as u32)?);
        }
    }

    Ok(resstr)
}

pub fn base92_decode(input: &str) -> Result<String> {
    if input == "~" {
        return Ok("".to_string());
    }

    let mut bitstr = String::new();
    let mut resstr = String::new();

    for n in 0..input.len() / 2 {
        let c1 = input.chars().nth(n * 2).unwrap();
        let c1 = base92_ord(c1)?;
        let c2 = input.chars().nth(n * 2 + 1).unwrap();
        let c2 = base92_ord(c2)?;

        let x = c1 * 91 + c2;

        bitstr.push_str(&format!("{:013b}", x));

        while 8 <= bitstr.len() {
            let i = u8::from_str_radix(&bitstr[0..8], 2).unwrap();
            resstr.push_str(&format!("{}", i as char));
            bitstr = bitstr[8..].to_string();
        }
    }

    if input.len() % 2 == 1 {
        let x = base92_ord(input.chars().last().unwrap())?;
        bitstr.push_str(&format!("{:06b}", x));
        while 8 <= bitstr.len() {
            let i = u8::from_str_radix(&bitstr[0..8], 2).unwrap();
            resstr.push_str(&format!("{}", i as char));
            bitstr = bitstr[8..].to_string();
        }
    }

    Ok(resstr)
}
