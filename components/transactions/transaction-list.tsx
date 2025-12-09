'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { deleteTransaction } from '@/lib/actions/transactions'
import { formatCurrency } from '@/lib/utils'
import { formatDate } from '@/lib/utils/date'
import { TransactionType } from '@prisma/client'
import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface Transaction {
	id: string
	amount: string
	description: string
	date: string
	type: TransactionType
	category: {
		name: string
	}
}

interface TransactionListProps {
	transactions: Transaction[]
	onEdit?: (transaction: Transaction) => void
	onDelete?: () => void
}

export function TransactionList({
	transactions,
	onEdit,
	onDelete,
}: TransactionListProps) {
	const [deletingId, setDeletingId] = useState<string | null>(null)

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this transaction?')) return

		setDeletingId(id)
		try {
			const result = await deleteTransaction(id)
			if (result.error) {
				toast.error(result.error)
			} else {
				toast.success('Transaction deleted successfully')
				onDelete?.()
			}
		} catch {
			toast.error('Failed to delete transaction')
		} finally {
			setDeletingId(null)
		}
	}

	if (transactions.length === 0) {
		return (
			<Card className='p-8 text-center'>
				<p className='text-gray-500'>
					No transactions found. Create your first transaction to get started.
				</p>
			</Card>
		)
	}

	return (
		<div className='space-y-2'>
			{/* Desktop: Table view */}
			<div className='hidden md:block overflow-x-auto'>
				<table className='w-full'>
					<thead className='border-b'>
						<tr className='text-left'>
							<th className='pb-2 font-medium'>Date</th>
							<th className='pb-2 font-medium'>Description</th>
							<th className='pb-2 font-medium'>Category</th>
							<th className='pb-2 font-medium'>Type</th>
							<th className='pb-2 font-medium text-right'>Amount</th>
							<th className='pb-2 font-medium text-right'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map(transaction => (
							<tr key={transaction.id} className='border-b last:border-0'>
								<td className='py-3'>
									{formatDate(new Date(transaction.date))}
								</td>
								<td className='py-3'>{transaction.description}</td>
								<td className='py-3'>{transaction.category.name}</td>
								<td className='py-3'>
									<span
										className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
											transaction.type === TransactionType.INCOME
												? 'bg-green-100 text-green-800'
												: 'bg-red-100 text-red-800'
										}`}
									>
										{transaction.type === TransactionType.INCOME
											? 'Income'
											: 'Expense'}
									</span>
								</td>
								<td className='py-3 text-right font-medium'>
									<span
										className={
											transaction.type === TransactionType.INCOME
												? 'text-green-600'
												: 'text-red-600'
										}
									>
										{transaction.type === TransactionType.INCOME ? '+' : '-'}
										{formatCurrency(parseFloat(transaction.amount))}
									</span>
								</td>
								<td className='py-3 text-right'>
									<div className='flex justify-end gap-2'>
										<Button
											variant='ghost'
											size='sm'
											onClick={() => onEdit?.(transaction)}
											disabled={deletingId === transaction.id}
										>
											<Pencil className='h-4 w-4' />
										</Button>
										<Button
											variant='ghost'
											size='sm'
											onClick={() => handleDelete(transaction.id)}
											disabled={deletingId === transaction.id}
										>
											<Trash2 className='h-4 w-4' />
										</Button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Mobile: Card view */}
			<div className='md:hidden space-y-2'>
				{transactions.map(transaction => (
					<Card key={transaction.id} className='p-4'>
						<div className='flex justify-between items-start mb-2'>
							<div>
								<p className='font-medium'>{transaction.description}</p>
								<p className='text-sm text-gray-500'>
									{transaction.category.name}
								</p>
							</div>
							<span
								className={`text-lg font-bold ${
									transaction.type === TransactionType.INCOME
										? 'text-green-600'
										: 'text-red-600'
								}`}
							>
								{transaction.type === TransactionType.INCOME ? '+' : '-'}
								{formatCurrency(parseFloat(transaction.amount))}
							</span>
						</div>
						<div className='flex justify-between items-center'>
							<span className='text-sm text-gray-500'>
								{formatDate(new Date(transaction.date))}
							</span>
							<div className='flex gap-2'>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => onEdit?.(transaction)}
									disabled={deletingId === transaction.id}
								>
									<Pencil className='h-4 w-4' />
								</Button>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => handleDelete(transaction.id)}
									disabled={deletingId === transaction.id}
								>
									<Trash2 className='h-4 w-4' />
								</Button>
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	)
}
