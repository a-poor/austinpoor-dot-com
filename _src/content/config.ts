import { z, defineCollection } from 'astro:content';


const blogCollection = defineCollection({
    schema: z.object({
        isDraft: z.boolean().default(false),
        title: z.string(),
        subtitle: z.string().optional(),
        pageTitle: z.string().optional(),
        description: z.string(),
        image: z.object({
            src: z.string(),
            alt: z.string(),
            caption: z.string().optional(),
            captionLink: z.string().optional(),
        }),
        tags: z.array(z.string()),
        publishDate: z.string().transform(str => new Date(str)),
        updateDate: z.string().transform(str => new Date(str)).optional(),
        recommended: z.array(z.string()).optional(),
    }),
});

const projectCollection = defineCollection({
    schema: z.object({
        hide: z.boolean().default(false),
        title: z.string(),
        description: z.string(),
        href: z.string(),
        order: z.number(),
    }),
});


export const collections = {
    'blog': blogCollection,
    'projects': projectCollection,
};
