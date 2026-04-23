"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { MainLayout } from "@/components/templates/MainLayout";
import { Spinner } from "@/components/atoms/Spinner";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { WatchDetailView } from "@/components/organisms/WatchDetailView";

interface User {
  name: string;
  email: string;
}

export default function WatchDetailPage() {
  const router = useRouter();
  const params = useParams();
  const watchId = params.id as string;
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (!storedUser) {
      router.push("/sign-in");
    } else {
      try {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } catch (error) {
        localStorage.removeItem("user");
        router.push("/sign-in");
      }
    }
  }, [router]);

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("user");
    setShowLogoutDialog(false);
    router.push("/sign-in");
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Spinner size="md" />
      </div>
    );
  }

  return (
    <>
      <MainLayout
        userName={user?.name || "User"}
        userEmail={user?.email || ""}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onLogout={handleLogout}
      >
        <WatchDetailView watchId={Number(watchId)} />
      </MainLayout>

      <ConfirmDialog
        isOpen={showLogoutDialog}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        confirmLabel="Sign Out"
        cancelLabel="Cancel"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </>
  );
}
