import { invoke } from '@tauri-apps/api/tauri';


async function goBack() {
    await invoke("go_back")
        .then((items) => {
            console.log(items);
        });
}