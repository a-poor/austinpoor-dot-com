---
isDraft: false
title: Re-Re-Rewriting My Site in Astro
subtitle: Using the Astro Framework to Make a Simpler, Faster Site
description: Recapping the process of rewriting my personal site and blog using the new Astro framework.
image:
  # src: /images/apdc-site-screenshot.webp
  alt: A screenshot of the home page of my personal site, rewritten in Astro.
  caption: A screenshot of the home page of my personal site, rewritten in Astro.
publishDate: 2023-03-05
tags:
  - blog
  - javscript
  - astro
  - framework
  - frontend
recommended:
  - apoor-dot-dev
  - js-in-rs
---

Astro has been generating a lot of buzz recently, as a web framework that let's you writing fast websites that ship minimal JavaScript (and uses something called an [Island Architecture](https://docs.astro.build/en/concepts/islands/)) while still allowing you to selectively use familiar UI tools like React, and with first class support for Markdown. 

I decided to see what all the fuss was about by re-writing my personal website using Astro. I'll walk you through how it went.


## Why Did I Rewrite My Site?

First and foremost, I wanted an excuse to try out Astro but I also wasn't particularly happy with my current site. 

My site started out as a single page, written in React — not just an SPA but actually just a single page — basically an HTML resume. And it stayed like that for a while.

Then I rewrote it in SvelteKit. For those unfamiliar, SvelteKit is to Svelte what NextJS is to React (if that helps). I enjoyed using SvelteKit it shares a lot of the same benefits as Astro, compared to frameworks like React — it’s fast and it tries to ship minimal JavaScript.

The one key downside that I did see with SvelteKit compared to Astro was the markdown support. Astro has great, out-of-the-box support for markdown and SvelteKit doesn’t. I found myself writing custom Svelte components to handle images, code blocks, links, etc. which meant adding an extra step in the blog-writing process. It was nothing complicated but I wanted to clear as many unnecessary mental road-blocks as possible.

At the end of the day I was happy with SvelteKit, I was just looking for an excuse to try Astro, and a personal site seems like an easy place to try out new tools. The content is consistent and (hopefully) familiar, so it makes it easy to rewrite and re-rewrite* and re-re-re-…-write.


## Why Astro?

{/* ![A DALL-E generated image of a paper diorama showing a rocketship (the Astro framework logo) flying through space. ](/images/astro-rewrite-dalle.webp) */}
_A paper diorama of a rocketship flying through space, generated by DALL-E._

Astro ends up being a pretty natural fit for a personal site like mine. There’s minimal interactivity so Astro allows you to define and re-use components, like you would with React, but then can compile the results to HTML with little-to-no JavaScript. This allows an Astro site to start up quickly, whereas a React-based site needs to load a heavy JavaScript-based runtime when the site first loads, before it can display any content or become reactive. And that issue can multiply if you’re using React on it’s own, as a single page application, where it might need to load the runtime and then all of your content on all of your pages before staring up.

Astro’s added benefit is it’s strong support for rendering markdown and MDX, making it a lot easier to write blog posts, preventing me from using that as an excuse for not creating more content.

Another fun benefit of Astro is it’s ability to include components from other frameworks like React, Vue, Svelte [and more!](https://docs.astro.build/en/guides/integrations-guide/#official-integrations), and even intermix those framework components. When I started building my Astro site I experimented a bit with adding Svelte and React components but ultimately couldn’t find a good reason to use them over regular Astro components, and need to pay the resulting performance penalty. Though I can see that feature being helpful if I wanted to include some functionality from, say, a React library that I didn’t want to have to re-create — for example, maybe I wanted to add a cool custom visualization using React and AirBnB’s [visx](https://airbnb.io/visx/) library, it would be pretty simple to add to just one or a few pages using Astro.


## Working with Astro

Astro was easy to work with. It had a very gentle learning curve and it felt very familiar coming from frameworks like React and Svelte.

In addition to Astro, I used Tailwind for styling. (I know Tailwind is a divisive CSS framework so I’ll leave it at that.)

Most of my pages were `.astro` files, and then I have two *Content Collections* (a new feature in Astro v2) for my blog posts and my projects. The pages in my content collections were markdown files with custom frontmatter. My blog posts then also had Astro components defining how they should be formatted — wrappers, adding SEO tags, wrapper HTML layouts (pulling data from the frontmatter), and applying CSS styles to the translated markdown.

There is also a collection of markdown files for my projects page, though I’m currently only using the frontmatter and redirecting to the respective GitHub links for each project. Still, I liked the content collection approach, rather than defining the same data in JSON and it leaves a good opening in case I want to add some markdown describing each project.


## Deploying the Site

The decision of where to deploy the site is made a lot simpler by the fact that it's able to be statically compiled. My site was originally hosted on GitHub Pages, then Netlify, so I decided to change hosting providers, too (why not!), and move to Netlify.

Astro provides a simple Netlify integration which, combined with Netlify’s GitHub integration, makes the deployment quick and painless! The builds are fast and usually take about 10-20s from when I push a change to GitHub to when the code is live on my site.  


## Analytics, SEO, and Site Performance

{/* ![A screenshot of the Google Page Speed Insights for my site.](/images/apdc-page-speed-screenshot.webp) */}
_A screenshot of the [Google Page Speed Insights for my site](https://pagespeed.web.dev/report?url=https%3A%2F%2Faustinpoor.com)._

SEO was something I neglected to add to previous iterations of my site but which was pretty simple using Astro. I created a couple of Astro components with meta tags to place in the `<head>` using data from the page (e.g. frontmatter data on blog post pages). 

In terms of performance, again, Astro got me pretty far right out-of-the-box. There is a 1st party plugin to help with resizing images but I ended up just resizing them myself and converting them to `webp` format.

After that, the main ding on my Google Page Speed scores came from the loading of the Google Analytics script.

There is also an Astro plugin for Partytown — a tool for running resource-intensive scripts in the background using web workers — but the setup was to cumbersome between Partytown, Astro, Google Analytics, and Vercel so instead I opted to move to a smaller ("< 1 KB"), more privacy friendly, and open-source (though I opted to use the hosted version) analytics solution, Plausible. I’ve been very happy with Plausible — it loads quickly and has everything I need to keep track of my site’s usage without feeling overloaded.


## Future Work

My main goal will be to write more blog posts, more consistently. Other than that there’s plenty of room to clean things up and smooth out the design. In particular, I’d like to make the “About Me” page less of a wall of text and a bit more fun.

And who knows, maybe a new framework will come along and I’ll have to re-re-re-re-re-write the whole site.


## Conclusion

Astro is fast and easy to use, and it has great markdown support. It was a lot of fun to work with, and I'm looking forward to using it on future projects.

It may not be the best fit for sites with a lot of dynamic content (e.g. if you’re writing the next Figma) but for a personal site, a blog, or project documentation, Astro is a great fit.

And if you’re tired of deploying the 800-lb gorilla of web-analytics, Google Analytics, when you just want to know how many people read your blog post, consider give Plausible a try!


## Bonus: Oops! I just DDoS-ed myself.

I’ll hopefully wrote a separate blog post about this but, just as a quick side-note / bonus / blooper-reel...

Since my Astro re-write, I created a small and simple URL shortener in Rust, for fun and to get more experience with the language. It’ll be a fun project and it’ll make it easier for me to direct people to my GitHub or my LinkedIn or my personal site.

After having heard about the great, bear-metal performance of Rust services, I was excited to try it out for myself.

I even thought it would be a great opportunity for me to test that great performance by using the Grafana load-testing tool, k6. I ran my load-test on a local version of the Rust app but couldn’t figure out why I was getting error messages. That is until I realized that I forgot to prevent k6 from following the redirects along to my personal site.

The result was I ended up getting my IP address blocked by Vercel for my own site and I had to email their support team and explain what happened. Fortunately, they were very understanding and restored my access.

So the moral of the story here is, double check that you’re 100% sure what you’re load-testing!


## References

- [My personal site](https://austinpoor.com)
- [Personal Site Source Code](https://github.com/a-poor/austinpoor-dot-com)
- [Source Code for Old React Site](https://github.com/a-poor/austinpoor-dot-com/releases/tag/old%2Freact)
- [Source Code for Old SvelteKit site](https://github.com/a-poor/austinpoor-dot-com/releases/tag/old%2Fsvelte-kit)
- [Source Code for Old (unfinished) NextJS Site](https://github.com/a-poor/austinpoor-dot-com/releases/tag/old%2Fnext)
- [Astro Docs](https://astro.build/)
- [Plausible Docs](https://plausible.io/)
- [Tailwind Docs](https://tailwindcss.com/)
- [Page Speed Insights for My Site](https://pagespeed.web.dev/report?url=https%3A%2F%2Faustinpoor.com)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections)
- [WebP Images](https://developers.google.com/speed/webp)
- [Partytown](https://partytown.builder.io/)
- [k6 Docs](https://k6.io/)

