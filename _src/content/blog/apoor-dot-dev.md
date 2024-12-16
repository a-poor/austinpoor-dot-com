---
isDraft: false
title: Making apoor.dev
subtitle: Building a URL Shortener with Rust, Tokio, and Axum.
description: I recently built a URL shortener using Rust, Tokio, and Axum, and in this blog post, I'm sharing my experience. From selecting the right tech stack to load testing the application, I cover everything that went into building this service.
image:
    src: /images/dalle-crab-in-a-hot-baloon.webp
    alt: DALL-E 2's take on Ferris the crab (Rust's mascot) in a hot air baloon (Fly.io's logo)
    caption: DALL-E 2's take on Ferris the crab (Rust's mascot) in a hot air baloon (Fly.io's logo)
publishDate: "2023-04-18"
tags:
- rust
- async
- url-shortener
- axum
- tokio
- fly-io
recommended:
- astro-rewrite
- js-in-rs
---

Rust is an exciting language with a lot of promise -- fast, safe programs with a small footprint. I've written a few things here and there in Rust but to get more practice, I decided to create a URL shortener using Rust, Tokio, and Axum.

I [recently rewrote my personal site in Astro](/blog/astro-rewrite) and moved my blog from Medium to my personal site, so what better time to add a URL shortener -- like my own personal bitly or tinyurl -- and it just so happens I had an unused domain, `apoor.dev`. With a URL shortener, rather than needing to remember the URLs for my GitHub, my LinkedIn, my Mastodon, specific blog posts and projects, etc., I can instead direct someone to `apoor.dev/mastodon` or `apoor.dev/linkedin`.

In addition to creating a functional url shortener, my goal was for the application to be fast and lightweight -- two important features for such a service, both of which are selling points of Rust -- and for it to be easy to update and deploy.


## Tech Stack

I had already decided to use Rust and Tokio (the most popular async runtime) but there are several options to choose from when it comes to web frameworks: [Actix](https://actix.rs/), [Rocket](https://rocket.rs/), [Gotham](https://gotham.rs/), [Axum](https://github.com/tokio-rs/axum) (just to name a few). They are all solid  options but I ultimately decided to go with Axum -- the newest of the group and part of the Tokio package ecosystem.

In order to create a fast, easily deployable application, I decided to use Fly.io as a host.

Lastly, in an attempt to put some concrete numbers behind the somewhat nebulous performance claims, I decided to perform some load testing on the final application using [k6](https://k6.io), Grafana's open source load testing tool.


## Writing a Web Service with Axum

The web app itself was easy to write. Coming from other language-framework-combos like Node and Express, Go and Echo, or Python and FastAPI, using Axum felt very familiar.

Here's an example handler function to return a simple JSON response:

```rust
use axum::Json;
use serde_json::{json, Value};

async fn root() -> Json<Value> {
    Json(json!({
        "id": 42,
        "msg": "Hello, World!"
    }))
}
```

It's terse and boiler-plate free without being limiting. Handlers get data from the request via [_extractors_](https://docs.rs/axum/latest/axum/#extractors) -- allowing you to pull out headers, request bodies, etc. as function arguments and return data with [_responses_](https://docs.rs/axum/latest/axum/#responses) -- similarly versitile response types allowing you to set the status code, headers, the body, etc. while still allowing you to skip setting values you don't need.

With the small footprint of this service, though, I wasn't able to get a sense of how well this ease-of-use scales.


## Middleware and Logging

The most-used logging library for Tokio and Axum is [_Tracing_](https://github.com/tokio-rs/tracing), which is also maintained by the Tokio team. Having used it as the logging library in this application as well as a few other toy projects, I would say that I haven't quite gotten the hang of it yet. Since it handles more than just logging, it has a different interface than other logging libraries like [Winston](https://github.com/winstonjs/winston) in NodeJS or [Zap](https://github.com/uber-go/zap) in Go.

Likewise, the Axum middleware package, [Tower](https://github.com/tower-rs/tower) (also under the Tokio umbrella), feels different than other middleware tools. It aims to provide reusable middleware across tools like Axum, Hyper, and Tonic.


## Data Storage Decision

My original intention was to store URL entries -- the mapping from short keys to their respective redirect URLs (eg "blog", as in "apoor.dev/blog" would link to "austinpoor.com/blog") -- in a cache like Redis. Fly.io has an simple [Redis integration via Upstash](https://fly.io/docs/reference/redis/), which would be a perfect option. But as I was building the app, I decided it would be simpler and faster to store the data as a `HashMap` in the application itself.

Since I don't often make changes to the URLs and, when I do, a GitHub action is able to re-deploy the site in less than 5 minutes, there's no need to over-engineer and complicate things by adding an external dependancy.

In a future iteration, I do plan to add a cache to monitor request volume but in the meantime, a `HashMap` gets the job done quickly and easily.


## Building and Deploying to Fly.io

Compared to Go, the rust compilation step takes a little while, even for a small app like this one. The final release build comes in at about `6.5MB`, which feels a bit on the large side. To get a better sense of the file-size breakdown I used the tool [cargo-bloat](https://crates.io/crates/cargo-bloat) and got the following results:

```sh
$ cargo bloat --release
    Finished release [optimized] target(s) in 0.05s
    Analyzing target/release/apoor-dot-dev

 File  .text     Size       Crate Name
 1.3%   6.5%  86.5KiB  tower_http <tower_http::trace::on_response::DefaultOnResponse as tower_http::trace::on_respons...
 0.5%   2.2%  29.9KiB  tower_http <tower_http::trace::on_failure::DefaultOnFailure as tower_http::trace::on_failure::...
 0.3%   1.7%  22.3KiB         std addr2line::ResDwarf<R>::parse
 0.3%   1.4%  19.2KiB         std std::backtrace_rs::symbolize::gimli::resolve::{{closure}}
 0.3%   1.4%  18.1KiB       hyper <hyper::proto::h1::role::Server as hyper::proto::h1::Http1Transaction>::encode
 0.2%   1.1%  14.6KiB       hyper hyper::proto::h1::dispatch::Dispatcher<D,Bs,I,T>::poll_loop
 0.2%   0.9%  12.0KiB       hyper hyper::proto::h1::decode::Decoder::decode
 0.2%   0.9%  11.7KiB       hyper hyper::proto::h1::role::Server::encode_headers_with_original_case
 0.2%   0.8%  11.1KiB  tower_http <tower_http::trace::make_span::DefaultMakeSpan as tower_http::trace::make_span::Mak...
 0.2%   0.8%  11.0KiB       hyper <hyper::proto::h1::role::Server as hyper::proto::h1::Http1Transaction>::parse
 0.2%   0.8%  10.8KiB         std addr2line::ResUnit<R>::parse_lines
 0.2%   0.8%  10.5KiB        http http::header::name::StandardHeader::from_bytes
 0.1%   0.6%   8.2KiB miniz_oxide miniz_oxide::inflate::core::decompress
 0.1%   0.6%   8.0KiB       hyper hyper::proto::h1::io::Buffered<T,B>::poll_flush
 0.1%   0.5%   6.7KiB       hyper hyper::proto::h1::conn::Conn<I,B,T>::poll_read_head
 0.1%   0.5%   6.1KiB       hyper <hyper::server::tcp::AddrIncoming as hyper::server::accept::Accept>::poll_accept
 0.1%   0.4%   5.9KiB       tokio tokio::runtime::park::CachedParkThread::block_on
 0.1%   0.4%   5.9KiB        axum <F as axum::handler::Handler<(M,T1),S,B>>::call::{{closure}}
 0.1%   0.4%   5.8KiB         std gimli::read::abbrev::Abbreviations::insert
 0.1%   0.4%   5.8KiB         std <core::pin::Pin<P> as core::future::future::Future>::poll
15.2%  74.3% 995.9KiB             And 4572 smaller methods. Use -n N to show more.
20.5% 100.0%   1.3MiB             .text section size, the file size is 6.4MiB
```

I initially would have guessed that the Tokio runtime might be the largest factor responsible for the size of the binary but, according to _cargo bloat_, `tower` and `hyper` took up the most space -- but even still, the largest item only took up `86KB`.

Deploying the app to Fly.io was a breeze. Even though Fly doesn't provide language support for Rust specifically, it's easy enough to deploy an app using a `Dockerfile`. 

I used a multi-stage build to keep the final container size small. I originally used the [Debian image](https://hub.docker.com/_/debian), `buster-slim`, which had a final image size of about `75MB` but, after switching to [Alpine](https://hub.docker.com/_/alpine), I was able to get the image size down to about `13MB`.

I _did_ run into one hiccup with the Rust/Alpine image. My build was failing with the following error:

```
error: linking with `cc` failed: exit status: 1
```

After doing some digging and with the help of [this](https://github.com/rust-lang/rust/issues/25289) GH issue, I was able to get it running by adding the following line to my `Dockerfile`:

```
RUN apk add --update alpine-sdk
```

## Load Testing and Performance

Once I had the API up and running, my next step was to do some load testing. 

[k6](https://k6.io/) is a tool by Grafana Labs, written in Go, for load testing web applications. It allows you to define a set of rules, in JavaScript, for _virtual users_ to access your web service and reports statistics like latency, failure rates, etc.

![A GIF showing the terminal output from running k6](/images/apoor-dot-dev-load-test-demo.gif)
_A GIF showing the terminal output running the k6 load-test of my URL shortener._

I ran a basic test (see above) against a locally running version of the app, that would randomly request an endpoint from a set of both valid and invalid paths. The result was a median response time of about `25ms` and a P90 response time of about `50ms`. While I was hoping for single-digit response times, that's still plenty fast to get the job done.


## Oops! I DDoSed Myself...

While I was getting my load test up and running, experimenting with the `k6` configuration, and running it against my local version of the URL shortener, I noticed some unexplained errors being returned. I ran the load test again a few times, tweaking the settings, just to be sure but I was still getting the errors.

I came to realize that the errors were happening because the URL shortener was doing exactly what it was supposed to do...redirecting the user...and k6 was doing exactly what _it_ was supposed to do...follow redirects. So in the process of load testing my local version of the URL shortener, k6 was innocently and inadvertently following those redirects to...my GitHub, my LinkedIn, and...my personal site, which I recently [rewrote in astro](/blog/astro-rewrite) and hosted on Vercel. Vercel noticed the suspicious traffic and blocked the potentially malicious IP address...my IP address...blocking me from accessing my own site. Oops! Fortunately, Vercel support was very understanding and restored my access.

The moral of the story is...load test with caution and watch out for redirects!

In case you're curious, you can prevent redirects in k6 with the following: 

```
http.get("...", { redirects: 0});
```


## Next Steps

I'm pretty happy with the current version of the app but if I'm looking to do some more tinkering in the future, I'd like to add some metrics to better track usage. I might also like to take a crack at improving the performance or shrinking the binary size.


## Conclusion

I had a lot of fun with this experiment. Axum was easy to use and will definitely be my first choice next time I'm creating a web service with Rust. 


## Reference

- [apoor-dot-dev GitHub Repo](https://github.com/a-poor/apoor-dot-dev/)
- [axum](https://github.com/tokio-rs/axum)
- [Tokio](https://tokio.rs/)
- [k6](https://k6.io/)
- [cargo-bloat](https://crates.io/crates/cargo-bloat)

