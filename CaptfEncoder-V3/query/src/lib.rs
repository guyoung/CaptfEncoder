#![allow(dead_code)]

#[macro_use]
extern crate serde_derive;



pub struct QueryResult {
    pub successed: bool,
    pub val: String,
    pub message: String,
}


mod internal;

pub mod factordb;
pub mod whois;
pub mod crt_sh;
pub mod dns_lookup;
pub mod dns_dumpster;
pub mod geoping;
pub mod ip_info;
pub mod ip_whois;
pub mod ip_asn;
pub mod bgp_view;
pub mod censys;