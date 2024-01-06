<script lang="ts">
	import Fa from "svelte-fa"
	import {
		faChevronLeft,
		faChevronRight,
	} from "@fortawesome/free-solid-svg-icons"
	import { add_one_week, get_week_end, remove_one_week } from "../utils"
	import { editing_id } from "../stores"

	export let week_start: Date

	$: week_end = get_week_end(week_start)

	function increment_week() {
		$editing_id = null
		week_start = add_one_week(week_start)
	}

	function decrement_week() {
		$editing_id = null
		week_start = remove_one_week(week_start)
	}
</script>

<div>
	<h2>
		<span aria-hidden="true">
			{week_start.toLocaleDateString()} &nbsp;&ndash;&nbsp; {week_end.toLocaleDateString()}
		</span>
		<span class="sr-only" aria-live="polite">
			{week_start.toDateString()}
			{week_end.toDateString()}
		</span>
	</h2>

	<button
		class="button big"
		aria-label="previous week"
		on:click={decrement_week}
	>
		<Fa icon={faChevronLeft} />
	</button>

	<button class="button big" aria-label="next week" on:click={increment_week}>
		<Fa icon={faChevronRight} />
	</button>
</div>

<style>
	div {
		display: grid;
		justify-items: center;
		grid-template-columns: 1fr 1fr;
		row-gap: 0.5rem;
	}

	h2 {
		font-weight: 400;
		grid-column: 1 / span 2;
		text-align: center;
		font-size: 1.5rem;
	}

	@media (min-width: 34rem) {
		div {
			width: fit-content;
			margin-inline: auto;
			grid-template-columns: auto 1fr auto;
			grid-auto-flow: dense;
			align-items: center;
			column-gap: 1.5rem;
		}

		h2 {
			grid-column: 2 / span 1;
			font-size: 1.75rem;
		}
	}
</style>
