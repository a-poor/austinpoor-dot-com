import { getCollection } from 'astro:content';

export async function GET() {
    const entries = await getCollection('blog');
    const data = entries
        .filter(d => !d.data.isDraft)
        .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime())
        ;
    return new Response(
        JSON.stringify(data),
        {
            headers: {
                'content-type': 'application/json',
            },
        },
    );
}