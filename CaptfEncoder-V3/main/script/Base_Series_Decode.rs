// Base series decode

let input="SGVsbG8gV29ybGQh";

print("Base64: "+base64_decode(input)+"\n");
print("Base16: "+base16_decode(input)+"\n");
print("Base32: "+base32_decode(input)+"\n");
print("Base36: "+base36_decode(input)+"\n");
print("Base58: "+base58_decode(input)+"\n");
print("Base62: "+base62_decode(input)+"\n");
print("Base91: "+base91_decode(input)+"\n");
print("Base92: "+base92_decode(input)+"\n");
print("Base85(ascii85): "+base85_ascii85_decode(input)+"\n");
print("Base85(zero85): "+base85_zero85_decode(input)+"\n");