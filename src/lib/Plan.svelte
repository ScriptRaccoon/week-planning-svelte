<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { fly } from "svelte/transition"

	import Fa from "svelte-fa"
	import {
		faBars,
		faCheck,
		faChevronLeft,
		faChevronRight,
		faTrashAlt,
	} from "@fortawesome/free-solid-svg-icons"
	import { faCircleCheck } from "@fortawesome/free-regular-svg-icons"

	import type { Plan_Data } from "../types"
	import { editing_id } from "../stores"

	export let plan: Plan_Data

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
</script>

<div class="container">
	<div
		class="plan"
		class:done={plan.done}
		class:edit={show_edit_container}
		class:opaque={$editing_id !== null && !show_edit_container}
	>
		<button
			aria-label="toggle edit"
			class="button"
			on:click={toggle_edit}
			aria-describedby={plan.id}
		>
			<Fa icon={faBars} />
		</button>

		{#if show_edit_container}
			<input
				aria-label="name"
				type="text"
				class="name"
				bind:value={name}
				on:change={() => dispatch("rename", name)}
			/>
		{:else}
			<div class="name" id={plan.id}>
				{plan.name}
			</div>
		{/if}
	</div>

	{#if show_edit_container}
		<div class="edit_container" transition:fly={{ duration: 120, x: 20 }}>
			<button
				aria-label="toggle done"
				class="button"
				class:done={plan.done}
				on:click={() => dispatch("toggle_done")}
			>
				<Fa icon={plan.done ? faCircleCheck : faCheck} />
			</button>

			<button
				aria-label="move to next week"
				class="button"
				on:click={() => dispatch("next")}
			>
				<Fa icon={faChevronRight} />
			</button>

			<button
				aria-label="move to previous week"
				class="button"
				on:click={() => dispatch("previous")}
			>
				<Fa icon={faChevronLeft} />
			</button>

			<button
				aria-label="delete plan"
				class="button"
				on:click={() => dispatch("delete")}
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
		flex-direction: row-reverse;
		align-items: center;
		gap: 0.5rem;
		padding-right: 0.75rem;
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
		width: 0; /* fix for layout issue in safari */
		font-size: 1.25rem;
		line-height: inherit;
		border-radius: 0.1rem;
		padding-block: 0.5rem;
		padding-left: 0.75rem;
	}

	.plan > * {
		transition: opacity 120ms linear;
	}

	.plan.done:not(.edit) > *:not(:focus) {
		opacity: 0.15;
	}

	.button.done {
		background-color: var(--secondary-color);
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
