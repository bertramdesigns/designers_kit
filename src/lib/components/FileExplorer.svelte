<script>
	// Check out https://github.com/RickyDane/rdpFX/blob/master/src-tauri/src/main.rs
	import { invoke } from '@tauri-apps/api/tauri';

	async function listDisks() {
		await invoke('list_dirs')
			.then((disks) => {
				console.log(disks);
				// disks.forEach(disk => {
				// 	console.log(disk);
				// });
			})
			.catch((err) => {
				console.error(err);
			});
	}
</script>

<div class="container">
	<button type="button" class="variant-filled btn btn-sm" on:click={listDisks}>sm</button>
</div>
