import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, ShoppingCart, Check, ShieldCheck, Zap, Headphones, Share2, Copy, Image as ImageIcon, Eye, Users, Clock3, MessageCircle, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { allProducts, getProduct, formatIDR } from "@/lib/products";
import logoAsset from "@/assets/deadly-logo.asset.json";
import { useCart } from "@/lib/cart";
import { useEffect, useRef, useState } from "react";
import { buildProductWhatsAppUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/produk_/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.product.title} - Deadly Store` : "Produk - Deadly Store" },
      { name: "description", content: loaderData?.product.description ?? "Detail akun game di Deadly Store." },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-black">Produk tidak ditemukan</h1>
        <Link to="/produk" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground">
          Kembali ke produk
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
  component: DetailProduk,
});

function DetailProduk() {
  const { product } = Route.useLoaderData();
  const { add, clear } = useCart();
  const mediaCardRef = useRef<HTMLDivElement | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [cartAdded, setCartAdded] = useState(false);
  const [shared, setShared] = useState(false);
  const gallery = [
    { label: "Foto Utama", note: product.title },
    { label: "Preview Akun", note: `${product.category} ${product.rank}` },
    { label: "Detail Skin", note: "Koleksi dan item akun" },
    { label: "Bukti Aman", note: "Full akses & garansi" },
  ];
  const related = allProducts.filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug).slice(0, 4);
  const chosenDuration = product.durations?.[selectedDuration];
  const waUrl = buildProductWhatsAppUrl(product, chosenDuration);

  useEffect(() => {
    const card = mediaCardRef.current;
    if (!card) return;
    let frame = 0;

    const updateStickyPoint = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const cardHeight = card.getBoundingClientRect().height;
        const bottomGap = 24;
        card.style.setProperty("--product-media-sticky-top", `${window.innerHeight - cardHeight - bottomGap}px`);
      });
    };

    updateStickyPoint();
    const observer = new ResizeObserver(updateStickyPoint);
    observer.observe(card);
    window.addEventListener("resize", updateStickyPoint);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", updateStickyPoint);
    };
  }, [activeImage]);

  const shareProduct = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: product.title, text: product.description, url });
    } else {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 1600);
    }
  };

  const handleAddToCart = () => {
    add({
      slug: product.slug,
      title: product.isRental && chosenDuration ? `${product.title} - ${chosenDuration.label}` : product.title,
      price: product.isRental && chosenDuration ? chosenDuration.price : product.price,
    });
    setCartAdded(true);
    window.setTimeout(() => setCartAdded(false), 1400);
  };

  const handleGallerySelect = (index: number) => {
    setActiveImage(index);
    const cardTop = mediaCardRef.current?.getBoundingClientRect().top ?? 0;
    const headerOffset = 120;
    window.scrollTo({
      top: window.scrollY + cardTop - headerOffset,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-3 py-6 sm:px-4 md:py-8">
        <div className="mb-6 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Beranda</Link> /{" "}
          <Link to="/produk" className="hover:text-primary">Produk</Link> /{" "}
          <span className="text-foreground">{product.title}</span>
        </div>

        <section className="grid items-start gap-5 md:gap-8 lg:grid-cols-[minmax(0,1fr)_460px]">
          <div className="product-detail-media-column space-y-5 lg:self-stretch">
            <div ref={mediaCardRef} className="product-media-sticky-card rounded-2xl border border-border bg-card p-3 sm:p-4 md:p-6">
              <div className="product-media-main flex min-h-[220px] items-center justify-center rounded-xl bg-[var(--brand-navy-deep,var(--background))] p-4 sm:min-h-[300px] sm:p-6 md:min-h-[360px] md:p-8">
                <img src={logoAsset.url} alt={gallery[activeImage].label} className="aspect-square max-h-[500px] w-full object-contain" />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-3">
                {gallery.map((image, index) => (
                  <button
                    key={image.label}
                    onClick={() => handleGallerySelect(index)}
                    className={`rounded-xl border p-1.5 text-left transition sm:p-2 ${activeImage === index ? "border-primary bg-primary/10" : "border-border bg-secondary hover:border-primary"}`}
                  >
                    <div className="aspect-square rounded-lg bg-[var(--brand-navy-deep,var(--background))] p-2">
                      <img src={logoAsset.url} alt={image.label} className="h-full w-full object-contain" />
                    </div>
                    <div className="mt-1.5 line-clamp-2 flex min-h-[1.8rem] items-center gap-1 text-[9px] font-black leading-tight sm:mt-2 sm:text-[10px]">
                      <ImageIcon className="h-3 w-3 text-primary" />
                      {image.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-4 sm:p-6">
            <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-wider">
              <span className="text-primary">{product.category}</span>
              <span className="text-muted-foreground">/ {product.rank}</span>
              {product.isRental && <span className="rounded bg-primary/15 px-2 py-0.5 text-primary">Official Deadly</span>}
            </div>
            <h1 className="mt-4 text-2xl font-black leading-tight md:text-3xl">{product.title}</h1>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={shareProduct}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2 text-xs font-black transition hover:border-primary"
              >
                {shared ? <Copy className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                {shared ? "Tersalin" : "Bagikan"}
              </button>
              <button
                onClick={handleAddToCart}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2 text-xs font-black transition hover:border-primary"
              >
                {cartAdded ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                {cartAdded ? "Masuk" : "Keranjang"}
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-foreground">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <strong>{product.rating}</strong>
              </span>
              <span>Stok {product.stock}</span>
            </div>

            <div className="mt-5 rounded-xl border border-border bg-secondary p-5">
              <div className="text-xs font-bold uppercase text-muted-foreground">{product.isRental ? "Sewa mulai" : "Harga"}</div>
              <div className="mt-1 text-3xl font-black text-primary">
                {formatIDR(product.isRental && chosenDuration ? chosenDuration.price : product.price)}
              </div>
              {product.originalPrice && (
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground line-through">{formatIDR(product.originalPrice)}</span>
                  <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-bold text-primary">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </div>
              )}
            </div>

            <p className="mt-5 text-sm font-bold uppercase leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-red-500/35 bg-red-500/10 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-red-500/20 text-red-400">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-black text-red-300">FLASH SALE</div>
                  <div className="text-xs text-muted-foreground">Penawaran terbatas, segera pesan!</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1 text-center text-xs font-black text-primary">
                {["06", "17", "22"].map((time, index) => (
                  <span key={time} className="rounded bg-background px-2 py-1">{time}<span className="block text-[9px] text-muted-foreground">{["JAM", "MENIT", "DETIK"][index]}</span></span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-secondary p-3">
              <img src={logoAsset.url} alt="Admin Deadly Store" className="h-10 w-10 rounded-full object-contain" />
              <div>
                <div className="text-xs font-black uppercase text-muted-foreground">Konsultan Produk</div>
                <div className="text-sm font-black">@deadly_store25</div>
              </div>
              <ShieldCheck className="ml-auto h-4 w-4 text-primary" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <a href="https://wa.me/6285797179752" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2 text-sm font-black">
                <MessageCircle className="h-4 w-4" />
                Tanya Stok
              </a>
              <a href="https://wa.me/6285797179752" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-500/35 bg-emerald-500/15 px-3 py-2 text-sm font-black text-emerald-400">
                <Phone className="h-4 w-4" />
                WhatsApp
              </a>
            </div>

            {product.isRental && product.durations && (
              <div className="mt-5 space-y-4">
                <div>
                  <h2 className="mb-3 text-sm font-black">Pilih Durasi Rental</h2>
                  <div className="grid gap-2">
                    {product.durations.map((duration, index) => (
                      <button
                        key={duration.label}
                        onClick={() => setSelectedDuration(index)}
                        className={`rounded-xl border p-3 text-left transition ${selectedDuration === index ? "border-primary bg-primary/10" : "border-border bg-secondary hover:border-primary"}`}
                      >
                        <div className="text-xs font-black text-primary">{duration.label}</div>
                        <div className="mt-1 font-black">{formatIDR(duration.price)}</div>
                        {duration.label.includes("BEGADANG") && (
                          <div className="mt-1 text-[11px] text-muted-foreground">Tersedia mulai pukul 21:00 WIB</div>
                        )}
                        {duration.label.includes("HEMAT") && (
                          <div className="mt-1 text-[11px] text-muted-foreground">Admin akan memproses durasi ini setelah chat masuk</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-sm font-black">
                    <Users className="h-4 w-4 text-primary" />
                    Pilih Durasi Rental
                  </div>
                  <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                      <div>Pesanan aktif saat ini <strong className="text-foreground">1 order</strong></div>
                    <div className="flex items-start gap-2">
                      <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <span>Estimasi bisa dimainkan: 10 Juli 2026 pukul 01.40 WIB</span>
                    </div>
                    <div>Jika pesan sekarang, admin akan lanjut memproses urutan berikutnya.</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  {[
                    { icon: Eye, value: "10,1 rb", label: "Dilihat" },
                    { icon: ShoppingCart, value: String(product.stock), label: "Stok" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-border bg-secondary p-3">
                      <stat.icon className="mx-auto mb-1 h-4 w-4 text-primary" />
                      <div className="font-black">{stat.value}</div>
                      <div className="text-[11px] text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!product.isRental && product.durations && (
              <div className="mt-5">
                <h2 className="mb-3 text-sm font-black">Opsi Durasi</h2>
                <div className="grid grid-cols-2 gap-2">
                  {product.durations.map((duration, index) => (
                    <button
                      key={duration.label}
                      onClick={() => setSelectedDuration(index)}
                      className={`rounded-xl border p-3 text-left transition ${selectedDuration === index ? "border-primary bg-primary/10" : "border-border bg-secondary hover:border-primary"}`}
                    >
                      <div className="text-xs font-black text-primary">{duration.label}</div>
                      <div className="mt-1 font-black">{formatIDR(duration.price)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 grid gap-3">
              <a
                href={product.stock === 0 ? "https://wa.me/6285797179752" : waUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  clear();
                  add({
                    slug: product.slug,
                    title: product.isRental && chosenDuration ? `${product.title} - ${chosenDuration.label}` : product.title,
                    price: product.isRental && chosenDuration ? chosenDuration.price : product.price,
                  });
                }}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-black leading-tight text-primary-foreground transition hover:brightness-110 sm:px-6"
              >
                {product.stock === 0 ? "Chat WhatsApp" : product.isRental ? `Pesan Rental - ${formatIDR(product.isRental && chosenDuration ? chosenDuration.price : product.price)}` : `Pesan Sekarang - ${formatIDR(product.price)}`}
              </a>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs">
              {[
                { icon: ShieldCheck, label: "Garansi" },
                { icon: Zap, label: "Cepat" },
                { icon: Headphones, label: "Bantuan" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-background p-3">
                  <item.icon className="mx-auto mb-1 h-4 w-4 text-primary" />
                  {item.label}
                </div>
              ))}
            </div>
          </aside>
        </section>

        {related.length > 0 && (
          <section className="mt-12">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-black text-primary">Produk Terkait</h2>
              <Link
                to={product.isRental ? "/rental" : "/produk"}
                search={{ kategori: product.categorySlug }}
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-border bg-secondary px-4 py-2 text-xs font-black transition hover:border-primary hover:text-primary"
              >
                Lihat produk lainnya
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {related.map((item) => (
                <Link key={item.slug} to="/produk/$slug" params={{ slug: item.slug }} className="overflow-hidden rounded-xl border border-border bg-card transition hover:border-primary">
                  <div className="aspect-square bg-[var(--brand-navy-deep,var(--background))] p-6">
                    <img src={logoAsset.url} alt={item.title} className="h-full w-full object-contain" />
                  </div>
                  <div className="p-3">
                    <h3 className="min-h-[2.5rem] text-sm font-black">{item.title}</h3>
                    <div className="mt-2 font-black text-primary">{formatIDR(item.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}



