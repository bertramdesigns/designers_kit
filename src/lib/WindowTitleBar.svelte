<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { windowStore } from '$lib/stores/windowStore';

	let comboboxValue: string;

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<!-- Window titlebar for close/hide/maximize (no svelte, only tauri & vanilla) -->
<div class="titlebar bg-surface-100-800-token">
	<div data-tauri-drag-region class="titlebar-left-end" />
	<div data-tauri-drag-region class="titlebar-center-left">
		<button type="button" class="variant-transparent btn-icon hover:bg-surface-200-700-token"
			><Icon icon="ph:gear-duotone"></Icon></button
		>
		<button type="button" class="variant-transparent btn-icon hover:bg-surface-200-700-token"
			><Icon icon="ph:plus"></Icon></button
		>
	</div>
	<div data-tauri-drag-region class="titlebar-center">
		<button
			type="button"
			class="workspace-select-box input bg-surface-50-900-token"
			id="dropdownDefaultButton"
			data-dropdown-toggle="dropdown"
			aria-haspopup="listbox"
			aria-expanded="true"
			aria-labelledby="listbox-label"
			use:popup={popupCombobox}
		>
			<span>Tom Cook</span>
			<span>
				<Icon icon="ph:caret-down" style="font-size: 1em" />
			</span>
		</button>

		<div class="card w-48 py-2 shadow-xl" data-popup="popupCombobox">
			<ListBox rounded="rounded-none">
				<ListBoxItem bind:group={comboboxValue} name="medium" value="books">Books</ListBoxItem>
				<ListBoxItem bind:group={comboboxValue} name="medium" value="movies">Movies</ListBoxItem>
				<ListBoxItem bind:group={comboboxValue} name="medium" value="television">TV</ListBoxItem>
			</ListBox>
		</div>
	</div>
	<div data-tauri-drag-region class="titlebar-center-right"></div>
	<div data-tauri-drag-region class="titlebar-right-end">
		<button
			on:click={() => windowStore.togglePanelVis('right')}
			type="button"
			class="variant-transparent explorer-toggle btn-icon hover:bg-surface-200-700-token"
		>
			{#if $windowStore.panelRight.show}
				<Icon icon="ph:caret-right"></Icon>
			{:else}
				<Icon icon="ph:caret-left"></Icon>
			{/if}
			<Icon icon="ph:files" style="font-size: 1.5em"></Icon>
		</button>
	</div>
</div>

<style lang="postcss">
	.titlebar {
		height: 44px;
		user-select: none;
		display: grid;
		grid-template-columns: [left-end] auto [center-left] auto [center] fit-content(100%) [center-right] auto [right-end] auto;
	}
	.titlebar-right-end {
		grid-column: right-end;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.titlebar-left-end {
		grid-column: left-end;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.titlebar-center {
		grid-column: center;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 4px 0;
	}
	.titlebar-center-left {
		grid-column: center-left;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.titlebar-center-right {
		grid-column: center-right;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	// add padding to all children. Workaround for grid height issue
	[class^='titlebar-'] > * {
		padding: 0.25em 0;
	}

	// style all titlebar buttons a bit differently
	.titlebar .btn-icon {
		@apply rounded-md;
		@apply h-8;
		@apply w-8;
	}

	.explorer-toggle {
		width: unset !important;
		padding-right: 0.25em;
		padding-left: 0.25em;
		margin-right: 0.5em;
	}

	.workspace-select-box {
		@apply rounded-md;
		display: flex;
		position: relative;
		align-items: center;
		height: 100%;
		padding: 0.25em 2em;
	}
	.workspace-select-box > :first-child {
		min-width: 10em;
	}
	.workspace-select-box > :last-child {
		position: absolute;
		padding-right: 0.75em;
		right: 0;
	}
</style>
