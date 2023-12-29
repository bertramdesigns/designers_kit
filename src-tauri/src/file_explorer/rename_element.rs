use crate::file_explorer::FDir;
use crate::file_explorer::{current_dir, list_dirs};

use std::fs::{self};
use stopwatch::Stopwatch;

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
