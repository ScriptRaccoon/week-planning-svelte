<script lang="ts">
	import type { PlanData } from "../types"
	import Plan from "./Plan.svelte"

	export let current_plans: PlanData[] = []
</script>

<div>
	{#each current_plans as plan (plan.id)}
		<Plan {plan} on:delete on:next on:previous />
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-bottom: 4rem;
	}
</style>
