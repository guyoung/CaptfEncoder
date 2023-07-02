use std::collections::HashMap;
use std::time::Duration;
use std::fmt::Write;

use super::internal::scraper::Html;
use super::internal::scraper::Selector;

use super::internal::selectors;

use super::internal::anyhow::Result;

use crate::internal::http_client;

use crate::QueryResult;

pub async fn fetch(input: &str, _options: Option<HashMap<String, String>>) -> Result<QueryResult> {
    let url = format!(
        "https://www.radb.net/query?advanced_query=&keywords={}&-T+option=&ip_option=&-i+option=",
        input
    );

    let res = http_client::get(&url, HashMap::new(), Duration::from_secs(10)).await?;

    let document = Html::parse_document(&res.content);

    let selector = Selector::parse("pre").unwrap();

    let mut out = String::new();

    for element in document.select(&selector) {
        if element.value().has_class(
            "query-result",
            selectors::attr::CaseSensitivity::CaseSensitive,
        ) {
            let text = element.text().collect::<Vec<_>>();
            
            for line in text{
                writeln!(&mut out, "{}", line)?
            }
            writeln!(&mut out, "{}", "")?
        }
    }

    let result = QueryResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}
