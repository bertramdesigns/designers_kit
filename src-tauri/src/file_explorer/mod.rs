use dialog::DialogBox;

use std::fs::{self, ReadDir};

use std::{
    env::{current_dir, set_current_dir},
    fs::{remove_dir_all, remove_file, File},
    path::PathBuf,
};
use stopwatch::Stopwatch;
use tauri::api::path::home_dir;

pub mod check_app_config;
pub mod compress_item;
pub mod copy_paste;
pub mod extract_item;
pub mod go_back;
pub mod go_home;
pub mod go_to_dir;
pub mod list_dirs;
pub mod list_disks;
pub mod open_dir;
pub mod open_in_terminal;
pub mod save_config;
pub mod search_for;
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

#[tauri::command]
pub async fn switch_to_directory(current_dir: String) {
    println!("Switching to directory: {}", &current_dir);
    set_current_dir(current_dir).unwrap();
}

#[tauri::command]
pub async fn get_current_dir() -> String {
    return current_dir()
        .unwrap()
        .as_path()
        .to_str()
        .unwrap()
        .to_string()
        .replace("\\", "/");
}

#[tauri::command]
pub async fn set_dir(current_dir: String) {
    println!("Current dir: {}", &current_dir);
    let _ = set_current_dir(current_dir);
}

#[allow(dead_code)]
fn alert_not_found_dir(_x: std::io::Error) -> ReadDir {
    dialog::Message::new("No directory found or unable to open due to missing permissions")
        .title("No directory found")
        .show()
        .expect("Error opening dialog");
    return fs::read_dir(current_dir().unwrap()).unwrap();
}

#[tauri::command]
pub async fn delete_item(act_file_name: String) -> Vec<FDir> {
    let is_dir = File::open(&act_file_name)
        .unwrap()
        .metadata()
        .unwrap()
        .is_dir();
    println!("{}", &act_file_name);
    if is_dir {
        let _ = remove_dir_all(act_file_name.replace("\\", "/"));
    } else {
        let _ = remove_file(act_file_name.replace("\\", "/"));
    }
    return list_dirs().await;
}

#[tauri::command]
pub async fn open_item(path: String) {
    println!("{}", &path);
    let _ = open::that_detached(path);
}

#[tauri::command]
pub async fn create_folder(folder_name: String) {
    let new_folder_path = PathBuf::from(&folder_name);
    let _ = fs::create_dir(current_dir().unwrap().join(new_folder_path));
}

#[tauri::command]
pub async fn create_file(file_name: String) {
    let new_file_path = PathBuf::from(&file_name);
    let _ = File::create(current_dir().unwrap().join(new_file_path));
}

#[tauri::command]
pub async fn rename_element(path: String, new_name: String) -> Vec<FDir> {
    let sw = Stopwatch::start_new();
    let _ = fs::rename(
        current_dir().unwrap().join(&path.replace("\\", "/")),
        current_dir().unwrap().join(&new_name.replace("\\", "/")),
    );
    println!("# Debug: Rename time: {} ms", sw.elapsed_ms());
    return list_dirs().await;
}
