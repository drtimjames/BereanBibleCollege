import { defineCollection, z } from 'astro:content';

// Book schema for YAML files
const booksCollection = defineCollection({
  type: 'data',
  schema: z.object({
    // Required fields
    title: z.string(),
    author: z.object({
      lastName: z.string(),
      firstName: z.string().optional(),
      display: z.string(), // e.g., "Allen, R." or "Dr. Tim James"
    }),
    cover: z.string(), // Filename in src/assets/covers/

    // Optional fields
    subtitle: z.string().optional(),
    description: z.string().optional(),
    authorBio: z.string().optional(),
    tocPdf: z.string().optional(),

    // Amazon links - just ASINs, affiliate tag added at build
    links: z.object({
      hardback: z.string().optional(),
      paperback: z.string().optional(),
      kindle: z.string().optional(),
      audible: z.string().optional(),
    }).optional(),

    // Free download
    freePdf: z.string().optional(),

    // Metadata
    isTextbook: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
    isComingSoon: z.boolean().default(false),
    sortOrder: z.number().optional(),

    // Series support
    series: z.string().optional(),
    volumeNumber: z.number().optional(),
  }),
});

// Category metadata
const categoriesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    sortOrder: z.number().default(0),
    prevCategory: z.object({
      slug: z.string(),
      name: z.string(),
    }).optional(),
    nextCategory: z.object({
      slug: z.string(),
      name: z.string(),
    }).optional(),
  }),
});

export const collections = {
  books: booksCollection,
  categories: categoriesCollection,
};
