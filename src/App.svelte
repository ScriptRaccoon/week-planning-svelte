<script lang="ts">
	import type { Plan_Data } from "./types"
	import { add_one_week, get_week_start, key, remove_one_week } from "./utils"
	import { editing_id, plans } from "./stores"

	import WeekMenu from "./lib/WeekMenu.svelte"
	import Header from "./lib/Header.svelte"
	import Plans from "./lib/Plans.svelte"
	import AddPlan from "./lib/AddPlan.svelte"

	const now = new Date()
	let week_start = get_week_start(now)
	$: current_plans = $plans[key(week_start)] ?? []

	function create_plan(name: string) {
		if (!name) return
		const plan: Plan_Data = {
			id: crypto.randomUUID(),
			name,
			done: false,
		}
		$plans[key(week_start)] = [...current_plans, plan]
	}

	function move(offset: 1 | -1): void {
		const id = $editing_id
		if (!id) return
		const plan = current_plans.find((p) => p.id === id)
		if (!plan) return

		$plans[key(week_start)] = current_plans.filter((p) => p.id != id)

		const action = offset === 1 ? add_one_week : remove_one_week
		const new_date = action(week_start)

		$plans[key(new_date)] ??= []
		$plans[key(new_date)] = [...$plans[key(new_date)], plan]
		cancel_edit()
	}

	function delete_plan(): void {
		$plans[key(week_start)] = current_plans.filter(
			(p) => p.id != $editing_id
		)
		cancel_edit()
	}

	function toggle_done(): void {
		const plan = current_plans.find((p) => p.id === $editing_id)
		if (!plan) return
		plan.done = !plan.done
		$plans[key(week_start)] = current_plans
		cancel_edit()
	}

	function rename_plan(name: string): void {
		if (!name) return
		const plan = current_plans.find((p) => p.id === $editing_id)
		if (!plan) return
		plan.name = name
		$plans[key(week_start)] = current_plans
	}

	function handle_keydown(e: KeyboardEvent) {
		if (e.key === "Escape") cancel_edit()
	}

	function cancel_edit() {
		$editing_id = null
	}
</script>

<svelte:window on:keydown={handle_keydown} />

<Header />

<main>
	<WeekMenu bind:week_start />
	<AddPlan on:add={(e) => create_plan(e.detail)} />
	<Plans
		{current_plans}
		on:next={() => move(1)}
		on:previous={() => move(-1)}
		on:delete={delete_plan}
		on:toggle_done={toggle_done}
		on:rename={(e) => rename_plan(e.detail)}
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
