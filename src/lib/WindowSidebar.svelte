<script lang="ts">
	import { AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	import { windowStore } from './stores/windowStore';

	function sidebarTileToggle(activeTile: string) {
		// If the active tile is already active, close the sidebar
		if ($windowStore.sidebar.activeTile === activeTile) {
			windowStore.setSidebarActiveTile('');
			windowStore.togglePanelVis('left', false);
			return;
		}

		// otherwise open and set the panel contents
		windowStore.setSidebarActiveTile(activeTile);
		windowStore.togglePanelVis('left', true);
	}
</script>

<AppRail background="bg-surface-500/5" width="w-20">
	<!-- 	<svelte:fragment slot="lead">
		<AppRailTile
			name="home"
			regionLead="flex justify-center items-center"
			on:click={() => sidebarTileToggle('home')}
			bind:group={$windowStore.sidebar.activeTile}
			value="home"
		>
			<svelte:fragment slot="lead"
				><Icon icon="ph:house-line-duotone" style="font-size: 2em"></Icon></svelte:fragment
			>
		</AppRailTile>
	</svelte:fragment> -->
	<!-- --- -->
	<AppRailTile
		name="research-tools"
		regionLead="flex justify-center items-center"
		on:click={() => sidebarTileToggle('research-tools')}
		bind:group={$windowStore.sidebar.activeTile}
		value="research-tools"
	>
		<svelte:fragment slot="lead"
			><Icon icon="ph:flask-duotone" style="font-size: 2em"></Icon></svelte:fragment
		>
		<span>Research</span>
	</AppRailTile>
	<AppRailTile
		name="productivity-utils"
		regionLead="flex justify-center items-center"
		on:click={() => sidebarTileToggle('productivity-utils')}
		bind:group={$windowStore.sidebar.activeTile}
		value="productivity-utils"
	>
		<svelte:fragment slot="lead"
			><Icon icon="ph:coffee-duotone" style="font-size: 2em"></Icon></svelte:fragment
		>
		<span>Productivity</span>
	</AppRailTile>
	<AppRailTile
		name="creation-tools"
		regionLead="flex justify-center items-center"
		on:click={() => sidebarTileToggle('creation-tools')}
		bind:group={$windowStore.sidebar.activeTile}
		value="creation-tools"
	>
		<svelte:fragment slot="lead"
			><Icon icon="ph:sparkle-duotone" style="font-size: 2em"></Icon></svelte:fragment
		>
		<span>Create</span>
	</AppRailTile>
	<AppRailTile
		name="file-utils"
		regionLead="flex justify-center items-center"
		on:click={() => sidebarTileToggle('file-utils')}
		bind:group={$windowStore.sidebar.activeTile}
		value="file-utils"
	>
		<svelte:fragment slot="lead"
			><Icon icon="ph:swap-duotone" style="font-size: 2em"></Icon></svelte:fragment
		>
		<span>File Utils</span>
	</AppRailTile>
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailTile
			name="settings"
			regionLead="flex justify-center items-center"
			on:click={() => sidebarTileToggle('settings')}
			bind:group={$windowStore.sidebar.activeTile}
			value="settings"
		>
			<svelte:fragment slot="lead"
				><Icon icon="ph:gear-duotone" style="font-size: 2em"></Icon></svelte:fragment
			>
			<span>Settings</span>
		</AppRailTile>
	</svelte:fragment>
</AppRail>
