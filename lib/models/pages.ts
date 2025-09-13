import fs from 'fs';
import path from 'path';

export interface Page {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorName?: string;
  createdAt: string;
  updatedAt: string;
}

// File-based storage for development (persists between HMR)
const DATA_FILE = path.join(process.cwd(), '.data', 'pages.json');
const DATA_DIR = path.dirname(DATA_FILE);

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data
const seedPages: Page[] = [
  {
    id: 1,
    title: 'Welcome to Frontend Masters Wiki',
    content: `# Welcome to Frontend Masters Wiki

This is a minimal wiki application built for learning fullstack Next.js development.

## Features

- **Create and edit pages** - Build your knowledge base
- **Markdown support** - Write content with rich formatting
- **User roles** - Admin, Editor, and Viewer permissions
- **Simple and clean** - Focus on learning, not complexity

## Getting Started

1. Browse existing pages from the home page
2. Click "New Page" to create content
3. Use markdown for formatting
4. Switch between users to test permissions

## About This Project

This is a barebones starter application designed for the Frontend Masters Fullstack Next.js course. During the course, we'll upgrade each stub with real implementations:

- Replace in-memory storage with Neon Postgres
- Add Stack Auth for real authentication
- Integrate Vercel AI SDK for content features
- Deploy to Vercel with CI/CD

Happy learning!`,
    authorId: 1,
    authorName: 'Admin User',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    title: 'Markdown Guide',
    content: `# Markdown Guide

This page demonstrates markdown formatting capabilities.

## Text Formatting

- **Bold text** using double asterisks
- *Italic text* using single asterisks
- ~~Strikethrough~~ using double tildes
- \`Inline code\` using backticks

## Lists

### Unordered List
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Ordered List
1. First step
2. Second step
3. Third step

## Code Blocks

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('Frontend Masters'));
\`\`\`

## Links and Images

[Visit Frontend Masters](https://frontendmasters.com)

## Blockquotes

> "The best way to learn is by doing."
> - Anonymous Developer

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Pages | ✅ | Working |
| Auth | 🔄 | Stub |
| Database | 🔄 | In-memory |`,
    authorId: 2,
    authorName: 'Editor User',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 3,
    title: 'Next.js App Router',
    content: `# Next.js App Router

The App Router is the modern way to build Next.js applications.

## Key Concepts

### Server Components
By default, components in the app directory are React Server Components. They:
- Run on the server
- Can fetch data directly
- Send less JavaScript to the client

### Client Components
Use \`'use client'\` directive for interactive components that need:
- State management (useState, useReducer)
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, window)

### File-based Routing
- \`page.tsx\` - Defines a route
- \`layout.tsx\` - Shared UI for a route segment
- \`loading.tsx\` - Loading UI
- \`error.tsx\` - Error boundaries

### Data Fetching
Fetch data directly in Server Components:

\`\`\`typescript
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}
\`\`\`

## Benefits
- Improved performance
- Better SEO
- Simplified data fetching
- Type safety with TypeScript`,
    authorId: 1,
    authorName: 'Admin User',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  }
];

// Load or initialize data
function loadPages(): Page[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading pages:', error);
  }

  // Initialize with seed data if file doesn't exist
  savePages(seedPages);
  return seedPages;
}

// Save pages to file
function savePages(pages: Page[]): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(pages, null, 2));
  } catch (error) {
    console.error('Error saving pages:', error);
  }
}

// Get next available ID
function getNextId(pages: Page[]): number {
  const maxId = pages.reduce((max, page) => Math.max(max, page.id), 0);
  return maxId + 1;
}

// TODO: Replace all these with real database queries

export async function getAllPages(): Promise<Page[]> {
  const pages = loadPages();
  return Promise.resolve([...pages]);
}

export async function getPageById(id: number): Promise<Page | null> {
  const pages = loadPages();
  const page = pages.find(p => p.id === id);
  return Promise.resolve(page || null);
}

export async function createPage(pageData: {
  title: string;
  content: string;
  authorId: number;
  authorName?: string;
}): Promise<Page> {
  const pages = loadPages();
  const newPage: Page = {
    id: getNextId(pages),
    title: pageData.title,
    content: pageData.content,
    authorId: pageData.authorId,
    authorName: pageData.authorName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  pages.push(newPage);
  savePages(pages);
  console.log('Created new page:', newPage.title);
  return Promise.resolve(newPage);
}

export async function updatePage(
  id: number,
  updates: Partial<Omit<Page, 'id' | 'createdAt'>>
): Promise<Page | null> {
  const pages = loadPages();
  const index = pages.findIndex(p => p.id === id);

  if (index === -1) {
    return Promise.resolve(null);
  }

  pages[index] = {
    ...pages[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  savePages(pages);
  console.log('Updated page:', pages[index].title);
  return Promise.resolve(pages[index]);
}

export async function deletePage(id: number): Promise<boolean> {
  const pages = loadPages();
  const index = pages.findIndex(p => p.id === id);

  if (index === -1) {
    return Promise.resolve(false);
  }

  const deleted = pages.splice(index, 1);
  savePages(pages);
  console.log('Deleted page:', deleted[0].title);
  return Promise.resolve(true);
}

export async function searchPages(query: string): Promise<Page[]> {
  const pages = loadPages();
  const lowercaseQuery = query.toLowerCase();
  const results = pages.filter(page =>
    page.title.toLowerCase().includes(lowercaseQuery) ||
    page.content.toLowerCase().includes(lowercaseQuery)
  );
  return Promise.resolve(results);
}