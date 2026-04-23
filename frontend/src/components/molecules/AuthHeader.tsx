import React from 'react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      <p className="text-zinc-500 dark:text-zinc-400 mt-2">
        {subtitle}
      </p>
    </div>
  );
};
