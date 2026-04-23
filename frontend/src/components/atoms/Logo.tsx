import React from 'react';

interface LogoProps {
  letter?: string;
}

export const Logo: React.FC<LogoProps> = ({ letter = 'W' }) => {
  return (
    <div className="w-8 h-8 rounded bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 font-bold text-xl">
      {letter}
    </div>
  );
};
