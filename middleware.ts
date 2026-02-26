import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const session = await verifySession();
    
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Redirect logged-in users away from login page
  if (pathname === '/admin/login') {
    const session = await verifySession();
    
    if (session) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
