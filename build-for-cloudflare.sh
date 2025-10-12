#!/bin/bash
set -e

echo "Building database package..."
pnpm --filter @repo/database build

echo "Building web application..."
pnpm --filter web build

echo "Running Cloudflare adapter..."
cd apps/web
npx @cloudflare/next-on-pages@latest --skip-build

echo "Build complete! Output at apps/web/.vercel/output/static"

