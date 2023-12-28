use crate::file_explorer::FDir;
use chrono::prelude::{DateTime, NaiveDateTime, TimeZone, Utc};

use rust_search::SearchBuilder;

use std::env::current_dir;
use std::fs::{self};

use std::io::{BufReader, Read};
use stopwatch::Stopwatch;

#[tauri::command]
pub async fn search_for(
    file_name: String,
    max_items: i32,
    search_depth: i32,
    file_content: String,
) -> Vec<FDir> {
    let mut file_ext = ".".to_string().to_owned()
        + file_name
            .split(".")
            .nth(file_name.split(".").count() - 1)
            .unwrap_or("");
    println!(
        "Start searching for {} - {}",
        &file_name.strip_suffix(&file_ext).unwrap_or(&file_name),
        &file_ext
    );
    let sw = Stopwatch::start_new();
    let search: Vec<String>;
    if file_ext != ".".to_string().to_owned() + &file_name {
        println!("{}{}", &file_name, &file_ext);
        search = SearchBuilder::default()
            .location(current_dir().unwrap())
            .search_input(file_name.strip_suffix(&file_ext).unwrap())
            .ignore_case()
            .depth(search_depth.clone() as usize)
            .ext(&file_ext)
            .hidden()
            .limit(max_items as usize)
            .build()
            .collect();
    } else {
        search = SearchBuilder::default()
            .location(current_dir().unwrap())
            .search_input(file_name)
            .ignore_case()
            .depth(search_depth as usize)
            .hidden()
            .limit(max_items as usize)
            .build()
            .collect();
    }
    let mut dir_list: Vec<FDir> = Vec::new();
    for item in search {
        file_ext = ".".to_string().to_owned()
            + item
                .split(".")
                .nth(item.split(".").count() - 1)
                .unwrap_or("");
        let item = item.replace("\\", "/");
        let temp_item = &item.split("/").collect::<Vec<&str>>();
        let name = &temp_item[*&temp_item.len() - 1];
        let path = &item.replace("\\", "/");
        let temp_file = fs::metadata(&item);
        let file_size: String;
        let file_date: DateTime<Utc>;
        if &temp_file.is_ok() == &true {
            file_size = String::from(fs::metadata(&item).unwrap().len().to_string());
            file_date = fs::metadata(&item)
                .unwrap()
                .modified()
                .unwrap()
                .clone()
                .into();
        } else {
            file_size = "0".to_string();
            file_date = TimeZone::from_utc_datetime(
                &Utc,
                &NaiveDateTime::from_timestamp_opt(61, 0).unwrap(),
            );
        }
        let is_dir: bool;
        if &temp_file.is_ok() == &true {
            is_dir = *&temp_file.unwrap().is_dir();
        } else {
            is_dir = false;
        }
        let is_dir_int;
        if is_dir.to_owned() {
            is_dir_int = 1;
        } else {
            is_dir_int = 0;
        }
        // Don't include the directory searched in
        if path == current_dir().unwrap().to_str().unwrap() {
            continue;
        }

        // Search for file contents
        if &file_content != "" {
            let file = fs::File::open(&path).unwrap();
            let mut reader = BufReader::new(&file);
            let mut contents: String = "".to_string();
            println!("# Debug: Checking {}", &path);
            if &file.metadata().unwrap().is_dir() == &false {
                reader.read_to_string(&mut contents).unwrap_or_else(|x| {
                    println!("Error reading: {}", x);
                    0 as usize
                });
                if contents.contains(&file_content) {
                    dir_list.push(FDir {
                        name: name.to_string(),
                        is_dir: is_dir_int,
                        path: path.to_string(),
                        extension: String::from(&file_ext),
                        size: file_size.clone(),
                        last_modified: String::from(
                            file_date.to_string().split(".").nth(0).unwrap(),
                        ),
                    });
                } else {
                    continue;
                }
            }
        } else {
            dir_list.push(FDir {
                name: name.to_string(),
                is_dir: is_dir_int,
                path: path.to_string(),
                extension: String::from(&file_ext),
                size: file_size,
                last_modified: String::from(file_date.to_string().split(".").nth(0).unwrap()),
            });
        }
    }

    println!("# Debug: {} ms", sw.elapsed_ms());
    println!("# Debug: {} items found", dir_list.len());

    return dir_list;
}
