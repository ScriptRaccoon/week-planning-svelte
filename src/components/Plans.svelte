<script lang="ts">
	import type { Plan_Data } from "@/shared/types"
	import Plan from "@/components/Plan.svelte"

	export let current_plans: Plan_Data[] = []
	export let plans_element: HTMLElement
</script>

<div bind:this={plans_element}>
	{#each current_plans as plan (plan.id)}
		<Plan {plan} on:delete on:next on:previous on:toggle_done on:rename />
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
