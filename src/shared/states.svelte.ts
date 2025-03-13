export const editingID = $state<{ value: string | null }>({ value: null })

export function cancelEditing() {
	editingID.value = null
}

export function createLocalStore<T>(key: string, defaultValue: T) {
	let value = $state<T>(defaultValue)

	try {
		const item = localStorage.getItem(key)
		if (item) value = JSON.parse(item)
	} catch {
		value = defaultValue
	}

	$effect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	})

	return { value }
}
