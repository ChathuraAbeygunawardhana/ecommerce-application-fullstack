import { AdminHeader } from "../organisms/AdminHeader";

interface AdminLayoutProps {
  children: React.ReactNode;
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

export function AdminLayout({ children, userName, userEmail, onLogout }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <AdminHeader
        userName={userName}
        userEmail={userEmail}
        onLogout={onLogout}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
