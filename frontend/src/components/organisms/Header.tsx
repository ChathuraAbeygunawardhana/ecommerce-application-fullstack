import React from 'react';
import { Logo } from '../atoms/Logo';
import { Toggle } from '../atoms/Toggle';
import { UserInfo } from '../molecules/UserInfo';
import { Button } from '../atoms/Button';

interface HeaderProps {
  title: string;
  userName: string;
  userEmail: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  userName,
  userEmail,
  isDarkMode,
  onToggleDarkMode,
  onLogout
}) => {
  return (
    <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-4 px-6 md:px-10 flex justify-between items-center sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2">
        <Logo />
        <h1 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight hidden sm:block">
          {title}
        </h1>
      </div>
      
      <div className="flex items-center gap-4 md:gap-6">
        <Toggle 
          isOn={isDarkMode} 
          onToggle={onToggleDarkMode}
          ariaLabel="Toggle Dark Mode"
        />
        
        <UserInfo name={userName} email={userEmail} />
        
        <Button
          onClick={onLogout}
          variant="secondary"
          className="h-9 px-4 rounded-full text-sm"
        >
          Sign Out
        </Button>
      </div>
    </header>
  );
};
