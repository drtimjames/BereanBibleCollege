#!/usr/bin/env node
/**
 * Book Extraction Script
 * Parses existing HTML files and extracts book data into YAML files
 *
 * Usage: node scripts/extract-books.js
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const STORE_DIR = join(ROOT, 'store');
const OUTPUT_DIR = join(ROOT, 'src', 'content', 'books');

// Category mappings from HTML filenames to category slugs
const CATEGORY_MAP = {
  'missiology.html': 'missiology',
  'biblical-theology.html': 'biblical-theology',
  'systematic-theology.html': 'systematic-theology',
  'new-testament.html': 'new-testament',
  'ot.html': 'old-testament',
  'hermeneutics.html': 'hermeneutics',
  'church-history.html': 'church-history',
  'christian-living.html': 'christian-living',
  'apologetics.html': 'apologetics',
  'eschatology.html': 'eschatology',
  'family-women.html': 'family-women',
  'pastoral-ministry.html': 'pastoral-ministry',
  'reference-resources.html': 'reference-resources',
  'second-temple.html': 'second-temple',
};

// Extract ASIN from Amazon URL
function extractAsin(url) {
  if (!url) return null;
  const match = url.match(/\/dp\/([A-Z0-9]{10})/i) || url.match(/\/([A-Z0-9]{10})\?/i);
  return match ? match[1] : null;
}

// Create URL-safe slug from title and author
function createSlug(authorLast, title) {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
  const cleanAuthor = authorLast.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `${cleanAuthor}-${cleanTitle}`;
}

// Extract books from HTML content
function extractBooksFromHtml(html, filename) {
  const books = [];
  let currentAuthor = null;
  let currentAuthorBio = null;

  // Match author sections
  const authorSectionRegex = /<div class="author-section"[^>]*id="([^"]*)"[^>]*>[\s\S]*?<h2 class="author-name">([^<]+)<\/h2>([\s\S]*?)(?=<div class="author-section"|$)/gi;

  // Match individual book cards
  const bookCardRegex = /<div class="book-card">([\s\S]*?)<\/div>\s*<\/div>/g;

  let authorMatch;
  while ((authorMatch = authorSectionRegex.exec(html)) !== null) {
    const [, authorId, authorName, authorContent] = authorMatch;
    currentAuthor = authorName.trim();

    // Extract author bio if present
    const bioMatch = authorContent.match(/<p[^>]*style="[^"]*italic[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
    currentAuthorBio = bioMatch ? bioMatch[1].trim().replace(/<[^>]+>/g, '') : null;

    // Find all book cards within this author section
    let bookMatch;
    const tempBookRegex = /<div class="book-card">([\s\S]*?)<\/div>\s*<\/div>/g;

    while ((bookMatch = tempBookRegex.exec(authorContent)) !== null) {
      const bookHtml = bookMatch[1];

      // Extract book details
      const imgMatch = bookHtml.match(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"/i);
      const titleMatch = bookHtml.match(/<h3>([^<]+)<\/h3>/i);
      const subtitleMatch = bookHtml.match(/<p class="subtitle">([^<]*)<\/p>/i);

      // Extract Amazon links
      const links = {};
      const linkRegex = /<a[^>]*href="(https:\/\/www\.amazon\.com\/dp\/[^"]*)"[^>]*>([^<]*)<\/a>/gi;
      let linkMatch;
      while ((linkMatch = linkRegex.exec(bookHtml)) !== null) {
        const [, url, label] = linkMatch;
        const asin = extractAsin(url);
        const format = label.toLowerCase().trim();
        if (asin) {
          if (format.includes('hardback') || format.includes('hardcover')) {
            links.hardback = asin;
          } else if (format.includes('paperback')) {
            links.paperback = asin;
          } else if (format.includes('kindle')) {
            links.kindle = asin;
          } else if (format.includes('audible')) {
            links.audible = asin;
          }
        }
      }

      if (titleMatch) {
        const title = titleMatch[1].trim();
        const subtitle = subtitleMatch ? subtitleMatch[1].trim() : undefined;
        const coverPath = imgMatch ? imgMatch[1] : '';

        // Extract just the filename from the cover path
        const coverFile = coverPath.split('/').pop() || '';

        // Parse author name into parts
        const nameParts = currentAuthor.split(',');
        const lastName = nameParts[0]?.trim() || currentAuthor;
        const firstName = nameParts[1]?.trim() || '';

        books.push({
          title,
          subtitle: subtitle && !subtitle.includes('[') ? subtitle : undefined,
          author: {
            lastName,
            firstName,
            display: currentAuthor,
          },
          cover: coverFile,
          authorBio: currentAuthorBio,
          links: Object.keys(links).length > 0 ? links : undefined,
        });
      }
    }
  }

  return books;
}

// Convert book data to YAML format
function bookToYaml(book, index) {
  const lines = [];

  lines.push(`# ${book.author.display} - ${book.title}`);
  lines.push(`title: "${book.title.replace(/"/g, '\\"')}"`);

  if (book.subtitle) {
    lines.push(`subtitle: "${book.subtitle.replace(/"/g, '\\"')}"`);
  }

  lines.push('');
  lines.push('author:');
  lines.push(`  lastName: "${book.author.lastName}"`);
  if (book.author.firstName) {
    lines.push(`  firstName: "${book.author.firstName}"`);
  }
  lines.push(`  display: "${book.author.display}"`);

  lines.push('');
  lines.push(`cover: ${book.cover}`);

  if (book.authorBio) {
    lines.push('');
    lines.push('authorBio: >');
    // Wrap bio text at ~80 chars
    const words = book.authorBio.split(' ');
    let currentLine = '  ';
    for (const word of words) {
      if (currentLine.length + word.length > 80) {
        lines.push(currentLine.trimEnd());
        currentLine = '  ' + word + ' ';
      } else {
        currentLine += word + ' ';
      }
    }
    if (currentLine.trim()) {
      lines.push(currentLine.trimEnd());
    }
  }

  if (book.links) {
    lines.push('');
    lines.push('links:');
    if (book.links.hardback) lines.push(`  hardback: "${book.links.hardback}"`);
    if (book.links.paperback) lines.push(`  paperback: "${book.links.paperback}"`);
    if (book.links.kindle) lines.push(`  kindle: "${book.links.kindle}"`);
    if (book.links.audible) lines.push(`  audible: "${book.links.audible}"`);
  }

  lines.push('');
  lines.push(`sortOrder: ${index + 1}`);

  return lines.join('\n');
}

// Main extraction function
async function main() {
  console.log('Starting book extraction...\n');

  let totalBooks = 0;

  for (const [filename, categorySlug] of Object.entries(CATEGORY_MAP)) {
    const filePath = join(STORE_DIR, filename);

    if (!existsSync(filePath)) {
      console.log(`⚠️  Skipping ${filename} - file not found`);
      continue;
    }

    console.log(`📖 Processing ${filename}...`);

    const html = readFileSync(filePath, 'utf-8');
    const books = extractBooksFromHtml(html, filename);

    if (books.length === 0) {
      console.log(`   No books found in ${filename}`);
      continue;
    }

    // Create output directory
    const categoryDir = join(OUTPUT_DIR, categorySlug);
    if (!existsSync(categoryDir)) {
      mkdirSync(categoryDir, { recursive: true });
    }

    // Write each book to a YAML file
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      const slug = createSlug(book.author.lastName, book.title);
      const yamlPath = join(categoryDir, `${slug}.yaml`);

      // Skip if file already exists (don't overwrite)
      if (existsSync(yamlPath)) {
        console.log(`   ⏭️  Skipping ${slug}.yaml - already exists`);
        continue;
      }

      const yaml = bookToYaml(book, i);
      writeFileSync(yamlPath, yaml);
      console.log(`   ✅ Created ${slug}.yaml`);
    }

    console.log(`   Found ${books.length} books\n`);
    totalBooks += books.length;
  }

  console.log(`\n✨ Extraction complete! Total books: ${totalBooks}`);
  console.log('\nNext steps:');
  console.log('1. Review generated YAML files in src/content/books/');
  console.log('2. Copy cover images to src/assets/covers/');
  console.log('3. Run "npm run dev" to preview the site');
}

main().catch(console.error);
