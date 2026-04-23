"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/templates/MainLayout";
import { SearchSection } from "@/components/organisms/SearchSection";
import { WatchGrid } from "@/components/organisms/WatchGrid";
import { Spinner } from "@/components/atoms/Spinner";

interface User {
  name: string;
  email: string;
}

interface Watch {
  id?: string;
  watchId?: string;
  makeName: string;
  modelName: string;
  familyName?: string;
  yearProducedName?: string;
  reference?: string;
  movementName?: string;
  priceInEuro?: number;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("Rolex");
  const [watches, setWatches] = useState<Watch[]>([]);
  const [loadingWatches, setLoadingWatches] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const fetchWatches = useCallback(async (query: string) => {
    if (!query) return;
    setLoadingWatches(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append('searchTerm', query);
      params.append('page', '1');
      params.append('limit', '20');

      const res = await fetch('https://watch-database1.p.rapidapi.com/search-watches-by-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-rapidapi-host': 'watch-database1.p.rapidapi.com',
          'x-rapidapi-key': '970b4fa26fmsh397f674876f86dap1a656cjsna4e0c2863761'
        },
        body: params.toString()
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch watches');
      }

      const data = await res.json();
      setWatches(data.watches || []);
    } catch (err) {
      console.error(err);
      setError((err as Error).message || 'An error occurred while fetching watches.');
    } finally {
      setLoadingWatches(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchWatches("Rolex");
    }
  }, [loading, fetchWatches]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/sign-in");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchWatches(searchTerm.trim());
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Spinner size="md" />
      </div>
    );
  }

  return (
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
          error={error}
          searchTerm={searchTerm}
        />
      </section>
    </MainLayout>
  );
}
