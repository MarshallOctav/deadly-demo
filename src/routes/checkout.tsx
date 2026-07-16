import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/lib/cart";
import { saveOrder, type Order } from "@/lib/auth";
import { formatIDR } from "@/lib/products";
import { buildWhatsAppUrl, cartWhatsAppMessage } from "@/lib/whatsapp";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout WhatsApp - Deadly Store" }] }),
  component: CheckoutPage,
});

const DRAFT_KEY = "Deadly:checkout-draft";

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [buyer, setBuyer] = useState(() => readDraft());
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (items.length === 0 && !submitting) navigate({ to: "/keranjang" });
  }, [items.length, submitting, navigate]);

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(buyer));
  }, [buyer]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyer.name || !buyer.email || !buyer.phone) return;

    const order: Order = {
      id: "INV-" + Date.now().toString(36).toUpperCase(),
      userId: null,
      items: items.map((item) => ({ slug: item.slug, title: item.title, price: item.price, qty: 1 })),
      total,
      buyer,
      payment: "whatsapp",
      status: "pending",
      createdAt: Date.now(),
    };

    setSubmitting(true);
    saveOrder(order);
    const message = cartWhatsAppMessage(items, total, buyer, order.id);
    clear();
    localStorage.removeItem(DRAFT_KEY);
    window.location.href = buildWhatsAppUrl(message);
    window.setTimeout(() => setSubmitting(false), 300);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 md:py-8">
        <h1 className="mb-2 text-2xl font-black sm:text-3xl md:text-4xl">Checkout WhatsApp</h1>
        <p className="text-sm text-muted-foreground">Isi data singkat, lalu order langsung dikirim ke WhatsApp admin.</p>

        <form onSubmit={submit} className="mt-6 grid gap-5 lg:grid-cols-3 lg:gap-6">
          <div className="space-y-5 lg:col-span-2 lg:space-y-6">
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
              <h2 className="mb-4 font-black">Data Pembeli</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm">
                  <span className="mb-1 block font-medium">Nama lengkap</span>
                  <input
                    required
                    value={buyer.name}
                    onChange={(event) => setBuyer({ ...buyer, name: event.target.value })}
                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 outline-none focus:ring-2 focus:ring-primary/60"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block font-medium">Email</span>
                  <input
                    required
                    type="email"
                    value={buyer.email}
                    onChange={(event) => setBuyer({ ...buyer, email: event.target.value })}
                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 outline-none focus:ring-2 focus:ring-primary/60"
                  />
                </label>
                <label className="text-sm md:col-span-2">
                  <span className="mb-1 block font-medium">No. WhatsApp</span>
                  <input
                    required
                    value={buyer.phone}
                    onChange={(event) => setBuyer({ ...buyer, phone: event.target.value })}
                    placeholder="08xxxxxxxxxx"
                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 outline-none focus:ring-2 focus:ring-primary/60"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
              <h2 className="mb-4 font-black">Ringkasan Produk</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.slug} className="flex justify-between gap-3 rounded-xl bg-secondary p-3 text-sm">
                    <div className="min-w-0">
                      <div className="line-clamp-1 font-bold">{item.title}</div>
                      <div className="text-xs text-muted-foreground">Produk satuan</div>
                    </div>
                    <div className="shrink-0 font-black">{formatIDR(item.price)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="h-fit rounded-2xl border border-border bg-card p-4 sm:p-6 lg:sticky lg:top-24">
            <h2 className="mb-4 font-black">Total Pesanan</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Jumlah produk</span>
                <span>{items.length}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Total</span>
                <span>{formatIDR(total)}</span>
              </div>
            </div>
            <button
              disabled={submitting}
              type="submit"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-black leading-tight text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
            >
              <MessageCircle className="h-4 w-4" />
              {submitting ? "Mengirim..." : "Kirim ke WhatsApp"}
            </button>
            <Link to="/produk" className="mt-3 block text-center text-xs text-muted-foreground hover:text-primary">
              Lanjut pilih produk
            </Link>
          </div>
        </form>
      </div>
      <SiteFooter />
    </div>
  );
}

function readDraft() {
  if (typeof window === "undefined") {
    return { name: "", email: "", phone: "" };
  }
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY) || "{\"name\":\"\",\"email\":\"\",\"phone\":\"\"}") as {
      name: string;
      email: string;
      phone: string;
    };
  } catch {
    return { name: "", email: "", phone: "" };
  }
}

