use crate::apps::theme::ColorTheme;

#[derive(Clone, Debug)]
pub enum Message {    
    Extension(String),
    Script(String),
    SideBar(i32),
    ActiveTab(i32),
    CloseTab(i32),
    Theme(ColorTheme),
    Browser(String),
    NewWindow,
    About,
    Systeminfo,
    CheckUpdate,
    Terminal,
    Quit,
}
