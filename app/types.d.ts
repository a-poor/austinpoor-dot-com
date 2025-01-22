import type MiniSearch from "minisearch";
import type { BlogPostData, BlogPostFrontmatter, BlogPostSearchFields } from "../vite-md-content-plugin";

declare module 'virtual:load-blog-post-content' {
  
  const blogPosts: Record<string, BlogPostData>;
  export default blogPosts;
}

declare module 'virtual:load-blog-post-metadata' {
  const blogPosts: Array<BlogPostFrontmatter>;
  export default blogPosts;
}

declare module 'virtual:load-blog-post-index' {
  const INDEX_DATA: string;
  const SEARCH_FIELDS: string[];
  const loadIndex: () => MiniSearch<BlogPostSearchFields>;
}
