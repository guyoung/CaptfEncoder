// https://github.com/JoNil/ascii85

mod decode;
mod encode;

pub use decode::decode;
pub use encode::encode;

const TABLE: [u32; 5] = [85 * 85 * 85 * 85, 85 * 85 * 85, 85 * 85, 85, 1];