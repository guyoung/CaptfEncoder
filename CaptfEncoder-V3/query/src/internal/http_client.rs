use std::collections::HashMap;
use std::time::Duration;

use super::reqwest::header;
use super::reqwest::redirect;
use super::reqwest::Client;

use super::anyhow::Result;
use super::serde_json;

#[derive(Clone, Debug)]
pub struct HttpResponse<T> {
    pub status: u16,
    pub url: String,
    pub content: T,
    pub headers: Vec<(String, String)>,
}

pub async fn get_json(
    url: &str,
    request_headers: HashMap<String, String>,
    timeout: Duration,
) -> Result<HttpResponse<serde_json::value::Value>> {
    let client = build_client(request_headers, timeout)?;

    let res = client.get(url).send().await?;

    let status = res.status().as_u16();
    let url = res.url().as_str().to_string();

    let mut response_headers: Vec<(String, String)> = Vec::new();

    for (k, v) in res.headers() {
        let key = k.as_str().to_string();
        let val = v.to_str()?;
        let val = val.to_string();

        response_headers.push((key, val));
    }

    let text = res.text().await?;

    let content = serde_json::from_str(text.as_str())?;

    Ok(HttpResponse {
        status: status,
        url: url,
        content: content,
        headers: response_headers,
    })
}

pub async fn get(
    url: &str,
    request_headers: HashMap<String, String>,
    timeout: Duration,
) -> Result<HttpResponse<String>> {
    let client = build_client(request_headers, timeout)?;

    let res = client.get(url).send().await?;

    let status = res.status().as_u16();
    let url = res.url().as_str().to_string();

    let mut response_headers: Vec<(String, String)> = Vec::new();

    for (k, v) in res.headers() {
        let key = k.as_str().to_string();
        let val = v.to_str()?;
        let val = val.to_string();

        response_headers.push((key, val));
    }

    let text = res.text().await?;

    Ok(HttpResponse {
        status: status,
        url: url,
        content: text,
        headers: response_headers,
    })
}

pub async fn post(
    url: &str,
    request_headers: HashMap<String, String>,
    params: Vec<(String, String)>,
    timeout: Duration,
) -> Result<HttpResponse<String>> {
    let client = build_client(request_headers, timeout)?;

    let res = client.post(url).form(&params).send().await?;

    let status = res.status().as_u16();
    let url = res.url().as_str().to_string();

    let mut response_headers: Vec<(String, String)> = Vec::new();

    for (k, v) in res.headers() {
        let key = k.as_str().to_string();
        let val = v.to_str()?;
        let val = val.to_string();

        response_headers.push((key, val));
    }

    let text = res.text().await?;

    Ok(HttpResponse {
        status: status,
        url: url,
        content: text,
        headers: response_headers,
    })
}

fn build_client(request_headers: HashMap<String, String>, timeout: Duration) -> Result<Client> {
    let mut headers = header::HeaderMap::new();

    for (k, v) in request_headers {
        let header_name = Box::leak(k.into_boxed_str());      
        let header_name = header::HeaderName::from_static(header_name);
        let header_value = Box::leak(v.into_boxed_str());
        let header_value = header::HeaderValue::from_static(header_value);

        headers.insert(header_name, header_value);
    }

    let client = Client::builder()
        .default_headers(headers)
        .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36")
        .redirect(redirect::Policy::limited(5))
        .timeout(timeout)
        .danger_accept_invalid_certs(true)
        .build()?;

    Ok(client)
}
