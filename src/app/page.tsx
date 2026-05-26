import { HeroBanner } from "@/components/cards/HeroBanner";
import { ClinicHomeSections } from "@/components/sections/ClinicHomeSections";
import { products, news } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <div id="main-content">
        <ClinicHomeSections
          products={products}
          newsArticles={news.slice(0, 4)}
        />
      </div>
    </>
  );
}
