<script lang="ts">
	import type { PlanData } from "@/shared/types"
	import Plan from "@/components/Plan.svelte"

	type Props = {
		currentPlans?: PlanData[]
		plansElement: HTMLElement | null
		renamePlan: (name: string) => void
		next: () => void
		previous: () => void
		deletePlan: () => void
		toggleDone: () => void
	}

	let {
		currentPlans = [],
		plansElement = $bindable(),
		renamePlan,
		next,
		previous,
		deletePlan,
		toggleDone,
	}: Props = $props()
</script>

<div bind:this={plansElement}>
	{#each currentPlans as plan (plan.id)}
		<Plan {plan} {renamePlan} {next} {previous} {deletePlan} {toggleDone} />
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
