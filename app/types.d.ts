declare module 'virtual:load-blog-posts' {
  interface BlogPost {
    slug: string;
    front: Record<string, any>;
    html: string;
    readTime: string;
  }

  const blogPosts: Record<string, BlogPost>;
  export default blogPosts;
}
