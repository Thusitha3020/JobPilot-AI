"use client";

import React, { useState } from "react";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { NavItemId } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface TopNavProps {
  onOpenMobileSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onSelectTab?: (tab: NavItemId) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  onOpenMobileSidebar,
  searchQuery,
  onSearchChange,
  isDarkMode,
  onToggleTheme,
  onSelectTab,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const notifications = [
    {
      id: 1,
      title: "New 96% Match Found!",
      time: "10m ago",
      read: false,
      type: "match",
    },
    {
      id: 2,
      title: "Interview Request: Vercel Partner Labs",
      time: "1h ago",
      read: false,
      type: "interview",
    },
    {
      id: 3,
      title: "CV Optimization Complete",
      time: "3h ago",
      read: true,
      type: "cv",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 px-4 md:px-8 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between transition-colors">
      {/* Left: Mobile Menu Toggle & Search Bar */}
      <div className="flex items-center space-x-4 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search jobs, skills, companies, or locations... (Ctrl + K)"
            className="w-full pl-9 pr-12 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          <div className="hidden sm:flex absolute inset-y-0 right-0 pr-3 items-center pointer-events-none">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Actions: Theme Toggle, Notifications, Profile */}
      <div className="flex items-center space-x-3 ml-4">
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl bg-slate-800/60 border border-slate-750 text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
        </button>

        {/* Notifications Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-xl bg-slate-800/60 border border-slate-750 text-slate-300 hover:text-white hover:bg-slate-800 transition-all relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-slate-900" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <h3 className="font-semibold text-sm text-slate-200">
                  Notifications
                </h3>
                <span className="text-xs text-blue-400 font-medium">
                  {unreadCount} unread
                </span>
              </div>
              <div className="space-y-2.5">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 transition-colors flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <div className="flex-1 text-left">
                      <p className="text-xs font-medium text-slate-200">
                        {n.title}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Pill & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-2.5 p-1.5 pl-2.5 pr-3 rounded-xl bg-slate-800/60 border border-slate-750 hover:bg-slate-800 transition-all cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white">
              AM
            </div>
            <span className="hidden md:inline text-xs font-semibold text-slate-200">
              Alex Morgan
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="p-3 border-b border-slate-800">
                <p className="text-sm font-semibold text-slate-200">
                  Alex Morgan
                </p>
                <p className="text-xs text-slate-400">Senior Full-Stack Pilot</p>
              </div>
              <div className="py-1 text-xs text-slate-300">
                <button
                  onClick={() => {
                    onSelectTab?.("profile");
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Profile Settings
                </button>
                <button
                  onClick={() => {
                    onSelectTab?.("automation");
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  AI Preference Rules
                </button>
                <button
                  onClick={() => {
                    onSelectTab?.("settings");
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-slate-100 transition-colors cursor-pointer"
                >
                  Account Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
