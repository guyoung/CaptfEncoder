use std::collections::HashMap;
use std::time::Duration;


use super::internal::scraper::Html;
use super::internal::scraper::Selector;

use super::internal::anyhow::Result;
use super::internal::serde_json;

use crate::internal::http_client;

use crate::QueryResult;

#[derive(Debug, Clone, Serialize, Deserialize, )]
pub struct Res {
    dns_servers: Vec<Fields>,
    mx_records: Vec<Fields>,
    txt_records: Vec<String>,
    host_records: Vec<Fields>,
}

impl Res {
    pub fn new() -> Self {
        Self {
            dns_servers: Vec::new(),
            mx_records: Vec::new(),
            txt_records: Vec::new(),
            host_records: Vec::new(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, )]
pub struct Fields {
    domain: String,
    ip: String,
    additional_info: String,
    country: String,
}

impl Fields {
    pub fn new() -> Self {
        Self {
            domain: "".to_string(),
            ip: "".to_string(),
            additional_info: "".to_string(),
            country: "".to_string(),
        }
    }
}

pub async fn fetch(input: &str, _options: Option<HashMap<String, String>>) -> Result<QueryResult> {
    let url = "https://dnsdumpster.com/";

    let token = get_token().await?;

    let mut headers = HashMap::new();
    headers.insert("referer".to_string(), url.to_string());
    headers.insert("cookie".to_string(), format!("csrftoken={}", token.clone()));

    let mut params = Vec::new();
    params.push(("csrfmiddlewaretoken".to_string(), token.clone()));
    params.push(("targetip".to_string(), input.to_string()));
    params.push(("user".to_string(), "free".to_string()));

    let res = http_client::post(&url, headers, params, Duration::from_secs(30)).await?;

    let document = Html::parse_document(&res.content);

    let mut res = Res::new();

    let selector = Selector::parse(r#"div[class="table-responsive"]"#).unwrap();

    for (table_index, table) in document.select(&selector).into_iter().enumerate() {
        if table_index == 0 {
            res.dns_servers = parse_table(&table);
        } else if table_index == 1 {
            res.mx_records = parse_table(&table);
        } else if table_index == 2 {
            res.txt_records = parse_table2(&table);
        }else if table_index == 3 {
            res.host_records = parse_table(&table);
        }
    }

    let out = format!("{}", serde_json::to_string_pretty(&res)?);

    let result = QueryResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}

pub fn parse_table(table: &scraper::ElementRef) -> Vec<Fields> {
    let mut data: Vec<Fields> = Vec::new();

    for row in table.select(&Selector::parse("tr").unwrap()) {
        let mut fields = Fields::new();

        for (col_index, col) in row
            .select(&Selector::parse("td").unwrap())
            .into_iter()
            .enumerate()
        {
            let text = col.text().collect::<Vec<_>>();
            if col_index == 0 {
                let result = get_domain(text);
                fields.domain = result;
            } else if col_index == 1 {
                let result = get_ip(text);
                fields.ip = result;
            } else if col_index == 2 {
                let result = get_additional_info(text);
                fields.additional_info = result.0;
                fields.country = result.1;
            }
        }

        data.push(fields);
    }

    data
}

pub fn parse_table2(table: &scraper::ElementRef) -> Vec<String> {
    let mut data: Vec<String> = Vec::new();

    for row in table.select(&Selector::parse("tr").unwrap()) {
        let text = row.text().collect::<Vec<_>>();

        data.push(text.join("\r\n"));
    }

    data
}

pub fn get_domain(lines: Vec<&str>) -> String {
    let mut domain = String::from("");

    if lines.len() > 0 {
        domain = lines[0].to_owned();
    }

    domain
}

pub fn get_ip(lines: Vec<&str>) -> String {
    let mut ip = String::from("");

    if lines.len() > 0 {
        ip = lines[0].to_owned();
    }

    ip
}

pub fn get_additional_info(lines: Vec<&str>) -> (String, String) {
    let mut additional_info = String::from("");
    let mut country = String::from("");

    if lines.len() > 0 {
        additional_info = lines[0].to_owned();
    }

    if lines.len() > 1 {
        country = lines[1].to_owned();
    }

    (additional_info, country)
}

pub async fn get_token() -> Result<String> {
    let url = format!("https://dnsdumpster.com/");

    let headers = HashMap::new();
    //headers.insert("X-Custom-Header".to_string(), "Get it".to_string());

    let res = http_client::get(&url, headers, Duration::from_secs(30)).await?;

    let document = Html::parse_document(&res.content);

    let selector = Selector::parse(r#"input[name="csrfmiddlewaretoken"]"#).unwrap();

    let input = document.select(&selector).next().unwrap();

    let token = input.value().attr("value").unwrap();

    Ok(token.to_owned())
}
