use std::str;
use std::sync::atomic::{AtomicI32, Ordering};
use std::sync::Arc;

use fltk::{
    app,
    button::*,
    enums::{Align, Color, Event, FrameType},
    group::*,
    image::*,
    prelude::*,
};

use crate::apps::AssetRes;

use crate::apps::message::Message;

#[allow(unused_parens)]
pub struct WgtTabButton {
    grp: Group,
    but: Button,
}

impl WgtTabButton {
    pub fn default() -> Self {
        let mut grp = Group::new(0, 0, 120, 25, None);
        let mut but = Button::new(grp.x() + 110, grp.y(), 10, 10, None);
        let image_cl = AssetRes::get("icon/close_main.svg").unwrap();
        let image_cl = str::from_utf8(image_cl.data.as_ref()).unwrap();
        let mut image_cl = SvgImage::from_data(image_cl).unwrap();

        image_cl.scale(9, 9, true, true);
        but.set_image(Some(image_cl));
        but.set_frame(FrameType::NoBox);
        grp.end();
        grp.set_frame(FrameType::FlatBox);
        grp.set_label_size(12);

        Self { grp, but }
    }
}

pub struct WgtClosableTab {
    pub flex: Flex,
    pub tab_headers: Pack,
    pub tab_grps: Group,
    pub active_tab: Arc<AtomicI32>,
    pub children: i32,
    pub s: app::Sender<Message>,
    pub c: Vec<Group>,
}

impl WgtClosableTab {
    pub fn new(s: &app::Sender<Message>) -> Self {
        let mut flex = Flex::default_fill().column();     
        flex.set_color(Color::Dark1);
        flex.set_frame(FrameType::FlatBox);

        let mut tab_navs = Group::new(0, 0, flex.width(), 30, "");
        tab_navs.set_color(Color::Dark3);
        tab_navs.set_frame(FrameType::FlatBox);

        let mut scrgr = Scroll::new(48, 0, flex.width()-60, 30, "");
        scrgr.set_color(Color::Dark3);
        scrgr.set_scrollbar_size(1);
        scrgr.set_type(ScrollType::None);
        scrgr.hscrollbar().hide();

        let mut tab_headers = Pack::new(48, 0, flex.width(), 30, "");
        tab_headers.set_spacing(3);
        tab_headers.set_type(PackType::Horizontal);
        tab_headers.end();

        scrgr.end();



        let gp = Group::new(8, 0, 40, 20, "");      
        let mut prev = Button::new(8, 5, 15, 15, None);
        let image = AssetRes::get("icon/mono-navigator-prev.svg").unwrap();
        let image = str::from_utf8(image.data.as_ref()).unwrap();
        let mut image = SvgImage::from_data(image).unwrap();
        image.scale(13, 13, true, true);
        prev.set_image(Some(image));
        prev.set_frame(FrameType::NoBox);
        prev.set_tooltip("Scroll Tabs");
        prev.clear_visible_focus();

        prev.handle({
            let mut self_grp = scrgr.clone();
            move |_w, ev| match ev {
                Event::Push => {
                    // println!("xpos: {} : Maximum: {} : Minimum: {}",self_grp.xposition(),self_grp.hscrollbar().maximum(),self_grp.hscrollbar().minimum());
                    if self_grp.xposition() != (self_grp.hscrollbar().minimum()) as i32 {
                        self_grp.scroll_to(self_grp.xposition() - 15, self_grp.yposition());
                    }
                    true
                }
                Event::MouseWheel => {
                    // println!("xpos: {} : Maximum: {} : Minimum: {}",self_grp.xposition(),self_grp.hscrollbar().maximum(),self_grp.hscrollbar().minimum());
                    match app::event_dy() {
                        app::MouseWheel::Up => {
                            if self_grp.xposition() != (self_grp.hscrollbar().maximum()) as i32 {
                                self_grp.scroll_to(self_grp.xposition() + 15, self_grp.yposition());
                            }
                        }
                        app::MouseWheel::Down => {
                            if self_grp.xposition() != (self_grp.hscrollbar().minimum()) as i32 {
                                self_grp.scroll_to(self_grp.xposition() - 15, self_grp.yposition());
                            }
                        }
                        _ => {}
                    }
                    true
                }
                _ => false,
            }
        });

        let mut next = Button::new(25, 5, 15, 15, None);
        let image = AssetRes::get("icon/mono-navigator-next.svg").unwrap();
        let image = str::from_utf8(image.data.as_ref()).unwrap();
        let mut image = SvgImage::from_data(image).unwrap();
        image.scale(13, 13, true, true);
        next.set_image(Some(image));
        next.set_frame(FrameType::NoBox);
        next.set_tooltip("Scroll Tabs");
        next.clear_visible_focus();

        next.handle({
            let mut self_grp = scrgr.clone();
            move |_w, ev| match ev {
                Event::Push => {
                    // println!("xpos: {} : Maximum: {} : Minimum: {}",self_grp.xposition(),self_grp.hscrollbar().maximum(),self_grp.hscrollbar().minimum());

                    if self_grp.xposition() != (self_grp.hscrollbar().maximum()) as i32 {
                        self_grp.scroll_to(self_grp.xposition() + 15, self_grp.yposition());
                    }
                    true
                }
                _ => false,
            }
        });

        gp.end();

        tab_navs.end();

        let mut tab_grps = Group::default_fill();
        tab_grps.set_color(Color::Dark1);
        tab_grps.set_frame(FrameType::FlatBox);

        tab_grps.end();
        flex.set_size(&tab_navs, 30);
        flex.end();

        Self {
            flex,
            tab_headers,
            tab_grps,
            active_tab: Arc::new(AtomicI32::new(0)),
            children: 0,
            s: s.clone(),
            c: Vec::new(),
        }
    }

    pub fn add(&mut self, grp: &mut Group, label: &str) {
        for child in 0..self.tab_grps.children() {
            self.tab_grps.child(child).unwrap().hide();
        }

        grp.resize(
            self.tab_grps.x(),
            self.tab_grps.y(),
            self.tab_grps.w(),
            self.tab_grps.h(),
        );
        grp.show();
        self.tab_grps.add(grp);

        let children = self.tab_grps.children();
        self.children = children;
        self.active_tab.store(children - 1, Ordering::SeqCst);

        let mut but = WgtTabButton::default();
        but.grp.set_align(Align::Left | Align::Inside);
        but.grp.set_tooltip(label);

        let mut label = label.to_owned();

        if label.len() > 15 {
            label = label[0..15].to_owned();
        }
        but.grp.set_label(&label);
        but.but.clear_visible_focus();
        self.s.send(Message::ActiveTab(children - 1));

        but.grp.handle({
            let tab_grps2 = self.tab_grps.clone();
            let mut curr_grp = grp.clone();

            let curr_tab = Arc::clone(&self.active_tab);
            //let mut x = 0;
            //let mut y = 0;
            let sender = self.s.clone();
            move |w, ev| match ev {
                // handle the events on the tabs
                Event::Push => {
                    //let coords = app::event_coords();
                    //x = coords.0;
                    //y = coords.1;
                    for child in 0..tab_grps2.children() {
                        tab_grps2.child(child).unwrap().hide();
                    }

                    let idx = tab_grps2.find(&curr_grp);
                    curr_tab.store(idx, Ordering::SeqCst);
                    curr_grp.show();

                    sender.send(Message::ActiveTab(idx));

                    true
                }
                Event::Enter => {
                    if !curr_grp.visible() {
                        w.set_color(Color::Light3);
                        app::redraw();
                    }
                    true
                }
                Event::Leave => {
                    if !curr_grp.visible() {
                        w.set_color(Color::Light2);
                        app::redraw();
                    }
                    true
                }
                _ => false,
            }
        });

        self.tab_headers.add(&but.grp);
        self.c.push(but.grp);

        but.but.set_callback({
            let curr_grp = grp.clone();
            let curr_tab = Arc::clone(&self.active_tab);
            let mut tab_grps2 = self.tab_grps.clone();
            let mut tab_headers2 = self.tab_headers.clone();
            let sender = self.s.clone();
            move |_| {
                let idx = tab_grps2.find(&curr_grp);
                sender.send(Message::CloseTab(idx));
                tab_grps2.remove_by_index(idx);
                tab_headers2.remove_by_index(idx);
                if let Some(mut grp) = tab_grps2.child(tab_grps2.children() - 1) {
                    curr_tab.store(tab_grps2.children() - 1, Ordering::SeqCst);
                    grp.show();
                }
            }
        });
    }
}
