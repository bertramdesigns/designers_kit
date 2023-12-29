import { invoke } from '@tauri-apps/api/tauri';


async function copyItem(act_file_name: string, from_path: string, is_for_dual_pane: string) {
    await invoke("copy_paste", { act_file_name, from_path, is_for_dual_pane })
        .then((items) => {
            console.log(items);
        });
}