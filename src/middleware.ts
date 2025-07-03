import { createSSRClient } from '@/lib/supabase/middleware-client'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/editor(.*)',
  '/admin(.*)',
  '/api/protected(.*)',
])

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isEditorRoute = createRouteMatcher(['/editor(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    // Get user from clerk
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    const supabase = await createSSRClient()

    // Get user role from database

    let { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('clerkId', userId)
      .single()

    console.log('clerkId', userId)
    console.log(userData)

    if (!userData) {
      // User exists in Clerk but not in our database
      // Redirect to a setup page or handle this case appropriately
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    // Check admin routes
    if (isAdminRoute(req) && userData?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Check editor routes (editor and admin can access)
    if (isEditorRoute(req) && !['EDITOR', 'ADMIN'].includes(userData?.role)) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
