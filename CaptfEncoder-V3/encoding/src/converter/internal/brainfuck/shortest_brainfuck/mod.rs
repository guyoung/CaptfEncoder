// https://github.com/oovm/brainfuck-shortest

use std::collections::HashMap;

pub fn digits_map() -> HashMap<&'static str, &'static str> {
    let mut h = HashMap::new();
    h.insert("0", "-[>+<-----]>---.");
    h.insert("1", "-[>+<-----]>--.");
    h.insert("2", "-[>+<-----]>-.");
    h.insert("3", "-[>+<-----]>.");
    h.insert("4", "-[>+<-----]>+.");
    h.insert("5", "-[>+<-----]>++.");
    h.insert("6", "-[>+<-----]>+++.");
    h.insert("7", "-[++>+[+<]>]>-.");
    h.insert("8", "-[++>+[+<]>]>.");
    h.insert("9", "-[++>+[+<]>]>+.");
    return h;
}

pub fn lowercase_map() -> HashMap<&'static str, &'static str> {
    let mut h = HashMap::new();
    h.insert("a", "+[-[---<]>>-]<-.");
    h.insert("b", "+[-[---<]>>-]<.");
    h.insert("c", "-[--[<]>+>-]<.");
    h.insert("d", "-[>++<-----]>--.");
    h.insert("e", "-[>++<-----]>-.");
    h.insert("f", "-[>++<-----]>.");
    h.insert("g", "-[>++<-----]>+.");
    h.insert("h", "+[->-[<]>--]>-.");
    h.insert("i", "+[->-[<]>--]>.");
    h.insert("j", "+[->-[<]>--]>+.");
    h.insert("k", "+[++[++>]<<+]>.");
    h.insert("l", "+[++[++>]<<+]>+.");
    h.insert("m", "+[->-[<]>+>--]>.");
    h.insert("n", "-[>--<-------]>.");
    h.insert("o", "+[+>+[<]>->]<.");
    h.insert("p", "+[+>+[<]>->]<+.");
    h.insert("q", "-[+>+++++[<]>+]>.");
    h.insert("r", "+[-->++[<]>-]>.");
    h.insert("s", "+[->->-[<]>--]>.");
    h.insert("t", "+[->->-[-<]>-]>.");
    h.insert("u", "+[->>-[-<+<]>]>.");
    h.insert("v", "----[>+++++<--]>.");
    h.insert("w", "------[>+++<--]>.");
    h.insert("x", "+[>+[<]>->+]<-.");
    h.insert("y", "+[>+[<]>->+]<.");
    h.insert("z", "----[>+++<--]>.");
    return h;
}

pub fn uppercase_map() -> HashMap<&'static str, &'static str> {
    let mut h = HashMap::new();
    h.insert("A", "+[+[<]>>+<+]>.");
    h.insert("B", "--[++>+[<]>+]>.");
    h.insert("C", "+[->-[--<]>-]>.");
    h.insert("D", "+[->-[--<]>-]>+.");
    h.insert("E", "+[->-[--<]>-]>++.");
    h.insert("F", "-[+[>---<<]>+]>.");
    h.insert("G", "-[>+<-------]>--.");
    h.insert("H", "-[>+<-------]>-.");
    h.insert("I", "-[>+<-------]>.");
    h.insert("J", "-[>+<-------]>+.");
    h.insert("K", "-[>+<-------]>++.");
    h.insert("L", "+[+<[-<]>>++]<.");
    h.insert("M", "+++[[-<]>>--]<.");
    h.insert("N", "+[+[>>+<+<-]>]>.");
    h.insert("O", "-[+>++[++<]>]>-.");
    h.insert("P", "-[+>++[++<]>]>.");
    h.insert("Q", "-[>+<---]>----.");
    h.insert("R", "-[>+<---]>---.");
    h.insert("S", "-[>+<---]>--.");
    h.insert("T", "-[>+<---]>-.");
    h.insert("U", "-[>+<---]>.");
    h.insert("V", "-[>+<---]>+.");
    h.insert("W", "-[>+<---]>++.");
    h.insert("X", "-[+[+<]>>+]<.");
    h.insert("Y", "-[+[+<]>>+]<+.");
    h.insert("Z", "-[+[+<]>>+]<++.");
    return h;
}

pub fn shortest_map() -> HashMap<&'static str, &'static str> {
    digits_map().into_iter().chain(lowercase_map()).chain(uppercase_map()).collect()
}