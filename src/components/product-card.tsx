import { useNavigate } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import { memo, useCallback } from "react";
import logoAsset from "@/assets/deadly-logo.asset.json";
import { formatIDR, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export const ProductCard = memo(function ProductCard({ product, compact = false }: ProductCardProps) {
  const navigate = useNavigate();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const openDetail = useCallback(() => {
    navigate({ to: "/produk/$slug", params: { slug: product.slug } });
  }, [navigate, product.slug]);

  return (
    <article onClick={openDetail} className="product-card group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-primary">
      <div className={`relative aspect-[4/5] overflow-hidden bg-[var(--brand-navy-deep,var(--background))] ${discount > 0 ? "ring-2 ring-red-500" : ""}`}>
        <img
          src={logoAsset.url}
          alt={product.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.025]"
        />
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded bg-red-500 px-2 py-0.5 text-[10px] font-black text-white">
          <Flame className="h-3 w-3" />
          HOT
        </span>
        <span className="absolute left-2 top-8 rounded bg-black/70 px-2 py-0.5 text-[10px] font-black text-white">{product.category}</span>
        {product.stock === 0 && (
          <span className="absolute inset-x-3 bottom-2 rounded bg-background/90 py-1 text-center text-[11px] font-black text-primary">
            Terjual
          </span>
        )}
        {discount > 0 && (
          <div className="absolute inset-x-3 bottom-2 rounded bg-black/75 py-1.5 text-center text-[11px] font-black text-primary">
            <span className="inline-flex items-center gap-1"><Flame className="h-3.5 w-3.5" /> 06:19:20</span>
          </div>
        )}
      </div>
      <div className="space-y-1.5 p-2.5 sm:space-y-2 sm:p-3">
        <div>
          <span className="rounded border border-primary/35 bg-primary/10 px-2 py-0.5 text-[10px] font-black uppercase text-primary">{product.rank}</span>
        </div>
        {product.buyer && (
          <div className="truncate rounded bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground sm:text-[11px]">
            Pembeli: {product.buyer} - {product.soldAt}
          </div>
        )}
        <h3 className="line-clamp-2 min-h-[2.2rem] text-[13px] font-black leading-snug transition group-hover:text-primary sm:min-h-[2.5rem] sm:text-sm">{product.title}</h3>
        {product.isRental && product.durations ? (
          <div className="flex flex-wrap gap-1">
            {product.durations.slice(0, compact ? 2 : 3).map((d) => (
              <span key={d.label} className="max-w-full truncate rounded bg-secondary px-1.5 py-1 text-[9px] font-bold sm:px-2 sm:text-[10px]">
                {d.label}
              </span>
            ))}
            {product.durations.length > (compact ? 2 : 3) && (
              <span className="rounded bg-primary/15 px-1.5 py-1 text-[9px] font-bold text-primary sm:px-2 sm:text-[10px]">
                + {product.durations.length - (compact ? 2 : 3)}
              </span>
            )}
          </div>
        ) : null}
        <div className="pt-1">
          <div>
            {product.originalPrice && (
              <div className="text-[11px] text-muted-foreground line-through">{formatIDR(product.originalPrice)}</div>
            )}
            <div className="text-[13px] font-black leading-tight text-primary sm:text-base">{formatIDR(product.price)}</div>
            {product.originalPrice && (
              <div className="text-[10px] font-bold text-emerald-400">Hemat {formatIDR(product.originalPrice - product.price)}</div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
});



