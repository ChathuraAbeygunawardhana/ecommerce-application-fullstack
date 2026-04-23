import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/atoms/Logo';
import { Toggle } from '@/components/atoms/Toggle';
import { UserInfo } from '@/components/molecules/UserInfo';
import { Button } from '@/components/atoms/Button';

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
  const pathname = usePathname();
  
  return (
    <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-4 px-6 md:px-10 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo />
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight hidden sm:block">
            {title}
          </h1>
        </Link>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            href="/browse"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/browse'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Browse
          </Link>
        </nav>
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
