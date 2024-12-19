import {
  Monitor,
  SunDim,
  Moon,
} from '@phosphor-icons/react/dist/ssr';
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu, DropdownLabel } from '~/components/catalyst/dropdown'

export type Theme = 'system' | 'light' | 'dark';

export function ThemePicker({ theme, setTheme }: { theme: Theme, setTheme: (theme: Theme) => void }) {
  return (
    <Dropdown>
      <DropdownButton as='button' aria-label="Select Theme" className="text-gray-950 dark:text-gray-50">
        {theme === 'system' && (
          <>
            <Monitor size={20} />
            <span className="sr-only">System Theme</span>
          </>
        )}
        {theme === 'light' && (
          <>
            <SunDim size={20} />
            <span className="sr-only">Light Theme</span>
          </>
        )}
        {theme === 'dark' && (
          <>
            <Moon size={20} />
            <span className="sr-only">Dark Theme</span>
          </>
        )}
      </DropdownButton>
      <DropdownMenu>
        <DropdownItem
          onClick={() => setTheme('system')}
          className={theme === "system" ? "gap-2" : "gap-2"}
        >
          <Monitor size={20} />
          <DropdownLabel>System</DropdownLabel>
        </DropdownItem>
        <DropdownItem
          onClick={() => setTheme('light')}
          className={theme === "light" ? "gap-2" : "gap-2"}
        >
          <SunDim size={20} />
          <DropdownLabel>Light</DropdownLabel>
        </DropdownItem>
        <DropdownItem
          onClick={() => setTheme('dark')}
          className={theme === "dark" ? "gap-2" : "gap-2"}
        >
          <Moon size={20} />
          <DropdownLabel>Dark</DropdownLabel>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
