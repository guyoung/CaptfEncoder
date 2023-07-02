// https://rosettacode.org/wiki/Letter_frequency#Rust

use std::collections::btree_map::BTreeMap;
use std::{env, process};
use std::io::{self, Read, Write};
use std::fmt::Display;
use std::fs::File;
 
fn main() {
    let filename = env::args().nth(1)
        .ok_or("Please supply a file name")
        .unwrap_or_else(|e| exit_err(e, 1));
 
    let mut buf = String::new();
    let mut count = BTreeMap::new();
 
    File::open(&filename)
        .unwrap_or_else(|e| exit_err(e, 2))
        .read_to_string(&mut buf)
        .unwrap_or_else(|e| exit_err(e, 3));
 
 
    for c in buf.chars() {
        *count.entry(c).or_insert(0) += 1;
    }
 
    println!("Number of occurences per character");
    for (ch, count) in &count {
        println!("{:?}: {}", ch, count);
    }
}
 
#[inline]
fn exit_err<T>(msg: T, code: i32) -> ! where T: Display {
    writeln!(&mut io::stderr(), "{}", msg).expect("Could not write to stderr");
    process::exit(code)
}