import { redirect } from 'next/navigation';
import PageForm from '@/app/components/PageForm';
import { getCurrentUser, canEditPages } from '@/lib/auth';

export default async function NewWikiPage() {
  const currentUser = await getCurrentUser();
  const canEdit = canEditPages(currentUser);

  if (!canEdit) {
    redirect('/login');
  }

  return (
    <div>
      <PageForm />
    </div>
  );
}
