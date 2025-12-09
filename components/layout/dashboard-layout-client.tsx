'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { useState } from 'react'

interface DashboardLayoutClientProps {
	user: {
		name?: string | null
		email?: string | null
	}
	children: React.ReactNode
}

export function DashboardLayoutClient({
	user,
	children,
}: DashboardLayoutClientProps) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<Sidebar
				mobileMenuOpen={mobileMenuOpen}
				setMobileMenuOpen={setMobileMenuOpen}
			/>
			<div className='lg:pl-64'>
				<Header user={user} onMenuClick={() => setMobileMenuOpen(true)} />
				<main className='p-4 lg:p-8'>{children}</main>
			</div>
		</div>
	)
}
