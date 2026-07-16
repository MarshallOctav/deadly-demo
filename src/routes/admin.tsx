import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldBan } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin - Deadly Store" }] }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-xl px-3 py-10 sm:px-4 sm:py-16">
        <div className="rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
          <ShieldBan className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-4 text-2xl font-black">Panel admin tidak dipakai</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Fokus saat ini hanya katalog produk dan pesan ke WhatsApp.
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

