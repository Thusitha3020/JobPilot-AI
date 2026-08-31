import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/common/header";

export const metadata: Metadata = {
  title: "JobPilot AI - Intelligent Career & Job Search Assistant",
  description: "AI-powered platform to automate, manage, and optimize your job application workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
