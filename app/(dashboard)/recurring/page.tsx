import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'

export default function RecurringPage() {
	return (
		<div className='space-y-8'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>
						Recurring Transactions
					</h1>
					<p className='text-gray-500 dark:text-gray-400'>
						Automate your regular income and expenses
					</p>
				</div>
				<Button>
					<Plus className='h-4 w-4 mr-2' />
					Add Recurring
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Active Recurring Transactions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='text-center py-12 text-gray-500'>
						<p className='text-lg mb-4'>No recurring transactions</p>
						<p className='text-sm'>
							Set up automatic transactions like salary or bills!
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
