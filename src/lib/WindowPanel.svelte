<script lang="ts">
	import { windowStore } from '$lib/stores/windowStore';

	export let toggleVar: boolean;
</script>

<div class="panel{toggleVar ? '' : '-hidden'} bg-surface-100-800-token">
	{#if toggleVar}
		{#if $$slots.contents}
			<div class="panel-view-container">
				<slot name="contents" />
			</div>
		{/if}
	{/if}
</div>

<style lang="postcss">
	.panel-view-container {
		display: flex;
		position: relative;
		height: 500px;
		overflow: hidden;
	}
	.panel {
		width: 300px;
		height: 100%;
	}
	.panel-hidden {
		width: 0px;
		height: 100%;
	}
</style>
