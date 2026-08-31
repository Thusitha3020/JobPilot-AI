"use client";

import React, { useState } from "react";
import {
  X,
  Building2,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Send,
  DollarSign,
  Briefcase,
  Share2,
  FileCheck,
} from "lucide-react";
import { Job } from "@/types/dashboard";
import { Button } from "@/components/ui/button";

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  onApply: (job: Job) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  onApply,
}) => {
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  if (!job) return null;

  const handleApplyClick = () => {
    onApply(job);
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full shadow-2xl overflow-y-auto custom-scrollbar flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/90 sticky top-0 backdrop-blur-md z-10 flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shrink-0 shadow-lg">
              {job.companyLogo || "🏢"}
            </div>
            <div>
              <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20 mb-1">
                <Sparkles className="w-3 h-3" />
                <span>{job.matchPercentage}% AI Pilot Score</span>
              </div>
              <h2 className="text-xl font-bold text-slate-100">{job.title}</h2>
              <p className="text-sm font-medium text-slate-300">
                {job.company} • {job.location}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1 text-left">
          {/* Success Banner if applied */}
          {appliedSuccess && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center space-x-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-semibold text-sm">Application Submitted!</p>
                <p className="text-xs text-emerald-400">
                  JobPilot AI sent your tailored resume and cover letter.
                </p>
              </div>
            </div>
          )}

          {/* Quick Metrics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Job Type</p>
              <p className="text-sm font-semibold text-slate-200 mt-0.5">
                {job.jobType}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Salary</p>
              <p className="text-sm font-semibold text-slate-200 mt-0.5">
                {job.salary}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Experience</p>
              <p className="text-sm font-semibold text-slate-200 mt-0.5">
                {job.experienceLevel}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Posted</p>
              <p className="text-sm font-semibold text-slate-200 mt-0.5">
                {job.postedDate}
              </p>
            </div>
          </div>

          {/* AI Skill Alignment Analysis */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">
              AI Skill Alignment Analysis
            </h3>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
              <div>
                <p className="text-xs font-semibold text-emerald-400 mb-2 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  Matching Qualifications
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.matchingSkills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 text-xs font-medium border border-emerald-500/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {job.missingSkills.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-amber-400 mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1.5" />
                    Recommended Skill Additions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.missingSkills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 text-xs font-medium border border-amber-500/20"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Overview Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">
              Job Description
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60">
              {job.description}
            </p>
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">
              Key Requirements
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/90 backdrop-blur-md sticky bottom-0 flex items-center justify-between gap-4">
          <Button variant="outline" onClick={onClose} className="w-1/3">
            Close
          </Button>

          <Button
            variant="primary"
            onClick={handleApplyClick}
            disabled={job.applicationStatus === "applied"}
            className="w-2/3 space-x-2 text-sm font-semibold py-2.5 shadow-lg"
          >
            {job.applicationStatus === "applied" ? (
              <>
                <FileCheck className="w-4 h-4" />
                <span>Application Submitted</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Apply with JobPilot AI</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
