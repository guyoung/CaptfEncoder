// RSA Solve
// Known p, q, e, c solve plaintext


let p= "336771668019607304680919844592337860739";

let q= "296173636181072725338746212384476813557";

let e= "65537";

let c = "55907434463693004339309251502084272273011794908408891123020287672115136392494";

let n = bignum_mul(p,q);
print("n: "+n+"\n");

let phi_n = bignum_mul(bignum_sub(p, "1"), bignum_sub(q, "1"));
print("phi_n: "+phi_n+"\n");

let d = bignum_invert(e, phi_n);
print("d: "+phi_n+"\n");

let m = bignum_powm(c, d, n);
print("m: "+m+"\n");

let plain_text = bignum_convert_string(m);
print("plain_text: "+plain_text+"\n");
