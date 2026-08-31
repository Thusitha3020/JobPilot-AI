"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { UserProfileData } from "@/types/profile";
import { getStoredProfile, saveStoredProfile, DEFAULT_PROFILE } from "@/lib/profileStorage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ProfileModule: React.FC = () => {
  const [profile, setProfile] = useState<UserProfileData>(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<boolean>(false);
  const [newSkillInput, setNewSkillInput] = useState<string>("");
  const [newTitleInput, setNewTitleInput] = useState<string>("");
  const [newLocationInput, setNewLocationInput] = useState<string>("");

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  const handleSave = () => {
    const success = saveStoredProfile(profile);
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

  const handleRemovePreferredLocation = (loc: string) => {
    setProfile((prev) => ({
      ...prev,
      professional: {
        ...prev.professional,
        preferredLocations: prev.professional.preferredLocations.filter((l) => l !== loc),
      },
    }));
  };

  // Calculate completeness score
  const coreSkillCount = [
    profile.skills.itSupport,
    profile.skills.networking,
    profile.skills.hardwareTroubleshooting,
    profile.skills.softwareTroubleshooting,
    profile.skills.systemAdministration,
    profile.skills.microsoftOffice,
  ].filter(Boolean).length;

  const completeness = Math.min(
    100,
    Math.round(
      (Boolean(profile.personal.fullName) ? 20 : 0) +
        (Boolean(profile.personal.email) ? 20 : 0) +
        (Boolean(profile.education.university) ? 20 : 0) +
        (profile.professional.preferredJobTitles.length > 0 ? 20 : 0) +
        (coreSkillCount > 0 ? 20 : 0)
    )
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in pb-12">
      {/* Save Success Toast Banner */}
      {saveToast && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-between shadow-xl animate-in slide-in-from-top-2">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold text-sm">Profile Saved Successfully!</p>
              <p className="text-xs text-emerald-400/80">
                Your pilot profile settings have been updated in local storage.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSaveToast(false)}
            className="text-emerald-400 hover:text-emerald-200 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Profile Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">
              Pilot Career Profile
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
              {completeness}% Complete
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Manage your personal, education, professional preferences, and skills matrix.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
                className="border-slate-750 text-slate-300"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
                className="space-x-1.5 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetToDefault}
                className="border-slate-800 text-slate-400 hover:text-slate-200 space-x-1"
                title="Reset to demo profile defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="space-x-1.5 font-semibold"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* SECTION 1: Personal Information */}
      <section className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-6">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800/80">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Personal Information</h3>
            <p className="text-xs text-slate-400">Contact and identity details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.personal.fullName}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    personal: { ...profile.personal, fullName: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-750 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <p className="text-sm font-semibold text-slate-100 px-3.5 py-2 rounded-xl bg-slate-950/40 border border-slate-850">
                {profile.personal.fullName || "Not provided"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            {isEditing ? (
              <input
                type="email"
                value={profile.personal.email}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    personal: { ...profile.personal, email: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-750 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <p className="text-sm font-semibold text-slate-100 px-3.5 py-2 rounded-xl bg-slate-950/40 border border-slate-850">
                {profile.personal.email || "Not provided"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.personal.phone}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    personal: { ...profile.personal, phone: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-750 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <p className="text-sm font-semibold text-slate-100 px-3.5 py-2 rounded-xl bg-slate-950/40 border border-slate-850">
                {profile.personal.phone || "Not provided"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Location</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.personal.location}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    personal: { ...profile.personal, location: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-750 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <p className="text-sm font-semibold text-slate-100 px-3.5 py-2 rounded-xl bg-slate-950/40 border border-slate-850">
                {profile.personal.location || "Not provided"}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: Education */}
      <section className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-6">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800/80">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Education</h3>
            <p className="text-xs text-slate-400">Academic background & qualifications</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">University / Institution</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.education.university}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    education: { ...profile.education, university: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-750 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <p className="text-sm font-semibold text-slate-100 px-3.5 py-2 rounded-xl bg-slate-950/40 border border-slate-850">
                {profile.education.university || "Not provided"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Degree / Field of Study</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.education.degree}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    education: { ...profile.education, degree: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-750 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <p className="text-sm font-semibold text-slate-100 px-3.5 py-2 rounded-xl bg-slate-950/40 border border-slate-850">
                {profile.education.degree || "Not provided"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Graduation Year</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.education.graduationYear}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    education: { ...profile.education, graduationYear: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-750 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <p className="text-sm font-semibold text-slate-100 px-3.5 py-2 rounded-xl bg-slate-950/40 border border-slate-850">
                {profile.education.graduationYear || "Not provided"}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: Professional Information */}
      <section className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-6">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800/80">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Professional Information</h3>
            <p className="text-xs text-slate-400">Career targets, job titles, and work arrangement preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Preferred Job Titles */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Job Titles</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {profile.professional.preferredJobTitles.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-purple-500/10 text-purple-300 text-xs font-semibold border border-purple-500/20 flex items-center space-x-1.5"
                >
                  <span>{t}</span>
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveJobTitle(t)}
                      className="hover:text-rose-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditing && (
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add job title (e.g. System Admin)..."
                  value={newTitleInput}
                  onChange={(e) => setNewTitleInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-750 text-xs text-slate-200 focus:outline-none"
                />
                <Button variant="outline" size="sm" onClick={handleAddJobTitle}>
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>

          {/* Preferred Locations */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Locations</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {profile.professional.preferredLocations.map((loc) => (
                <span
                  key={loc}
                  className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-300 text-xs font-semibold border border-blue-500/20 flex items-center space-x-1.5"
                >
                  <span>{loc}</span>
                  {isEditing && (
                    <button
                      onClick={() => handleRemovePreferredLocation(loc)}
                      className="hover:text-rose-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditing && (
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add location (e.g. Remote, NY)..."
                  value={newLocationInput}
                  onChange={(e) => setNewLocationInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-750 text-xs text-slate-200 focus:outline-none"
                />
                <Button variant="outline" size="sm" onClick={handleAddPreferredLocation}>
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Employment Type</label>
            {isEditing ? (
              <select
                value={profile.professional.employmentType}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    professional: {
                      ...profile.professional,
                      employmentType: e.target.value as any,
                    },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-750 text-sm text-slate-200 focus:outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Any">Any</option>
              </select>
            ) : (
              <p className="text-sm font-semibold text-slate-100 px-3.5 py-2 rounded-xl bg-slate-950/40 border border-slate-850">
                {profile.professional.employmentType}
              </p>
            )}
          </div>

          {/* Remote / Hybrid / On-site Preference */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Remote / Hybrid / On-site</label>
            {isEditing ? (
              <select
                value={profile.professional.workPreference}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    professional: {
                      ...profile.professional,
                      workPreference: e.target.value as any,
                    },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-750 text-sm text-slate-200 focus:outline-none"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
                <option value="Open to Any">Open to Any</option>
              </select>
            ) : (
              <p className="text-sm font-semibold text-slate-100 px-3.5 py-2 rounded-xl bg-slate-950/40 border border-slate-850">
                {profile.professional.workPreference}
              </p>
            )}
          </div>

          {/* Minimum Salary */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Minimum Salary Expectation</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.professional.minSalary}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    professional: {
                      ...profile.professional,
                      minSalary: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-750 text-sm text-slate-200 focus:outline-none"
              />
            ) : (
              <p className="text-sm font-semibold text-slate-100 px-3.5 py-2 rounded-xl bg-slate-950/40 border border-slate-850">
                {profile.professional.minSalary || "Not specified"}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: Skills Matrix */}
      <section className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-6">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800/80">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Skills Matrix</h3>
            <p className="text-xs text-slate-400">Core technical proficiencies and custom skills</p>
          </div>
        </div>

        {/* Predefined Core Skills */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Core Technical Skills
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { id: "itSupport", label: "IT Support" },
              { id: "networking", label: "Networking" },
              { id: "hardwareTroubleshooting", label: "Hardware Troubleshooting" },
              { id: "softwareTroubleshooting", label: "Software Troubleshooting" },
              { id: "systemAdministration", label: "System Administration" },
              { id: "microsoftOffice", label: "Microsoft Office" },
            ].map((item) => {
              const key = item.id as keyof typeof profile.skills;
              const isChecked = Boolean(profile.skills[key]);
              return (
                <label
                  key={item.id}
                  className={cn(
                    "flex items-center space-x-3 p-3.5 rounded-2xl border transition-all cursor-pointer",
                    isChecked
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        skills: {
                          ...profile.skills,
                          [key]: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-xs font-semibold">{item.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Other / Custom Skills */}
        <div className="space-y-3 pt-4 border-t border-slate-800/80">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Other Skills ({profile.skills.otherSkills.length})
          </h4>

          <div className="flex flex-wrap gap-2">
            {profile.skills.otherSkills.map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700 flex items-center space-x-1.5"
              >
                <span>{s}</span>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveCustomSkill(s)}
                    className="hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
          </div>

          {isEditing && (
            <div className="flex max-w-md space-x-2 pt-2">
              <input
                type="text"
                placeholder="Add other skill (e.g. AWS, Docker)..."
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomSkill();
                  }
                }}
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-750 text-xs text-slate-200 focus:outline-none"
              />
              <Button variant="outline" size="sm" onClick={handleAddCustomSkill}>
                <Plus className="w-4 h-4 mr-1" />
                <span>Add Skill</span>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: Links */}
      <section className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-6">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800/80">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <LinkIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Professional Links</h3>
            <p className="text-xs text-slate-400">Online portfolio, LinkedIn profile, and GitHub repository links</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Portfolio URL</label>
            {isEditing ? (
              <input
                type="url"
                value={profile.links.portfolio}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    links: { ...profile.links, portfolio: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-750 text-sm text-slate-200 focus:outline-none"
              />
            ) : (
              <a
                href={profile.links.portfolio || "#"}
                target="_blank"
                rel="noreferrer"
                className="block text-sm font-semibold text-blue-400 hover:underline truncate px-3.5 py-2 rounded-xl bg-slate-950/40 border border-slate-850"
              >
                {profile.links.portfolio || "Not provided"}
              </a>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">LinkedIn Profile</label>
            {isEditing ? (
              <input
                type="url"
                value={profile.links.linkedin}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    links: { ...profile.links, linkedin: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-750 text-sm text-slate-200 focus:outline-none"
              />
            ) : (
              <a
                href={profile.links.linkedin || "#"}
                target="_blank"
                rel="noreferrer"
                className="block text-sm font-semibold text-blue-400 hover:underline truncate px-3.5 py-2 rounded-xl bg-slate-950/40 border border-slate-850"
              >
                {profile.links.linkedin || "Not provided"}
              </a>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">GitHub Profile</label>
            {isEditing ? (
              <input
                type="url"
                value={profile.links.github}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    links: { ...profile.links, github: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-750 text-sm text-slate-200 focus:outline-none"
              />
            ) : (
              <a
                href={profile.links.github || "#"}
                target="_blank"
                rel="noreferrer"
                className="block text-sm font-semibold text-blue-400 hover:underline truncate px-3.5 py-2 rounded-xl bg-slate-950/40 border border-slate-850"
              >
                {profile.links.github || "Not provided"}
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
