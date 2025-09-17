import Link from 'next/link';
import { getAllPages } from '@/lib/models/pages';
import { getCurrentUser, canEditPages } from '@/lib/auth';

export default async function HomePage() {
  const pages = await getAllPages();
  // Sort pages by createdAt date, newest first
  const sortedPages = pages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const currentUser = await getCurrentUser();
  const canEdit = canEditPages(currentUser);

  return (
    <div>
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wiki Pages</h1>
          <p className="mt-2 text-gray-600">
            Browse and manage your knowledge base
          </p>
        </div>
        {canEdit && (
          <Link
            href="/wiki/new"
            className="inline-block bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium text-sm no-underline"
            style={{ padding: '12px 24px' }}
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New Page
            </span>
          </Link>
        )}
      </div>

      {pages.length === 0 ? (
        <div className="text-center py-16 px-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No pages yet
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by creating your first wiki page.
          </p>
          {canEdit && (
            <Link
              href="/wiki/new"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create the first page
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {sortedPages.map((page) => (
            <article
              key={page.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all hover:border-gray-300 group"
              style={{ padding: '20px' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link
                    href={`/wiki/${page.id}`}
                    className="no-underline hover:no-underline"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors mb-2">
                      {page.title}
                    </h2>
                  </Link>

                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {page.authorName || 'Unknown'}
                    </span>
                    <span className="text-gray-300">•</span>
                    <time dateTime={page.createdAt}>
                      {new Date(page.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </div>

                  <p className="text-gray-600 line-clamp-2 mb-4">
                    {page.content.replace(/[#*`]/g, '').substring(0, 150)}...
                  </p>

                  <Link
                    href={`/wiki/${page.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Read article
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
