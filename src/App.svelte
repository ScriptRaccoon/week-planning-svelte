<script lang="ts">
	import type { PlanData } from "@/shared/types"
	import { addOneWeek, getWeekStart, key, removeOneWeek } from "@/shared/utils"
	import { editingID, createLocalStore } from "@/shared/states.svelte"

	import WeekMenu from "@/components/WeekMenu.svelte"
	import Header from "@/components/Header.svelte"
	import Plans from "@/components/Plans.svelte"
	import AddPlan from "@/components/AddPlan.svelte"

	const plans = createLocalStore<Record<string, PlanData[]>>("plans", {})

	const now = new Date()
	let weekStart = $state(getWeekStart(now))
	let plansElement = $state<HTMLElement | null>(null)
	plans.value[key(weekStart)] ??= []
	let currentPlans = $derived(plans.value[key(weekStart)])

	function createPlan(name: string) {
		if (!name) return
		const plan: PlanData = {
			id: crypto.randomUUID(),
			name,
			done: false,
		}
		plans.value[key(weekStart)].push(plan)
	}

	function move(offset: 1 | -1): void {
		const id = editingID.value
		if (!id) return
		const plan = currentPlans.find((p) => p.id === id)
		if (!plan) return

		plans.value[key(weekStart)] = currentPlans.filter((p) => p.id != id)

		const action = offset === 1 ? addOneWeek : removeOneWeek
		const newDate = action(weekStart)

		plans.value[key(newDate)] ??= []
		plans.value[key(newDate)].push(plan)
		cancelEdit()
	}

	function deletePlan(): void {
		plans.value[key(weekStart)] = currentPlans.filter((p) => p.id != editingID.value)
		cancelEdit()
	}

	function toggleDone(): void {
		const plan = currentPlans.find((p) => p.id === editingID.value)
		if (!plan) return
		plan.done = !plan.done
		cancelEdit()
	}

	function renamePlan(name: string): void {
		if (!name) return
		const plan = currentPlans.find((p) => p.id === editingID.value)
		if (!plan) return
		plan.name = name
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape") cancelEdit()
	}

	function handleClick(event: MouseEvent) {
		const isOutside = !plansElement?.contains(event.target as Node)
		if (editingID.value && isOutside) cancelEdit()
	}

	function cancelEdit() {
		editingID.value = null
	}
</script>

<svelte:document onclick={handleClick} />
<svelte:window onkeydown={handleKeydown} />

<Header>Week Planner</Header>

<main>
	<WeekMenu bind:weekStart />
	<AddPlan addPlan={createPlan} />
	<Plans
		{currentPlans}
		bind:plansElement
		next={() => move(1)}
		previous={() => move(-1)}
		{deletePlan}
		{toggleDone}
		{renamePlan}
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
