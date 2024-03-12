<script lang="ts">
	import {
		Settings,
		Create,
		FileUtils,
		Productivity,
		Research
	} from '$lib/components/windowSidebarPanel';
	import { windowStore } from '$lib/stores/windowStore';
	//home, research-tools, productivity-utils, creation-tools, file-utils, settings
</script>

<div class="container mx-auto space-y-8 p-8">
	{#if $windowStore.sidebar.activeTile === 'explorer'}
		<h1 class="h1">explorer</h1>
	{/if}
	{#if $windowStore.sidebar.activeTile === 'research-tools'}
		<Research />
	{/if}
	{#if $windowStore.sidebar.activeTile === 'productivity-utils'}
		<Productivity />
	{/if}
	{#if $windowStore.sidebar.activeTile === 'creation-tools'}
		<Create />
	{/if}
	{#if $windowStore.sidebar.activeTile === 'file-utils'}
		<FileUtils />
	{/if}
	{#if $windowStore.sidebar.activeTile === 'settings'}
		<Settings />
	{/if}
</div>
