import { writable } from "svelte/store"
import type { PlanData } from "./types"

export const editing_id = writable<string | null>(null)
export const plans = writable<Record<string, PlanData[]>>({})
