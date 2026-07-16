import { Link } from "@tanstack/react-router";
import { Gamepad2, Headphones, MessageCircle, ShieldCheck, Zap } from "lucide-react";
import logoAsset from "@/assets/deadly-logo.asset.json";
import { categories } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-[var(--brand-navy-deep,var(--background))] pb-20 pt-12 md:pb-6">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src={logoAsset.url} alt="Deadly Store" className="h-11 w-11 rounded-md object-contain" />
            <div className="leading-tight">
              <div className="text-lg font-black">Deadly</div>
              <div className="text-[10px] font-bold tracking-[0.2em] text-primary">STORE</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Katalog produk game premium dengan fokus tampilan produk dan pemesanan langsung ke WhatsApp.
          </p>
          <a
            href="https://wa.me/6285797179752"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-black text-primary-foreground"
          >
            <MessageCircle className="h-4 w-4" />
            Chat Admin
          </a>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2 font-bold">
            <Gamepad2 className="h-4 w-4 text-primary" />
            Game Tersedia
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/produk" search={{ kategori: c.slug }} className="hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4 font-bold">Menu</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/produk" className="hover:text-primary">Produk</Link></li>
            <li><Link to="/rental" className="hover:text-primary">Rental</Link></li>
            <li><Link to="/flash-sale" className="hover:text-primary">Flash Sale</Link></li>
            <li><Link to="/tentang" className="hover:text-primary">Tentang</Link></li>
            <li><Link to="/bantuan" className="hover:text-primary">Tentang</Link></li>
          </ul>
        </div>

        <div>
          <div className="mb-4 font-bold">Sinyal Trust</div>
          <div className="space-y-3 text-sm text-muted-foreground">
            {[
              { icon: ShieldCheck, text: "Transaksi aman dan data jelas" },
              { icon: Zap, text: "Proses cepat setelah pembayaran" },
              { icon: Headphones, text: "Layanan admin setiap hari" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-primary" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-border px-4 pt-5 text-xs text-muted-foreground">
        <div className="text-center leading-relaxed lg:hidden">
          <div>© {new Date().getFullYear()} Deadly Store. Gaming Premium Platform.</div>
          <div>
            Created by{" "}
            <a href="https://dibikinin.com" target="_blank" rel="noreferrer" className="font-bold text-primary">
              dibikinin.com
            </a>
          </div>
        </div>
        <div className="hidden items-center justify-between gap-4 lg:flex">
          <div>
            <div>© {new Date().getFullYear()} Deadly Store. Gaming Premium Platform.</div>
            <div className="mt-1">
              Created by{" "}
              <a href="https://dibikinin.com" target="_blank" rel="noreferrer" className="font-bold text-primary">
                dibikinin.com
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
          <Link to="/produk" className="hover:text-primary">Produk</Link>
          <Link to="/flash-sale" className="hover:text-primary">Flash Sale</Link>
          <Link to="/tentang" className="hover:text-primary">Tentang</Link>
          <Link to="/bantuan" className="hover:text-primary">Tentang</Link>
          <a href="#" className="hover:text-primary">Kebijakan Privasi</a>
          <a href="#" className="hover:text-primary">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}



