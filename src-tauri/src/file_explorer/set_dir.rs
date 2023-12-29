use std::env::set_current_dir;

#[tauri::command]
pub async fn set_dir(current_dir: String) {
    println!("Current dir: {}", &current_dir);
    let _ = set_current_dir(current_dir);
}
