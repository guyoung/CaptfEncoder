use std::collections::HashMap;
use std::time::Duration;
use std::fmt::Write;

use super::internal::scraper::Html;
use super::internal::scraper::Selector;

use super::internal::anyhow::Result;
use crate::internal::http_client;

use crate::QueryResult;

pub async fn fetch(input: &str, _options: Option<HashMap<String, String>>) -> Result<QueryResult> {
    let url = format!("https://search.censys.io/hosts/{}", input);

    let res = http_client::get(&url, HashMap::new(), Duration::from_secs(10)).await?;

    let document = Html::parse_document(&res.content);

    let selector = Selector::parse(r#"dl[class="dl dl-horizontal"]"#).unwrap();

    let dl = document.select(&selector).next().unwrap();

    let text = dl.text().collect::<Vec<_>>();

    let text: Vec<String> = text
        .iter()
        .map(|s| {
            let v: Vec<&str> = s.split("\n").collect();
            let v = v.join("");
            v.trim().to_string()
        })
        .collect();

    let mut out = String::new();

    for s in text {
        match s.as_str(){
            ""=> {},
            "Network"=>{
                write!(&mut out, "{}: ", s)?
            }
            "Routing"| "Protocols"=>{
                write!(&mut out, "\n\n{}: ", s)?
            }
           
            _=>{
                write!(&mut out, "{}", s)?
            }
        }
    }

    let result = QueryResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
