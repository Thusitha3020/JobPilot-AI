"use client";

import React, { useState, useEffect } from "react";
import { NavItemId, Job } from "@/types/dashboard";
import { INITIAL_METRICS, MOCK_JOBS, calculateMetricsFromJobs } from "@/data/mockJobs";
import { UserSession, getStoredSession, signOutSession, saveStoredSession } from "@/lib/authSession";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { MetricsSection } from "@/components/dashboard/MetricsSection";
import { RecommendedJobsSection } from "@/components/dashboard/RecommendedJobsSection";
import { JobDetailModal } from "@/components/dashboard/JobDetailModal";
import { ScanJobsModal } from "@/components/dashboard/ScanJobsModal";
import { AuthModal } from "@/components/auth/AuthModal";
import { OtherTabViews } from "@/components/dashboard/OtherTabViews";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<NavItemId>("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isTopNavScannerOpen, setIsTopNavScannerOpen] = useState<boolean>(false);

  // Authentication session state
  const [session, setSession] = useState<UserSession>(() => getStoredSession());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Live jobs state loaded from API endpoint /api/jobs
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);

  // Recalculate metrics whenever jobs change
  const metrics = calculateMetricsFromJobs(jobs);

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
        console.warn("Could not fetch jobs from API endpoint:", err);
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
  };

  const handleScanCompleted = (newlyScannedJobs: Job[]) => {
    if (newlyScannedJobs.length > 0) {
      setJobs((prev) => {
        const existingIds = new Set(prev.map((j) => j.id));
        const uniqueScanned = newlyScannedJobs.filter((j) => !existingIds.has(j.id));
        return [...uniqueScanned, ...prev];
      });
    }
  };

  const handleSessionChanged = (newSession: UserSession) => {
    setSession(newSession);
    saveStoredSession(newSession);
  };

  const handleSignOut = () => {
    const guest = signOutSession();
    setSession(guest);
  };

  const appliedJobsCount = jobs.filter((j) => j.applicationStatus === "applied").length;

  return (
    <div className={cn("min-h-screen flex flex-col bg-slate-950 text-slate-100", !isDarkMode && "light bg-slate-50 text-slate-900")}>
      <div className="flex flex-1 w-full min-h-screen">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          jobsCount={jobs.length}
          applicationsCount={appliedJobsCount}
          session={session}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onSignOut={handleSignOut}
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
            onOpenScanner={() => setIsTopNavScannerOpen(true)}
            session={session}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onSignOut={handleSignOut}
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

      {/* TopNav Scanner Modal */}
      <ScanJobsModal
        isOpen={isTopNavScannerOpen}
        onClose={() => setIsTopNavScannerOpen(false)}
        onScanCompleted={handleScanCompleted}
        initialKeyword={searchQuery}
      />

      {/* Gmail / Google Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSessionChanged={handleSessionChanged}
      />
    </div>
  );
}
