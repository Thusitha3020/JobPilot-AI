"use client";

import React from "react";
import {
  Building2,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  Send,
  Bookmark,
  DollarSign,
} from "lucide-react";
import { Job } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  onViewJob: (job: Job) => void;
  onApplyJob: (job: Job) => void;
  onToggleSave: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onViewJob,
  onApplyJob,
  onToggleSave,
}) => {
  const isHighMatch = job.matchPercentage >= 90;
  const isMediumMatch = job.matchPercentage >= 80 && job.matchPercentage < 90;

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between group">
      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start space-x-3.5">
            {/* Company Logo Badge */}
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl shrink-0 shadow-inner">
              {job.companyLogo || "🏢"}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors leading-snug">
                {job.title}
              </h3>
              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-400 mt-1">
                <span className="flex items-center font-medium text-slate-300">
                  <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  {job.company}
                </span>
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  {job.location}
                </span>
              </div>
            </div>
          </div>

          {/* Save / Bookmark Button */}
          <button
            onClick={() => onToggleSave(job.id)}
            className={cn(
              "p-2 rounded-xl border transition-all cursor-pointer",
              job.isSaved
                ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                : "bg-slate-800/60 border-slate-750 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            )}
            title={job.isSaved ? "Saved to Bookmarks" : "Save Job"}
            aria-label="Save Job"
          >
            <Bookmark
              className={cn("w-4 h-4", job.isSaved && "fill-amber-400")}
            />
          </button>
        </div>

        {/* Job Tags & Match Percentage Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 my-4 py-2.5 px-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium border border-slate-700">
              {job.jobType}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium border border-slate-700">
              {job.salary}
            </span>
          </div>

          {/* Match Percentage Pill */}
          <div
            className={cn(
              "flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm",
              isHighMatch
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : isMediumMatch
                ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                : "bg-purple-500/10 text-purple-400 border-purple-500/30"
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{job.matchPercentage}% Match</span>
          </div>
        </div>

        {/* Skills Analysis Breakdown */}
        <div className="space-y-3 my-4">
          {/* Matching Skills */}
          <div>
            <div className="flex items-center text-xs font-semibold text-emerald-400 mb-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Matching Skills ({job.matchingSkills.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {job.matchingSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 text-xs font-medium border border-emerald-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          {job.missingSkills.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-semibold text-amber-400 mb-1.5">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                Missing Skills ({job.missingSkills.length})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {job.missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 text-xs font-medium border border-amber-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Posted Date & Action Buttons */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 mt-2">
        <span className="flex items-center text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5 mr-1" />
          {job.postedDate}
        </span>

        <div className="flex items-center space-x-2">
          {/* View Job Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewJob(job)}
            className="text-xs space-x-1 hover:border-slate-600"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Job</span>
          </Button>

          {/* Apply Button */}
          <Button
            variant="primary"
            size="sm"
            disabled={job.applicationStatus === "applied"}
            onClick={() => onApplyJob(job)}
            className={cn(
              "text-xs space-x-1 font-semibold shadow-md",
              job.applicationStatus === "applied" &&
                "bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 opacity-100"
            )}
          >
            {job.applicationStatus === "applied" ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Applied</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Apply</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
