<script lang="ts">
	import '../app.pcss';
	import '../app.pcss';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { AppShell, AppRail, AppRailAnchor, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { setInitialClassState, setModeCurrent } from '@skeletonlabs/skeleton'; // light/dark mode
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import FileExplorer from '$lib/components/FileExplorer.svelte';

	import { windowStore } from '$lib/stores/windowStore';

	import { page } from '$app/stores';

	import { onMount } from 'svelte';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';

	onMount(() => {
		autoModeWatcher();
	});

	import Icon from '@iconify/svelte';
	// https://icon-sets.iconify.design/ph/
	// https://phosphoricons.com/

	import WindowTitleBar from '$lib/WindowTitleBar.svelte';
	import WindowPanel from '$lib/WindowPanel.svelte';
	import WindowSidebar from '$lib/WindowSidebar.svelte';
	import WindowSidebarPanel from '$lib/components/WindowSidebarPanel.svelte';

	initializeStores();
	const drawerStore = getDrawerStore();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<svelte:head>{@html `<script>(${setInitialClassState.toString()})();</script>`}</svelte:head>

<Drawer></Drawer>

<AppShell>
	<svelte:fragment slot="header">
		<WindowTitleBar />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		{#if $windowStore.sidebar.position === 'left'}
			<WindowSidebar />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="panelLeft">
		<WindowPanel bind:toggleVar={$windowStore.panelLeft.show}>
			<svelte:fragment slot="contents">
				<WindowSidebarPanel />
			</svelte:fragment>
		</WindowPanel>
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		{#if $windowStore.sidebar.position === 'right'}
			<WindowSidebar />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="panelRight">
		<WindowPanel bind:toggleVar={$windowStore.panelRight.show}>
			<svelte:fragment slot="contents">
				<FileExplorer />
			</svelte:fragment>
		</WindowPanel>
	</svelte:fragment>

	<slot />
</AppShell>
