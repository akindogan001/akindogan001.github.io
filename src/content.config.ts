import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { LAYERS } from './lib/layers';

const layer = z.enum(LAYERS);

/** Diyagram gösterim dili: cihaz, servis, veri deposu, kuyruk, arayüz */
const nodeType = z.enum(['device', 'service', 'store', 'queue', 'ui']);

const solutions = defineCollection({
  // Dosya yolu: src/content/solutions/<lang>/<slug>.md
  loader: glob({ pattern: '**/*.md', base: './src/content/solutions' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(['monitoring', 'automation', 'mes', 'integration', 'robotics', 'personal']),
    layers: z.array(layer).default([]),
    stack: z.array(z.string()).min(1),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    role: z.string().optional(),
    status: z.enum(['production', 'in-progress']).optional(),
    flow: z.array(z.object({ type: nodeType, label: z.string(), layer })).default([]),
    decisions: z
      .array(
        z.object({
          decision: z.string(),
          why: z.string(),
          alternative: z.string().optional(),
          cost: z.string().optional(),
        }),
      )
      .default([]),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

const approaches = defineCollection({
  // Dosya yolu: src/content/approaches/<lang>/<id>.md
  loader: glob({ pattern: '**/*.md', base: './src/content/approaches' }),
  schema: z.object({
    title: z.string(),
    question: z.string(),
    order: z.number(),
    patterns: z.array(z.object({ name: z.string(), desc: z.string() })).min(1),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { solutions, approaches };
