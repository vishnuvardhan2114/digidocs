# PowerShell build script for Cloudflare Pages
$ErrorActionPreference = "Stop"

Write-Host "Building database package..." -ForegroundColor Green
pnpm --filter @repo/database build

Write-Host "Building web application..." -ForegroundColor Green
pnpm --filter web build

Write-Host "Running Cloudflare adapter..." -ForegroundColor Green
Set-Location apps/web
npx @cloudflare/next-on-pages@latest --skip-build

Write-Host "Build complete! Output at apps/web/.vercel/output/static" -ForegroundColor Green

