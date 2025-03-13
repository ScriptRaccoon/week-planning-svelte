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
	const state = $state<T>(getStoredValue(key, defaultValue))

	$effect(() => {
		localStorage.setItem(key, JSON.stringify(state))
	})

	return state
}

function getStoredValue<T>(key: string, defaultValue: T): T {
	try {
		const hasStoredValue = localStorage.getItem(key) !== null
		return hasStoredValue ? JSON.parse(localStorage.getItem(key)!) : defaultValue
	} catch (_) {
		return defaultValue
	}
}
