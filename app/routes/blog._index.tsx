import type { Route } from "./+types/blog._index";
import {
  ItemList,
  LinkItem,
  ItemDate,
  ItemHeader,
  ItemDescription,
  ItemTags,
} from "~/components/item-list";
import blogPosts from 'virtual:load-blog-posts';

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Blog | AustinPoor.com" },
    { name: "description", content: "Welcome to Austin's Blog!" },
  ];
}

export default function Page() {
  const sortedBlogPosts = Object.values(blogPosts).sort((a, b) => new Date(b.front.publishDate).getTime() - new Date(a.front.publishDate).getTime());
  return (
    <>
      <div className="pb-8 text-gray-950 dark:text-gray-50">
        <h1 className="pb-4 text-4xl">
          Blog
        </h1>
        <p className="pb-2 text-base">
          Some blog posts, notes, and other things I've written.
        </p>
        <div className="py-1 border-b w-14" />
      </div>

      <ItemList>
        {sortedBlogPosts.map((p) => (
          <LinkItem to={`/blog/${p.slug}`} key={p.slug}>
            <ItemDate date={p.front.publishDate} />
            <ItemHeader>
              {p.front.title}
            </ItemHeader>
            <ItemDescription>
              {p.front.description}
            </ItemDescription>
            <ItemTags tags={p.front.tags} />
          </LinkItem>
        ))}
      </ItemList>
    </>
  );
}