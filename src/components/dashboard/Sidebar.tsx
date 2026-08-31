"use client";

import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  Send,
  FileText,
  User,
  Bot,
  BarChart3,
  Settings,
  X,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { NavItemId, SidebarNavItem } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: NavItemId;
  onSelectTab: (tab: NavItemId) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

const NAV_ITEMS: SidebarNavItem[] = [
  { id: "dashboard", label: "Dashboard", iconName: "LayoutDashboard" },
  { id: "jobs", label: "Jobs", iconName: "Briefcase", badge: "142" },
  { id: "applications", label: "Applications", iconName: "Send", badge: "19" },
  { id: "cv-manager", label: "CV Manager", iconName: "FileText" },
  { id: "profile", label: "Profile", iconName: "User" },
  { id: "automation", label: "Automation", iconName: "Bot", isNew: true },
  { id: "analytics", label: "Analytics", iconName: "BarChart3" },
  { id: "settings", label: "Settings", iconName: "Settings" },
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "LayoutDashboard":
      return <LayoutDashboard className="w-5 h-5" />;
    case "Briefcase":
      return <Briefcase className="w-5 h-5" />;
    case "Send":
      return <Send className="w-5 h-5" />;
    case "FileText":
      return <FileText className="w-5 h-5" />;
    case "User":
      return <User className="w-5 h-5" />;
    case "Bot":
      return <Bot className="w-5 h-5" />;
    case "BarChart3":
      return <BarChart3 className="w-5 h-5" />;
    case "Settings":
      return <Settings className="w-5 h-5" />;
    default:
      return <LayoutDashboard className="w-5 h-5" />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
}) => {
  const content = (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800/80 text-slate-300">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              JobPilot AI
            </h1>
            <p className="text-[11px] text-blue-400 font-medium tracking-wide uppercase">
              Pro Co-Pilot
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
          Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                onCloseMobile();
              }}
              className={cn(
                "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group cursor-pointer",
                isActive
                  ? "bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
              )}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-blue-400"
                      : "text-slate-400 group-hover:text-slate-300"
                  )}
                >
                  {getIcon(item.iconName)}
                </span>
                <span>{item.label}</span>
              </div>

              <div className="flex items-center space-x-2">
                {item.isNew && (
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    AI
                  </span>
                )}
                {item.badge && (
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs font-semibold rounded-full",
                      isActive
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-slate-800 text-slate-400 group-hover:bg-slate-750"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* AI Automation Status Card */}
      <div className="p-4 m-3 rounded-xl bg-gradient-to-br from-slate-800/90 to-indigo-950/40 border border-slate-750">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-200">
              Pilot Autopilot Active
            </span>
          </div>
          <span className="text-[10px] text-blue-400 font-medium">98% Match</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed mb-3">
          Auto-matching active jobs based on your CV profile.
        </p>
        <button
          onClick={() => onSelectTab("automation")}
          className="w-full flex items-center justify-center space-x-1.5 py-1.5 px-3 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-xs font-medium transition-colors cursor-pointer"
        >
          <span>Manage Automation</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* User Footer Profile */}
      <div className="p-4 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-blue-400">
            JD
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-200">Alex Morgan</p>
            <p className="text-xs text-slate-400 truncate max-w-[110px]">
              alex@jobpilot.ai
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer Overlay & Sidebar */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 w-72 max-w-xs bg-slate-900 shadow-2xl h-full">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
