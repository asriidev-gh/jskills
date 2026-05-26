import { HeroBanner } from "@/components/cards/HeroBanner";
import { ClinicHomeSections } from "@/components/sections/ClinicHomeSections";
import { HomePageGate } from "@/components/shared/HomePageGate";
import { products, news } from "@/lib/data";

export default function HomePage() {
  return (
    <HomePageGate>
      <HeroBanner />
      <div id="main-content">
        <ClinicHomeSections
          products={products}
          newsArticles={news.slice(0, 4)}
        />
      </div>
    </HomePageGate>
  );
}
