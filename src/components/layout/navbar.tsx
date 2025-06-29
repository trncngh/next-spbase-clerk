import { UserButton } from "@clerk/nextjs"
import { ModeToggle } from "@/components/ui/mode-toggle"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="border-b bg-white dark:bg-slate-900">
      <div className="flex h-16 items-center px-6">
        <Link href="/dashboard" className="font-semibold text-xl">
          Auth Boilerplate
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  )
}
