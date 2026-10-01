import { CheckCircle2, Layers3, Sparkles } from "lucide-react";

import { FutureRouteList } from "@/components/navigation/future-route-list";
import { MusicPlayer } from "@/components/music/MusicPlayer";
import { Card } from "@/components/ui/Card";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site";

export function FoundationOverview() {
  return (
    <PageTransition className="px-6 py-10 sm:px-10">
      <section className="mx-auto flex max-w-6xl flex-col gap-12">
        <SectionHeading
          title={siteConfig.name}
          eyebrow={`${siteConfig.phase} design system`}
          level="h1"
          className="pt-12 sm:pt-20"
          accent={<Sparkles className="size-6" />}
        >
          <p>
            The project shell is ready for product design, visual systems, and
            content integration in later phases.
          </p>
        </SectionHeading>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card as="section" className="p-6">
            <div className="flex items-center gap-3">
              <Layers3 aria-hidden="true" className="size-5 text-accent" />
              <h2 className="text-base font-semibold text-foreground">
                Stack
              </h2>
            </div>
            <ul className="mt-5 grid gap-3 text-sm text-muted">
              {siteConfig.stack.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    aria-hidden="true"
                    className="size-4 shrink-0 text-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card as="section" className="p-6">
            <h2 className="text-base font-semibold text-foreground">
              Reserved Routes
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              These pages are intentionally placeholders until their real
              design and content work begins.
            </p>
            <div className="mt-5">
              <FutureRouteList />
            </div>
          </Card>
        </div>

        <section aria-label="Music interface foundation">
          <MusicPlayer />
        </section>
      </section>
    </PageTransition>
  );
}
