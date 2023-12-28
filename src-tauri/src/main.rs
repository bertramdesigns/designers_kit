// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod converters;
mod file_explorer;
mod utils;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            converters::convert_pdf_to_html,
            file_explorer::list_dirs::list_dirs,
            file_explorer::open_dir::open_dir,
            file_explorer::open_item,
            file_explorer::go_back::go_back,
            file_explorer::go_home::go_home,
            file_explorer::search_for::search_for,
            file_explorer::go_to_dir::go_to_dir,
            file_explorer::copy_paste::copy_paste,
            file_explorer::delete_item,
            file_explorer::extract_item::extract_item,
            file_explorer::compress_item::compress_item,
            file_explorer::create_folder,
            file_explorer::switch_view::switch_view,
            file_explorer::check_app_config::check_app_config,
            file_explorer::create_file,
            file_explorer::get_current_dir,
            file_explorer::set_dir,
            file_explorer::list_disks::list_disks,
            file_explorer::open_in_terminal::open_in_terminal,
            file_explorer::rename_element,
            file_explorer::save_config::save_config,
            file_explorer::switch_to_directory
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
