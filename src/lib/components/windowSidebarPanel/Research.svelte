<script lang="ts">
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	let tabSet = 0;
</script>

<div class="container mx-auto space-y-8 p-8">
	<h1 class="h1">Research Tools</h1>

	<TabGroup>
		<Tab bind:group={tabSet} name="tab-collection" value={0}>Collection</Tab>
		<Tab bind:group={tabSet} name="tab-analysis" value={1}>Analysis</Tab>
		<Tab bind:group={tabSet} name="tab-prep" value={2}>Prep</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<dl class="list-dl">
					<div>
						<span class="flex-auto">
							<dt class="font-bold">Collection</dt>
							<dd class="text-sm opacity-50">Scrcpy</dd>
						</span>
					</div>
				</dl>
			{:else if tabSet === 1}
				<dl class="list-dl">
					<div>
						<span class="flex-auto">
							<dt class="font-bold">Data Analysis</dt>
							<dd class="text-sm opacity-50">Summarization</dd>
							<dd class="text-sm opacity-50">Sentiment Analysis</dd>
						</span>
					</div>
				</dl>
			{:else if tabSet === 2}
				<dl class="list-dl">
					<div>
						<span class="flex-auto">
							<dt class="font-bold">Data Prep</dt>
							<dd class="text-sm opacity-50">
								Anonymization (w/ BMW Anonymizer or Candle -> Mediapipe)
							</dd>
							<dd class="text-sm opacity-50">
								Transcription & Translation (Mozilla DeepSpeech or Candle Whisper)
							</dd>
						</span>
					</div>
				</dl>
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
