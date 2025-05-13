import ProtectedLayout from '@/components/layouts/ProtectedLayout.tsx';
import { createProtectedRoute } from '@/utils/authUtils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/rooms')({
  ...createProtectedRoute({
    component: () => (
      <ProtectedLayout>
        {' '}
        <h1 className={'text-3xl  font-[600]'}>Groupe d'amis 🏘️</h1>
      </ProtectedLayout>
    ),
  }),
});
