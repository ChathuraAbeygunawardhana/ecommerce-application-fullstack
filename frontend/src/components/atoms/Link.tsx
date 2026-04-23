import React from 'react';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ href, children, className = '' }) => {
  return (
    <NextLink 
      href={href} 
      className={`font-semibold text-zinc-900 dark:text-zinc-100 hover:underline ${className}`}
    >
      {children}
    </NextLink>
  );
};
