import React from 'react';

interface UserInfoProps {
  name: string;
  email: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ name, email }) => {
  return (
    <div className="hidden md:flex flex-col items-end">
      <span className="text-sm font-medium text-zinc-900 dark:text-white leading-tight">
        {name}
      </span>
      <span className="text-xs text-zinc-500 leading-tight">
        {email}
      </span>
    </div>
  );
};
