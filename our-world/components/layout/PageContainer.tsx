"use client";

import React from "react";

import { PageTransition } from "@/components/ui/PageTransition";
import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "full";
  as?: React.ElementType;
};

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  full: "max-w-full",
};

export function PageContainer({
  children,
  className,
  size = "lg",
  as: Component = "main",
}: PageContainerProps) {
  return (
    <PageTransition className="flex-1">
      <Component
        id="main-content"
        className={cn(
          "mx-auto w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8",
          sizeClasses[size],
          className
        )}
      >
        {children}
      </Component>
    </PageTransition>
  );
}
