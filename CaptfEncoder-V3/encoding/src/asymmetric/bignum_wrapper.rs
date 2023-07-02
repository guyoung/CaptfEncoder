use std::fmt::Write;

use super::internal::anyhow::Result;


use crate::ascii_string_from;
use crate::from_hex;

use super::bignum::Bignum;
use crate::EncodingResult;

fn from_str(s: &str) -> Result<Bignum> {
    if s.to_lowercase().starts_with("0x") {
        Bignum::form_str(&s[2..], 16)
    } else {
        Bignum::form_str(s, 10)
    }
}

pub fn bignum_convert_string(s: &str) -> Result<EncodingResult> {
    let mut a = from_str(s)?;

    let val = a.to_str(16)?;

    let val = from_hex(&val)?;

    let val = ascii_string_from(&val); 

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    Ok(result)
}

pub fn bignum_convert_string_utf8(s: &str) -> Result<EncodingResult> {
    let mut a = from_str(s)?;

    let mut val = a.to_str(16)?;

    if val.len() / 2 == 1 {
        val = "0".to_owned() + &val;
    }

    let val = from_hex(&val)?;
    let val = String::from_utf8_lossy(&val).to_string();

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    Ok(result)
}

pub fn bignum_convert_hex(s: &str) -> Result<EncodingResult> {
    let mut a = from_str(s)?;

    let val = a.to_str(16)?;

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    Ok(result)
}

pub fn bignum_add(a: &str, b: &str) -> Result<EncodingResult> {
    let a = from_str(a)?;
    let b = from_str(b)?;

    let val = (a + b).to_str(10)?;

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    Ok(result)
}

pub fn bignum_sub(a: &str, b: &str) -> Result<EncodingResult> {
    let a = from_str(a)?;
    let b = from_str(b)?;

    let val = (a - b).to_str(10)?;

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    Ok(result)
}

pub fn bignum_mul(a: &str, b: &str) -> Result<EncodingResult> {
    let a = from_str(a)?;
    let b = from_str(b)?;

    let val = (a * b).to_str(10)?;

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    Ok(result)
}

pub fn bignum_div(a: &str, b: &str) -> Result<EncodingResult> {
    let a = from_str(a)?;
    let b = from_str(b)?;

    let val = (a / b).to_str(10)?;

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };

    Ok(result)
}

pub fn bignum_mod(a: &str, b: &str) -> Result<EncodingResult> {
    let mut a = from_str(a)?;
    let b = from_str(b)?;

    let val = a.modulus(&b)?.to_str(10)?;

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    Ok(result)
}

pub fn bignum_invert(a: &str, b: &str) -> Result<EncodingResult> {
    let mut a = from_str(a)?;
    let b = from_str(b)?;

    let val = a.invert(&b);

    if let Some(val) = val {
        let result = EncodingResult {
            successed: true,
            val: val.clone().to_str(10)?,
            message: String::from(""),
        };
        Ok(result)
    } else {
        let result = EncodingResult {
            successed: true,
            val: String::from(""),
            message: String::from(""),
        };
        Ok(result)
    }
}

pub fn bignum_powm(a: &str, b: &str, c: &str) -> Result<EncodingResult> {
    let mut a = from_str(a)?;
    let b = from_str(b)?;
    let c = from_str(c)?;

    let val = a.powm(&b, &c).to_str(10)?;

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    Ok(result)
}

pub fn bignum_sqrt(a: &str) -> Result<EncodingResult> {
    let mut a = from_str(a)?;

    let val = a.sqrt().to_str(10)?;

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    Ok(result)
}

pub fn bignum_root(a: &str, n: u32) -> Result<EncodingResult> {
    let mut a = from_str(a)?;

    let val = a.root(n).to_str(10)?;

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    Ok(result)
}

pub fn bignum_gcd(a: &str, b: &str) -> Result<EncodingResult> {
    let mut a = from_str(a)?;
    let b = from_str(b)?;

    let val = a.gcd(&b).to_str(10)?;

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    Ok(result)
}

pub fn bignum_gcdext(a: &str, b: &str) -> Result<EncodingResult> {
    let mut a = from_str(a)?;
    let b = from_str(b)?;

    let (mut val1, mut val2, mut val3) = a.gcdext(&b);

    let mut out= String::new();

    write!(out, "{},{},{}", val1.to_str(10)?, val2.to_str(10)?,val3.to_str(10)?)?;

    let result = EncodingResult {
        successed: true,
        val: out,
        message: String::from(""),
    };
    Ok(result)
}



pub fn bignum_lcm(a: &str, b: &str) -> Result<EncodingResult> {
    let mut a = from_str(a)?;
    let b = from_str(b)?;

    let val = a.lcm(&b).to_str(10)?;

    let result = EncodingResult {
        successed: true,
        val: val,
        message: String::from(""),
    };
    Ok(result)
}