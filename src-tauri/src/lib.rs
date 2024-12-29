// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::{TitleBarStyle, WebviewUrl, WebviewWindowBuilder};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            // Create a new webview window. We removed from tauri.conf.json for more control.
            let win = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
                .title("Designers Kit")
                .inner_size(900.0, 800.0)
                .min_inner_size(400.0, 150.0)
                .resizable(true)
                .fullscreen(false);
            // allow access to extra directories
            // https://beta.tauri.app/references/v2/js/fs/#security
            // let scope = app.fs_scope();
            // scope.allow_directory("$RESOURCE", false);
            // dbg!(scope.allowed());

            // keeps the functionality of the title bar, but full width page
            #[cfg(target_os = "macos")]
            let win = win.title_bar_style(TitleBarStyle::Overlay);

            let window = win.build().unwrap();

            #[cfg(target_os = "macos")]
            {
                use cocoa::appkit::NSWindow;

                let nsw = window.ns_window().unwrap() as cocoa::base::id;
                unsafe {
                    // hide window title
                    use cocoa::appkit::NSWindowTitleVisibility;
                    nsw.setTitleVisibility_(NSWindowTitleVisibility::NSWindowTitleHidden);
                }
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
