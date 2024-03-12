<script lang="ts">
	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/core';
	import DirectoryTree from './fileExplorer/DirectoryTree.svelte';
	import Icon from '@iconify/svelte';

	let response = '';
	let path: string = '/Users/dylanbertram/Desktop';
	let depth: number = 2;
	let tree: DirTree;

	onMount(async () => {
		get_files_and_folders();
	});

	async function get_current_dir() {
		response = await invoke('get_current_dir');
		console.log(response);
	}

	async function get_files_and_folders() {
		//let cur_dir = await invoke('get_current_dir');
		response = await invoke('get_files_and_folders', { path, depth });
		tree = JSON.parse(response);
		console.log(tree);
	}

	async function printme() {
		await invoke('printme', { path });
	}
</script>

<div class="file-explorer">
	<div class="header">
		<button type="button" class="variant-filled btn-icon btn-sm" on:click={get_files_and_folders}
			><Icon icon="ph:arrow-clockwise"></Icon></button
		>
	</div>
	<div class="tree">
		{#if tree}
			<DirectoryTree {tree} />
		{/if}
	</div>
	<!-- <span>{response}</span> -->
	<div class="footer">
		<button type="button" class="variant-filled btn btn-sm" on:click={printme}>printme</button>
	</div>
</div>

<style lang="postcss">
	.file-explorer {
		display: flex;
		flex-direction: column;
		align-self: stretch;
	}
	.header {
		display: flex;
		justify-content: flex-end;
	}
	.tree {
		flex: 1;
		overflow: scroll;
	}
	.footer {
		display: flex;
	}
</style>
