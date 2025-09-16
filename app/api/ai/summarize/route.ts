import { NextRequest, NextResponse } from 'next/server';
import { summarizePage, generateTitle } from '@/lib/ai';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Unauthorized - must be logged in to use AI features' },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { content, action = 'summarize' } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 },
      );
    }

    let result;

    switch (action) {
      case 'summarize':
        result = await summarizePage(content);
        break;
      case 'generateTitle':
        result = await generateTitle(content);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action. Use "summarize" or "generateTitle"' },
          { status: 400 },
        );
    }

    return NextResponse.json({
      result,
      action,
      isStub: true, // Let the frontend know this is a stub response
    });
  } catch (error) {
    console.error('AI processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 },
    );
  }
}
