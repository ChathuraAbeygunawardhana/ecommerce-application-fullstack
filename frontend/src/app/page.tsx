"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/templates/MainLayout";
import { SearchSection } from "@/components/organisms/SearchSection";
import { WatchGrid } from "@/components/organisms/WatchGrid";
import { Spinner } from "@/components/atoms/Spinner";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { useSearchWatches } from "@/lib/hooks/useWatches";

interface User {
  name: string;
  email: string;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("Rolex");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const { data: watches = [], isLoading: loadingWatches, error } = useSearchWatches({
    searchTerm,
    page: 1,
    limit: 20
  }, !loading);

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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <SearchSection
          title="Discover Premium Timepieces"
          subtitle="Explore our extensive collection of luxury watches."
          searchValue={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onSearchSubmit={handleSearch}
          placeholder="Search by make or model (e.g., Rolex, Omega)..."
          isLoading={loadingWatches}
        />

        <section className="w-full">
          <WatchGrid
            watches={watches}
            isLoading={loadingWatches}
            error={error?.message || null}
            searchTerm={searchTerm}
          />
        </section>
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
