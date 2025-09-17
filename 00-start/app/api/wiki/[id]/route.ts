import { NextRequest, NextResponse } from 'next/server';
import { updatePage, getPageById, deletePage } from '@/lib/models/pages';
import { getCurrentUser, canEditPages, canDeletePages } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const pageId = parseInt(id, 10);

  if (isNaN(pageId)) {
    return NextResponse.json({ error: 'Invalid page ID' }, { status: 400 });
  }

  const page = await getPageById(pageId);

  if (!page) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }

  return NextResponse.json(page);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const pageId = parseInt(id, 10);

  if (isNaN(pageId)) {
    return NextResponse.json({ error: 'Invalid page ID' }, { status: 400 });
  }

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

  const updatedPage = await updatePage(pageId, { title, content });

  if (!updatedPage) {
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 },
    );
  }

  return NextResponse.json(updatedPage);
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const pageId = parseInt(id, 10);

  if (isNaN(pageId)) {
    return NextResponse.json({ error: 'Invalid page ID' }, { status: 400 });
  }

  const currentUser = await getCurrentUser();

  if (!canDeletePages(currentUser)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const success = await deletePage(pageId);

  if (!success) {
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
