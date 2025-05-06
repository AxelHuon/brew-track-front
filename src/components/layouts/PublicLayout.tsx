import React, { type ReactNode } from 'react';

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return <div className={'px-[16px]'}>{children}</div>;
};

export default PublicLayout;
