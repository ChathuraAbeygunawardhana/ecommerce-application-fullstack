import { Logo } from "../atoms/Logo";
import { Button } from "../atoms/Button";
import { UserInfo } from "../molecules/UserInfo";

interface AdminHeaderProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

export function AdminHeader({ userName, userEmail, onLogout }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Logo />
            <div className="hidden sm:block">
              <span className="text-sm font-medium text-zinc-900 dark:text-white">
                Admin Dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <UserInfo name={userName} email={userEmail} />
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
