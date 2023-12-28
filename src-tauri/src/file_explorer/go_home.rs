use chrono::prelude::{DateTime, Utc};
use std::env::{current_dir, set_current_dir};
use std::fs::{self};

use crate::file_explorer::home_dir;
use crate::file_explorer::FDir;

#[tauri::command]
pub async fn go_home() -> Vec<FDir> {
    let _ = set_current_dir(home_dir().unwrap());
    let mut dir_list: Vec<FDir> = Vec::new();
    let current_directory = fs::read_dir(current_dir().unwrap()).unwrap();
    println!("# DEBUG: Current dir: {:?}", current_dir().unwrap());
    for item in current_directory {
        let temp_item = item.unwrap();
        let name = &temp_item.file_name().into_string().unwrap();
        let is_dir = &temp_item.path().is_dir();
        let is_dir_int: i8;
        let path = &temp_item
            .path()
            .to_str()
            .unwrap()
            .to_string()
            .replace("\\", "/");
        let file_ext = ".".to_string().to_owned()
            + &path
                .split(".")
                .nth(&path.split(".").count() - 1)
                .unwrap_or("");
        let file_date: DateTime<Utc> = fs::metadata(&temp_item.path())
            .unwrap()
            .modified()
            .unwrap()
            .clone()
            .into();
        if is_dir.to_owned() {
            is_dir_int = 1;
        } else {
            is_dir_int = 0;
        }
        dir_list.push(FDir {
            name: String::from(name),
            is_dir: is_dir_int,
            path: String::from(path),
            extension: file_ext,
            size: temp_item.metadata().unwrap().len().to_string(),
            last_modified: String::from(file_date.to_string().split(".").nth(0).unwrap()),
        });
    }
    return dir_list;
}
