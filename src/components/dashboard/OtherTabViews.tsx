"use client";

import React from "react";
import {
  Send,
  FileText,
  User,
  Bot,
  BarChart3,
  Settings as SettingsIcon,
  Briefcase,
  UploadCloud,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  ShieldCheck,
  Sliders,
} from "lucide-react";
import { Job, NavItemId } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { ProfileModule } from "@/components/profile/ProfileModule";
import { CVManagerModule } from "@/components/cv/CVManagerModule";

interface TabViewProps {
  activeTab: NavItemId;
  jobs: Job[];
  onViewJob: (job: Job) => void;
}

export const OtherTabViews: React.FC<TabViewProps> = ({ activeTab, jobs, onViewJob }) => {
  const appliedJobs = jobs.filter((j) => j.applicationStatus === "applied");

  switch (activeTab) {
    case "jobs":
      return (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">All Matched Jobs</h2>
              <p className="text-sm text-slate-400">Explore all active job listings in your queue.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
                      {job.jobType}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">{job.matchPercentage}% Match</span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-base">{job.title}</h3>
                  <p className="text-xs text-slate-400">{job.company} • {job.location}</p>
                </div>
                <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-400">{job.salary}</span>
                  <Button variant="outline" size="sm" onClick={() => onViewJob(job)}>
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "applications":
      return (
        <div className="space-y-6 animate-in fade-in">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-2xl font-bold text-slate-100">Application Pipeline</h2>
            <p className="text-sm text-slate-400">Track and manage your submitted applications and interview stages.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: "Applied", count: appliedJobs.length + 12, color: "border-blue-500/40 text-blue-400" },
              { title: "Screening", count: 4, color: "border-indigo-500/40 text-indigo-400" },
              { title: "Interviewing", count: 3, color: "border-amber-500/40 text-amber-400" },
              { title: "Offers", count: 2, color: "border-emerald-500/40 text-emerald-400" },
            ].map((col) => (
              <div key={col.title} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className={`pb-2 border-b ${col.color} flex justify-between items-center font-semibold text-sm`}>
                  <span>{col.title}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs">{col.count}</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                    <p className="font-semibold text-slate-200">Vercel Partner Labs</p>
                    <p className="text-slate-400">Senior Full-Stack Engineer</p>
                    <span className="inline-block mt-1 text-[10px] text-blue-400">Updated 2h ago</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                    <p className="font-semibold text-slate-200">Cognitive Automation</p>
                    <p className="text-slate-400">AI Automation Engineer</p>
                    <span className="inline-block mt-1 text-[10px] text-amber-400">Interview scheduled</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "cv-manager":
      return <CVManagerModule />;

    case "profile":
      return <ProfileModule />;

    case "automation":
      return (
        <div className="space-y-6 animate-in fade-in max-w-3xl">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-2xl font-bold text-slate-100">AI Automation Rules</h2>
            <p className="text-sm text-slate-400">Configure background matching and auto-pilot pilot preferences.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h4 className="font-bold text-slate-200 text-sm">Auto-Match High Threshold Roles</h4>
                <p className="text-xs text-slate-400">Notify immediately when jobs with &gt;90% match score are posted.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
                Enabled
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-200 text-sm">Automated Resume Customization</h4>
                <p className="text-xs text-slate-400">Tailor skill keywords automatically prior to application submission.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/20">
                AI Active
              </span>
            </div>
          </div>
        </div>
      );

    case "analytics":
      return (
        <div className="space-y-6 animate-in fade-in">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-2xl font-bold text-slate-100">Analytics & Conversion Insights</h2>
            <p className="text-sm text-slate-400">Track response rates, interview conversion, and skill demand trends.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <p className="text-xs text-slate-400">Interview Rate</p>
              <p className="text-3xl font-bold text-emerald-400 mt-1">21.0%</p>
              <p className="text-xs text-slate-500 mt-2">+4.2% vs industry avg</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <p className="text-xs text-slate-400">Average Match Score</p>
              <p className="text-3xl font-bold text-blue-400 mt-1">91.4%</p>
              <p className="text-xs text-slate-500 mt-2">Based on 142 matched roles</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <p className="text-xs text-slate-400">Offer Velocity</p>
              <p className="text-3xl font-bold text-purple-400 mt-1">14 Days</p>
              <p className="text-xs text-slate-500 mt-2">From application to offer</p>
            </div>
          </div>
        </div>
      );

    case "settings":
      return (
        <div className="space-y-6 animate-in fade-in max-w-3xl">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-2xl font-bold text-slate-100">Account & Platform Settings</h2>
            <p className="text-sm text-slate-400">Manage account credentials, security, and notification settings.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="font-bold text-slate-200 text-sm">Notifications</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-950 text-blue-600" />
                <span>Email summaries for high-matching jobs</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-950 text-blue-600" />
                <span>Instant alerts for interview requests</span>
              </label>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
