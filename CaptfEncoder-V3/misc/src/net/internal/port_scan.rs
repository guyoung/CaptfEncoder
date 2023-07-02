use std::net::SocketAddr;
use std::net::{IpAddr, Ipv4Addr};
use std::sync::{Arc, Mutex};
use std::time::Duration;
use std::time::Instant;

use super::rayon::prelude::*;

use super::anyhow::Result;

use socket2::{Domain, Protocol, SockAddr, Socket, Type};

use super::ports;

/// Status of scan task
#[derive(Clone, Debug)]
pub enum ScanStatus {
    Ready,
    Done,
    //Timeout,
    //Error,
}

/// Status of the scanned port
#[derive(Clone, Copy, Debug)]
pub enum PortStatus {
    Open,
    //Closed,
    //Filtered,
}

/// Information about the scanned port
#[derive(Clone, Copy, Debug)]
pub struct PortInfo {   
    pub port: u16,
    pub status: PortStatus,
}

/// Result of port scan
#[derive(Clone, Debug)]
pub struct PortScanResult {
    pub ip_addr: IpAddr,
    pub ports: Vec<PortInfo>,
    pub scan_time: Duration,
    pub scan_status: ScanStatus,
}

impl PortScanResult {
    pub fn new() -> PortScanResult {
        PortScanResult {
            ip_addr: IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)),
            ports: vec![],
            scan_time: Duration::from_millis(0),
            scan_status: ScanStatus::Ready,
        }
    }
}

pub fn port_scan(dst_ip: IpAddr, timeout:u64, thread: i32, all_ports: bool) -> Result<PortScanResult> {
    let start_time = Instant::now();
    let conn_timeout = Duration::from_millis(timeout);   
    let ports = get_ports(all_ports);
    let result: Arc<Mutex<PortScanResult>> = Arc::new(Mutex::new(PortScanResult::new()));


    let pool = rayon::ThreadPoolBuilder::new()
        .num_threads(thread as usize)
        .build()?;

    pool.install(|| {
        ports.into_par_iter().for_each(|port| {
            let socket = match dst_ip {
                IpAddr::V4(_) => {
                    Socket::new(Domain::IPV4, Type::STREAM, Some(Protocol::TCP)).unwrap()
                }
                IpAddr::V6(_) => {
                    Socket::new(Domain::IPV6, Type::STREAM, Some(Protocol::TCP)).unwrap()
                }
            };
            let socket_addr = SocketAddr::new(dst_ip, port);
            let sock_addr = SockAddr::from(socket_addr);
            match socket.connect_timeout(&sock_addr, conn_timeout) {
                Ok(_) => {
                    result.lock().unwrap().ports.push(PortInfo {                       
                        port: port,
                        status: PortStatus::Open,
                    });
                   
                }
                Err(_) => {}
            }
        });
    });

    let scan_time = Instant::now().duration_since(start_time);

    let mut result = result.lock().unwrap();

    result.ip_addr = dst_ip;
    result.scan_time = scan_time;
    result.scan_status = ScanStatus::Done;

    let result2 = result.clone();

    Ok(result2)
}

fn get_ports(all_ports: bool) -> Vec<u16> {
    if all_ports {
        (1..=u16::MAX).collect()
    } else {
        ports::MOST_COMMON_PORTS_1002.to_owned()
    }
}
