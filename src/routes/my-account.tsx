import ProtectedLayout from '@/components/layouts/ProtectedLayout.tsx';
import { createProtectedRoute } from '@/utils/authUtils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/my-account')({
  ...createProtectedRoute({
    component: () => <ProtectedLayout>my account</ProtectedLayout>,
  }),
});
