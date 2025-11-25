#!/usr/bin/env node
/**
 * Image Migration Script
 * Copies cover images from store/*-covers-csv/ to src/assets/covers/
 * Also creates a list of missing images
 *
 * Usage: node scripts/migrate-images.js
 */

import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const STORE_DIR = join(ROOT, 'store');
const OUTPUT_DIR = join(ROOT, 'src', 'assets', 'covers');
const BOOKS_DIR = join(ROOT, 'src', 'content', 'books');

// Find all cover images in store directory
function findAllCovers() {
  const covers = new Map();

  function scanDir(dir) {
    if (!existsSync(dir)) return;

    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory() && entry.includes('covers')) {
        // Scan covers directory
        const imageFiles = readdirSync(fullPath);
        for (const img of imageFiles) {
          if (/\.(jpg|jpeg|png|gif|webp)$/i.test(img)) {
            covers.set(img.toLowerCase(), join(fullPath, img));
          }
        }
      } else if (stat.isDirectory()) {
        scanDir(fullPath);
      }
    }
  }

  scanDir(STORE_DIR);
  return covers;
}

// Get all cover references from YAML files
function getCoverReferences() {
  const refs = new Set();

  function scanYamlDir(dir) {
    if (!existsSync(dir)) return;

    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        scanYamlDir(fullPath);
      } else if (entry.endsWith('.yaml') || entry.endsWith('.yml')) {
        const content = readFileSync(fullPath, 'utf-8');
        const coverMatch = content.match(/^cover:\s*(.+)$/m);
        if (coverMatch) {
          refs.add(coverMatch[1].trim());
        }
      }
    }
  }

  scanYamlDir(BOOKS_DIR);
  return refs;
}

// Main migration function
async function main() {
  console.log('Starting image migration...\n');

  // Create output directory
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created ${OUTPUT_DIR}\n`);
  }

  // Find all source covers
  const sourcCovers = findAllCovers();
  console.log(`Found ${sourcCovers.size} cover images in store/\n`);

  // Get referenced covers
  const referencedCovers = getCoverReferences();
  console.log(`Found ${referencedCovers.size} cover references in YAML files\n`);

  let copied = 0;
  let missing = [];
  let skipped = 0;

  // Copy referenced covers
  for (const coverName of referencedCovers) {
    const destPath = join(OUTPUT_DIR, coverName);

    if (existsSync(destPath)) {
      skipped++;
      continue;
    }

    // Try to find the source file (case-insensitive)
    const sourcePath = sourcCovers.get(coverName.toLowerCase());

    if (sourcePath) {
      copyFileSync(sourcePath, destPath);
      console.log(`✅ Copied: ${coverName}`);
      copied++;
    } else {
      missing.push(coverName);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Copied: ${copied}`);
  console.log(`   Skipped (already exist): ${skipped}`);
  console.log(`   Missing: ${missing.length}`);

  if (missing.length > 0) {
    console.log(`\n⚠️  Missing images:`);
    for (const img of missing) {
      console.log(`   - ${img}`);
    }

    // Save missing list to file
    writeFileSync(
      join(ROOT, 'missing-covers.txt'),
      missing.join('\n')
    );
    console.log(`\n   (List saved to missing-covers.txt)`);
  }

  console.log('\n✨ Image migration complete!');
}

main().catch(console.error);
