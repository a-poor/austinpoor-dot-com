---
isDraft: true
title: Building a URL Shortener with Rust and Axum
subtitle: A recap of ...
description: ... 
image:
    src: /images/color-palette-example.webp
    alt: A photo of mountains with a color palette generated from the image.
    caption: Photo by Trey Ratcliff (Source) with my generated color palette.
    captionLink: https://flickr.com/photos/stuckincustoms/8837173497
publishDate: "2023-03-17"
tags:
- rust
- async
- url-shortener
- axum
- fly-io
recommended: []
---

Rust is an exciting language with a lot of promise -- fast, safe programs with a small 
footprint. I've written a few small things in Rust but I wouldn't be comfortable using 
it in production...yet. So in an effort to _get_ more comfortable, I decided to create
a web service using Rust and Tokio.

I [recently rewrote my personal site in Astro](/blog/astro-rewrite) and moved my blog
from Medium to my personal site, so what better time to add a URL shortener -- like my 
own personal bitly or tinyurl -- and it just so happens I had an unused domain, 
`apoor.dev`. So rather than needing to remember the URLs for my GitHub, my LinkedIn, 
my Mastodon, specific blog posts and projects, etc., I can instead direct someone to 
`apoor.dev/mastodon` or `apoor.dev/linkedin`.

In addition to creating a functional url shortener, my goal was for the application to 
be fast and lightweight -- two valuable features for a service such as this one, both
selling points of Rust -- and for it to be easy to update and deploy.


## Tech Stack

I had already decided to use Rust and Tokio (the most popular async runtime) but there
are several options to choose from when it comes to web frameworks:
[Actix](https://actix.rs/), [Rocket](https://rocket.rs/), [Gotham](https://gotham.rs/),
[Axum](https://github.com/tokio-rs/axum) (just to name a few). They are all solid 
options but I ultimately decided to go with Axum -- the newest of the group and part of 
the Tokio package ecosystem.

In order to create a fast, easily deployable application, I decided to use Fly.io as
a host.

Lastly, in an attempt to put some concrete numbers behind the somewhat nebulous 
performance claims, I decided to perform some load testing on the final application 
using [k6](https://k6.io), Grafana's open source load testing tool.


## Writing a Web Service with Axum

The web app itself was easy to write. Coming from other language-framework-combos like 
Node and Express, Go and Echo, or Python and FastAPI, using Axum felt very familiar.

Here's an example handler function to return a simple JSON response:

```rust
async fn root() -> Json<Value> {
    Json(json!({
        "id": 42,
        "msg": "Hello, World!"
    }))
}
```

It's terse and boiler-plate free without being limiting. Handlers get data from the
request via [_extractors_](https://docs.rs/axum/latest/axum/#extractors) -- allowing
you to pull out headers, request bodies, etc. as function function arguments and
return data with [_responses_](https://docs.rs/axum/latest/axum/#responses) -- similarly
versitile response types allowing you to set the status code, headers, the body, etc.
while still allowing you to skip setting values you don't need.

With the small footprint of this service, though, I wasn't able to get a sense of how 
well this ease-of-use scales.


## Middleware and Logging

The most-used logging library used with Tokio and Axum is [_Tracing_](https://github.com/tokio-rs/tracing), 
which is also maintained by the Tokio team. Having used it as the logging library in this 
application as well as a few other toy projects, I would say that I haven't quite gotten 
the hang of it yet. Since it handles more than just logging, it has a different interface 
than other logging libraries like [Winston](https://github.com/winstonjs/winston) in NodeJS 
or [Zap](https://github.com/uber-go/zap) in Go.

Likewise, the Axum middleware package, [Tower](https://github.com/tower-rs/tower) (also
under the Tokio umbrella), feels different than other middleware tools. It aims to provide
reusable middleware across tools like Axum, Hyper, and Tonic.


## Data Storage Decision

My original intention was to store the URL entries -- the mapping from short keys to their
respective redirect URLs (eg "blog", as in "apoor.dev/blog" would link to "austinpoor.com/blog")
-- in a cache like Redis. In fact, Fly.io has an [integration with Redis via Upstash](https://fly.io/docs/reference/redis/).
As I was building the app, though, I found that it would be simpler and faster to store the
data as a `HashMap` in the application itself.

Since I don't often make changes and, when I do, a GitHub action is able to re-deploy the
site in less than 5 minutes, there's no need to complicate things with a database or an 
external cache.

In a future iteration, I do plan to add a cache to monitor request volume but in the meantime, 
a `HashMap` gets the job done quickly and easily.


## Deploying to Fly.io


## Load Testing and Performance



## Next Steps



## Conclusion



## Reference


