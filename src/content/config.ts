import { defineCollection, z } from 'astro:content';

const robots = defineCollection({
  schema: z.object({
    title: z.string(),
    category: z.string(),
    manufacturer: z.string().optional(),
    price_usd: z.number().optional(),
    status: z.enum(['draft','review','published']).default('draft'),
    region: z.array(z.string()).default(['usa']),
    image: z.string().optional(),
    affiliate_url: z.string().url().optional(),
    seller_url: z.string().url().optional(),
    verified_date: z.string().optional(),
    buyer: z.string().optional(),
    problem: z.string().optional(),
    hook: z.string().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([])
  })
});

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    status: z.enum(['draft','review','published']).default('draft'),
    publish_date: z.string().optional(),
    robot_slug: z.string().optional(),
    image: z.string().optional(),
    excerpt: z.string().optional(),
    region: z.array(z.string()).default(['usa']),
    tags: z.array(z.string()).default([])
  })
});

export const collections = { robots, blog };
