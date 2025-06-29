import { getCurrentUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Users, FileText } from "lucide-react"
import Link from "next/link"

export async function Sidebar() {
  const user = await getCurrentUser()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home, current: true },
    ...(user?.role === "EDITOR" || user?.role === "ADMIN"
      ? [{ name: "Editor", href: "/editor", icon: FileText, current: false }]
      : []),
    ...(user?.role === "ADMIN" ? [{ name: "Admin", href: "/admin", icon: Users, current: false }] : []),
  ]

  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-r min-h-screen p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-sm">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </div>
          <div>
            <p className="font-medium text-sm">
              {user?.firstName} {user?.lastName}
            </p>
            <Badge variant="outline" className="text-xs">
              {user?.role}
            </Badge>
          </div>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => (
            <Button key={item.name} variant="ghost" className="w-full justify-start" asChild>
              <Link href={item.href}>
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
