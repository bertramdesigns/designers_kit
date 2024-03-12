<script>
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { AppShell, AppRail, AppRailAnchor, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { setInitialClassState, setModeCurrent } from '@skeletonlabs/skeleton'; // light/dark mode
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import Icon from '@iconify/svelte';

	import { page } from '$app/stores';
</script>

<AppRail slotsidebarleft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>
			<svelte:fragment slot="lead"
				><Icon icon="ph:house-line-duotone" style="font-size: 2em"></Icon></svelte:fragment
			>
		</AppRailAnchor>
	</svelte:fragment>
	<!-- --- -->
	<AppRailAnchor href="/research-tools" selected={$page.url.pathname === '/research-tools'}>
		<svelte:fragment slot="lead"
			><Icon icon="ph:flask-duotone" style="font-size: 2em"></Icon></svelte:fragment
		>
		<span>Research</span>
	</AppRailAnchor>
	<AppRailAnchor href="/productivity-utils" selected={$page.url.pathname === '/productivity-utils'}>
		<svelte:fragment slot="lead"
			><Icon icon="ph:coffee-duotone" style="font-size: 2em"></Icon></svelte:fragment
		>
		<span>Productivity</span>
	</AppRailAnchor>
	<AppRailAnchor href="/creation-tools" selected={$page.url.pathname === '/creation-tools'}>
		<svelte:fragment slot="lead"
			><Icon icon="ph:sparkle-duotone" style="font-size: 2em"></Icon></svelte:fragment
		>
		<span>Create</span>
	</AppRailAnchor>
	<AppRailAnchor href="/file-utils" selected={$page.url.pathname === '/file-utils'}>
		<svelte:fragment slot="lead"
			><Icon icon="ph:swap-duotone" style="font-size: 2em"></Icon></svelte:fragment
		>
		<span>File Utils</span>
	</AppRailAnchor>
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor href="/settings" selected={$page.url.pathname === '/settings'}>
			<svelte:fragment slot="lead"
				><Icon icon="ph:gear-duotone" style="font-size: 2em"></Icon></svelte:fragment
			>
			<span>Settings</span>
		</AppRailAnchor>
	</svelte:fragment>
</AppRail>
