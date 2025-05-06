import PublicLayout from '@/components/layouts/PublicLayout';
import { RegisterTemplate } from '@/components/templates/RegisterTemplate/RegisterTemplate.tsx';
import { createDontAuthRoute } from '@/utils/authUtils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/register')({
  ...createDontAuthRoute({
    component: () => (
      <PublicLayout>
        <RegisterTemplate />
      </PublicLayout>
    ),
  }),
});
