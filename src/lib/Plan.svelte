<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { fly } from "svelte/transition"

	import Fa from "svelte-fa"
	import {
		faCheck,
		faCheckCircle,
		faChevronLeft,
		faChevronRight,
		faCog,
		faTrashAlt,
	} from "@fortawesome/free-solid-svg-icons"

	import type { PlanData } from "../types"
	import { editing_id } from "../stores"

	export let plan: PlanData

	type Events = { next: string; previous: string; delete: string }

	const dispatch = createEventDispatcher<Events>()

	function toggle_done() {
		plan.done = !plan.done
		$editing_id = null
	}

	function toggle_edit() {
		$editing_id = $editing_id === plan.id ? null : plan.id
	}

	function move_to_next_week() {
		$editing_id = null
		dispatch("next", plan.id)
	}

	function move_to_previous_week() {
		$editing_id = null
		dispatch("previous", plan.id)
	}

	function delete_plan() {
		$editing_id = null
		dispatch("delete", plan.id)
	}
</script>

<div class="container">
	<div
		class="plan"
		class:done={plan.done}
		class:edit={$editing_id === plan.id}
		class:opaque={$editing_id !== null && $editing_id !== plan.id}
	>
		{#if $editing_id === plan.id}
			<div
				class="name"
				contenteditable="true"
				bind:textContent={plan.name}
			></div>
		{:else}
			<div class="name">
				{plan.name}
			</div>
		{/if}

		<button class="button small" on:click={toggle_edit}>
			<Fa icon={faCog} />
		</button>
	</div>

	{#if $editing_id === plan.id}
		<div class="edit_container" transition:fly={{ duration: 120, x: 20 }}>
			<button
				aria-label="delete plan"
				class="button small"
				on:click={delete_plan}
			>
				<Fa icon={faTrashAlt} />
			</button>

			<button
				aria-label="move tp previous week"
				class="button small"
				on:click={move_to_previous_week}
			>
				<Fa icon={faChevronLeft} />
			</button>

			<button
				aria-label="move tp next week"
				class="button small"
				on:click={move_to_next_week}
			>
				<Fa icon={faChevronRight} />
			</button>

			<button
				class="button small checker"
				class:done={plan.done}
				on:click={toggle_done}
			>
				<Fa icon={plan.done ? faCheckCircle : faCheck} />
			</button>
		</div>
	{/if}
</div>

<style>
	.container {
		position: relative;
	}

	.plan {
		display: flex;
		align-items: start;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		border-radius: 0.25rem;
		background-color: var(--card-color);
		transition: opacity 120ms linear;
	}

	.plan.edit {
		outline: 2px solid var(--primary-color);
		box-shadow: 0rem 0rem 1rem #fff2;
	}

	.plan.opaque {
		opacity: 0.2;
	}

	.name {
		flex: 1;
		font-size: 1.25rem;
		transition: opacity 120ms linear;
	}

	.button.checker.done {
		background-color: var(--secondary-color);
	}

	.plan.done:not(.edit) .name {
		opacity: 0.15;
	}

	.edit_container {
		z-index: 10;
		position: absolute;
		right: 0;
		top: calc(100% + 0.4rem);
		background-color: var(--card-color);
		padding: 0.5rem 0.5rem;
		border-radius: 0.25rem;
		box-shadow: 0rem 0rem 1rem #fff2;
		display: flex;
		gap: 0.5rem;
	}
</style>
