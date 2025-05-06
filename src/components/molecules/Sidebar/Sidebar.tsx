import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/components/ui/sidebar.tsx';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import Cookies from 'js-cookie';
import { BeerIcon, LayoutDashboardIcon, UsersIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const AppLayout: React.FC = () => {
  const items = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      url: '/dashboard',
      type: 'classic',
      icon: LayoutDashboardIcon,
    },
    {
      id: 'rooms',
      title: "Groupes d'amis",
      url: '#',
      type: 'subMenu',
      icon: UsersIcon,
      listItems: [
        {
          title: "Créer un groupe d'amis",
        },
        {
          title: 'Liste de mes groupes',
        },
      ],
    },
    {
      id: 'drinks',
      title: 'Mes boissons',
      url: '#',
      type: 'subMenu',
      icon: BeerIcon,
      listItems: [
        {
          title: 'Ajouter une boisson',
        },
        {
          title: 'Liste des boissons',
        },
      ],
    },
  ];

  const [sidebarState, setSidebarState] = useState<Record<string, boolean>>({});

  const { user, logout } = useAuth();

  useEffect(() => {
    const cookieState = Cookies.get('side_bar_state');
    if (cookieState) {
      setSidebarState(JSON.parse(cookieState));
    }
  }, []);

  const toggleSubMenu = (id: string) => {
    const newSidebarState = { ...sidebarState };
    newSidebarState[id] = !newSidebarState[id];
    setSidebarState(newSidebarState);
    Cookies.set('side_bar_state', JSON.stringify(newSidebarState));
  };

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
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};

export default AppLayout;
