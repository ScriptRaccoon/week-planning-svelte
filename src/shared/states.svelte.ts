export const editingID = $state<{ value: string | null }>({ value: null })

export function cancelEditing() {
	editingID.value = null
}

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
