
use std::fmt;
use std::net::Ipv4Addr;
use std::str::FromStr;

use anyhow::{anyhow, Result};

use super::Cidr;

const IPV4ADDR_BITS: usize = 32;

/// [CIDR] range for IPv4 addresses.
///
/// [CIDR]: https://tools.ietf.org/html/rfc4632#section-3.1
#[derive(Clone, Copy, Debug, Hash, PartialEq, Eq, PartialOrd, Ord)]
pub struct Ipv4Cidr {
    address: Ipv4Addr,
    mask: u32,
}

impl Ipv4Cidr {
    #[inline]
    /// Iterate through CIDR range addresses.
    pub fn iter(self) -> Ipv4CidrIterator {
        Ipv4CidrIterator::new(self.network(), self.size())
    }

    #[inline]
    fn netmask_length(netmask: Ipv4Addr) -> Result<usize> {
        let mask = u32::from(netmask);
        let length = (!mask).leading_zeros();
        if mask.leading_zeros() == 0 && mask.trailing_zeros() == mask.count_zeros() {
            Ok(length as usize)
        } else {           
            Err(anyhow!("Invalid prefix length"))
        }
    }
}

impl Default for Ipv4Cidr {
    fn default() -> Ipv4Cidr {
        Ipv4Cidr {
            address: Ipv4Addr::UNSPECIFIED,
            mask: Default::default(),
        }
    }
}

#[derive(Clone, Debug)]
pub struct Ipv4CidrIterator {
    next: Option<u32>,
    end: u32,
}

impl Ipv4CidrIterator {
    fn new(start: Ipv4Addr, end: usize) -> Self {
        let start = u32::from(start);
        Ipv4CidrIterator {
            next: Some(start),
            end: start + (end as u32 - 1),
        }
    }
}

impl Iterator for Ipv4CidrIterator {
    type Item = Ipv4Addr;

    fn next(&mut self) -> Option<Ipv4Addr> {
        let next = self.next?;
        self.next = if next == self.end {
            None
        } else {
            Some(next + 1)
        };
        Some(next.into())
    }
}

impl Cidr for Ipv4Cidr {
    type Addr = Ipv4Addr;

    #[inline]
    fn address(&self) -> Self::Addr {
        self.address
    }

    #[inline]
    fn broadcast(&self) -> Self::Addr {
        Ipv4Addr::from((self.mask & u32::from(self.address)) | !self.mask)
    }

    #[inline]
    fn contains(&self, address: Self::Addr) -> bool {
        (self.mask & u32::from(self.address)) == (self.mask & u32::from(address))
    }

    #[inline]
    fn length(&self) -> usize {
        (!self.mask).leading_zeros() as usize
    }

    #[inline]
    fn hostmask(&self) -> Self::Addr {
        Ipv4Addr::from(!self.mask)
    }

    #[inline]
    fn netmask(&self) -> Self::Addr {
        Ipv4Addr::from(self.mask)
    }

    #[inline]
    fn network(&self) -> Self::Addr {
        Ipv4Addr::from(self.mask & u32::from(self.address))
    }

    #[inline]
    fn new(address: Self::Addr, length: usize) -> Result<Self> {
        let mask = match length {
            0 => u32::max_value(),
            1..=IPV4ADDR_BITS => u32::max_value() << (IPV4ADDR_BITS - length),
            _ => return Err(anyhow!("Failed to parse CIDR: Not a valid length")),
        };

        Ok(Ipv4Cidr { address, mask })
    }

    #[inline]
    fn size(&self) -> usize {
        2usize.pow((IPV4ADDR_BITS - self.length()) as u32)
    }

    #[inline]
    fn with_netmask(address: Self::Addr, netmask: Self::Addr) -> Result<Self> {
        let length = Ipv4Cidr::netmask_length(netmask)?;
        Ipv4Cidr::new(address, length)
    }
}

impl FromStr for Ipv4Cidr {  
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self> {
        match s.split('/').collect::<Vec<&str>>().as_slice() {
            [addr, len_or_netmask] => {
                let address =
                    Ipv4Addr::from_str(addr).map_err(|e| anyhow!("Failed to parse CIDR: {}", e))?;

                if let Ok(len) = usize::from_str_radix(len_or_netmask, 10) {
                    Ipv4Cidr::new(address, len)
                } else {
                    let netmask = Ipv4Addr::from_str(len_or_netmask)
                        .map_err(|e| anyhow!("Failed to parse CIDR: {}", e))?;

                    Ipv4Cidr::with_netmask(address, netmask)
                }
            }
            _ => Err(anyhow!("Failed to parse CIDR: {}", "No `/` found")),
        }
    }
}

impl fmt::Display for Ipv4Cidr {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}/{}", self.address(), self.length())
    }
}