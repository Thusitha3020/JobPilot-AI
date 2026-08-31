import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, pathname } = new URL(request.url);

  // Return provider & session configuration for Google / Gmail Auth
  return NextResponse.json({
    appName: "JobPilot AI",
    providers: [
      {
        id: "google",
        name: "Google / Gmail",
        type: "oauth",
        authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
        configured: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
      },
      {
        id: "credentials",
        name: "Email / Gmail Direct",
        type: "credentials",
        configured: true,
      },
    ],
    status: "active",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { action, email, name, password, googleToken } = body;

    if (action === "google_signin" || googleToken) {
      const userEmail = email || "user.google@gmail.com";
      const userName = name || userEmail.split("@")[0];

      return NextResponse.json({
        success: true,
        session: {
          id: `google-${Date.now()}`,
          email: userEmail,
          name: userName,
          image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`,
          provider: "google",
          isLoggedIn: true,
          loggedInAt: new Date().toISOString(),
        },
      });
    }

    if (action === "credentials_signin") {
      if (!email || !email.includes("@")) {
        return NextResponse.json(
          { success: false, error: "Please enter a valid Gmail / Email address." },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        session: {
          id: `user-${Date.now()}`,
          email: email.toLowerCase().trim(),
          name: name || email.split("@")[0],
          image: "",
          provider: "credentials",
          isLoggedIn: true,
          loggedInAt: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Auth API active.",
    });
  } catch (error) {
    console.error("Auth API error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed." },
      { status: 500 }
    );
  }
}
