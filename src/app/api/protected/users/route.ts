import { type NextRequest, NextResponse } from "next/server"
import { requireRole } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { Role } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    await requireRole([Role.ADMIN])

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ users })
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireRole([Role.ADMIN])

    const { userId, role } = await request.json()

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    })

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized or invalid request" }, { status: 401 })
  }
}
