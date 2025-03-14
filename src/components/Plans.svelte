<script lang="ts">
	import type { PlanData } from "@/shared/types"
	import Plan from "@/components/Plan.svelte"
	import { cancelEditing, editingID } from "@/shared/states.svelte"

	type Props = {
		currentPlans: PlanData[]
		movePlanToNextWeek: (id: string) => void
		movePlanToPreviousWeek: (id: string) => void
		deletePlan: (id: string) => void
	}

	let { currentPlans, movePlanToNextWeek, movePlanToPreviousWeek, deletePlan }: Props =
		$props()

	let plansElement = $state<HTMLElement | null>(null)

	function handleClick(event: MouseEvent) {
		const isOutside = !plansElement?.contains(event.target as Node)
		if (editingID.value && isOutside) cancelEditing()
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape") cancelEditing()
	}
</script>

<svelte:document onclick={handleClick} />
<svelte:window onkeydown={handleKeydown} />

<div bind:this={plansElement}>
	{#each currentPlans as plan (plan.id)}
		<Plan
			{plan}
			movePlanToNextWeek={() => movePlanToNextWeek(plan.id)}
			movePlanToPreviousWeek={() => movePlanToPreviousWeek(plan.id)}
			deletePlan={() => deletePlan(plan.id)}
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
