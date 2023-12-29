use dialog::DialogBox;
use std::env::current_dir;
use std::fs::{self, remove_dir_all, remove_file, ReadDir};

use tauri::api::path::home_dir;

pub mod check_app_config;
pub mod compress_item;
pub mod copy_paste;
pub mod create_file;
pub mod create_folder;
pub mod delete_item;
pub mod extract_item;
pub mod get_current_dir;
pub mod go_back;
pub mod go_home;
pub mod go_to_dir;
pub mod list_dirs;
pub mod list_disks;
pub mod open_dir;
pub mod open_in_terminal;
pub mod open_item;
pub mod rename_element;
pub mod save_config;
pub mod search_for;
pub mod set_dir;
pub mod switch_to_directory;
pub mod switch_view;

use crate::file_explorer::list_dirs::list_dirs;

#[derive(serde::Serialize)]
pub struct FDir {
    name: String,
    is_dir: i8,
    path: String,
    extension: String,
    size: String,
    last_modified: String,
}

#[allow(dead_code)]
fn alert_not_found_dir(_x: std::io::Error) -> ReadDir {
    dialog::Message::new("No directory found or unable to open due to missing permissions")
        .title("No directory found")
        .show()
        .expect("Error opening dialog");
    return fs::read_dir(current_dir().unwrap()).unwrap();
}
