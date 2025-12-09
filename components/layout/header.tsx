'use client'

import { Button } from '@/components/ui/button'
import { LogOut, Menu, User } from 'lucide-react'
import { signOut } from 'next-auth/react'

interface HeaderProps {
	user: {
		name?: string | null
		email?: string | null
	}
	onMenuClick?: () => void
}

export function Header({ user, onMenuClick }: HeaderProps) {
	const handleSignOut = () => {
		signOut({ callbackUrl: '/login' })
	}

	return (
		<header className='sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 dark:border-gray-800 dark:bg-gray-950'>
			<Button
				variant='ghost'
				size='icon'
				className='lg:hidden'
				onClick={onMenuClick}
			>
				<Menu className='h-6 w-6' />
				<span className='sr-only'>Open menu</span>
			</Button>

			<div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
				<div className='flex flex-1 items-center lg:hidden'>
					<h1 className='text-lg font-bold text-blue-600'>Finance Tracker</h1>
				</div>
				<div className='hidden lg:flex flex-1 items-center'>
					{/* Desktop: empty space */}
				</div>
				<div className='flex items-center gap-x-4 lg:gap-x-6'>
					<div className='flex items-center gap-x-3'>
						<div className='flex items-center gap-x-2 text-sm'>
							<User className='h-5 w-5 text-gray-400' />
							<span className='hidden sm:inline text-gray-700 dark:text-gray-300'>
								{user.name || user.email}
							</span>
						</div>
					</div>
					<Button
						variant='ghost'
						size='icon'
						onClick={handleSignOut}
						title='Sign out'
					>
						<LogOut className='h-5 w-5' />
					</Button>
				</div>
			</div>
		</header>
	)
}
