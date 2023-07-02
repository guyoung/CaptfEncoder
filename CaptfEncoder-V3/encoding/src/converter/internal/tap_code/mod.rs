use std::str::FromStr;

use super::num::FromPrimitive;

use anyhow::{anyhow, Result};

enum_from_primitive! {
    #[derive(Debug, PartialEq)]
    enum TapCode {
        A=11,
        B=12,
        C=13,
        D=14,
        E=15,
        F=21,
        G=22,
        H=23,
        I=24,
        J=25,
        L=31,
        M=32,
        N=33,
        O=34,
        P=35,
        Q=41,
        R=42,
        S=43,
        T=44,
        U=45,
        V=51,
        W=52,
        X=53,
        Y=54,
        Z=55
    }
}

impl FromStr for TapCode {
    type Err = ();

    fn from_str(input: &str) -> Result<TapCode, Self::Err> {
        match input {
            "A" => Ok(TapCode::A),
            "B" => Ok(TapCode::B),
            "C" => Ok(TapCode::C),
            "D" => Ok(TapCode::D),
            "E" => Ok(TapCode::E),
            "F" => Ok(TapCode::F),
            "G" => Ok(TapCode::G),
            "H" => Ok(TapCode::H),
            "I" => Ok(TapCode::I),
            "J" => Ok(TapCode::J),
            "L" => Ok(TapCode::L),
            "M" => Ok(TapCode::M),
            "N" => Ok(TapCode::N),
            "O" => Ok(TapCode::O),
            "P" => Ok(TapCode::P),
            "Q" => Ok(TapCode::Q),
            "R" => Ok(TapCode::R),
            "S" => Ok(TapCode::S),
            "T" => Ok(TapCode::T),
            "U" => Ok(TapCode::U),
            "V" => Ok(TapCode::V),
            "W" => Ok(TapCode::W),
            "X" => Ok(TapCode::X),
            "Y" => Ok(TapCode::Y),
            "Z" => Ok(TapCode::Z),
            _ => Err(()),
        }
    }
}

pub fn encode(input: &str, delimiter: &str) -> String {
    let mut result: Vec<String> = Vec::new();

    for c in input.chars() {
        let code = TapCode::from_str(c.to_string().to_uppercase().as_str());

        if let Ok(code) = code {
            result.push((code as u32).to_string());
        }
    }

    result.join(delimiter)

}

pub fn decode(input: &str, delimiter: &str) -> Result<String> {
    let arr = input.split(delimiter);

    let mut result: Vec<String> = Vec::new();

    for i in arr {
        let i:u32 = i.parse().or_else(|e| Err(anyhow!("{:?}", e)))?;

        let code = TapCode::from_u32(i);

        if let Some(code) = code {
            result.push(format!("{:?}", code));
        }        
    }

    Ok(result.join(""))

}
