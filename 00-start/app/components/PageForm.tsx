'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PageFormProps {
  initialTitle?: string;
  initialContent?: string;
  pageId?: number;
  isEdit?: boolean;
}

export default function PageForm({
  initialTitle = '',
  initialContent = '',
  pageId,
  isEdit = false,
}: PageFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const url = isEdit ? `/api/wiki/${pageId}` : '/api/wiki';

      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to save page');
      }

      const data = await response.json();
      const pageId = data.page?.id || data.id;
      router.push(`/wiki/${pageId}`);
      router.refresh();
    } catch (err) {
      setError('Failed to save page. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1>{isEdit ? 'Edit Page' : 'Create New Page'}</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isSubmitting}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter page title..."
        />
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Content * (Markdown supported)
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          disabled={isSubmitting}
          rows={20}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          placeholder="Enter page content in Markdown format..."
        />
        <p className="mt-2 text-sm text-gray-600">
          You can use Markdown formatting: **bold**, *italic*, # Headers,
          [links](url), etc.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          style={{ padding: '10px 24px' }}
        >
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Page' : 'Create Page'}
        </button>
        <Link
          href={isEdit ? `/wiki/${pageId}` : '/'}
          className="inline-block bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 no-underline transition-colors font-medium"
          style={{ padding: '10px 24px' }}
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
