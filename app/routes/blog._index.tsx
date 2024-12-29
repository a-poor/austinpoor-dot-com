import {
  ItemList,
  LinkItem,
  ItemDate,
  ItemHeader,
  ItemDescription,
  ItemTags,
} from "~/components/item-list";
import blogPosts from 'virtual:load-blog-posts';


type Post = {
  slug: string;
  front: {
    publishDate: string;
    title: string;
    description: string;
    tags: string[];
  };
  html: string;
  readTime: string;
};
const comparePosts = (a: Post, b: Post) => new Date(b.front.publishDate as string).getTime() - new Date(a.front.publishDate as string).getTime();
const posts = Object.values(blogPosts as Record<string, Post>).sort(comparePosts);

export function meta() {
  return [
    { title: "Blog | AustinPoor.com" },
    { name: "description", content: "Welcome to Austin's Blog!" },
    { rel: "canonical", href: "https://austinppoor.com/blog" },
  ];
}

export default function Page() {
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
        {posts.map((p) => (
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
