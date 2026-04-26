"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/templates/MainLayout";
import { Spinner } from "@/components/atoms/Spinner";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { FeaturedWatches } from "@/components/organisms/FeaturedWatches";
import { BrowseCallToAction } from "@/components/organisms/BrowseCallToAction";
import { authService } from "@/lib/services/authService";

interface User {
  name: string;
  email: string;
}

export default function Home() {
  const router = useRouter();
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
        const parsedUser = JSON.parse(storedUser);
        
        // Redirect admin users to admin dashboard
        if (parsedUser.role === "admin") {
          router.push("/admin");
          return;
        }
        
        setUser(parsedUser);
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
    authService.signOut();
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
        {/* Hero Section */}
        <section className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white">
            Discover Premium Timepieces
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Explore our curated collection of luxury watches from the world's finest manufacturers
          </p>
        </section>

        {/* Browse Call to Action */}
        <BrowseCallToAction />

        {/* Featured Watches */}
        <FeaturedWatches />
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
