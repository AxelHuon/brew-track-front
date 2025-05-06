import { Button } from '@/components/ui/button';
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';
import { Link } from '@tanstack/react-router';
import React, { type JSX } from 'react';

interface SideBarMenuLinkItemProps {
  title: string;
  icon: JSX.Element;
  id: string;
  url: string;
}

const SideBarMenuLinkItem: React.FC<SideBarMenuLinkItemProps> = ({
  title,
  icon,
  url,
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={false} asChild>
        <Button
          size={'lg'}
          variant={'outline'}
          className={'flex items-center justify-start py-5'}
          asChild
        >
          <Link to={url}>
            {icon}
            <span>{title}</span>
          </Link>
        </Button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SideBarMenuLinkItem;
