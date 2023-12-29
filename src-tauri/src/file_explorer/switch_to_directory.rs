use std::env::set_current_dir;

#[tauri::command]
pub async fn switch_to_directory(current_dir: String) {
    println!("Switching to directory: {}", &current_dir);
    set_current_dir(current_dir).unwrap();
}
