---
isDraft: false
title: Serving ML Models with gRPC
subtitle: Skip REST and give gRPC a try
description: gRPC APIs are fast, efficient, and type-safe. Next time you need to create an ML prediction service, ditch REST and give gRPC a shot!
image:
    src: /images/serve-ml-grpc-dalle.webp
    alt: A DALL-E generated image of a brain with wires coming out of it.
    caption: An image of a brain with wires coming out of it, generated by DALL-E.
publishDate: "2021-12-01"
# updateDate: "2023-02-16"
tags:
- api
- grpc
- rest
- machine-learning
- python
recommended:
- flask-ml-predictions
- data-science-profilers
- js-in-rs
---

Most people who are looking to put their newly trained ML model into production turn to REST¹ APIs. Here's why I think you should consider using gRPC instead.

## Wait! What's wrong with REST!?

Nothing! The main benefit of REST APIs is their ubiquity. Every major programming language has a way of making HTTP clients and servers. And there are several existing frameworks for wrapping ML models with REST APIs (e.g. BentoML, TF Serving, etc). But, if your use case doesn't fit one of those tools (and even if it does), you may find yourself wanting to write something a little more custom. And the same thing that makes REST APIs versatile can also make them difficult to work with.

## What is gRPC?

As its [site states](https://grpc.io/), gRPC is “a high performance, open source universal RPC framework,” originally developed at Google. The three main elements at the core of gRPC are: code generation, HTTP/2, and Protocol Buffers².

[Protocol Buffers](https://developers.google.com/protocol-buffers) are a binary, structured data format designed by Google to be small and fast. Both gRPC services and their request/response message formats are defined in `.protobuf` files.

gRPC client and server code is generated from the `.protobuf` definition files, in your preferred language. You then fill in the business logic to implement the API.

[HTTP/2](https://developers.google.com/web/fundamentals/performance/http2)-based transport provides gRPC with [several key benefits](https://grpc.io/blog/grpc-load-balancing/#why-grpc):

- A binary protocol
- Bi-directional streaming
- Header compression
- Multiplexing several requests on the same connection

_Okay, but what does that mean for me?_

## Type Safety & Documentation

Since gRPC APIs are defined via protobufs, they are inherently documented and type-safe. Conversely, REST APIs have no such guarantee you would need extra tooling like OpenAPI to define and document your service as well as a library to validate client requests.

## Speed, Binary Data & Streaming

gRPC takes full advantage of HTTP/2 and Protocol Buffers to make your API as fast as possible. gRPC messages are made up of efficiently packed binary data compared with REST's plain-text, JSON-encoded messages.

[One commonly cited test](https://medium.com/@EmperorRXF/evaluating-performance-of-rest-vs-grpc-1b8bdf0b22da) shows gRPC to be roughly 7-10 times faster than REST. While the differences may be less visible with smaller requests, the inputs to ML models can often be large (e.g. large tables of data, images to be processed, or even video), where compression and binary formats shine.

In fact, since Protocol Buffers allow for binary data, a request could be a large table of data encoded with [Apache Arrow](https://arrow.apache.org/) or [Apache Parquet](https://parquet.apache.org/). And further, thanks to the capabilities of HTTP/2, large binary messages can broken up into chunks and streamed.

## Downsides & Alternatives

gRPC certainly isn't perfect. For example, here are some issues you might run into:

- Slower initial development
- Less commonly used
- Messages aren't human-readable, which makes debugging more difficult
- Client libraries need to be generated

Other approaches exist that might fit better with your workflow. BentoML, TF Serving, and Ray Serve are some great options for serving ML models. Or, if you're looking for something a little more customizable, FastAPI and Flask are two great options that might be a better match.

Also, for a partial approach, you could also consider swapping out your message format from JSON to BSON or MessagePack.

## Conclusion / TL;DR

gRPC APIs are fast and easy to work with. They are inherently type-safe, they allow for bi-directional streaming messages (e.g. breaking large files into chunks), and they use a fast and efficient message format (Protocol Buffers).

Next time you need to serve up an ML model via an API, consider using gRPC!

## Further Reading

- gRPC (gRPC Python library)
- Protocol Buffers
- HTTP/2

## Footnotes

[1] I know the term “RESTful” is maybe thrown around a bit too liberally — and applied to any HTTP-based API. In this article, I use the colloquial definition of a REST API.  
[2] This is a bit of an oversimplification - gRPC is highly customizable. For example, you could use JSON instead of protobufs and HTTP/1 instead of HTTP/2. But...should you?