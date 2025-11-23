import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const publicPaths = [
    '/login',
    '/register',
    '/api/auth/login',
    '/api/auth/register',
    '/api/books',
    '/api/reviews',
    '/api/communities',
  ]
  const { pathname } = request.nextUrl
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Cek JWT di cookie (atau bisa juga di header)
  const token = request.cookies.get('jwt')?.value || request.headers.get('authorization')?.split(' ')[1]
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Tidak perlu verifikasi di sini, cukup diteruskan ke backend
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}