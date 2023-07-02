use super::{Op, Program, MAX_MEMORY};
use std::{
    io::{Read, Write},
    num::Wrapping,
};

pub struct Interpreter<'a, R: Read, W: Write> {
    pub program_counter: usize,
    pub memory_pointer: usize,
    pub program: &'a Program,
    pub memory: [u8; MAX_MEMORY],
    pub input: R,
    pub output: W,
}

impl<'a, R: Read, W: Write> Interpreter<'a, R, W> {
    #[inline]
    pub fn memory_at(&self, address: usize) -> u8 {
        self.memory[address]
    }

    pub fn interpret(&mut self) {
        while self.program_counter < self.program.instructions.len() {
            match &self.program.instructions[self.program_counter] {
                Op::IncrementPtr => self.memory_pointer += 1,
                Op::DecrementPtr => self.memory_pointer -= 1,
                Op::IncrementMemory => {
                    self.memory[self.memory_pointer] =
                        (Wrapping(self.memory[self.memory_pointer]) + Wrapping(1)).0
                }
                Op::DecrementMemory => {
                    self.memory[self.memory_pointer] =
                        (Wrapping(self.memory[self.memory_pointer]) - Wrapping(1)).0
                }
                Op::ReadByte => self.memory[self.memory_pointer] = self.read_byte_from_input(),
                Op::WriteByte => self.write_byte_to_output(self.memory_at(self.memory_pointer)),
                Op::JumpForward => self.op_jump_forward(),
                Op::JumpBackward => self.op_jump_backward(),
            }
            self.program_counter += 1
        }
    }

    fn read_byte_from_input(&mut self) -> u8 {
        let mut buff: [u8; 1] = [0; 1];

        if let Err(e) = self.input.read_exact(&mut buff) {
            panic!("cannot read from input: {}", e);
        }
        buff[0]
    }

    fn write_byte_to_output(&mut self, byte: u8) {
        self.output
            .write_all(&[byte])
            .expect("cannot write to output");
    }

    fn op_jump_forward(&mut self) {
        if self.memory_at(self.memory_pointer) == 0 {
            let end = self.program.find_matching_jump_end(self.program_counter);
            self.program_counter = end;
        }
    }

    fn op_jump_backward(&mut self) {
        if self.memory_at(self.memory_pointer) != 0 {
            let begin = self.program.find_matching_jump_start(self.program_counter);
            self.program_counter = begin - 1; // need to jump before Op::JumpForward
        }
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use std::io::{Cursor, Stdin, Stdout};

    fn make_interpreter(program: &Program) -> Interpreter<Stdin, Stdout> {
        return Interpreter {
            program_counter: 0,
            program: &program,
            memory_pointer: 0,
            memory: [0; MAX_MEMORY],
            input: std::io::stdin(),
            output: std::io::stdout(),
        };
    }

    #[test]
    fn increment_memory() {
        let program = Program::from_string("+++");
        let mut vm = make_interpreter(&program);
        vm.interpret();

        assert_eq!(vm.memory_at(0), 3);
        assert_eq!(vm.memory_at(1), 0);
        assert_eq!(vm.memory_at(2), 0);
    }

    #[test]
    fn decrement_memory() {
        let program = Program::from_string("+++--");
        let mut vm = make_interpreter(&program);
        vm.interpret();

        assert_eq!(vm.memory_at(0), 1);
        assert_eq!(vm.memory_at(1), 0);
        assert_eq!(vm.memory_at(2), 0);
    }

    #[test]
    fn move_ptr() {
        let program = Program::from_string("+++>++>+<-");
        let mut vm = make_interpreter(&program);
        vm.interpret();

        assert_eq!(vm.memory_at(0), 3);
        assert_eq!(vm.memory_at(1), 1);
        assert_eq!(vm.memory_at(2), 1);
    }

    #[test]
    fn loops_work() {
        let program = Program::from_string("+>+++[-]");
        let mut vm = make_interpreter(&program);
        vm.interpret();

        assert_eq!(vm.memory_at(0), 1);
        assert_eq!(vm.memory_at(1), 0);
        assert_eq!(vm.memory_at(2), 0);
    }

    #[test]
    fn can_read_input() {
        let program = Program::from_string(",>,>,");
        let mut vm = Interpreter {
            program_counter: 0,
            program: &program,
            memory_pointer: 0,
            memory: [0; MAX_MEMORY],
            input: Cursor::new(b"abc"),
            output: std::io::stdout(),
        };
        vm.interpret();

        assert_eq!(vm.memory_at(0), b'a');
        assert_eq!(vm.memory_at(1), b'b');
        assert_eq!(vm.memory_at(2), b'c');
    }

    #[test]
    fn can_write_output() {
        let program = Program::from_string("++++++++[->+++++++<]>.");
        let mut data = Vec::new();
        let mut vm = Interpreter {
            program_counter: 0,
            program: &program,
            memory_pointer: 0,
            memory: [0; MAX_MEMORY],
            input: std::io::stdin(),
            output: &mut data,
        };
        vm.interpret();

        assert_eq!(vm.memory_at(1), b'8');
        assert_eq!(vm.memory_at(2), 0);
        assert_eq!(data[0], b'8');
    }

    #[test]
    fn can_run_pi_bf() {
        let pi_program = Program::from_string(
            ">  +++++ +++++ +++++
[<+>>>>>>>>++++++++++<<<<<<<-]>+++++[<+++++++++>-]+>>>>>>+[<<+++[>>[-<]<[>]<-]>>
[>+>]<[<]>]>[[->>>>+<<<<]>>>+++>-]<[<<<<]<<<<<<<<+[->>>>>>>>>>>>[<+[->>>>+<<<<]>
>>>>]<<<<[>>>>>[<<<<+>>>>-]<<<<<-[<<++++++++++>>-]>>>[<<[<+<<+>>>-]<[>+<-]<++<<+
>>>>>>-]<<[-]<<-<[->>+<-[>>>]>[[<+>-]>+>>]<<<<<]>[-]>+<<<-[>>+<<-]<]<<<<+>>>>>>>
>[-]>[<<<+>>>-]<<++++++++++<[->>+<-[>>>]>[[<+>-]>+>>]<<<<<]>[-]>+>[<<+<+>>>-]<<<
<+<+>>[-[-[-[-[-[-[-[-[-<->[-<+<->>]]]]]]]]]]<[+++++[<<<++++++++<++++++++>>>>-]<
<<<+<->>>>[>+<<<+++++++++<->>>-]<<<<<[>>+<<-]+<[->-<]>[>>.<<<<[+.[-]]>>-]>[>>.<<
-]>[-]>[-]>>>[>>[<<<<<<<<+>>>>>>>>-]<<-]]>>[-]<<<[-]<<<<<<<<]++++++++++.",
        );
        let mut data = Vec::new();
        let mut vm = Interpreter {
            program_counter: 0,
            program: &pi_program,
            memory_pointer: 0,
            memory: [0; MAX_MEMORY],
            input: std::io::stdin(),
            output: &mut data,
        };
        vm.interpret();

        assert_eq!(data[0], b'3');
        assert_eq!(data[1], b'.');
        assert_eq!(data[2], b'1');
        assert_eq!(data[3], b'4');
        assert_eq!(data[4], b'0');
        assert_eq!(data[5], b'7');
        assert_eq!(data[6], b'0');
        assert_eq!(data[7], b'4');
        assert_eq!(data[8], b'5');
        assert_eq!(data[9], b'5');
        assert_eq!(data[10], b'2');
        assert_eq!(data[11], b'8');
        assert_eq!(data[12], b'2');
        assert_eq!(data[13], b'8');
        assert_eq!(data[14], b'8');
        assert_eq!(data[15], b'5');
    }
}
