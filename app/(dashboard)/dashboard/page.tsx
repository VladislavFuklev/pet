import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	ArrowDownIcon,
	ArrowUpIcon,
	DollarSign,
	TrendingUp,
	Wallet,
} from 'lucide-react'

export default function DashboardPage() {
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
						<div className='text-2xl font-bold'>$5,420.00</div>
						<p className='text-xs text-gray-500 dark:text-gray-400'>
							<span className='text-green-600 dark:text-green-400'>+12.5%</span>{' '}
							from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Income</CardTitle>
						<ArrowUpIcon className='h-4 w-4 text-green-600' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold text-green-600'>$8,240.00</div>
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
						<div className='text-2xl font-bold text-red-600'>$2,820.00</div>
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
						<div className='text-2xl font-bold text-blue-600'>65.8%</div>
						<p className='text-xs text-gray-500 dark:text-gray-400'>
							Of total income
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Recent Transactions */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Transactions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-4'>
								<div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900'>
									<DollarSign className='h-5 w-5 text-blue-600' />
								</div>
								<div>
									<p className='font-medium'>Salary</p>
									<p className='text-sm text-gray-500'>Dec 1, 2025</p>
								</div>
							</div>
							<div className='text-right'>
								<p className='font-medium text-green-600'>+$5,000.00</p>
								<p className='text-sm text-gray-500'>Income</p>
							</div>
						</div>
						<div className='text-center py-8 text-gray-500'>
							<p>
								No transactions yet. Start by adding your first transaction!
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
