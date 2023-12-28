<script lang="ts">
	import '../app.pcss';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { AppShell, AppRail, AppRailAnchor, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { setInitialClassState, setModeCurrent } from '@skeletonlabs/skeleton'; // light/dark mode
	import Icon from '@iconify/svelte';
	// https://icon-sets.iconify.design/ph/
	// https://phosphoricons.com/

	import { appWindow } from '@tauri-apps/api/window';
	import { page } from '$app/stores';

	import FileExplorer from '$lib/components/FileExplorer.svelte';

	initializeStores();
	const drawerStore = getDrawerStore();

	appWindow.theme().then((theme) => {
		setModeCurrent(theme === 'light'); // true is light mode
	});
</script>

<svelte:head>{@html `<script>(${setInitialClassState.toString()})();</script>`}</svelte:head>

<Drawer />

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail slotSidebarLeft="bg-surface-500/5 w-56 p-4">
			<svelte:fragment slot="lead">
				<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>
					<svelte:fragment slot="lead"
						><Icon icon="ph:house-line-duotone" style="font-size: 2em" /></svelte:fragment
					>
				</AppRailAnchor>
			</svelte:fragment>
			<!-- --- -->
			<AppRailAnchor href="/research-tools" selected={$page.url.pathname === '/research-tools/'}>
				<svelte:fragment slot="lead"
					><Icon icon="ph:flask-duotone" style="font-size: 2em" /></svelte:fragment
				>
				<span>Research</span>
			</AppRailAnchor>
			<AppRailAnchor
				href="/productivity-utils"
				selected={$page.url.pathname === '/productivity-utils/'}
			>
				<svelte:fragment slot="lead"
					><Icon icon="ph:coffee-duotone" style="font-size: 2em" /></svelte:fragment
				>
				<span>Productivity</span>
			</AppRailAnchor>
			<AppRailAnchor href="/creation-tools" selected={$page.url.pathname === '/creation-tools/'}>
				<svelte:fragment slot="lead"
					><Icon icon="ph:sparkle-duotone" style="font-size: 2em" /></svelte:fragment
				>
				<span>Create</span>
			</AppRailAnchor>
			<AppRailAnchor href="/file-utils" selected={$page.url.pathname === '/file-utils/'}>
				<svelte:fragment slot="lead"
					><Icon icon="ph:swap-duotone" style="font-size: 2em" /></svelte:fragment
				>
				<span>File Utils</span>
			</AppRailAnchor>
			<!-- --- -->
			<svelte:fragment slot="trail">
				<AppRailAnchor href="/settings" selected={$page.url.pathname === '/settings/'}>
					<svelte:fragment slot="lead"
						><Icon icon="ph:gear-duotone" style="font-size: 2em" /></svelte:fragment
					>
					<span>Settings</span>
				</AppRailAnchor>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		<FileExplorer />
	</svelte:fragment>

	<slot />
</AppShell>
