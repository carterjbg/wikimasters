import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, canEditPages } from '@/lib/auth';
import { createPage } from '@/lib/models/pages';

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!canEditPages(currentUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 },
      );
    }

    const page = await createPage({
      title,
      content,
      authorId: currentUser!.id,
      authorName: currentUser!.name,
    });

    return NextResponse.json({
      success: true,
      page,
    });
  } catch (error) {
    console.error('Create page error:', error);
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 },
    );
  }
}
