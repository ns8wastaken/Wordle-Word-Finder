#!/bin/bash
# Exit on errors
set -e

# Ensure we’re on master
current_branch=$(git branch --show-current)
if [ "$current_branch" != "master" ]; then
    echo "Please switch to 'master' before deploying."
    exit 1
fi

# Build project
echo "Building project..."
tsc --outDir build/js
cp src/index.html build/
cp src/styles.css build/

# Check if gh-pages exists
if ! git show-ref --quiet refs/heads/gh-pages && ! git ls-remote --exit-code origin gh-pages; then
    echo "gh-pages branch does not exist on this repo. Skipping deploy."
    exit 0
fi

# Switch to gh-pages
git checkout gh-pages
git rm -rf *
cp -r build/* .

git add .
git commit -m "Deploy updated site"
git push origin gh-pages

# Return to master
git checkout master
echo "Deployment complete!"
