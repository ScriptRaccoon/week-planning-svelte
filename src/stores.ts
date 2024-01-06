import { writable } from "svelte/store"

export const editing_id = writable<string | null>(null)
