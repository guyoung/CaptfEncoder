// https://rosettacode.org/wiki/Run-length_encoding#Rust
// Run-length encoding
// https://en.wikipedia.org/wiki/Run-length_encoding


fn encode(s: &str) -> String {
    s.chars()
        // wrap all values in Option::Some
        .map(Some)
        // add an Option::None onto the iterator to clean the pipeline at the end
        .chain(std::iter::once(None))
        .scan((0usize, '\0'), |(n, c), elem| match elem {
            Some(elem) if *n == 0 || *c == elem => {
                // the run continues or starts here
                *n += 1;
                *c = elem;
                // this will not have an effect on the final string because it is empty
                Some(String::new())
            }
            Some(elem) => {
                // the run ends here
                let run = format!("{}{}", n, c);
                *n = 1;
                *c = elem;
                Some(run)
            }
            None => {
                // the string ends here
                Some(format!("{}{}", n, c))
            }
        })
        // concatenate together all subresults
        .collect()
}
 
fn decode(s: &str) -> String {
    s.chars()
        .fold((0usize, String::new()), |(n, text), c| {
            if c.is_ascii_digit() {
                // some simple number parsing
                (
                    n * 10 + c.to_digit(10).expect("invalid encoding") as usize,
                    text,
                )
            } else {
                // this must be the character that is repeated
                (0, text + &format!("{}", c.to_string().repeat(n)))
            }
        })
        .1
}
 
fn main() {
    let text = "WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW";
    let encoded = encode(text);
    let decoded = decode(&encoded);
 
    println!("original: {}\n encoded: {}\n decoded: {}", text, encoded, decoded);
    assert_eq!(text, decoded);
}