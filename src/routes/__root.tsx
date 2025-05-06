import { ThemeToggle } from '@/components/molecules/ThemeToggle/ThemeToggle.tsx';
import { AuthProvider } from '@/contexts/AuthContext/AuthContext.tsx';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      <AuthProvider>
        <Outlet />
        <div className={'absolute bottom-5 right-20'}>
          <ThemeToggle />
        </div>
      </AuthProvider>
    </>
  ),
});
