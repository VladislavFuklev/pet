import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes without conflicts
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Format currency amount
 */
export function formatCurrency(
	amount: number | string,
	currency: string = 'USD'
): string {
	const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount

	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(numAmount)
}

/**
 * Format number with separators
 */
export function formatNumber(value: number | string): string {
	const numValue = typeof value === 'string' ? parseFloat(value) : value
	return new Intl.NumberFormat('en-US').format(numValue)
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
	if (total === 0) return 0
	return Math.round((value / total) * 100)
}

/**
 * Format percentage
 */
export function formatPercentage(value: number): string {
	return `${value.toFixed(1)}%`
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number = 50): string {
	if (text.length <= length) return text
	return text.slice(0, length) + '...'
}

/**
 * Generate random color for categories
 */
export function generateCategoryColor(): string {
	const colors = [
		'#3b82f6', // blue
		'#ef4444', // red
		'#10b981', // green
		'#f59e0b', // amber
		'#8b5cf6', // violet
		'#ec4899', // pink
		'#06b6d4', // cyan
		'#f97316', // orange
		'#84cc16', // lime
		'#6366f1', // indigo
	]
	return colors[Math.floor(Math.random() * colors.length)]
}
