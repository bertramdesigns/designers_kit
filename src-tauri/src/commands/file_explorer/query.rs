use crate::utils::Error;
use chrono::{Local, TimeZone};

use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;

#[derive(Serialize, Deserialize)]
struct File {
    name: String,
    full_path: String,
    size: u64,
    extension: String,
    is_symlink: bool,
    is_hidden: bool,
    modified: String,
    accessed: String,
    created: String,
}

#[derive(Serialize, Deserialize)]
struct Folder {
    name: String,
    full_path: String,
    is_symlink: bool,
    is_hidden: bool,
    modified: String,
    created: String,
    files: Vec<File>,
    folders: Vec<Folder>,
}

pub trait FormatTime {
    fn format_time(&self) -> Result<String, Error>;
}

impl FormatTime for std::time::SystemTime {
    fn format_time(&self) -> Result<String, Error> {
        let timestamp = self
            .duration_since(std::time::SystemTime::UNIX_EPOCH)?
            .as_secs();
        // get timestamp in local timezone instead of UTC
        let local_datetime = Local.timestamp_opt(timestamp as i64, 0);
        Ok(local_datetime.unwrap().to_rfc3339())
    }
}

fn recurse_files(path: &str, depth: u8) -> Result<Folder, Error> {
    let path = Path::new(path);
    let metadata = fs::metadata(&path).map_err(Error::from)?;

    let mut folder = Folder {
        name: path.file_name().unwrap().to_str().unwrap().to_string(),
        full_path: path.to_str().unwrap().to_string(),
        is_symlink: metadata.file_type().is_symlink(),
        is_hidden: path.file_name().unwrap().to_str().unwrap().starts_with('.'),
        modified: metadata.modified()?.format_time()?,
        created: metadata.created()?.format_time()?,
        files: Vec::new(),
        folders: Vec::new(),
    };

    if depth > 0 {
        for entry in fs::read_dir(path)? {
            let entry = entry?;
            let path = entry.path();
            let metadata = fs::metadata(&path)?;

            if metadata.is_file() {
                folder.files.push(File {
                    name: path.file_name().unwrap().to_str().unwrap().to_string(),
                    full_path: path.to_str().unwrap().to_string(),
                    size: metadata.len(),
                    extension: path
                        .extension()
                        .unwrap_or_default()
                        .to_str()
                        .unwrap()
                        .to_string(),
                    is_symlink: metadata.file_type().is_symlink(),
                    is_hidden: path.file_name().unwrap().to_str().unwrap().starts_with('.'),
                    modified: metadata.modified()?.format_time()?,
                    accessed: metadata.accessed()?.format_time()?,
                    created: metadata.created()?.format_time()?,
                });
            } else if metadata.is_dir() {
                let subfolder = recurse_files(&path.to_str().unwrap(), depth - 1)?;
                folder.folders.push(subfolder);
            }
        }
    }

    Ok(folder)
}

#[tauri::command]
pub fn get_files_and_folders(path: &str, depth: u8) -> Result<String, Error> {
    let folder = recurse_files(path, depth)?;
    let json = serde_json::to_string(&folder)?;
    Ok(json)
}

#[tauri::command]
pub fn get_current_dir() -> String {
    let current_dir = std::env::current_dir().unwrap();
    let cur_dir = current_dir.to_str().unwrap().to_string();
    println!("Current dir: {:?}", cur_dir);
    cur_dir
}
