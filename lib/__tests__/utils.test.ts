import { calculatePercentage, formatCurrency, formatNumber } from '../utils'

describe('Utils', () => {
	describe('formatCurrency', () => {
		it('should format number as currency', () => {
			expect(formatCurrency(1000)).toBe('$1,000.00')
			expect(formatCurrency(1234.56)).toBe('$1,234.56')
		})

		it('should format string as currency', () => {
			expect(formatCurrency('1000')).toBe('$1,000.00')
			expect(formatCurrency('1234.56')).toBe('$1,234.56')
		})
	})

	describe('formatNumber', () => {
		it('should format number with separators', () => {
			expect(formatNumber(1000)).toBe('1,000')
			expect(formatNumber(1234567)).toBe('1,234,567')
		})
	})

	describe('calculatePercentage', () => {
		it('should calculate percentage correctly', () => {
			expect(calculatePercentage(50, 100)).toBe(50)
			expect(calculatePercentage(25, 100)).toBe(25)
			expect(calculatePercentage(75, 150)).toBe(50)
		})

		it('should return 0 when total is 0', () => {
			expect(calculatePercentage(50, 0)).toBe(0)
		})
	})
})
