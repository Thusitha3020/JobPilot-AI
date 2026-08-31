"use client";

import React from "react";
import { SearchX, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onResetFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onResetFilters }) => {
  return (
    <div className="py-16 px-6 text-center rounded-3xl border border-slate-800 bg-slate-900/50 flex flex-col items-center space-y-4 max-w-lg mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
        <SearchX className="w-8 h-8 text-blue-400" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-100">No Jobs Found</h3>
        <p className="text-sm text-slate-400 mt-1 max-w-xs mx-auto">
          We couldn&apos;t find any roles matching your current search query or filter constraints.
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onResetFilters}
        className="space-x-2 border-slate-700 hover:border-slate-600 cursor-pointer mt-2"
      >
        <RefreshCw className="w-4 h-4 text-blue-400" />
        <span>Reset Filters</span>
      </Button>
    </div>
  );
};
