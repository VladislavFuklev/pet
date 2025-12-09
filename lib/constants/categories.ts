import { TransactionType } from '@prisma/client'

export const DEFAULT_CATEGORIES = [
	// Income categories
	{
		name: 'Salary',
		type: TransactionType.INCOME,
		color: '#10b981',
		icon: 'Banknote',
		isSystem: true,
	},
	{
		name: 'Freelance',
		type: TransactionType.INCOME,
		color: '#06b6d4',
		icon: 'Briefcase',
		isSystem: true,
	},
	{
		name: 'Investment',
		type: TransactionType.INCOME,
		color: '#8b5cf6',
		icon: 'TrendingUp',
		isSystem: true,
	},
	{
		name: 'Other Income',
		type: TransactionType.INCOME,
		color: '#3b82f6',
		icon: 'Plus',
		isSystem: true,
	},
	// Expense categories
	{
		name: 'Food & Dining',
		type: TransactionType.EXPENSE,
		color: '#f59e0b',
		icon: 'UtensilsCrossed',
		isSystem: true,
	},
	{
		name: 'Groceries',
		type: TransactionType.EXPENSE,
		color: '#84cc16',
		icon: 'ShoppingCart',
		isSystem: true,
	},
	{
		name: 'Transportation',
		type: TransactionType.EXPENSE,
		color: '#ef4444',
		icon: 'Car',
		isSystem: true,
	},
	{
		name: 'Housing',
		type: TransactionType.EXPENSE,
		color: '#6366f1',
		icon: 'Home',
		isSystem: true,
	},
	{
		name: 'Utilities',
		type: TransactionType.EXPENSE,
		color: '#14b8a6',
		icon: 'Lightbulb',
		isSystem: true,
	},
	{
		name: 'Healthcare',
		type: TransactionType.EXPENSE,
		color: '#ec4899',
		icon: 'Heart',
		isSystem: true,
	},
	{
		name: 'Entertainment',
		type: TransactionType.EXPENSE,
		color: '#a855f7',
		icon: 'Film',
		isSystem: true,
	},
	{
		name: 'Shopping',
		type: TransactionType.EXPENSE,
		color: '#f97316',
		icon: 'ShoppingBag',
		isSystem: true,
	},
	{
		name: 'Education',
		type: TransactionType.EXPENSE,
		color: '#0ea5e9',
		icon: 'GraduationCap',
		isSystem: true,
	},
	{
		name: 'Travel',
		type: TransactionType.EXPENSE,
		color: '#22d3ee',
		icon: 'Plane',
		isSystem: true,
	},
	{
		name: 'Insurance',
		type: TransactionType.EXPENSE,
		color: '#64748b',
		icon: 'Shield',
		isSystem: true,
	},
	{
		name: 'Other Expense',
		type: TransactionType.EXPENSE,
		color: '#94a3b8',
		icon: 'Minus',
		isSystem: true,
	},
]

export const CURRENCIES = [
	{ code: 'USD', symbol: '$', name: 'US Dollar' },
	{ code: 'EUR', symbol: '€', name: 'Euro' },
	{ code: 'GBP', symbol: '£', name: 'British Pound' },
	{ code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' },
	{ code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
]

export const DEFAULT_CURRENCY = 'USD'
