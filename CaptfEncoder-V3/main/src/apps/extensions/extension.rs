use std::collections::HashMap;

use fltk::group::*;

#[derive(Clone, Debug)]
pub struct ExtensionOption {
    pub name: String,
    pub label: String,
    pub datatype: String,
    pub default: String,
    pub tooltip: String,
    pub items: Vec<String>,
}

type TypeComponentFn = fn() -> Option<Box<dyn IExtensionComponent>>;

#[derive(Clone, Debug)]
pub struct Extension {
    pub id: String,
    pub name: String,
    pub label: String,
    pub component_fn: TypeComponentFn,
}

pub trait IExtensionComponent {
    fn render(&self, grp: &Group);
}

pub trait IExtensionResult {
    fn successed(&self) -> bool;
    fn val(&self) -> String;
    fn message(&self) -> String;
}

pub trait IEncoderHandler {
    fn encode(
        &self,
        input: &str,
        options: &HashMap<String, String>,
    ) -> Option<Box<dyn IExtensionResult>>;
    fn decode(
        &self,
        input: &str,
        options: &HashMap<String, String>,
    ) -> Option<Box<dyn IExtensionResult>>;
}

pub trait IExecutorHandler {
    fn execute(
        &self,
        input: &str,
        options: &HashMap<String, String>,
    ) -> Option<Box<dyn IExtensionResult>>;
}

pub struct ExtensionManager {
    pub extensions: Vec<Extension>,
}

impl ExtensionManager {
    pub fn new() -> Self {
        let mut extensions: Vec<Extension> = Vec::new();

        extensions.push(Extension {
            id: "encode.converter.ascii".to_string(),
            name: "Converter/Ascii".to_string(),
            label: "Ascii".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_ascii::Component {})),
        });
        extensions.push(Extension {
            id: "encode.converter.hex".to_string(),
            name: "Converter/Hex".to_string(),
            label: "Hex".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_hex::Component {})),
        });

        extensions.push(Extension {
            id: "encode.converter.base64".to_string(),
            name: "Converter/Base64".to_string(),
            label: "Base64".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_base64::Component {})),
        });

        extensions.push(Extension {
            id: "encode.converter.base16".to_string(),
            name: "Converter/Base16".to_string(),
            label: "Base16".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_base16::Component {})),
        });

        extensions.push(Extension {
            id: "encode.converter.base32".to_string(),
            name: "Converter/Base32".to_string(),
            label: "Base32".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_base32::Component {})),
        });

        extensions.push(Extension {
            id: "encode.converter.base_series".to_string(),
            name: "Converter/Base Series".to_string(),
            label: "Base Series".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_base_series::Component {})),
        });

        extensions.push(Extension {
            id: "encode.converter.url".to_string(),
            name: "Converter/Url".to_string(),
            label: "Url".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_url::Component {})),
        });

        extensions.push(Extension {
            id: "encode.converter.html_entity".to_string(),
            name: "Converter/Html Entity".to_string(),
            label: "Html Entity".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_html_entity::Component {})),
        });

        extensions.push(Extension {
            id: "encode.converter.shellcode".to_string(),
            name: "Converter/Shellcode".to_string(),
            label: "Shellcode".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_shellcode::Component {})),
        });

        extensions.push(Extension {
            id: "encode.converter.sql".to_string(),
            name: "Converter/Sql".to_string(),
            label: "Sql".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_sql::Component {})),
        });

        extensions.push(Extension {
            id: "encode.converter.unicode".to_string(),
            name: "Converter/Unicode".to_string(),
            label: "Unicode".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_unicode::Component {})),
        });

        extensions.push(Extension {
            id: "encode.converter.morse_code".to_string(),
            name: "Converter/Morse Code".to_string(),
            label: "Morse Code".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_morse_code::Component {})),
        });

        extensions.push(Extension {
            id: "encode.converter.punycode".to_string(),
            name: "Converter/Punycode".to_string(),
            label: "Punycode".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_punycode::Component {})),
        });

        
        extensions.push(Extension {
            id: "encode.converter.quoted_printable".to_string(),
            name: "Converter/Quoted-printable".to_string(),
            label: "Quoted-printable".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_quoted_printable::Component {})),
        });

        extensions.push(Extension {
            id: "encode.converter.tap_code".to_string(),
            name: "Converter/Tap code".to_string(),
            label: "Tap code".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_tap_code::Component {})),
        });

        extensions.push(Extension {
            id: "encode.converter.uuencode".to_string(),
            name: "Converter/Uuencode".to_string(),
            label: "Uuencode".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_uuencode::Component {})),
        });

        extensions.push(Extension {
            id: "encode.converter.brainfuck".to_string(),
            name: "Converter/Brainfuck".to_string(),
            label: "Brainfuck".to_string(),
            component_fn: || Some(Box::new(super::converter::ext_brainfuck::Component {})),
        });


        extensions.push(Extension {
            id: "encode.classical.adfgx".to_string(),
            name: "Classical/ADFGX".to_string(),
            label: "ADFGX".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_adfgx::Component {})),
        });

        extensions.push(Extension {
            id: "encode.classical.adfgvx".to_string(),
            name: "Classical/ADFGVX".to_string(),
            label: "ADFGVX".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_adfgvx::Component {})),
        });

        extensions.push(Extension {
            id: "encode.classical.affine".to_string(),
            name: "Classical/Affine".to_string(),
            label: "Affine".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_affine::Component {})),
        });

        extensions.push(Extension {
            id: "encode.classical.atbash".to_string(),
            name: "Classical/Atbash".to_string(),
            label: "Atbash".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_atbash::Component {})),
        });
        extensions.push(Extension {
            id: "encode.classical.autokey".to_string(),
            name: "Classical/Autokey".to_string(),
            label: "Autokey".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_autokey::Component {})),
        });

        extensions.push(Extension {
            id: "encode.classical.baconian".to_string(),
            name: "Classical/Baconian".to_string(),
            label: "Baconian".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_baconian::Component {})),
        });

        extensions.push(Extension {
            id: "encode.classical.beaufort".to_string(),
            name: "Classical/Beaufort".to_string(),
            label: "Beaufort".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_beaufort::Component {})),
        });

        extensions.push(Extension {
            id: "encode.classical.caesar".to_string(),
            name: "Classical/Caesar".to_string(),
            label: "Caesar".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_caesar::Component {})),
        });

        extensions.push(Extension {
            id: "encode.classical.columnar_transposition".to_string(),
            name: "Classical/Columnar Transposition".to_string(),
            label: "Columnar Transposition".to_string(),
            component_fn: || {
                Some(Box::new(
                    super::classical::ext_columnar_transposition::Component {},
                ))
            },
        });

        extensions.push(Extension {
            id: "encode.classical.four_square".to_string(),
            name: "Classical/Four Square".to_string(),
            label: "Four Square".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_four_square::Component {})),
        });

        extensions.push(Extension {
            id: "encode.classical.fractionated_morse".to_string(),
            name: "Classical/Fractionated Morse".to_string(),
            label: "Fractionated Morse".to_string(),
            component_fn: || {
                Some(Box::new(
                    super::classical::ext_fractionated_morse::Component {},
                ))
            },
        });

        extensions.push(Extension {
            id: "encode.classical.hill".to_string(),
            name: "Classical/Hill".to_string(),
            label: "Hill".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_hill::Component {})),
        });

        extensions.push(Extension {
            id: "encode.classical.playfair".to_string(),
            name: "Classical/Playfair".to_string(),
            label: "Playfair".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_playfair::Component {})),
        });

        extensions.push(Extension {
            id: "encode.classical.polybius_square".to_string(),
            name: "Classical/Polybius Square".to_string(),
            label: "Polybius Square".to_string(),
            component_fn: || {
                Some(Box::new(
                    super::classical::ext_polybius_square::Component {},
                ))
            },
        });

        extensions.push(Extension {
            id: "encode.classical.porta".to_string(),
            name: "Classical/Porta".to_string(),
            label: "Porta".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_porta::Component {})),
        });

        extensions.push(Extension {
            id: "encode.classical.railfence".to_string(),
            name: "Classical/Railfence".to_string(),
            label: "Railfence".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_railfence::Component {})),
        });

        extensions.push(Extension {
            id: "encode.classical.rot13".to_string(),
            name: "Classical/ROT13".to_string(),
            label: "ROT13".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_rot13::Component {})),
        });

        extensions.push(Extension {
            id: "encode.classical.running_key".to_string(),
            name: "Classical/Running Key".to_string(),
            label: "Running Key".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_running_key::Component {})),
        });

        extensions.push(Extension {
            id: "encode.classical.scytale".to_string(),
            name: "Classical/Scytale".to_string(),
            label: "Scytale".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_scytale::Component {})),
        });

        extensions.push(Extension {
            id: "encode.classical.simple_substitution".to_string(),
            name: "Classical/Simple Substitution".to_string(),
            label: "Simple Substitution".to_string(),
            component_fn: || {
                Some(Box::new(
                    super::classical::ext_simple_substitution::Component {},
                ))
            },
        });

        extensions.push(Extension {
            id: "encode.classical.vigenere".to_string(),
            name: "Classical/Vigenere".to_string(),
            label: "Vigenere".to_string(),
            component_fn: || Some(Box::new(super::classical::ext_vigenere::Component {})),
        });

        extensions.push(Extension {
            id: "encode.crypto.md5".to_string(),
            name: "Crypto/MD5".to_string(),
            label: "MD5".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_md5::Component {})),
        });
        extensions.push(Extension {
            id: "encode.crypto.md2".to_string(),
            name: "Crypto/MD2".to_string(),
            label: "MD2".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_md2::Component {})),
        });
        extensions.push(Extension {
            id: "encode.crypto.md4".to_string(),
            name: "Crypto/MD4".to_string(),
            label: "MD4".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_md4::Component {})),
        });

        extensions.push(Extension {
            id: "encode.crypto.ext_ripemd_series".to_string(),
            name: "Crypto/RIPEMD Series".to_string(),
            label: "RIPEMD Series".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_ripemd_series::Component {})),
        });

        extensions.push(Extension {
            id: "encode.crypto.sha1".to_string(),
            name: "Crypto/SHA1".to_string(),
            label: "SHA1".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_sha1::Component {})),
        });

        extensions.push(Extension {
            id: "encode.crypto.sha256".to_string(),
            name: "Crypto/SHA256".to_string(),
            label: "SHA256".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_sha256::Component {})),
        });
        extensions.push(Extension {
            id: "encode.crypto.sha_series".to_string(),
            name: "Crypto/SHA Series".to_string(),
            label: "SHA Series".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_sha_series::Component {})),
        });

        extensions.push(Extension {
            id: "encode.crypto.whirlpool".to_string(),
            name: "Crypto/Whirlpool".to_string(),
            label: "Whirlpool".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_whirlpool::Component {})),
        });

        extensions.push(Extension {
            id: "encode.crypto.hmac".to_string(),
            name: "Crypto/HMAC".to_string(),
            label: "HMAC".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_hmac::Component {})),
        });

        extensions.push(Extension {
            id: "encode.crypto.aes_128".to_string(),
            name: "Crypto/AES-128".to_string(),
            label: "AES-128".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_aes_128::Component {})),
        });

        extensions.push(Extension {
            id: "encode.crypto.des".to_string(),
            name: "Crypto/DES".to_string(),
            label: "DES".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_des::Component {})),
        });
        extensions.push(Extension {
            id: "encode.crypto.blowfish".to_string(),
            name: "Crypto/Blowfish".to_string(),
            label: "Blowfish".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_blowfish::Component {})),
        });
        extensions.push(Extension {
            id: "encode.crypto.rc2".to_string(),
            name: "Crypto/RC2".to_string(),
            label: "RC2".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_rc2::Component {})),
        });
        extensions.push(Extension {
            id: "encode.crypto.rc4".to_string(),
            name: "Crypto/RC4".to_string(),
            label: "RC4".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_rc4::Component {})),
        });

        extensions.push(Extension {
            id: "encode.crypto.sm3".to_string(),
            name: "Crypto/SM3".to_string(),
            label: "SM3".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_sm3::Component {})),
        });
        extensions.push(Extension {
            id: "encode.crypto.sm4".to_string(),
            name: "Crypto/SM4".to_string(),
            label: "SM4".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_sm4::Component {})),
        });

        extensions.push(Extension {
            id: "encode.crypto.bcrypt".to_string(),
            name: "Crypto/Bcrypt".to_string(),
            label: "Bcrypt".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_bcrypt::Component {})),
        });

        extensions.push(Extension {
            id: "encode.crypto.scrypt".to_string(),
            name: "Crypto/Scrypt".to_string(),
            label: "Scrypt".to_string(),
            component_fn: || Some(Box::new(super::crypto::ext_scrypt::Component {})),
        });

        
        extensions.push(Extension {
            id: "encode.public_key.rsa_key_generate".to_string(),
            name: "Asymmetric/RSA Key Generate".to_string(),
            label: "RSA Key Generate".to_string(),
            component_fn: || {
                Some(Box::new(
                    super::asymmetric::ext_rsa_key_generate::Component {},
                ))
            },
        });

        extensions.push(Extension {
            id: "encode.public_key.rsa_encrypt".to_string(),
            name: "Asymmetric/RSA Encrypt".to_string(),
            label: "RSA Encrypt".to_string(),
            component_fn: || Some(Box::new(super::asymmetric::ext_rsa_encrypt::Component {})),
        });
        

        extensions.push(Extension {
            id: "query.factordb".to_string(),
            name: "Query/Factordb".to_string(),
            label: "Factordb".to_string(),
            component_fn: || Some(Box::new(super::query::ext_factordb::Component {})),
        });
        extensions.push(Extension {
            id: "query.whois".to_string(),
            name: "Query/Whois".to_string(),
            label: "Whois".to_string(),
            component_fn: || Some(Box::new(super::query::ext_whois::Component {})),
        });
        extensions.push(Extension {
            id: "query.crt_sh".to_string(),
            name: "Query/crt.sh".to_string(),
            label: "crt.sh".to_string(),
            component_fn: || Some(Box::new(super::query::ext_crt_sh::Component {})),
        });
        extensions.push(Extension {
            id: "query.dns_lookup".to_string(),
            name: "Query/DNS Lookup".to_string(),
            label: "DNS Lookup".to_string(),
            component_fn: || Some(Box::new(super::query::ext_dns_lookup::Component {})),
        });
        extensions.push(Extension {
            id: "query.dns_dumpster".to_string(),
            name: "Query/DNS Dumpster".to_string(),
            label: "DNS Dumpster".to_string(),
            component_fn: || Some(Box::new(super::query::ext_dns_dumpster::Component {})),
        });

        extensions.push(Extension {
            id: "query.geoping".to_string(),
            name: "Query/GeoPing".to_string(),
            label: "GeoPing".to_string(),
            component_fn: || Some(Box::new(super::query::ext_geoping::Component {})),
        });

        extensions.push(Extension {
            id: "query.ip_info".to_string(),
            name: "Query/IP Info".to_string(),
            label: "IP Info".to_string(),
            component_fn: || Some(Box::new(super::query::ext_ip_info::Component {})),
        });

        extensions.push(Extension {
            id: "query.ip_whois".to_string(),
            name: "Query/IP Whois".to_string(),
            label: "IP Whois".to_string(),
            component_fn: || Some(Box::new(super::query::ext_ip_whois::Component {})),
        });

        extensions.push(Extension {
            id: "query.ip_asn".to_string(),
            name: "Query/IP ASN".to_string(),
            label: "IP ASN".to_string(),
            component_fn: || Some(Box::new(super::query::ext_ip_asn::Component {})),
        });
        extensions.push(Extension {
            id: "query.bgp_view".to_string(),
            name: "Query/BGP View".to_string(),
            label: "BGP View".to_string(),
            component_fn: || Some(Box::new(super::query::ext_bgp_view::Component {})),
        });

        extensions.push(Extension {
            id: "query.net.censys".to_string(),
            name: "Query/Censys".to_string(),
            label: "Censys".to_string(),
            component_fn: || Some(Box::new(super::query::ext_censys::Component {})),
        });

        extensions.push(Extension {
            id: "misc.net.file_hash".to_string(),
            name: "Misc/File Hash".to_string(),
            label: "File Hash".to_string(),
            component_fn: || Some(Box::new(super::misc::ext_file_hash::Component {})),
        });

        extensions.push(Extension {
            id: "misc.net.file_type".to_string(),
            name: "Misc/File Type".to_string(),
            label: "File Type".to_string(),
            component_fn: || Some(Box::new(super::misc::ext_file_type::Component {})),
        });

        extensions.push(Extension {
            id: "misc.net.image_exif".to_string(),
            name: "Misc/Image Exif".to_string(),
            label: "Image Exif".to_string(),
            component_fn: || Some(Box::new(super::misc::ext_image_exif::Component {})),
        });

        extensions.push(Extension {
            id: "misc.net.base64_image_encode".to_string(),
            name: "Misc/Base64 Image Encode".to_string(),
            label: "Base64 Image Encode".to_string(),
            component_fn: || Some(Box::new(super::misc::ext_base64_image_encode::Component {})),
        });

        extensions.push(Extension {
            id: "misc.net.base64_image_decode".to_string(),
            name: "Misc/Base64 Image Decode".to_string(),
            label: "Base64 Image Decode".to_string(),
            component_fn: || Some(Box::new(super::misc::ext_base64_image_decode::Component {})),
        });

        extensions.push(Extension {
            id: "misc.net.qrcode_decode".to_string(),
            name: "Misc/Qrcode Decode".to_string(),
            label: "Qrcode Decode".to_string(),
            component_fn: || Some(Box::new(super::misc::ext_qrcode_decode::Component {})),
        });

        extensions.push(Extension {
            id: "misc.net.qrcode_encode".to_string(),
            name: "Misc/Qrcode Encode".to_string(),
            label: "Qrcode Encode".to_string(),
            component_fn: || Some(Box::new(super::misc::ext_qrcode_encode::Component {})),
        });

        extensions.push(Extension {
            id: "misc.net.cidr_calculator".to_string(),
            name: "Misc/CIDR Calculator".to_string(),
            label: "CIDR Calculator".to_string(),
            component_fn: || Some(Box::new(super::misc::ext_cidr_calculator::Component {})),
        });

        extensions.push(Extension {
            id: "misc.net.ping".to_string(),
            name: "Misc/Ping".to_string(),
            label: "Ping".to_string(),
            component_fn: || Some(Box::new(super::misc::ext_ping::Component {})),
        });

        extensions.push(Extension {
            id: "misc.net.port_scan".to_string(),
            name: "Misc/Port Scan".to_string(),
            label: "Port Scan".to_string(),
            component_fn: || Some(Box::new(super::misc::ext_port_scan::Component {})),
        });

        Self { extensions }
    }

    pub fn get_extension(&mut self, id: &str) -> Option<&Extension> {
        self.extensions.iter().find(|x| x.id == id)
    }
}
