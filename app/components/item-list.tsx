import { useMemo } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import moment from "moment";
import { Badge, BadgeButton } from "~/components/catalyst/badge";


export const ItemHeader = ({ children }: { children?: ReactNode }) => (
  <h2 className="text-2xl font-bold group-hover:underline text-gray-950 dark:text-gray-50">
    {children}
  </h2>
);

export const ItemDescription = ({ children }: { children?: ReactNode }) => (
  <p className="text-base text-gray-700 dark:text-gray-300">
    {children}
  </p>
);

export const ItemTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2 py-2">
    {tags.map((tag) => (
      <Badge key={tag} color="zinc">
        {tag}
      </Badge>
    ))}
  </div>
);

export const ItemImage = () => (
  <div className="">
  </div>
);

export const ItemDate = ({ date }: { date: string | Date }) => {
  const d = useMemo(() => moment(date), [date]);
  return (
    <div className="text-sm text-gray-700 dark:text-gray-300">
      {d.format("MMM DD, YYYY")} ({d.fromNow()})
    </div>
  );
}

export const ItemReadTime = ({ readTime }: { readTime: string }) => (
  <div className="text-sm text-gray-700 dark:text-gray-300">
    {readTime}
  </div>
);

export const ItemLinkTag = ({ href, children }: { href: string, children: ReactNode }) => (
  <BadgeButton href={href} className="text-sm text-gray-700 dark:text-gray-300">
    {children}
  </BadgeButton>
);

export const ItemLinkTagList = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap gap-2 py-2">
    {children}
  </div>
);

export const Item = ({ children }: { children: ReactNode }) => (
  <div className="">
    {children}
  </div>
);

export const LinkItem = ({ to, children }: { to: string, children?: ReactNode }) => (
  <Link to={to} className="group py-2">
    {children}
  </Link>
);

export const ItemList = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-y-2">
    {children}
  </div>
);
