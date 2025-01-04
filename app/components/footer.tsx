import { useMemo } from 'react';
import { Link } from 'react-router';

export function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="pt-8 pb-14 bg-zinc-100 dark:bg-zinc-950 flex flex-col gap-4 text-sm text-gray-600 dark:text-gray-400">
      <div className="flex flex-row gap-4 items-center justify-center">
        <FooterLink href="/">
          Home
        </FooterLink>
        <FooterLink href="/blog">
          Blog
        </FooterLink>
        <FooterLink href="/projects">
          Projects
        </FooterLink>
        <FooterLink href="/uses">
          Uses
        </FooterLink>
        <FooterLink href="/about">
          About
        </FooterLink>
      </div>
      <div className="text-center" aria-hidden="true">
        ***
      </div>
      <div className="flex flex-row gap-4 items-center justify-center">
        <FooterLink href="https://github.com/a-poor">
          GitHub
        </FooterLink>
        <FooterLink href="https://linkedin.com/in/austinpoor">
          LinedIn
        </FooterLink>
        <FooterLink href="https://bsky.app/profile/austinpoor.com">
          BlueSky
        </FooterLink>
        <FooterLink href="https://www.youtube.com/@a-poor">
          YouTube
        </FooterLink>
      </div>
      <div className="text-center" aria-hidden="true">
        ***
      </div>
      <div className="text-center">
        &copy; 2020-{year} Austin Poor
      </div>
    </footer>
  );
}

export function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      to={href}
      className="
        underline
        decoration-gray-500/50
        hover:decoration-gray-950
        dark:decoration-gray-500/50
        dark:hover:decoration-gray-200/50
      "
    >
      {children}
    </Link>
  );
}
