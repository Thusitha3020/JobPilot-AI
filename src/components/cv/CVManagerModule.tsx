"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Star,
  CheckCircle2,
  Trash2,
  Edit2,
  Eye,
  Calendar,
  HardDrive,
  ShieldCheck,
  Plus,
  X,
  AlertTriangle,
} from "lucide-react";
import { CVDocument } from "@/types/cv";
import { getStoredCVs, saveStoredCVs } from "@/lib/cvStorage";
import { CVUploadArea } from "@/components/cv/CVUploadArea";
import { CVDetailsModal } from "@/components/cv/CVDetailsModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const CVManagerModule: React.FC = () => {
  const [cvList, setCvList] = useState<CVDocument[]>(() => getStoredCVs());
  const [selectedCvForDetails, setSelectedCvForDetails] = useState<CVDocument | null>(null);

  // Rename Dialog State
  const [renamingCv, setRenamingCv] = useState<CVDocument | null>(null);
  const [newFileNameInput, setNewFileNameInput] = useState<string>("");

  // Delete Confirmation State
  const [deletingCvId, setDeletingCvId] = useState<string | null>(null);

  const persistCVs = (newList: CVDocument[]) => {
    setCvList(newList);
    saveStoredCVs(newList);
  };

  const handleUploadSuccess = (newCV: CVDocument) => {
    // If list is empty, make this default automatically
    const isFirst = cvList.length === 0;
    const finalCV = { ...newCV, isDefault: isFirst, status: isFirst ? ("Default" as const) : ("Active" as const) };
    const updated = [finalCV, ...cvList];
    persistCVs(updated);
  };

  const handleSetDefault = (id: string) => {
    const updated = cvList.map((cv) => {
      const isTarget = cv.id === id;
      return {
        ...cv,
        isDefault: isTarget,
        status: isTarget ? ("Default" as const) : ("Active" as const),
      };
    });
    persistCVs(updated);
  };

  const handleOpenRename = (cv: CVDocument) => {
    setRenamingCv(cv);
    setNewFileNameInput(cv.fileName);
  };

  const handleSaveRename = () => {
    if (!renamingCv || !newFileNameInput.trim()) return;
    let formattedName = newFileNameInput.trim();
    if (!formattedName.toLowerCase().endsWith(".pdf")) {
      formattedName += ".pdf";
    }

    const updated = cvList.map((cv) =>
      cv.id === renamingCv.id ? { ...cv, fileName: formattedName } : cv
    );

    persistCVs(updated);
    setRenamingCv(null);
  };

  const handleDeleteCV = (id: string) => {
    const updated = cvList.filter((cv) => cv.id !== id);

    // If deleted CV was default and list still has items, set first as default
    if (updated.length > 0 && !updated.some((cv) => cv.isDefault)) {
      updated[0].isDefault = true;
      updated[0].status = "Default";
    }

    persistCVs(updated);
    setDeletingCvId(null);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">
              CV Manager & Documents
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
              {cvList.length} Uploaded
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Upload, manage, and inspect your master resume PDF files for job pilot matching.
          </p>
        </div>
      </div>

      {/* PDF Drag & Drop Upload Area */}
      <CVUploadArea onUploadSuccess={handleUploadSuccess} />

      {/* List of Uploaded CVs */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Your Uploaded CVs ({cvList.length})
          </h3>
          <span className="text-xs text-slate-400 flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Private Storage
          </span>
        </div>

        {cvList.length === 0 ? (
          <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/40 text-center text-slate-400 text-sm">
            No CVs uploaded yet. Use the upload area above to add your PDF resume.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cvList.map((cv) => (
              <div
                key={cv.id}
                className={cn(
                  "p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 group",
                  cv.isDefault
                    ? "bg-slate-900 border-blue-500/40 shadow-lg shadow-blue-500/5"
                    : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700"
                )}
              >
                {/* CV Header */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100 text-sm group-hover:text-blue-400 transition-colors leading-snug">
                          {cv.fileName}
                        </h4>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-1">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" /> {cv.uploadDate}
                          </span>
                          <span>•</span>
                          <span className="flex items-center">
                            <HardDrive className="w-3 h-3 mr-1" /> {cv.fileSize}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-semibold border shrink-0",
                        cv.isDefault
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-slate-800 text-slate-400 border-slate-750"
                      )}
                    >
                      {cv.isDefault ? "Default Master" : cv.status}
                    </span>
                  </div>
                </div>

                {/* Actions Footer Bar */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-1">
                    {/* View Details Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCvForDetails(cv)}
                      className="text-xs space-x-1 py-1 px-2.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </Button>

                    {/* Rename Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenRename(cv)}
                      className="text-xs py-1 px-2.5 text-slate-400 hover:text-slate-200"
                      title="Rename CV file"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>

                    {/* Delete Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeletingCvId(cv.id)}
                      className="text-xs py-1 px-2.5 text-rose-400 hover:text-rose-300 hover:border-rose-500/40"
                      title="Delete CV"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  {/* Set Default Toggle */}
                  {!cv.isDefault && (
                    <button
                      onClick={() => handleSetDefault(cv.id)}
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1 cursor-pointer"
                    >
                      <Star className="w-3.5 h-3.5" />
                      <span>Make Default</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* RENAME MODAL */}
      {renamingCv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-100 text-base">Rename CV Document</h3>
              <button onClick={() => setRenamingCv(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">File Name</label>
              <input
                type="text"
                value={newFileNameInput}
                onChange={(e) => setNewFileNameInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-750 text-sm text-slate-200 focus:outline-none"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setRenamingCv(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveRename}>
                Save Name
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingCvId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Delete CV Document?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to delete this CV? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setDeletingCvId(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleDeleteCV(deletingCvId)}
                className="bg-rose-600 hover:bg-rose-700 text-white"
              >
                Delete CV
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CV DETAILS MODAL */}
      <CVDetailsModal
        cv={selectedCvForDetails}
        onClose={() => setSelectedCvForDetails(null)}
      />
    </div>
  );
};
