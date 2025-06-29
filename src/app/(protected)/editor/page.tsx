import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { requireRole } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { Role } from "@prisma/client"
import { Plus, Edit, Eye } from "lucide-react"

export default async function EditorPage() {
  await requireRole([Role.EDITOR, Role.ADMIN])

  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Editor Panel</h1>
          <p className="text-slate-600 dark:text-slate-300">Manage and edit content across the platform.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Content Management */}
      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>Manage all posts on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{post.title}</h3>
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    {post.content?.substring(0, 150)}...
                  </p>
                  <p className="text-xs text-slate-500">
                    By {post.author.firstName} {post.author.lastName} • {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
