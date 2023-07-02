use std::collections::HashMap;
use std::time::Duration;

use crate::internal::anyhow::Result;
use crate::internal::serde_json;

use crate::internal::http_client;

use crate::QueryResult;

pub async fn fetch(input: &str, _options: Option<HashMap<String, String>>) -> Result<QueryResult> {
    let url = format!("https://api.bgpview.io/ip/{}", input);

    let res = http_client::get_json(&url, HashMap::new(), Duration::from_secs(10)).await?;

    let out = format!("{}", serde_json::to_string_pretty(&res.content)?);
   
    let result = QueryResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
