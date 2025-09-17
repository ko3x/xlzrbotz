import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, ArrowLeft, Shield, CheckCircle } from "lucide-react"

export default function InvitePage() {
  const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&permissions=8&scope=bot%20applications.commands`

  const permissions = [
    "Manage Roles",
    "Manage Channels",
    "Send Messages",
    "Embed Links",
    "Read Message History",
    "Use Slash Commands",
    "Manage Messages",
    "Add Reactions",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Main Card */}
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Add XLZR Bot to Your Server</CardTitle>
              <CardDescription>Grant the necessary permissions to unlock all features</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Permissions List */}
              <div>
                <h3 className="font-semibold mb-3">Required Permissions:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {permissions.map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Preview */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2">What you'll get:</h4>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• Roblox verification system</li>
                  <li>• Advanced moderation tools</li>
                  <li>• Leveling and leaderboards</li>
                  <li>• Custom embed builder</li>
                  <li>• Welcome/goodbye messages</li>
                  <li>• Web dashboard access</li>
                </ul>
              </div>

              {/* Invite Button */}
              <div className="text-center">
                <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Add to Discord Server
                  </Button>
                </a>
                <p className="text-xs text-gray-500 mt-2">You'll be redirected to Discord to select your server</p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">After Adding the Bot</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/help</code> to see all available
                  commands
                </li>
                <li>
                  Configure settings through the{" "}
                  <Link href="/auth/discord" className="text-blue-600 hover:underline">
                    web dashboard
                  </Link>
                </li>
                <li>
                  Set up Roblox verification with{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/verify</code>
                </li>
                <li>Customize welcome messages and auto-roles</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
