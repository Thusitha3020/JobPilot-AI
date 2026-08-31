"use client";

import React from "react";

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 rounded-xl bg-slate-800 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-slate-800 rounded-md w-3/4" />
              <div className="h-3 bg-slate-850 rounded-md w-1/2" />
            </div>
          </div>
          <div className="h-8 bg-slate-950/80 rounded-xl w-full" />
          <div className="space-y-2">
            <div className="h-3 bg-slate-800 rounded-md w-full" />
            <div className="h-3 bg-slate-800 rounded-md w-5/6" />
          </div>
          <div className="pt-4 border-t border-slate-800 flex justify-between">
            <div className="h-4 bg-slate-800 rounded-md w-1/3" />
            <div className="h-8 bg-slate-800 rounded-xl w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};
