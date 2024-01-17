<script lang="ts">
	import type { PlanData } from "@/shared/types"
	import {
		addOneWeek,
		getWeekStart,
		key,
		removeOneWeek,
	} from "@/shared/utils"
	import { editingID, plans } from "@/shared/stores"

	import WeekMenu from "@/components/WeekMenu.svelte"
	import Header from "@/components/Header.svelte"
	import Plans from "@/components/Plans.svelte"
	import AddPlan from "@/components/AddPlan.svelte"

	const now = new Date()
	let weekStart = getWeekStart(now)
	let plansElement: HTMLElement
	$: currentPlans = $plans[key(weekStart)] ?? []

	function createPlan(name: string) {
		if (!name) return
		const plan: PlanData = {
			id: crypto.randomUUID(),
			name,
			done: false,
		}
		$plans[key(weekStart)] = [...currentPlans, plan]
	}

	function move(offset: 1 | -1): void {
		const id = $editingID
		if (!id) return
		const plan = currentPlans.find((p) => p.id === id)
		if (!plan) return

		$plans[key(weekStart)] = currentPlans.filter((p) => p.id != id)

		const action = offset === 1 ? addOneWeek : removeOneWeek
		const newDate = action(weekStart)

		$plans[key(newDate)] ??= []
		$plans[key(newDate)] = [...$plans[key(newDate)], plan]
		cancelEdit()
	}

	function deletePlan(): void {
		$plans[key(weekStart)] = currentPlans.filter((p) => p.id != $editingID)
		cancelEdit()
	}

	function toggleDone(): void {
		const plan = currentPlans.find((p) => p.id === $editingID)
		if (!plan) return
		plan.done = !plan.done
		$plans[key(weekStart)] = currentPlans
		cancelEdit()
	}

	function renamePlan(name: string): void {
		if (!name) return
		const plan = currentPlans.find((p) => p.id === $editingID)
		if (!plan) return
		plan.name = name
		$plans[key(weekStart)] = currentPlans
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape") cancelEdit()
	}

	function handleClick(event: MouseEvent) {
		const isOutside = !plansElement?.contains(event.target as Node)
		if ($editingID && isOutside) cancelEdit()
	}

	function cancelEdit() {
		$editingID = null
	}
</script>

<svelte:document on:click={handleClick} />
<svelte:window on:keydown={handleKeydown} />

<Header>Week Planner</Header>

<main>
	<WeekMenu bind:weekStart />
	<AddPlan on:add={(e) => createPlan(e.detail)} />
	<Plans
		{currentPlans}
		bind:plansElement
		on:next={() => move(1)}
		on:previous={() => move(-1)}
		on:delete={deletePlan}
		on:toggleDone={toggleDone}
		on:rename={(e) => renamePlan(e.detail)}
	/>
</main>

<style>
	main {
		max-width: 40rem;
		margin: 0 auto;
		padding-inline: 1rem;
		overflow-x: hidden;
	}
</style>
