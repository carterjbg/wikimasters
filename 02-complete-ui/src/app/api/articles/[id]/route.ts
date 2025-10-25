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

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/articles/[id] - Return single article by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  console.log(`📄 API: Getting article with ID: ${id}`);

  try {
    // In a real app, this would:
    // 1. Query the database for the specific article by ID
    // 2. Check if user has permission to view this article
    // 3. Check if article exists and is not deleted
    // 4. Include related data (comments, tags, etc.)

    const article = mockArticles.find((a) => a.id === id);

    if (!article) {
      console.log(`❌ API: Article not found with ID: ${id}`);

      const notFoundResponse: ApiResponse<never> = {
        success: false,
        error: "Article not found",
      };

      return NextResponse.json(notFoundResponse, { status: 404 });
    }

    console.log(`✅ API: Found article: ${article.title}`);

    const response: ApiResponse<Article> = {
      success: true,
      data: article,
      message: "Article retrieved successfully",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(`❌ API: Error getting article ${id}:`, error);

    const errorResponse: ApiResponse<never> = {
      success: false,
      error: "Failed to fetch article",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// PUT /api/articles/[id] - Update existing article
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  console.log(`📝 API: Updating article with ID: ${id}`);

  try {
    const updateData = await request.json();
    console.log("📋 API: Received update data:", {
      id,
      title: updateData.title,
      contentLength: updateData.content?.length || 0,
      hasImage: !!updateData.imageUrl,
      updatedFields: Object.keys(updateData),
    });

    // In a real app, this would:
    // 1. Validate the update data
    // 2. Check if user has permission to edit this article
    // 3. Check if article exists and is not deleted
    // 4. Update only the changed fields in the database
    // 5. Handle version control/revision history
    // 6. Process any new file uploads
    // 7. Send notifications about the update

    // Mock finding and updating the article
    const existingArticle = mockArticles.find((a) => a.id === id);

    if (!existingArticle) {
      console.log(`❌ API: Article not found for update with ID: ${id}`);

      const notFoundResponse: ApiResponse<never> = {
        success: false,
        error: "Article not found",
      };

      return NextResponse.json(notFoundResponse, { status: 404 });
    }

    // Mock the updated article
    const updatedArticle: Article = {
      ...existingArticle,
      ...updateData,
      id, // Ensure ID doesn't change
      createdAt: existingArticle.createdAt, // Keep original creation date
      // In real app: add updatedAt timestamp
    };

    console.log("✅ API: Article updated successfully:", {
      id: updatedArticle.id,
      title: updatedArticle.title,
    });

    const response: ApiResponse<Article> = {
      success: true,
      data: updatedArticle,
      message: "Article updated successfully",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(`❌ API: Error updating article ${id}:`, error);

    const errorResponse: ApiResponse<never> = {
      success: false,
      error: "Failed to update article",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// DELETE /api/articles/[id] - Delete article
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  console.log(`🗑️ API: Deleting article with ID: ${id}`);

  try {
    // In a real app, this would:
    // 1. Check if user has permission to delete this article
    // 2. Check if article exists and is not already deleted
    // 3. Perform soft delete (mark as deleted) or hard delete
    // 4. Handle cascading deletes (comments, attachments, etc.)
    // 5. Clean up associated files/images
    // 6. Log the deletion for audit purposes
    // 7. Send notifications about the deletion

    const existingArticle = mockArticles.find((a) => a.id === id);

    if (!existingArticle) {
      console.log(`❌ API: Article not found for deletion with ID: ${id}`);

      const notFoundResponse: ApiResponse<never> = {
        success: false,
        error: "Article not found",
      };

      return NextResponse.json(notFoundResponse, { status: 404 });
    }

    console.log(
      `✅ API: Article deleted successfully: ${existingArticle.title}`,
    );

    const response: ApiResponse<{ deletedId: string }> = {
      success: true,
      data: { deletedId: id },
      message: "Article deleted successfully",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(`❌ API: Error deleting article ${id}:`, error);

    const errorResponse: ApiResponse<never> = {
      success: false,
      error: "Failed to delete article",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
