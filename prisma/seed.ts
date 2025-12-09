import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { DEFAULT_CATEGORIES } from '../lib/constants/categories'

const prisma = new PrismaClient()

async function main() {
	console.log('🌱 Seeding database...')

	// Create demo user
	const hashedPassword = await hash('password123', 10)

	const user = await prisma.user.upsert({
		where: { email: 'demo@example.com' },
		update: {},
		create: {
			email: 'demo@example.com',
			name: 'Demo User',
			password: hashedPassword,
		},
	})

	console.log('✅ Created demo user:', user.email)

	// Create categories for user
	for (const category of DEFAULT_CATEGORIES) {
		await prisma.category.upsert({
			where: {
				userId_name: {
					userId: user.id,
					name: category.name,
				},
			},
			update: {},
			create: {
				userId: user.id,
				name: category.name,
				type: category.type,
				color: category.color,
				icon: category.icon,
				isSystem: category.isSystem,
			},
		})
	}

	console.log('✅ Created categories')

	// Create notification settings
	await prisma.notificationSettings.upsert({
		where: { userId: user.id },
		update: {},
		create: {
			userId: user.id,
			email: true,
			budgetAlerts: true,
			weeklyDigest: true,
			monthlyReport: true,
		},
	})

	console.log('✅ Created notification settings')

	console.log('🎉 Seeding completed!')
	console.log('\nDemo credentials:')
	console.log('Email: demo@example.com')
	console.log('Password: password123')
}

main()
	.catch(e => {
		console.error('❌ Seeding failed:', e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
