import React from 'react';
import { Header } from '@/components/organisms/Header';

interface MainLayoutProps {
  userName: string;
  userEmail: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  userName,
  userEmail,
  isDarkMode,
  onToggleDarkMode,
  onLogout,
  children
}) => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <Header
        title="Watch Catalogue"
        userName={userName}
        userEmail={userEmail}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
        onLogout={onLogout}
      />
      
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-10 flex flex-col gap-8">
        {children}
      </main>
    </div>
  );
};
