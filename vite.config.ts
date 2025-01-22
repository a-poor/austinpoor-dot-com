import { cloudflareDevProxy } from '@react-router/dev/vite/cloudflare';
import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import {
  importBlogPostContentPlugin,
  importBlogPostMetadataPlugin,
  importBlogPostSearchDataPlugin,
} from "./vite-md-content-plugin";

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
        importBlogPostContentPlugin(),
        importBlogPostMetadataPlugin(),
        importBlogPostSearchDataPlugin(),
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
