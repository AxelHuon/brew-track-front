import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

interface UserButtonProps {
  firstName: string;
  lastName: string;
  profilePicture?: string;
  email: string;
}

const UserButtonSidebar: React.FC<UserButtonProps> = ({
  firstName,
  lastName,
  profilePicture,
  email,
}) => {
  return (
    <div
      className={
        'flex items-center gap-2 cursor-pointer hover:bg-neutral-950/10 dark:hover:bg-neutral-800 p-2 rounded-xl transition-colors duration-200'
      }
    >
      <Avatar className={'w-[40px] h-[40px]'}>
        <AvatarImage
          src={profilePicture}
          alt={`Photo de profile de ${firstName} ${lastName}`}
        />
        <AvatarFallback className={'bg-primary-500'}>
          <p className={'text-base text-neutral-50'}>
            {firstName[0]}
            {lastName[0]}
          </p>
        </AvatarFallback>
      </Avatar>
      <div className={'flex-col flex'}>
        <p className={'text-base text-foreground font-medium'}>
          {firstName}
          {lastName}
        </p>
        <p className={'text-xs'}>{email}</p>
      </div>
    </div>
  );
};

export default UserButtonSidebar;
