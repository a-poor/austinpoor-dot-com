import fs from 'fs';
import path from 'path';
import { cloudflareDevProxy } from '@react-router/dev/vite/cloudflare';
import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import yaml from 'js-yaml';
import Markdoc from '@markdoc/markdoc';
import readingTime from 'reading-time';
import { sentryVitePlugin } from "@sentry/vite-plugin";


function importBlogPostPlugin() {
  const virtualModuleId = 'virtual:load-blog-posts';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  const contentDirectory = path.resolve(__dirname, 'content');
  const blogContentDirectory = path.resolve(contentDirectory, 'blog-posts');

  // Get a list of all the blog posts
  const blogPosts = fs
    .readdirSync(blogContentDirectory)
    .filter(file => file.endsWith('.md'))
    .filter(file => !file.startsWith('_'));
  
  // Load all the blog posts as markdoc
  const blogPostsMarkdoc = blogPosts.reduce((acc, post) => {
    const slug = post.replace('.md', '');
    const filePath = path.resolve(blogContentDirectory, post);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const readTimeStats = readingTime(fileContent);
    const ast = Markdoc.parse(fileContent);
    const front = (ast.attributes.frontmatter ?
      yaml.load(ast.attributes.frontmatter) : {}) as Record<string, any>;
    const content = Markdoc.transform(ast, {
      variables: {
        slug,
        front,
      },
    });
    const html = Markdoc.renderers.html(content);
    acc[slug] = {
      slug,
      front,
      html,
      readTime: readTimeStats.text,
    };
    return acc;
  }, {} as Record<string, { slug: string, front: Record<string, any>, html: string, readTime: string }>);

  return {
    name: 'load-blog-posts',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        return `export default ${JSON.stringify(blogPostsMarkdoc)}`;
      }
    }
  };
}

export default defineConfig(({ isSsrBuild }) => ({
    build: {
        sourcemap: true,
        rollupOptions: isSsrBuild
            ? {
                input: "./workers/app.ts",
            }
            : undefined,
    },
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
    },
    ssr: {
        target: "webworker",
        noExternal: true,
        resolve: {
            conditions: ["workerd", "browser"],
        },
        optimizeDeps: {
            include: [
                "react",
                "react/jsx-runtime",
                "react/jsx-dev-runtime",
                "react-dom",
                "react-dom/server",
                "react-router",
            ],
        },
    },
    plugins: [
        cloudflareDevProxy({
          getLoadContext({ context }: { context: { cloudflare: unknown }}) {
            return { cloudflare: context.cloudflare };
          },
        }),
        importBlogPostPlugin(),
        reactRouter(),
        tsconfigPaths(),

        // Keep this at the end
        sentryVitePlugin({
          authToken: process.env.SENTRY_AUTH_TOKEN,
          org: "austinpoorcom",
          project: "austinpoor-dot-com",
          sourcemaps: {
            filesToDeleteAfterUpload: "**/*.js.map",
          },
        }),
    ],
}));
