export type Article = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  imageUrl?: string;
};

export function getArticles(): Article[] {
  // TODO: Replace with actual database query
  return [
    {
      id: "1",
      title: "Welcome to WikiFlow",
      content: `# Getting Started\n\nWelcome to WikiFlow — the simple wiki for students to learn modern Next.js patterns.\n\nThis article shows how to get started and includes sample Markdown content.\n\n## Features\n- Write in Markdown\n- Use React Server Actions\n- Upload images\n\nEnjoy writing!`,
      authorId: "user-1",
      authorName: "Admin User",
      createdAt: "2024-01-15T10:00:00Z",
      imageUrl: "/placeholder-image.svg",
    },
    {
      id: "2",
      title: "Markdown Guide",
      content: `# Markdown Basics\n\nThis guide covers the basics of Markdown formatting used throughout the app.\n\n## Examples\n- **Bold**\n- *Italic*\n- [Links](https://example.com)\n\n\n
tl;dr: write plain text and use Markdown.`,
      authorId: "user-2",
      authorName: "John Doe",
      createdAt: "2024-01-16T14:30:00Z",
    },
    {
      id: "3",
      title: "Advanced Features",
      content: `# Advanced WikiFlow Features\n\nExplore more advanced features such as integrating with Cloudinary, server actions, and protecting routes.\n\n## Code Example\n\n\n\n\n\n
def hello() {\n  console.log('hello world');\n}\n\n
enjoy!`,
      authorId: "user-1",
      authorName: "Admin User",
      createdAt: "2024-01-17T09:15:00Z",
      imageUrl: "/placeholder-image.svg",
    },
  ];
}

export function getArticleById(id: string) {
  const articles = getArticles();
  return articles.find((a) => a.id === id) || null;
}
