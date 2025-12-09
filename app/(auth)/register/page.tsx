'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerUser } from '@/lib/actions/auth'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function RegisterPage() {
	const router = useRouter()
	const [error, setError] = useState<string>('')
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
	})

	const onSubmit = async (data: RegisterInput) => {
		setIsLoading(true)
		setError('')

		try {
			const result = await registerUser(data)

			if (result.error) {
				setError(result.error)
			} else {
				router.push('/')
				router.refresh()
			}
		} catch {
			setError('Something went wrong. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Card>
			<CardHeader className='space-y-1'>
				<CardTitle className='text-2xl'>Create an account</CardTitle>
				<CardDescription>
					Enter your information to create your account
				</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit(onSubmit)}>
				<CardContent className='space-y-4'>
					{error && (
						<div className='bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm'>
							{error}
						</div>
					)}
					<div className='space-y-2'>
						<Label htmlFor='name'>Name</Label>
						<Input
							id='name'
							type='text'
							placeholder='John Doe'
							{...register('name')}
							disabled={isLoading}
						/>
						{errors.name && (
							<p className='text-sm text-red-600 dark:text-red-400'>
								{errors.name.message}
							</p>
						)}
					</div>
					<div className='space-y-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							placeholder='name@example.com'
							{...register('email')}
							disabled={isLoading}
						/>
						{errors.email && (
							<p className='text-sm text-red-600 dark:text-red-400'>
								{errors.email.message}
							</p>
						)}
					</div>
					<div className='space-y-2'>
						<Label htmlFor='password'>Password</Label>
						<Input
							id='password'
							type='password'
							{...register('password')}
							disabled={isLoading}
						/>
						{errors.password && (
							<p className='text-sm text-red-600 dark:text-red-400'>
								{errors.password.message}
							</p>
						)}
					</div>
					<div className='space-y-2'>
						<Label htmlFor='confirmPassword'>Confirm Password</Label>
						<Input
							id='confirmPassword'
							type='password'
							{...register('confirmPassword')}
							disabled={isLoading}
						/>
						{errors.confirmPassword && (
							<p className='text-sm text-red-600 dark:text-red-400'>
								{errors.confirmPassword.message}
							</p>
						)}
					</div>
				</CardContent>
				<CardFooter className='flex flex-col space-y-4'>
					<Button type='submit' className='w-full' disabled={isLoading}>
						{isLoading ? 'Creating account...' : 'Create account'}
					</Button>
					<p className='text-sm text-center text-gray-600 dark:text-gray-400'>
						Already have an account?{' '}
						<Link href='/login' className='text-blue-600 hover:underline'>
							Sign in
						</Link>
					</p>
				</CardFooter>
			</form>
		</Card>
	)
}
