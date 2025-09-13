import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// TODO: Replace with real authentication middleware
export function middleware(request: NextRequest) {
  // For now, just pass through all requests
  // In production, check for auth tokens/cookies here
  
  const pathname = request.nextUrl.pathname;
  
  // Protected routes that require authentication
  const protectedRoutes = [
    '/wiki/new',
    '/wiki/edit',
  ];
  
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  if (isProtectedRoute) {
    // TODO: Check for real authentication
    // For now, just log that this route would be protected
    console.log(`Protected route accessed: ${pathname}`);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};