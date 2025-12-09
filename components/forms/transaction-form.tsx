'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
	createTransaction,
	updateTransaction,
} from '@/lib/actions/transactions'
import {
	transactionSchema,
	type TransactionInput,
} from '@/lib/validations/transaction'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionType } from '@prisma/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface TransactionFormProps {
	categories: Array<{
		id: string
		name: string
		type: TransactionType
	}>
	transaction?: {
		id: string
		amount: string
		categoryId: string
		description: string
		date: string
		type: TransactionType
	}
	onSuccess?: () => void
}

export function TransactionForm({
	categories,
	transaction,
	onSuccess,
}: TransactionFormProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [selectedType, setSelectedType] = useState<TransactionType>(
		transaction?.type || TransactionType.EXPENSE
	)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TransactionInput>({
		resolver: zodResolver(transactionSchema),
		defaultValues: transaction
			? {
					amount: transaction.amount,
					categoryId: transaction.categoryId,
					description: transaction.description,
					date: transaction.date,
					type: transaction.type,
			  }
			: {
					type: TransactionType.EXPENSE,
					date: new Date().toISOString().split('T')[0],
			  },
	})

	const filteredCategories = categories.filter(cat => cat.type === selectedType)

	const onSubmit = async (data: TransactionInput) => {
		setIsLoading(true)

		try {
			const result = transaction?.id
				? await updateTransaction(transaction.id, data)
				: await createTransaction(data)

			if (result.error) {
				toast.error(result.error)
			} else {
				toast.success(
					transaction
						? 'Transaction updated successfully'
						: 'Transaction created successfully'
				)
				if (!transaction) {
					reset()
				}
				onSuccess?.()
			}
		} catch {
			toast.error('Something went wrong')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<div>
				<Label htmlFor='type'>Type</Label>
				<Select
					id='type'
					{...register('type')}
					disabled={isLoading}
					onChange={e => setSelectedType(e.target.value as TransactionType)}
				>
					<option value={TransactionType.EXPENSE}>Expense</option>
					<option value={TransactionType.INCOME}>Income</option>
				</Select>
				{errors.type && (
					<p className='text-sm text-red-600 mt-1'>{errors.type.message}</p>
				)}
			</div>

			<div>
				<Label htmlFor='amount'>Amount</Label>
				<Input
					id='amount'
					type='number'
					step='0.01'
					placeholder='0.00'
					{...register('amount')}
					disabled={isLoading}
				/>
				{errors.amount && (
					<p className='text-sm text-red-600 mt-1'>{errors.amount.message}</p>
				)}
			</div>

			<div>
				<Label htmlFor='categoryId'>Category</Label>
				<Select
					id='categoryId'
					{...register('categoryId')}
					disabled={isLoading}
				>
					<option value=''>Select category</option>
					{filteredCategories.map(category => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</Select>
				{errors.categoryId && (
					<p className='text-sm text-red-600 mt-1'>
						{errors.categoryId.message}
					</p>
				)}
			</div>

			<div>
				<Label htmlFor='date'>Date</Label>
				<Input
					id='date'
					type='date'
					{...register('date')}
					disabled={isLoading}
				/>
				{errors.date && (
					<p className='text-sm text-red-600 mt-1'>{errors.date.message}</p>
				)}
			</div>

			<div>
				<Label htmlFor='description'>Description</Label>
				<Textarea
					id='description'
					placeholder='Enter transaction description'
					{...register('description')}
					disabled={isLoading}
				/>
				{errors.description && (
					<p className='text-sm text-red-600 mt-1'>
						{errors.description.message}
					</p>
				)}
			</div>

			<div className='flex gap-2'>
				<Button type='submit' disabled={isLoading} className='flex-1'>
					{isLoading ? 'Saving...' : transaction ? 'Update' : 'Create'}{' '}
					Transaction
				</Button>
				{transaction && (
					<Button
						type='button'
						variant='outline'
						onClick={() => onSuccess?.()}
						disabled={isLoading}
					>
						Cancel
					</Button>
				)}
			</div>
		</form>
	)
}
