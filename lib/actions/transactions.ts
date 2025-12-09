'use server'

import { auth } from '@/lib/auth'
import db from '@/lib/db'
import {
	transactionSchema,
	type TransactionFilter,
	type TransactionInput,
} from '@/lib/validations/transaction'
import { Decimal } from '@prisma/client/runtime/library'
import { revalidatePath } from 'next/cache'

export async function createTransaction(data: TransactionInput) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return { error: 'Unauthorized' }
		}

		const validatedData = transactionSchema.parse(data)

		const transaction = await db.transaction.create({
			data: {
				userId: session.user.id,
				amount: new Decimal(validatedData.amount),
				categoryId: validatedData.categoryId,
				description: validatedData.description,
				date: new Date(validatedData.date),
				type: validatedData.type,
				tags: validatedData.tags || [],
			},
			include: {
				category: true,
			},
		})

		revalidatePath('/transactions')
		revalidatePath('/dashboard')

		// Convert Decimal and Date to serializable formats
		const serializedTransaction = {
			...transaction,
			amount: transaction.amount.toString(),
			date: transaction.date.toISOString(),
			createdAt: transaction.createdAt.toISOString(),
			updatedAt: transaction.updatedAt.toISOString(),
			category: {
				...transaction.category,
				createdAt: transaction.category.createdAt.toISOString(),
				updatedAt: transaction.category.updatedAt.toISOString(),
			},
		}

		return { success: true, data: serializedTransaction }
	} catch (error) {
		console.error('Create transaction error:', error)
		return { error: 'Failed to create transaction' }
	}
}

export async function updateTransaction(id: string, data: TransactionInput) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return { error: 'Unauthorized' }
		}

		const validatedData = transactionSchema.parse(data)

		// Check if transaction belongs to user
		const existing = await db.transaction.findFirst({
			where: {
				id,
				userId: session.user.id,
				deletedAt: null,
			},
		})

		if (!existing) {
			return { error: 'Transaction not found' }
		}

		const transaction = await db.transaction.update({
			where: { id },
			data: {
				amount: new Decimal(validatedData.amount),
				categoryId: validatedData.categoryId,
				description: validatedData.description,
				date: new Date(validatedData.date),
				type: validatedData.type,
				tags: validatedData.tags || [],
			},
			include: {
				category: true,
			},
		})

		revalidatePath('/transactions')
		revalidatePath('/dashboard')

		// Convert Decimal and Date to serializable formats
		const serializedTransaction = {
			...transaction,
			amount: transaction.amount.toString(),
			date: transaction.date.toISOString(),
			createdAt: transaction.createdAt.toISOString(),
			updatedAt: transaction.updatedAt.toISOString(),
			category: {
				...transaction.category,
				createdAt: transaction.category.createdAt.toISOString(),
				updatedAt: transaction.category.updatedAt.toISOString(),
			},
		}

		return { success: true, data: serializedTransaction }
	} catch (error) {
		console.error('Update transaction error:', error)
		return { error: 'Failed to update transaction' }
	}
}

export async function deleteTransaction(id: string) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return { error: 'Unauthorized' }
		}

		// Check if transaction belongs to user
		const existing = await db.transaction.findFirst({
			where: {
				id,
				userId: session.user.id,
				deletedAt: null,
			},
		})

		if (!existing) {
			return { error: 'Transaction not found' }
		}

		// Soft delete
		await db.transaction.update({
			where: { id },
			data: {
				deletedAt: new Date(),
			},
		})

		revalidatePath('/transactions')
		revalidatePath('/dashboard')

		return { success: true }
	} catch (error) {
		console.error('Delete transaction error:', error)
		return { error: 'Failed to delete transaction' }
	}
}

export async function getTransactions(filters?: TransactionFilter) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return { error: 'Unauthorized' }
		}

		const where = {
			userId: session.user.id,
			deletedAt: null,
			...(filters?.type && { type: filters.type }),
			...(filters?.categoryId && { categoryId: filters.categoryId }),
			...(filters?.startDate || filters?.endDate
				? {
						date: {
							...(filters.startDate && { gte: new Date(filters.startDate) }),
							...(filters.endDate && { lte: new Date(filters.endDate) }),
						},
				  }
				: {}),
			...(filters?.search && {
				description: {
					contains: filters.search,
					mode: 'insensitive' as const,
				},
			}),
		}

		const transactions = await db.transaction.findMany({
			where,
			include: {
				category: true,
			},
			orderBy: {
				date: 'desc',
			},
			take: 100, // Limit for performance
		})

		// Convert Decimal and Date to serializable formats
		const serializedTransactions = transactions.map(t => ({
			...t,
			amount: t.amount.toString(),
			date: t.date.toISOString(),
			createdAt: t.createdAt.toISOString(),
			updatedAt: t.updatedAt.toISOString(),
			deletedAt: t.deletedAt?.toISOString() || null,
			category: {
				...t.category,
				createdAt: t.category.createdAt.toISOString(),
				updatedAt: t.category.updatedAt.toISOString(),
			},
		}))

		return { success: true, data: serializedTransactions }
	} catch (error) {
		console.error('Get transactions error:', error)
		return { error: 'Failed to fetch transactions' }
	}
}

export async function getTransaction(id: string) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return { error: 'Unauthorized' }
		}

		const transaction = await db.transaction.findFirst({
			where: {
				id,
				userId: session.user.id,
				deletedAt: null,
			},
			include: {
				category: true,
			},
		})

		if (!transaction) {
			return { error: 'Transaction not found' }
		}

		// Convert Decimal and Date to serializable formats
		const serializedTransaction = {
			...transaction,
			amount: transaction.amount.toString(),
			date: transaction.date.toISOString(),
			createdAt: transaction.createdAt.toISOString(),
			updatedAt: transaction.updatedAt.toISOString(),
			deletedAt: transaction.deletedAt?.toISOString() || null,
			category: {
				...transaction.category,
				createdAt: transaction.category.createdAt.toISOString(),
				updatedAt: transaction.category.updatedAt.toISOString(),
			},
		}

		return { success: true, data: serializedTransaction }
	} catch (error) {
		console.error('Get transaction error:', error)
		return { error: 'Failed to fetch transaction' }
	}
}

export async function getCategories() {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return { error: 'Unauthorized' }
		}

		const categories = await db.category.findMany({
			where: {
				userId: session.user.id,
			},
			orderBy: {
				name: 'asc',
			},
		})

		return { success: true, data: categories }
	} catch (error) {
		console.error('Get categories error:', error)
		return { error: 'Failed to fetch categories' }
	}
}
