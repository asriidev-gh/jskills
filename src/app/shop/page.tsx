import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/cards/ProductCard";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { EnrollLink } from "@/components/shared/EnrollLink";
import { Button } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/metadata";
import { products } from "@/lib/data";

export const metadata: Metadata = createPageMetadata(
  "Club Shop",
  "JSkills club jersey, training shorts, court socks, and performance headband — official clinic apparel."
);

export default function ShopPage() {
  return (
    <>
      <PageHeader
        label="Club Shop"
        title="Gear up like a pro"
        subtitle="Jersey, shorts, socks & headband — official JSkills training apparel with sample prices in pesos."
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Apparel & Accessories"
            title="Shop collection"
            subtitle="Group training includes the club jersey (dark & light upper). All items available for separate purchase."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-white/40">
            Prices shown are samples in ₱ PHP. To order, contact Coach Edmar via the enrollment form or phone.
          </p>
          <div className="mt-8 text-center">
            <Button asChild>
              <EnrollLink>Inquire to Order</EnrollLink>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
