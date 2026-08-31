"use client";

import React, { useState, useEffect } from "react";
import { NavItemId, Job } from "@/types/dashboard";
import { INITIAL_METRICS, MOCK_JOBS } from "@/data/mockJobs";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { MetricsSection } from "@/components/dashboard/MetricsSection";
import { RecommendedJobsSection } from "@/components/dashboard/RecommendedJobsSection";
import { JobDetailModal } from "@/components/dashboard/JobDetailModal";
import { OtherTabViews } from "@/components/dashboard/OtherTabViews";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<NavItemId>("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Live jobs state loaded from PostgreSQL API endpoint /api/jobs
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [metrics, setMetrics] = useState(INITIAL_METRICS);

  useEffect(() => {
    async function fetchJobsFromDatabase() {
      try {
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.jobs) && data.jobs.length > 0) {
            setJobs(data.jobs);
          }
        }
      } catch (err) {
        console.warn("Could not fetch jobs from PostgreSQL API endpoint:", err);
      }
    }
    fetchJobsFromDatabase();
  }, []);

  const handleToggleSaveJob = (jobId: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
      )
    );
  };

  const handleApplyJob = (appliedJob: Job) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === appliedJob.id
          ? { ...job, applicationStatus: "applied" }
          : job
      )
    );

    // Update metrics count dynamically
    setMetrics((prev) =>
      prev.map((m) =>
        m.id === "applications"
          ? { ...m, value: (typeof m.value === "number" ? m.value : 19) + 1 }
          : m
      )
    );
  };

  return (
    <div className={cn("min-h-screen flex flex-col bg-slate-950 text-slate-100", !isDarkMode && "light bg-slate-50 text-slate-900")}>
      <div className="flex flex-1 w-full min-h-screen">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          {/* Top Navigation */}
          <TopNav
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
            onSelectTab={setActiveTab}
          />

          {/* Body Dashboard View */}
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-8">
            {activeTab === "dashboard" ? (
              <>
                {/* 5 Key Metric Cards */}
                <MetricsSection metrics={metrics} />

                {/* Recommended Jobs Section */}
                <RecommendedJobsSection
                  jobs={jobs}
                  onViewJob={(job) => setSelectedJob(job)}
                  onApplyJob={handleApplyJob}
                  onToggleSave={handleToggleSaveJob}
                  searchQuery={searchQuery}
                />
              </>
            ) : (
              <OtherTabViews
                activeTab={activeTab}
                jobs={jobs}
                onViewJob={(job) => setSelectedJob(job)}
              />
            )}
          </main>
        </div>
      </div>

      {/* Slide-over Job Detail Drawer */}
      <JobDetailModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApply={handleApplyJob}
      />
    </div>
  );
}
