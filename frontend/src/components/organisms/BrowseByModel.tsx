"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWatchMakes, useModelsByMake, useWatchesByModel } from "@/lib/hooks/useWatches";
import { WatchListGrid } from "@/components/molecules/WatchListGrid";
import { Pagination } from "@/components/molecules/Pagination";
import { Spinner } from "@/components/atoms/Spinner";

export const BrowseByModel: React.FC = () => {
  const router = useRouter();
  const [selectedMakeId, setSelectedMakeId] = useState<number | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const [makeSearchTerm, setMakeSearchTerm] = useState("");
  const [modelSearchTerm, setModelSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data: makesData, isLoading: makesLoading } = useWatchMakes();
  const { data: modelsData, isLoading: modelsLoading } = useModelsByMake(
    selectedMakeId,
    !!selectedMakeId
  );
  const { data: watchesData, isLoading: watchesLoading, error: watchesError } = useWatchesByModel(
    selectedModelId,
    page,
    limit,
    !!selectedModelId
  );

  const handleMakeSelect = (makeId: number) => {
    setSelectedMakeId(makeId);
    setSelectedModelId(null);
    setModelSearchTerm("");
    setPage(1);
  };

  const handleModelSelect = (modelId: number) => {
    setSelectedModelId(modelId);
    setPage(1);
  };

  const handleWatchClick = (watchId: number) => {
    router.push(`/watch/${watchId}`);
  };

  const selectedMake = makesData?.make.find((m: { makeId: number; makeName: string }) => m.makeId === selectedMakeId);
  const selectedModel = modelsData?.models.find((m: { modelId: number; modelName: string }) => m.modelId === selectedModelId);

  // Filter makes and models based on search
  const filteredMakes = makesData?.make.filter((make: { makeName: string }) =>
    make.makeName.toLowerCase().includes(makeSearchTerm.toLowerCase())
  ) || [];

  const filteredModels = modelsData?.models.filter((model: { modelName: string }) =>
    model.modelName.toLowerCase().includes(modelSearchTerm.toLowerCase())
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
              {filteredMakes.map((make: { makeId: number; makeName: string }) => (
                <button
                  key={make.makeId}
                  onClick={() => handleMakeSelect(make.makeId)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedMakeId === make.makeId
                      ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {make.makeName}
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
        {selectedMakeId && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">
                2. Select Model
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                {selectedMake?.makeName} models
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
                {filteredModels.slice(0, 100).map((model: { modelId: number; modelName: string }) => (
                  <button
                    key={model.modelId}
                    onClick={() => handleModelSelect(model.modelId)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      selectedModelId === model.modelId
                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {model.modelName}
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
        {!selectedModelId ? (
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
              {!selectedMakeId ? "Select a Manufacturer" : "Select a Model"}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              {!selectedMakeId
                ? "Choose a brand from the sidebar to view available models"
                : "Choose a model to view the watch collection"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
                  {selectedModel?.modelName}
                </h2>
                {watchesData && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {watchesData.count.toLocaleString()} watches available
                  </p>
                )}
              </div>
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
                  {watchesError.message.includes('429') ? 'Rate Limit Reached' : 'Error Loading Watches'}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                  {watchesError.message.includes('429')
                    ? 'Too many requests. Please wait a moment and try again.'
                    : watchesError.message}
                </p>
              </div>
            ) : watchesData && watchesData.watches.length > 0 ? (
              <>
                <WatchListGrid
                  watches={watchesData.watches}
                  onWatchClick={handleWatchClick}
                />
                <Pagination
                  currentPage={page}
                  totalPages={watchesData.allPages}
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
