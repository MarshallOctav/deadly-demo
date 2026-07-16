import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Trash2, ShoppingCart } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/lib/cart";
import { formatIDR } from "@/lib/products";
import logoAsset from "@/assets/deadly-logo.asset.json";

export const Route = createFileRoute("/keranjang")({
  head: () => ({ meta: [{ title: "Keranjang - Deadly Store" }] }),
  component: KeranjangPage,
});

function KeranjangPage() {
  const { items, remove, total, count } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 md:py-8">
        <h1 className="mb-6 text-2xl font-black sm:text-3xl md:mb-8 md:text-4xl">Keranjang Belanja</h1>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-lg font-bold">Keranjangmu kosong</h2>
            <p className="text-sm text-muted-foreground mt-2">Yuk pilih akun game favoritmu.</p>
            <Link to="/produk" className="inline-block mt-6 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm">
              Lihat Produk
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
            <div className="space-y-3 lg:col-span-2">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-3 rounded-xl border border-border bg-card p-3 sm:gap-4 sm:p-4">
                  <div className="h-16 w-16 shrink-0 rounded-lg bg-[var(--brand-navy-deep,var(--background))] p-2 sm:h-20 sm:w-20">
                    <img src={logoAsset.url} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link to="/produk/$slug" params={{ slug: item.slug }} className="font-bold text-sm hover:text-primary line-clamp-2">
                      {item.title}
                    </Link>
                    <div className="text-primary font-black mt-1">{formatIDR(item.price)}</div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-black text-muted-foreground">
                        Produk satuan
                      </div>
                      <button onClick={() => remove(item.slug)} className="text-muted-foreground hover:text-destructive" aria-label="Hapus">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="hidden shrink-0 text-right font-black text-primary sm:block">{formatIDR(item.price)}</div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-2xl border border-border bg-card p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="font-bold mb-4">Ringkasan Pesanan</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Jumlah produk</span>
                  <span>{count}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatIDR(total)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Biaya admin</span>
                  <span>Gratis</span>
                </div>
                <div className="border-t border-border my-3" />
                <div className="flex justify-between font-black text-base">
                  <span>Total</span>
                  <span className="text-primary">{formatIDR(total)}</span>
                </div>
              </div>
              <button
                onClick={() => navigate({ to: "/checkout" })}
                className="mt-6 min-h-12 w-full rounded-full bg-primary px-4 py-3 text-sm font-bold leading-tight text-primary-foreground transition hover:brightness-110"
              >
                Lanjut Pesan
              </button>
              <Link to="/produk" className="block text-center mt-3 text-xs text-muted-foreground hover:text-primary">
                ← Belanja lagi
              </Link>
            </div>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}



