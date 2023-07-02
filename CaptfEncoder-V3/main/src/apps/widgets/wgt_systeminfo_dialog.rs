use std::fmt::Write;
use std::str;

use fltk::{
    app,
    button::*,
    enums::{Align, Color, FrameType},
    frame::*,
    group::*,
    image::*,
    prelude::*,
    window::*,
};

use sysinfo::{System, SystemExt};

use crate::apps::AssetRes;

pub struct WgtSysteminfoDialog {}

impl WgtSysteminfoDialog {
    pub fn new() -> Self {
        WgtSysteminfoDialog {}
    }

    pub fn show(&self) {
        let mut sys = System::new_all();
        sys.refresh_all();

        /*
        println!("=> disks:");
        for disk in sys.disks() {
            println!("{:?}", disk);
        }

        println!("=> networks:");
        for (interface_name, data) in sys.networks() {
            println!(
                "{}: {}/{} B",
                interface_name,
                data.received(),
                data.transmitted()
            );
        }
        */

        /*
        println!("=> components:");
        for component in sys.components() {
            println!("{:?}", component);
        }
        */

        /*
        println!("=> system:");

        println!("System name:             {:?}", sys.name());
        println!("System kernel version:   {:?}", sys.kernel_version());
        println!("System OS version:       {:?}", sys.os_version());
        println!("System host name:        {:?}", sys.host_name());

        println!("total memory: {} KB", sys.total_memory());
        println!("used memory : {} KB", sys.used_memory());
        println!("total swap  : {} KB", sys.total_swap());
        println!("used swap   : {} KB", sys.used_swap());

        println!("{:?}", sys.long_os_version());
        */

        //println!("NB processors: {}", sys.processors().len());

        /*
        // Display processes ID, name na disk usage:
        for (pid, process) in sys.processes() {
            println!("[{}] {} {:?}", pid, process.name(), process.disk_usage());
        }
        */

        let mut out = String::new();

        writeln!(
            &mut out,
            "Host name: {}",
            sys.host_name().unwrap_or_default()
        )
        .unwrap();
        writeln!(&mut out, "OS name: {}", sys.name().unwrap_or_default()).unwrap();
        writeln!(
            &mut out,
            "OS version: {}",
            sys.os_version().unwrap_or_default()
        )
        .unwrap();
        writeln!(
            &mut out,
            "Kernel version: {}",
            sys.kernel_version().unwrap_or_default()
        )
        .unwrap();
        writeln!(&mut out, "Total memory: {:?}KB", sys.total_memory()).unwrap();
        writeln!(&mut out, "Used memory: {:?}KB", sys.used_memory()).unwrap();
        writeln!(&mut out, "Total swap: {:?}KB", sys.total_swap()).unwrap();
        writeln!(&mut out, "Used swap: {:?}KB", sys.used_swap()).unwrap();

        let mut dialog = Window::default().with_size(400, 320).center_screen();
        dialog.make_resizable(false);
        dialog.make_modal(true);
        dialog.set_border(false);

        let mut grp = Group::new(0, 0, 400, 40, "");
        grp.set_frame(FrameType::FlatBox);
        grp.set_color(Color::from_rgb(255, 255, 255));
        let mut btn = Button::new(360, 10, 40, 40, "");
        let image_cl = AssetRes::get("icon/close_main-2.svg").unwrap();
        let image_cl = str::from_utf8(image_cl.data.as_ref()).unwrap();
        let mut image_cl = SvgImage::from_data(image_cl).unwrap();
        image_cl.scale(16, 16, true, true);
        btn.set_image(Some(image_cl));
        btn.set_frame(FrameType::NoBox);
        btn.set_callback({
            let mut win2 = dialog.clone();
            move |_| {
                win2.hide();
            }
        });
        let mut frame = Frame::new(10, 10, 360, 20, "System info");
        frame.set_align(Align::Inside | Align::Left);
        frame.set_label_size(18);
        frame.set_label_color(Color::from_hex(0x2c2c2c));
        grp.end();

        let pack = Pack::new(30, 80, 360, 240, "");

        for line in out.split("\n") {
            let mut frame = Frame::new(5, 0, 350, 25, "");
            frame.set_align(Align::Inside | Align::Left);
            frame.set_label(line);
            frame.set_label_size(16);
        }
        pack.end();

        dialog.end();

        dialog.show();

        while dialog.shown() {
            let _ = app::wait();
        }
    }
}
