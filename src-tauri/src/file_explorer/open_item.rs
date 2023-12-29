#[tauri::command]
pub async fn open_item(path: String) {
    println!("{}", &path);
    let _ = open::that_detached(path);
}
