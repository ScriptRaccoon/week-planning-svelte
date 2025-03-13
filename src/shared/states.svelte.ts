/**
 * The ID of the plan that is currently being edited.
 * Needs to be wrapped with .value for reactivity.
 */
export const editingID = $state<{ value: string | null }>({ value: null })

export function cancelEditing() {
	editingID.value = null
}

/**
 * Creates a state that is synced with the local storage.
 */
export function createLocalStore<T>(key: string, defaultValue: T) {
	let initialValue = defaultValue

	try {
		const item = localStorage.getItem(key)
		if (item) initialValue = JSON.parse(item)
	} catch (_) {}

	const state = $state<T>(initialValue)

	$effect(() => {
		localStorage.setItem(key, JSON.stringify(state))
	})

	return state
}
