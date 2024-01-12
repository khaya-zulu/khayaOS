import { defineCollection, z } from "astro:content";

import {
  generalSchema,
  projectSchema,
  notesSchema,
  travelSchema,
} from "@khaya-os";

export const collections = {
  bio: defineCollection({
    schema: generalSchema,
  }),
  project: defineCollection({
    schema: projectSchema,
  }),
  travel: defineCollection({
    schema: travelSchema,
  }),
  music: defineCollection({
    type: "data",
    schema: generalSchema,
  }),
  notes: defineCollection({
    schema: notesSchema,
  }),
};
