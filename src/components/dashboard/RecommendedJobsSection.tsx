"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { Job, FilterState } from "@/types/dashboard";
import { JobQueryOptions } from "@/lib/jobFilters";
import { JobCard } from "@/components/dashboard/JobCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { LoadingSkeleton } from "@/components/dashboard/LoadingSkeleton";
import { JobFilterBar } from "@/components/dashboard/JobFilterBar";
import { PaginationControls } from "@/components/dashboard/PaginationControls";
import { cn } from "@/lib/utils";

interface RecommendedJobsSectionProps {
  jobs: Job[];
  onViewJob: (job: Job) => void;
  onApplyJob: (job: Job) => void;
  onToggleSave: (jobId: string) => void;
  searchQuery?: string;
  globalSearchQuery?: string;
}

export const RecommendedJobsSection: React.FC<RecommendedJobsSectionProps> = ({
  jobs: initialJobs,
  onViewJob,
  onApplyJob,
  onToggleSave,
  searchQuery = "",
  globalSearchQuery = "",
}) => {
  const activeSearchQuery = searchQuery || globalSearchQuery;

  const [filters, setFilters] = useState<JobQueryOptions>({
    keyword: activeSearchQuery || "",
    location: "",
    employmentType: "all",
    source: "all",
    postedDate: "all",
    minMatchScore: 0,
    sortBy: "newest",
    page: 1,
    limit: 6,
  });

  const [fetchedJobs, setFetchedJobs] = useState<Job[]>(initialJobs);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paginationData, setPaginationData] = useState({
    totalCount: initialJobs.length,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Sync global topnav search query into filters
  useEffect(() => {
    if (activeSearchQuery !== filters.keyword) {
      setFilters((prev) => ({ ...prev, keyword: activeSearchQuery, page: 1 }));
    }
  }, [activeSearchQuery]);

  // Fetch jobs from GET /api/jobs with query parameters whenever filters change
  useEffect(() => {
    async function loadJobsFromAPI() {
      setIsLoading(true);
      try {
        const query = new URLSearchParams();
        if (filters.keyword) query.set("keyword", filters.keyword);
        if (filters.location) query.set("location", filters.location);
        if (filters.employmentType && filters.employmentType !== "all")
          query.set("employmentType", filters.employmentType);
        if (filters.source && filters.source !== "all")
          query.set("source", filters.source);
        if (filters.postedDate && filters.postedDate !== "all")
          query.set("postedDate", filters.postedDate);
        if (filters.minMatchScore && filters.minMatchScore > 0)
          query.set("minMatchScore", String(filters.minMatchScore));
        if (filters.sortBy) query.set("sortBy", filters.sortBy);
        query.set("page", String(filters.page || 1));
        query.set("limit", String(filters.limit || 6));

        const res = await fetch(`/api/jobs?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.jobs)) {
            setFetchedJobs(data.jobs);
            setPaginationData({
              totalCount: data.totalCount || data.jobs.length,
              totalPages: data.totalPages || 1,
              hasNextPage: Boolean(data.hasNextPage),
              hasPrevPage: Boolean(data.hasPrevPage),
            });
          }
        }
      } catch (err) {
        console.warn("Failed to fetch jobs from API endpoint:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadJobsFromAPI();
  }, [filters]);

  const handleFilterChange = (updated: Partial<JobQueryOptions>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      keyword: "",
      location: "",
      employmentType: "all",
      source: "all",
      postedDate: "all",
      minMatchScore: 0,
      sortBy: "newest",
      page: 1,
      limit: 6,
    });
  };

  return (
    <section className="space-y-6">
      {/* Header bar with total counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
              Recommended Jobs
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
              {paginationData.totalCount} roles available
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Hand-picked opportunities aligned with your CV pilot profile & skill matrix.
          </p>
        </div>

        {/* Quick Refresh Button */}
        <button
          onClick={() => handleFilterChange({ page: 1 })}
          className="self-start sm:self-auto p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          title="Refresh Recommendations"
        >
          <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin text-blue-400")} />
        </button>
      </div>

      {/* Filter Bar Component */}
      <JobFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* Job Grid / Loading Skeletons / Empty State */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : fetchedJobs.length === 0 ? (
        <EmptyState onResetFilters={handleResetFilters} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fetchedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewJob={onViewJob}
                onApplyJob={onApplyJob}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <PaginationControls
            page={filters.page || 1}
            totalPages={paginationData.totalPages}
            totalCount={paginationData.totalCount}
            limit={filters.limit || 6}
            hasNextPage={paginationData.hasNextPage}
            hasPrevPage={paginationData.hasPrevPage}
            onPageChange={(newPage) => handleFilterChange({ page: newPage })}
          />
        </>
      )}
    </section>
  );
};
