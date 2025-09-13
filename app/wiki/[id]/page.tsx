import { notFound } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import { getPageById } from '@/lib/models/pages';
import { getCurrentUser, canEditPages, canDeletePages } from '@/lib/auth';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WikiPage({ params }: PageProps) {
  const { id } = await params;
  const pageId = parseInt(id, 10);
  
  if (isNaN(pageId)) {
    notFound();
  }

  const page = await getPageById(pageId);
  
  if (!page) {
    notFound();
  }

  const currentUser = await getCurrentUser();
  const canEdit = canEditPages(currentUser);
  const canDelete = canDeletePages(currentUser);

  // Parse markdown to HTML
  const htmlContent = marked(page.content);

  return (
    <article className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-8 py-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{page.title}</h1>
            {(canEdit || canDelete) && (
              <div className="flex gap-2">
                {canEdit && (
                  <Link
                    href={`/wiki/edit/${page.id}`}
                    className="inline-block bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium text-sm no-underline"
                    style={{ padding: '8px 20px' }}
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </span>
                  </Link>
                )}
                {/* TODO: Implement delete functionality
                {canDelete && (
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
                */}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {page.authorName || 'Unknown'}
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(page.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
            {page.updatedAt !== page.createdAt && (
              <>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Updated {new Date(page.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="px-8 py-8">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900 prose-a:text-blue-600 prose-code:text-gray-800 prose-code:bg-gray-100 prose-pre:bg-gray-50"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all pages
        </Link>
      </div>
    </article>
  );
}