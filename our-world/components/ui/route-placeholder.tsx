"use client";

import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { buttonStyles } from "@/components/ui/button-styles";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PlannedRoute } from "@/types/routes";

type RoutePlaceholderProps = {
  route: PlannedRoute;
};

export function RoutePlaceholder({ route }: RoutePlaceholderProps) {
  return (
    <PageContainer size="md">
      <div className="flex min-h-[calc(100vh-14rem)] flex-col justify-center py-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-muted">
            <li>
              <Link
                href="/"
                className="hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                Our World
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="capitalize">{route.area}</li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-foreground" aria-current="page">
              {route.title}
            </li>
          </ol>
        </nav>

        <Card variant="warm" className="p-8 sm:p-12 shadow-lifted">
          <SectionHeading
            title={route.title}
            eyebrow={`Reserved Space · ${route.area}`}
            level="h1"
            accent={<Sparkles className="size-5 text-accent" />}
          >
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              This space is prepared for our upcoming {route.title} chapter. The
              global shell, navigation, and atmosphere are active and ready for its
              features.
            </p>
          </SectionHeading>

          <div className="mt-8 flex flex-wrap items-center gap-4 pt-4 border-t border-border/60">
            <Link
              href="/"
              className={buttonStyles({ variant: "secondary", size: "md" })}
            >
              <ArrowLeft className="size-4" />
              <span>Return to World Hub</span>
            </Link>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
