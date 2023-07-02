/// Maximum memory in bytes an interpreter can use.
pub const MAX_MEMORY: usize = 30000;

#[derive(Debug, Copy, Clone, Eq, PartialEq)]
pub enum Op {
    IncrementPtr,
    DecrementPtr,
    IncrementMemory,
    DecrementMemory,
    ReadByte,
    WriteByte,
    JumpForward,
    JumpBackward,
}

impl Op {
    fn from_char(character: char) -> Option<Self> {
        match character {
            '>' => Some(Op::IncrementPtr),
            '<' => Some(Op::DecrementPtr),
            '+' => Some(Op::IncrementMemory),
            '-' => Some(Op::DecrementMemory),
            '.' => Some(Op::WriteByte),
            ',' => Some(Op::ReadByte),
            '[' => Some(Op::JumpForward),
            ']' => Some(Op::JumpBackward),
            _ => None,
        }
    }
}

pub struct Program {
    pub instructions: Vec<Op>,
}

impl Program {
    pub fn from_string(string: &str) -> Self {
        let ops: Vec<Op> = string.chars().map(|c| -> Option<Op> { Op::from_char(c) }).filter_map(|x| x).collect();

        Program { instructions: ops }
    }

    pub fn find_matching_jump_end(&self, jump_start_pos: usize) -> usize {
        let mut pos = jump_start_pos;
        let mut level = 0;

        loop {
            match self.instructions[pos] {
                Op::JumpForward => level += 1,
                Op::JumpBackward => level -= 1,
                _ => (),
            }

            if level == 0 {
                return pos;
            }
            if pos >= self.instructions.len() {
                panic!("unbalanced parentheses")
            }
            pos += 1
        }
    }

    pub fn find_matching_jump_start(&self, jump_end_pos: usize) -> usize {
        let mut pos = jump_end_pos;
        let mut level = 0;

        loop {
            match self.instructions[pos] {
                Op::JumpForward => level -= 1,
                Op::JumpBackward => level += 1,
                _ => (),
            }

            if level == 0 {
                return pos;
            }
            if pos == 0 {
                panic!("unbalanced parentheses")
            }
            pos -= 1
        }
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn check_supported_ops() {
        let program = Program::from_string("><+-.,[]");

        assert_eq!(program.instructions[0], Op::IncrementPtr);
        assert_eq!(program.instructions[1], Op::DecrementPtr);
        assert_eq!(program.instructions[2], Op::IncrementMemory);
        assert_eq!(program.instructions[3], Op::DecrementMemory);
        assert_eq!(program.instructions[4], Op::WriteByte);
        assert_eq!(program.instructions[5], Op::ReadByte);
        assert_eq!(program.instructions[6], Op::JumpForward);
        assert_eq!(program.instructions[7], Op::JumpBackward);
    }

    #[test]
    fn ignores_comments() {
        let program = Program::from_string(">loop[-]");

        assert_eq!(program.instructions.len(), 4);
        assert_eq!(program.instructions[0], Op::IncrementPtr);
        assert_eq!(program.instructions[1], Op::JumpForward);
        assert_eq!(program.instructions[2], Op::DecrementMemory);
        assert_eq!(program.instructions[3], Op::JumpBackward);
    }

    #[test]
    fn find_matching_parentheses() {
        let program = Program::from_string("[[][]]");

        assert_eq!(program.find_matching_jump_end(0), 5);
        assert_eq!(program.find_matching_jump_start(5), 0);

        assert_eq!(program.find_matching_jump_end(3), 4);
        assert_eq!(program.find_matching_jump_start(4), 3);
    }
}