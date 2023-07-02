use std::net::IpAddr;

#[derive(Debug)]
pub struct EchoReply {
    pub ttl: Option<u8>,
    pub source: IpAddr,
    pub seq: u16,
    pub ident: u16,
    pub size: usize,
}
