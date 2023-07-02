use std::collections::HashMap;
use std::fmt::Write;

use std::time::Duration;

use super::super::internal::anyhow::Result;
use crate::internal::http_client;

use crate::QueryResult;

pub async fn fetch(input: &str, _options: Option<HashMap<String, String>>) -> Result<QueryResult> {
    let url = format!("https://ip.ws.126.net/ipquery?ip={}", input);

    let res = http_client::get(&url, HashMap::new(), Duration::from_secs(10)).await?;

    let text = res.content;
    let mut out = String::new();

    let index = text.find("var localAddress=");

    if let Some(val) = index {
        let start:usize = val + 17;
        let end:usize = text.len() - 1;
        
        writeln!(&mut out, "{}", &text[start..end])?;
    }

    let result = QueryResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
