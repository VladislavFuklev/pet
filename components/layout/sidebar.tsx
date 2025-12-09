'use client'

import { cn } from '@/lib/utils'
import {
	Calendar,
	LayoutDashboard,
	PieChart,
	Receipt,
	Settings,
	Upload,
	Wallet,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
	{ name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
	{ name: 'Transactions', href: '/transactions', icon: Receipt },
	{ name: 'Budgets', href: '/budgets', icon: Wallet },
	{ name: 'Reports', href: '/reports', icon: PieChart },
	{ name: 'Recurring', href: '/recurring', icon: Calendar },
	{ name: 'Import', href: '/import', icon: Upload },
	{ name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
	const pathname = usePathname()

	return (
		<div className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col'>
			<div className='flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-950'>
				<div className='flex h-16 shrink-0 items-center'>
					<h1 className='text-xl font-bold text-blue-600'>Finance Tracker</h1>
				</div>
				<nav className='flex flex-1 flex-col'>
					<ul role='list' className='flex flex-1 flex-col gap-y-7'>
						<li>
							<ul role='list' className='-mx-2 space-y-1'>
								{navigation.map(item => {
									const isActive =
										pathname === item.href ||
										pathname.startsWith(item.href + '/')

									return (
										<li key={item.name}>
											<Link
												href={item.href}
												className={cn(
													'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors',
													isActive
														? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
														: 'text-gray-700 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-blue-400'
												)}
											>
												<item.icon
													className='h-5 w-5 shrink-0'
													aria-hidden='true'
												/>
												{item.name}
											</Link>
										</li>
									)
								})}
							</ul>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}
