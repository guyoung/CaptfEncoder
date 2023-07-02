use std::collections::HashMap;
use std::fmt::Write;
use std::time::Duration;

use super::internal::anyhow::Result;
use super::internal::rand;

use crate::MiscResult;

use super::internal::ping;

pub fn execute(input: &str, _options: Option<HashMap<String, String>>) -> Result<MiscResult> {
    let addr = input.parse()?;

    let ping = ping::Ping::new(addr)?;

    let ident = rand::random::<u16>();
    let seq = 1;
    let size = 1024;

    let result = ping.ping(ident, seq, size, Duration::from_secs(5))?;

    let (reply, duration) = result;

    let mut out = String::new();

    writeln!(
        &mut out,
        "Reply from {}: bytes={} time={}ms TTL={}",
        reply.source,
        size,
        duration.as_millis(),
        reply.ttl.unwrap()
    )?;

    let result = MiscResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
