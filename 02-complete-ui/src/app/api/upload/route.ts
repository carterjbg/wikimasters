import { NextRequest, NextResponse } from "next/server";
import { FileUploadResponse } from "@/types/api";

// POST /api/upload - Handle file uploads
export async function POST(request: NextRequest) {
  console.log("📁 API: Processing file upload");

  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    console.log("📋 API: Received files:", {
      fileCount: files.length,
      files: files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    });

    // In a real app, this would:
    // 1. Validate file types and sizes (images, documents, etc.)
    // 2. Check user upload permissions and quotas
    // 3. Scan files for malware/security issues
    // 4. Generate unique filenames to prevent conflicts
    // 5. Upload to cloud storage (AWS S3, Google Cloud, etc.)
    // 6. Resize/optimize images if needed
    // 7. Store file metadata in database
    // 8. Return secure URLs for accessing files

    // Mock processing each file
    const uploadedFiles = [];

    for (const file of files) {
      if (file.size === 0) {
        console.log(`⚠️ API: Skipping empty file: ${file.name}`);
        continue;
      }

      // Mock file processing
      console.log(`📤 API: Processing file: ${file.name} (${file.size} bytes)`);

      // In real app: upload to storage and get real URL
      const mockUrl = `/uploads/${Date.now()}-${file.name.replace(
        /\s+/g,
        "-",
      )}`;

      const fileInfo = {
        originalName: file.name,
        filename: `${Date.now()}-${file.name}`,
        url: mockUrl,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      };

      uploadedFiles.push(fileInfo);
      console.log(
        `✅ API: File processed successfully: ${file.name} -> ${mockUrl}`,
      );
    }

    if (uploadedFiles.length === 0) {
      console.log("❌ API: No valid files to upload");

      const errorResponse: FileUploadResponse = {
        success: false,
        message: "No valid files provided",
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Return the first file's URL for single uploads, or array for multiple
    const responseData =
      uploadedFiles.length === 1 ? uploadedFiles[0] : { files: uploadedFiles };

    console.log(
      `✅ API: Successfully uploaded ${uploadedFiles.length} file(s)`,
    );

    const response: FileUploadResponse & { data?: any } = {
      success: true,
      url: uploadedFiles[0]?.url, // Primary file URL for backward compatibility
      filename: uploadedFiles[0]?.filename,
      message: `Successfully uploaded ${uploadedFiles.length} file(s)`,
      data: responseData,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("❌ API: Error processing file upload:", error);

    const errorResponse: FileUploadResponse = {
      success: false,
      message: "Failed to process file upload",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// GET /api/upload - Return upload configuration/limits (optional)
export async function GET() {
  console.log("ℹ️ API: Getting upload configuration");

  // In a real app, this would return:
  // - Maximum file size limits
  // - Allowed file types
  // - User's remaining quota
  // - Upload endpoint details

  const uploadConfig = {
    maxFileSize: 10 * 1024 * 1024, // 10MB in bytes
    allowedTypes: [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "text/plain",
      "text/markdown",
    ],
    maxFiles: 5,
    uploadUrl: "/api/upload",
  };

  console.log("✅ API: Returning upload configuration");

  return NextResponse.json(
    {
      success: true,
      data: uploadConfig,
    },
    { status: 200 },
  );
}
