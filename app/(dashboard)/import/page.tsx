import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Upload } from 'lucide-react'

export default function ImportPage() {
	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>
					Import Transactions
				</h1>
				<p className='text-gray-500 dark:text-gray-400'>
					Import transactions from your bank statements (CSV)
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Upload CSV File</CardTitle>
					<CardDescription>
						Upload a CSV file from your bank to import transactions
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12'>
						<div className='flex flex-col items-center justify-center text-center'>
							<Upload className='h-12 w-12 text-gray-400 mb-4' />
							<h3 className='text-lg font-semibold mb-2'>
								Drop your CSV file here
							</h3>
							<p className='text-sm text-gray-500 mb-4'>or click to browse</p>
							<Button>Choose File</Button>
						</div>
					</div>

					<div className='mt-6'>
						<h4 className='font-medium mb-2'>Supported formats:</h4>
						<ul className='text-sm text-gray-500 space-y-1'>
							<li>• Monobank CSV</li>
							<li>• PrivatBank CSV</li>
							<li>• Generic CSV (Date, Amount, Description)</li>
						</ul>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
