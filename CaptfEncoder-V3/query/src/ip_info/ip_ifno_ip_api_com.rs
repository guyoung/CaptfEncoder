use std::collections::HashMap;
use std::fmt::Write;
use std::time::Duration;

use super::super::internal::anyhow::Result;
use crate::internal::http_client;

use crate::QueryResult;

pub async fn fetch(input: &str, _options: Option<HashMap<String, String>>) -> Result<QueryResult> {
    let url = format!("http://ip-api.com/json/{}", input);

    let res = http_client::get_json(&url, HashMap::new(), Duration::from_secs(10)).await?;

    let obj = res.content.as_object().unwrap();

    let mut out = String::new();

    for (k, v) in obj {
        writeln!(&mut out, "{}: {}", k, v)?;
    }

    let result = QueryResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
