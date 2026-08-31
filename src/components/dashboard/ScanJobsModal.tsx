"use client";

import React, { useState } from "react";
import {
  X,
  Globe,
  Search,
  CheckCircle2,
  Loader2,
  Sparkles,
  MapPin,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { SRI_LANKA_PORTALS, ScanProgressStep, ScanResult } from "@/lib/scrapers/sriLankaJobScanner";
import { Job } from "@/types/dashboard";
import { Button } from "@/components/ui/button";

interface ScanJobsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanCompleted: (newJobs: Job[]) => void;
  initialKeyword?: string;
  initialLocation?: string;
}

export const ScanJobsModal: React.FC<ScanJobsModalProps> = ({
  isOpen,
  onClose,
  onScanCompleted,
  initialKeyword = "",
  initialLocation = "",
}) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || "All Sri Lanka");
  const [isScanning, setIsScanning] = useState(false);
  const [scanSteps, setScanSteps] = useState<ScanProgressStep[]>([]);
  const [scanSummary, setScanSummary] = useState<ScanResult | null>(null);

  if (!isOpen) return null;

  const locations = [
    "All Sri Lanka",
    "Colombo",
    "Kandy",
    "Galle",
    "Gampaha",
    "Kurunegala",
    "Jaffna",
    "Negombo",
    "Matara",
    "Remote - Sri Lanka",
  ];

  const handleStartScan = async () => {
    setIsScanning(true);
    setScanSummary(null);

    // Initialize progress steps
    const initialSteps: ScanProgressStep[] = SRI_LANKA_PORTALS.map((p) => ({
      portalId: p.id,
      portalName: p.name,
      url: p.url,
      status: "pending",
      foundCount: 0,
    }));
    setScanSteps(initialSteps);

    // Step-by-step progress animation simulation & API trigger
    for (let i = 0; i < initialSteps.length; i++) {
      setScanSteps((prev) =>
        prev.map((step, idx) => (idx === i ? { ...step, status: "scanning" } : step))
      );
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    try {
      const res = await fetch("/api/scan-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword,
          location: selectedLocation === "All Sri Lanka" ? "" : selectedLocation,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.scanResult) {
          setScanSummary(data.scanResult);
          setScanSteps(data.scanResult.scannedPortals);
          onScanCompleted(data.scanResult.jobs);
        }
      }
    } catch (err) {
      console.warn("Scan jobs error:", err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Globe className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-extrabold text-slate-100">
                  Sri Lanka Web Job Scanner
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                  Live Scanner
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Live crawl Sri Lankan job portals: Ikman.lk, TopJobs.lk, XpressJobs, JobSeek & SL Tech Portals.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          {/* Controls Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Keyword */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Keyword / Role / Skill
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. Software Engineer, QA, Support..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-750 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Region / District */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Sri Lanka Region / City
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-indigo-400 absolute left-3 top-2.5" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-750 text-xs text-slate-200 focus:outline-none cursor-pointer"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Target Web Portals List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Target Sri Lankan Web Sources ({SRI_LANKA_PORTALS.length})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scanSteps.length > 0
                ? scanSteps.map((step) => (
                    <div
                      key={step.portalId}
                      className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        {step.status === "scanning" ? (
                          <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
                        ) : step.status === "completed" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Globe className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                        <div className="truncate">
                          <p className="text-xs font-semibold text-slate-200 truncate">
                            {step.portalName}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">{step.url}</p>
                        </div>
                      </div>

                      {step.status === "completed" && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold shrink-0">
                          +{step.foundCount} roles
                        </span>
                      )}
                    </div>
                  ))
                : SRI_LANKA_PORTALS.map((portal) => (
                    <div
                      key={portal.id}
                      className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                        <div className="truncate">
                          <p className="text-xs font-semibold text-slate-200 truncate">
                            {portal.name}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">{portal.url}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium">Ready</span>
                    </div>
                  ))}
            </div>
          </div>

          {/* Scan Results Summary Banner */}
          {scanSummary && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-1 animate-in fade-in">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h5 className="font-bold text-sm">
                  Successfully Scanned Sri Lanka Web Portals!
                </h5>
              </div>
              <p className="text-xs text-emerald-200/90">
                Discovered and normalized <strong className="text-white">{scanSummary.totalFound} new Sri Lankan job postings</strong> matching &quot;{selectedLocation}&quot;.
              </p>
            </div>
          )}
        </div>

        {/* Footer Action Bar */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <p className="text-xs text-slate-400 hidden sm:block">
            Automatic deduplication active.
          </p>

          <div className="flex items-center space-x-3 ml-auto">
            <Button variant="outline" size="sm" onClick={onClose} disabled={isScanning}>
              Close
            </Button>
            <Button
              size="sm"
              onClick={handleStartScan}
              disabled={isScanning}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold space-x-2 cursor-pointer shadow-lg shadow-blue-500/20"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Scanning SL Web...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Scan Sri Lanka Websites Now</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
