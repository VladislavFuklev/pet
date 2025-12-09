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
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
	const router = useRouter()
	const [error, setError] = useState<string>('')
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = async (data: LoginInput) => {
		setIsLoading(true)
		setError('')

		try {
			const result = await signIn('credentials', {
				email: data.email,
				password: data.password,
				redirect: false,
			})

			if (result?.error) {
				setError('Invalid email or password')
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
				<CardTitle className='text-2xl'>Sign in</CardTitle>
				<CardDescription>
					Enter your email and password to sign in to your account
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
				</CardContent>
				<CardFooter className='flex flex-col space-y-4'>
					<Button type='submit' className='w-full' disabled={isLoading}>
						{isLoading ? 'Signing in...' : 'Sign in'}
					</Button>
					<p className='text-sm text-center text-gray-600 dark:text-gray-400'>
						Don&apos;t have an account?{' '}
						<Link href='/register' className='text-blue-600 hover:underline'>
							Sign up
						</Link>
					</p>
				</CardFooter>
			</form>
		</Card>
	)
}
