use std::collections::HashMap;
use std::collections::HashSet;
use std::fmt::Write;
use std::time::Duration;

use super::internal::anyhow::Result;
use crate::internal::http_client;

use crate::QueryResult;

pub async fn fetch(input: &str, _options: Option<HashMap<String, String>>) -> Result<QueryResult> {
    let url = format!("https://crt.sh/?q=%25.{}&output=json", input);

    let res = http_client::get_json(&url, HashMap::new(), Duration::from_secs(30)).await?;

    let mut subdomains: HashSet<String> = HashSet::new();

    if let Some(arr) = res.content.as_array() {
        subdomains = arr
            .into_iter()
            .map(|entry| {
                entry["name_value"]
                    .as_str()
                    .unwrap()
                    .split("\n")
                    .map(|subdomain| subdomain.trim().to_string())
                    .collect::<Vec<String>>()
            })
            .flatten()
            .filter(|subdomain: &String| subdomain != input)
            .filter(|subdomain: &String| !subdomain.contains("*"))
            .collect();
    }

    let mut out = String::new();

    for elem in subdomains.iter() {
        writeln!(&mut out, "{}", elem)?
    }

    let result = QueryResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
