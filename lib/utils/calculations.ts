import { Decimal } from '@prisma/client/runtime/library'

/**
 * Add two decimal numbers
 */
export function addDecimal(
	a: Decimal | number | string,
	b: Decimal | number | string
): Decimal {
	const decimalA = new Decimal(a.toString())
	const decimalB = new Decimal(b.toString())
	return decimalA.add(decimalB)
}

/**
 * Subtract two decimal numbers
 */
export function subtractDecimal(
	a: Decimal | number | string,
	b: Decimal | number | string
): Decimal {
	const decimalA = new Decimal(a.toString())
	const decimalB = new Decimal(b.toString())
	return decimalA.sub(decimalB)
}

/**
 * Multiply two decimal numbers
 */
export function multiplyDecimal(
	a: Decimal | number | string,
	b: Decimal | number | string
): Decimal {
	const decimalA = new Decimal(a.toString())
	const decimalB = new Decimal(b.toString())
	return decimalA.mul(decimalB)
}

/**
 * Divide two decimal numbers
 */
export function divideDecimal(
	a: Decimal | number | string,
	b: Decimal | number | string
): Decimal {
	const decimalA = new Decimal(a.toString())
	const decimalB = new Decimal(b.toString())
	return decimalA.div(decimalB)
}

/**
 * Calculate percentage of total
 */
export function calculatePercentageDecimal(
	value: Decimal | number | string,
	total: Decimal | number | string
): number {
	const decimalValue = new Decimal(value.toString())
	const decimalTotal = new Decimal(total.toString())

	if (decimalTotal.isZero()) return 0

	return decimalValue.div(decimalTotal).mul(100).toNumber()
}

/**
 * Convert Decimal to number safely
 */
export function toNumber(value: Decimal | number | string): number {
	if (typeof value === 'number') return value
	return new Decimal(value.toString()).toNumber()
}

/**
 * Convert Decimal to formatted string
 */
export function toFixed(
	value: Decimal | number | string,
	decimals: number = 2
): string {
	return new Decimal(value.toString()).toFixed(decimals)
}

/**
 * Compare two decimal numbers
 */
export function compareDecimal(
	a: Decimal | number | string,
	b: Decimal | number | string
): -1 | 0 | 1 {
	const decimalA = new Decimal(a.toString())
	const decimalB = new Decimal(b.toString())
	return decimalA.comparedTo(decimalB) as -1 | 0 | 1
}

/**
 * Check if decimal is zero
 */
export function isZero(value: Decimal | number | string): boolean {
	return new Decimal(value.toString()).isZero()
}

/**
 * Check if decimal is positive
 */
export function isPositive(value: Decimal | number | string): boolean {
	return new Decimal(value.toString()).isPositive()
}

/**
 * Check if decimal is negative
 */
export function isNegative(value: Decimal | number | string): boolean {
	return new Decimal(value.toString()).isNegative()
}
