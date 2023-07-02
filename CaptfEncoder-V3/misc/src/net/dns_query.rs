use std::net::ToSocketAddrs;
 
fn main() {
    let host = "www.kame.net";
    // Ideally, we would want to use std::net::lookup_host to resolve the host ips,
    // but at time of writing this, it is still unstable. Fortunately, we can
    // still resolve using the ToSocketAddrs trait, but we need to add a port,
    // so we use the dummy port 0.
    let host_port = (host, 0);
    let ip_iter = host_port.to_socket_addrs().unwrap();
 
 
    for ip_port in ip_iter {
        println!("{}", ip_port.ip());
    }
}