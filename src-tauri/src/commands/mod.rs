pub mod convert;
pub mod file_explorer;

use std::path::Path;

use crate::utils::Error;

#[tauri::command]
pub fn printme(path: &str) -> Result<(), Error> {
    println!("Hello from Rust {}", path);

    let path = Path::new(
        "/Users/dylanbertram/Dev/projects_worktools/designers_kit/src/routes/+layout.svelte",
    );
    let metadata = std::fs::metadata(path).map_err(Error::from)?;

    println!("{:?}", metadata.file_type());

    Ok(())
}
