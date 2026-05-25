import { CommandPalette } from "./command-palette";
import { CursorGlow } from "./cursor-glow";
import { GridBackground } from "./grid-background";
import { Navbar } from "./Navbar";
import { RouteTransition } from "./route-transition";
import { ScrollProgress } from "./scroll-progress";
import { SiteEasterEggs } from "./site-easter-eggs";
import { SiteFooter } from "./site-footer";
import { SiteToastHost } from "./site-toast";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GridBackground />
      <CursorGlow />
      <ScrollProgress />
      <SiteEasterEggs />
      <SiteToastHost />
      <CommandPalette />
      <Navbar />
      <main className="relative z-0 flex flex-1 flex-col pt-[10rem] sm:pt-[11.5rem] md:pt-[12rem]">
        <RouteTransition>{children}</RouteTransition>
      </main>
      <SiteFooter />
    </>
  );
}
