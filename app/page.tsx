import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, MessageSquare, Trophy, Settings, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">XLZR Bot</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/auth/discord">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/invite">
              <Button>Add to Server</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            Multifunctional Discord Bot
          </Badge>
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 text-balance">
            Supercharge Your Discord Server
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-pretty">
            XLZR Bot provides comprehensive server management with Roblox verification, moderation tools, leveling
            system, and an intuitive web dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/invite">
              <Button size="lg" className="w-full sm:w-auto">
                <Users className="w-5 h-5 mr-2" />
                Add to Server
              </Button>
            </Link>
            <Link href="/auth/discord">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                <Settings className="w-5 h-5 mr-2" />
                Open Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Powerful Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Roblox Verification</CardTitle>
                <CardDescription>
                  Automatic role assignment based on Roblox group membership and rank verification
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Advanced Moderation</CardTitle>
                <CardDescription>
                  Warning system, auto-moderation, and comprehensive logging for server safety
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Trophy className="w-8 h-8 text-yellow-600 mb-2" />
                <CardTitle>Leveling System</CardTitle>
                <CardDescription>
                  XP tracking, leaderboards, and role rewards to keep your community engaged
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Settings className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle>Web Dashboard</CardTitle>
                <CardDescription>
                  Easy-to-use web interface for configuring all bot settings and features
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle>Custom Embeds</CardTitle>
                <CardDescription>Create beautiful embedded messages with templates and custom styling</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-8 h-8 text-indigo-600 mb-2" />
                <CardTitle>Welcome System</CardTitle>
                <CardDescription>Customizable welcome and goodbye messages to greet new members</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Get Started?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of Discord servers already using XLZR Bot to enhance their community experience.
          </p>
          <Link href="/invite">
            <Button size="lg">Add XLZR Bot Now</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 XLZR Bot. Built with ❤️ for Discord communities.</p>
        </div>
      </footer>
    </div>
  )
}
