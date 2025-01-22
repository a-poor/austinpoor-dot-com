import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import type { Route } from "./+types/search";
import type MiniSearch from "minisearch";
import { loadIndex } from "virtual:load-blog-posts-search-index";
import {
  ItemList,
  LinkItem,
  ItemDate,
  ItemHeader,
  ItemDescription,
  ItemTags,
} from "~/components/item-list";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Search | AustinPoor.com" },
    { name: "description", content: "Search for anything on AustinPoor.com" },
    { rel: "canonical", href: "https://austinppoor.com/search/" },
  ];
}

export default function Page() {
  const search = useMemo(() => loadIndex() as MiniSearch, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const setQuery = (value: string) => setSearchParams((prev) => {
    prev.set("q", value);
    return prev;
  });
  const [results, setResults] = useState(search.search(query));
  useEffect(() => {
    setResults(search.search(query));
  }, [query, search])
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