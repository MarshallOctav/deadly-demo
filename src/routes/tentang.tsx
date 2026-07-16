import { createFileRoute, Link } from "@tanstack/react-router";
import { Facebook, Gamepad2, Instagram, Mail, MapPin, MessageCircle, ShieldCheck, Target, UserRound, Youtube, Zap, type LucideIcon } from "lucide-react";
import logoAsset from "@/assets/deadly-logo.asset.json";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: [
      { title: "Tentang - Deadly Store" },
      { name: "description", content: "Tentang Deadly Store, tujuan, latar belakang, admin, lokasi, dan kontak resmi." },
    ],
  }),
  component: TentangPage,
});

function TentangPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-[var(--brand-navy-deep,var(--background))]">
          <div className="mx-auto grid max-w-7xl gap-5 px-3 py-8 sm:px-4 md:grid-cols-[1fr_340px] md:gap-8 md:py-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-black text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                Tentang Deadly Store
              </div>
              <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl md:text-6xl">
                Katalog produk game premium dengan order langsung ke WhatsApp.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Deadly Store dibuat untuk membantu gamer menemukan akun game yang sesuai kebutuhan dengan tampilan katalog yang rapi, statis, dan ringan.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/produk" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 py-3 text-center text-sm font-black leading-tight text-primary-foreground">
                  Lihat Produk
                </Link>
                <Link to="/bantuan" className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-secondary px-5 py-3 text-center text-sm font-black leading-tight">
                  Hubungi Bantuan
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
              <img src={logoAsset.url} alt="Deadly Store" className="mx-auto aspect-square max-h-52 w-full object-contain sm:max-h-72" />
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                {[
                  ["2026", "Mulai"],
                  ["24/7", "Admin"],
                  ["100%", "Online"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl bg-secondary p-3">
                    <div className="text-lg font-black text-primary">{value}</div>
                    <div className="text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-3 py-8 sm:px-4 md:py-10">
          <div className="grid gap-3 sm:gap-5 md:grid-cols-3">
              {[ 
              { icon: Target, title: "Tujuan", text: "Menjadi katalog akun game yang mudah dipindai dan cepat dipilih." },
              { icon: Gamepad2, title: "Latar Belakang", text: "Dibuat untuk memusatkan tampilan produk tanpa alur akun yang rumit." },
              { icon: Zap, title: "Cara Kerja", text: "User pilih produk, lalu order lewat WhatsApp admin." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-4 sm:p-6">
                <item.icon className="h-7 w-7 text-primary" />
                <h2 className="mt-4 text-xl font-black">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-3 pb-10 sm:px-4 lg:grid-cols-[380px_1fr] lg:gap-6">
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/15 text-primary">
                <UserRound className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-xl font-black sm:text-2xl">Admin Deadly Store</h2>
                <p className="text-sm text-muted-foreground">Owner & pengelola transaksi</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Admin bertugas mengelola stok, menjawab pertanyaan produk, dan menerima pesanan lewat WhatsApp.
            </p>
            <div className="mt-5 grid gap-3 text-sm">
              <Info icon={MapPin} label="Lokasi" value="Jakarta, Indonesia" />
              <Info icon={MessageCircle} label="WhatsApp" value="+62 857-9717-9752" />
              <Info icon={Mail} label="Email" value="cs@deadlystore.id" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
            <h2 className="text-xl font-black sm:text-2xl">Nilai Layanan</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[ 
                ["Transparan", "Informasi produk, harga, stok, dan durasi rental dibuat mudah dibaca."],
                ["Responsif", "Admin siap membantu dari proses pilih akun sampai order terkirim."],
                ["Aman", "Pesanan tersimpan lokal di browser sebelum dikirim ke WhatsApp."],
                ["Fokus Gamer", "Katalog disusun berdasarkan kebutuhan gamer: akun jual, rental, dan flash sale."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-xl bg-secondary p-4">
                  <h3 className="font-black text-primary">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-3 pb-12 sm:px-4">
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
            <h2 className="text-xl font-black sm:text-2xl">Sosial Media & Kontak Resmi</h2>
            <p className="mt-2 text-sm text-muted-foreground">Ikuti kanal resmi untuk update stok, promo, dan kabar terbaru.</p>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { icon: Instagram, label: "Instagram", value: "@deadly_store25", href: "#" },
                { icon: Facebook, label: "Facebook", value: "Deadly Store", href: "#" },
                { icon: Youtube, label: "YouTube", value: "Deadly Store Official", href: "#" },
                { icon: MessageCircle, label: "WhatsApp", value: "Chat Admin", href: "https://wa.me/6285797179752" },
              ].map((item) => (
                <a key={item.label} href={item.href} className="rounded-xl border border-border bg-secondary p-4 transition hover:border-primary">
                  <item.icon className="h-5 w-5 text-primary" />
                  <div className="mt-3 font-black">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.value}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-secondary p-3">
      <Icon className="h-4 w-4 text-primary" />
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-bold">{value}</div>
      </div>
    </div>
  );
}



