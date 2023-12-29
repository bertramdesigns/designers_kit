use crate::file_explorer::current_dir;

use std::fs::{self};
use std::path::PathBuf;

#[tauri::command]
pub async fn create_folder(folder_name: String) {
    let new_folder_path = PathBuf::from(&folder_name);
    let _ = fs::create_dir(current_dir().unwrap().join(new_folder_path));
}
