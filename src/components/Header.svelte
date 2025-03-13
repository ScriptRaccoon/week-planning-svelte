<script lang="ts">
	import type { Snippet } from "svelte"

	type Props = {
		children?: Snippet
	}

	let { children }: Props = $props()
</script>

<header>
	<h1>
		{@render children?.()}
	</h1>
</header>

<style>
	header {
		padding-block: 2rem;
	}

	h1 {
		text-align: center;
		font-weight: 500;
		font-size: 2.5rem;
		line-height: 1.1;
	}

	@media (min-width: 34rem) {
		h1 {
			font-size: 3rem;
		}
	}
</style>
