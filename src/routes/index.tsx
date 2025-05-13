import { createProtectedRoute } from '@/utils/authUtils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  ...createProtectedRoute({
    component: () => <div>home</div>,
  }),
});
