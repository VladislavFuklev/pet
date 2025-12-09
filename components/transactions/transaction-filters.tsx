'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { TransactionType } from '@prisma/client'
import { Search } from 'lucide-react'

interface Category {
	id: string
	name: string
}

interface TransactionFiltersProps {
	type?: TransactionType
	categoryId?: string
	startDate?: string
	endDate?: string
	search?: string
	categories: Category[]
	onChange: (filters: {
		type?: TransactionType
		categoryId?: string
		startDate?: string
		endDate?: string
		search?: string
	}) => void
}

export function TransactionFilters({
	type,
	categoryId,
	startDate,
	endDate,
	search,
	categories,
	onChange,
}: TransactionFiltersProps) {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
			<div>
				<Label htmlFor='filter-type'>Type</Label>
				<Select
					id='filter-type'
					value={type || ''}
					onChange={e =>
						onChange({
							type: e.target.value
								? (e.target.value as TransactionType)
								: undefined,
							categoryId,
							startDate,
							endDate,
							search,
						})
					}
				>
					<option value=''>All</option>
					<option value={TransactionType.INCOME}>Income</option>
					<option value={TransactionType.EXPENSE}>Expense</option>
				</Select>
			</div>

			<div>
				<Label htmlFor='filter-category'>Category</Label>
				<Select
					id='filter-category'
					value={categoryId || ''}
					onChange={e =>
						onChange({
							type,
							categoryId: e.target.value || undefined,
							startDate,
							endDate,
							search,
						})
					}
				>
					<option value=''>All categories</option>
					{categories.map(category => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</Select>
			</div>

			<div>
				<Label htmlFor='filter-start-date'>Start Date</Label>
				<Input
					id='filter-start-date'
					type='date'
					value={startDate || ''}
					onChange={e =>
						onChange({
							type,
							categoryId,
							startDate: e.target.value || undefined,
							endDate,
							search,
						})
					}
				/>
			</div>

			<div>
				<Label htmlFor='filter-end-date'>End Date</Label>
				<Input
					id='filter-end-date'
					type='date'
					value={endDate || ''}
					onChange={e =>
						onChange({
							type,
							categoryId,
							startDate,
							endDate: e.target.value || undefined,
							search,
						})
					}
				/>
			</div>

			<div>
				<Label htmlFor='filter-search'>Search</Label>
				<div className='relative'>
					<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
					<Input
						id='filter-search'
						type='text'
						placeholder='Search...'
						className='pl-9'
						value={search || ''}
						onChange={e =>
							onChange({
								type,
								categoryId,
								startDate,
								endDate,
								search: e.target.value || undefined,
							})
						}
					/>
				</div>
			</div>
		</div>
	)
}
