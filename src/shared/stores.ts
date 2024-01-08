import { writable, type Writable } from "svelte/store"
import type { Plan_Data } from "@/shared/types"

function local_store<T>(
	key: string,
	default_value: T,
	update: (value: T) => void = () => {}
): Writable<T> {
	let initial_value: T
	try {
		const has_stored_value = localStorage.getItem(key) !== null
		initial_value = has_stored_value
			? JSON.parse(localStorage.getItem(key)!)
			: default_value
	} catch (_) {
		initial_value = default_value
	}

	const store = writable<T>(initial_value)

	store.subscribe((value: T) => {
		localStorage.setItem(key, JSON.stringify(value))
		update(value)
	})

	return store
}

export const editing_id = writable<string | null>(null)
export const plans = local_store<Record<string, Plan_Data[]>>("plans", {})
