import type { Metadata } from "next";

import { RelationshipCounter } from "@/components/counter";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Our Relationship Counter ♡ — Our World",
  description: "A continuous live counter of our time shared together.",
};

export default function CounterPage() {
  return (
    <PageContainer size="md">
      <RelationshipCounter />
    </PageContainer>
  );
}
