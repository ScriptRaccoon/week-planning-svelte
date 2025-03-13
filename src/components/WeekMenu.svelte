<script lang="ts">
	import Fa from "svelte-fa"
	import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
	import { addOneWeek, getWeekEnd, removeOneWeek } from "@/shared/utils"
	import { editingID } from "@/shared/states.svelte"

	type Props = {
		weekStart: Date
	}

	let { weekStart = $bindable() }: Props = $props()

	let weekEnd = $derived(getWeekEnd(weekStart))

	function incrementWeek() {
		editingID.value = null
		weekStart = addOneWeek(weekStart)
	}

	function decrementWeek() {
		editingID.value = null
		weekStart = removeOneWeek(weekStart)
	}
</script>

<div>
	<h2>
		<span aria-hidden="true">
			{weekStart.toLocaleDateString()} &nbsp;&ndash;&nbsp; {weekEnd.toLocaleDateString()}
		</span>
		<span class="sr-only" aria-live="polite">
			{weekStart.toDateString()}
			{weekEnd.toDateString()}
		</span>
	</h2>

	<button class="button big" aria-label="previous week" onclick={decrementWeek}>
		<Fa icon={faChevronLeft} />
	</button>

	<button class="button big" aria-label="next week" onclick={incrementWeek}>
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
