import { auth } from '@/lib/auth'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
	const session = await auth()

	const isAuthPage =
		request.nextUrl.pathname.startsWith('/login') ||
		request.nextUrl.pathname.startsWith('/register')

	if (!session && !isAuthPage) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	if (session && isAuthPage) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
}
