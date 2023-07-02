use std::fmt;
use std::net::Ipv6Addr;
use std::str::FromStr;


use anyhow::{anyhow, Result};

use super::Cidr;

const IPV6ADDR_BITS: usize = 128;

/// [CIDR] range for IPv6 addresses.
///
/// [CIDR]: https://tools.ietf.org/html/rfc4291#section-2.3
#[derive(Clone, Copy, Debug, Hash, PartialEq, Eq, PartialOrd, Ord)]
pub struct Ipv6Cidr {
    address: Ipv6Addr,
    mask: u128,
}

impl Ipv6Cidr {
    /// Iterate through CIDR range addresses.
    pub fn iter(self) -> Ipv6CidrIterator {
        Ipv6CidrIterator::new(self.network(), self.size())
    }

    #[inline]
    fn netmask_length(netmask: Ipv6Addr) -> Result<usize> {
        let mask = u128::from(netmask);

        let length = (!mask).leading_zeros();
        if mask.leading_zeros() == 0 && mask.trailing_zeros() == mask.count_zeros() {
            Ok(length as usize)
        } else {
            Err(anyhow!("Invalid prefix length"))
        }
    }
}

impl Default for Ipv6Cidr {
    fn default() -> Ipv6Cidr {
        Ipv6Cidr {
            address: Ipv6Addr::UNSPECIFIED,
            mask: Default::default(),
        }
    }
}

#[derive(Clone, Debug)]
pub struct Ipv6CidrIterator {
    next: Option<u128>,
    end: u128,
}

impl Ipv6CidrIterator {
    fn new(start: Ipv6Addr, end: usize) -> Self {
        let start = u128::from(start);
        Ipv6CidrIterator {
            next: Some(start),
            end: start + (end as u128 - 1),
        }
    }
}

impl Iterator for Ipv6CidrIterator {
    type Item = Ipv6Addr;

    fn next(&mut self) -> Option<Ipv6Addr> {
        let next = self.next?;
        self.next = if next == self.end {
            None
        } else {
            Some(next + 1)
        };
        Some(next.into())
    }
}

impl Cidr for Ipv6Cidr {
    type Addr = Ipv6Addr;

    #[inline]
    fn address(&self) -> Self::Addr {
        self.address
    }

    #[inline]
    fn broadcast(&self) -> Self::Addr {
        Ipv6Addr::from(self.mask & u128::from(self.address) | !self.mask)
    }

    #[inline]
    fn contains(&self, address: Self::Addr) -> bool {
        (self.mask & u128::from(self.address)) == (self.mask & u128::from(address))
    }

    #[inline]
    fn network(&self) -> Self::Addr {
        Ipv6Addr::from(self.mask & u128::from(self.address))
    }

    #[inline]
    fn length(&self) -> usize {
        (!self.mask).leading_zeros() as usize
    }

    #[inline]
    fn hostmask(&self) -> Self::Addr {
        Ipv6Addr::from(!self.mask)
    }

    #[inline]
    fn netmask(&self) -> Self::Addr {
        Ipv6Addr::from(self.mask)
    }

    #[inline]
    fn new(address: Self::Addr, length: usize) -> Result<Self> {
        let mask = match length {
            0 => u128::max_value(),
            1..=IPV6ADDR_BITS => u128::max_value() << (IPV6ADDR_BITS - length),
            _ => return Err(anyhow!("Failed to parse CIDR: Not a valid length")),
        };

        Ok(Ipv6Cidr { address, mask })
    }

    #[inline]
    fn size(&self) -> usize {
        2usize.pow((IPV6ADDR_BITS - self.length()) as u32)
    }

    #[inline]
    fn with_netmask(address: Self::Addr, netmask: Self::Addr) -> Result<Self> {
        let length = Ipv6Cidr::netmask_length(netmask)?;
        Ipv6Cidr::new(address, length)
    }
}

impl FromStr for Ipv6Cidr { 
    type Err = anyhow::Error;
    
    fn from_str(s: &str) -> Result<Self> {
        match s.split('/').collect::<Vec<&str>>().as_slice() {
            [addr, len_or_netmask] => {
                let address =
                    Ipv6Addr::from_str(addr).map_err(|e| anyhow!("Failed to parse CIDR: {}", e))?;

                if let Ok(len) = usize::from_str_radix(len_or_netmask, 10) {
                    Ipv6Cidr::new(address, len)
                } else {
                    let netmask = Ipv6Addr::from_str(len_or_netmask)
                        .map_err(|e| anyhow!("Failed to parse CIDR: {}", e))?;

                    Ipv6Cidr::with_netmask(address, netmask)
                }
            }
            _ => Err(anyhow!("Failed to parse CIDR: {}", "No `/` found")),
        }
    }
}

impl fmt::Display for Ipv6Cidr {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}/{}", self.address(), self.length())
    }
}