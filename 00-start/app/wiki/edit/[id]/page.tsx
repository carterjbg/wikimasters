import { notFound, redirect } from 'next/navigation';
import PageFormShadcn from '@/app/components/PageFormShadcn';
import { getPageById } from '@/lib/models/pages';
import { getCurrentUser, canEditPages } from '@/lib/auth';

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditWikiPage({ params }: EditPageProps) {
  const { id } = await params;
  const pageId = parseInt(id, 10);

  if (isNaN(pageId)) {
    notFound();
  }

  const currentUser = await getCurrentUser();
  const canEdit = canEditPages(currentUser);

  if (!canEdit) {
    redirect('/login');
  }

  const page = await getPageById(pageId);

  if (!page) {
    notFound();
  }

  return (
    <div>
      <PageFormShadcn
        initialTitle={page.title}
        initialContent={page.content}
        pageId={page.id}
        isEdit={true}
      />
    </div>
  );
}
