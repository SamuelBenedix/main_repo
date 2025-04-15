// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
 const token = localStorage.getItem('authToken');

 if (!token) {
  return NextResponse.redirect(new URL('/login', request.url));
 }

 return NextResponse.next();
}

// protect these routes
export const config = {
 matcher: ['/dashboard/:path*', '/profile/:path*'],
};
