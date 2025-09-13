'use client';

import Link from 'next/link';
import { User } from '@/lib/models/users';

interface NavigationProps {
  currentUser: User | null;
}

export default function Navigation({ currentUser }: NavigationProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors">
              Wikimasters
            </Link>
            <div className="hidden sm:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                All Pages
              </Link>
              {currentUser && (currentUser.role === 'admin' || currentUser.role === 'editor') && (
                <Link href="/wiki/new" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  New Page
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{currentUser.name}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{currentUser.role}</div>
                </div>
                <Link
                  href="/login"
                  className="inline-block text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
                  style={{ padding: '6px 12px' }}
                >
                  Switch User
                </Link>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-block text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md transition-colors"
                style={{ padding: '8px 20px' }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}