import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router';
import { Mountains, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import { Navbar, NavbarDivider, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer } from '~/components/catalyst/navbar'
import { Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection } from '~/components/catalyst/sidebar'
import { StackedLayout } from '~/components/catalyst/stacked-layout'
import { Footer } from '~/components/footer'
import { ThemePicker } from '~/components/theme-picker'


const navItems = [
  { label: 'Home', url: '/' },
  { label: 'Blog', url: '/blog' },
  { label: 'Projects', url: '/projects' },
  { label: 'About', url: '/about' },
]

export function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <>
      <StackedLayout
        navbar={
          <Navbar>
            <NavbarItem>
              <Link to="/" className="max-lg:hidden flex items-center gap-2">
                <Mountains size={26} />
                <NavbarLabel className="text-lg font-medium">
                  AustinPoor.com
                </NavbarLabel>
              </Link>
            </NavbarItem>
            <NavbarDivider className="max-lg:hidden" />
            <NavbarSection className="max-lg:hidden">
              {navItems.map(({ label, url }) => (
                <NavbarItem key={label} href={url} current={location.pathname === url || (url !== '/' && location.pathname.startsWith(url))}>
                  {label}
                </NavbarItem>
              ))}
            </NavbarSection>
            <NavbarSpacer />
            <NavbarSection>
              <NavbarItem href="/search" aria-label="Search">
                <MagnifyingGlass size={20} />
              </NavbarItem>
              <ThemePicker />
            </NavbarSection>
          </Navbar>
        }
        sidebar={
          <Sidebar>
            <SidebarHeader>
              <SidebarItem className="lg:mb-2.5">
                <Link to="/" className="flex items-center gap-2">
                  <Mountains size={26} />
                  <SidebarLabel>Austin Poor</SidebarLabel>
                </Link>
              </SidebarItem>
            </SidebarHeader>
            <SidebarBody>
              <SidebarSection>
                {navItems.map(({ label, url }) => (
                  <SidebarItem key={label} href={url} current={location.pathname === url}>
                    {label}
                  </SidebarItem>
                ))}
              </SidebarSection>
            </SidebarBody>
          </Sidebar>
        }
      >
        {children}
      </StackedLayout>
      <Footer />
    </>
  )
}
