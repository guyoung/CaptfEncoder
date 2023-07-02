// https://rosettacode.org/wiki/Reverse_a_string#Rust

// Reversing ASCII byte-slice (in-place): 
let mut buffer = b"abcdef".to_vec();
buffer.reverse();
assert_eq!(buffer, b"fedcba");

// Reversing Unicode scalar values: 
let output: String = "一二三四五六七八九十".chars().rev().collect();
assert_eq!(output, "十九八七六五四三二一");


// Reversing a Chars iterator doesn't solve the complete problem, because it iterates unicode scalar values, which doesn't account for combining marks: 
let output: String = "as⃝df̅".chars().rev().collect();
assert_ne!(output, "f̅ds⃝a"); // should be this
assert_eq!(output, "̅fd⃝sa");

// Reversing graphemes clusters, which is provided by the unicode-segmentation crate, solves the problem: 
use unicode_segmentation::UnicodeSegmentation;
 
let output: String = "as⃝df̅".graphemes(true).rev().collect();
assert_eq!(output, "f̅ds⃝a");