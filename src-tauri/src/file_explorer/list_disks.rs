#[derive(serde::Serialize)]
pub struct DisksInfo {
    name: String,
    format: String,
    path: String,
    avail: String,
    capacity: String,
}

#[tauri::command]
pub async fn list_disks() -> Vec<DisksInfo> {
    let ls_disks: Vec<DisksInfo> = vec![];
    #[cfg(not(target_os = "macos"))]
    let disk_list = System::new().mounts().unwrap_or_else(|r| {
        println!("get mounts error:{}", r);
        vec![]
    });

    #[cfg(not(target_os = "macos"))]
    #[cfg(not(target_os = "windows"))]
    for disk in disk_list {
        if disk.fs_mounted_from.starts_with("/dev/sda")
            || disk.fs_mounted_from.starts_with("/dev/nvme")
        {
            ls_disks.push(DisksInfo {
                name: disk
                    .fs_mounted_on
                    .split("/")
                    .last()
                    .unwrap_or("/")
                    .to_string(),
                format: disk.fs_type,
                path: disk.fs_mounted_on,
                avail: disk.avail.to_string(),
                capacity: disk.total.to_string(),
            });
        }
    }

    #[cfg(not(target_os = "macos"))]
    #[cfg(target_os = "windows")]
    for disk in disk_list {
        ls_disks.push(DisksInfo {
            name: disk.fs_mounted_from,
            format: disk.fs_type,
            path: disk.fs_mounted_on.replace("\\", "/"),
            avail: disk.avail.to_string(),
            capacity: disk.total.to_string(),
        });
    }

    return ls_disks;
}
