import PublicLayout from '@/components/layouts/PublicLayout';
import ForgotPasswordTemplate from '@/components/templates/ForgotPasswordTemplate/ForgotPasswordTemplate.tsx';
import { createDontAuthRoute } from '@/utils/authUtils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/forgot-password')({
  ...createDontAuthRoute({
    component: () => (
      <PublicLayout>
        <ForgotPasswordTemplate />
      </PublicLayout>
    ),
  }),
});
