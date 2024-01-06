<script lang="ts">
	import type { PlanData } from "./types"
	import { add_one_week, get_week_start, remove_one_week } from "./utils"
	import { plans } from "./stores"

	import WeekMenu from "./lib/WeekMenu.svelte"
	import Header from "./lib/Header.svelte"
	import Plans from "./lib/Plans.svelte"
	import AddPlan from "./lib/AddPlan.svelte"

	const now = new Date()

	let week_start = get_week_start(now)

	$: current_plans = $plans[week_start.toISOString()] ?? []

	function create_plan(name: string) {
		if (!name) return
		const plan: PlanData = {
			id: crypto.randomUUID(),
			name,
			done: false,
		}
		$plans[week_start.toISOString()] = [...current_plans, plan]
		name = ""
	}

	function move(id: string, direction: number): void {
		const plan = current_plans.find((p) => p.id === id)
		if (!plan) return

		$plans[week_start.toISOString()] = current_plans.filter(
			(p) => p.id != id
		)

		week_start =
			direction === -1
				? remove_one_week(week_start)
				: add_one_week(week_start)

		if (!$plans[week_start.toISOString()])
			$plans[week_start.toISOString()] = []

		$plans[week_start.toISOString()] = [
			...$plans[week_start.toISOString()],
			plan,
		]
	}

	function delete_plan(id: string): void {
		$plans[week_start.toISOString()] = current_plans.filter(
			(p) => p.id != id
		)
	}

	function toggle_done(id: string): void {
		const plan = current_plans.find((p) => p.id === id)
		if (!plan) return
		plan.done = !plan.done
		$plans[week_start.toISOString()] = current_plans
	}

	function rename_plan(id: string, name: string): void {
		const plan = current_plans.find((p) => p.id === id)
		if (!plan) return
		plan.name = name
		$plans[week_start.toISOString()] = current_plans
	}
</script>

<Header />

<main>
	<WeekMenu bind:week_start />
	<AddPlan on:add={(e) => create_plan(e.detail)} />
	<Plans
		{current_plans}
		on:previous={(e) => move(e.detail, -1)}
		on:next={(e) => move(e.detail, +1)}
		on:delete={(e) => delete_plan(e.detail)}
		on:toggle_done={(e) => toggle_done(e.detail)}
		on:rename={(e) => rename_plan(...e.detail)}
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
