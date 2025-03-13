/**
 * Returns a string key for a date in the format 'YYYY-MM-DD'.
 */
export function key(date: Date): string {
	return date.toISOString().slice(0, 10)
}

/**
 * Returns the first day of the week of the given date.
 */
export function getWeekStart(date: Date) {
	const weekStart = new Date(date)
	weekStart.setDate(date.getDate() - dayIndex(date))
	return weekStart
}

/**
 * Returns the last day of the week of the given date.
 */
export function getWeekEnd(date: Date) {
	const weekEnd = new Date(date)
	weekEnd.setDate(date.getDate() + (6 - dayIndex(date)))
	return weekEnd
}

/**
 * Monday = 0, Tuesday = 1, ..., Sunday = 6
 */
function dayIndex(date: Date) {
	return (date.getDay() + 6) % 7
}

/**
 * Returns a new date that is one week after the given date.
 */
export function addOneWeek(date: Date) {
	const newDate = new Date(date)
	newDate.setDate(date.getDate() + 7)
	return newDate
}

/**
 * Returns a new date that is one week before the given date.
 */
export function subtractOneWeek(date: Date) {
	const newDate = new Date(date)
	newDate.setDate(date.getDate() - 7)
	return newDate
}
