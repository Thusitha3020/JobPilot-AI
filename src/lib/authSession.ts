export interface UserSession {
  id: string;
  email: string;
  name: string;
  image?: string;
  provider: "google" | "credentials" | "guest";
  isLoggedIn: boolean;
  loggedInAt?: string;
}

export const GUEST_SESSION: UserSession = {
  id: "guest-user",
  email: "candidate@jobpilot.lk",
  name: "JobPilot Candidate",
  image: "",
  provider: "guest",
  isLoggedIn: false,
};

const SESSION_STORAGE_KEY = "jobpilot_active_auth_session_v1";

/**
 * Gets active session from browser local storage or returns GUEST_SESSION if unauthenticated.
 */
export function getStoredSession(): UserSession {
  if (typeof window === "undefined") return GUEST_SESSION;

  try {
    const data = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!data) return GUEST_SESSION;
    const session = JSON.parse(data) as UserSession;
    return session && session.isLoggedIn ? session : GUEST_SESSION;
  } catch {
    return GUEST_SESSION;
  }
}

/**
 * Saves active session to local storage.
 */
export function saveStoredSession(session: UserSession): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (err) {
    console.error("Failed to save session:", err);
  }
}

/**
 * Clears current session and returns guest session.
 */
export function signOutSession(): UserSession {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (err) {
      console.error("Failed to clear session:", err);
    }
  }
  return GUEST_SESSION;
}

/**
 * Generates a namespaced local storage key isolated strictly to the user's Gmail address.
 */
export function getUserNamespacedKey(email: string, keySuffix: string): string {
  const cleanEmail = (email || "guest").toLowerCase().replace(/[^a-z0-9]/g, "_");
  return `jobpilot_user_${cleanEmail}_${keySuffix}`;
}

/**
 * Gets namespaced profile for a specific Gmail address.
 */
export function getUserNamespacedData<T>(email: string, keySuffix: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const namespacedKey = getUserNamespacedKey(email, keySuffix);
    const item = localStorage.getItem(namespacedKey);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Saves namespaced profile for a specific Gmail address.
 */
export function saveUserNamespacedData<T>(email: string, keySuffix: string, data: T): void {
  if (typeof window === "undefined") return;

  try {
    const namespacedKey = getUserNamespacedKey(email, keySuffix);
    localStorage.setItem(namespacedKey, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save user namespaced data:", err);
  }
}
