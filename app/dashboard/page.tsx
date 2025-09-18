import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Users, Shield, Crown } from "lucide-react"
import Link from "next/link"

interface Guild {
  id: string
  name: string
  icon: string | null
  owner: boolean
  permissions: string
}

interface User {
  id: string
  username: string
  discriminator: string
  avatar: string | null
}

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("discord_session")

  if (!sessionCookie) {
    redirect("/auth/discord")
  }

  let sessionData
  try {
    sessionData = JSON.parse(sessionCookie.value)
  } catch {
    redirect("/auth/discord")
  }

  const { user, guilds }: { user: User; guilds: Guild[] } = sessionData

  // Filter guilds where user has admin permissions
  const adminGuilds = guilds.filter((guild) => guild.owner || (BigInt(guild.permissions) & BigInt(0x8)) === BigInt(0x8))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">XLZR Bot Dashboard</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {user.avatar ? (
                <img
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              )}
              <span className="text-sm font-medium">{user.username}</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/api/auth/logout">Logout</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user.username}!</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your Discord servers and configure XLZR Bot settings.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Servers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{guilds.length}</div>
              <p className="text-xs text-muted-foreground">Discord servers you're in</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admin Access</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminGuilds.length}</div>
              <p className="text-xs text-muted-foreground">Servers you can manage</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bot Status</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Online</div>
              <p className="text-xs text-muted-foreground">XLZR Bot is running</p>
            </CardContent>
          </Card>
        </div>

        {/* Server Management */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Servers</h3>
            {adminGuilds.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Manageable Servers</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                    You need administrator permissions to manage XLZR Bot settings.
                  </p>
                  <Button asChild>
                    <Link href="/invite">Add Bot to Server</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adminGuilds.map((guild) => (
                  <Card key={guild.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        {guild.icon ? (
                          <img
                            src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                            alt={guild.name}
                            className="w-12 h-12 rounded-full"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{guild.name.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">{guild.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            {guild.owner && (
                              <Badge variant="secondary" className="text-xs">
                                Owner
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              Admin
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" asChild>
                        <Link href={`/dashboard/${guild.id}`}>
                          <Settings className="w-4 h-4 mr-2" />
                          Manage Server
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
