// https://github.com/oovm/crypto-moe/tree/master/projects/crypto-brainfuck

mod shortest_brainfuck;
mod utils;

use shortest_brainfuck::shortest_map;
use utils::{Interpreter, Program, MAX_MEMORY};

#[derive(Debug)]
pub struct MemoryLayout {
    head: String,
    layout: Vec<u8>,
    index: usize,
}

pub fn get_memory_layout(p: &str) -> MemoryLayout {
    let pi_program = Program::from_string(p);
    let mut data = Vec::new();
    let mut vm = Interpreter {
        program_counter: 0,
        program: &pi_program,
        memory_pointer: 10,
        memory: [0; MAX_MEMORY],
        input: std::io::stdin(),
        output: &mut data,
    };
    vm.interpret();
    MemoryLayout {
        head: p.to_string(),
        layout: vm.memory[0..(vm.memory_pointer + 10)].to_owned(),
        index: vm.memory_pointer,
    }
}

impl MemoryLayout {
    fn abs(&self, a: usize, b: usize) -> usize {
        if a >= b {
            a - b
        } else {
            b - a
        }
    }

    fn rem(&self, a: i16, b: i16) -> i16 {
        if b - a > 128 {
            256 - b + a
        } else {
            b - a
        }
    }
    // distance[{pos_, target_, value_, {index_}}] := Abs[pos - index] + mod[Min[value, target], Max[value, target]];
    fn distance(&self, pos: usize, index: usize, target: u8, value: u8) -> usize {
        self.abs(pos, index) + self.rem(value.min(target) as i16, value.max(target) as i16) as usize
    }
    fn append(&mut self, record: (usize, usize, u8, u8)) {
        self.head.push('\n');
        let (pos, index, target, value) = record;
        if pos < index {
            self.head.push_str(&">".repeat(index - pos))
        } else if pos > index {
            self.head.push_str(&"<".repeat(pos - index))
        };
        if value < target {
            self.head.push_str(&"+".repeat((target - value) as usize))
        } else if value > target {
            self.head.push_str(&"-".repeat((value - target) as usize))
        }
        self.head.push('.');
    }

    fn update(&mut self, target: &u8) {
        let mut min = self.index + 255;
        let mut record = (0, 0, 0, 0);

        for (index, value) in self.layout.iter().enumerate() {
            let d = self.distance(self.index, index, *target, *value);
            if d < min {
                record = (self.index, index, *target, *value);
                min = d
            }
        }

        self.append(record);
        self.index = record.1;
        self.layout[self.index] = *target
    }

    fn encode(&mut self, target: &str) -> String {
        for c in target.as_bytes() {
            self.update(c)
        }
        return self.head.clone();
    }
}

pub const INITIALIZATIONS: &[&str; 18] = &[
    "-[[<+>->+>+<<]>]",
    "+[[<+>->+>+<<]>]",
    "--[[<+>->+>+<<]>]",
    "++[[<+>->+>+<<]>]",
    "-[[<+>->+>--->-<<<]>+++]",
    "+<-[[<+>->+>--->-<<<]>++]",
    "-<++[[<+>->->+++>+<<<]->]",
    "+<<+[+[<+>--->->->-<<<]>]",
    "-<<+[+[<+>--->->->-<<<]>]",
    "+[++[<+++>->+++<]>+++++++]",
    "+<-[[<+>->+>--->-<<<]>+++]",
    "++<-[[<+>->+>--->-<<<]>+++]",
    "-[++[<++>->+++>+++<<]--->+]",
    "-<-<<+[+[<+>--->->->-<<<]>]",
    "-[++[<++>->+++>+++<<]---->+]",
    "--<-<<+[+[<+>--->->->-<<<]>]",
    "+[+[<<<+>>>>]",
    "+[>>>->-[>->----<<<]>>]",
];

pub fn encode(input: &str) -> String {
    if let Some(s) = shortest_map().get(input) {
        return s.to_string();
    };
    INITIALIZATIONS
        .iter()
        .map(|&o| get_memory_layout(o).encode(input))
        .min_by(|x, y| x.len().cmp(&y.len()))
        .unwrap()
}

pub fn decode(input: &str) -> String {
    let mut data = Vec::new();
    let mut vm = Interpreter {
        program_counter: 0,
        program: &Program::from_string(input),
        memory_pointer: 10,
        memory: [0; MAX_MEMORY],
        input: std::io::stdin(),
        output: &mut data,
    };
    vm.interpret();
    match String::from_utf8(data) {
        Ok(o) => o,
        Err(e) => e.to_string(),
    }
}
