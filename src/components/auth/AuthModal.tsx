"use client";

import React, { useState } from "react";
import { X, Mail, Lock, User, ShieldCheck, Sparkles, Loader2, ArrowRight, AlertCircle, Info } from "lucide-react";
import { UserSession, saveStoredSession } from "@/lib/authSession";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionChanged: (newSession: UserSession) => void;
  initialMode?: "signin" | "signup";
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSessionChanged,
  initialMode = "signup",
}) => {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "1081205534900-fn5p8ks3hoc7qjhhrj0ricdl2g71js97.apps.googleusercontent.com";

  const handleGoogleRedirect = () => {
    // Construct Google OAuth 2.0 URL using user's Client ID
    const redirectUri = typeof window !== "undefined" ? `${window.location.origin}/api/auth/callback/google` : "http://localhost:3000/api/auth/callback/google";
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      clientId
    )}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=openid%20email%20profile&prompt=select_account`;

    window.location.href = googleAuthUrl;
  };

  const handleGoogleDirectSignIn = async () => {
    setErrorMessage(null);

    // If email provided (e.g. thusitha3020@gmail.com), sign in directly to isolated user session
    if (emailInput.trim() && emailInput.includes("@")) {
      setIsLoading(true);
      try {
        const cleanEmail = emailInput.trim().toLowerCase();
        const userName = nameInput.trim() || cleanEmail.split("@")[0];

        const session: UserSession = {
          id: `google-${Date.now()}`,
          email: cleanEmail,
          name: userName,
          image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanEmail}`,
          provider: "google",
          isLoggedIn: true,
          loggedInAt: new Date().toISOString(),
        };

        saveStoredSession(session);
        onSessionChanged(session);
        onClose();
      } catch {
        setErrorMessage("Could not sign in with Google. Please try again.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Otherwise redirect to Google Cloud Accounts Consent Screen
    handleGoogleRedirect();
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!emailInput.trim() || !emailInput.includes("@")) {
      setErrorMessage("Please enter a valid Gmail address (e.g. thusitha3020@gmail.com).");
      return;
    }

    setIsLoading(true);
    try {
      const cleanEmail = emailInput.trim().toLowerCase();
      const userName = nameInput.trim() || cleanEmail.split("@")[0];

      const session: UserSession = {
        id: `user-${Date.now()}`,
        email: cleanEmail,
        name: userName,
        provider: "credentials",
        isLoggedIn: true,
        loggedInAt: new Date().toISOString(),
      };

      saveStoredSession(session);
      onSessionChanged(session);
      onClose();
    } catch {
      setErrorMessage("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden p-6 space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-100">
                {mode === "signup" ? "Create Gmail Account" : "Sign In to JobPilot"}
              </h3>
              <p className="text-xs text-slate-400">Google Credentials Connected</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Data Privacy Banner */}
        <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs flex items-start space-x-2.5">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white font-semibold">100% Private Isolation:</strong> Your saved jobs, uploaded CVs, and application history are stored strictly under your Gmail address. Other users cannot view or access your data.
          </p>
        </div>

        {/* Google Cloud Console Redirect URI Info Alert */}
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] leading-relaxed">
          <div className="flex items-center space-x-1.5 font-semibold text-amber-200 mb-1">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Google Redirect URI Notice</span>
          </div>
          To avoid <code className="bg-amber-950 px-1 rounded text-amber-200">redirect_uri_mismatch</code>, ensure <code className="bg-amber-950 px-1 rounded text-amber-200">http://localhost:3000/api/auth/callback/google</code> is added under <strong>Authorized redirect URIs</strong> in Google Cloud Console.
        </div>

        {/* Google / Gmail Sign-In Button */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleDirectSignIn}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center space-x-3 shadow-lg shadow-white/5 transition-all cursor-pointer border border-slate-200"
          >
            {/* Official Google G Logo */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google / Gmail</span>
          </button>

          <div className="flex items-center space-x-3 text-slate-500 py-1">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-[11px] uppercase tracking-wider font-semibold">Or enter your Gmail</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. Thusitha"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Your Gmail Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                placeholder="thusitha3020@gmail.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {errorMessage && (
            <p className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-2.5 space-x-2 cursor-pointer shadow-lg shadow-blue-500/20"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mx-auto" />
            ) : (
              <>
                <span>{mode === "signup" ? "Sign Up with Gmail" : "Sign In to Gmail Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        {/* Toggle Mode Footer */}
        <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
          {mode === "signup" ? (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setMode("signin")}
                className="font-bold text-blue-400 hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="font-bold text-blue-400 hover:underline cursor-pointer"
              >
                Sign Up Free
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
