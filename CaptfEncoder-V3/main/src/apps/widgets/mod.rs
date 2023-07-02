#[allow(dead_code)]
use std::num::ParseIntError;

mod wgt_encoder;
mod wgt_encoder_encode;
pub(crate) mod wgt_encoder_handle;
pub(crate) mod wgt_encoder_menu;

mod wgt_executor;
pub(crate) mod wgt_executor_handle;
mod wgt_executor_infile;
mod wgt_executor_inimage;
pub(crate) mod wgt_executor_menu;
mod wgt_executor_outimage;
mod wgt_image;
pub(crate) mod wgt_option;
pub(crate) mod wgt_option_comp;

mod wgt_script_runner;

mod wgt_about_dialog;
mod wgt_check_update_dialog;
mod wgt_menubar;
mod wgt_search;
mod wgt_systeminfo_dialog;
mod wgt_tabs;
pub(crate) mod wgt_editor_dnd;

mod wgt_terminal;

pub use wgt_option_comp::{
    WgtOptionComp, WgtOptionNumber, WgtOptionSelect, WgtOptionText, WgtOptionTextarea,
};

pub use wgt_about_dialog::WgtAboutDialog;
pub use wgt_check_update_dialog::WgtCheckUpdateDialog;
pub use wgt_image::WgtImage;
pub use wgt_menubar::{WgtBarEnd, WgtBarMid, WgtBarStart, WgtMenuBar};
pub use wgt_search::WgtSearch;
pub use wgt_systeminfo_dialog::WgtSysteminfoDialog;
pub use wgt_tabs::WgtClosableTab;

pub use wgt_script_runner::WgtScriptRunner;

pub use wgt_encoder::WgtEncoder;

pub use wgt_encoder_encode::WgtEncoderEncode;

pub use wgt_executor::WgtExecutor;

pub use wgt_executor_infile::WgtExecutorInfile;

pub use wgt_executor_inimage::WgtExecutorInimage;

pub use wgt_executor_outimage::WgtExecutorOutimage;

pub use wgt_terminal::WgtTerminal;

pub fn from_hex(s: &str) -> Result<Vec<u8>, ParseIntError> {
    (0..s.len())
        .step_by(2)
        .map(|i| u8::from_str_radix(&s[i..i + 2], 16))
        .collect()
}
