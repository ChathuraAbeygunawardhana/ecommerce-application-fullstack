import React, { useState } from "react";
import type { Model } from "@/lib/types/watch.types";

interface ModelSelectorProps {
  models: Model[];
  selectedModelId: number | null;
  onSelect: (modelId: number) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModelId,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredModels = models.filter((model) =>
    model.modelName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search models..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
      />

      {/* Model List */}
      <div className="space-y-2 max-h-96 overflow-y-auto p-1">
        {filteredModels.slice(0, 100).map((model) => (
          <button
            key={model.modelId}
            onClick={() => onSelect(model.modelId)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
              selectedModelId === model.modelId
                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-lg"
                : "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
            }`}
          >
            <div className="font-medium">{model.modelName}</div>
            <div className="text-xs opacity-70 mt-1">ID: {model.modelId}</div>
          </button>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
          No models found
        </div>
      )}

      {filteredModels.length > 100 && (
        <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Showing first 100 results. Use search to narrow down.
        </div>
      )}
    </div>
  );
};
