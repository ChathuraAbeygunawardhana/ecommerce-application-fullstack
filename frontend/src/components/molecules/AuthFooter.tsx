import React from 'react';
import { Link } from '@/components/atoms/Link';

interface AuthFooterProps {
  text: string;
  linkText: string;
  linkHref: string;
}

export const AuthFooter: React.FC<AuthFooterProps> = ({ text, linkText, linkHref }) => {
  return (
    <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400 relative z-10">
      {text}{' '}
      <Link href={linkHref}>{linkText}</Link>
    </div>
  );
};
