use super::{Op, Program};
use std::fmt::{Debug, Error, Formatter};

/// Link (aka. pointer) to next operation in program graph.
type Link = Option<usize>;

/// Operations in intermediate representation.
#[derive(Debug, Copy, Clone)]
pub enum IrOp {
    Noop(Link),
    Right(Link, u8),
    Left(Link, u8),
    Add(Link, u8),
    Sub(Link, u8),
    SetIndirect(Link, u8),
    // offset, factor
    MulCopy(Link, i8, i8),
    Write(Link),
    Read(Link),
    // next, addr if 0
    JumpIfZero(Link, Link),
    // next, addr if not 0
    JumpIfNotZero(Link, Link),
}

impl IrOp {
    fn next(&self) -> Link {
        return match self {
            IrOp::Noop(l) => l,
            IrOp::Right(l, _) => l,
            IrOp::Left(l, _) => l,
            IrOp::Add(l, _) => l,
            IrOp::Sub(l, _) => l,
            IrOp::SetIndirect(l, _) => l,
            IrOp::MulCopy(l, _, _) => l,
            IrOp::Write(l) => l,
            IrOp::Read(l) => l,
            IrOp::JumpIfZero(l, _) => l,
            IrOp::JumpIfNotZero(l, _) => l,
        }
        .clone();
    }
}

/// Graph representation of program using intermediate representation with IrOps.
pub struct IrCode {
    pub ops: Vec<IrOp>,
}

impl IrCode {
    pub fn new(program: &Program) -> Self {
        let mut ops: Vec<IrOp> = Vec::new();
        for (idx, op) in program.instructions.iter().enumerate() {
            let is_last = program.instructions.len() - 1 == idx;
            let next = if is_last { None } else { Some(idx + 1) };

            ops.push(match op {
                Op::IncrementPtr => IrOp::Right(next, 1),
                Op::DecrementPtr => IrOp::Left(next, 1),
                Op::IncrementMemory => IrOp::Add(next, 1),
                Op::DecrementMemory => IrOp::Sub(next, 1),
                Op::ReadByte => IrOp::Read(next),
                Op::WriteByte => IrOp::Write(next),
                Op::JumpForward => {
                    IrOp::JumpIfZero(next, Some(program.find_matching_jump_end(idx) + 1))
                }
                Op::JumpBackward => {
                    IrOp::JumpIfNotZero(next, Some(program.find_matching_jump_start(idx)))
                }
            })
        }

        IrCode { ops }
    }

    fn find_replacement(&self, current_idx: usize) -> Vec<IrOp> {
        let current = self.ops.get(current_idx).expect("current not found");
        let next_idx = match current.next() {
            Some(t) => t,
            None => return vec![*current],
        };
        let next = self.ops.get(next_idx).expect("next not found");
        let subsequent_idx = next.next();

        // three consecutive ops
        if let Some(t) = subsequent_idx {
            if let Some(t) = IrCode::find_three_consecutive(
                current,
                next,
                self.ops.get(t).expect("subsequent not found"),
            ) {
                return vec![t];
            }
        }

        // two consecutive ops
        if let Some(t) = IrCode::find_two_consecutive(current, next) {
            return vec![t];
        }

        // multiplication loop
        if let IrOp::JumpIfZero(_, _) = current {
            if let Some(t) = self.find_multiplication_loop(current) {
                return t;
            }
        }

        // nothing to optimize
        vec![*current]
    }

    fn find_three_consecutive(current: &IrOp, next: &IrOp, subsequent: &IrOp) -> Option<IrOp> {
        return match (current, next, subsequent) {
            (IrOp::JumpIfZero(_, _), IrOp::Sub(_, 1), IrOp::JumpIfNotZero(far, _)) => {
                Some(IrOp::SetIndirect(*far, 0))
            }
            (IrOp::JumpIfZero(_, _), IrOp::Add(_, 1), IrOp::JumpIfNotZero(far, _)) => {
                Some(IrOp::SetIndirect(*far, 0))
            }
            _ => None,
        };
    }

    fn find_two_consecutive(current: &IrOp, next: &IrOp) -> Option<IrOp> {
        return match (current, next) {
            (IrOp::Add(_, x), IrOp::Add(far, y)) => Some(IrOp::Add(*far, *x + *y)),
            (IrOp::Sub(_, x), IrOp::Sub(far, y)) => Some(IrOp::Sub(*far, *x + *y)),
            (IrOp::Sub(_, x), IrOp::Add(far, y)) => {
                let result = *y as i8 - *x as i8;
                Some(if result > 0 {
                    IrOp::Add(*far, result as u8)
                } else {
                    IrOp::Sub(*far, -result as u8)
                })
            }
            (IrOp::Add(_, x), IrOp::Sub(far, y)) => {
                let result = *x as i8 - *y as i8;
                Some(if result > 0 {
                    IrOp::Add(*far, result as u8)
                } else {
                    IrOp::Sub(*far, -result as u8)
                })
            }

            (IrOp::Right(_, x), IrOp::Right(far, y)) => Some(IrOp::Right(*far, *x + *y)),
            (IrOp::Left(_, x), IrOp::Left(far, y)) => Some(IrOp::Left(*far, *x + *y)),
            (IrOp::Right(_, x), IrOp::Left(far, y)) => {
                let result = *x as i8 - *y as i8;
                Some(if result > 0 {
                    IrOp::Right(*far, result as u8)
                } else {
                    IrOp::Left(*far, -result as u8)
                })
            }
            (IrOp::Left(_, x), IrOp::Right(far, y)) => {
                let result = *y as i8 - *x as i8;
                Some(if result > 0 {
                    IrOp::Right(*far, result as u8)
                } else {
                    IrOp::Left(*far, -result as u8)
                })
            }

            (IrOp::SetIndirect(_, c), IrOp::Add(far, x)) => Some(IrOp::SetIndirect(*far, c + x)),
            (IrOp::SetIndirect(_, c), IrOp::Sub(far, x)) => {
                Some(IrOp::SetIndirect(*far, c.wrapping_sub(*x)))
            }

            (IrOp::Add(_, _), IrOp::SetIndirect(far, c)) => Some(IrOp::SetIndirect(*far, *c)),
            (IrOp::Sub(_, _), IrOp::SetIndirect(far, c)) => Some(IrOp::SetIndirect(*far, *c)),

            (IrOp::SetIndirect(_, _), IrOp::SetIndirect(far, c)) => {
                Some(IrOp::SetIndirect(*far, *c))
            }

            (IrOp::SetIndirect(_, 0), IrOp::JumpIfZero(x, y)) => Some(IrOp::JumpIfZero(*x, *y)),

            (IrOp::Add(_, _), IrOp::Read(far)) => Some(IrOp::Read(*far)),
            (IrOp::Sub(_, _), IrOp::Read(far)) => Some(IrOp::Read(*far)),
            (IrOp::SetIndirect(_, _), IrOp::Read(far)) => Some(IrOp::Read(*far)),

            (_, _) => None,
        };
    }

    fn find_multiplication_loop(&self, current: &IrOp) -> Option<Vec<IrOp>> {
        if let IrOp::JumpIfZero(_, _) = current {
        } else {
            return None;
        }

        let mut iter = Iter {
            ir_code: self,
            idx: current.next()?,
        }; /* None: next does not exists */

        // we are matching patterns like: [sub(1), right(1), add(3), right(1), add(7), left(2)]
        // we will record adds for different offsets by interpreting the code at compile time
        // if we subtract more than 1, this is not clear-loop and so cannot be multiplication
        // loop. if offset is at the end different from zero, this is not multiplication loop.
        // if we see any other instructions, we return none too.

        let mut offset: i8 = 0;
        let mut factors: [i16; 256] = [0; 256];
        let far_op: Option<usize>;

        loop {
            let current = match iter.next() {
                Some(t) => t,
                None => return None,
            };

            match current {
                IrOp::Right(_, data) => offset += *data as i8,
                IrOp::Left(_, data) => offset -= *data as i8,
                IrOp::Add(_, data) => {
                    let idx = offset as usize + 128;
                    factors[idx] += i16::from(*data)
                }
                IrOp::Sub(_, data) => {
                    let idx = offset as usize + 128;
                    factors[idx] -= i16::from(*data)
                }
                IrOp::JumpIfNotZero(far, _) => {
                    far_op = *far;
                    break;
                }
                _ => return None, // None: does not match pattern
            }
        }

        if factors[128] != -1 {
            return None;
        } /* None: we must subtract exactly one from original cell to be clear loop */
        if offset != 0 {
            return None;
        } /* None: lefts/rights unbalanced - would not be clear loop */

        // all seems good, lets emit instructions
        let mut op_idx = self.ops.len();
        let mut generated: Vec<IrOp> = factors
            .iter()
            .enumerate()
            .filter(|(offset, factor)| *offset != 128 && **factor != 0)
            .map(|(idx, factor)| {
                let offset = idx as i16 - 128;
                let r = IrOp::MulCopy(Some(op_idx), offset as i8, *factor as i8);
                op_idx += 1;
                r
            })
            .collect();

        generated.push(IrOp::SetIndirect(far_op, 0));

        Some(generated)
    }

    fn optimize_program_once(&mut self) -> usize {
        let mut idx = 0;
        let mut len = 0;

        loop {
            if idx == std::usize::MAX {
                return len;
            }

            let replacement = self.find_replacement(idx);
            let first = replacement
                .first()
                .expect("find_replacement returned empty vector");
            let last = replacement.last().unwrap();

            // push new instructions to ops array (links should be set-up by find_replacement)
            replacement.iter().skip(1).for_each(|x| self.ops.push(*x));

            let next_idx = match last.next() {
                Some(t) => t,
                None => std::usize::MAX,
            };
            self.ops[idx] = *first;
            idx = next_idx;
            len += 1;
        }
    }

    pub fn optimize(&mut self) {
        let mut old = self.optimize_program_once();

        loop {
            let new = self.optimize_program_once();
            if new >= old {
                break;
            }
            old = new;
        }
    }

    pub fn iter(&self) -> Iter {
        Iter {
            ir_code: &self,
            idx: 0,
        }
    }

    // O(n)
    pub fn len(&self) -> usize {
        self.iter().count()
    }
}

pub struct Iter<'a> {
    ir_code: &'a IrCode,
    idx: usize,
}

impl<'a> Iterator for Iter<'a> {
    type Item = &'a IrOp;

    fn next(&mut self) -> Option<Self::Item> {
        self.ir_code.ops.get(self.idx).map(|t| {
            self.idx = t.next().unwrap_or(std::usize::MAX); // proceed or point to invalid idx
            t
        })
    }
}

impl Debug for IrCode {
    fn fmt(&self, f: &mut Formatter) -> Result<(), Error> {
        let mut current = self.ops.get(0);

        f.write_str("IrCode {\n")?;

        loop {
            if current.is_none() {
                break;
            }

            let next = current.unwrap().next();

            f.write_fmt(format_args!("\t{:?},\n", current))?;
            current = next.and_then(|x| self.ops.get(x));
        }

        f.write_str("}\n")?;
        Ok(())
    }
}
