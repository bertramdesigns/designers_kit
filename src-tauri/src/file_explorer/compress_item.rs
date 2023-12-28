use crate::file_explorer::FDir;
use std::fs::{self};
use std::{
    fs::{copy, create_dir, remove_dir_all, File},
    path::PathBuf,
};
use stopwatch::Stopwatch;

use crate::file_explorer::list_dirs::list_dirs;
use zip_extensions::*;

#[tauri::command]
pub async fn compress_item(from_path: String) -> Vec<FDir> {
    let sw = Stopwatch::start_new();
    let file_ext = ".".to_string().to_owned()
        + from_path
            .split(".")
            .nth(from_path.split(".").count() - 1)
            .unwrap_or("");
    // let _ = sevenz_rust::compress_to_path(&from_path, from_path.to_string()+".7z").expect("complete");
    let _ = File::create(
        from_path
            .strip_suffix(&file_ext)
            .unwrap_or(&from_path)
            .to_owned()
            + ".zip",
    )
    .unwrap();
    let source: PathBuf;
    let archive = PathBuf::from(
        from_path
            .strip_suffix(&file_ext)
            .unwrap_or(&from_path)
            .to_owned()
            + ".zip",
    );
    if fs::metadata(&from_path).unwrap().is_dir() {
        source = PathBuf::from(&from_path);
    } else {
        let file_name = &from_path
            .split("/")
            .nth(&from_path.split("/").count() - 1)
            .unwrap();
        let _ = create_dir("compressed_dir");
        let _ = copy(
            &from_path,
            "compressed_dir/".to_string().to_owned() + file_name,
        );
        source = PathBuf::from("compressed_dir");
    }
    let _ = zip_create_from_directory(&archive, &source);
    let _ = remove_dir_all("compressed_dir");
    println!("# Debug: Pack time: {} ms", sw.elapsed_ms());
    return list_dirs().await;
}
