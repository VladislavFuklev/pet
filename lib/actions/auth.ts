'use server'

import { signIn } from '@/lib/auth'
import { DEFAULT_CATEGORIES } from '@/lib/constants/categories'
import db from '@/lib/db'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import { hash } from 'bcryptjs'

export async function registerUser(data: RegisterInput) {
	try {
		const validatedFields = registerSchema.parse(data)

		const existingUser = await db.user.findUnique({
			where: {
				email: validatedFields.email,
			},
		})

		if (existingUser) {
			return { error: 'User with this email already exists' }
		}

		const hashedPassword = await hash(validatedFields.password, 10)

		const user = await db.user.create({
			data: {
				name: validatedFields.name,
				email: validatedFields.email,
				password: hashedPassword,
			},
		})

		// Create default categories for new user
		await db.category.createMany({
			data: DEFAULT_CATEGORIES.map(cat => ({
				userId: user.id,
				name: cat.name,
				type: cat.type,
				color: cat.color,
				icon: cat.icon,
				isSystem: cat.isSystem,
			})),
		})

		// Create default notification settings
		await db.notificationSettings.create({
			data: {
				userId: user.id,
			},
		})

		// Auto sign in after registration
		await signIn('credentials', {
			email: validatedFields.email,
			password: validatedFields.password,
			redirect: false,
		})

		return { success: true }
	} catch (error) {
		console.error('Registration error:', error)
		return { error: 'Something went wrong. Please try again.' }
	}
}
