import ProtectedLayout from '@/components/layouts/ProtectedLayout.tsx';
import { DashboardTemplate } from '@/components/templates/DashboardTemplate/DashboardTemplate.tsx';
import { createProtectedRoute } from '@/utils/authUtils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  ...createProtectedRoute({
    component: () => (
      <ProtectedLayout>
        <DashboardTemplate />
      </ProtectedLayout>
    ),
  }),
});
