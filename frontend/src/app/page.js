"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("Rolex");
  const [watches, setWatches] = useState([]);
  const [loadingWatches, setLoadingWatches] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initialize dark mode
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
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    
    if (!storedUser) {
      // Not logged in, redirect to sign-in
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

  const fetchWatches = useCallback(async (query) => {
    if (!query) return;
    setLoadingWatches(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append('searchTerm', query);
      params.append('page', 1);
      params.append('limit', 20);

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
      setError(err.message || 'An error occurred while fetching watches.');
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchWatches(searchTerm.trim());
    }
  };

  // Prevent flashing of the home page content while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="w-8 h-8 rounded-full border-2 border-zinc-900 border-t-transparent dark:border-zinc-100 dark:border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-4 px-6 md:px-10 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 font-bold text-xl">
            W
          </div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight hidden sm:block">
            Watch Catalogue
          </h1>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={toggleDarkMode}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-300 dark:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:focus:ring-white dark:focus:ring-offset-zinc-900"
            aria-label="Toggle Dark Mode"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${
                isDarkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium text-zinc-900 dark:text-white leading-tight">{user?.name || "User"}</span>
            <span className="text-xs text-zinc-500 leading-tight">{user?.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center h-9 px-4 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-10 flex flex-col gap-8">
        
        {/* Search Section */}
        <section className="w-full max-w-2xl mx-auto space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Discover Premium Timepieces
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              Explore our extensive collection of luxury watches.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2 w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by make or model (e.g., Rolex, Omega)..."
              className="flex-1 h-12 px-5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-shadow"
            />
            <button
              type="submit"
              disabled={loadingWatches}
              className="h-12 px-6 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-zinc-950 flex items-center justify-center min-w-[100px]"
            >
              {loadingWatches ? (
                <div className="w-5 h-5 rounded-full border-2 border-zinc-200 border-t-zinc-900 dark:border-zinc-700 dark:border-t-white animate-spin" />
              ) : (
                "Search"
              )}
            </button>
          </form>
        </section>

        {/* Results Section */}
        <section className="w-full">
          {error && (
            <div className="w-full p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-center text-sm font-medium">
              {error}
            </div>
          )}

          {!loadingWatches && !error && watches.length === 0 && (
            <div className="w-full py-20 flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 space-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-lg">No watches found for "{searchTerm}". Try another search.</p>
            </div>
          )}

          {loadingWatches && watches.length === 0 && (
             <div className="w-full py-20 flex items-center justify-center">
               <div className="w-10 h-10 rounded-full border-2 border-zinc-200 border-t-zinc-900 dark:border-zinc-800 dark:border-t-white animate-spin" />
             </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-1000">
            {watches.map((watch) => (
              <div 
                key={watch.id || watch.watchId} 
                className="group flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                      {watch.makeName}
                    </span>
                    {watch.yearProducedName && (
                      <span className="text-xs text-zinc-400 font-medium">
                        {watch.yearProducedName}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight mb-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                    {watch.modelName}
                  </h3>
                  
                  {watch.familyName && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-medium">
                      {watch.familyName} Family
                    </p>
                  )}
                  
                  <div className="mt-auto space-y-3">
                    {watch.reference && (
                      <div className="flex justify-between items-center text-sm border-t border-zinc-100 dark:border-zinc-800/50 pt-3">
                        <span className="text-zinc-500 dark:text-zinc-400">Ref</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-300 truncate max-w-[150px]" title={watch.reference}>{watch.reference}</span>
                      </div>
                    )}
                    {watch.movementName && (
                      <div className="flex justify-between items-center text-sm border-t border-zinc-100 dark:border-zinc-800/50 pt-3">
                        <span className="text-zinc-500 dark:text-zinc-400">Movement</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-300 truncate max-w-[150px]" title={watch.movementName}>{watch.movementName}</span>
                      </div>
                    )}
                    {watch.priceInEuro && (
                      <div className="flex justify-between items-center text-sm border-t border-zinc-100 dark:border-zinc-800/50 pt-3">
                        <span className="text-zinc-500 dark:text-zinc-400">Price</span>
                        <span className="font-bold text-zinc-900 dark:text-white">€{Number(watch.priceInEuro).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
