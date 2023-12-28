use crate::file_explorer::list_dirs::list_dirs;
use crate::file_explorer::FDir;
use std::fs::{self};
#[allow(unused_imports)]
use std::io::{BufRead, BufReader, BufWriter, Error, ErrorKind, Read, Write};
use std::{env::current_dir, fs::copy};
use stopwatch::Stopwatch;

#[tauri::command]
pub async fn copy_paste(
    act_file_name: String,
    from_path: String,
    is_for_dual_pane: String,
) -> Vec<FDir> {
    println!("Copying starting ...");
    let is_dir = fs::metadata(&from_path).unwrap().is_dir();
    let sw = Stopwatch::start_new();
    let file_name: String;
    if is_for_dual_pane == "1" {
        file_name = act_file_name;
    } else {
        file_name = current_dir()
            .unwrap()
            .join(&act_file_name)
            .to_str()
            .unwrap()
            .to_string();
    }
    let temp_file_ext: String;
    let mut file_ext: String;
    let mut temp_filename: String = String::new();

    for i in 0..file_name.split(".").count() - 1 {
        temp_filename += file_name.split(".").nth(i).unwrap();
    }

    temp_file_ext = file_name
        .split(".")
        .nth(file_name.split(".").count() - 1)
        .unwrap()
        .to_string();
    file_ext = ".".to_string().to_owned() + &temp_file_ext.as_str();

    if temp_file_ext == file_name {
        file_ext = "".to_string();
    }

    temp_filename = file_name
        .strip_suffix(&file_ext)
        .unwrap_or(&file_name)
        .to_string();
    let mut is_file_existing = fs::metadata(&file_name).is_ok();
    let mut counter = 1;
    let mut final_filename: String = format!("{}{}", &temp_filename, file_ext);

    while is_file_existing {
        final_filename = format!("{}_{}{}", &temp_filename, counter, file_ext);
        is_file_existing = fs::metadata(&final_filename).is_ok();
        counter += 1;
    }

    if is_dir {
        if is_for_dual_pane == "1" {
            let _ = copy_dir::copy_dir(&from_path, final_filename.replace("\\", "/"));
        } else {
            let _ = copy_dir::copy_dir(
                current_dir().unwrap().join(&from_path.replace("\\", "/")),
                final_filename.replace("\\", "/"),
            );
        }
    } else {
        if is_for_dual_pane == "1" {
            let _ = copy(&from_path, final_filename.replace("\\", "/"));
        } else {
            let _ = copy(
                current_dir().unwrap().join(&from_path.replace("\\", "/")),
                final_filename.replace("\\", "/"),
            );
        }
    }

    /* Copy file byte by byte -> To play around with later ... */

    /*let line_file = File::open(&from_path).unwrap();
    let mut reader = BufReader::new(line_file);

    let mut buffer = Vec::new();
    reader.read_to_end(&mut buffer).expect("Failed to read file");

    let line_count = buffer.iter().len() as f64;

    let file = File::open(&from_path).unwrap();
    let file = BufReader::new(file);
    let new_file = File::create(&final_filename).unwrap();
    let mut new_file = BufWriter::new(new_file);

    let mut counter = 0;
    for (num, &byte) in buffer.iter().enumerate() {
        let progress = num as f64;
        new_file.write(&[byte]).unwrap();
        if counter % 10000000 == 0 {
            let percentage = (100.0/line_count) * progress;
            println!("{} %", &percentage.to_string());
            print!("{}[2J", 27 as char);
        }
        counter += 1;
    }*/

    println!("Copy-Paste time: {:?}", &sw.elapsed());
    return list_dirs().await;
}
