"use client";

import { useState } from "react";
import { BrowseByMake } from "./BrowseByMake";
import { BrowseByModel } from "./BrowseByModel";

type TabType = "makes" | "models";

export const BrowseWatches: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("makes");

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
          Browse Watch Collection
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Explore watches by manufacturer or model
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setActiveTab("makes")}
          className={`px-6 py-3 font-semibold transition-colors relative ${
            activeTab === "makes"
              ? "text-zinc-900 dark:text-white"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
          }`}
        >
          Browse by Make
          {activeTab === "makes" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("models")}
          className={`px-6 py-3 font-semibold transition-colors relative ${
            activeTab === "models"
              ? "text-zinc-900 dark:text-white"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
          }`}
        >
          Browse by Model
          {activeTab === "models" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="animate-in fade-in duration-300">
        {activeTab === "makes" ? <BrowseByMake /> : <BrowseByModel />}
      </div>
    </div>
  );
};
