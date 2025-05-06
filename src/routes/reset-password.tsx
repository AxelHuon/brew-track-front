import PublicLayout from '@/components/layouts/PublicLayout';
import ResetPasswordTemplate from '@/components/templates/ResetPasswordTemplate/ResetPasswordTemplate.tsx';
import { createDontAuthRoute } from '@/utils/authUtils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/reset-password')({
  ...createDontAuthRoute({
    component: () => (
      <PublicLayout>
        <ResetPasswordTemplate />
      </PublicLayout>
    ),
  }),
});
