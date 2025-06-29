# Next.js Full-Stack Auth Boilerplate

A production-ready Next.js 15 boilerplate with Clerk authentication, role-based authorization, Supabase database, and Prisma ORM.

## Features

- 🔐 **Authentication**: Clerk with OAuth (Google, GitHub) + hybrid JWT/DB sessions
- 🛡️ **Authorization**: Role-based access control (guest, admin, editor)
- 🗄️ **Database**: Supabase PostgreSQL with Prisma ORM
- 🎨 **UI**: TailwindCSS + shadcn/ui components
- 🚀 **Framework**: Next.js 15 with App Router (TypeScript)
- 🔒 **Security**: Middleware-based route protection
- 📱 **Responsive**: Mobile-first design

## Tech Stack

- **Framework**: Next.js 15+ (App Router, TypeScript)
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Styling**: TailwindCSS
- **Components**: shadcn/ui
- **Deployment**: Vercel-ready

## Quick Start

### 1. Clone and Install

\`\`\`bash
git clone <your-repo-url>
cd nextjs-auth-boilerplate
npm install
\`\`\`

### 2. Environment Setup

Copy the environment file and fill in your credentials:

\`\`\`bash
cp .env.example .env.local
\`\`\`

### 3. Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your database URL from Supabase dashboard
3. Run the database setup:

\`\`\`bash
npm run db:push
npm run db:seed
\`\`\`

### 4. Clerk Setup

1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Enable Google and GitHub OAuth providers
3. Configure webhook endpoints (optional)
4. Add your Clerk keys to \`.env.local\`

### 5. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Environment Variables

Create a \`.env.local\` file with the following variables:

\`\`\`env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase Database
DATABASE_URL=postgresql://postgres:[password]@[host]:[port]/[database]
DIRECT_URL=postgresql://postgres:[password]@[host]:[port]/[database]

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (protected)/
│   │   ├── admin/
│   │   ├── editor/
│   │   └── dashboard/
│   ├── api/
│   │   ├── auth/
│   │   └── users/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── auth/
│   ├── layout/
│   └── providers/
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   ├── utils.ts
│   └── validations.ts
├── middleware.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── scripts/
    └── setup-db.sql
\`\`\`

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run db:push\` - Push Prisma schema to database
- \`npm run db:seed\` - Seed database with initial data
- \`npm run db:studio\` - Open Prisma Studio
- \`npm run db:reset\` - Reset database

## Role-Based Access Control

### Roles

- **guest**: Unauthenticated users
- **user**: Authenticated users (default)
- **editor**: Can edit content
- **admin**: Full access

### Protected Routes

- \`/dashboard\` - All authenticated users
- \`/editor\` - Editor and Admin only
- \`/admin\` - Admin only

### API Protection

All API routes under \`/api/protected/\` require authentication and role-based access.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform with production values.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
