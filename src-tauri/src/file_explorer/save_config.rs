use serde_json::Value;

use std::fs::File;
use std::io::BufReader;

use tauri::{api::path::app_config_dir, Config};

use crate::file_explorer::check_app_config::AppConfig;

#[tauri::command]
pub async fn save_config(
    configured_path_one: String,
    configured_path_two: String,
    configured_path_three: String,
    is_open_in_terminal: String,
    is_dual_pane_enabled: String,
    launch_path: String,
    is_dual_pane_active: String,
    search_depth: i32,
    max_items: i32,
    is_light_mode: String,
    is_image_preview: String,
) {
    let app_config_file = File::open(
        app_config_dir(&Config::default())
            .unwrap()
            .join("rdpFX/app_config.json"),
    )
    .unwrap();
    let app_config_reader = BufReader::new(app_config_file);
    let app_config: Value = serde_json::from_reader(app_config_reader).unwrap();
    let app_config_json = AppConfig {
        view_mode: app_config["view_mode"].to_string().replace('"', ""),
        last_modified: chrono::offset::Local::now().to_string(),
        configured_path_one: configured_path_one.replace("\\", "/"),
        configured_path_two: configured_path_two.replace("\\", "/"),
        configured_path_three: configured_path_three.replace("\\", "/"),
        is_open_in_terminal: is_open_in_terminal.replace("\\", ""),
        is_dual_pane_enabled: is_dual_pane_enabled.replace("\\", ""),
        launch_path: launch_path.replace("\\", "/"),
        is_dual_pane_active: is_dual_pane_active.replace("\\", ""),
        search_depth: search_depth,
        max_items: max_items,
        is_light_mode: is_light_mode.replace("\\", "/"),
        is_image_preview: is_image_preview.replace("\\", "/"),
    };
    let config_dir = app_config_dir(&Config::default())
        .unwrap()
        .join("rdpFX/app_config.json")
        .to_str()
        .unwrap()
        .to_string();
    let _ = serde_json::to_writer_pretty(File::create(&config_dir).unwrap(), &app_config_json);
    println!("# Debug: app_config was saved to {}", config_dir);
}
