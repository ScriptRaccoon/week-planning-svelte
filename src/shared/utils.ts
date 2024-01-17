export function getWeekStart(date: Date) {
	const weekStart = new Date(date)
	weekStart.setDate(date.getDate() - dayIndex(date))
	return weekStart
}

export function getWeekEnd(date: Date) {
	const weekEnd = new Date(date)
	weekEnd.setDate(date.getDate() + (6 - dayIndex(date)))
	return weekEnd
}

export function addOneWeek(date: Date) {
	const newDate = new Date(date)
	newDate.setDate(date.getDate() + 7)
	return newDate
}

export function removeOneWeek(date: Date) {
	const newDate = new Date(date)
	newDate.setDate(date.getDate() - 7)
	return newDate
}

function dayIndex(date: Date) {
	return (date.getDay() + 6) % 7
}

export function key(date: Date): string {
	return date.toISOString().slice(0, 10)
}
