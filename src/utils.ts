export function get_week_start(date: Date) {
	const week_start = new Date(date)
	week_start.setHours(0, 0, 0, 0)
	week_start.setDate(date.getDate() - day_index(date))
	return week_start
}

export function get_week_end(date: Date) {
	const week_end = new Date(date)
	week_end.setHours(0, 0, 0, 0)
	week_end.setDate(date.getDate() + (6 - day_index(date)))
	return week_end
}

export function add_one_week(date: Date) {
	const new_date = new Date(date)
	new_date.setDate(date.getDate() + 7)
	return new_date
}

export function remove_one_week(date: Date) {
	const new_date = new Date(date)
	new_date.setDate(date.getDate() - 7)
	return new_date
}

function day_index(date: Date) {
	return (date.getDay() + 6) % 7
}
