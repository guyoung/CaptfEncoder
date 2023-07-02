use std::collections::HashMap;
use std::time::Duration;

use super::internal::anyhow::Result;

use crate::internal::http_client;

use crate::QueryResult;

pub async fn fetch(input: &str, _options: Option<HashMap<String, String>>) -> Result<QueryResult> {
    let url = format!("http://factordb.com/api?query={}", input);

    // {"id":"11","status":"P","factors":[["11",1]]}
    let res = http_client::get_json(&url, HashMap::new(), Duration::from_secs(10)).await?;

    let factors = &res.content["factors"];
    let mut numbers: Vec<String> = Vec::new();

   if let Some(arr) = factors.as_array() {
        for elem in arr.iter() {
            let t = elem[1].as_i64().unwrap();

            for _i in 0..t {
                numbers.push(elem[0].as_str().unwrap().to_string());
            }
        }
    }

    let mut out = input.to_string();
    out = out + &String::from(" = ");
    out = out + &numbers.join(" × ");

    let result = QueryResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
