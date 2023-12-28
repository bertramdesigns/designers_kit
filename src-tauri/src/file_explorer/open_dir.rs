use chrono::prelude::{DateTime, Utc};
use std::env::{current_dir, set_current_dir};
use std::fs::{self};
use stopwatch::Stopwatch;

use crate::file_explorer::FDir;

#[tauri::command]
pub async fn open_dir(_path: String, _name: String) -> Vec<FDir> {
    println!("{}", &_path.contains('"'));
    let sw = Stopwatch::start_new();
    let mut dir_list: Vec<FDir> = Vec::new();
    let current_directory =
        fs::read_dir(&_path.replace('"', "")).expect("Unable to open directory");
    let _ = set_current_dir(_path);
    println!("# DEBUG: Current dir: {:?}", current_dir().unwrap());
    for item in current_directory {
        let temp_item = item.unwrap();
        let name = &temp_item.file_name().into_string().unwrap();
        let is_dir = &temp_item.path().is_dir();
        let mut is_dir_int: i8 = 0;
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
        }
        dir_list.push(FDir {
            name: name.to_owned(),
            is_dir: is_dir_int,
            path: path.to_owned(),
            extension: file_ext,
            size: temp_item.metadata().unwrap().len().to_string(),
            last_modified: String::from(file_date.to_string().split(".").nth(0).unwrap()),
        });
    }
    println!("{} ms", sw.elapsed_ms());
    return dir_list;
}
