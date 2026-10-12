import { updateSession } from '@/lib/supabase/proxy'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // First, update the session
  const response = await updateSession(request)
  
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/auth/login', '/auth/sign-up', '/auth/callback', '/auth/error']
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith('/auth/'))

  if (isPublicRoute) {
    return response
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
 

