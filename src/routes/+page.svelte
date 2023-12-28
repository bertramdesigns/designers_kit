<script>
	import Greet from '$lib/Greet.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<div class="container mx-auto space-y-8 p-8">
	<Avatar src="https://i.pravatar.cc/" />
	<h1 class="h1">Welcome to SvelteKit</h1>
	<Greet />
	<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
	<section>
		<a class="variant-filled-primary btn" href="https://kit.svelte.dev/">SvelteKit</a>
		<a class="variant-filled-secondary btn" href="https://tailwindcss.com/">Tailwind</a>
		<a class="variant-filled-tertiary btn" href="https://github.com/">GitHub</a>
	</section>
</div>
