import db from '@/lib/db'
import { loginSchema } from '@/lib/validations/auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { compare } from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(db),
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/login',
	},
	providers: [
		Credentials({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					const validatedFields = loginSchema.parse(credentials)

					const user = await db.user.findUnique({
						where: {
							email: validatedFields.email,
						},
					})

					if (!user || !user.password) {
						return null
					}

					const passwordsMatch = await compare(
						validatedFields.password,
						user.password
					)

					if (!passwordsMatch) {
						return null
					}

					return {
						id: user.id,
						email: user.email,
						name: user.name,
					}
				} catch {
					return null
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
			}
			return token
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string
			}
			return session
		},
	},
})
