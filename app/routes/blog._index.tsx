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
    { title: "Austin's Blog" },
    { name: "description", content: "Welcome to Austin's Blog!" },
  ];
}

export default function Page() {
  return (
    <>
      <div className="pb-8">
        <h1 className="pb-4 text-4xl">
          Blog
        </h1>
        <p className="pb-2 text-base">
          Some blog posts, articles, and other things I've written.
        </p>
        <div className="py-1 border-b w-14" />
      </div>

      {Object.keys(blogPosts).map(k => (
        <p key={k}>{k}</p>
      ))}

      <ItemList>
        <LinkItem to="#">
          <ItemDate date="2024-12-12" />
          <ItemHeader>
          </ItemHeader>
          <ItemDescription>
          </ItemDescription>
          <ItemTags tags={[]} />
        </LinkItem>
      </ItemList>
    </>
  );
}
