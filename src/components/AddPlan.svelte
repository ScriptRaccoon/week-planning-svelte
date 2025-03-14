<script lang="ts">
	type Props = {
		addPlan: (name: string) => void
	}

	let { addPlan }: Props = $props()

	let name: string = $state("")

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault()
		addPlan(name)
		name = ""
	}
</script>

<form onsubmit={handleSubmit}>
	<label class="label" for="nameInput">What do you plan this week?</label>
	<input
		type="text"
		class="input"
		id="nameInput"
		bind:value={name}
		autocomplete="off"
	/>
	<button class="button big">Add</button>
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
