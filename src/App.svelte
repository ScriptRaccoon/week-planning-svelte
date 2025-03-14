<script lang="ts">
	import type { PlanData } from "@/shared/types"
	import { addOneWeek, getWeekStart, key, subtractOneWeek } from "@/shared/utils"
	import { createLocalStore, cancelEditing } from "@/shared/states.svelte"

	import WeekMenu from "@/components/WeekMenu.svelte"
	import Header from "@/components/Header.svelte"
	import Plans from "@/components/Plans.svelte"
	import AddPlan from "@/components/AddPlan.svelte"

	const plans = createLocalStore<Record<string, PlanData[]>>("plans", {})

	const now = new Date()
	const initialWeekStart = getWeekStart(now)
	let weekStart = $state(initialWeekStart)

	plans[key(initialWeekStart)] ??= []

	let currentPlans = $derived(plans[key(weekStart)])

	function addPlan(name: string) {
		const plan: PlanData = {
			id: crypto.randomUUID(),
			name,
			done: false,
		}
		plans[key(weekStart)].push(plan)
	}

	function movePlan(id: string, weekOffset: 1 | -1): void {
		const plan = currentPlans.find((p) => p.id === id)
		if (!plan) return

		plans[key(weekStart)] = currentPlans.filter((p) => p.id != id)

		const newDate =
			weekOffset === 1 ? addOneWeek(weekStart) : subtractOneWeek(weekStart)

		plans[key(newDate)] ??= []
		plans[key(newDate)].push(plan)
		cancelEditing()
	}

	function deletePlan(id: string): void {
		plans[key(weekStart)] = currentPlans.filter((p) => p.id != id)
		cancelEditing()
	}

	function incrementWeek() {
		weekStart = addOneWeek(weekStart)
		cancelEditing()
	}

	function decrementWeek() {
		weekStart = subtractOneWeek(weekStart)
		cancelEditing()
	}
</script>

<Header>Week Planner</Header>

<main>
	<WeekMenu {weekStart} {incrementWeek} {decrementWeek} />
	<AddPlan {addPlan} />
	<Plans
		{currentPlans}
		movePlanToNextWeek={(id) => movePlan(id, 1)}
		movePlanToPreviousWeek={(id) => movePlan(id, -1)}
		{deletePlan}
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
