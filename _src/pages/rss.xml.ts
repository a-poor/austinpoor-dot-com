import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';


export async function GET(context: APIContext) {
    const blogPosts = await getCollection('blog');
    return rss({
        // `<title>` field in output xml
        title: "Austin's Blog",

        // `<description>` field in output xml
        description: "Blog posts by Austin Poor.",

        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#contextsite
        site: context.site?.toString() || 'https://austinpoor.com',

        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: blogPosts
            .filter(p => !p.data.isDraft)
            .sort((a, b) => {
                // Choose the most recent date (if "updated", use that, otherwise use "published")
                const da = a.data.updateDate || a.data.publishDate;
                const db = b.data.updateDate || b.data.publishDate;

                // Sort ascending...
                if (da === db) return 0;
                return da < db ? -1 : 1;
            })
            .reverse()
            .map((post) => ({
                title: post.data.title,
                pubDate: post.data.updateDate || post.data.publishDate,
                description: post.data.description,
                // customData: post.data.customData,
                // Compute RSS link from post `slug`
                // This example assumes all posts are rendered as `/blog/[slug]` routes
                link: `/blog/${post.slug}/`,
            })),

        // (optional) inject custom xml
        customData: `<language>en-us</language>`,
    });
}
