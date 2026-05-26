import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getNewsBySlug, news } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { createPageMetadata } from "@/lib/metadata";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) return createPageMetadata("Article Not Found");
  return createPageMetadata(article.title, article.excerpt);
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();

  return (
    <article className="pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/news">
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>
        </Button>

        <Badge className="mb-4">{article.category}</Badge>
        <h1 className="font-display text-display-md font-black uppercase leading-tight text-white">
          {article.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/50">
          <span>By {article.author}</span>
          <span>•</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            {article.comments} Comments
          </span>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border border-white/10">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
        </div>

        <div className="prose prose-invert mt-10 max-w-none">
          {article.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mb-6 text-lg leading-relaxed text-white/70">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
