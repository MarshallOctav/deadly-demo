import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock3, Flame, Tag } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { flashSaleProducts, formatIDR } from "@/lib/products";

export const Route = createFileRoute("/flash-sale")({
  head: () => ({ meta: [{ title: "Flash Sale - Deadly Store" }] }),
  component: FlashSalePage,
});

function FlashSalePage() {
  const totalSaving = flashSaleProducts.reduce((sum, item) => sum + ((item.originalPrice ?? item.price) - item.price), 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-3 py-6 sm:px-4 md:py-8">
        <section className="rounded-xl border border-border bg-card p-3 sm:rounded-2xl sm:p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-5">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-black text-primary sm:gap-2 sm:px-3 sm:text-xs">
                <Flame className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                Flash Sale
              </div>
              <h1 className="text-lg font-black leading-tight sm:text-3xl md:text-4xl">Promo Akun Game Hari Ini</h1>
              <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
                Stok promo terbatas dengan potongan harga langsung. Produk memakai foto logo Deadly Store sementara.
              </p>
            </div>
            <div className="grid w-full grid-cols-3 gap-1.5 text-center sm:w-auto sm:gap-2">
              {["02", "45", "19"].map((item, index) => (
                <div key={index} className="rounded-lg bg-primary px-2 py-1.5 text-primary-foreground sm:rounded-xl sm:px-4 sm:py-3">
                  <div className="text-base font-black leading-none sm:text-2xl">{item}</div>
                  <div className="mt-0.5 text-[8px] font-bold sm:text-[10px]">{["JAM", "MENIT", "DETIK"][index]}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3">
            {[
              { icon: Tag, value: flashSaleProducts.length, label: "Produk promo" },
              { icon: Flame, value: formatIDR(totalSaving), label: "Total potensi hemat" },
              { icon: Clock3, value: "24 Jam", label: "Periode aktif" },
            ].map((item) => (
              <div key={item.label} className="min-w-0 rounded-lg bg-secondary p-2 sm:rounded-xl sm:p-4">
                <item.icon className="h-3.5 w-3.5 text-primary sm:h-5 sm:w-5" />
                <div className="mt-1 truncate text-xs font-black sm:mt-2 sm:text-xl">{item.value}</div>
                <div className="line-clamp-2 text-[9px] leading-tight text-muted-foreground sm:text-xs">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {flashSaleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-[var(--brand-navy-deep,var(--background))] p-6 text-center">
          <h2 className="text-xl font-black">Butuh spek lain?</h2>
          <p className="mt-1 text-sm text-muted-foreground">Cek katalog utama untuk stok akun terbaru.</p>
          <Link to="/produk" className="mt-4 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-black text-primary-foreground">
            Lihat Semua Produk
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

