"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWatchMakes, useWatchModels, useWatchesByModel } from "@/lib/hooks/useWatches";
import { WatchListGrid } from "@/components/molecules/WatchListGrid";
import { WatchListView } from "@/components/molecules/WatchListView";
import { Pagination } from "@/components/molecules/Pagination";
import { Spinner } from "@/components/atoms/Spinner";
import { ViewToggle } from "@/components/atoms/ViewToggle";

export const BrowseByModel: React.FC = () => {
  const router = useRouter();
  const [selectedMakeName, setSelectedMakeName] = useState<string | null>(null);
  const [selectedModelName, setSelectedModelName] = useState<string | null>(null);
  const [makeSearchTerm, setMakeSearchTerm] = useState("");
  const [modelSearchTerm, setModelSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const limit = 20;

  const { data: makesData, isLoading: makesLoading } = useWatchMakes();
  const { data: modelsData, isLoading: modelsLoading } = useWatchModels(
    selectedMakeName || undefined,
    !!selectedMakeName
  );
  const { data: watchesData, isLoading: watchesLoading, error: watchesError } = useWatchesByModel(
    selectedModelName,
    page,
    limit,
    !!selectedModelName
  );

  // Auto-select first make on initial load
  useEffect(() => {
    if (makesData && makesData.makes.length > 0 && !selectedMakeName) {
      setSelectedMakeName(makesData.makes[0].make_name);
    }
  }, [makesData, selectedMakeName]);

  // Auto-select first model when models are loaded
  useEffect(() => {
    if (modelsData && modelsData.models.length > 0 && selectedMakeName && !selectedModelName) {
      setSelectedModelName(modelsData.models[0].model_name);
    }
  }, [modelsData, selectedMakeName, selectedModelName]);

  const handleMakeSelect = (makeName: string) => {
    setSelectedMakeName(makeName);
    setSelectedModelName(null);
    setModelSearchTerm("");
    setPage(1);
  };

  const handleModelSelect = (modelName: string) => {
    setSelectedModelName(modelName);
    setPage(1);
  };

  const handleWatchClick = (watchId: number) => {
    router.push(`/watch/${watchId}`);
  };

  // Filter makes and models based on search
  const filteredMakes = makesData?.makes.filter((make) =>
    make.make_name.toLowerCase().includes(makeSearchTerm.toLowerCase())
  ) || [];

  const filteredModels = modelsData?.models.filter((model) =>
    model.model_name.toLowerCase().includes(modelSearchTerm.toLowerCase())
  ) || [];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar Filters */}
      <aside className="lg:w-80 flex-shrink-0 space-y-4">
        {/* Make Filter */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">
              1. Select Manufacturer
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Choose from {makesData?.count || 0} brands
            </p>
          </div>

          {/* Make Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search brands..."
              value={makeSearchTerm}
              onChange={(e) => setMakeSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white text-sm"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Make List */}
          {makesLoading ? (
            <div className="flex justify-center py-8">
              <Spinner size="sm" />
            </div>
          ) : (
            <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredMakes.map((make) => (
                <button
                  key={make.make_id}
                  onClick={() => handleMakeSelect(make.make_name)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedMakeName === make.make_name
                      ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{make.make_name}</span>
                    <span className="text-xs opacity-60">({make.count})</span>
                  </div>
                </button>
              ))}
              {filteredMakes.length === 0 && (
                <p className="text-center py-8 text-sm text-zinc-500 dark:text-zinc-400">
                  No brands found
                </p>
              )}
            </div>
          )}
        </div>

        {/* Model Filter */}
        {selectedMakeName && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">
                2. Select Model
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                {selectedMakeName} models
              </p>
            </div>

            {/* Model Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search models..."
                value={modelSearchTerm}
                onChange={(e) => setModelSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Model List */}
            {modelsLoading ? (
              <div className="flex justify-center py-8">
                <Spinner size="sm" />
              </div>
            ) : modelsData && modelsData.models.length > 0 ? (
              <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredModels.slice(0, 100).map((model) => (
                  <button
                    key={model.model_id}
                    onClick={() => handleModelSelect(model.model_name)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      selectedModelName === model.model_name
                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{model.model_name}</span>
                      <span className="text-xs opacity-60">({model.count})</span>
                    </div>
                  </button>
                ))}
                {filteredModels.length === 0 && (
                  <p className="text-center py-8 text-sm text-zinc-500 dark:text-zinc-400">
                    No models found
                  </p>
                )}
                {filteredModels.length > 100 && (
                  <p className="text-center py-2 text-xs text-zinc-500 dark:text-zinc-400">
                    Showing first 100 results
                  </p>
                )}
              </div>
            ) : (
              <p className="text-center py-8 text-sm text-zinc-500 dark:text-zinc-400">
                No models found
              </p>
            )}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {!selectedModelName ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg
              className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              {!selectedMakeName ? "Select a Manufacturer" : "Select a Model"}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              {!selectedMakeName
                ? "Choose a brand from the sidebar to view available models"
                : "Choose a model to view the watch collection"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
                  {selectedModelName}
                </h2>
                {watchesData && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {watchesData.count.toLocaleString()} watches available
                  </p>
                )}
              </div>
              <ViewToggle view={viewMode} onViewChange={setViewMode} />
            </div>

            {/* Watches Grid */}
            {watchesLoading ? (
              <div className="flex justify-center py-20">
                <Spinner size="lg" />
              </div>
            ) : watchesError ? (
              <div className="text-center py-20 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                  <svg
                    className="w-8 h-8 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Error Loading Watches
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                  {watchesError.message}
                </p>
              </div>
            ) : watchesData && watchesData.watches.length > 0 ? (
              <>
                {viewMode === 'grid' ? (
                  <WatchListGrid
                    watches={watchesData.watches}
                    onWatchClick={handleWatchClick}
                  />
                ) : (
                  <WatchListView
                    watches={watchesData.watches}
                    onWatchClick={handleWatchClick}
                  />
                )}
                <Pagination
                  currentPage={page}
                  totalPages={watchesData.total_pages}
                  onPageChange={setPage}
                />
              </>
            ) : (
              <div className="text-center py-20 text-zinc-500 dark:text-zinc-400">
                No watches found for this model
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
