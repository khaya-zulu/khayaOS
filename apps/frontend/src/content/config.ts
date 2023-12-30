import { defineCollection, z } from "astro:content";

const generalCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    cover: z.string(),
    externalLink: z.string().optional(),
  }),
});

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tech: z.array(z.string()),
    cover: z.string(),
  }),
});

const travelCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    greetings: z.array(z.string()),
    cover: z.string(),
  }),
});

const notesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishedAt: z.date(),
    cover: z.string(),
  }),
});

export const collections = {
  bio: generalCollection,
  project: projectCollection,
  travel: travelCollection,
  music: generalCollection,
  notes: notesCollection,
};
