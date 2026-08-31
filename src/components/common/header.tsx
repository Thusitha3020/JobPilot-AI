import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            JobPilot AI
          </span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            Documentation
          </Button>
          <Button variant="primary" size="sm">
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
};
