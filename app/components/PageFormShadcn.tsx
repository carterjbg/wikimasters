'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

interface PageFormProps {
  initialTitle?: string;
  initialContent?: string;
  pageId?: number;
  isEdit?: boolean;
}

export default function PageFormShadcn({ 
  initialTitle = '', 
  initialContent = '', 
  pageId,
  isEdit = false 
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
      const url = isEdit
        ? `/api/wiki/${pageId}`
        : '/api/wiki';
      
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
      const redirectId = data.id || data.page?.id;
      router.push(`/wiki/${redirectId}`);
      router.refresh();
    } catch (err) {
      setError('Failed to save page. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit Page' : 'Create New Page'}</CardTitle>
        <CardDescription>
          {isEdit 
            ? 'Update the content of your wiki page' 
            : 'Add a new page to the wiki. Use Markdown for rich formatting.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Page Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isSubmitting}
              placeholder="Enter a descriptive title..."
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content (Markdown Supported)
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={isSubmitting}
              rows={20}
              placeholder="Write your content here. You can use Markdown for formatting..."
              className="w-full font-mono text-sm"
            />
            <p className="text-sm text-muted-foreground">
              Formatting: **bold**, *italic*, # Headers, [links](url), `code`, etc.
            </p>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Saving...' : (isEdit ? 'Update Page' : 'Create Page')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              asChild
            >
              <Link href={isEdit ? `/wiki/${pageId}` : '/'}>
                Cancel
              </Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}