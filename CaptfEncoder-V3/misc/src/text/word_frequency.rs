// https://rosettacode.org/wiki/Word_frequency

use std::cmp::Reverse;
use std::collections::HashMap;
use std::fs::File;
use std::io::{BufRead, BufReader};
 

use regex::Regex;
 
fn word_count(file: File, n: usize) {
    let word_regex = Regex::new("(?i)[a-z']+").unwrap();
 
    let mut words = HashMap::new();
    for line in BufReader::new(file).lines() {
        word_regex
            .find_iter(&line.expect("Read error"))
            .map(|m| m.as_str())
            .for_each(|word| {
                *words.entry(word.to_lowercase()).or_insert(0) += 1;
            });
    }
 
    let mut words: Vec<_> = words.iter().collect();
    words.sort_unstable_by_key(|&(word, count)| (Reverse(count), word));
 
    for (word, count) in words.iter().take(n) {
        println!("{:8} {:>8}", word, count);
    }
}
 
fn main() {
    word_count(File::open("135-0.txt").expect("File open error"), 10)
}
