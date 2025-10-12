#!/bin/bash

# Cloudflare Pages build script for DigiDocs
# This script ensures proper build order and dependencies

set -e

echo "🚀 Starting Cloudflare build process..."

# Install dependencies from root (includes all workspace packages)
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Build database package first
echo "🗄️ Building database package..."
pnpm --filter @repo/database build

# Build UI package
echo "🎨 Building UI package..."
pnpm --filter @repo/ui build

# Build web application
echo "🌐 Building web application..."
cd apps/web
pnpm run build

# Adapt for Cloudflare Pages
echo "⚡ Adapting for Cloudflare Pages..."
npx @cloudflare/next-on-pages

echo "✅ Build completed successfully!"
echo "📁 Output directory: .vercel/output/static"
