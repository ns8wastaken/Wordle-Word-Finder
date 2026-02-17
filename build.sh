#!/usr/bin/env bash
set -e

echo "Cleaning build directory..."
rm -r build
mkdir -p build/js
mkdir -p build/assets/wordlists

echo "Generating word lists..."
./scripts/build_wordlists.sh

echo "Compiling TypeScript..."
tsc

echo "Copying static files..."
cp src/index.html build/
cp src/styles.css build/
cp -r src/assets build/

echo "Build complete."
