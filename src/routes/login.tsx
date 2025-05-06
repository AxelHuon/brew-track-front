import PublicLayout from '@/components/layouts/PublicLayout';
import LoginTemplate from '@/components/templates/LoginTemplate/LoginTemplate';
import { createDontAuthRoute } from '@/utils/authUtils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  ...createDontAuthRoute({
    component: () => (
      <PublicLayout>
        <LoginTemplate />
      </PublicLayout>
    ),
  }),
});
