// https://rosettacode.org/wiki/Show_ASCII_table#Rust

fn main() {
    for i in 0u8..16 {
        for j in ((32+i)..128).step_by(16) {
            let k = (j as char).to_string();
            print!("{:3} : {:<3}   ", j, match j {
                32 => "Spc",
                127 => "Del",
                _ => &k,
            });
        }
        println!();
    }
}