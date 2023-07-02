use std::process;

use fltk::{
    app, dialog,
    enums::{Color, Event, FrameType},
    group::*,
    image::*,   
    prelude::*,
    window::*,
};

use fltk_theme::{color_themes, ColorTheme};

use webbrowser;

use crate::apps::AssetRes;

use crate::apps::extensions::*;
use crate::apps::scripts::*;

use crate::apps::message::Message;
use crate::apps::theme;

use crate::apps::widgets::{
    WgtAboutDialog, WgtBarEnd, WgtBarMid, WgtBarStart, WgtCheckUpdateDialog, WgtClosableTab,
    WgtMenuBar, WgtScriptRunner, WgtSearch, WgtSysteminfoDialog, WgtTerminal,
};

pub struct Bootstrap {
    app: app::App,   
    sender: app::Sender<Message>,
    receive: app::Receiver<Message>, 
    main: Flex,
    search: WgtSearch,
    tabs: WgtClosableTab,
    tab_count: i32,
    bar_end: WgtBarEnd,
    extension_manager: ExtensionManager,
    script_manager: ScriptManager,
}

const INITIAL_WINDOW_WIDH: i32 = 640;
const INITIAL_WINDOW_HEIGHT: i32 = 600;

impl Bootstrap {
    pub fn new() -> Self {
        let (s, r) = app::channel::<Message>();

        let extension_manager = ExtensionManager::new();
        let script_manager = ScriptManager::new();

        let app = app::App::default().with_scheme(app::Scheme::Gtk);

        let theme = ColorTheme::new(color_themes::DARK_THEME);
        theme.apply();

        // global theming
        //app::background(r, g, b); // background color. For input/output and text widgets, use app::background2
        //app::foreground(20, 20, 20); // labels
        //app::set_font(enums::Font::Courier);
        app::set_font_size(15);
        //app::set_frame_type(enums::FrameType::RFlatBox);
        app::set_visible_focus(false);

        let mut main_win_height = INITIAL_WINDOW_HEIGHT;
        if app::screen_size().1 > 720.0 {
            main_win_height = (app::screen_size().1 - 120.0) as i32;
        }

        let mut main_win = Window::default()
            .with_size(INITIAL_WINDOW_WIDH, main_win_height)
            .center_screen()
            .with_label("CaptfEncoder V3");

        main_win.set_color(Color::Dark3);
        main_win.set_selection_color(Color::Selection);

        main_win.make_resizable(true);
        main_win.set_frame(FrameType::FlatBox);
        let img = AssetRes::get("icon/app.png").unwrap();
        let img = PngImage::from_data(img.data.as_ref()).unwrap();
        main_win.set_icon(Some(img));

        let mut container = Flex::default_fill().column();

        let main_menu = WgtMenuBar::new(&s, &extension_manager.extensions, &script_manager.scripts);
        container.set_size(&main_menu.menu, 25);

        let main = Flex::default_fill().row();
 
        let mut tile = Tile::new(0, 0, main.width() - 10, main.height(), "");

        let mut search = WgtSearch::new(&s, &extension_manager.extensions);
        search.flex.resize(0, 0, 0, main.height());

        let mut tabs = WgtClosableTab::new(&s);
        tabs.flex.resize(0, 0, main.width(), main.height());

        tile.end();

        main.end();

        let mut footer = Flex::default_fill().row();
        footer.set_frame(FrameType::FlatBox);

        let bar_start = WgtBarStart::new(&s);
        footer.set_size(&bar_start.grp, 200);
        let _bar_mid = WgtBarMid::new();
        let bar_end = WgtBarEnd::new();
        footer.set_size(&bar_end.menu, 200);

        footer.end();
        
        container.set_size(&footer, 25);

        container.end();

        tile.handle(move |_, ev| match ev {
            Event::Drag => {
                app::redraw();
                return true;
            }
            _ => return false,
        });

        main_win.end();
        main_win.show();

        Self {
            app,         
            sender: s,
            receive: r,      
            main: main,
            search: search,
            tabs: tabs,
            tab_count: 0,
            bar_end: bar_end,
            extension_manager: extension_manager,
            script_manager: script_manager,
        }
    }

    fn create_extension(&mut self, id: String) {
        let extension = self.extension_manager.get_extension(&id);

        if let Some(extension) = extension {
            let label = extension.label.clone();

            let mut grp = Group::new(
                self.tabs.tab_grps.x(),
                self.tabs.tab_grps.y(),
                self.tabs.tab_grps.w(),
                self.tabs.tab_grps.h(),
                "",
            );
            let component_fn = extension.component_fn;
            let component = component_fn().unwrap();
            component.render(&grp);
            self.tabs.add(&mut grp, label.as_str());
            self.tab_count += 1;
        }
    }

    fn create_script(&mut self, id: String) {
        let script = self.script_manager.get_script(&id);

        if let Some(script) = script {
            let label = script.label.clone();

            let mut grp = Group::new(
                self.tabs.tab_grps.x(),
                self.tabs.tab_grps.y(),
                self.tabs.tab_grps.w(),
                self.tabs.tab_grps.h(),
                "",
            );

            let mut runner = WgtScriptRunner::new(&grp, id, self.script_manager.clone());
            runner.init();

            self.tabs.add(&mut grp, label.as_str());
            self.tab_count += 1;
        }
    }

    pub fn start(&mut self) {
        while self.app.wait() {
            if let Some(x) = self.receive.recv() {
                match x {
                    Message::Extension(id) => {
                        self.create_extension(id);
                    }
                    Message::Script(id) => {
                        self.create_script(id);
                    }

                    Message::ActiveTab(idx) => {
                        for i in 0..self.tabs.c.len() {
                            if i == (idx as usize) {
                                self.tabs.c[i as usize].set_color(Color::Dark1);

                                self.bar_end
                                    .menu
                                    .set_label(&self.tabs.c[i as usize].tooltip().unwrap());
                            } else {
                                self.tabs.c[i as usize].set_color(Color::Light2);
                            }
                        }

                        self.app.redraw();
                    }

                    Message::CloseTab(idx) => {
                        self.tabs.c.remove(idx as usize);

                        if idx > 0 {
                            self.sender.send(Message::ActiveTab(idx - 1));
                        } else if idx == 0 && self.tabs.c.len() > 0 {
                            self.sender.send(Message::ActiveTab(0));
                        } else {
                            self.bar_end.menu.set_label("");

                            self.app.redraw();
                        }
                    }

                    Message::Theme(theme_) => {
                        let theme = match theme_ {
                            theme::ColorTheme::Black => ColorTheme::new(color_themes::BLACK_THEME),
                            theme::ColorTheme::Dark => ColorTheme::new(color_themes::DARK_THEME),
                            theme::ColorTheme::Gray => ColorTheme::new(color_themes::GRAY_THEME),
                            theme::ColorTheme::Shake => ColorTheme::new(color_themes::SHAKE_THEME),
                            theme::ColorTheme::Tan => ColorTheme::new(color_themes::TAN_THEME),
                        };

                        theme.apply();
                        self.app.redraw();
                    }

                    Message::SideBar(id) => {
                        if id == 0 {
                            self.search.flex.resize(
                                0,
                                self.search.flex.y(),
                                240,
                                self.main.height(),
                            );
                            self.tabs.flex.resize(
                                240,
                                self.tabs.flex.y(),
                                self.main.width() - 240,
                                self.main.height(),
                            );

                            self.app.redraw();
                        } else {
                            self.search
                                .flex
                                .resize(0, self.search.flex.y(), 0, self.main.height());
                            self.tabs.flex.resize(
                                0,
                                self.tabs.flex.y(),
                                self.main.width(),
                                self.main.height(),
                            );

                            self.app.redraw();
                        }
                    }

                    Message::Browser(url) => if let Err(_) = webbrowser::open(&url) {},

                    Message::NewWindow => {
                        if let Ok(path) = std::env::current_exe() {
                            let file_path = path.to_string_lossy().to_string();

                            let result = if cfg!(target_os = "windows") {
                                process::Command::new(file_path)
                                    .spawn()
                            } else {
                                process::Command::new("sh").arg("-c").arg(file_path).spawn()
                            };

                            if result.is_err() {
                                dialog::alert(
                                    (self.tabs.flex.width() / 2) as i32 -200,
                                    (self.tabs.flex.height() / 2) as i32 -100,
                                    "New window fail",
                                )
                            }
                        }
                    }

                    Message::Terminal => {
                        let mut win = Window::new(
                            self.tabs.flex.x(),
                            self.tabs.flex.y() + 160,
                            self.tabs.flex.width(),
                            300,
                            "Terminal",
                        );

                        let _term = WgtTerminal::new(0, 0, win.width(), win.height());

                        win.make_resizable(true);
                        win.end();
                        win.show();
                    }

                    Message::About => {
                        let dialog = WgtAboutDialog::new();
                        dialog.show();
                    }
                    Message::Systeminfo => {
                        let dialog = WgtSysteminfoDialog::new();
                        dialog.show();
                    }

                    Message::CheckUpdate => {
                        let dialog = WgtCheckUpdateDialog::new();
                        dialog.show();
                    }

                    Message::Quit => {
                        self.app.quit();
                    }
                }
            } else {
                match app::event() {
                    _ => {}
                }
            }
        }
    }
}
