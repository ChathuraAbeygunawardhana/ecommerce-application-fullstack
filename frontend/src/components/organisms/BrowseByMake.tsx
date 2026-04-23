"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWatchMakes, useWatchesByMake } from "@/lib/hooks/useWatches";
import { MakeSelector } from "../molecules/MakeSelector";
import { WatchListGrid } from "../molecules/WatchListGrid";
import { Pagination } from "../molecules/Pagination";
import { Spinner } from "../atoms/Spinner";

export const BrowseByMake: React.FC = () => {
  const router = useRouter();
  const [selectedMakeId, setSelectedMakeId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data: makesData, isLoading: makesLoading } = useWatchMakes();
  const { data: watchesData, isLoading: watchesLoading } = useWatchesByMake(
    selectedMakeId,
    page,
    limit,
    !!selectedMakeId
  );

  const handleMakeSelect = (makeId: number) => {
    setSelectedMakeId(makeId);
    setPage(1);
  };

  const handleWatchClick = (watchId: number) => {
    router.push(`/watch/${watchId}`);
  };

  const selectedMake = makesData?.make.find((m: { makeId: number; makeName: string }) => m.makeId === selectedMakeId);

  return (
    <div className="space-y-6">
      {/* Make Selector */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
          Select a Watch Manufacturer
        </h2>
        {makesLoading ? (
          <div className="flex justify-center py-8">
            <Spinner size="md" />
          </div>
        ) : (
          <MakeSelector
            makes={makesData?.make || []}
            selectedMakeId={selectedMakeId}
            onSelect={handleMakeSelect}
          />
        )}
      </div>

      {/* Watch List */}
      {selectedMakeId && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              {selectedMake?.makeName} Collection
            </h2>
            {watchesData && (
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {watchesData.count} watches
              </span>
            )}
          </div>

          {watchesLoading ? (
            <div className="flex justify-center py-20">
              <Spinner size="lg" />
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
              No watches found for this manufacturer
            </div>
          )}
        </div>
      )}
    </div>
  );
};
