<script lang="ts">
	import { RecursiveTreeView, type TreeViewNode } from '@skeletonlabs/skeleton';
	import FileIcon from './icons/FileIcon.svelte';
	import FolderIcon from './icons/FolderIcon.svelte';

	export let tree: DirTree;

	// for now use skeleton treeview until we have our own
	let treeView: TreeViewNode[] = buildSkeletonTree(tree);

	function buildSkeletonTree(tree: DirTree): TreeViewNode[] {
		let nodes: TreeViewNode[] = [];
		for (let folder of tree.folders) {
			if (!folder.is_hidden)
				nodes.push({
					id: folder.name,
					content: folder.name,
					lead: FolderIcon,
					children: buildSkeletonTree(folder)
				});
		}
		for (let file of tree.files) {
			if (!file.is_hidden)
				nodes.push({
					id: file.name,
					content: file.name,
					lead: FileIcon
				});
		}
		return nodes;
	}
</script>

<RecursiveTreeView nodes={treeView} padding="py-1 px-2" spacing="space-y-0" />

<!-- <ul>
	{#each folders as folder}
		<li class="dir">
			<span class="arrow">&#x25b6</span>
			{folder.name}
		</li>
	{/each}
	{#each files as file}
		<li class="file">
			<span class="no-arrow" />
			{file.name}
		</li>
	{/each}
</ul> -->
