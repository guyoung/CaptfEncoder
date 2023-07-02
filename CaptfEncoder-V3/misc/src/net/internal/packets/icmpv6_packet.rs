use std::net::IpAddr;

use super::super::pnet_packet::icmpv6::{Icmpv6Packet, Icmpv6Types, MutableIcmpv6Packet};
use super::super::pnet_packet::Packet;

use super::super::anyhow::*;
use super::super::anyhow::Result;

use super::echo_reply::EchoReply;

pub fn make_echo_packet(
    idt: u16,
    seq: u16,
    size: usize,
    payload: Option<&[u8]>,
) -> Result<Vec<u8>> {
    let mut buf = vec![0; 8 + size];
    let mut packet = MutableIcmpv6Packet::new(&mut buf).ok_or(anyhow!("buffer size was too small"))?;

    packet.set_icmpv6_type(Icmpv6Types::EchoRequest);
    let idt_bytes = idt.to_be_bytes();
    let seq_bytes = seq.to_be_bytes();
    let mut payload_buf = Vec::with_capacity(4 + size);
    payload_buf.extend_from_slice(&idt_bytes);
    payload_buf.extend_from_slice(&seq_bytes);
    if let Some(payload) = payload {
        payload_buf.extend_from_slice(payload);
    }
    packet.set_payload(&payload_buf);

    // checksum
    // The kernel will calculate checksum of icmpv6 in default.
    Ok(buf)
}

pub fn decode_echo_reply(addr: IpAddr, buf: &[u8]) -> Result<EchoReply> {
    let icmp_packet =
        Icmpv6Packet::new(buf).ok_or_else(|| anyhow!("expected an Icmpv6Packet payload"))?;
    let typ = icmp_packet.get_icmpv6_type();
    if typ != Icmpv6Types::EchoReply {
        return Err(super::Error::NotV6EchoReply(typ).into());
    }

    let payload = icmp_packet.payload();
    if payload.len() < 4 {
        return Err(anyhow!("payload too short, got {}, want {}", payload.len(), 4));
    }
    let ident = u16::from_be_bytes(payload[0..2].try_into()?);
    let seq = u16::from_be_bytes(payload[2..4].try_into()?);

    Ok(EchoReply {
        ttl: None,
        source: addr,
        seq,
        ident,
        size: payload.len() - 4, // Subtract 4 bytes for ident and sequence
    })
}
