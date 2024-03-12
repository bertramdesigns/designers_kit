<script lang="ts">
	import { LightSwitch, SlideToggle } from '@skeletonlabs/skeleton'; // light/dark mode
	import { windowStore } from '$lib/stores/windowStore';

	let sbPosToggle: boolean;

	function sidebarPositionToggle() {
		sbPosToggle = $windowStore.sidebar.position === 'left';
		if (sbPosToggle) {
			$windowStore.sidebar.position = 'right';
		} else {
			$windowStore.sidebar.position = 'left';
		}
	}
</script>

<div>
	<h1 class="h1">Settings</h1>
	<LightSwitch />
	<!-- TODO: Implement this, merging file right panel + windowSidebarPanel -->
	<!-- 	
	<SlideToggle
		name="sidebar-position"
		bind:checked={sbPosToggle}
		on:click={sidebarPositionToggle}
	/> -->
</div>
