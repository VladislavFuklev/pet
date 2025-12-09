import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	console.log('🗑️  Clearing all transactions...')

	// Find demo user
	const user = await prisma.user.findUnique({
		where: { email: 'demo@example.com' },
	})

	if (!user) {
		console.log('❌ Demo user not found')
		return
	}

	// Delete all transactions for this user
	const result = await prisma.transaction.deleteMany({
		where: {
			userId: user.id,
		},
	})

	console.log(`✅ Deleted ${result.count} transactions`)
	console.log('🎉 Database cleared!')
}

main()
	.catch(e => {
		console.error('❌ Clearing failed:', e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
