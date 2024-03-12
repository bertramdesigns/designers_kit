// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{WebviewUrl, WebviewWindowBuilder};

mod commands;
mod utils;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            commands::file_explorer::query::get_current_dir,
            commands::file_explorer::query::get_files_and_folders,
            commands::printme,
            commands::convert::convert_pdf_to_html,
            // file_explorer::list_dirs::list_dirs,
            // file_explorer::open_dir::open_dir,
            // file_explorer::open_item::open_item,
            // file_explorer::go_back::go_back,
            // file_explorer::go_home::go_home,
            // file_explorer::search_for::search_for,
            // file_explorer::go_to_dir::go_to_dir,
            // file_explorer::copy_paste::copy_paste,
            // file_explorer::delete_item::delete_item,
            // file_explorer::extract_item::extract_item,
            // file_explorer::compress_item::compress_item,
            // file_explorer::create_folder::create_folder,
            // file_explorer::switch_view::switch_view,
            // file_explorer::check_app_config::check_app_config,
            // file_explorer::create_file::create_file,
            // file_explorer::get_current_dir::get_current_dir,
            // file_explorer::set_dir::set_dir,
            // file_explorer::list_disks::list_disks,
            // file_explorer::open_in_terminal::open_in_terminal,
            // file_explorer::rename_element::rename_element,
            // file_explorer::save_config::save_config,
            // file_explorer::switch_to_directory::switch_to_directory
        ])
        .setup(|app| {
            // let win = WebviewWindow::builder(app, "main", WebviewUrl::default())
            let win = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
                .title("Designers Kit")
                .inner_size(900.0, 800.0)
                .min_inner_size(400.0, 150.0)
                .resizable(true)
                .fullscreen(false);

            #[cfg(target_os = "macos")]
            let win = win.title_bar_style(tauri::TitleBarStyle::Overlay);

            let win = win.build().expect("Unable to create window");

            #[cfg(target_os = "macos")]
            {
                use cocoa::appkit::NSWindow;

                let nsw = win.ns_window().unwrap() as cocoa::base::id;
                unsafe {
                    // hide window title
                    use cocoa::appkit::NSWindowTitleVisibility;
                    nsw.setTitleVisibility_(NSWindowTitleVisibility::NSWindowTitleHidden);

                    /*
                    // set window to always be dark mode
                    use cocoa::appkit::NSAppearanceNameVibrantDark;
                    use objc::*;
                    let appearance: cocoa::base::id = msg_send![
                      class!(NSAppearance),
                      appearanceNamed: NSAppearanceNameVibrantDark
                    ];
                    let () = msg_send![nsw, setAppearance: appearance];

                    // set window background color
                     let bg_color = cocoa::appkit::NSColor::colorWithRed_green_blue_alpha_(
                        cocoa::base::nil,
                        34.0 / 255.0,
                        38.0 / 255.0,
                        45.5 / 255.0,
                        0.5,
                    );
                    nsw.setBackgroundColor_(bg_color);
                    */
                }
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
