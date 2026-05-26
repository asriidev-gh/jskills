"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LazyImage } from "@/components/shared/LazyImage";
import { formatDate } from "@/lib/utils";
import type { NewsArticle } from "@/types";
import { scaleIn } from "@/lib/animations";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <motion.div variants={scaleIn} whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
      <Link href={`/news/${article.slug}`}>
        <Card className="group overflow-hidden transition-all duration-300 hover:border-accent-orange/30 hover:shadow-glow">
          <div className="relative aspect-[16/10] overflow-hidden">
            <LazyImage
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-court-dark to-transparent opacity-80" />
            <Badge className="absolute top-4 left-4">{article.category}</Badge>
          </div>
          <CardContent className="p-6">
            <div className="mb-2 flex items-center gap-2 text-xs text-white/40">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                {article.comments} Comments
              </span>
            </div>
            <h3 className="font-display text-lg font-bold uppercase leading-tight text-white transition-colors group-hover:text-accent-orange">
              {article.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-white/50">{article.excerpt}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
