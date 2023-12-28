use crate::file_explorer::check_app_config::AppConfig;
use crate::file_explorer::list_dirs::list_dirs;
use crate::file_explorer::FDir;

use serde_json::Value;

use std::fs::File;
use std::io::BufReader;

use tauri::{api::path::app_config_dir, Config};

#[tauri::command]
pub async fn switch_view(view_mode: String) -> Vec<FDir> {
    let app_config_file = File::open(
        app_config_dir(&Config::default())
            .unwrap()
            .join("rdpFX/app_config.json"),
    )
    .unwrap();
    let app_config_reader = BufReader::new(app_config_file);
    let app_config: Value = serde_json::from_reader(app_config_reader).unwrap();
    println!("{}", app_config["configured_path_one"].to_string());
    let app_config_json = AppConfig {
        view_mode,
        last_modified: chrono::offset::Local::now().to_string(),
        configured_path_one: app_config["configured_path_one"]
            .to_string()
            .replace('"', "")
            .replace("\\", "/")
            .trim()
            .to_string(),
        configured_path_two: app_config["configured_path_two"]
            .to_string()
            .replace('"', "")
            .replace("\\", "/")
            .trim()
            .to_string(),
        configured_path_three: app_config["configured_path_three"]
            .to_string()
            .replace('"', "")
            .replace("\\", "/")
            .trim()
            .to_string(),
        is_open_in_terminal: app_config["is_open_in_terminal"]
            .to_string()
            .replace('"', "")
            .replace("\\", "/")
            .trim()
            .to_string(),
        is_dual_pane_enabled: app_config["is_dual_pane_enabled"]
            .to_string()
            .replace('"', "")
            .replace("\\", "/")
            .trim()
            .to_string(),
        launch_path: app_config["launch_path"]
            .to_string()
            .replace('"', "")
            .replace("\\", "/")
            .trim()
            .to_string(),
        is_dual_pane_active: app_config["is_dual_pane_active"]
            .to_string()
            .replace('"', "")
            .replace("\\", "/")
            .trim()
            .to_string(),
        search_depth: app_config["search_depth"]
            .to_string()
            .parse::<i32>()
            .unwrap(),
        max_items: app_config["max_items"].to_string().parse::<i32>().unwrap(),
        is_light_mode: app_config["is_light_mode"]
            .to_string()
            .replace('"', "")
            .replace("\\", "/")
            .trim()
            .to_string(),
        is_image_preview: app_config["is_image_preview"]
            .to_string()
            .replace('"', "")
            .replace("\\", "/")
            .trim()
            .to_string(),
    };
    let _ = serde_json::to_writer_pretty(
        File::create(
            app_config_dir(&Config::default())
                .unwrap()
                .join("rdpFX/app_config.json")
                .to_str()
                .unwrap()
                .to_string(),
        )
        .unwrap(),
        &app_config_json,
    );
    return list_dirs().await;
}
