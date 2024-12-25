export type Project = {
    url: string;
    date: string;
    title: string;
    description: string;
    tags: string[];
};

export const projects = [
    {
        url: "https://github.com/a-poor/ssh-austinpoor-com",
        date: "2024-05-23",
        title: "ssh.austinpoor.com",
        description: `An TUI SSH server with some info about me, built with Go, Wish, and Bubble Tea. Check it out at <Code>$ ssh ssh.austinpoor.com</Code>.`,
        tags: ["go", "ssh", "wish"],
    },
    {
        url: "https://github.com/a-poor/watercooler",
        date: "2023-08-29",
        title: "WaterCooler",
        description: `A desktop app for chatting with ChatGPT using the OpenAI API &ndash; built with Tauri, Rust, React and Mantine.`,
        tags: ["rust", "javascript", "chatgpt", "tauri", "react"],
    },
    {
        url: "https://github.com/a-poor/js-in-rs",
        date: "2023-05-04",
        title: "Running JavaScript in Rust",
        description: `A demo of embedding a JavaScript runtime in Rust using Deno.`,
        tags: ["rust", "javascript", "deno"],
    },
    {
        url: "https://github.com/a-poor/vhttp",
        date: "2022-02-27",
        title: "vhttp",
        description: `A testing library for the Go "net/http" library that makes it easy to write quick assertions about HTTP requests and responses.`,
        tags: ["go", "testing", "http"],
    },
    {
        url: "https://github.com/a-poor/color-palettes",
        date: "2021-01-27",
        title: "Generating Color Palettes with AI",
        description: `Using traditional machine learning techniques &ndash; like k-means and agglomerative clustering &ndash; to generate color palettes from film stills.`,
        tags: ["ai", "clustering", "python"],
    },
    {
        url: "https://github.com/a-poor/austin-openai-plugin",
        date: "2023-10-27",
        title: "My ChatGPT Plugin",
        description: `A ChatGPT plugin that provides some basic information about me and even lets you send me a message!`,
        tags: ["chatgpt", "deno", "ai"],
    },
    {
        url: "https://github.com/a-poor/apoor-dot-dev",
        date: "2023-11-30",
        title: "apoor.dev",
        description: `A custom URL-shortener built with JavaScript and Hono, and hosted on Deno Deploy.`,
        tags: ["javascript", "deno", "hono"],
    },
    {
        url: "https://github.com/a-poor/openai-stream-rust-demo",
        date: "2023-05-26",
        title: "Streaming ChatGPT API Responses in Rust",
        description: `A demo of streaming ChatGPT API responses in Rust.`,
        tags: ["rust", "ai", "chatgpt", "async"],
    },
    // {
    //     url: "https://github.com/a-poor/red-tape",
    // },
] satisfies Project[];