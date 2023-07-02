// Low-Public-Exponent
// Low public exponent attack for RSA

let c = "9217979941366220275377875095861710925207028551771520610387238734819759256223080175603032167658086669886661302962985046348865181740591251321966682848536331583243529";

let e = 2;

let m = bignum_sqrt(c);
print("m: "+m+"\n");

let plain_text = bignum_convert_string(m);
print("plain_text: "+plain_text+"\n");
