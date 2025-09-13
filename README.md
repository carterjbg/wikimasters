# Frontend Masters Fullstack Next.js Wiki

A minimal, educational wiki application built for the Frontend Masters Fullstack Next.js course. This is a **barebones starter app** designed to be simple, readable, and easy to upgrade during the course.

## 🎯 Purpose

This is a starter application that students will enhance during the Frontend Masters course. It includes working stub implementations that will be replaced with real services during live coding sessions.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📦 Tech Stack

### Current (Stubs)
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui (on edit page)
- **Database**: In-memory JavaScript arrays
- **Auth**: Hardcoded users (admin, editor, viewer)
- **File Storage**: Local `/uploads` folder
- **Email**: Console.log stubs
- **AI**: Echo stubs
- **Testing**: Vitest + Playwright (configured)

### Will Upgrade To
- **Database**: Neon Postgres + Drizzle ORM
- **Auth**: Stack Auth
- **File Storage**: Vercel Blob
- **Email**: Resend
- **AI**: Vercel AI SDK (OpenAI/Anthropic)
- **Cache**: Upstash Redis
- **Deployment**: Vercel

## 🔑 Demo Users

The app includes three hardcoded users for testing permissions:

| User | Email | Role | Permissions |
|------|-------|------|-------------|
| Admin User | admin@test.com | admin | Full access (view, create, edit, delete) |
| Editor User | editor@test.com | editor | View, create, edit pages |
| Viewer User | viewer@test.com | viewer | View pages only |

To switch users, visit `/login` and select a user.

## 📁 Project Structure

```
wiki/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── wiki/              # Wiki pages routes
│   ├── login/             # Auth pages
│   └── layout.tsx         # Root layout
├── lib/                   # Core logic
│   ├── models/           # Data models (users, pages)
│   ├── auth.ts          # Auth stub
│   ├── email.ts         # Email stub
│   ├── ai.ts            # AI stub
│   └── upload.ts        # File upload stub
├── components/ui/        # shadcn/ui components
├── tests/               # Test files
│   ├── e2e/            # Playwright E2E tests
│   └── setup.ts        # Test configuration
└── uploads/            # Local file storage
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run typecheck    # Run TypeScript checks
npm test            # Run unit tests (Vitest)
npm run test:e2e    # Run E2E tests (Playwright)
```

## ✨ Features

### Working Features
- ✅ View all wiki pages
- ✅ Create new pages (editor/admin only)
- ✅ Edit existing pages (editor/admin only)
- ✅ Delete pages (admin only)
- ✅ Markdown rendering
- ✅ User role-based permissions
- ✅ Fake authentication system
- ✅ Basic file upload
- ✅ Error handling and 404 pages

### Stub Features (Console.log)
- 📧 Email notifications
- 🤖 AI content generation
- 📁 File storage (saves locally)
- 🔐 Authentication (no real sessions)
- 💾 Database (in-memory only)

## 🎨 Styling Approach

The app demonstrates two styling approaches:
1. **Plain Tailwind CSS** - Most pages use simple Tailwind classes
2. **shadcn/ui Components** - The edit page uses polished shadcn components

This contrast helps students understand different styling options in modern React apps.

## 🧪 Testing

The project includes test configuration with example tests:

```bash
# Run unit tests
npm test

# Run E2E tests (starts dev server automatically)
npm run test:e2e
```

Tests are minimal stubs - students will add comprehensive tests during the course.

## 📝 TODO Comments

Throughout the codebase, you'll find `TODO:` comments marking where stubs will be replaced:

- `TODO: Replace with real database queries`
- `TODO: Replace with Stack Auth`
- `TODO: Replace with Vercel Blob storage`
- `TODO: Replace with Resend email service`
- `TODO: Replace with Vercel AI SDK`

## 🚦 Getting Started as a Student

1. **Clone and Install**
   ```bash
   git clone <repo-url>
   cd wiki
   npm install
   npm run dev
   ```

2. **Explore the App**
   - Visit http://localhost:3000
   - Try different user roles via `/login`
   - Create, edit, and view pages
   - Notice the stub console.log outputs

3. **Understand the Structure**
   - Review `/lib/models/` for data operations
   - Check `/lib/auth.ts` for auth logic
   - Look at API routes in `/app/api/`
   - See how permissions work in components

4. **Ready for the Course**
   - The app works but uses stubs
   - Each stub has a clear upgrade path
   - You'll replace stubs with real services
   - Focus on learning, not debugging

## ⚠️ Important Notes

- **Not for Production**: This is an educational app with no real security
- **Data is Temporary**: All data is lost when the server restarts
- **Stubs Everywhere**: Most features are simulated with console.log
- **Learning First**: Code is optimized for readability, not performance

## 🎓 Course Progression

During the Frontend Masters course, you'll:

1. Replace in-memory storage with Neon Postgres
2. Add Stack Auth for real authentication
3. Integrate Vercel AI SDK for content features
4. Use Vercel Blob for file storage
5. Add Resend for transactional emails
6. Implement Upstash Redis for caching
7. Deploy to Vercel with CI/CD
8. Add comprehensive testing
9. Implement production best practices

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Frontend Masters](https://frontendmasters.com)

## 🤝 Contributing

This is a starter template for educational purposes. Feel free to fork and modify for your learning needs!

---

**Built with ❤️ for Frontend Masters students**