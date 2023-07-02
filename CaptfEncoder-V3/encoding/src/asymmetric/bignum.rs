use std::ops::{Add, Div, Mul, Sub};

use super::internal::anyhow::Result;
use super::internal::anyhow::*;

use super::internal::Mpz;

#[derive(Clone, Debug)]
pub struct Bignum {
    inner: Mpz,
}

impl Bignum {
    pub fn form_str(input: &str, base: u8) -> Result<Bignum> {
        let innner = Mpz::from_str_radix(input, base)?;

        Ok(Bignum { inner: innner })
    }

    pub fn to_str(&mut self, base: u8) -> Result<String> {
        let s = self.inner.to_str_radix(base).or_else(|e| Err(anyhow!(e)))?;

        Ok(s)
    }

    pub fn modulus(&mut self, num: &Bignum) -> Result<Bignum> {
        let val = self
            .inner
            .modulus(&num.inner)
            .or_else(|e| Err(anyhow!(e)))?;

        Ok(Bignum { inner: val })
    }

    pub fn invert(&mut self, num: &Bignum) -> Option<Bignum> {
        let val = self.inner.invert(&num.inner);

        if let Some(val) = val {
            Some(Bignum { inner: val })
        } else {
            None
        }
    }

    pub fn powm(&mut self, num1: &Bignum, num2: &Bignum) -> Bignum {
        let val = self.inner.powm(&num1.inner, &num2.inner);

        Bignum { inner: val }
    }

    pub fn sqrt(&mut self) -> Bignum {
        let val = self.inner.sqrt();

        Bignum { inner: val }
    }

    pub fn root(&mut self, n: u32) -> Bignum {
        let val = self.inner.root(n);

        Bignum { inner: val }
    }

    pub fn gcd(&mut self, num: &Bignum) -> Bignum {
        let val = self.inner.gcd(&num.inner);

        Bignum { inner: val }
    }

    pub fn gcdext(&mut self, num: &Bignum) -> (Bignum, Bignum,Bignum,) {
        let val = self.inner.gcdext(&num.inner);

        (Bignum { inner: val.0 }, Bignum { inner: val.1 }, Bignum { inner: val.2 })
    }

    pub fn lcm(&mut self, num: &Bignum) -> Bignum {
        let val = self.inner.gcd(&num.inner);

        Bignum { inner: val }
    }

 
}

impl Add for Bignum {
    type Output = Bignum;

    fn add(self, num: Bignum) -> Bignum {
        Bignum {
            inner: self.inner + num.inner,
        }
    }
}

impl Sub for Bignum {
    type Output = Bignum;

    fn sub(self, num: Bignum) -> Bignum {
        Bignum {
            inner: self.inner - num.inner,
        }
    }
}

impl Mul for Bignum {
    type Output = Bignum;

    fn mul(self, num: Bignum) -> Bignum {
        Bignum {
            inner: self.inner * num.inner,
        }
    }
}

impl Div for Bignum {
    type Output = Bignum;

    fn div(self, num: Bignum) -> Bignum {
        Bignum {
            inner: self.inner / num.inner,
        }
    }
}
