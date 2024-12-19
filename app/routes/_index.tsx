import type { Route } from "./+types/_index";
import { Link } from "react-router";
import { GithubLogo, LinkedinLogo, Butterfly, YoutubeLogo } from '@phosphor-icons/react';


export function meta(_: Route.MetaArgs) {
  return [
    { title: "AustinPoor.com" },
    { name: "description", content: "Welcome to AustinPoor.com!" },
  ];
}

export default function Page() {
  return (
    <div className="text-gray-950 dark:text-gray-50">
      <div>
        <h1 className="text-7xl pb-4">
          Austin Poor
        </h1>
        <p className="text-2xl pb-2">
          Hey! I'm Austin.
        </p>
        <p className="text-2xl pb-2">
          I'm a full-stack software engineer living in Los Angeles, CA.
        </p>
        <div className="w-fit pb-4 grid grid-cols-4 gap-2 items-center">
          <Link to="/github">
            <GithubLogo size={36} />
            <span className="sr-only">Github</span>
          </Link>
          <Link to="/linkedin">
            <LinkedinLogo size={36} />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link to="/bluesky">
            <Butterfly size={36} />
            <span className="sr-only">Bluesky</span>
          </Link>
          <Link to="/youtube">
            <YoutubeLogo size={36} />
            <span className="sr-only">YouTube</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
