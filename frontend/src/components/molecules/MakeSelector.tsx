import React, { useState } from "react";
import type { Make } from "@/lib/types/watch.types";

interface MakeSelectorProps {
  makes: Make[];
  selectedMakeId: number | null;
  onSelect: (makeId: number) => void;
}

export const MakeSelector: React.FC<MakeSelectorProps> = ({
  makes,
  selectedMakeId,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMakes = makes.filter((make) =>
    make.makeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search manufacturers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
      />

      {/* Make Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-96 overflow-y-auto p-1">
        {filteredMakes.map((make) => (
          <button
            key={make.makeId}
            onClick={() => onSelect(make.makeId)}
            className={`px-4 py-3 text-sm font-medium rounded-lg border transition-all ${
              selectedMakeId === make.makeId
                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-lg"
                : "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
            }`}
          >
            {make.makeName}
          </button>
        ))}
      </div>

      {filteredMakes.length === 0 && (
        <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
          No manufacturers found
        </div>
      )}
    </div>
  );
};
