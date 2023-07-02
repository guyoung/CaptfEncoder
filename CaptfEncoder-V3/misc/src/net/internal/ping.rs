use std::mem::MaybeUninit;
use std::net::IpAddr;
use std::net::SocketAddr;
use std::time::Duration;
use std::time::Instant;

use socket2::{Domain, Protocol, Socket, Type};


use super::packets::{self, echo_reply, icmpv4_packet, icmpv6_packet};

pub struct Ping {
    dst_ip: IpAddr,
    socket: Socket,
    socket_addr: SocketAddr,
}

impl Ping {
    pub fn new(dst_ip: IpAddr) -> anyhow::Result<Self> {
        let socket = match dst_ip {
            IpAddr::V4(_) => Socket::new(Domain::IPV4, Type::RAW, Some(Protocol::ICMPV4))?,
            IpAddr::V6(_) => Socket::new(Domain::IPV6, Type::RAW, Some(Protocol::ICMPV6))?,
        };
        let socket_addr = SocketAddr::new(dst_ip, 0);

        Ok(Self {
            dst_ip,
            socket,
            socket_addr,
        })
    }

    pub fn ping(
        &self,
        ident: u16,
        seq: u16,
        size: usize,
        timeout: Duration,
    ) -> anyhow::Result<(echo_reply::EchoReply, Duration)> {
        let mut packet = match self.dst_ip {
            IpAddr::V4(_) => icmpv4_packet::make_echo_packet(ident, seq, size, None)?,
            IpAddr::V6(_) => icmpv6_packet::make_echo_packet(ident, seq, size, None)?,
        };       

        let send_at = Instant::now();
        self.socket
            .send_to(&mut packet, &self.socket_addr.into()).or_else(|_| Err(anyhow::anyhow!("socket send packet error")))?;
            

        self.wait_reply(ident, seq, timeout)
            .map(|(reply, t)| (reply, t.duration_since(send_at)))
    }

    fn wait_reply(
        &self,
        ident: u16,
        seq: u16,
        timeout: Duration,
    ) -> anyhow::Result<(echo_reply::EchoReply, Instant)> {
        let mut buffer = [MaybeUninit::new(0); 4096];
        let mut timeout = timeout;

        // wait the reply we want or timeout
        loop {
            self.socket.set_read_timeout(Some(timeout))?;

            let start_at = Instant::now();
            let size = self.socket.recv(&mut buffer).map_err(|e| {
                if e.kind() == std::io::ErrorKind::WouldBlock {
                    anyhow::anyhow!("Request timeout for icmp_seq {}", seq)
                } else {
                    anyhow::anyhow!("io error {}", e)
                }
            })?;
            let end_at = Instant::now();

            // calculate the new timeout
            timeout = timeout - end_at.duration_since(start_at);
            if timeout <= Duration::ZERO {
                return Err(anyhow::anyhow!("Request timeout for icmp_seq {}", seq));
            }

            let buffer = unsafe { std::mem::transmute(&buffer[..size]) };

            let reply: anyhow::Result<_> = match self.dst_ip {
                IpAddr::V4(_) => {
                    let reply = icmpv4_packet::decode_echo_reply(self.dst_ip, buffer);

                    match reply {
                        Ok(reply) => Ok(reply),
                        Err(e) => Err(e),
                    }
                }
                IpAddr::V6(_) => {
                    let reply = icmpv6_packet::decode_echo_reply(self.dst_ip, buffer);
                    match reply {
                        Ok(reply) => Ok(reply),
                        Err(e) => Err(e),
                    }
                }
            };
            match reply {
                Ok(reply) => {
                    if reply.ident == ident && reply.seq == seq {
                        return Ok((reply, Instant::now()));
                    }
                    continue;
                }               
              
                Err(e) => {
                    let packet_error = || {
                        for cause in e.chain() {
                            if let Some(val) = cause.downcast_ref::<packets::Error>() {
                                return Some(val);
                            }
                        }

                        None
                    };

                    let packet_error = packet_error();

                    match packet_error {
                        Some(_val) => {                        
                            continue;
                        },
                        None => {
                            return Err(e);
                        }
                    }
                }
            }
        }
    }
}
