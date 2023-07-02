use std::collections::HashMap;
use std::fmt::Write;

use super::internal::anyhow::Result;

use crate::MiscResult;

use super::internal::port_scan;

pub fn execute(input: &str, options: Option<HashMap<String, String>>) -> Result<MiscResult> {
    let mut timeout:u64 = 50;
    let mut thread:i32 = 100;
    let mut all_ports = false;


    if let Some(options) = options {      
        if let Some(val) = options.get("timeout") {
            timeout = val.parse()?;
        }

        if let Some(val) = options.get("thread") {
            thread = val.parse()?;

            if thread > 512 {
                thread = 512;
            }
        }

        if let Some(val) = options.get("ports") {
            if val == "All ports" {
                all_ports =  true;
            }
        }
    }
    


    let addr = input.parse()?;

    let result = port_scan::port_scan(addr, timeout, thread, all_ports)?;

    let mut out = String::new();

    writeln!(&mut out, "Scan time {} seconds", result.scan_time.as_secs())?;
    writeln!(&mut out, "Discover {} ports open", result.ports.len())?;
    writeln!(&mut out, "")?;

    for port_info in result.ports {
        writeln!(
            &mut out,
            "{} {} {:?}",
            result.ip_addr, port_info.port, port_info.status
        )?;
    }

    let result = MiscResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
