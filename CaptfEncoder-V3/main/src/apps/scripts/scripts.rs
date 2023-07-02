use std::collections::HashMap;
use std::result::Result;
use std::str;

use rhai::Dynamic;
use rhai::Engine;

use anyhow;

use crate::apps::extensions::encoding;
use crate::apps::extensions::encoding::EncodingResult;

use crate::apps::ScriptRes;

#[derive(Clone, Debug)]
pub struct Script {
    pub id: String,
    pub name: String,
    pub label: String,
}

#[derive(Clone, Debug)]
pub struct ScriptManager {
    pub scripts: Vec<Script>,
}

impl ScriptManager {
    pub fn new() -> Self {
        let mut scripts: Vec<Script> = Vec::new();

        for file in ScriptRes::iter() {          

            let file = file.as_ref().to_string();
            let pos = file.rfind('/');

            let name = file.replace(".rs", "").replace("_", " ");

            let label = match pos {
                Some(pos) => file[(pos+1)..].replace(".rs", "").replace("_", " "),
                None=>file.replace(".rs", "").replace("_", " ")
            };

            
            
            scripts.push(Script {
                id: file,
                name: name,
                label: label,
            })
        }

        Self { scripts }
    }

    pub fn get_script(&mut self, id: &str) -> Option<&Script> {
        self.scripts.iter().find(|x| x.id == id)
    }

    pub fn get_script_text(&mut self, id: &str) -> String {
        let script = self.scripts.iter().find(|x| x.id == id);

        if let Some(script) = script {
            let text = ScriptRes::get(&script.id).unwrap();
            let text = str::from_utf8(text.data.as_ref()).unwrap_or_default();
            text.to_owned()
        } else {
            "".to_string()
        }
    }

    pub fn run_script<F: Fn(&str) + 'static>(
        &mut self,
        script: &str,
        print_callback: F,
        //debug_callback: impl Fn(&str) + 'static,
        //progress_callback: impl Fn(u64) + 'static,
    ) -> Result<String, String> {
        let mut engine = Engine::new();
        engine.disable_symbol("eval");
        engine.disable_symbol("eval");
        engine.on_print(move |s| print_callback(s));
        engine.on_debug(|_, _, _| {});
        /*
        engine.on_debug(move |s, src, pos| {
            debug_callback(&src.map_or_else(
                || format!("<script>:[{}] {}", pos, s),
                |src| format!("{}:[{}] {}", src, pos, s),
            ))
        });
        */
        engine.on_progress(move |_ops| None);

        self.init_engine(&mut engine);

        let script_ast = engine.compile(script).map_err(|e| e.to_string())?;
        let result: Dynamic = engine.eval_ast(&script_ast).map_err(|e| e.to_string())?;
        Ok(result.to_string())
    }

    fn init_engine(&mut self, engine: &mut Engine) {
        fn call(result: anyhow::Result<EncodingResult>) -> String {          
         
            match result {
                Ok(result) => {
                    if result.successed {
                        result.val
                    } else {
                        format!("\n\n[Error]\n{}\n", result.message)
                    }
                }
                Err(e) => format!("\n\n[Error]\n{:?}\n", e),
            }
        }

        fn parse_args(args: &str) -> Option<HashMap<String, String>> {
            if args.is_empty() {
                return None;
            }

            let args: HashMap<String, String> = args
                .split_whitespace()
                .map(|s| s.split_at(s.find(":").unwrap()))
                .map(|(key, val)| (key.to_string(), val[1..].to_string()))
                .collect();

            return Some(args);
        }

        engine.register_fn("base64_encode", |input| {
            call(encoding::converter::base64::encode(input, None))
        });
        engine.register_fn("base64_decode", |input| {
            call(encoding::converter::base64::decode(input, None))
        });
        engine.register_fn("base16_encode", |input| {
            call(encoding::converter::base16::encode(input, None))
        });
        engine.register_fn("base16_decode", |input| {
            call(encoding::converter::base16::decode(input, None))
        });
        engine.register_fn("base32_encode", |input| {
            call(encoding::converter::base32::encode(input, None))
        });
        engine.register_fn("base32_decode", |input| {
            call(encoding::converter::base32::decode(input, None))
        });

        engine.register_fn("base36_encode", |input| {
            call(encoding::converter::base36::encode(input, None))
        });
        engine.register_fn("base36_decode", |input| {
            call(encoding::converter::base36::decode(input, None))
        });

        engine.register_fn("base58_encode", |input| {
            call(encoding::converter::base58::encode(input, None))
        });
        engine.register_fn("base58_decode", |input| {
            call(encoding::converter::base58::decode(input, None))
        });

        engine.register_fn("base62_encode", |input| {
            call(encoding::converter::base62::encode(input, None))
        });
        engine.register_fn("base62_decode", |input| {
            call(encoding::converter::base62::decode(input, None))
        });
        engine.register_fn("base91_encode", |input| {
            call(encoding::converter::base91::encode(input, None))
        });
        engine.register_fn("base91_decode", |input| {
            call(encoding::converter::base91::decode(input, None))
        });
        engine.register_fn("base92_encode", |input| {
            call(encoding::converter::base92::encode(input, None))
        });
        engine.register_fn("base92_decode", |input| {
            call(encoding::converter::base92::decode(input, None))
        });
        engine.register_fn("base85_ascii85_encode", |input| {
            call(encoding::converter::base85_ascii85::encode(input, None))
        });
        engine.register_fn("base85_ascii85_decode", |input| {
            call(encoding::converter::base85_ascii85::decode(input, None))
        });

        engine.register_fn("base85_zero85_encode", |input| {
            call(encoding::converter::base85_zero85::encode(input, None))
        });
        engine.register_fn("base85_zero85_decode", |input| {
            call(encoding::converter::base85_zero85::decode(input, None))
        });

        engine.register_fn("caesar_encode", |input, args| {
            call(encoding::classical::caesar::encode(input, parse_args(args)))
        });

        engine.register_fn("caesar_decode", |input, args| {
            call(encoding::classical::caesar::decode(input, parse_args(args)))
        });

        engine.register_fn("railfence_encode", |input, args| {
            call(encoding::classical::railfence::encode(
                input,
                parse_args(args),
            ))
        });

        engine.register_fn("railfence_decode", |input, args| {
            call(encoding::classical::railfence::decode(
                input,
                parse_args(args),
            ))
        });

        engine.register_fn("md5_encode", |input| {
            call(encoding::crypto::md5::encode(input, None))
        });
        engine.register_fn("sha1_encode", |input| {
            call(encoding::crypto::sha1::encode(input, None))
        });
        engine.register_fn("sha256_encode", |input| {
            call(encoding::crypto::sha256::encode(input, None))
        });

        engine.register_fn("bignum_convert_string", |a| {
            call(encoding::asymmetric::bignum_wrapper::bignum_convert_string(a))
        });

        engine.register_fn("bignum_convert_hex", |a| {
            call(encoding::asymmetric::bignum_wrapper::bignum_convert_hex(a))
        });

        engine.register_fn("bignum_add", |a, b| {
            call(encoding::asymmetric::bignum_wrapper::bignum_add(a, b))
        });
        engine.register_fn("bignum_sub", |a, b| {
            call(encoding::asymmetric::bignum_wrapper::bignum_sub(a, b))
        });
        engine.register_fn("bignum_mul", |a, b| {
            call(encoding::asymmetric::bignum_wrapper::bignum_mul(a, b))
        });
        engine.register_fn("bignum_div", |a, b| {
            call(encoding::asymmetric::bignum_wrapper::bignum_div(a, b))
        });
        engine.register_fn("bignum_mod", |a, b| {
            call(encoding::asymmetric::bignum_wrapper::bignum_mod(a, b))
        });
        engine.register_fn("bignum_invert", |a, b| {
            call(encoding::asymmetric::bignum_wrapper::bignum_invert(a, b))
        });

        engine.register_fn("bignum_powm", |a, b, c| {
            call(encoding::asymmetric::bignum_wrapper::bignum_powm(a, b, c))
        });

        engine.register_fn("bignum_sqrt", |a|{
            call(encoding::asymmetric::bignum_wrapper::bignum_sqrt(a))
        });
        engine.register_fn("bignum_sqrt", |a, n|{
            call(encoding::asymmetric::bignum_wrapper::bignum_root(a, n))
        });

        engine.register_fn("bignum_gcd", |a, b| {
            call(encoding::asymmetric::bignum_wrapper::bignum_gcd(a, b))
        });
        engine.register_fn("bignum_gcdext", |a, b| {
            call(encoding::asymmetric::bignum_wrapper::bignum_gcdext(a, b))
        });

        engine.register_fn("bignum_lcm", |a, b| {
            call(encoding::asymmetric::bignum_wrapper::bignum_lcm(a, b))
        });
    }
}
