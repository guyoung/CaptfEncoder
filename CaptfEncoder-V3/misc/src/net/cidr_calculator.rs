use std::collections::HashMap;
use std::fmt::Write;
use std::str::FromStr;

use super::internal::anyhow::Result;

use crate::MiscResult;

use super::internal::cidr::{Cidr, Ipv4Cidr};

pub fn execute(input: &str, _options: Option<HashMap<String, String>>) -> Result<MiscResult> {
    let cidr = Ipv4Cidr::from_str(input)?;

    let mut out = String::new();

    if cidr.size() > 2 {
        writeln!(&mut out, "Available address length: {}", cidr.size() - 2)?;
        writeln!(&mut out, "Start address: {:?}", cidr.iter().nth(1).unwrap())?;
        writeln!(
            &mut out,
            "End address: {:?}",
            cidr.iter().nth(cidr.size() - 2).unwrap()
        )?;
    }

    writeln!(&mut out, "SubNet mask address: {:?}", cidr.netmask())?;
    writeln!(&mut out, "Network address: {:?}", cidr.network())?;
    writeln!(&mut out, "Broadcast address: {:?}", cidr.broadcast())?;

    let result = MiscResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
