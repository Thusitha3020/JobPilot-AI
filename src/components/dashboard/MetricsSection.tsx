"use client";

import React from "react";
import {
  Briefcase,
  Sparkles,
  Send,
  Calendar,
  Award,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { MetricCardData } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface MetricsSectionProps {
  metrics: MetricCardData[];
}

const getMetricIcon = (iconName: string) => {
  switch (iconName) {
    case "Briefcase":
      return <Briefcase className="w-5 h-5 text-blue-400" />;
    case "Sparkles":
      return <Sparkles className="w-5 h-5 text-indigo-400" />;
    case "Send":
      return <Send className="w-5 h-5 text-purple-400" />;
    case "Calendar":
      return <Calendar className="w-5 h-5 text-amber-400" />;
    case "Award":
      return <Award className="w-5 h-5 text-emerald-400" />;
    default:
      return <Briefcase className="w-5 h-5 text-blue-400" />;
  }
};

export const MetricsSection: React.FC<MetricsSectionProps> = ({ metrics }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {metrics.map((card) => (
        <div
          key={card.id}
          className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700/80 shadow-lg hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
                {card.title}
              </span>
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-750 group-hover:scale-105 transition-transform">
                {getMetricIcon(card.iconName)}
              </div>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-slate-100 tracking-tight">
                {card.value}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
            <span
              className={cn(
                "inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full",
                card.changeType === "positive"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-800 text-slate-300 border border-slate-700"
              )}
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              {card.change}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
};
