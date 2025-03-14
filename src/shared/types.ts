export type PlanData = {
	id: string
	name: string
	done: boolean
}

export type PlansData = Partial<Record<string, PlanData[]>>
