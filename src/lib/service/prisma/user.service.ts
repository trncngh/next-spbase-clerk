'use server'

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export const getUserByClerkId = async (clerkId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    })

    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

export const upsertUser = async (newUser: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.upsert({
      where: { clerkId: newUser.clerkId },
      update: newUser,
      create: newUser,
    })
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteUser = async (clerkId: string) => {
  try {
    await prisma.user.delete({
      where: { clerkId },
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
