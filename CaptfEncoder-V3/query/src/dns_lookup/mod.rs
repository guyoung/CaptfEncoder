use std::collections::HashMap;
use std::fmt::Write;
use std::time::Duration;

use super::internal::trust_dns_resolver::{
    config::{ResolverConfig, ResolverOpts},
    AsyncResolver,
};

use super::internal::anyhow::Result;

use crate::QueryResult;

pub async fn fetch(input: &str, _options: Option<HashMap<String, String>>) -> Result<QueryResult> {
    let dns_resolver = AsyncResolver::tokio(
        ResolverConfig::default(),
        ResolverOpts {
            timeout: Duration::from_secs(5),
            ..Default::default()
        },
    )?;

    let res = dns_resolver.lookup_ip(input).await?;

    let mut out = String::new();

    for elem in res.iter() {
        writeln!(&mut out, "{:?}", elem)?
    }
    let result = QueryResult {
        successed: true,
        val: out,
        message: String::from(""),
    };
    Ok(result)
}
