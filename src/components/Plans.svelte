<script lang="ts">
	import type { PlanData } from "@/shared/types"
	import Plan from "@/components/Plan.svelte"

	type Props = {
		currentPlans: PlanData[]
		plansElement: HTMLElement | null
		movePlanToNextWeek: () => void
		movePlanToPreviousWeek: () => void
		deletePlan: () => void
	}

	let {
		currentPlans,
		plansElement = $bindable(),
		movePlanToNextWeek,
		movePlanToPreviousWeek,
		deletePlan,
	}: Props = $props()
</script>

<div bind:this={plansElement}>
	{#each currentPlans as plan (plan.id)}
		<Plan {plan} {movePlanToNextWeek} {movePlanToPreviousWeek} {deletePlan} />
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
