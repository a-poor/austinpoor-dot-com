import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="py-8">
      <div className="text-sm text-gray-500 flex flex-row gap-4 items-center justify-center">
        <FooterLink href="/github">
          GitHub
        </FooterLink>
        <FooterLink href="/linkedin">
          LinedIn
        </FooterLink>
        <FooterLink href="/bluesky">
          BlueSky
        </FooterLink>
        {/* <FooterLink href="/youtube">
          YouTube
        </FooterLink> */}
      </div>
      <div className="py-6 text-sm text-gray-500 text-center">
        ***
      </div>
      <div className="text-sm text-gray-500 text-center">
        &copy; 2020-{new Date().getFullYear()} Austin Poor
      </div>
    </footer>
  );
}

export function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      to={href}
      className="
        text-gray-500
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
