use std::collections::HashMap;
use std::time::Duration;

use super::internal::anyhow::Result;
use super::internal::serde_json;

use crate::internal::http_client;

use crate::QueryResult;

pub async fn fetch(input: &str, options: Option<HashMap<String, String>>) -> Result<QueryResult> {
    let mut query_type = "asn".to_string();


    if let Some(options) = options {      
        if let Some(val) = options.get("query_type") {
            query_type = val.to_owned();
        }
    }

    let url = match query_type.as_str() {
        "asn" => format!("https://api.bgpview.io/asn/{}", input),
        "prefixes" => format!("https://api.bgpview.io/asn/{}/prefixes", input),
        "peers" => format!("https://api.bgpview.io/asn/{}/peers", input),
        "upstreams" => format!("https://api.bgpview.io/asn/{}/upstreams", input),
        "downstreams" => format!("https://api.bgpview.io/asn/{}/downstreams", input),
        "ixs" => format!("https://api.bgpview.io/asn/{}/ixs", input),
        _ => format!("https://api.bgpview.io/asn/{}", input),
    };   

    let res = http_client::get_json(&url, HashMap::new(), Duration::from_secs(10)).await?;

    let out = format!("{}", serde_json::to_string_pretty(&res.content)?);
   
    let result = QueryResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
