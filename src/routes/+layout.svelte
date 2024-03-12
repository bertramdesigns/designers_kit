<script lang="ts">
	import '../app.pcss';
	import '../app.pcss';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { AppShell, AppRail, AppRailAnchor, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { setInitialClassState, setModeCurrent } from '@skeletonlabs/skeleton'; // light/dark mode
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

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
	import WindowPanelRight from '$lib/WindowPanelRight.svelte';
	import WindowSidebar from '$lib/WindowSidebar.svelte';

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
		<WindowSidebar />
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		<WindowPanelRight />
	</svelte:fragment>

	<slot />
</AppShell>
