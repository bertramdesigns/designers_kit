use std::{fs::create_dir, path::PathBuf};
use stopwatch::Stopwatch;

use unrar::Archive;
use zip_extensions::*;

use crate::file_explorer::list_dirs::list_dirs;
use crate::file_explorer::FDir;

#[tauri::command]
pub async fn extract_item(from_path: String) -> Vec<FDir> {
    // Check file extension
    let file_ext = ".".to_string().to_owned()
        + from_path
            .split(".")
            .nth(from_path.split(".").count() - 1)
            .unwrap_or("");

    println!("# Debug: Start unpacking {} - {}", &file_ext, &from_path);

    // make zip or rar unpack
    let sw = Stopwatch::start_new();
    if file_ext == ".zip" {
        let file = PathBuf::from(&from_path);
        let _ = create_dir(&from_path.strip_suffix(&file_ext).unwrap());
        let new_dir = PathBuf::from(&from_path.strip_suffix(&file_ext).unwrap());
        zip_extract(&file, &new_dir).unwrap();
    } else if file_ext == ".rar" {
        let mut archive = Archive::new(&from_path).open_for_processing().unwrap();
        while let Some(header) = archive.read_header().unwrap() {
            println!(
                "{} bytes: {}",
                header.entry().unpacked_size,
                header.entry().filename.to_string_lossy()
            );
            archive = if header.entry().is_file() {
                header.extract().unwrap()
            } else {
                header.skip().unwrap()
            }
        }
    } else if file_ext == ".7z" {
        let _ =
            sevenz_rust::decompress_file(&from_path, &from_path.strip_suffix(&file_ext).unwrap());
    }
    println!("# Debug: Unpack time: {} ms", sw.elapsed_ms());
    return list_dirs().await;
}
