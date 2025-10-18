"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, useThemeStore, useCounterStore } from "@/lib/store";
import { signOut } from "@/lib/auth/actions";
import { Button } from "@ui/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/components/ui/card";
import { Badge } from "@ui/components/ui/badge";
import { Separator } from "@ui/components/ui/separator";
import { LogOut, Sun, Moon, Monitor, Plus, Minus, RotateCcw } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, clearUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const { count, increment, decrement, reset } = useCounterStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      clearUser();
      router.push("/sign-in");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, {user?.name || user?.email}
              </p>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Auth Store Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">Auth Store</Badge>
                Authentication State
              </CardTitle>
              <CardDescription>
                Current user authentication information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">User ID:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">{user?.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Name:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</p>
                <Badge variant={isAuthenticated ? "default" : "destructive"}>
                  {isAuthenticated ? "Authenticated" : "Not Authenticated"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Theme Store Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">Theme Store</Badge>
                Theme Management
              </CardTitle>
              <CardDescription>
                Control the application theme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Theme:</p>
                <Badge variant="outline" className="capitalize">{theme}</Badge>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme Options:</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={theme === "light" ? "default" : "outline"}
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-4 w-4 mr-1" />
                    Light
                  </Button>
                  <Button
                    size="sm"
                    variant={theme === "dark" ? "default" : "outline"}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-4 w-4 mr-1" />
                    Dark
                  </Button>
                  <Button
                    size="sm"
                    variant={theme === "system" ? "default" : "outline"}
                    onClick={() => setTheme("system")}
                  >
                    <Monitor className="h-4 w-4 mr-1" />
                    System
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Counter Store Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">Counter Store</Badge>
                Counter Demo
              </CardTitle>
              <CardDescription>
                Simple counter with Zustand state management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900 dark:text-white">{count}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Count</p>
              </div>
              <Separator />
              <div className="flex gap-2 justify-center">
                <Button size="sm" onClick={decrement} variant="outline">
                  <Minus className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={reset} variant="outline">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={increment} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Store Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Zustand Store Information</CardTitle>
            <CardDescription>
              This dashboard demonstrates three different Zustand stores with different persistence strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-green-600 dark:text-green-400">Auth Store</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Persisted to localStorage. Manages user authentication state and syncs with Better Auth.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400">Theme Store</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Persisted to localStorage. Manages theme preferences and applies them to the document.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-purple-600 dark:text-purple-400">Counter Store</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  No persistence. Simple demonstration of basic Zustand state management.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
