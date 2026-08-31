import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobPilot AI - Intelligent Sri Lanka & Global Job Search Assistant",
  description: "AI-powered platform to scan Sri Lankan job portals, automate applications, and manage your career.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
