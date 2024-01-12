import { z } from "astro/zod";

export const generalSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  cover: z.string(),
  externalLink: z.string().optional(),
  order: z.number().optional(),
});

export const projectSchema = z.object({
  title: z.string(),
  tech: z.array(z.string()),
  cover: z.string(),
  order: z.number().optional(),
});

export const travelSchema = z.object({
  title: z.string(),
  greetings: z.array(z.string()),
  cover: z.string(),
  isExpandable: z.boolean().optional(),
  order: z.number().optional(),
});

export const notesSchema = z.object({
  title: z.string(),
  publishedAt: z.date(),
  cover: z.string(),
  isPreview: z.boolean().optional(),
  order: z.number().optional(),
});

export const osConfigSchema = z.object({
  page: z.object({
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().optional(),
    faviconPath: z.string().optional().default("/favicon.svg"),
    faviconType: z.string().optional().default("image/svg+xml"),
  }),
  user: z.object({
    background: z
      .object({
        creditProfileUrl: z.string(),
        creditName: z.string(),
      })
      .optional(),
    avatar: z.string(),
    name: z.string(),
    description: z.string(),
    socials: z
      .object({
        twitter: z.string().optional(),
        github: z.string().optional(),
        linkedin: z.string().optional(),
      })
      .optional(),
    coords: z
      .object({ lat: z.number(), lng: z.number(), name: z.string() })
      .optional(),
  }),
  customCSS: z.string().array(),
  travel: z
    .object({
      wishlist: z.array(z.object({ name: z.string(), isChecked: z.boolean() })),
      isWishlistEnabled: z.boolean().default(true),
    })
    .optional(),
  isTravelEnabled: z.boolean().optional(),
  isMusicEnabled: z.boolean().optional(),
  isNotesEnabled: z.boolean().optional(),
  isProjectsEnabled: z.boolean().optional(),
  isBioEnabled: z.boolean().optional(),
});

export type OSConfig = z.infer<typeof osConfigSchema>;
