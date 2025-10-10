import { NextRequest, NextResponse } from "next/server";
import { Article, ApiResponse } from "@/types/api";

// Mock articles data - in real app, this would come from database
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Welcome to WikiFlow",
    content: "# Getting Started\n\nThis is your first article in WikiFlow...",
    authorId: "user-1",
    authorName: "Admin User",
    createdAt: "2024-01-15T10:00:00Z",
    imageUrl: "/placeholder-image.svg",
  },
  {
    id: "2",
    title: "Markdown Guide",
    content: "# Markdown Basics\n\nLearn how to write in Markdown...",
    authorId: "user-2",
    authorName: "John Doe",
    createdAt: "2024-01-16T14:30:00Z",
  },
  {
    id: "3",
    title: "Advanced Features",
    content: "# Advanced WikiFlow Features\n\nExplore the powerful features...",
    authorId: "user-1",
    authorName: "Admin User",
    createdAt: "2024-01-17T09:15:00Z",
    imageUrl: "/placeholder-image.svg",
  },
];

// GET /api/articles - Return all articles
export async function GET() {
  console.log("📄 API: Getting all articles");

  try {
    // In a real app, this would:
    // 1. Query the database for all articles
    // 2. Apply pagination, sorting, filtering
    // 3. Check user permissions for each article
    // 4. Format the response data

    const response: ApiResponse<Article[]> = {
      success: true,
      data: mockArticles,
      message: `Found ${mockArticles.length} articles`,
    };

    console.log(`✅ API: Returning ${mockArticles.length} articles`);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("❌ API: Error getting articles:", error);

    const errorResponse: ApiResponse<never> = {
      success: false,
      error: "Failed to fetch articles",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// POST /api/articles - Create new article
export async function POST(request: NextRequest) {
  console.log("📝 API: Creating new article");

  try {
    const articleData = await request.json();
    console.log("📋 API: Received article data:", {
      title: articleData.title,
      contentLength: articleData.content?.length || 0,
      authorId: articleData.authorId,
      hasImage: !!articleData.imageUrl,
    });

    // In a real app, this would:
    // 1. Validate the article data (title, content, author, etc.)
    // 2. Check user permissions to create articles
    // 3. Sanitize and process the content
    // 4. Save to database with auto-generated ID and timestamp
    // 5. Handle any file uploads or image processing
    // 6. Send notifications to subscribers

    // Mock the created article with generated ID and timestamp
    const newArticle: Article = {
      id: `article-${Date.now()}`, // In real app: UUID or database-generated ID
      title: articleData.title,
      content: articleData.content,
      authorId: articleData.authorId || "unknown",
      authorName: articleData.authorName || "Unknown User",
      createdAt: new Date().toISOString(),
      imageUrl: articleData.imageUrl,
    };

    console.log("✅ API: Article created successfully:", {
      id: newArticle.id,
      title: newArticle.title,
    });

    const response: ApiResponse<Article> = {
      success: true,
      data: newArticle,
      message: "Article created successfully",
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("❌ API: Error creating article:", error);

    const errorResponse: ApiResponse<never> = {
      success: false,
      error: "Failed to create article",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
