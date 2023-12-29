use std::env::current_dir;
use std::fs::File;
use std::path::PathBuf;

#[tauri::command]
pub async fn create_file(file_name: String) {
    let new_file_path = PathBuf::from(&file_name);
    let _ = File::create(current_dir().unwrap().join(new_file_path));
}
