

use std::mem::MaybeUninit;

use super::libc::{c_int, c_ulong, c_void};

use super::{mpz_struct, Mpz, mpz_ptr, mpz_srcptr, mp_bitcnt_t};

#[repr(C)]
pub struct gmp_randstate_struct {
    _mp_seed: mpz_struct,
    _mp_alg: c_int,
    _mp_algdata: *const c_void,
}

#[allow(non_camel_case_types)]
pub type gmp_randstate_t = *mut gmp_randstate_struct;

#[link(name = "gmp")]
extern "C" {
    fn __gmp_randinit_default(state: gmp_randstate_t);
    fn __gmp_randinit_mt(state: gmp_randstate_t);
    fn __gmp_randinit_lc_2exp(
        state: gmp_randstate_t,
        a: mpz_srcptr,
        c: c_ulong,
        m2exp: mp_bitcnt_t,
    );
    fn __gmp_randinit_lc_2exp_size(state: gmp_randstate_t, size: mp_bitcnt_t);
    fn __gmp_randinit_set(state: gmp_randstate_t, op: *const gmp_randstate_struct);
    fn __gmp_randclear(state: gmp_randstate_t);
    fn __gmp_randseed(state: gmp_randstate_t, seed: mpz_srcptr);
    fn __gmp_randseed_ui(state: gmp_randstate_t, seed: c_ulong);
    fn __gmpz_urandomb(rop: mpz_ptr, state: gmp_randstate_t, n: mp_bitcnt_t);
    fn __gmpz_urandomm(rop: mpz_ptr, state: gmp_randstate_t, n: mpz_srcptr);
}

pub struct RandState {
    state: gmp_randstate_struct,
}

unsafe impl Send for RandState {}
unsafe impl Sync for RandState {}

impl Drop for RandState {
    fn drop(&mut self) {
        unsafe { __gmp_randclear(&mut self.state) }
    }
}

impl RandState {
    pub fn new() -> RandState {
        unsafe {
            let mut state: gmp_randstate_struct = MaybeUninit::<gmp_randstate_struct>::uninit().assume_init();
            __gmp_randinit_default(&mut state);
            RandState { state: state }
        }
    }

    pub fn new_mt() -> RandState {
        unsafe {
            let mut state: gmp_randstate_struct = MaybeUninit::<gmp_randstate_struct>::uninit().assume_init();
            __gmp_randinit_mt(&mut state);
            RandState { state: state }
        }
    }

    pub fn new_lc_2exp(a: Mpz, c: u64, m2exp: u64) -> RandState {
        unsafe {
            let mut state: gmp_randstate_struct = MaybeUninit::<gmp_randstate_struct>::uninit().assume_init();
            __gmp_randinit_lc_2exp(&mut state, a.inner(), c as c_ulong, m2exp as c_ulong);
            RandState { state: state }
        }
    }

    pub fn new_lc_2exp_size(size: u64) -> RandState {
        unsafe {
            let mut state: gmp_randstate_struct = MaybeUninit::<gmp_randstate_struct>::uninit().assume_init();
            __gmp_randinit_lc_2exp_size(&mut state, size as c_ulong);
            RandState { state: state }
        }
    }

    pub fn seed(&mut self, seed: Mpz) {
        unsafe { __gmp_randseed(&mut self.state, seed.inner()) }
    }

    pub fn seed_ui(&mut self, seed: u64) {
        unsafe { __gmp_randseed_ui(&mut self.state, seed as c_ulong) }
    }

    /// Generate a uniform random integer in the range 0 to n-1, inclusive
    pub fn urandom(&mut self, n: &Mpz) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_urandomm(res.inner_mut(), &mut self.state, n.inner());
            res
        }
    }

    /// Generate a uniformly distributed random integer in the range 0 to 2^n−1, inclusive.
    pub fn urandom_2exp(&mut self, n: u64) -> Mpz {
        unsafe {
            let mut res = Mpz::new();
            __gmpz_urandomb(res.inner_mut(), &mut self.state, n as c_ulong);
            res
        }
    }
}

impl Clone for RandState {
    fn clone(&self) -> RandState {
        unsafe {
            let mut state: gmp_randstate_struct = MaybeUninit::<gmp_randstate_struct>::uninit().assume_init();
            __gmp_randinit_set(&mut state, &self.state);
            RandState { state: state }
        }
    }
}
