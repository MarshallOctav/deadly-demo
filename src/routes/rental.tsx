import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { HelpCircle, ShieldCheck, SlidersHorizontal, Timer, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { CategoryIcon } from "@/components/category-icon";
import { categories, rentalProducts } from "@/lib/products";

const searchSchema = z.object({
  kategori: z.string().optional(),
});

export const Route = createFileRoute("/rental")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Rental Akun - Deadly Store" }] }),
  component: RentalPage,
});

const PAGE_SIZE = 12;
const rentalCategories = categories.filter((category) => category.slug === "free-fire");

function RentalPage() {
  const { kategori } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [page, setPage] = useState(1);
  const [rank, setRank] = useState("semua");
  const [duration, setDuration] = useState("semua");
  const [sort, setSort] = useState("terbaru");
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 180);
    return () => window.clearTimeout(timer);
  }, [kategori, rank, duration, sort, page]);

  const filtered = useMemo(() => {
    const result = rentalProducts.filter((product) => {
      if (kategori && product.categorySlug !== kategori) return false;
      if (rank !== "semua" && product.rank.toLowerCase() !== rank) return false;
      if (duration !== "semua" && !product.durations?.some((item) => item.label.toLowerCase().includes(duration))) return false;
      return true;
    });

    return [...result].sort((a, b) => {
      if (sort === "termurah") return a.price - b.price;
      if (sort === "termahal") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [kategori, rank, duration, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setCategory = (value?: string) => {
    setPage(1);
    navigate({ search: { kategori: value } });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-3 py-6 sm:px-4 md:py-8">
        <div className="text-xs text-muted-foreground">Home / Rental</div>
        <h1 className="mt-3 text-2xl font-black sm:text-3xl md:text-4xl">Rental Akun</h1>

        <div className="mt-5">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button onClick={() => setCategory(undefined)} className={`min-h-9 shrink-0 rounded-full px-4 py-2 text-xs font-bold ${!kategori ? "bg-primary text-primary-foreground" : "border border-border bg-secondary"}`}>
              Semua
            </button>
            {rentalCategories.map((category) => (
              <button key={category.slug} onClick={() => setCategory(category.slug)} className={`min-h-9 shrink-0 rounded-full px-4 py-2 text-xs font-bold ${kategori === category.slug ? "bg-primary text-primary-foreground" : "border border-border bg-secondary"}`}>
                <span className="inline-flex items-center gap-1.5">
                  <CategoryIcon slug={category.slug} className="h-3.5 w-3.5" />
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="text-sm font-bold text-muted-foreground">{filtered.length} produk rental</div>
          <button onClick={() => setFilterOpen((value) => !value)} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-black text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>
        </div>

        {filterOpen && (
          <div className="mt-3 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-3">
            <SelectFilter label="Rank" value={rank} onChange={(value) => { setRank(value); setPage(1); }} options={[["semua", "Semua rank"], ["pelajar", "Pelajar"], ["reguler", "Reguler"], ["premium", "Premium"]]} />
            <SelectFilter label="Durasi" value={duration} onChange={(value) => { setDuration(value); setPage(1); }} options={[["semua", "Semua durasi"], ["1 jam", "1 Jam"], ["2 jam", "2 Jam"], ["6 jam", "6 Jam"], ["hemat", "Paket Hemat"]]} />
            <SelectFilter label="Urutkan" value={sort} onChange={(value) => { setSort(value); setPage(1); }} options={[["terbaru", "Terbaru"], ["termurah", "Termurah"], ["termahal", "Termahal"], ["rating", "Rating"]]} />
          </div>
        )}

        {loading ? (
          <ProductSkeletonGrid />
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {visible.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && <div className="py-20 text-center text-muted-foreground">Tidak ada rental yang cocok.</div>}

        <Pagination page={page} totalPages={totalPages} onPage={changePage} />

        <section className="mt-10 rounded-2xl border border-border bg-card p-4 sm:p-6">
          <h2 className="text-xl font-black sm:text-2xl">Info & FAQ Rental</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {[
              { value: "35", label: "Produk rental" },
              { value: "5", label: "Game tersedia" },
              { value: "Multi", label: "Opsi durasi" },
              { value: "Website", label: "Bantuan resmi" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-secondary p-4">
                <div className="text-2xl font-black text-primary">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { icon: Timer, title: "Durasi rental transparan", text: "Setiap produk menampilkan opsi durasi dan harga mulai yang jelas." },
              { icon: ShieldCheck, title: "Sistem bantuan terpadu", text: "Admin membantu pengiriman data akun dan kendala login." },
              { icon: Zap, title: "Kategori game rapi", text: "Akun rental dikelompokkan per judul game agar mudah dibandingkan." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-background p-5">
                <item.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-black">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            {[
              ["Apa itu rental akun?", "Kamu mendapatkan akses akun game untuk durasi tertentu sesuai opsi yang tersedia."],
              ["Apakah semua produk bisa dibeli permanen?", "Tidak selalu. Halaman rental fokus pada produk yang menyediakan opsi sewa aktif."],
              ["Bagaimana cek status rental?", "Hubungi admin lewat WhatsApp dengan detail produk yang kamu pilih."],
            ].map(([question, answer]) => (
              <div key={question} className="rounded-xl bg-secondary p-4">
                <div className="flex items-center gap-2 font-black">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  {question}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function SelectFilter({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: [string, string][] }) {
  return (
    <label className="text-xs font-black uppercase text-muted-foreground">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-secondary px-3 py-3 text-sm font-bold text-foreground outline-none">
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>{optionLabel}</option>
        ))}
      </select>
    </label>
  );
}

function ProductSkeletonGrid() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="aspect-[4/5] animate-pulse bg-secondary" />
          <div className="space-y-2 p-3">
            <div className="h-4 w-20 animate-pulse rounded bg-secondary" />
            <div className="h-4 w-full animate-pulse rounded bg-secondary" />
            <div className="h-5 w-24 animate-pulse rounded bg-secondary" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Pagination({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (page: number) => void }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-3 text-sm">
      <button disabled={page === 1} onClick={() => onPage(Math.max(1, page - 1))} className="rounded-full border border-border bg-secondary px-4 py-2 font-bold disabled:opacity-40">
        Sebelumnya
      </button>
      <span className="font-bold text-muted-foreground">Halaman {page} / {totalPages}</span>
      <button disabled={page === totalPages} onClick={() => onPage(Math.min(totalPages, page + 1))} className="rounded-full border border-border bg-secondary px-4 py-2 font-bold disabled:opacity-40">
        Selanjutnya
      </button>
    </div>
  );
}

