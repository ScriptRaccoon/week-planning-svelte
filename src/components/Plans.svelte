<script lang="ts">
	import type { PlanData } from "@/shared/types"
	import Plan from "@/components/Plan.svelte"

	type Props = {
		currentPlans: PlanData[]
		plansElement: HTMLElement | null
		renamePlan: (name: string) => void
		movePlanToNextWeek: () => void
		movePlanToPreviousWeek: () => void
		deletePlan: () => void
		togglePlanDone: () => void
	}

	let {
		currentPlans,
		plansElement = $bindable(),
		renamePlan,
		movePlanToNextWeek,
		movePlanToPreviousWeek,
		deletePlan,
		togglePlanDone,
	}: Props = $props()
</script>

<div bind:this={plansElement}>
	{#each currentPlans as plan (plan.id)}
		<Plan
			{plan}
			{renamePlan}
			{movePlanToNextWeek}
			{movePlanToPreviousWeek}
			{deletePlan}
			{togglePlanDone}
		/>
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
