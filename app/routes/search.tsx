import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import type { Route } from "./+types/search";
import Fuse from 'fuse.js'
import blogPosts from "virtual:load-blog-posts";
import {
  ItemList,
  LinkItem,
  ItemDate,
  ItemHeader,
  ItemDescription,
  ItemTags,
} from "~/components/item-list";

function makeFuse() {
  const blogItems = Object.values(blogPosts).map((post) => ({
    type: "blog",
    slug: post.slug,
    title: post.front.title as string,
    subtitle: post.front.subtitle as string,
    description: post.front.description as string,
    tags: post.front.tags as string[],
    publishDate: post.front.publishDate as string,
  }));
  const items = [
    ...blogItems,
  ];
  const fuse = new Fuse(items, {
    keys: [
      "slug",
      "title",
      "subtitle",
      "description",
      "tags",
      "publishDate",
    ],
  });
  return fuse;
}

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Search | AustinPoor.com" },
    { name: "description", content: "Search for anything on AustinPoor.com" },
  ];
}

export default function Page() {
  const fuse = useMemo(makeFuse, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const setQuery = (value: string) => setSearchParams((prev) => {
    prev.set("q", value);
    return prev;
  });
  const [results, setResults] = useState(fuse.search(query));
  useEffect(() => {
    setResults(fuse.search(query));
  }, [query, fuse])
  return (
    <>
      <div className="pb-8 text-gray-950 dark:text-gray-50">
        <h1 className="pb-4 text-4xl">
          Search
        </h1>
        <p className="pb-2 text-base">
          Looking for something?
        </p>
        <div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="py-2 border-b b border-gray-500 w-14" />
      </div>
      <div className="pb-8 text-gray-950 dark:text-gray-50 text-base space-y-2">
        <ItemList>
          {results.map((p) => (
            <LinkItem to={`/blog/${p.item.slug}`} key={p.item.slug}>
              <ItemDate date={p.item.publishDate} />
              <ItemHeader>
                {p.item.title}
              </ItemHeader>
              <ItemDescription>
                {p.item.description}
              </ItemDescription>
              <ItemTags tags={p.item.tags} />
            </LinkItem>
          ))}
        </ItemList>
      </div>
    </>
  );
}