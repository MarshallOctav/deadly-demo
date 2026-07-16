import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ShoppingBag, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { allProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { CategoryIcon } from "@/components/category-icon";

const searchSchema = z.object({
  kategori: z.string().optional(),
  harga: z.string().optional(),
  stock: z.string().optional(),
});

export const Route = createFileRoute("/produk")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Semua Produk - Deadly Store" },
      { name: "description", content: "Katalog akun game murah dan terpercaya di Deadly Store." },
    ],
  }),
  component: ProdukPage,
});

const PAGE_SIZE = 12;
const productGroups = [
  { label: "Free Fire", kategori: "free-fire", harga: undefined },
  { label: "FF 100rb - 2jt", kategori: "free-fire", harga: "low" },
  { label: "FF 2jt - 100jt", kategori: "free-fire", harga: "high" },
  { label: "Mobile Legends", kategori: "mlbb", harga: undefined },
  { label: "Produk Terjual", kategori: undefined, harga: undefined, stock: "sold" },
];

function ProdukPage() {
  const { kategori, harga, stock: stockSearch } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [rank, setRank] = useState("semua");
  const [sort, setSort] = useState("terbaru");
  const [stock, setStock] = useState(stockSearch ?? "semua");
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 180);
    return () => window.clearTimeout(timer);
  }, [kategori, harga, rank, sort, stock, page]);

  useEffect(() => {
    setStock(stockSearch ?? "semua");
    setPage(1);
  }, [stockSearch]);

  const filtered = useMemo(() => {
    const result = allProducts.filter((product) => {
      if (kategori && product.categorySlug !== kategori) return false;
      if (harga === "low" && (product.price < 100000 || product.price > 2000000)) return false;
      if (harga === "high" && (product.price <= 2000000 || product.price > 100000000)) return false;
      if (rank !== "semua" && product.rank.toLowerCase() !== rank) return false;
      if (stock === "ready" && product.stock === 0) return false;
      if (stock === "sold" && product.stock > 0) return false;
      return true;
    });

    return [...result].sort((a, b) => {
      if (sort === "termurah") return a.price - b.price;
      if (sort === "termahal") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [kategori, harga, rank, sort, stock]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setGroup = (value?: { kategori?: string; harga?: string; stock?: string }) => {
    setPage(1);
    navigate({ search: { kategori: value?.kategori, harga: value?.harga, stock: value?.stock } });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 md:py-8">
        <div className="text-sm text-muted-foreground">Home / Katalog</div>
        <h1 className="mt-4 flex items-center gap-2 text-2xl font-black sm:text-3xl md:text-4xl">
          <ShoppingBag className="h-6 w-6 text-primary" />
          Katalog
        </h1>

        <div className="mt-5">
          <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <button onClick={() => setGroup(undefined)} className={`min-h-9 shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-bold sm:px-4 sm:text-xs ${!kategori && !harga && stock === "semua" ? "bg-primary text-primary-foreground" : "border border-border bg-secondary"}`}>
              Semua
            </button>
            {productGroups.map((group) => (
              <button key={`${group.kategori ?? "all"}-${group.harga ?? "all"}-${group.stock ?? "all"}`} onClick={() => setGroup(group)} className={`min-h-9 shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-bold sm:px-4 sm:text-xs ${kategori === group.kategori && harga === group.harga && stock === (group.stock ?? "semua") ? "bg-primary text-primary-foreground" : "border border-border bg-secondary"}`}>
                <span className="inline-flex items-center justify-center gap-1.5">
                  <CategoryIcon slug={group.kategori ?? "free-fire"} className="h-3.5 w-3.5" />
                  {group.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="text-sm font-bold text-muted-foreground">{filtered.length} produk</div>
          <button onClick={() => setFilterOpen((value) => !value)} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-black text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>
        </div>

        {filterOpen && (
          <div className="mt-3 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-3">
            <SelectFilter label="Rank" value={rank} onChange={(value) => { setRank(value); setPage(1); }} options={[["semua", "Semua rank"], ["pelajar", "Pelajar"], ["reguler", "Reguler"], ["premium", "Premium"], ["rental", "Rental"]]} />
            <SelectFilter label="Status" value={stock} onChange={(value) => { setStock(value); setPage(1); }} options={[["semua", "Semua status"], ["ready", "Ready"], ["sold", "Terjual"]]} />
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

        {!loading && filtered.length === 0 && <div className="py-20 text-center text-muted-foreground">Tidak ada akun yang cocok.</div>}

        <Pagination page={page} totalPages={totalPages} onPage={changePage} />
      </div>
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

