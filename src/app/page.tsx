import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Database, Shield, Users, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Next.js 15 + Clerk + Supabases
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Full-Stack Auth
            <span className="text-blue-600 dark:text-blue-400">
              {' '}
              Boilerplate
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Production-ready Next.js application with authentication,
            authorization, and database integration. Built with modern tools and
            best practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/sign-up">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
              <CardTitle>Authentication</CardTitle>
              <CardDescription>
                Clerk with OAuth providers and hybrid JWT/DB sessions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
              <CardTitle>Authorization</CardTitle>
              <CardDescription>
                Role-based access control with middleware protection
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Database className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
              <CardTitle>Database</CardTitle>
              <CardDescription>
                Supabase PostgreSQL with Prisma ORM integration
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mb-2" />
              <CardTitle>Modern Stack</CardTitle>
              <CardDescription>
                Next.js 15, TypeScript, TailwindCSS, and shadcn/ui
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Demo Section */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Try the Demo</CardTitle>
            <CardDescription>
              Explore different user roles and protected routes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Dashboard</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  All authenticated users
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Editor Panel</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Editor and Admin only
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/editor">View Editor</Link>
                </Button>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Admin Panel</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Admin only
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin">View Admin</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
