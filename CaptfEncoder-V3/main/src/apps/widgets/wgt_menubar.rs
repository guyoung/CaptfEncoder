use std::ops::{Deref, DerefMut};
use std::str;
use std::sync::atomic::{AtomicI32, Ordering};
use std::sync::Arc;

use fltk::{
    app,
    button::*,
    enums::{Align, Color, FrameType, Shortcut},
    frame::*,
    group::*,
    image::*,
    menu::*,
    prelude::*,
};

use crate::apps::AssetRes;

use crate::apps::extensions::*;
use crate::apps::scripts::*;

use crate::apps::message::Message;
use crate::apps::theme::ColorTheme;

pub struct WgtMenuBar {
    pub menu: MenuBar,
}

impl WgtMenuBar {
    pub fn new(
        s: &app::Sender<Message>,
        extensions: &Vec<Extension>,
        scripts: &Vec<Script>,
    ) -> Self {
        let mut menu = MenuBar::default();

        menu.set_frame(FrameType::FlatBox);
        menu.set_down_frame(FrameType::FlatBox);
        menu.set_text_size(16);
        menu.set_color(Color::Dark3);

        menu.add_emit(
            "File/New Window \t",
            Shortcut::Ctrl | 'n',
            MenuFlag::Normal,
            s.clone(),
            Message::NewWindow,
        );

        menu.add_emit(
            "File/Theme/Black \t",
            Shortcut::None,
            MenuFlag::Normal,
            s.clone(),
            Message::Theme(ColorTheme::Black),
        );

        menu.add_emit(
            "File/Theme/Dark \t",
            Shortcut::None,
            MenuFlag::Normal,
            s.clone(),
            Message::Theme(ColorTheme::Dark),
        );

        menu.add_emit(
            "File/Theme/Gray \t",
            Shortcut::None,
            MenuFlag::Normal,
            s.clone(),
            Message::Theme(ColorTheme::Gray),
        );

        menu.add_emit(
            "File/Theme/Shake \t",
            Shortcut::None,
            MenuFlag::Normal,
            s.clone(),
            Message::Theme(ColorTheme::Shake),
        );

        menu.add_emit(
            "File/Theme/Tan \t",
            Shortcut::None,
            MenuFlag::Normal,
            s.clone(),
            Message::Theme(ColorTheme::Tan),
        );

        menu.add_emit(
            //"&File/Quit \t",
            "File/Quit \t",
            Shortcut::Ctrl | 'q',
            MenuFlag::Normal,
            s.clone(),
            Message::Quit,
        );

        for extension in extensions {
            let label = format!("{} \t", extension.name);
            menu.add_emit(
                &label,
                Shortcut::None,
                MenuFlag::Normal,
                s.clone(),
                Message::Extension(extension.id.clone()),
            );
        }

        for script in scripts {
            let label = format!("Script/{} \t", script.name);
            menu.add_emit(
                &label,
                Shortcut::None,
                MenuFlag::Normal,
                s.clone(),
                Message::Script(script.id.clone()),
            );
        }

        menu.add_emit(
            "Help/Official Website \t",
            Shortcut::None,
            MenuFlag::Normal,
            s.clone(),
            Message::Browser("https://github.com/guyoung/CaptfEncoder".to_string()),
        );

        menu.add_emit(
            "Help/Submit Issuse \t",
            Shortcut::None,
            MenuFlag::MenuDivider,
            s.clone(),
            Message::Browser("https://github.com/guyoung/CaptfEncoder/issues".to_string()),
        );
        menu.add_emit(
            "Help/Systeminfo \t",
            Shortcut::None,
            MenuFlag::MenuDivider,
            s.clone(),
            Message::Systeminfo,
        );

        menu.add_emit(
            "Help/Check Update \t",
            Shortcut::None,
            MenuFlag::MenuDivider,
            s.clone(),
            Message::CheckUpdate,
        );

        menu.add_emit(
            //"&Help/About \t",
            "Help/About \t",
            Shortcut::None,
            MenuFlag::Normal,
            s.clone(),
            Message::About,
        );

        Self { menu: menu }
    }
}

impl Deref for WgtMenuBar {
    type Target = MenuBar;

    fn deref(&self) -> &Self::Target {
        &self.menu
    }
}

impl DerefMut for WgtMenuBar {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.menu
    }
}

pub struct WgtBarStart {
    pub grp: Group,
}
impl WgtBarStart {
    pub fn new(s: &app::Sender<Message>) -> Self {
        let grp = Group::new(0, 0, 200, 25, "");
        let mut sidebar_btn = Button::new(10, 10, 35, 20, "");
        let image_open = AssetRes::get("icon/sidebar.svg").unwrap();
        let image_open = str::from_utf8(image_open.data.as_ref()).unwrap();
        let mut image_open = SvgImage::from_data(image_open).unwrap();
        image_open.scale(18, 18, true, true);
        let image_close = AssetRes::get("icon/sidebarc.svg").unwrap();
        let image_close = str::from_utf8(image_close.data.as_ref()).unwrap();
        let mut image_close = SvgImage::from_data(image_close).unwrap();
        image_close.scale(18, 18, true, true);
        sidebar_btn.set_image(Some(image_close.clone()));
        sidebar_btn.set_frame(FrameType::NoBox);
        sidebar_btn.clear_visible_focus();
        sidebar_btn.set_tooltip("Show/Hide sidebar");
        let random = Arc::new(AtomicI32::new(1));
        sidebar_btn.set_callback({
            let x = s.clone();
            let t = random.clone();
            move |b| {
                let v = t.load(Ordering::SeqCst);
                if v == 0 {
                    t.store(1, Ordering::SeqCst);
                    b.set_image(Some(image_close.clone()));
                    x.send(Message::SideBar(t.load(Ordering::SeqCst)));
                    app::redraw();
                } else {
                    t.store(0, Ordering::SeqCst);
                    b.set_image(Some(image_open.clone()));
                    x.send(Message::SideBar(t.load(Ordering::SeqCst)));
                    app::redraw();
                }
            }
        });

        let mut terminal_btn = Button::new(150, 10, 35, 20, "");
        let image = AssetRes::get("icon/terminal.svg").unwrap();
        let image = str::from_utf8(image.data.as_ref()).unwrap();
        let mut image = SvgImage::from_data(image).unwrap();
        image.scale(16, 17, true, true);
        terminal_btn.set_image(Some(image));
        terminal_btn.set_frame(FrameType::NoBox);
        terminal_btn.clear_visible_focus();
        terminal_btn.set_tooltip("Open Terminal");
        terminal_btn.emit(s.clone(), Message::Terminal);

        grp.end();

        Self {
            grp
        }
    }
}

pub struct WgtBarMid {
    pub menu: Frame,
}

impl WgtBarMid {
    pub fn new() -> Self {
        let mut menu_bar = Frame::default();
        menu_bar.set_label_size(14);
        menu_bar.set_label_color(Color::from_rgb(255, 255, 255));
        Self { menu: menu_bar }
    }
}

pub struct WgtBarEnd {
    pub menu: Frame,
}

impl WgtBarEnd {
    pub fn new() -> Self {
        let mut menu_bar = Frame::default();
        menu_bar.set_label_size(14);
        menu_bar.set_label_color(Color::from_rgb(255, 255, 255));
        menu_bar.set_align(Align::Inside | Align::Right);
        Self { menu: menu_bar }
    }
}
