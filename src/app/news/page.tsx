import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { NewsCard } from "@/components/cards/NewsCard";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { createPageMetadata } from "@/lib/metadata";
import { news } from "@/lib/data";

export const metadata: Metadata = createPageMetadata(
  "Basketball Tips & Blog",
  "Drills, shooting tips, and training advice from JSkills Basketball Clinic."
);

export default function NewsPage() {
  return (
    <>
      <PageHeader
        label="Tips & Blog"
        title="Improve your game"
        subtitle="Basketball drills, shooting form, and training insights for players and parents."
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle label="All articles" title="Training tips" />
          <div className="grid gap-6 md:grid-cols-2">
            {news.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
