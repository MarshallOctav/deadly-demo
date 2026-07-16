import { Link, useNavigate } from "@tanstack/react-router";
import { Grid3X3, Home, MessageCircle, Search, ShoppingCart, X, Zap } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import logoAsset from "@/assets/deadly-logo.asset.json";
import { useCart } from "@/lib/cart";
import { allProducts, formatIDR } from "@/lib/products";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/produk", label: "Produk" },
  { to: "/rental", label: "Rental" },
  { to: "/flash-sale", label: "Flash Sale" },
  { to: "/bantuan", label: "Tentang" },
] as const;

function priceKeywords(value: number) {
  const roundedRb = Math.round(value / 1000);
  const roundedJt = Math.round(value / 1000000);
  return [
    String(value),
    formatIDR(value),
    formatIDR(value).replace(/\s/g, ""),
    `${roundedRb}rb`,
    `${roundedRb} ribu`,
    `${roundedJt}jt`,
    `${roundedJt} juta`,
  ].join(" ");
}

export function SiteHeader() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [cartPulse, setCartPulse] = useState(false);
  const [mobileNavVisible, setMobileNavVisible] = useState(true);
  const previousCount = useRef(count);
  const previousScrollY = useRef(0);
  const scrollTick = useRef<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileLinks = [
    { to: "/", label: "Beranda" },
    { to: "/produk", label: "Produk" },
    { to: "/rental", label: "Rental" },
    { to: "/flash-sale", label: "Flash Sale" },
    { to: "/bantuan", label: "Tentang" },
  ] as const;

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/produk" });
    setSearchOpen(false);
  };

  const searchResults = useMemo(() => {
    const keyword = deferredQuery.trim().toLowerCase();
    if (!keyword) return [];
    return allProducts
      .filter((product) => {
        const searchable = [
          product.title,
          product.category,
          product.rank,
          product.description,
          priceKeywords(product.price),
          product.originalPrice ? priceKeywords(product.originalPrice) : "",
        ].join(" ").toLowerCase();

        return searchable.includes(keyword);
      })
      .slice(0, 12);
  }, [deferredQuery]);

  const openSearch = () => {
    setSearchOpen(true);
  };

  useEffect(() => {
    if (count > previousCount.current) {
      setCartPulse(true);
      const timer = window.setTimeout(() => setCartPulse(false), 760);
      previousCount.current = count;
      return () => window.clearTimeout(timer);
    }
    previousCount.current = count;
  }, [count]);

  useEffect(() => {
    if (!searchOpen) return;
    const timer = window.setTimeout(() => searchInputRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [searchOpen]);

  useEffect(() => {
    previousScrollY.current = window.scrollY;

    const onScroll = () => {
      if (scrollTick.current !== null) return;
      scrollTick.current = window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const diff = currentY - previousScrollY.current;

        if (currentY < 12) {
          setMobileNavVisible(true);
        } else if (diff > 4) {
          setMobileNavVisible(false);
        } else if (diff < -4) {
          setMobileNavVisible(true);
        }

        previousScrollY.current = currentY;
        scrollTick.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTick.current !== null) {
        window.cancelAnimationFrame(scrollTick.current);
        scrollTick.current = null;
      }
    };
  }, []);

  return (
    <>
      {searchOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-background text-foreground animate-[search-panel-in_220ms_cubic-bezier(.2,.9,.2,1)_both]">
          <div className="mx-auto max-w-5xl px-3 py-4 sm:px-4 md:py-8">
            <form onSubmit={submitSearch} className="flex items-center gap-2">
              <div className="relative min-w-0 flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari semua produk Deadly Store..."
                  className="h-12 w-full rounded-2xl border border-primary/40 bg-secondary pl-12 pr-4 text-sm font-bold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/35"
                />
              </div>
              <button className="hidden min-h-12 rounded-2xl bg-primary px-5 text-sm font-black text-primary-foreground sm:inline-flex sm:items-center">
                Cari
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-border bg-secondary text-muted-foreground transition hover:border-primary hover:text-primary"
                aria-label="Tutup search"
              >
                <X className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-xl font-black">Cari Produk</h2>
                {query.trim() && (
                  <button
                    onClick={() => {
                      navigate({ to: "/produk" });
                      setSearchOpen(false);
                    }}
                    className="text-xs font-black text-primary"
                  >
                    Lihat Semua
                  </button>
                )}
              </div>
              {!query.trim() ? (
                <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm font-bold text-muted-foreground">
                  Ketik nama produk, game, atau rank untuk mulai mencari.
                </div>
              ) : searchResults.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm font-bold text-muted-foreground">Produk tidak ditemukan.</div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {searchResults.map((product) => (
                    <Link
                      key={product.slug}
                      to="/produk/$slug"
                      params={{ slug: product.slug }}
                      onClick={() => setSearchOpen(false)}
                      className="flex gap-3 rounded-xl border border-border bg-secondary p-2 transition-colors duration-200 hover:border-primary"
                    >
                      <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-[var(--brand-navy-deep,var(--background))]">
                        <img src={logoAsset.url} alt={product.title} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="w-fit rounded bg-primary/15 px-2 py-0.5 text-[10px] font-black text-primary">{product.category}</div>
                        <div className="mt-1 line-clamp-2 text-sm font-black">{product.title}</div>
                        <div className="mt-1 text-sm font-black text-primary">{formatIDR(product.price)}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="sticky top-0 z-40 shadow-[0_10px_30px_-24px_oklch(0_0_0/0.8)]">
        <header className="border-b border-border/80 bg-[var(--brand-navy-deep,var(--background))]/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2.5 md:gap-2 lg:px-4 xl:gap-3">
            <Link to="/" className="group flex shrink-0 items-center gap-2 overflow-hidden px-0.5 py-1 lg:min-w-[152px] xl:min-w-[170px]">
              <img src="/logo-icon.png" alt="Deadly Store" decoding="async" className="h-9 w-9 object-contain animate-[brand-icon-wiggle_3s_ease-in-out_infinite] md:h-10 md:w-10" />
              <div className="leading-none">
                <div className="text-base font-black tracking-wide text-foreground transition group-hover:text-primary md:text-lg">Deadly</div>
                <div className="mt-0.5 text-[9px] font-black tracking-[0.3em] text-primary md:text-[10px]">STORE</div>
              </div>
            </Link>

            <button onClick={openSearch} className="hidden h-10 min-w-[190px] items-center gap-3 rounded-full border border-primary/40 bg-secondary/70 px-4 text-left text-xs font-black text-muted-foreground transition hover:border-primary hover:bg-primary/10 lg:flex xl:min-w-[250px] xl:text-sm" aria-label="Cari produk">
              <Search className="h-4 w-4 text-primary" />
              <span className="truncate">Cari produk...</span>
            </button>

            <nav className="ml-auto hidden shrink-0 items-center rounded-full border border-border bg-secondary/40 p-1 text-xs font-black lg:flex xl:text-sm">
              {links.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="whitespace-nowrap rounded-full px-2.5 py-2 text-muted-foreground transition hover:text-primary xl:px-4"
                  activeProps={{ className: "bg-primary text-primary-foreground shadow-[0_8px_24px_-14px_oklch(0.75_0.17_60/0.9)]" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <button onClick={openSearch} className="ml-auto rounded-full border border-border bg-secondary/70 p-2 transition hover:border-primary hover:bg-primary/10 hover:text-primary lg:hidden" aria-label="Cari produk">
              <Search className="h-5 w-5" />
            </button>

            <Link to="/keranjang" className={`relative rounded-full border bg-secondary/70 p-2 transition-colors duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary ${cartPulse ? "animate-[header-cart-bounce_520ms_cubic-bezier(.2,.9,.2,1)_both] border-primary text-primary" : "border-border"}`} aria-label="Keranjang">
              <ShoppingCart className={`h-5 w-5 ${cartPulse ? "animate-[header-cart-icon_520ms_cubic-bezier(.2,.9,.2,1)_both]" : ""}`} />
              <span className={`absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ${cartPulse ? "animate-[cart-badge-pop_520ms_cubic-bezier(.2,.9,.2,1)_both]" : ""}`}>
                {count}
              </span>
            </Link>

            <Link to="/produk" className="hidden rounded-full bg-primary px-5 py-2 text-sm font-black text-primary-foreground transition hover:brightness-110 lg:inline-flex">
              Pesan
            </Link>
          </div>
        </header>
      </div>

      <nav
        className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border/80 bg-[var(--brand-navy-deep,var(--background))]/98 px-1 pb-[calc(env(safe-area-inset-bottom)+6px)] pt-1.5 text-[10px] font-black text-muted-foreground shadow-[0_-14px_34px_-28px_oklch(0_0_0/1)] backdrop-blur-md transition-all duration-300 ease-out will-change-transform md:hidden ${
          mobileNavVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        {mobileLinks.map((item, index) => {
          const Icon = [Home, Grid3X3, Zap, Zap, MessageCircle][index];
          return (
          <Link key={item.to} to={item.to} className="group relative flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-2xl px-1 text-center transition-colors hover:bg-primary/10 hover:text-primary" activeProps={{ className: "text-primary [&_.tab-indicator]:block [&_.tab-icon]:bg-primary/15 [&_.tab-label]:text-foreground" }}>
            <span className="tab-indicator absolute left-1/2 top-0 hidden h-1 w-8 -translate-x-1/2 rounded-b-full bg-primary" />
            <span className="tab-icon grid h-8 w-8 place-items-center rounded-2xl transition-colors group-hover:bg-primary/10">
              <Icon className="h-[18px] w-[18px] transition-transform group-hover:scale-105" />
            </span>
            <span className="tab-label line-clamp-1 leading-none tracking-tight">{item.label}</span>
          </Link>
          );
        })}
      </nav>
      <a
        href="https://wa.me/6285797179752"
        className="fixed bottom-20 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-200 hover:scale-[1.03] md:bottom-7 md:right-7 md:h-20 md:w-20"
        aria-label="Chat admin"
      >
        <MessageCircle className="h-6 w-6 md:h-10 md:w-10" />
      </a>
    </>
  );
}



