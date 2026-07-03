"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/shared/LazyImage";
import { ShopProductVisual } from "@/components/shop/ShopProductVisual";
import { formatPHP } from "@/lib/utils";
import type { Product } from "@/types";
import { scaleIn } from "@/lib/animations";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasVisual = Boolean(product.productType);
  const hasImage = Boolean(product.image);

  return (
    <motion.div variants={scaleIn} whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
      <Card className="group overflow-hidden transition-all duration-300 hover:border-accent-orange/30 hover:shadow-glow">
        <div className="relative aspect-square overflow-hidden">
          {hasImage ? (
            <LazyImage
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="transition-transform duration-500 group-hover:scale-110"
            />
          ) : hasVisual && product.productType ? (
            <ShopProductVisual type={product.productType} />
          ) : null}

          {product.badge && (
            <Badge className="absolute top-4 left-4 z-10 max-w-[85%] text-[10px] leading-tight">
              {product.badge}
            </Badge>
          )}

          <div className="absolute inset-0 z-10 flex items-center justify-center bg-court-dark/60 opacity-0 transition-opacity group-hover:opacity-100">
            <Button size="sm" variant="glass">
              <ShoppingBag className="h-4 w-4" />
              Inquire to Order
            </Button>
          </div>
        </div>

        <CardContent className="p-5">
          <p className="text-xs uppercase tracking-wider text-white/40">{product.category}</p>
          <h3 className="mt-1 font-semibold text-white">{product.name}</h3>
          {product.description && (
            <p className="mt-1 line-clamp-2 text-xs text-white/50">{product.description}</p>
          )}
          <p className="mt-3 font-display text-2xl font-black text-accent-orange">
            {formatPHP(product.price)}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
