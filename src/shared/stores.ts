import { writable, type Writable } from "svelte/store"
import type { PlanData } from "@/shared/types"

// TODO: migrate this to a $state

function localStore<T>(
	key: string,
	defaultValue: T,
	update: (value: T) => void = () => {}
): Writable<T> {
	let initialValue: T
	try {
		const hasStoredValue = localStorage.getItem(key) !== null
		initialValue = hasStoredValue
			? JSON.parse(localStorage.getItem(key)!)
			: defaultValue
	} catch (_) {
		initialValue = defaultValue
	}

	const store = writable<T>(initialValue)

	store.subscribe((value: T) => {
		localStorage.setItem(key, JSON.stringify(value))
		update(value)
	})

	return store
}

// TODO: migrate these also to two $states

export const editingID = writable<string | null>(null)
export const plans = localStore<Record<string, PlanData[]>>("plans", {})
