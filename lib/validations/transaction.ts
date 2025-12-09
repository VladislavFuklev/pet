import { TransactionType } from '@prisma/client'
import { z } from 'zod'

export const transactionSchema = z.object({
	amount: z
		.string()
		.min(1, 'Amount is required')
		.refine(val => !isNaN(Number(val)) && Number(val) > 0, {
			message: 'Amount must be a positive number',
		}),
	categoryId: z.string().min(1, 'Category is required'),
	description: z.string().min(1, 'Description is required').max(500),
	date: z.string().min(1, 'Date is required'),
	type: z.nativeEnum(TransactionType),
	tags: z.array(z.string()).optional().default([]),
})

export const transactionFilterSchema = z.object({
	type: z.nativeEnum(TransactionType).optional(),
	categoryId: z.string().optional(),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
	search: z.string().optional(),
})

export type TransactionInput = z.infer<typeof transactionSchema>
export type TransactionFilter = z.infer<typeof transactionFilterSchema>
