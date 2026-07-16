import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/pembayaran/$orderId")({
  head: () => ({ meta: [{ title: "Checkout WhatsApp - Deadly Store" }] }),
  component: PembayaranPage,
});

function PembayaranPage() {
  const { orderId } = Route.useParams();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-xl px-3 py-10 sm:px-4 sm:py-16">
        <div className="rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
          <MessageCircle className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-4 text-2xl font-black">Order dikirim ke WhatsApp</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Invoice {orderId} sudah disiapkan untuk proses chat ke admin.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/6285797179752" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-black text-primary-foreground">
              Buka WhatsApp
            </a>
            <Link to="/produk" className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-secondary px-5 py-3 text-sm font-black">
              Lihat Produk
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

