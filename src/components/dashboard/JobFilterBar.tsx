"use client";

import React from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Globe,
  Clock,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import { JobQueryOptions } from "@/lib/jobFilters";
import { Button } from "@/components/ui/button";

interface JobFilterBarProps {
  filters: JobQueryOptions;
  onFilterChange: (updated: Partial<JobQueryOptions>) => void;
  onResetFilters: () => void;
  onOpenScanner?: () => void;
}

export const JobFilterBar: React.FC<JobFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  onOpenScanner,
}) => {
  const sriLankaQuickLocations = [
    { label: "All LK", val: "" },
    { label: "Colombo", val: "Colombo" },
    { label: "Kandy", val: "Kandy" },
    { label: "Galle", val: "Galle" },
    { label: "Gampaha", val: "Gampaha" },
    { label: "Kurunegala", val: "Kurunegala" },
    { label: "Jaffna", val: "Jaffna" },
    { label: "Remote SL", val: "Remote" },
  ];

  return (
    <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-4">
      {/* Top Search Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Search Keyword */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4 text-blue-400" />
          </div>
          <input
            type="text"
            placeholder="Title, skill, or keyword..."
            value={filters.keyword || ""}
            onChange={(e) => onFilterChange({ keyword: e.target.value, page: 1 })}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-slate-750 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Location (Sri Lanka Focus) */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <MapPin className="w-4 h-4 text-indigo-400" />
          </div>
          <input
            type="text"
            placeholder="Sri Lanka Location (e.g. Colombo, Kandy, Galle)..."
            value={filters.location || ""}
            onChange={(e) => onFilterChange({ location: e.target.value, page: 1 })}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-slate-750 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Sort By Dropdown */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <ArrowUpDown className="w-4 h-4 text-amber-400" />
          </div>
          <select
            value={filters.sortBy || "newest"}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as any, page: 1 })}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-slate-750 text-xs text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="match_high">Sort: Highest Match Score</option>
            <option value="match_low">Sort: Lowest Match Score</option>
            <option value="title_asc">Sort: Title (A-Z)</option>
            <option value="oldest">Sort: Oldest First</option>
          </select>
        </div>
      </div>

      {/* Quick Sri Lanka Location Chips */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center space-x-1">
          <span>🇱🇰 Sri Lanka Quick Search:</span>
        </span>
        {sriLankaQuickLocations.map((loc) => {
          const isSelected =
            loc.val === ""
              ? !filters.location
              : filters.location?.toLowerCase().includes(loc.val.toLowerCase());
          return (
            <button
              key={loc.label}
              onClick={() => onFilterChange({ location: loc.val, page: 1 })}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-950/70 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {loc.label}
            </button>
          );
        })}

        {onOpenScanner && (
          <button
            onClick={onOpenScanner}
            className="ml-auto px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Scan SL Websites</span>
          </button>
        )}
      </div>

      {/* Filter Options Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-2 border-t border-slate-800/60">
        {/* Employment Type */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Employment Type</label>
          <select
            value={filters.employmentType || "all"}
            onChange={(e) => onFilterChange({ employmentType: e.target.value, page: 1 })}
            className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-750 text-xs text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Full-time">Full-time</option>
          </select>
        </div>

        {/* Source (Sri Lanka Web Portals) */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Job Source / Web Portal</label>
          <select
            value={filters.source || "all"}
            onChange={(e) => onFilterChange({ source: e.target.value, page: 1 })}
            className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-750 text-xs text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="all">All Sources</option>
            <option value="Ikman.lk">Ikman.lk</option>
            <option value="TopJobs.lk">TopJobs.lk</option>
            <option value="XpressJobs">XpressJobs.lk</option>
            <option value="JobSeek.lk">JobSeek.lk</option>
            <option value="LinkedIn">LinkedIn Sri Lanka</option>
            <option value="Direct">Direct Corporate Portals</option>
          </select>
        </div>

        {/* Posted Date */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Posted Date</label>
          <select
            value={filters.postedDate || "all"}
            onChange={(e) => onFilterChange({ postedDate: e.target.value as any, page: 1 })}
            className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-750 text-xs text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="all">Anytime</option>
            <option value="24h">Past 24 Hours</option>
            <option value="7d">Past 7 Days</option>
            <option value="30d">Past 30 Days</option>
          </select>
        </div>

        {/* Min Match Score */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Min Match Score</label>
          <select
            value={filters.minMatchScore || 0}
            onChange={(e) => onFilterChange({ minMatchScore: Number(e.target.value), page: 1 })}
            className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-750 text-xs text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="0">All Match Scores</option>
            <option value="90">90%+ Match Only</option>
            <option value="85">85%+ Match Only</option>
            <option value="80">80%+ Match Only</option>
          </select>
        </div>

        {/* Reset Filters */}
        <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex items-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="w-full py-1.5 space-x-1 border-slate-750 text-slate-300 hover:text-white cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
