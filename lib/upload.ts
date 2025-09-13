import { promises as fs } from 'fs';
import path from 'path';

// Upload stub - in production replace with Vercel Blob or similar
// TODO: Replace with real file storage service

export interface UploadedFile {
  url: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// Ensure upload directory exists
async function ensureUploadDir() {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

export async function uploadFile(
  file: File | Buffer,
  filename: string,
  mimeType: string
): Promise<UploadedFile> {
  console.log(`📁 [UPLOAD STUB] Uploading file: ${filename}`);
  
  await ensureUploadDir();
  
  // Generate unique filename to avoid collisions
  const timestamp = Date.now();
  const sanitizedName = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  const uniqueFilename = `${timestamp}-${sanitizedName}`;
  const filePath = path.join(UPLOAD_DIR, uniqueFilename);
  
  // Convert File to Buffer if needed
  let buffer: Buffer;
  if (Buffer.isBuffer(file)) {
    buffer = file;
  } else {
    const arrayBuffer = await (file as File).arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
  }
  
  // Save file to disk
  await fs.writeFile(filePath, buffer);
  
  const uploadedFile: UploadedFile = {
    url: `/uploads/${uniqueFilename}`,
    name: filename,
    size: buffer.length,
    type: mimeType,
    uploadedAt: new Date().toISOString()
  };
  
  console.log(`  ✅ File saved: ${uploadedFile.url}`);
  console.log(`  Size: ${(uploadedFile.size / 1024).toFixed(2)} KB`);
  
  return uploadedFile;
}

export async function deleteFile(fileUrl: string): Promise<boolean> {
  console.log(`📁 [UPLOAD STUB] Deleting file: ${fileUrl}`);
  
  try {
    const filename = path.basename(fileUrl);
    const filePath = path.join(UPLOAD_DIR, filename);
    await fs.unlink(filePath);
    console.log(`  ✅ File deleted: ${fileUrl}`);
    return true;
  } catch (error) {
    console.error(`  ❌ Failed to delete file: ${error}`);
    return false;
  }
}

export async function getFileInfo(fileUrl: string): Promise<UploadedFile | null> {
  try {
    const filename = path.basename(fileUrl);
    const filePath = path.join(UPLOAD_DIR, filename);
    const stats = await fs.stat(filePath);
    
    return {
      url: fileUrl,
      name: filename,
      size: stats.size,
      type: 'application/octet-stream', // Would need to store actual type
      uploadedAt: stats.birthtime.toISOString()
    };
  } catch {
    return null;
  }
}

export function validateFileType(mimeType: string): boolean {
  // Allowed file types
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'text/markdown',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  return allowedTypes.includes(mimeType);
}

export function validateFileSize(sizeInBytes: number): boolean {
  const maxSizeInMB = 10;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return sizeInBytes <= maxSizeInBytes;
}