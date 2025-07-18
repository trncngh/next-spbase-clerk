import { upsertUser } from '@/lib/service/prisma/user.service'
import { auth, currentUser } from '@clerk/nextjs/server'
import { Role } from '@prisma/client'
import { prisma } from './prisma'

export async function getCurrentUser() {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  return user
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Authentication required')
  }

  return user
}

export async function requireRole(allowedRoles: Role[]) {
  const user = await requireAuth()

  if (!allowedRoles.includes(user.role)) {
    throw new Error('Insufficient permissions')
  }

  return user
}

export async function hasRole(role: Role) {
  const user = await getCurrentUser()
  return user?.role === role || false
}

export async function hasAnyRole(roles: Role[]) {
  const user = await getCurrentUser()
  return user ? roles.includes(user.role) : false
}

export async function isAdmin() {
  return hasRole(Role.ADMIN)
}

export async function isEditor() {
  return hasAnyRole([Role.EDITOR, Role.ADMIN])
}

export async function syncUserWithClerk() {
  const clerkUser = await currentUser()

  if (!clerkUser) {
    return null
  }

  const user = await upsertUser({
    clerkId: clerkUser.id,
    email: clerkUser.emailAddresses[0]?.emailAddress || '',
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    imageUrl: clerkUser.imageUrl,
  })

  return user
}
