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
	X,
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

interface SidebarProps {
	mobileMenuOpen?: boolean
	setMobileMenuOpen?: (open: boolean) => void
}

export function Sidebar({ mobileMenuOpen, setMobileMenuOpen }: SidebarProps) {
	const pathname = usePathname()

	return (
		<>
			{/* Mobile menu */}
			{mobileMenuOpen && (
				<div className='lg:hidden'>
					<div className='fixed inset-0 z-40 flex'>
						{/* Backdrop */}
						<div
							className='fixed inset-0 bg-gray-600 bg-opacity-75'
							onClick={() => setMobileMenuOpen?.(false)}
						/>

						{/* Sidebar */}
						<div className='relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-950'>
							<div className='absolute top-0 right-0 -mr-12 pt-2'>
								<button
									type='button'
									className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
									onClick={() => setMobileMenuOpen?.(false)}
								>
									<span className='sr-only'>Close sidebar</span>
									<X className='h-6 w-6 text-white' aria-hidden='true' />
								</button>
							</div>

							<div className='h-0 flex-1 overflow-y-auto pt-5 pb-4'>
								<div className='flex shrink-0 items-center px-4'>
									<h1 className='text-xl font-bold text-blue-600'>
										Finance Tracker
									</h1>
								</div>
								<nav className='mt-5 space-y-1 px-2'>
									{navigation.map(item => {
										const isActive =
											pathname === item.href ||
											pathname.startsWith(item.href + '/')

										return (
											<Link
												key={item.name}
												href={item.href}
												onClick={() => setMobileMenuOpen?.(false)}
												className={cn(
													'group flex gap-x-3 rounded-md p-3 text-base font-semibold leading-6 transition-colors',
													isActive
														? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
														: 'text-gray-700 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-blue-400'
												)}
											>
												<item.icon
													className='h-6 w-6 shrink-0'
													aria-hidden='true'
												/>
												{item.name}
											</Link>
										)
									})}
								</nav>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Desktop sidebar */}
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
		</>
	)
}
