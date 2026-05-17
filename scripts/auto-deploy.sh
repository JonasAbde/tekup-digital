#!/bin/bash
# Auto-deploy script for tekup-digital landing page
# Checks for new commits on main, builds and deploys if needed
set -e

REPO="$HOME/tekup-digital"
LOG="$HOME/.hermes/cron/output/tekup-deploy.log"

cd "$REPO"

# Fetch latest from origin
git fetch origin main 2>&1 >> "$LOG"

# Check if we're behind
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
  # No changes - quiet exit (empty stdout = silent for no_agent)
  exit 0
fi

# Changes detected - deploy
echo "[$(date '+%Y-%m-%d %H:%M')] New commit detected: $REMOTE" >> "$LOG"
git merge origin/main 2>&1 >> "$LOG"

# Build
npm run build 2>&1 >> "$LOG"
BUILD_EXIT=$?

if [ $BUILD_EXIT -ne 0 ]; then
  echo "[$(date '+%Y-%m-%d %H:%M')] ❌ Build failed" >> "$LOG"
  echo "❌ Build failed for tekup-digital — se $LOG"
  exit 1
fi

# Deploy
npx wrangler pages deploy out --project-name=tekup-digital 2>&1 >> "$LOG"
DEPLOY_EXIT=$?

if [ $DEPLOY_EXIT -eq 0 ]; then
  echo "[$(date '+%Y-%m-%d %H:%M')] ✅ Deployed successfully" >> "$LOG"
  echo "✅ Tekup landing page auto-deployed — $(git log --oneline -1)"
else
  echo "[$(date '+%Y-%m-%d %H:%M')] ❌ Deploy failed" >> "$LOG"
  echo "❌ Deploy failed for tekup-digital"
fi
