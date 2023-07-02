#[allow(dead_code)]


// https://github.com/capsule-rs/capsule/tree/master/core/src/net/cidr

pub mod ipv4_cidr;
pub mod ipv6_cidr;

use super::anyhow::Result;

#[allow(unreachable_pub)] // https://github.com/rust-lang/rust/issues/57411
pub use self::ipv4_cidr::Ipv4Cidr;
#[allow(unreachable_pub)]
pub use self::ipv6_cidr::Ipv6Cidr;

/// Common behaviors for interacting with CIDR ranges.
pub trait Cidr: Sized {
    /// Type of address, i.e. IPv4 or IPv6, associated with the CIDR.
    type Addr;

    /// Returns the IP address prefix.
    fn address(&self) -> Self::Addr;

    /// Returns the broadcast address in a CIDR range.
    fn broadcast(&self) -> Self::Addr;

    /// Checks whether an address is contained within the CIDR range.
    fn contains(&self, address: Self::Addr) -> bool;

    /// Returns the CIDR hostmask address.
    fn hostmask(&self) -> Self::Addr;

    /// Returns the CIDR prefix length.
    fn length(&self) -> usize;

    /// Returns the CIDR netmask.
    fn netmask(&self) -> Self::Addr;

    /// Returns the network address in a CIDR range.
    fn network(&self) -> Self::Addr;

    /// Returns a new CIDR range from a prefix length.
    fn new(address: Self::Addr, length: usize) -> Result<Self>;

    /// Returns the number of possible addresses within the CIDR range.
    fn size(&self) -> usize;

    /// Returns a new CIDR range from a netmask.
    fn with_netmask(address: Self::Addr, netmask: Self::Addr) -> Result<Self>;
}
