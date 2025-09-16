import { NextRequest, NextResponse } from 'next/server';
import { uploadFile, validateFileType, validateFileSize } from '@/lib/upload';
import { getCurrentUser, canEditPages } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!canEditPages(currentUser)) {
      return NextResponse.json(
        { error: 'Unauthorized - must be editor or admin to upload files' },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!validateFileType(file.type)) {
      return NextResponse.json(
        {
          error:
            'Invalid file type. Allowed: images, PDFs, text files, Word documents',
        },
        { status: 400 },
      );
    }

    // Validate file size
    if (!validateFileSize(file.size)) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB' },
        { status: 400 },
      );
    }

    // Upload the file
    const uploadedFile = await uploadFile(file, file.name, file.type);

    return NextResponse.json(uploadedFile, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 },
    );
  }
}
