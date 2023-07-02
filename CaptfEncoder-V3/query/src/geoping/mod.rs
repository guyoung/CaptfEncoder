use std::collections::HashMap;
use std::fmt::Write;
use std::time::Duration;

use super::internal::anyhow::Result;
use crate::internal::http_client;

use crate::QueryResult;

pub async fn fetch(input: &str, _options: Option<HashMap<String, String>>) -> Result<QueryResult> {
    let url = format!("https://geonet.shodan.io/api/geoping/{}", input);
    let res = http_client::get_json(&url, HashMap::new(), Duration::from_secs(30)).await?;

    let mut out = String::new();

    if let Some(arr) = res.content.as_array() {
        // {"avg_rtt": Number(2.176),
        //"from_loc": Object({"city": String("Santa Clara"), "country": String("US"), "latlon": String("37.3924,-121.9623")}),
        //"ip": String("8.8.8.8"), "is_alive": Bool(true), "max_rtt": Number(2.854), "min_rtt": Number(1.565), "packet_loss": Number(0.0), "packets_received": Number(3), "packets_sent": Number(3), "rtts": Array([Number(2.8541088104248047), Number(2.108335494995117), Number(1.5649795532226563)])}
        for entry in arr.into_iter() {
            let from_loc = &entry["from_loc"];
            let city = from_loc["city"].as_str().unwrap();
            let country = from_loc["country"].as_str().unwrap();
            let _latlon = from_loc["latlon"].as_str().unwrap();
            let ip = entry["ip"].as_str().unwrap();
            let is_alive = entry["is_alive"].as_bool().unwrap();
            let avg_rtt = entry["avg_rtt"].as_f64().unwrap();
            let min_rtt = entry["min_rtt"].as_f64().unwrap();
            let max_rtt = entry["max_rtt"].as_f64().unwrap();
            let location = format!("{} ({})", city, country);

            if is_alive {
                writeln!(
                    &mut out,
                    "{:<30} {:<16} {}ms (min: {:5} ms, max: {:5} ms)",
                    location, ip, avg_rtt, min_rtt, max_rtt
                )?;
            } else {
                writeln!(&mut out, "{:<30} {:<16} {}", location, ip, "unresponsive")?;
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
