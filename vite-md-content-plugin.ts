import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { marked } from 'marked';
import MiniSearch from 'minisearch';

const CONTENT_DIR = path.resolve(__dirname, 'content');
const BLOG_POSTS_DIR = path.resolve(CONTENT_DIR, 'blog-posts');

export const SEARCH_FIELDS = ["slug", "title", "description", "tags", "content"];

/**
  * Schema with the expected frontmatter for a blog post.
  */
const blogPostFrontmatterSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  }),
  publishDate: z.preprocess((val) => val instanceof Date ? val.toISOString().split('T')[0] : val, z.string()),
  updateDate: z.preprocess((val) => val instanceof Date ? val.toISOString().split('T')[0] : val, z.string()).optional(),
  tags: z.array(z.string()),
  recommended: z.array(z.string()),
});

/** Blog post frontmatter type based on schema */
export type BlogPostFrontmatter = z.infer<typeof blogPostFrontmatterSchema>;

/**
  * Parse a blog post file into a structured object.
  *
  * @param fileName - The name of the file to parse.
  * @returns The parsed blog post data.
  */
function parseBlogFile(fileName: string) {
  const filePath = path.resolve(BLOG_POSTS_DIR, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  let front: BlogPostFrontmatter;
  try {
    front = blogPostFrontmatterSchema.parse(data);
  } catch (error) {
    console.error(`Error parsing frontmatter for ${fileName}:`, error);
    throw error;
  }
  const readTimeStats = readingTime(content);
  const html = marked(content) as string;
  return {
    slug: fileName.replace('.md', ''),
    front,
    content,
    html,
    readTime: readTimeStats.text,
  };
}

/**
  * Load all blog posts from the content directory.
  *
  * @returns The parsed blog post data.
  */
function loadBlogPosts() {
  return fs.readdirSync(BLOG_POSTS_DIR)
    .filter(file => file.endsWith('.md'))
    .filter(file => !file.startsWith('_'))
    .map(parseBlogFile);
}

export type BlogPostData = ReturnType<typeof parseBlogFile>;

function extractBlogPostSearchFields(blogPostData: BlogPostData[]) {
  return blogPostData.map(post => ({
    slug: post.slug,
    title: post.front.title,
    subtitle: post.front.subtitle,
    description: post.front.description,
    tags: post.front.tags,
    content: post.content,
  }));
}

export type BlogPostSearchFields = ReturnType<typeof extractBlogPostSearchFields>;

/**
  * Geneartes a JSON string of the blog post metadata
  * pre-indexed by MiniSearch.
  *
  * @param blogPostData - The blog post data to index.
  * @returns The JSON string of the MiniSearch index.
  */
function loadMiniSearchIndex(blogPostData: BlogPostData[]) {
  const cleanedData = extractBlogPostSearchFields(blogPostData);
  const miniSearch = new MiniSearch({
    idField: 'slug',
    fields: SEARCH_FIELDS,
    storeFields: SEARCH_FIELDS,
  });
  miniSearch.addAll(cleanedData);
  return JSON.stringify(miniSearch);
}

/**
  * Extracts the key metadata from the full blog post data 
  * for use in the blog list page.
  */
function fmtBlogPostMetadata(blogPostData: BlogPostData[]) {
  return blogPostData.map(post => ({
    slug: post.slug,
    title: post.front.title,
    subtitle: post.front.subtitle,
    description: post.front.description,
    image: post.front.image,
    publishDate: post.front.publishDate,
    updateDate: post.front.updateDate,
    readTime: post.readTime,
    tags: post.front.tags,
    content: post.content,
  }));
}

/**
  * A vite plugin to load the full data for all blog posts.
  */
export function importBlogPostContentPlugin() {
  const virtualModuleId = 'virtual:load-blog-post-content';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  // Load the blog posts from disk and transform it
  // into a map of slug -> post data.
  const blogPostData = loadBlogPosts().reduce((acc, post) => ({
    ...acc,
    [post.slug]: post,
  }), {});

  return {
    name: 'load-blog-post-content',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        return `export default ${JSON.stringify(blogPostData)}`;
      }
    }
  };
}

/**
  * A vite plugin to load the metadata for all blog posts.
  */
export function importBlogPostMetadataPlugin() {
  const virtualModuleId = 'virtual:load-blog-post-metadata';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  // Load the blog posts from disk and extract just
  // the metadata for use in the blog list page.
  const blogPostData = loadBlogPosts();
  const blogPostMetadata = fmtBlogPostMetadata(blogPostData);

  return {
    name: 'load-blog-post-metadata',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        return `export default ${JSON.stringify(blogPostMetadata)}`;
      }
    }
  };
}

/**
  * A vite plugin to load the `MiniSearch` index data for all blog posts.
  */
export function importBlogPostSearchDataPlugin() {
  const virtualModuleId = 'virtual:load-blog-post-index';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  // Load the blog posts from disk and extract just
  // the metadata for use in the blog list page.
  const blogPostData = loadBlogPosts();
  const blogIndexData = loadMiniSearchIndex(blogPostData);

  return {
    name: 'load-blog-posts-search-index',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        return `
            import MiniSearch from 'minisearch';
            export const INDEX_DATA = ${JSON.stringify(blogIndexData)};
            export const SEARCH_FIELDS = ${JSON.stringify(SEARCH_FIELDS)};
            export const loadIndex = () => MiniSearch.loadJSON(INDEX_DATA, {fields: SEARCH_FIELDS});
        `;
      }
    }
  };
}

