use super::pnet_packet::{icmp::IcmpType, icmpv6::Icmpv6Type};
use super::thiserror;

pub mod echo_reply;
pub mod icmpv4_packet;
pub mod icmpv6_packet;

#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error("expected echoreply, got {0:?}")]
    NotEchoReply(IcmpType),
    #[error("expected echoreply, got {0:?}")]
    NotV6EchoReply(Icmpv6Type),
    //#[error("Other packet")]
    //OtherPacket,
}
