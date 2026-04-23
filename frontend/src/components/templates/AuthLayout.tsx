import React from 'react';
import { Card } from '@/components/atoms/Card';
import { AuthHeader } from '@/components/molecules/AuthHeader';
import { AuthFooter } from '@/components/molecules/AuthFooter';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
  children
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <Card>
        <AuthHeader title={title} subtitle={subtitle} />
        {children}
        <AuthFooter 
          text={footerText}
          linkText={footerLinkText}
          linkHref={footerLinkHref}
        />
      </Card>
    </div>
  );
};
