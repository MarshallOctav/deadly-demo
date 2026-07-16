import { createFileRoute, Link } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/pesanan")({
  head: () => ({ meta: [{ title: "Pesanan - Deadly Store" }] }),
  component: PesananPage,
});

function PesananPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-xl px-3 py-10 sm:px-4 sm:py-16">
        <div className="rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
          <Package className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-4 text-2xl font-black">Riwayat pesanan dinonaktifkan</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Pesanan sekarang dikirim langsung ke WhatsApp admin.
          </p>
          <Link to="/produk" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-black text-primary-foreground">
            Lihat Produk
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

