import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await auth()

	if (!session) {
		redirect('/login')
	}

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<Sidebar />
			<div className='lg:pl-64'>
				<Header user={session.user} />
				<main className='p-4 lg:p-8'>{children}</main>
			</div>
		</div>
	)
}
