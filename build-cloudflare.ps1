# Cloudflare Pages build script for DigiDocs
# This script ensures proper build order and dependencies

Write-Host "🚀 Starting Cloudflare build process..." -ForegroundColor Green

# Install dependencies from root (includes all workspace packages)
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
pnpm install --frozen-lockfile

# Build database package first
Write-Host "🗄️ Building database package..." -ForegroundColor Yellow
pnpm --filter @repo/database build

# Build UI package
Write-Host "🎨 Building UI package..." -ForegroundColor Yellow
pnpm --filter @repo/ui build

# Build web application
Write-Host "🌐 Building web application..." -ForegroundColor Yellow
pnpm --filter web build

# Adapt for Cloudflare Pages using OpenNext
Write-Host "⚡ Adapting for Cloudflare Pages..." -ForegroundColor Yellow
Set-Location apps/web
npx open-next@latest build --platform cloudflare

Write-Host "✅ Build completed successfully!" -ForegroundColor Green
Write-Host "📁 Output directory: apps/web/.open-next" -ForegroundColor Cyan
