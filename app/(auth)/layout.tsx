import { auth } from '@/lib/auth'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Auth',
	description: 'Authentication',
}

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await auth()

	if (session) {
		redirect('/')
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4'>
			<div className='w-full max-w-md'>{children}</div>
		</div>
	)
}
