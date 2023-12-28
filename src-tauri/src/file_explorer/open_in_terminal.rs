use std::{env::current_dir, process::Command};

#[tauri::command]
pub async fn open_in_terminal() {
    #[cfg(target_os = "linux")]
    // Open the terminal on linux pc
    let _ = Command::new("gnome-terminal")
        .arg(current_dir().unwrap())
        .spawn();
    #[cfg(target_os = "windows")]
    // Open the terminal on windows pc
    let _ = Command::new("cmd")
        .arg("/c")
        .arg("start")
        .arg(current_dir().unwrap())
        .spawn();
    #[cfg(target_os = "macos")]
    // Open the terminal on mac
    let _ = Command::new("open").arg(current_dir().unwrap()).spawn();
}
