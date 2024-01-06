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

	$: show_edit_container = $editing_id === plan.id

	let name = plan.name

	type Events = {
		next: void
		previous: void
		delete: void
		toggle_done: void
		rename: string
	}

	const dispatch = createEventDispatcher<Events>()

	function toggle_edit() {
		$editing_id = show_edit_container ? null : plan.id
	}

	function toggle_done() {
		dispatch("toggle_done")
	}

	function move_to_next_week() {
		dispatch("next")
	}

	function move_to_previous_week() {
		dispatch("previous")
	}

	function delete_plan() {
		dispatch("delete")
	}

	function rename_plan() {
		dispatch("rename", name)
	}
</script>

<div class="container">
	<div
		class="plan"
		class:done={plan.done}
		class:edit={show_edit_container}
		class:opaque={$editing_id !== null && !show_edit_container}
	>
		{#if show_edit_container}
			<input
				type="text"
				class="name"
				bind:value={name}
				on:blur={rename_plan}
			/>
		{:else}
			<div class="name">
				{plan.name}
			</div>
		{/if}

		<button class="button small" on:click={toggle_edit}>
			<Fa icon={faCog} />
		</button>
	</div>

	{#if show_edit_container}
		<div class="edit_container" transition:fly={{ duration: 120, x: 20 }}>
			<button
				class="button small checker"
				class:done={plan.done}
				on:click={toggle_done}
			>
				<Fa icon={plan.done ? faCheckCircle : faCheck} />
			</button>

			<button
				aria-label="move to next week"
				class="button small"
				on:click={move_to_next_week}
			>
				<Fa icon={faChevronRight} />
			</button>

			<button
				aria-label="move to previous week"
				class="button small"
				on:click={move_to_previous_week}
			>
				<Fa icon={faChevronLeft} />
			</button>

			<button
				aria-label="delete plan"
				class="button small"
				on:click={delete_plan}
			>
				<Fa icon={faTrashAlt} />
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
		line-height: inherit;
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
		flex-direction: row-reverse;
		gap: 0.5rem;
	}
</style>
