<script lang="ts">
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher<{ add: string }>()

	let name: string = ""

	function add() {
		if (!name) return
		dispatch("add", name)
		name = ""
	}
</script>

<form on:submit|preventDefault={add}>
	<label class="label" for="name_input">What do you plan this week?</label>
	<input
		type="text"
		class="input"
		id="name_input"
		bind:value={name}
		autocomplete="off"
	/>
	<button class="button">Add</button>
</form>

<style>
	form:focus-within .label {
		color: var(--font-color);
	}

	form {
		margin-block: 2rem;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.5rem;
	}
	label {
		grid-column: 1 / span 2;
	}

	.input {
		width: 100%;
	}
</style>
