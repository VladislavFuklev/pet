'use client'

import { TransactionForm } from '@/components/forms/transaction-form'
import { TransactionFilters } from '@/components/transactions/transaction-filters'
import { TransactionList } from '@/components/transactions/transaction-list'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCategories, getTransactions } from '@/lib/actions/transactions'
import { TransactionType } from '@prisma/client'
import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'

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

interface Category {
	id: string
	name: string
	type: TransactionType
}

export default function TransactionsPageContent() {
	const [transactions, setTransactions] = useState<Transaction[]>([])
	const [categories, setCategories] = useState<Category[]>([])
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [editingTransaction, setEditingTransaction] =
		useState<Transaction | null>(null)
	const [filters, setFilters] = useState<{
		type?: TransactionType
		categoryId?: string
		startDate?: string
		endDate?: string
		search?: string
	}>({})
	const [isLoading, setIsLoading] = useState(true)
	const [refreshKey, setRefreshKey] = useState(0)
	const [showFilters, setShowFilters] = useState(false)

	useEffect(() => {
		const loadData = async () => {
			setIsLoading(true)
			try {
				const [transactionsResult, categoriesResult] = await Promise.all([
					getTransactions(filters),
					getCategories(),
				])

				if (transactionsResult.data) {
					const formattedTransactions = transactionsResult.data.map(t => ({
						id: t.id,
						amount: t.amount,
						description: t.description,
						date: t.date.split('T')[0],
						type: t.type,
						category: {
							name: t.category.name,
						},
					}))
					setTransactions(formattedTransactions)
				}
				if (categoriesResult.data) {
					setCategories(categoriesResult.data as Category[])
				}
			} finally {
				setIsLoading(false)
			}
		}

		loadData()
	}, [filters, refreshKey])

	const handleEdit = (transaction: Transaction) => {
		setEditingTransaction(transaction)
		setIsFormOpen(true)
	}

	const handleCloseForm = () => {
		setIsFormOpen(false)
		setEditingTransaction(null)
	}

	const handleSuccess = () => {
		handleCloseForm()
		setRefreshKey(prev => prev + 1)
	}

	const handleDelete = () => {
		setRefreshKey(prev => prev + 1)
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Transactions</h1>
					<p className='text-gray-500 dark:text-gray-400'>
						Manage your income and expenses
					</p>
				</div>
				<Button onClick={() => setIsFormOpen(true)}>
					<Plus className='h-4 w-4 mr-2' />
					Add Transaction
				</Button>
			</div>

			{isFormOpen && (
				<Card>
					<CardHeader>
						<div className='flex items-center justify-between'>
							<CardTitle>
								{editingTransaction ? 'Edit' : 'New'} Transaction
							</CardTitle>
							<Button variant='ghost' size='sm' onClick={handleCloseForm}>
								<X className='h-4 w-4' />
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<TransactionForm
							categories={categories}
							transaction={
								editingTransaction
									? {
											id: editingTransaction.id,
											amount: editingTransaction.amount,
											categoryId: '',
											description: editingTransaction.description,
											date: editingTransaction.date,
											type: editingTransaction.type,
									  }
									: undefined
							}
							onSuccess={handleSuccess}
						/>
					</CardContent>
				</Card>
			)}

			<Card>
				<CardHeader>
					<div className='flex items-center justify-between'>
						<CardTitle>Filters</CardTitle>
						<Button
							variant='ghost'
							size='sm'
							onClick={() => setShowFilters(!showFilters)}
						>
							{showFilters ? (
								<>
									<ChevronUp className='h-4 w-4 mr-2' />
									Hide
								</>
							) : (
								<>
									<ChevronDown className='h-4 w-4 mr-2' />
									Show
								</>
							)}
						</Button>
					</div>
				</CardHeader>
				{showFilters && (
					<CardContent>
						<TransactionFilters
							type={filters.type}
							categoryId={filters.categoryId}
							startDate={filters.startDate}
							endDate={filters.endDate}
							search={filters.search}
							categories={categories}
							onChange={setFilters}
						/>
					</CardContent>
				)}
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>All Transactions</CardTitle>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className='text-center py-8 text-gray-500'>Loading...</div>
					) : (
						<TransactionList
							transactions={transactions}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
