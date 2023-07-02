use std::collections::HashMap;
use std::net::TcpStream;
use std::net::ToSocketAddrs;
use std::time::Duration;

use super::internal::anyhow::Result;
use super::internal::anyhow::*;

use crate::QueryResult;

pub async fn fetch(input: &str, _options: Option<HashMap<String, String>>) -> Result<QueryResult> {
    use std::fmt::Write;

    let server = "whois.iana.org";
    let port = 43;

    let res = get_whois_result(input, server, port)?;

    let mut out = String::new();

    for line in res.lines() {
        writeln!(&mut out, "{}", line)?
    }

    let result = QueryResult {
        successed: true,
        val: out,
        message: String::from(""),
    };

    Ok(result)
}

fn get_whois_result(target: &str, server: &str, port: u16) -> Result<String> {
    use std::io::prelude::*;

    let mut res = String::new();
    let mut step = 0;
    let mut server = server.to_string();

    let mut previous_servers: Vec<String> = Vec::new();

    while server != "" {
        res.clear();
        let mut socket_addrs_iter = format!("{}:{}", server, port).to_socket_addrs().unwrap();
        let socket_addr = socket_addrs_iter.next().unwrap();

        let mut client = TcpStream::connect_timeout(&socket_addr, Duration::from_secs(10))?;

        client.write_all(format!("{}\n", target).as_bytes())?;

        client.read_to_string(&mut res)?;

        let line;

        if step == 0 {
            line = res.lines().find(|i| i.contains("whois:"));
        } else {
            line = res.lines().find(|i| i.contains("Whois Server:"));
        }

        let next_server = match line {
            Some(line) => {
                let server = line.split_whitespace().last().unwrap().to_owned();
                server
            }
            None => "".to_string(),
        };

        let mut previous_servers_iter = previous_servers.iter();
        if let Some(_) = previous_servers_iter.position(|s| *s == next_server) {
            return Err(anyhow!(
                "Detected whois referral loop between servers:\n{}\n{}",
                next_server,
                previous_servers.as_slice().join("\n")
            ));
        }

        previous_servers.push(server.clone());
        server = next_server.clone();

        step = step + 1;
    }

    Ok(res)
}
