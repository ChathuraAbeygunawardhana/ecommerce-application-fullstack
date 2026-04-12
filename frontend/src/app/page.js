"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add a slight delay to show the loading animation
    const timer = setTimeout(() => {
      fetch("http://localhost:8000/api/data")
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Server responded with \${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24 bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30">
      
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[50%] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <div className="z-10 max-w-5xl w-full items-center justify-center flex flex-col gap-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              Next.js
            </span>
            <span className="text-zinc-600 mx-4">+</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
              FastAPI
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            A beautiful, full-stack boilerplate setup. The frontend is requesting data from the backend.
          </p>
        </div>
        
        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl w-full max-w-lg transition-all duration-500 hover:bg-white/[0.05]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-medium text-zinc-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              API Connection
            </h2>
            <div className="text-xs font-mono text-zinc-500 bg-black/30 px-3 py-1 inline-flex rounded-full border border-white/5">
              GET /api/data
            </div>
          </div>
          
          {error ? (
            <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <strong className="block font-medium mb-1">Connection Failed</strong>
                <span className="text-sm opacity-80">{error}</span>
                <p className="text-xs mt-2 text-red-400/60">Make sure the FastAPI server is running on port 8000.</p>
              </div>
            </div>
          ) : loading ? (
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-800/50 animate-pulse" />
                <div className="flex-1 space-y-3 py-1">
                  <div className="h-3 bg-zinc-800/80 rounded-full w-3/4 animate-pulse" />
                  <div className="h-3 bg-zinc-800/60 rounded-full w-1/2 animate-pulse" />
                </div>
              </div>
            </div>
          ) : data && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                  Status: {data.status}
                </span>
                <span className="text-sm text-zinc-400">{data.message}</span>
              </div>
              
              <div className="pt-4 border-t border-white/5">
                <h3 className="text-sm text-zinc-500 mb-3 uppercase tracking-wider font-semibold">Data Payload</h3>
                <div className="flex gap-3 flex-wrap">
                  {data.items.map((item, index) => (
                    <span 
                      key={index}
                      className="w-12 h-12 flex items-center justify-center bg-blue-500/10 text-blue-300 rounded-xl border border-blue-500/20 font-bold text-lg shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-transform hover:scale-105 hover:bg-blue-500/20 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
