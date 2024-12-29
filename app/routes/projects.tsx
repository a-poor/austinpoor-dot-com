import type { Route } from "./+types/projects";
import {
  ItemList,
  LinkItem,
  ItemDate,
  ItemHeader,
  ItemDescription,
  ItemTags,
} from "~/components/item-list";
import { projects } from "~/project-data";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Projects | AustinPoor.com" },
    { name: "description", content: "Check out Austin's projects!" },
    { rel: "canonical", href: "https://austinppoor.com/projects/" },
  ];
}

export default function Page() {
  return (
    <>
      <div className="pb-8 text-gray-950 dark:text-gray-50">
        <h1 className="pb-4 text-4xl">
          Projects
        </h1>
        <p className="pb-2 text-base">
          Some projects I've worked on and links to learn more about them.
        </p>
        <div className="py-1 border-b w-14" />
      </div>

      <ItemList>
        {projects.map((p, i) => (
          <LinkItem key={i} to={p.url}>
            <ItemDate date={p.date} />
            <ItemHeader>
              {p.title}
            </ItemHeader>
            <ItemDescription>
              {p.description}
            </ItemDescription>
            <ItemTags tags={p.tags} />
          </LinkItem>
        ))}
      </ItemList>
    </>
  );
}

