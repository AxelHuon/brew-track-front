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
import React from 'react';

const AppLayout: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Sidebar className={'w-[300px]'}>
      <SidebarHeader
        className={'flex items-center justify-center'}
      ></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent></SidebarGroupContent>
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
