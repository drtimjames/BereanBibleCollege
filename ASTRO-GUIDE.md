# Berean Bible College - New Build System Guide

Hi Dad! Jeff set up a new system to make the bookstore easier to maintain. **Your website looks exactly the same** - we just organized the code better so it's easier to add books and the images load faster.

---

## What Changed (And What Didn't)

### Nothing visible changed
- The website looks identical
- All your pages are still there
- All your hard work is preserved

### What's better now
- **Images load 10x faster** - they're automatically compressed
- **Adding books is simpler** - just fill in a small text file
- **No more copy-pasting HTML** - Claude can add books without touching HTML
- **Smaller file sizes** - easier to commit to GitHub

---

## How to Add a New Book

Instead of copying HTML blocks, you now describe books in simple text files.

### Example: Adding a book to Missiology

**Step 1:** Tell Claude something like:

> "Add this book to missiology: [paste Amazon link]"

**Step 2:** Claude will create a file like this:

```yaml
# src/content/books/missiology/smith-new-book.yaml

title: "The New Book Title"
subtitle: "A great subtitle here"

author:
  lastName: Smith
  firstName: John
  display: "Smith, John"

cover: smith-j-new-book.jpg

links:
  paperback: "0801031850"    # Just the ASIN from Amazon
  kindle: "B004D39PEM"
```

**Step 3:** Claude saves the cover image, and you're done!

The website automatically:
- Compresses the image (5MB → 50KB)
- Adds the affiliate tag to Amazon links
- Puts the book in the right category
- Sorts it alphabetically by author

---

## Quick Reference

### To preview the site locally:
```
npm run dev
```
Then open: http://localhost:4321

### To build for production:
```
npm run build
```

### To see the built site:
```
npm run preview
```

---

## Where Things Live Now

| What | Location |
|------|----------|
| Book data | `src/content/books/[category]/` |
| Book covers | `src/assets/covers/` |
| Page templates | `src/pages/` |
| Styles | `src/styles/global.css` |
| Static pages (bible, eden, etc.) | `public/` |

---

## The Book Categories

Each category has its own folder:

- `missiology/`
- `biblical-theology/`
- `systematic-theology/`
- `new-testament/`
- `old-testament/`
- `hermeneutics/`
- `church-history/`
- `christian-living/`
- `apologetics/`
- `eschatology/`
- `family-women/`
- `pastoral-ministry/`
- `reference-resources/`
- `second-temple/`
- `children/`

---

## Book File Format (YAML)

Here's what each field means:

```yaml
title: "Book Title"              # Required
subtitle: "Book Subtitle"        # Optional

author:
  lastName: Smith                # For sorting
  firstName: John                # Optional
  display: "Smith, John"         # How it appears on the page

cover: filename.jpg              # Image filename (in src/assets/covers/)
tocPdf: filename-toc.pdf         # Optional - Table of Contents PDF

links:
  hardback: "ASIN123456"         # Optional
  paperback: "ASIN123456"        # Optional
  kindle: "ASIN123456"           # Optional
  audible: "ASIN123456"          # Optional

# Optional extras
authorBio: "Biography text..."   # Shows above author's books
isTextbook: false                # Mark as textbook
isFeatured: false                # Feature on main page
sortOrder: 1                     # Manual ordering within author
```

---

## Tips for Working with Claude

When adding books, you can say things like:

- "Add this book to missiology: [Amazon link]"
- "Here's a new systematic theology book by Grudem"
- "Add these 5 books to the reference section"
- "Update the subtitle for [book title]"
- "Move this book from hermeneutics to biblical-theology"

Claude will:
1. Create the YAML file
2. Download and save the cover image
3. Extract the ASIN from Amazon links
4. Commit the changes

---

## Your Old Pages Still Work

All your original HTML pages are preserved:

- `/store/narthex.html` - Your featured author page
- `/store/inner-sanctum-bookstore.html` - Original main bookstore
- `/store/missiology.html` - Original category pages
- `/bible/`, `/eden/`, `/news/` - All unchanged

The new system runs alongside them. When you're ready, we can update links to use the new optimized pages.

---

## Questions?

Just ask Claude! You can say:

- "How do I add a new book?"
- "Show me an example book file"
- "What categories are available?"
- "How do I run the local preview?"

---

*This guide was created for the Astro migration - November 2025*
