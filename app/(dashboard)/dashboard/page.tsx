import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { formatCurrency } from '@/lib/utils'
import { TransactionType } from '@prisma/client'
import { endOfMonth, startOfMonth } from 'date-fns'
import {
	ArrowDownIcon,
	ArrowUpIcon,
	DollarSign,
	TrendingUp,
	Wallet,
} from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
	const session = await auth()
	if (!session?.user?.id) {
		redirect('/login')
	}

	// Get current month date range
	const now = new Date()
	const monthStart = startOfMonth(now)
	const monthEnd = endOfMonth(now)

	// Fetch transactions for current month
	const transactions = await db.transaction.findMany({
		where: {
			userId: session.user.id,
			deletedAt: null,
			date: {
				gte: monthStart,
				lte: monthEnd,
			},
		},
		select: {
			amount: true,
			type: true,
		},
	})

	// Calculate totals
	const income = transactions
		.filter(t => t.type === TransactionType.INCOME)
		.reduce((sum, t) => sum + Number(t.amount), 0)

	const expenses = transactions
		.filter(t => t.type === TransactionType.EXPENSE)
		.reduce((sum, t) => sum + Number(t.amount), 0)

	const balance = income - expenses
	const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0

	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
				<p className='text-gray-500 dark:text-gray-400'>
					Overview of your financial activity
				</p>
			</div>

			{/* Summary Cards */}
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Total Balance</CardTitle>
						<Wallet className='h-4 w-4 text-gray-500' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{formatCurrency(balance)}</div>
						<p className='text-xs text-gray-500 dark:text-gray-400'>
							This month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Income</CardTitle>
						<ArrowUpIcon className='h-4 w-4 text-green-600' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold text-green-600'>
							{formatCurrency(income)}
						</div>
						<p className='text-xs text-gray-500 dark:text-gray-400'>
							This month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Expenses</CardTitle>
						<ArrowDownIcon className='h-4 w-4 text-red-600' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold text-red-600'>
							{formatCurrency(expenses)}
						</div>
						<p className='text-xs text-gray-500 dark:text-gray-400'>
							This month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Savings Rate</CardTitle>
						<TrendingUp className='h-4 w-4 text-blue-600' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold text-blue-600'>
							{savingsRate.toFixed(1)}%
						</div>
						<p className='text-xs text-gray-500 dark:text-gray-400'>
							Of total income
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Empty State */}
			{transactions.length === 0 && (
				<Card>
					<CardContent className='pt-6'>
						<div className='text-center py-12'>
							<DollarSign className='h-12 w-12 text-gray-400 mx-auto mb-4' />
							<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-2'>
								No transactions yet
							</h3>
							<p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>
								Start by adding your first transaction to see your financial
								overview
							</p>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	)
}
