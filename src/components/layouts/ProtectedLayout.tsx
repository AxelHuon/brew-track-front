import AddDrinkDialog from '@/components/molecules/Dialogs/AddDrinkDialog.tsx';
import Sidebar from '@/components/molecules/Sidebar/Sidebar.tsx';
import { SidebarProvider } from '@/components/ui/sidebar.tsx';
import { AppLayoutProvider } from '@/contexts/AppLayoutContext/AppLayoutContext.tsx';
import React, { type ReactNode } from 'react';

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  return (
    <AppLayoutProvider>
      <SidebarProvider>
        <Sidebar />
        <article
          className={
            'pl-[350px] pr-[50px] px-[16px] pt-[25px] pb-[25px] w-[calc(100%)] min-h-[100dvh] 2xl:max-w-[1920px] m-auto'
          }
        >
          {children}
        </article>
      </SidebarProvider>
      <AddDrinkDialog />
    </AppLayoutProvider>
  );
};

export default ProtectedLayout;
