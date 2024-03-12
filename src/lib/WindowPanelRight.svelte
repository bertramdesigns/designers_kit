<script>
	import FileExplorer from './components/FileExplorer.svelte';
	import { windowStore } from '$lib/stores/windowStore';
</script>

<div class="sidebar-right{$windowStore.panelRight.show ? '' : '-hidden'} bg-surface-100-800-token">
	{#if $windowStore.panelRight.show}
		<div class="panel-view-container">
			<FileExplorer />
		</div>
	{/if}
</div>

<style lang="postcss">
	.panel-view-container {
		display: flex;
		position: relative;
		height: 500px;
		overflow: hidden;
	}
	.sidebar-right {
		width: 300px;
		height: 100%;
	}
	.sidebar-right-hidden {
		width: 0px;
		height: 100%;
	}
</style>
