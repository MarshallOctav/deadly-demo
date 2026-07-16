import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgePercent, ChevronRight, Flame, MessageCircle, ShieldCheck, ShoppingBag, Store } from "lucide-react";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/deadly-logo.asset.json";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { CategoryIcon } from "@/components/category-icon";
import { categories, flashSaleProducts, infoCards, products, rentalProducts, soldProducts } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deadly Store - Jual, Beli & Rental Akun Game Premium" },
      { name: "description", content: "Pusat jual beli dan rental akun game premium Deadly Store." },
    ],
  }),
  component: Index,
});

const banners = [
  {
    label: "Banner Deadly Store",
    image: "/banner1.png",
  },
];

const homeShortcuts = [
  { title: "Free Fire", to: "/produk", icon: Flame },
  { title: "FF 100rb - 2jt", to: "/produk", icon: BadgePercent },
  { title: "FF 2jt - 100jt", to: "/produk", icon: ShoppingBag },
  { title: "Stok Akun", to: "/produk", icon: Store },
  { title: "Testimoni / Sold", to: "/produk", search: { stock: "sold" }, icon: MessageCircle },
  { title: "Jual akun", to: "/bantuan", icon: ShieldCheck },
] as const;

function Index() {
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveBanner((current) => (current + 1) % banners.length), 4200);
    return () => window.clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-7xl px-3 py-5 sm:px-4">
          <div className="relative aspect-[2.5/1] overflow-hidden rounded-3xl border border-border bg-[var(--brand-navy-deep,var(--background))]">
            {banners.map((banner, index) => (
              <div
                key={banner.label}
                className={`absolute inset-0 bg-[var(--brand-navy-deep,var(--background))] transition-opacity duration-500 ${activeBanner === index ? "opacity-100" : "opacity-0"}`}
              >
                <img src={banner.image} alt={banner.label} decoding="async" className="h-full w-full object-cover" />
              </div>
            ))}
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {banners.map((banner, index) => (
                <button
                  key={banner.label}
                  onClick={() => setActiveBanner(index)}
                  className={`h-2 rounded-full transition-all ${activeBanner === index ? "w-7 bg-primary" : "w-2 bg-white/45"}`}
                  aria-label={`Banner ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </section>

        <section className="mx-auto max-w-7xl px-3 pb-5 sm:px-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {homeShortcuts.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                search={"search" in item ? item.search : undefined}
                className="flex min-h-20 items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors duration-200 hover:border-primary"
              >
                <item.icon className="h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0 text-sm font-black leading-tight whitespace-nowrap sm:text-base">{item.title}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-3 pb-7 sm:px-4">
          <div className="rounded-2xl border border-border bg-card p-4">
            <h2 className="flex items-center gap-2 text-lg font-black">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Info Terbaru
            </h2>
          </div>
          <div className="mt-3 overflow-hidden">
            <div className="flex w-max transform-gpu animate-[info-marquee_56s_linear_infinite] hover:[animation-play-state:paused]">
              {[0, 1].map((group) => (
                <div key={group} className="flex shrink-0 gap-3 pr-3">
                  {Array.from({ length: 4 }).flatMap(() => infoCards).map((item, index) => (
                    <Link key={`${group}-${item.title}-${index}`} to="/produk" className="w-[150px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-primary sm:w-[210px]">
                      <div className="aspect-[3/4] bg-[var(--brand-navy-deep,var(--background))]">
                        <img src={logoAsset.url} alt={item.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <Section title="Flash Sale" to="/flash-sale" icon={<Flame className="h-5 w-5 text-primary" />}>
          {flashSaleProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.slug} product={product} compact />
          ))}
        </Section>

        <Section title="Produk Terbaru" to="/produk">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.slug} product={product} compact />
          ))}
        </Section>

        {soldProducts.length > 0 && (
          <section className="mx-auto max-w-7xl px-3 pb-9 sm:px-4 md:pb-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-black">
                <MessageCircle className="h-5 w-5 text-primary" />
                Produk Sold
              </h2>
              <Link to="/produk" search={{ stock: "sold" }} className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                Lihat <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {soldProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.slug} product={product} compact />
              ))}
            </div>
          </section>
        )}

        <Section title="Rental Akun" to="/rental">
          {rentalProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.slug} product={product} compact />
          ))}
        </Section>

        <section className="mx-auto max-w-7xl px-3 pb-14 sm:px-4">
          <h2 className="mb-4 text-xl font-black">Game Tersedia</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to="/produk"
                search={{ kategori: category.slug }}
                className="rounded-2xl border border-border bg-card p-4 text-center transition-colors duration-200 hover:border-primary sm:p-5"
              >
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
                  <CategoryIcon slug={category.slug} />
                </div>
                <div className="mt-2 font-black">{category.name}</div>
                <div className="text-xs text-muted-foreground">{category.count} akun</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Section({
  title,
  to,
  icon,
  children,
}: {
  title: string;
  to: "/produk" | "/rental" | "/flash-sale";
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-3 pb-9 sm:px-4 md:pb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-black">
          {icon}
          {title}
        </h2>
        <Link to={to} className="inline-flex items-center gap-1 text-sm font-bold text-primary">
          Lihat <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">{children}</div>
    </section>
  );
}



