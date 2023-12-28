import { invoke } from '@tauri-apps/api/tauri';


async function listDirectories() {
    await invoke("list_dirs")
        .then((items) => {
            console.log(items);
        });
}