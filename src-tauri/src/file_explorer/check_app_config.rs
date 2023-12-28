use serde_json::Value;
use std::fs::File;
use std::fs::{self};
use std::io::BufReader;
use tauri::api::path::config_dir;

use crate::file_explorer::create_folder;

#[derive(serde::Serialize)]
pub struct AppConfig {
    pub view_mode: String,
    pub last_modified: String,
    pub configured_path_one: String,
    pub configured_path_two: String,
    pub configured_path_three: String,
    pub is_open_in_terminal: String,
    pub is_dual_pane_enabled: String,
    pub launch_path: String,
    pub is_dual_pane_active: String,
    pub search_depth: i32,
    pub max_items: i32,
    pub is_light_mode: String,
    pub is_image_preview: String,
}

#[tauri::command]
pub async fn check_app_config() -> AppConfig {
    create_folder(
        config_dir()
            .unwrap()
            .join("rdpFX")
            .to_str()
            .unwrap()
            .to_string(),
    )
    .await;

    // If config doesn't exist, create it
    if fs::metadata(config_dir().unwrap().join("rdpFX/app_config.json")).is_err() {
        let _ = File::create(config_dir().unwrap().join("rdpFX/app_config.json"));
        let app_config_json = AppConfig {
            view_mode: "".to_string(),
            last_modified: chrono::offset::Local::now().to_string(),
            configured_path_one: "".to_string(),
            configured_path_two: "".to_string(),
            configured_path_three: "".to_string(),
            is_open_in_terminal: "0".to_string(),
            is_dual_pane_enabled: "0".to_string(),
            launch_path: "".to_string(),
            is_dual_pane_active: "0".to_string(),
            search_depth: 10,
            max_items: 1000,
            is_light_mode: "0".to_string(),
            is_image_preview: "0".to_string(),
        };
        let _ = serde_json::to_writer_pretty(
            File::create(
                config_dir()
                    .unwrap()
                    .join("rdpFX/app_config.json")
                    .to_str()
                    .unwrap()
                    .to_string(),
            )
            .unwrap(),
            &app_config_json,
        );
    }

    let app_config_file = File::open(config_dir().unwrap().join("rdpFX/app_config.json")).unwrap();
    let app_config_reader = BufReader::new(app_config_file);
    let app_config: Value = serde_json::from_reader(app_config_reader).unwrap();

    return AppConfig {
        view_mode: app_config["view_mode"].to_string(),
        last_modified: app_config["last_modified"].to_string(),
        configured_path_one: app_config["configured_path_one"]
            .to_string()
            .replace('"', ""),
        configured_path_two: app_config["configured_path_two"]
            .to_string()
            .replace('"', ""),
        configured_path_three: app_config["configured_path_three"]
            .to_string()
            .replace('"', ""),
        is_open_in_terminal: app_config["is_open_in_terminal"].to_string(),
        is_dual_pane_enabled: app_config["is_dual_pane_enabled"].to_string(),
        launch_path: app_config["launch_path"].to_string().replace('"', ""),
        is_dual_pane_active: app_config["is_dual_pane_active"].to_string(),
        search_depth: app_config["search_depth"]
            .to_string()
            .parse::<i32>()
            .unwrap(),
        max_items: app_config["max_items"].to_string().parse::<i32>().unwrap(),
        is_light_mode: app_config["is_light_mode"].to_string(),
        is_image_preview: app_config["is_image_preview"].to_string(),
    };
}
