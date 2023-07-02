// https://github.com/ZenGo-X/rust-gmp

use std::convert::From;
use std::error::Error;
use std::ffi::CString;
use std::mem::{size_of, MaybeUninit};
use std::sync::atomic;
use std::{fmt, hash};

use std::cmp::Ordering::{self, Equal, Greater, Less};
use std::ops::{
    Add, AddAssign, BitAnd, BitAndAssign, BitOr, BitOrAssign, BitXor, BitXorAssign, Div, DivAssign,
    Mul, MulAssign, Neg, Not, Rem, RemAssign, Shl, ShlAssign, Shr, ShrAssign, Sub, SubAssign,
};

use super::libc::{c_char, c_double, c_int, c_long, c_ulong, c_void, size_t};

use super::num_traits::{One, Zero};

#[link(name = "gmp")]
extern "C" {
    static __gmp_bits_per_limb: c_int;
    fn __gmpz_init(x: mpz_ptr);
    fn __gmpz_init2(x: mpz_ptr, n: mp_bitcnt_t);
    fn __gmpz_init_set(rop: mpz_ptr, op: mpz_srcptr);
    fn __gmpz_init_set_ui(rop: mpz_ptr, op: c_ulong);
    fn __gmpz_init_set_str(rop: mpz_ptr, s: *const c_char, base: c_int) -> c_int;
    fn __gmpz_clear(x: mpz_ptr);
    fn __gmpz_realloc2(x: mpz_ptr, n: mp_bitcnt_t);
    fn __gmpz_size(x: mpz_ptr) -> c_int;
    fn __gmpz_set(rop: mpz_ptr, op: mpz_srcptr);
    fn __gmpz_set_str(rop: mpz_ptr, s: *const c_char, base: c_int) -> c_int;
    fn __gmpz_get_str(s: *mut c_char, base: c_int, op: mpz_srcptr) -> *mut c_char;
    fn __gmpz_get_ui(op: mpz_srcptr) -> c_ulong;
    fn __gmpz_fits_ulong_p(op: mpz_srcptr) -> c_int;
    fn __gmpz_get_si(op: mpz_srcptr) -> c_ulong;
    fn __gmpz_get_d(op: mpz_srcptr) -> c_double;
    fn __gmpz_fits_slong_p(op: mpz_srcptr) -> c_long;
    fn __gmpz_sizeinbase(op: mpz_srcptr, base: c_int) -> size_t;
    fn __gmpz_cmp(op1: mpz_srcptr, op2: mpz_srcptr) -> c_int;
    fn __gmpz_cmp_ui(op1: mpz_srcptr, op2: c_ulong) -> c_int;
    fn __gmpz_add(rop: mpz_ptr, op1: mpz_srcptr, op2: mpz_srcptr);
    fn __gmpz_add_ui(rop: mpz_ptr, op1: mpz_srcptr, op2: c_ulong);
    fn __gmpz_sub(rop: mpz_ptr, op1: mpz_srcptr, op2: mpz_srcptr);
    fn __gmpz_sub_ui(rop: mpz_ptr, op1: mpz_srcptr, op2: c_ulong);
    fn __gmpz_ui_sub(rop: mpz_ptr, op1: c_ulong, op2: mpz_srcptr);
    fn __gmpz_mul(rop: mpz_ptr, op1: mpz_srcptr, op2: mpz_srcptr);
    fn __gmpz_mul_ui(rop: mpz_ptr, op1: mpz_srcptr, op2: c_ulong);
    fn __gmpz_mul_si(rop: mpz_ptr, op1: mpz_srcptr, op2: c_long);
    fn __gmpz_mul_2exp(rop: mpz_ptr, op1: mpz_srcptr, op2: mp_bitcnt_t);
    fn __gmpz_neg(rop: mpz_ptr, op: mpz_srcptr);
    fn __gmpz_abs(rop: mpz_ptr, op: mpz_srcptr);
    fn __gmpz_tdiv_q(q: mpz_ptr, n: mpz_srcptr, d: mpz_srcptr);
    fn __gmpz_tdiv_r(r: mpz_ptr, n: mpz_srcptr, d: mpz_srcptr);
    fn __gmpz_tdiv_q_ui(q: mpz_ptr, n: mpz_srcptr, d: c_ulong);
    fn __gmpz_tdiv_r_ui(r: mpz_ptr, n: mpz_srcptr, d: c_ulong);
    fn __gmpz_fdiv_r(r: mpz_ptr, n: mpz_srcptr, d: mpz_srcptr);
    fn __gmpz_fdiv_q(r: mpz_ptr, n: mpz_srcptr, d: mpz_srcptr);
    fn __gmpz_fdiv_q_2exp(q: mpz_ptr, n: mpz_srcptr, b: mp_bitcnt_t);
    fn __gmpz_mod(r: mpz_ptr, n: mpz_srcptr, d: mpz_srcptr);
    fn __gmpz_divisible_p(n: mpz_srcptr, d: mpz_srcptr) -> c_int;
    fn __gmpz_and(rop: mpz_ptr, op1: mpz_srcptr, op2: mpz_srcptr);
    fn __gmpz_ior(rop: mpz_ptr, op1: mpz_srcptr, op2: mpz_srcptr);
    fn __gmpz_xor(rop: mpz_ptr, op1: mpz_srcptr, op2: mpz_srcptr);
    fn __gmpz_com(rop: mpz_ptr, op: mpz_srcptr);
    fn __gmpz_popcount(op: mpz_srcptr) -> mp_bitcnt_t;
    fn __gmpz_pow_ui(rop: mpz_ptr, base: mpz_srcptr, exp: c_ulong);
    fn __gmpz_ui_pow_ui(rop: mpz_ptr, base: c_ulong, exp: c_ulong);
    fn __gmpz_powm(rop: mpz_ptr, base: mpz_srcptr, exp: mpz_srcptr, modulo: mpz_srcptr);
    fn __gmpz_powm_sec(rop: mpz_ptr, base: mpz_srcptr, exp: mpz_srcptr, modulo: mpz_srcptr);
    fn __gmpz_hamdist(op1: mpz_srcptr, op2: mpz_srcptr) -> mp_bitcnt_t;
    fn __gmpz_setbit(rop: mpz_ptr, bit_index: mp_bitcnt_t);
    fn __gmpz_clrbit(rop: mpz_ptr, bit_index: mp_bitcnt_t);
    fn __gmpz_combit(rop: mpz_ptr, bit_index: mp_bitcnt_t);
    fn __gmpz_tstbit(rop: mpz_srcptr, bit_index: mp_bitcnt_t) -> c_int;
    fn __gmpz_probab_prime_p(n: mpz_srcptr, reps: c_int) -> c_int;
    fn __gmpz_nextprime(rop: mpz_ptr, op: mpz_srcptr);
    fn __gmpz_gcd(rop: mpz_ptr, op1: mpz_srcptr, op2: mpz_srcptr);
    fn __gmpz_gcdext(g: mpz_ptr, s: mpz_ptr, t: mpz_ptr, a: mpz_srcptr, b: mpz_srcptr);
    fn __gmpz_lcm(rop: mpz_ptr, op1: mpz_srcptr, op2: mpz_srcptr);
    fn __gmpz_invert(rop: mpz_ptr, op1: mpz_srcptr, op2: mpz_srcptr) -> c_int;
    fn __gmpz_import(
        rop: mpz_ptr,
        count: size_t,
        order: c_int,
        size: size_t,
        endian: c_int,
        nails: size_t,
        op: *const c_void,
    );
    fn __gmpz_export(
        rop: *mut c_void,
        countp: *mut size_t,
        order: c_int,
        size: size_t,
        endian: c_int,
        nails: size_t,
        op: mpz_srcptr,
    );
    fn __gmpz_root(rop: mpz_ptr, op: mpz_srcptr, n: c_ulong) -> c_int;
    fn __gmpz_sqrt(rop: mpz_ptr, op: mpz_srcptr);
    fn __gmpz_millerrabin(n: mpz_srcptr, reps: c_int) -> c_int;
}

#[repr(C)]
pub struct mpz_struct {
    _mp_alloc: c_int,
    _mp_size: c_int,
    _mp_d: *mut c_void,
}

#[allow(non_camel_case_types)]
pub type mp_limb_t = usize; // TODO: Find a way to use __gmp_bits_per_limb instead.
#[allow(non_camel_case_types)]
pub type mp_bitcnt_t = c_ulong;
#[allow(non_camel_case_types)]
pub type mpz_srcptr = *const mpz_struct;
#[allow(non_camel_case_types)]
pub type mpz_ptr = *mut mpz_struct;

#[derive(Debug)]
pub struct ParseMpzError {
    details: String,
}

impl ParseMpzError {
    fn new(msg: &str) -> ParseMpzError {
        ParseMpzError {
            details: msg.to_string(),
        }
    }
}

impl fmt::Display for ParseMpzError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.details)
    }
}

impl Error for ParseMpzError {
    fn description(&self) -> &str {
        &self.details
    }
}

// The result of running probab_prime
#[derive(PartialEq)]
pub enum ProbabPrimeResult {
    NotPrime,
    ProbablyPrime,
    Prime,
}

#[derive(PartialEq, Eq, PartialOrd, Ord, Clone, Copy, Hash, Debug)]
pub enum Sign {
    Negative,
    Zero,
    Positive,
}

pub struct Mpz {
    mpz: mpz_struct,
}

impl Mpz {
    pub unsafe fn inner(&self) -> mpz_srcptr {
        &self.mpz
    }

    pub unsafe fn inner_mut(&mut self) -> mpz_ptr {
        &mut self.mpz
    }

    pub fn new() -> Mpz {
        unsafe {
            let mut mpz = MaybeUninit::<mpz_struct>::uninit().assume_init();
            __gmpz_init(&mut mpz);
            Mpz { mpz: mpz }
        }
    }

    pub fn zero() -> Mpz {
        Mpz::new()
    }

    pub fn is_zero(&self) -> bool {
        self.mpz._mp_size == 0
    }

    pub fn reserve(&mut self, n: usize) {
        if self.bit_length() < n {
            unsafe { __gmpz_realloc2(&mut self.mpz, n as c_ulong) }
        }
    }

    pub fn size_in_base(&self, base: u8) -> usize {
        unsafe { __gmpz_sizeinbase(&self.mpz, base as c_int) as usize }
    }

    pub fn to_str_radix(&self, base: u8) -> Result<String, &'static str> {
        unsafe {
            // Extra two bytes are for possible minus sign and null terminator
            let len = __gmpz_sizeinbase(&self.mpz, base as c_int) as usize + 2;

            // Allocate and write into a raw *c_char of the correct length
            let mut vector: Vec<u8> = Vec::with_capacity(len);
            vector.set_len(len);

            __gmpz_get_str(vector.as_mut_ptr() as *mut _, base as c_int, &self.mpz);

            let mut first_nul = None;
            let mut index: usize = 0;
            for elem in &vector {
                if *elem == 0 {
                    first_nul = Some(index);
                    break;
                }
                index += 1;
            }
            let first_nul = first_nul.unwrap_or(len);

            vector.truncate(first_nul);
            match String::from_utf8(vector) {
                Ok(s) => Ok(s),
                Err(_) => Err("GMP returned invalid UTF-8!"),
            }
        }
    }

    pub fn from_str_radix(s: &str, base: u8) -> Result<Mpz, ParseMpzError> {
        let s = CString::new(s.to_string()).map_err(|_| ParseMpzError::new("Invalid integer"))?;
        unsafe {
            assert!(base == 0 || (base >= 2 && base <= 62));
            let mut mpz = MaybeUninit::<mpz_struct>::uninit().assume_init();
            __gmpz_init(&mut mpz);

            let r = __gmpz_init_set_str(&mut mpz, s.as_ptr(), base as c_int);

            if r == 0 {
                Ok(Mpz { mpz: mpz })
            } else {
                __gmpz_clear(&mut mpz);

                Err(ParseMpzError::new("Invalid integer"))
            }
        }
    }

    pub fn set(&mut self, other: &Mpz) {
        unsafe { __gmpz_set(&mut self.mpz, &other.mpz) }
    }

    pub fn set_from_str_radix(&mut self, s: &str, base: u8) -> bool {
        assert!(base == 0 || (base >= 2 && base <= 62));
        let s = CString::new(s.to_string()).unwrap();
        unsafe { __gmpz_set_str(&mut self.mpz, s.as_ptr(), base as c_int) == 0 }
    }

    pub fn bit_length(&self) -> usize {
        unsafe { __gmpz_sizeinbase(&self.mpz, 2) as usize }
    }

    //
    pub fn compl(&self) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_com(&mut res.mpz, &self.mpz);
            res
        }
    }

    // Set rop to the absolute value of op.
    pub fn abs(&self) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_abs(&mut res.mpz, &self.mpz);
            res
        }
    }

    //
    pub fn div_floor(&self, other: &Mpz) -> Result<Mpz, &'static str> {
        unsafe {
            if other.is_zero() {
                return Err("divide by zero");
            }

            let mut res = Mpz::new();
            __gmpz_fdiv_q(&mut res.mpz, &self.mpz, &other.mpz);
            Ok(res)
        }
    }

    //
    pub fn mod_floor(&self, other: &Mpz) -> Result<Mpz, &'static str> {
        unsafe {
            if other.is_zero() {
                return Err("divide by zero");
            }

            let mut res = Mpz::new();
            __gmpz_fdiv_r(&mut res.mpz, &self.mpz, &other.mpz);
            Ok(res)
        }
    }

    // Determine whether n is prime.
    // Return 2 if n is definitely prime, return 1 if n is probably prime (without being certain),
    // or return 0 if n is definitely non-prime.
    // This function performs some trial divisions, a Baillie-PSW probable prime test,
    // then reps-24 Miller-Rabin probabilistic primality tests.
    // A higher reps value will reduce the chances of a non-prime being identified as “probably prime”.
    // A composite number will be identified as a prime with an asymptotic probability of less than 4^(-reps).
    // Reasonable values of reps are between 15 and 50.
    pub fn probab_prime(&self, reps: i32) -> Result<ProbabPrimeResult, String> {
        match unsafe { __gmpz_probab_prime_p(&self.mpz, reps as c_int) as u8 } {
            2 => Ok(ProbabPrimeResult::Prime),
            1 => Ok(ProbabPrimeResult::ProbablyPrime),
            0 => Ok(ProbabPrimeResult::NotPrime),
            x => Err(format!(
                "Undocumented return value {} from __gmpz_probab_prime_p",
                x
            )),
        }
    }

    // Set rop to the next prime greater than op.
    // This function uses a probabilistic algorithm to identify primes.
    // For practical purposes it’s adequate, the chance of a composite passing will be extremely small.
    pub fn nextprime(&self) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_nextprime(&mut res.mpz, &self.mpz);
            res
        }
    }

    // GCD(greatest common divisor)
    // Set rop to the greatest common divisor of op1 and op2.
    // The result is always positive even if one or both input operands are negative.
    // Except if both inputs are zero; then this function defines gcd(0,0) = 0.
    pub fn gcd(&self, other: &Mpz) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_gcd(&mut res.mpz, &self.mpz, &other.mpz);
            res
        }
    }

    // GCD(greatest common divisor)
    // Given (a, b), return (g, s, t) such that g = gcd(a, b) = s*a + t*b.
    // Set g to the greatest common divisor of a and b,
    // and in addition set s and t to coefficients satisfying a*s + b*t = g.
    // The value in g is always positive,
    // even if one or both of a and b are negative (or zero if both inputs are zero).
    // The values in s and t are chosen such that normally,
    // abs(s) < abs(b) / (2 g) and abs(t) < abs(a) / (2 g),
    // and these relations define s and t uniquely.
    pub fn gcdext(&self, other: &Mpz) -> (Mpz, Mpz, Mpz) {
        unsafe {
            let mut g = Mpz::new();
            let mut s = Mpz::new();
            let mut t = Mpz::new();
            __gmpz_gcdext(&mut g.mpz, &mut s.mpz, &mut t.mpz, &self.mpz, &other.mpz);
            (g, s, t)
        }
    }

    // LCM(lowest common multiple)
    pub fn lcm(&self, other: &Mpz) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_lcm(&mut res.mpz, &self.mpz, &other.mpz);
            res
        }
    }

    //
    pub fn is_multiple_of(&self, other: &Mpz) -> bool {
        unsafe { __gmpz_divisible_p(&self.mpz, &other.mpz) != 0 }
    }

    //
    pub fn divides(&self, other: &Mpz) -> bool {
        other.is_multiple_of(self)
    }

    //
    pub fn modulus(&self, modulo: &Mpz) -> Result<Mpz, &'static str> {
        unsafe {
            if modulo.is_zero() {
                return Err("divide by zero");
            }

            let mut res = Mpz::new();
            __gmpz_mod(&mut res.mpz, &self.mpz, &modulo.mpz);
            Ok(res)
        }
    }

    // Compute the inverse of op1 modulo op2 and put the result in rop.
    // If the inverse exists, the return value is non-zero and rop will satisfy 0 <= rop < abs(op2)
    // (with rop = 0 possible only when abs(op2) = 1, i.e., in the somewhat degenerate zero ring).
    // If an inverse doesn’t exist the return value is zero and rop is undefined.
    // The behaviour of this function is undefined when op2 is zero.
    pub fn invert(&self, modulo: &Mpz) -> Option<Mpz> {
        unsafe {
            let mut res = Mpz::new();
            if __gmpz_invert(&mut res.mpz, &self.mpz, &modulo.mpz) == 0 {
                None
            } else {
                Some(res)
            }
        }
    }

    //
    pub fn popcount(&self) -> usize {
        unsafe { __gmpz_popcount(&self.mpz) as usize }
    }

    //
    pub fn pow(&self, exp: u32) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_pow_ui(&mut res.mpz, &self.mpz, exp as c_ulong);
            res
        }
    }

    //
    pub fn powm(&self, exp: &Mpz, modulus: &Mpz) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_powm(&mut res.mpz, &self.mpz, &exp.mpz, &modulus.mpz);
            res
        }
    }

    //
    pub fn powm_sec(&self, exp: &Mpz, modulus: &Mpz) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_powm_sec(&mut res.mpz, &self.mpz, &exp.mpz, &modulus.mpz);
            res
        }
    }
    //
    pub fn ui_pow_ui(x: u32, y: u32) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_ui_pow_ui(&mut res.mpz, x as c_ulong, y as c_ulong);
            res
        }
    }

    //
    pub fn hamdist(&self, other: &Mpz) -> usize {
        unsafe { __gmpz_hamdist(&self.mpz, &other.mpz) as usize }
    }

    //
    pub fn setbit(&mut self, bit_index: usize) {
        unsafe { __gmpz_setbit(&mut self.mpz, bit_index as c_ulong) }
    }

    //
    pub fn clrbit(&mut self, bit_index: usize) {
        unsafe { __gmpz_clrbit(&mut self.mpz, bit_index as c_ulong) }
    }

    //
    pub fn combit(&mut self, bit_index: usize) {
        unsafe { __gmpz_combit(&mut self.mpz, bit_index as c_ulong) }
    }

    //
    pub fn tstbit(&self, bit_index: usize) -> bool {
        unsafe { __gmpz_tstbit(&self.mpz, bit_index as c_ulong) == 1 }
    }

    //
    pub fn root(&self, n: u32) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            let _perfect_root = match __gmpz_root(&mut res.mpz, &self.mpz, n as c_ulong) {
                0 => false,
                _ => true,
            };
            // TODO: consider returning `_perfect_root`
            res
        }
    }

    //
    pub fn sqrt(&self) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_sqrt(&mut res.mpz, &self.mpz);
            res
        }
    }

    //
    pub fn sign(&self) -> Sign {
        let size = self.mpz._mp_size;
        if size == 0 {
            Sign::Zero
        } else if size > 0 {
            Sign::Positive
        } else {
            Sign::Negative
        }
    }

    //
    pub fn one() -> Mpz {
        unsafe {
            let mut mpz = MaybeUninit::<mpz_struct>::uninit().assume_init();
            __gmpz_init(&mut mpz);
            __gmpz_init_set_ui(&mut mpz, 1);
            Mpz { mpz: mpz }
        }
    }
}

unsafe impl Send for Mpz {}
unsafe impl Sync for Mpz {}

impl Clone for Mpz {
    fn clone(&self) -> Mpz {
        unsafe {
            let mut mpz = MaybeUninit::<mpz_struct>::uninit().assume_init();
            __gmpz_init(&mut mpz);
            __gmpz_init_set(&mut mpz, &self.mpz);
            Mpz { mpz: mpz }
        }
    }
}

impl fmt::Display for Mpz {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let s = self.to_str_radix(10);

        if let Ok(s) = s {
            write!(f, "{}", s)
        } else {
            write!(f, "{}", "")
        }
    }
}

impl fmt::Debug for Mpz {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let s = self.to_str_radix(10);

        if let Ok(s) = s {
            write!(f, "{}", s)
        } else {
            write!(f, "{}", "")
        }
    }
}

impl hash::Hash for Mpz {
    fn hash<S: hash::Hasher>(&self, state: &mut S) {
        unsafe {
            for i in 0..self.mpz._mp_size.abs() {
                let limb = self.mpz._mp_d as *const mp_limb_t;
                let limb = *(limb.offset(i as isize));
                limb.hash(state);
            }
        }
    }
}

// Similarly to mpz_export, this does not preserve the sign of the input.
impl<'b> From<&'b Mpz> for Vec<u8> {
    fn from(other: &Mpz) -> Vec<u8> {
        unsafe {
            let bit_size = size_of::<u8>() * 8;
            let size = (__gmpz_sizeinbase(&other.mpz, 2) + bit_size - 1) / bit_size;
            let mut result: Vec<u8> = vec![0; size];
            __gmpz_export(
                result.as_mut_ptr() as *mut c_void,
                0 as *mut size_t,
                1,
                size_of::<u8>() as size_t,
                0,
                0,
                &other.mpz,
            );
            result
        }
    }
}

impl<'b> From<&'b Mpz> for Option<i64> {
    fn from(other: &Mpz) -> Option<i64> {
        unsafe {
            let negative = other.mpz._mp_size < 0;
            let mut to_export = Mpz::new();

            if negative {
                __gmpz_com(&mut to_export.mpz, &other.mpz);
            } else {
                __gmpz_set(&mut to_export.mpz, &other.mpz);
            }

            if __gmpz_sizeinbase(&to_export.mpz, 2) <= 63 {
                let mut result: i64 = 0;
                __gmpz_export(
                    &mut result as *mut i64 as *mut c_void,
                    0 as *mut size_t,
                    -1,
                    size_of::<i64>() as size_t,
                    0,
                    0,
                    &to_export.mpz,
                );
                if negative {
                    Some(result ^ -1i64)
                } else {
                    Some(result)
                }
            } else {
                return None;
            }
        }
    }
}

impl<'b> From<&'b Mpz> for Option<u64> {
    fn from(other: &Mpz) -> Option<u64> {
        unsafe {
            if __gmpz_sizeinbase(&other.mpz, 2) <= 64 && other.mpz._mp_size >= 0 {
                let mut result: u64 = 0;
                __gmpz_export(
                    &mut result as *mut u64 as *mut c_void,
                    0 as *mut size_t,
                    -1,
                    size_of::<u64>() as size_t,
                    0,
                    0,
                    &other.mpz,
                );
                Some(result)
            } else {
                None
            }
        }
    }
}

impl<'a> From<&'a Mpz> for f64 {
    fn from(other: &Mpz) -> f64 {
        unsafe { __gmpz_get_d(&other.mpz) as f64 }
    }
}

impl<'a> From<&'a [u8]> for Mpz {
    fn from(other: &'a [u8]) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_import(
                &mut res.mpz,
                other.len(),
                1,
                size_of::<u8>() as size_t,
                0,
                0,
                other.as_ptr() as *const c_void,
            );
            res
        }
    }
}

impl From<u64> for Mpz {
    fn from(other: u64) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_import(
                &mut res.mpz,
                1,
                -1,
                size_of::<u64>() as size_t,
                0,
                0,
                &other as *const u64 as *const c_void,
            );
            res
        }
    }
}

impl From<u32> for Mpz {
    fn from(other: u32) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_import(
                &mut res.mpz,
                1,
                -1,
                size_of::<u32>() as size_t,
                0,
                0,
                &other as *const u32 as *const c_void,
            );
            res
        }
    }
}

impl From<i64> for Mpz {
    fn from(other: i64) -> Mpz {
        unsafe {
            let mut res = Mpz::new();

            if other.is_negative() {
                __gmpz_import(
                    &mut res.mpz,
                    1,
                    -1,
                    size_of::<i64>() as size_t,
                    0,
                    0,
                    &(other ^ -1i64) as *const i64 as *const c_void,
                );
                __gmpz_com(&mut res.mpz, &res.mpz);
            } else {
                __gmpz_import(
                    &mut res.mpz,
                    1,
                    -1,
                    size_of::<i64>() as size_t,
                    0,
                    0,
                    &other as *const i64 as *const c_void,
                );
            }
            res
        }
    }
}

impl From<i32> for Mpz {
    fn from(other: i32) -> Mpz {
        unsafe {
            let mut res = Mpz::new();

            if other.is_negative() {
                __gmpz_import(
                    &mut res.mpz,
                    1,
                    -1,
                    size_of::<i32>() as size_t,
                    0,
                    0,
                    &(other ^ -1i32) as *const i32 as *const c_void,
                );
                __gmpz_com(&mut res.mpz, &res.mpz);
            } else {
                __gmpz_import(
                    &mut res.mpz,
                    1,
                    -1,
                    size_of::<i32>() as size_t,
                    0,
                    0,
                    &other as *const i32 as *const c_void,
                );
            }
            res
        }
    }
}

impl Zero for Mpz {
    #[inline]
    fn zero() -> Mpz {
        Mpz::zero()
    }

    #[inline]
    fn is_zero(&self) -> bool {
        self.is_zero()
    }
}

impl One for Mpz {
    #[inline]
    fn one() -> Mpz {
        Mpz::one()
    }
}

impl Eq for Mpz {}

impl PartialEq for Mpz {
    fn eq(&self, other: &Mpz) -> bool {
        unsafe { __gmpz_cmp(&self.mpz, &other.mpz) == 0 }
    }
}

impl Ord for Mpz {
    fn cmp(&self, other: &Mpz) -> Ordering {
        let cmp = unsafe { __gmpz_cmp(&self.mpz, &other.mpz) };
        if cmp == 0 {
            Equal
        } else if cmp < 0 {
            Less
        } else {
            Greater
        }
    }
}

impl PartialOrd for Mpz {
    fn partial_cmp(&self, other: &Mpz) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

// This macro inserts a guard against division by 0 for Div and Rem implementations
macro_rules! div_guard {
    (Div, $is_zero: expr) => {
        if $is_zero {
            panic!("divide by zero")
        }
    };
    (Rem, $is_zero: expr) => {
        if $is_zero {
            panic!("divide by zero")
        }
    };
    ($tr: ident, $is_zero: expr) => {};
}

// On Windows c_long and c_ulong are only 32-bit - in order to implement operations for
// 64-bit types we need some workarounds
macro_rules! bit_guard {
    (u64, $what: ident, $e1: expr, $e2: expr) => {
        if size_of::<c_ulong>() == 8 || $what <= u32::MAX as u64 {
            $e1
        } else {
            $e2
        }
    };

    (i64, $what: ident, $e1: expr, $e2: expr) => {
        if size_of::<c_long>() == 8 || $what <= i32::MAX as i64 {
            $e1
        } else {
            $e2
        }
    };

    (u32, $what: ident, $e1: expr, $e2: expr) => {
        $e1
    };

    (i32, $what: ident, $e1: expr, $e2: expr) => {
        $e1
    };
}

macro_rules! impl_oper {
	($tr: ident, $meth: ident, $tr_assign: ident, $meth_assign: ident, $fun: ident) => {
		impl $tr<Mpz> for Mpz {
			type Output = Mpz;
			#[inline]
			fn $meth(self, other: Mpz) -> Mpz {
				self.$meth(&other)
			}
		}
		impl<'a> $tr<&'a Mpz> for Mpz {
			type Output = Mpz;
			#[inline]
			fn $meth(mut self, other: &Mpz) -> Mpz {
				self.$meth_assign(other);
				self
			}
		}
		impl<'a> $tr<Mpz> for &'a Mpz {
			type Output = Mpz;
			#[inline]
			fn $meth(self, mut other: Mpz) -> Mpz {
				unsafe {
					div_guard!($tr, other.is_zero());
					$fun(&mut other.mpz, &self.mpz, &other.mpz);
					other
				}
			}
		}
		impl<'a, 'b> $tr<&'b Mpz> for &'a Mpz {
			type Output = Mpz;
			fn $meth(self, other: &Mpz) -> Mpz {
				unsafe {
					div_guard!($tr, other.is_zero());
					let mut res = Mpz::new();
					$fun(&mut res.mpz, &self.mpz, &other.mpz);
					res
				}
			}
		}
		impl $tr_assign<Mpz> for Mpz {
			#[inline]
			fn $meth_assign(&mut self, other: Mpz) {
				self.$meth_assign(&other)
			}
		}
		impl<'a> $tr_assign<&'a Mpz> for Mpz {
			#[inline]
			fn $meth_assign(&mut self, other: &Mpz) {
				unsafe {
					div_guard!($tr, other.is_zero());
					$fun(&mut self.mpz, &self.mpz, &other.mpz);
				}
			}
		}
	};
	(both $num: ident, $cnum: ident, $tr: ident, $meth: ident, $tr_assign: ident, $meth_assign: ident, $fun: ident) => {
		impl_oper!(normal $num, $cnum, $tr, $meth, $tr_assign, $meth_assign, $fun);
		impl $tr<Mpz> for $num {
			type Output = Mpz;
			#[inline]
			fn $meth(self, mut other: Mpz) -> Mpz {
				unsafe {
					bit_guard!($num, self, {
		            	$fun(&mut other.mpz, &other.mpz, self as $cnum);
		            	other
		        	}, other.$meth(Mpz::from(self)))
				}
			}
		}
		impl<'a> $tr<&'a Mpz> for $num {
			type Output = Mpz;
			fn $meth(self, other: &'a Mpz) -> Mpz {
				unsafe {
					bit_guard!($num, self, {
			            let mut res = Mpz::new();
			            $fun(&mut res.mpz, &other.mpz, self as $cnum);
			            res
		            }, other.$meth(Mpz::from(self)))
				}
			}
		}
	};
	(normal $num: ident, $cnum: ident, $tr: ident, $meth: ident, $tr_assign: ident, $meth_assign: ident, $fun: ident) => {
		impl $tr<$num> for Mpz {
			type Output = Mpz;
			#[inline]
			fn $meth(mut self, other: $num) -> Mpz {
				self.$meth_assign(other);
				self
			}
		}
		impl<'a> $tr<$num> for &'a Mpz {
			type Output = Mpz;
			fn $meth(self, other: $num) -> Mpz {
		        unsafe {
					div_guard!($tr, other == 0);
		        	bit_guard!($num, other, {
			            let mut res = Mpz::new();
			            $fun(&mut res.mpz, &self.mpz, other as $cnum);
			            res
		            }, self.$meth(Mpz::from(other)))
		        }
			}
		}
		impl $tr_assign<$num> for Mpz {
			#[inline]
			fn $meth_assign(&mut self, other: $num) {
				unsafe {
					div_guard!($tr, other == 0);
					bit_guard!($num, other,{
						$fun(&mut self.mpz, &self.mpz, other as $cnum);
                    }, self.$meth_assign(Mpz::from(other)))
				}
			}
		}
	};
	(reverse $num: ident, $cnum: ident, $tr: ident, $meth: ident, $fun: ident) => {
		impl $tr<Mpz> for $num {
			type Output = Mpz;
			#[inline]
			fn $meth(self, mut other: Mpz) -> Mpz {
				unsafe {
					bit_guard!($num, self, {
		            	$fun(&mut other.mpz, self as $cnum, &other.mpz);
		            	other
		        	}, Mpz::from(self).$meth(other))
				}
			}
		}
		impl<'a> $tr<&'a Mpz> for $num {
			type Output = Mpz;
			fn $meth(self, other: &'a Mpz) -> Mpz {
				unsafe {
					bit_guard!($num, self, {
			            let mut res = Mpz::new();
			            $fun(&mut res.mpz, self as $cnum, &other.mpz);
			            res
		            }, Mpz::from(self).$meth(other))
				}
			}
		}
	};
}

impl_oper!(Add, add, AddAssign, add_assign, __gmpz_add);
impl_oper!(both u64, c_ulong, Add, add, AddAssign, add_assign,__gmpz_add_ui);

impl_oper!(Sub, sub, SubAssign, sub_assign, __gmpz_sub);
impl_oper!(normal u64, c_ulong, Sub, sub, SubAssign, sub_assign, __gmpz_sub_ui);
impl_oper!(reverse u64, c_ulong, Sub, sub, __gmpz_ui_sub);

impl_oper!(Mul, mul, MulAssign, mul_assign, __gmpz_mul);
impl_oper!(both i64, c_long, Mul, mul, MulAssign, mul_assign, __gmpz_mul_si);
impl_oper!(both u64, c_ulong, Mul, mul, MulAssign, mul_assign, __gmpz_mul_ui);

impl_oper!(Div, div, DivAssign, div_assign, __gmpz_tdiv_q);
impl_oper!(normal u64, c_ulong, Div, div, DivAssign, div_assign, __gmpz_tdiv_q_ui);

impl_oper!(Rem, rem, RemAssign, rem_assign, __gmpz_tdiv_r);
impl_oper!(normal u64, c_ulong, Rem, rem, RemAssign, rem_assign, __gmpz_tdiv_r_ui);

impl<'b> Neg for &'b Mpz {
    type Output = Mpz;
    fn neg(self) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            // Set rop to -op.
            __gmpz_neg(&mut res.mpz, &self.mpz);
            res
        }
    }
}

impl Neg for Mpz {
    type Output = Mpz;
    fn neg(mut self) -> Mpz {
        unsafe {
            // Set rop to -op.
            __gmpz_neg(&mut self.mpz, &self.mpz);
            self
        }
    }
}

impl<'b> Not for &'b Mpz {
    type Output = Mpz;
    fn not(self) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_com(&mut res.mpz, &self.mpz);
            res
        }
    }
}

impl Not for Mpz {
    type Output = Mpz;
    #[inline]
    fn not(mut self) -> Mpz {
        unsafe {
            __gmpz_com(&mut self.mpz, &self.mpz);
            self
        }
    }
}

impl_oper!(BitAnd, bitand, BitAndAssign, bitand_assign, __gmpz_and);
impl_oper!(BitOr, bitor, BitOrAssign, bitor_assign, __gmpz_ior);
impl_oper!(BitXor, bitxor, BitXorAssign, bitxor_assign, __gmpz_xor);

impl<'b> Shl<usize> for &'b Mpz {
    type Output = Mpz;
    fn shl(self, other: usize) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_mul_2exp(&mut res.mpz, &self.mpz, other as c_ulong);
            res
        }
    }
}

impl<'b> Shr<usize> for &'b Mpz {
    type Output = Mpz;
    fn shr(self, other: usize) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_fdiv_q_2exp(&mut res.mpz, &self.mpz, other as c_ulong);
            res
        }
    }
}

impl Shl<usize> for Mpz {
    type Output = Mpz;
    fn shl(self, other: usize) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            //Set rop to op1 times 2 raised to op2. This operation can also be defined as a left shift by op2 bits.
            __gmpz_mul_2exp(&mut res.mpz, &self.mpz, other as c_ulong);
            res
        }
    }
}

impl Shr<usize> for Mpz {
    type Output = Mpz;
    fn shr(self, other: usize) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_fdiv_q_2exp(&mut res.mpz, &self.mpz, other as c_ulong);
            res
        }
    }
}

impl ShlAssign<usize> for Mpz {
    fn shl_assign(&mut self, other: usize) {
        unsafe {
            // Set rop to op1 times 2 raised to op2. This operation can also be defined as a left shift by op2 bits.
            __gmpz_mul_2exp(&mut self.mpz, &self.mpz, other as c_ulong);
        }
    }
}

impl ShrAssign<usize> for Mpz {
    fn shr_assign(&mut self, other: usize) {
        unsafe {
            __gmpz_fdiv_q_2exp(&mut self.mpz, &self.mpz, other as c_ulong);
        }
    }
}

impl Drop for Mpz {
    fn drop(&mut self) {
        unsafe {
            let size_limbs = __gmpz_size(&mut self.mpz);

            let dst = self.mpz._mp_d as *mut c_int;

            for i in 0..size_limbs {
                /*
                 * A note on safety of this:
                 *
                 *   1. In gmp source the mp_limb_t is defined as unsigned long so c_int will never
                 *      be more than that on any platform.
                 *
                 *   2. Memory for the array(_mp_d) is guaranteed to be allocated by gmp in limb sizes.
                 *      So we can be sure that we are not writing what we should not.
                 *
                 *    Also I think we should be having something in the gmp library itself to do this kind of a thing.
                 *    The process for that is in flight. If that is accepted we can use that here.
                 */
                std::ptr::write_volatile(dst.add(i as usize) as *mut c_int, 0);
            }
            __gmpz_clear(&mut self.mpz);
        }

        atomic::fence(atomic::Ordering::SeqCst);
        atomic::compiler_fence(atomic::Ordering::SeqCst);
    }
}
