"use client";

import React, { useState } from "react";
import {
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  Globe,
  Save,
  CheckCircle2,
  Plus,
  X,
  Edit3,
  RotateCcw,
  Sparkles,
  Link as LinkIcon,
  ShieldCheck,
} from "lucide-react";
import { UserProfileData } from "@/types/profile";
import { getStoredProfile, saveStoredProfile, syncProfileWithGmailSession, DEFAULT_PROFILE } from "@/lib/profileStorage";
import { getStoredSession } from "@/lib/authSession";
import { Button } from "@/components/ui/button";

export const ProfileModule: React.FC = () => {
  const [profile, setProfile] = useState<UserProfileData>(() => {
    if (typeof window !== "undefined") {
      const activeSession = getStoredSession();
      if (activeSession && activeSession.isLoggedIn) {
        return syncProfileWithGmailSession(activeSession);
      }
    }
    return getStoredProfile();
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<boolean>(false);
  const [newSkillInput, setNewSkillInput] = useState<string>("");
  const [newTitleInput, setNewTitleInput] = useState<string>("");
  const [newLocationInput, setNewLocationInput] = useState<string>("");

  const activeSession = typeof window !== "undefined" ? getStoredSession() : null;

  const handleSave = () => {
    const session = getStoredSession();
    const success = saveStoredProfile(profile, session?.email);
    if (success) {
      setIsEditing(false);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3500);
    }
  };

  const handleResetToDefault = () => {
    setProfile(DEFAULT_PROFILE);
    saveStoredProfile(DEFAULT_PROFILE);
  };

  const handleAddCustomSkill = () => {
    if (!newSkillInput.trim()) return;
    if (profile.skills.otherSkills.includes(newSkillInput.trim())) {
      setNewSkillInput("");
      return;
    }
    setProfile((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        otherSkills: [...prev.skills.otherSkills, newSkillInput.trim()],
      },
    }));
    setNewSkillInput("");
  };

  const handleRemoveCustomSkill = (skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        otherSkills: prev.skills.otherSkills.filter((s) => s !== skillToRemove),
      },
    }));
  };

  const handleAddJobTitle = () => {
    if (!newTitleInput.trim()) return;
    setProfile((prev) => ({
      ...prev,
      professional: {
        ...prev.professional,
        preferredJobTitles: [...prev.professional.preferredJobTitles, newTitleInput.trim()],
      },
    }));
    setNewTitleInput("");
  };

  const handleRemoveJobTitle = (title: string) => {
    setProfile((prev) => ({
      ...prev,
      professional: {
        ...prev.professional,
        preferredJobTitles: prev.professional.preferredJobTitles.filter((t) => t !== title),
      },
    }));
  };

  const handleAddPreferredLocation = () => {
    if (!newLocationInput.trim()) return;
    setProfile((prev) => ({
      ...prev,
      professional: {
        ...prev.professional,
        preferredLocations: [...prev.professional.preferredLocations, newLocationInput.trim()],
      },
    }));
    setNewLocationInput("");
  };

  const handleRemovePreferredLocation = (location: string) => {
    setProfile((prev) => ({
      ...prev,
      professional: {
        ...prev.professional,
        preferredLocations: prev.professional.preferredLocations.filter((l) => l !== location),
      },
    }));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-extrabold text-2xl text-white shadow-xl shadow-blue-500/20 shrink-0">
            {profile.personal.fullName ? profile.personal.fullName.slice(0, 2).toUpperCase() : "JP"}
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">
                {profile.personal.fullName || "Candidate Profile"}
              </h1>
              {activeSession && activeSession.isLoggedIn && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Gmail Verified
                </span>
              )}
            </div>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              {profile.personal.email} • {profile.personal.location}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
                className="text-xs space-x-1.5 font-bold shadow-lg shadow-blue-500/20"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-xs space-x-1.5 hover:border-slate-700"
            >
              <Edit3 className="w-4 h-4 text-blue-400" />
              <span>Edit Profile</span>
            </Button>
          )}
        </div>
      </div>

      {saveToast && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Profile settings saved successfully! Saved under {profile.personal.email}.</span>
          </div>
        </div>
      )}

      {/* Personal & Contact Section */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
          <User className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold text-slate-100">Personal & Contact Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.personal.fullName}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    personal: { ...prev.personal, fullName: e.target.value },
                  }))
                }
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-850 text-slate-200 font-medium">
                {profile.personal.fullName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Gmail Email</label>
            {isEditing ? (
              <input
                type="email"
                value={profile.personal.email}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    personal: { ...prev.personal, email: e.target.value },
                  }))
                }
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-850 text-slate-200 font-medium">
                {profile.personal.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Phone Number</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.personal.phone}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    personal: { ...prev.personal, phone: e.target.value },
                  }))
                }
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-850 text-slate-200 font-medium">
                {profile.personal.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Location</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.personal.location}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    personal: { ...prev.personal, location: e.target.value },
                  }))
                }
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-850 text-slate-200 font-medium">
                {profile.personal.location}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Professional Preferences Section */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
          <Briefcase className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-slate-100">Professional & Role Preferences</h2>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-2">Preferred Job Titles</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {profile.professional.preferredJobTitles.map((title) => (
                <span
                  key={title}
                  className="px-3 py-1 rounded-xl bg-indigo-500/10 text-indigo-300 font-medium border border-indigo-500/20 flex items-center space-x-1.5"
                >
                  <span>{title}</span>
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveJobTitle(title)}
                      className="hover:text-white p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isEditing && (
              <div className="flex items-center space-x-2 max-w-sm mt-2">
                <input
                  type="text"
                  placeholder="Add job title (e.g. Frontend Engineer)"
                  value={newTitleInput}
                  onChange={(e) => setNewTitleInput(e.target.value)}
                  className="flex-1 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500 text-xs"
                />
                <Button size="sm" onClick={handleAddJobTitle} className="text-xs">
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-2">Preferred Work Locations</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {profile.professional.preferredLocations.map((loc) => (
                <span
                  key={loc}
                  className="px-3 py-1 rounded-xl bg-blue-500/10 text-blue-300 font-medium border border-blue-500/20 flex items-center space-x-1.5"
                >
                  <span>{loc}</span>
                  {isEditing && (
                    <button
                      onClick={() => handleRemovePreferredLocation(loc)}
                      className="hover:text-white p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
          <Wrench className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-slate-100">Technical Skills & Expertise</h2>
        </div>

        <div className="space-y-4 text-xs">
          <label className="block text-slate-400 font-semibold">Technical Skills</label>
          <div className="flex flex-wrap gap-2">
            {profile.skills.otherSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-xl bg-purple-500/10 text-purple-300 font-medium border border-purple-500/20 flex items-center space-x-1.5"
              >
                <span>{skill}</span>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveCustomSkill(skill)}
                    className="hover:text-white p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
          </div>

          {isEditing && (
            <div className="flex items-center space-x-2 max-w-sm mt-3">
              <input
                type="text"
                placeholder="Add skill (e.g. AWS, Docker)"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                className="flex-1 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500 text-xs"
              />
              <Button size="sm" onClick={handleAddCustomSkill} className="text-xs">
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
