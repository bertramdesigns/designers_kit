use crate::file_explorer::FDir;
use crate::file_explorer::{list_dirs, remove_dir_all, remove_file};

use std::fs::File;

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
