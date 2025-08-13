#!/bin/bash

# Table 1837 Nuclear Deployment Script
# Deploy to multiple platforms simultaneously

set -e

echo "🚀 INITIATING NUCLEAR DEPLOYMENT"
echo "=================================="

# Clean build
echo "🧹 Cleaning previous builds..."
rm -rf .next node_modules package-lock.json

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
export NETLIFY_AUTH_TOKEN="lhFAafT6hgnkLpCdhOQ49VlE"
npx netlify deploy --prod --dir=.next --site=table1837tavern --message="Nuclear deployment $(date)"

# Deploy to Vercel (backup)
echo "⚡ Deploying to Vercel..."
npx vercel --prod --yes --token=$VERCEL_TOKEN || echo "Vercel deployment failed, continuing..."

# Create static export for additional platforms
echo "📤 Creating static export..."
npm run export || echo "Static export failed, app router doesn't support export"

echo "✅ DEPLOYMENT COMPLETE"
echo "======================"
echo "🌐 Netlify: https://table1837tavern.netlify.app"
echo "⚡ Vercel: https://table1837-barmanagement-system.vercel.app"
echo "🎯 Custom Domain: https://table1837tavern.bar (pending DNS)"

echo "🔧 Next steps:"
echo "1. Update DNS records for table1837tavern.bar"
echo "2. Configure SSL certificates"
echo "3. Set up monitoring"