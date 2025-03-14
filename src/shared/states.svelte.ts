/**
 * The ID of the plan that is currently being edited.
 * Needs to be wrapped with .value for reactivity.
 */
export const editingID = $state<{ value: string | null }>({ value: null })

export function cancelEditing(): void {
	editingID.value = null
}

/**
 * Creates a state that is synced with the local storage.
 */
export function createLocalStore<T>(key: string, defaultValue: T): T {
	const state = $state<T>(getStoredValue(key, defaultValue))

	$effect(() => {
		localStorage.setItem(key, JSON.stringify(state))
	})

	return state
}

function getStoredValue<T>(key: string, defaultValue: T): T {
	const item = localStorage.getItem(key)
	try {
		return item ? JSON.parse(item) : defaultValue
	} catch (_) {
		return defaultValue
	}
}
