"use server";

import { stackServerApp } from "@/stack/server";
import { put } from "@vercel/blob";

// Server action to handle uploads (stub)

export type UploadedFile = {
  url: string;
  size: number;
  type: string;
  filename?: string;
};

export async function uploadFile(formData: FormData): Promise<UploadedFile> {
  const user = stackServerApp.getUser();
  if (!user) {
    throw new Error("❌ Unauthorized");
  }

  // Basic validation constants
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const files = formData.getAll("files").filter(Boolean) as File[];
  const file = files[0];

  console.log(
    "📤 uploadFile called, received files:",
    files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
  );

  if (!file) {
    throw new Error("No file provided");
  }

  if (!ALLOWED.includes(file.type)) {
    throw new Error("Invalid file type");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File too large");
  }

  try {
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return {
      url: (blob as any).url ?? "",
      size: file.size,
      type: file.type,
      filename: (blob as any).pathname ?? file.name,
    };
  } catch (err) {
    console.error("❌ Vercel Blob upload error:", err);
    throw new Error("Upload failed");
  }
}
