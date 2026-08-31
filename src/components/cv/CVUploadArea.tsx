"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, FileText, AlertCircle, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { validatePDFFile, formatFileSize } from "@/lib/cvValidation";
import { getStoredProfile } from "@/lib/profileStorage";
import { CVDocument } from "@/types/cv";
import { Button } from "@/components/ui/button";

interface CVUploadAreaProps {
  onUploadSuccess: (newCV: CVDocument) => void;
}

export const CVUploadArea: React.FC<CVUploadAreaProps> = ({ onUploadSuccess }) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcessFile = (file: File) => {
    setErrorMessage(null);
    const validation = validatePDFFile(file);

    if (!validation.isValid) {
      setErrorMessage(validation.errorMessage || "Invalid PDF file.");
      return;
    }

    setIsUploading(true);
    const activeProfile = getStoredProfile();

    // Read PDF file as Data URL for local storage
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;

      const newCV: CVDocument = {
        id: "cv-" + Date.now(),
        fileName: file.name,
        originalName: file.name,
        fileSize: formatFileSize(file.size),
        rawSizeBytes: file.size,
        uploadDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isDefault: false,
        status: "Active",
        pdfDataUrl: dataUrl,
        extractedData: {
          name: activeProfile.personal.fullName || "Candidate",
          email: activeProfile.personal.email || "candidate@jobpilot.lk",
          phone: activeProfile.personal.phone || "+94 77 123 4567",
          skills: activeProfile.skills.otherSkills || ["PDF Resume", "Parsed Document"],
          education: [
            {
              institution: activeProfile.education.university || "University of Moratuwa",
              degree: activeProfile.education.degree || "B.Sc. Computer Science",
              endYear: activeProfile.education.graduationYear || "2024",
            },
          ],
          experience: [],
          projects: [],
          certifications: [],
          languages: ["English", "Sinhala"],
          portfolio: activeProfile.links.portfolio || "",
          linkedin: activeProfile.links.linkedin || "",
          github: activeProfile.links.github || "",
        },
      };

      setTimeout(() => {
        setIsUploading(false);
        onUploadSuccess(newCV);
      }, 600);
    };

    reader.onerror = () => {
      setIsUploading(false);
      setErrorMessage("Failed to read the file. Please try uploading again.");
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone Container */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative p-8 rounded-3xl border-2 border-dashed transition-all duration-300 text-center cursor-pointer flex flex-col items-center justify-center space-y-4 ${
          isDragOver
            ? "border-blue-500 bg-blue-500/10 shadow-xl"
            : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,application/pdf"
          className="hidden"
        />

        <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-inner">
          {isUploading ? (
            <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          ) : (
            <UploadCloud className="w-8 h-8" />
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-100">
            {isUploading ? "Processing PDF Document..." : "Upload Your CV / Resume"}
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Drag & drop your PDF file here, or click to browse files from your computer.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400 pt-2">
          <span className="px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 font-semibold text-slate-300">
            PDF Only (.pdf)
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 font-semibold text-slate-300">
            Max 10 MB
          </span>
          <span className="flex items-center text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Private & Encrypted Storage
          </span>
        </div>
      </div>

      {/* Validation Error Alert */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-rose-400 hover:text-rose-200 p-1"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};
