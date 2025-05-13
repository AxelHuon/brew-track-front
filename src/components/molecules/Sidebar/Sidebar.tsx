import LogoWithNoText from '@/components/atoms/icons/Logos/LogoWithNoText.tsx';
import UserButtonSidebar from '@/components/molecules/Sidebar/Partials/UserButtonSidebar.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/components/ui/sidebar.tsx';
import { useAuth } from '@/contexts/AuthContext/AuthContext.tsx';
import { useTheme } from '@/contexts/ThemeProvider/ThemeProvider.tsx';
import { Link, useRouter } from '@tanstack/react-router';
import { LayoutDashboard, UsersRound } from 'lucide-react';
import React from 'react';

const AppLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Sidebar className={'w-[300px]'}>
      <SidebarHeader className={'flex items-center justify-center'}>
        <LogoWithNoText
          width={'42'}
          height={'57'}
          color={
            theme === 'system'
              ? window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'white'
                : '#f97c15'
              : theme === 'dark'
                ? 'white'
                : '#f97c15'
          }
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent className={'flex flex-col gap-4'}>
            <Button
              asChild
              variant={
                router.state.location.pathname.includes('dashboard')
                  ? 'outline'
                  : 'secondary'
              }
            >
              <Link className={'w-full justify-start'} to={'/dashboard'}>
                <LayoutDashboard />
                Dashboard
              </Link>
            </Button>
            <Button
              asChild
              variant={
                router.state.location.pathname.includes('rooms')
                  ? 'outline'
                  : 'secondary'
              }
            >
              <Link className={'w-full justify-start'} to={'/rooms'}>
                <UsersRound />
                Groupe d'amis
              </Link>
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {user?.firstName && user?.lastName && (
          <UserButtonSidebar
            email={user?.email}
            firstName={user?.firstName}
            lastName={user?.lastName}
            profilePicture={user?.profilePicture ?? undefined}
          />
        )}
        <Button onClick={() => logout()} variant={'destructive'}>
          Déconnexion
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppLayout;
