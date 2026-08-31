import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, name } = body;

    const userEmail = email && email.includes("@") ? email.toLowerCase().trim() : "candidate@gmail.com";
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
  } catch (error) {
    console.error("Google Auth API error:", error);
    return NextResponse.json(
      { success: false, error: "Google authentication failed." },
      { status: 500 }
    );
  }
}
