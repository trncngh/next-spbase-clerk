import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { prisma } from "./lib/db"

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/editor(.*)", "/admin(.*)", "/api/protected(.*)"])

const isAdminRoute = createRouteMatcher(["/admin(.*)"])
const isEditorRoute = createRouteMatcher(["/editor(.*)"])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url))
    }

    // Get user role from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { role: true },
    })

    if (!user) {
      return NextResponse.redirect(new URL("/sign-in", req.url))
    }

    // Check admin routes
    if (isAdminRoute(req) && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // Check editor routes (editor and admin can access)
    if (isEditorRoute(req) && !["EDITOR", "ADMIN"].includes(user.role)) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
