#!/usr/bin/env bash
set -e

echo "Building..."
./build.sh

echo "Deploying to gh-pages..."
# use a temporary worktree for gh-pages
git worktree add .deploy gh-pages 2>/dev/null || true

# remove old files
rm -r .deploy/*

# copy new build files
cp -r build/* .deploy/

# commit and push
cd .deploy
git add .
git commit -m "Deploy site"
git push origin gh-pages
cd ..

# remove worktree
rm -r .deploy

git worktree prune
