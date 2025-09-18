import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ error: "Authorization code is required" }, { status: 400 })
    }

    // Exchange code for access token
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI!,
      }),
    })

    if (!tokenResponse.ok) {
      return NextResponse.json({ error: "Failed to exchange code for token" }, { status: 400 })
    }

    const tokenData = await tokenResponse.json()

    // Get user information
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch user data" }, { status: 400 })
    }

    const userData = await userResponse.json()

    // Get user guilds
    const guildsResponse = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const guildsData = guildsResponse.ok ? await guildsResponse.json() : []

    // Create session (simplified - in production use proper session management)
    const response = NextResponse.json({
      success: true,
      user: userData,
      guilds: guildsData,
    })

    // Set session cookie
    response.cookies.set(
      "discord_session",
      JSON.stringify({
        user: userData,
        guilds: guildsData,
        accessToken: tokenData.access_token,
        expiresAt: Date.now() + tokenData.expires_in * 1000,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: tokenData.expires_in,
      },
    )

    return response
  } catch (error) {
    console.error("Discord auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
