import { invoke } from '@tauri-apps/api/tauri';


async function listDisks() {
    await invoke("list_disks")
        .then((items) => {
            console.log(items);
        });
}