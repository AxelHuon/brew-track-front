import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/components/ui/sidebar.tsx';
import { ChevronDown } from 'lucide-react';
import React, { type JSX } from 'react';

export interface subMenuItem {
  title: string;
}

interface SideBarWithSubMenuItemProps {
  title: string;
  listItems: subMenuItem[];
  icon: JSX.Element;
  onToggle: () => void;
  isOpen: boolean;
}

const SideBarWithSubMenuItem: React.FC<SideBarWithSubMenuItemProps> = ({
  title,
  listItems,
  isOpen,
  icon,
  onToggle,
}) => {
  return (
    <SidebarMenu>
      <Collapsible open={isOpen} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger onClick={() => onToggle()} asChild>
            <SidebarMenuButton asChild>
              <Button
                variant={'outline'}
                className={'flex justify-between items-center py-5'}
              >
                <div className={'flex items-center gap-2'}>
                  {icon}
                  {title}
                </div>
                <ChevronDown className={isOpen ? 'rotate-180' : ''} size={24} />
              </Button>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {listItems.map((item, index) => (
                <SidebarMenuButton key={index}>{item.title}</SidebarMenuButton>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
};

export default SideBarWithSubMenuItem;
