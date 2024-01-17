<script lang="ts">
	import type { PlanData } from "@/shared/types"
	import Plan from "@/components/Plan.svelte"

	export let currentPlans: PlanData[] = []
	export let plansElement: HTMLElement
</script>

<div bind:this={plansElement}>
	{#each currentPlans as plan (plan.id)}
		<Plan {plan} on:delete on:next on:previous on:toggleDone on:rename />
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
