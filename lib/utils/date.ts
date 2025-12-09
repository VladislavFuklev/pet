import { format, formatDistance, isToday, isYesterday, parse } from 'date-fns'

/**
 * Format date for display
 */
export function formatDate(
	date: Date | string,
	formatStr: string = 'MMM dd, yyyy'
): string {
	const dateObj = typeof date === 'string' ? new Date(date) : date
	return format(dateObj, formatStr)
}

/**
 * Format date and time
 */
export function formatDateTime(date: Date | string): string {
	const dateObj = typeof date === 'string' ? new Date(date) : date
	return format(dateObj, 'MMM dd, yyyy HH:mm')
}

/**
 * Format date relative to now (e.g., "2 days ago")
 */
export function formatRelativeDate(date: Date | string): string {
	const dateObj = typeof date === 'string' ? new Date(date) : date
	return formatDistance(dateObj, new Date(), { addSuffix: true })
}

/**
 * Format date as "Today", "Yesterday", or date
 */
export function formatSmartDate(date: Date | string): string {
	const dateObj = typeof date === 'string' ? new Date(date) : date

	if (isToday(dateObj)) return 'Today'
	if (isYesterday(dateObj)) return 'Yesterday'

	return format(dateObj, 'MMM dd, yyyy')
}

/**
 * Parse date from string
 */
export function parseDate(
	dateStr: string,
	formatStr: string = 'yyyy-MM-dd'
): Date {
	return parse(dateStr, formatStr, new Date())
}

/**
 * Get start of current month
 */
export function getStartOfMonth(date: Date = new Date()): Date {
	return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * Get end of current month
 */
export function getEndOfMonth(date: Date = new Date()): Date {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)
}

/**
 * Get date range for period
 */
export function getDateRangeForPeriod(
	period: 'week' | 'month' | 'quarter' | 'year'
): {
	start: Date
	end: Date
} {
	const now = new Date()
	const year = now.getFullYear()
	const month = now.getMonth()

	switch (period) {
		case 'week': {
			const day = now.getDay()
			const start = new Date(now)
			start.setDate(now.getDate() - day)
			start.setHours(0, 0, 0, 0)
			const end = new Date(start)
			end.setDate(start.getDate() + 6)
			end.setHours(23, 59, 59, 999)
			return { start, end }
		}
		case 'month':
			return {
				start: new Date(year, month, 1),
				end: new Date(year, month + 1, 0, 23, 59, 59, 999),
			}
		case 'quarter': {
			const quarterStartMonth = Math.floor(month / 3) * 3
			return {
				start: new Date(year, quarterStartMonth, 1),
				end: new Date(year, quarterStartMonth + 3, 0, 23, 59, 59, 999),
			}
		}
		case 'year':
			return {
				start: new Date(year, 0, 1),
				end: new Date(year, 11, 31, 23, 59, 59, 999),
			}
	}
}
