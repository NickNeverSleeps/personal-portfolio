import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    category: z.enum(["graphics", "development"]),
    summary: z.string(),
    year: z.string(),
    role: z.string(),
    tools: z.array(z.string()),
    tags: z.array(z.string()),
    show: z.boolean().default(true),
    featured: z.boolean().default(false),
    liveUrl: z.url().optional(),
    repoUrl: z.url().optional(),
    caseStudyUrl: z.url().optional(),
    thumbnail: z.string().default("visual-slate"),
    gallery: z
      .array(
        z.object({
          title: z.string(),
          caption: z.string(),
          visual: z.string().default("visual-slate"),
        }),
      )
      .default([]),
  }),
});

export const collections = { work };
