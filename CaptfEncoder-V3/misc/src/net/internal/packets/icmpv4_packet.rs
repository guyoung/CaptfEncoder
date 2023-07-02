use std::net::IpAddr;

use super::super::pnet_packet::icmp::echo_reply::EchoReplyPacket;
use super::super::pnet_packet::icmp::echo_request::MutableEchoRequestPacket;
use super::super::pnet_packet::icmp::{self, IcmpPacket, IcmpTypes};
use super::super::pnet_packet::ipv4::Ipv4Packet;
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
    let mut packet = MutableEchoRequestPacket::new(&mut buf).ok_or(anyhow!("buffer size was too small"))?;

    packet.set_icmp_type(IcmpTypes::EchoRequest);
    packet.set_identifier(idt);
    packet.set_sequence_number(seq);
    if let Some(payload) = payload {
        packet.set_payload(payload);
    }

    let icmp_packet = icmp::IcmpPacket::new(packet.packet()).ok_or(anyhow!("buffer size was too small"))?;
    let checksum = icmp::checksum(&icmp_packet);
    packet.set_checksum(checksum);

    Ok(buf)
}

pub fn decode_echo_reply(addr: IpAddr, buf: &[u8]) -> Result<EchoReply> {
    let ipv4_packet =
        Ipv4Packet::new(buf).ok_or_else(|| anyhow!("expected an Ipv4Packet"))?;

    let payload = ipv4_packet.payload();
    let icmp_packet =
        IcmpPacket::new(payload).ok_or_else(|| anyhow!("expected an Icmpv4Packet payload"))?;
    let typ = icmp_packet.get_icmp_type();
    if typ != IcmpTypes::EchoReply {
        return Err(super::Error::NotEchoReply(typ).into());
    }

    let echo_reply_packet = EchoReplyPacket::new(payload).unwrap();
    Ok(EchoReply {
        ttl: Some(ipv4_packet.get_ttl()),
        source: addr,
        seq: echo_reply_packet.get_sequence_number(),
        ident: echo_reply_packet.get_identifier(),
        size: echo_reply_packet.packet().len(),
    })
}

