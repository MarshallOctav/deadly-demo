import { createFileRoute, Link } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/masuk")({
  head: () => ({ meta: [{ title: "Masuk - Deadly Store" }] }),
  component: MasukPage,
});

function MasukPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-xl px-3 py-10 sm:px-4 sm:py-16">
        <div className="rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
          <LockKeyhole className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-4 text-2xl font-black">Fitur akun dinonaktifkan</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Pemesanan sekarang langsung ke WhatsApp tanpa login.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/produk" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-black text-primary-foreground">
              Lihat Produk
            </Link>
            <a href="https://wa.me/6285797179752" className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-secondary px-5 py-3 text-sm font-black">
              Chat WhatsApp
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

