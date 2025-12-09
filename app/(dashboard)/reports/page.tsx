import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ReportsPage() {
	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Reports</h1>
				<p className='text-gray-500 dark:text-gray-400'>
					Analyze your financial data
				</p>
			</div>

			<div className='grid gap-4 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Monthly Report</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-center py-8 text-gray-500'>
							<p>Not enough data yet</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Category Breakdown</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-center py-8 text-gray-500'>
							<p>Not enough data yet</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
