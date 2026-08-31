"use client";

import React, { useState } from "react";
import {
  X,
  FileText,
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  FolderGit2,
  Award,
  Globe,
  Link as LinkIcon,
  Download,
  Calendar,
  HardDrive,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { CVDocument } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CVDetailsModalProps {
  cv: CVDocument | null;
  onClose: () => void;
}

export const CVDetailsModal: React.FC<CVDetailsModalProps> = ({ cv, onClose }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "extraction">("extraction");

  if (!cv) return null;

  const data = cv.extractedData || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-3xl bg-slate-900 border-l border-slate-800 h-full shadow-2xl overflow-y-auto custom-scrollbar flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/90 sticky top-0 backdrop-blur-md z-10 flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-slate-100">{cv.fileName}</h2>
                {cv.isDefault && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                    Default Master
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center space-x-3">
                <span>Uploaded: {cv.uploadDate}</span>
                <span>•</span>
                <span>Size: {cv.fileSize}</span>
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

        {/* Tab View Selector */}
        <div className="px-6 pt-4 border-b border-slate-800 flex space-x-4">
          <button
            onClick={() => setActiveTab("extraction")}
            className={cn(
              "pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center space-x-1.5",
              activeTab === "extraction"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Extracted CV Architecture Schema</span>
          </button>
          <button
            onClick={() => setActiveTab("overview")}
            className={cn(
              "pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center space-x-1.5",
              activeTab === "overview"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            )}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Document File Details</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1 text-left">
          {activeTab === "extraction" ? (
            <div className="space-y-6">
              {/* Architecture Intro Banner */}
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
                <p>
                  This schema structures extracted candidate metadata (Name, Contact, Education, Skills, Experience, Projects, Certifications, Languages, Links) for JobPilot AI matching.
                </p>
              </div>

              {/* 1. Contact & Identity */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                  <User className="w-4 h-4 text-blue-400" />
                  <span>Contact Information</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">Name</span>
                    <p className="font-semibold text-slate-200 mt-0.5">{data.name || "Alex Morgan"}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Email</span>
                    <p className="font-semibold text-slate-200 mt-0.5">{data.email || "alex.morgan@example.com"}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Phone</span>
                    <p className="font-semibold text-slate-200 mt-0.5">{data.phone || "+1 (555) 234-5678"}</p>
                  </div>
                </div>
              </div>

              {/* 2. Education */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>Education</span>
                </div>
                {data.education && data.education.length > 0 ? (
                  <div className="space-y-2 text-xs">
                    {data.education.map((edu, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                        <p className="font-bold text-slate-200">{edu.degree}</p>
                        <p className="text-slate-400">{edu.institution} {edu.startYear ? `(${edu.startYear} - ${edu.endYear})` : ""}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No education entries extracted.</p>
                )}
              </div>

              {/* 3. Skills */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                  <Wrench className="w-4 h-4 text-amber-400" />
                  <span>Extracted Skills</span>
                </div>
                {data.skills && data.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No skills extracted.</p>
                )}
              </div>

              {/* 4. Experience */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  <span>Work Experience</span>
                </div>
                {data.experience && data.experience.length > 0 ? (
                  <div className="space-y-3 text-xs">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="flex justify-between font-bold text-slate-200">
                          <span>{exp.jobTitle} • {exp.company}</span>
                          <span className="text-slate-400">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="text-slate-400">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No experience entries extracted.</p>
                )}
              </div>

              {/* 5. Certifications & Languages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>Certifications</span>
                  </div>
                  {data.certifications && data.certifications.length > 0 ? (
                    <ul className="space-y-1 text-xs text-slate-300">
                      {data.certifications.map((c, i) => (
                        <li key={i}>• {c.name} ({c.issuer})</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500 italic">None specified</p>
                  )}
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span>Languages</span>
                  </div>
                  {data.languages && data.languages.length > 0 ? (
                    <p className="text-xs text-slate-300">{data.languages.join(", ")}</p>
                  ) : (
                    <p className="text-xs text-slate-500 italic">None specified</p>
                  )}
                </div>
              </div>

              {/* 6. Links */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center space-x-2 font-bold text-slate-200 uppercase tracking-wider">
                  <LinkIcon className="w-4 h-4 text-purple-400" />
                  <span>Links & Profiles</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-blue-400 font-medium">
                  <div>Portfolio: {data.portfolio || "Not attached"}</div>
                  <div>LinkedIn: {data.linkedin || "Not attached"}</div>
                  <div>GitHub: {data.github || "Not attached"}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="font-bold text-slate-200 text-sm">Document Attributes</h4>
                <div className="grid grid-cols-2 gap-3 text-slate-300">
                  <div>
                    <span className="text-slate-400">File Name:</span>
                    <p className="font-semibold text-slate-100">{cv.fileName}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Original Name:</span>
                    <p className="font-semibold text-slate-100">{cv.originalName}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">File Size:</span>
                    <p className="font-semibold text-slate-100">{cv.fileSize}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Status:</span>
                    <p className="font-semibold text-emerald-400">{cv.status}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/90 sticky bottom-0 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close Details
          </Button>

          {cv.pdfDataUrl && (
            <a href={cv.pdfDataUrl} download={cv.fileName}>
              <Button variant="primary" className="space-x-1">
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
