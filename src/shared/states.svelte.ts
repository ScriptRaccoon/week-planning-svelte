export const editingID = $state<{ value: string | null }>({ value: null })

export function cancelEditing() {
	editingID.value = null
}

export function createLocalStore<T>(key: string, defaultValue: T) {
	let state = $state<T>(defaultValue)

	try {
		const item = localStorage.getItem(key)
		if (item) state = JSON.parse(item)
	} catch {
		state = defaultValue
	}

	$effect(() => {
		localStorage.setItem(key, JSON.stringify(state))
	})

	return state
}
