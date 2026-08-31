"use client";

import React, { useState, useEffect } from "react";
import { Clock, Calendar } from "lucide-react";

export const RealTimeClock: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [timeString, setTimeString] = useState<string>("");
  const [dateString, setDateString] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setDateString(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeString) return null;

  return (
    <div
      className={`hidden lg:flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-750 text-xs text-slate-300 font-mono shadow-inner ${className}`}
      title="Live Server & Local Time"
    >
      <div className="flex items-center space-x-1.5 text-blue-400 font-semibold">
        <Clock className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
        <span>{timeString}</span>
      </div>
      <span className="text-slate-600">|</span>
      <div className="flex items-center space-x-1 text-slate-400 font-sans text-[11px]">
        <Calendar className="w-3 h-3 text-slate-400" />
        <span>{dateString}</span>
      </div>
    </div>
  );
};
