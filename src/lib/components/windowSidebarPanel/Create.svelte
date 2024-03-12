<script lang="ts">
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	let tabSet = 0;
</script>

<div class="container mx-auto space-y-8 p-8">
	<h1 class="h1">Creation Tools</h1>

	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}>
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			<span>(label 1)</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>(label 2)</Tab>
		<Tab bind:group={tabSet} name="tab3" value={2}>(label 3)</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				(tab panel 1 contents)
			{:else if tabSet === 1}
				(tab panel 2 contents)
			{:else if tabSet === 2}
				(tab panel 3 contents)
			{/if}
		</svelte:fragment>
	</TabGroup>

	<dl class="list-dl">
		<div>
			<span class="flex-auto">
				<dt class="font-bold">Image to code</dt>
				<dd class="text-sm opacity-50">Image to HTML</dd>
				<dd class="text-sm opacity-50">Image to SVG</dd>
			</span>
		</div>
		<div>
			<span class="flex-auto">
				<dt class="font-bold">Generative LLM</dt>
				<dd class="text-sm opacity-50">Text to Icon</dd>
				<dd class="text-sm opacity-50">Text to Image</dd>
			</span>
		</div>
	</dl>
</div>
