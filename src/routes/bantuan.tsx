import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BadgeCheck, MessageCircle, Store, Users } from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/deadly-logo.asset.json";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/bantuan")({
  head: () => ({
    meta: [
      { title: "Tentang Deadly Store" },
      {
        name: "description",
        content: "Tentang Deadly Store, daftar link resmi, grup, dan WhatsApp admin.",
      },
    ],
  }),
  component: BantuanPage,
});

type TabId = "wa-admin" | "grup-jb" | "grup-stock";

const tabs = [
  { id: "wa-admin", label: "WA Admin", icon: MessageCircle, count: "5 Link" },
  { id: "grup-jb", label: "Grup JB", icon: Users, count: "3 Grup" },
  { id: "grup-stock", label: "Grup Stock", icon: Store, count: "7 Grup" },
] as const;

const adminLinks = [
  { title: "WA Admin Utama", desc: "Chat admin utama Deadly Store", href: "https://wa.me/6285797179752", badge: "ADMIN" },
  { title: "WA Admin Backup", desc: "Cadangan jika admin utama sibuk", href: "https://wa.me/6285797179752", badge: "ADMIN" },
  { title: "WA CS / Laporan", desc: "Bantuan customer service & laporan", href: "https://wa.me/6285797179752", badge: "CS" },
  { title: "Saluran Deadly", desc: "Channel WhatsApp resmi", href: "https://wa.me/6285797179752", badge: "SAL" },
  { title: "Website Deadly", desc: "Lihat katalog produk", href: "/produk", badge: "WEB" },
] as const;

const jbGroups = [
  { title: "JB Deadly 1", desc: "Grup jual beli akun aktif" },
  { title: "JB Deadly 2", desc: "Info jual beli dan update akun" },
  { title: "JB Deadly 3", desc: "Diskusi stok, transaksi, dan promo" },
] as const;

const stockGroups = [
  { title: "Stock Deadly 1", desc: "Daftar stok aktif dan produk baru" },
  { title: "Stock Deadly 2", desc: "Update akun ready dan promo cepat habis" },
  { title: "Stock Deadly 3", desc: "Notifikasi stok masuk terbaru" },
  { title: "Stock Deadly 4", desc: "Info listing akun premium" },
  { title: "Stock Deadly 5", desc: "Update stok rental dan jual" },
  { title: "Stock Deadly 6", desc: "Kabar produk cepat update" },
  { title: "Stock Deadly 7", desc: "Rangkuman stok mingguan" },
] as const;

function BantuanPage() {
  const [activeTab, setActiveTab] = useState<TabId>("wa-admin");
  const isAdminTab = activeTab === "wa-admin";

  const activeTabData =
    isAdminTab
      ? {
          icon: MessageCircle,
          title: "WA Admin",
          desc: "Nomor admin, CS laporan, saluran, dan website resmi",
        }
      : activeTab === "grup-jb"
        ? {
            icon: Users,
            title: "Grup JB",
            desc: "Daftar grup jual beli Deadly Store",
          }
        : {
            icon: Store,
            title: "Grup Stock",
            desc: "Daftar grup stock Deadly Store",
          };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-[430px] px-3 pb-12 pt-4 sm:max-w-[520px] sm:px-4 md:max-w-2xl">
        <section className="rounded-[28px] border border-border bg-[var(--brand-navy-deep,var(--background))] px-4 py-5 sm:px-5 sm:py-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-black text-primary deadly-pop">
              <BadgeCheck className="h-3.5 w-3.5" />
              Tentang Deadly Store
            </div>

            <img
              src={logoAsset.url}
              alt="Deadly Store"
              className="mx-auto mt-5 h-24 w-24 rounded-full border-4 border-primary/35 object-contain shadow-[var(--shadow-glow)] deadly-avatar"
            />

            <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.38em] text-primary deadly-rise">
              Deadly Store
              <img src="/secure.gif" alt="Secure" className="h-4 w-4 object-contain" />
            </div>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground deadly-rise" style={{ animationDelay: "160ms" }}>
              WA admin, grup JB, grup stok, dan link resmi ada di sini.
            </p>
            <div className="mx-auto mt-4 h-1.5 w-40 overflow-hidden rounded-full bg-white/10 deadly-rise" style={{ animationDelay: "210ms" }}>
              <div className="h-full w-1/2 rounded-full deadly-shimmer" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`deadly-rise rounded-[20px] border px-2.5 py-3 text-center transition ${isActive ? "border-primary/40 bg-primary text-primary-foreground" : "border-border bg-card"}`}
                  style={{ animationDelay: `${240 + index * 70}ms` }}
                  aria-pressed={isActive}
                >
                  <Icon className={`mx-auto h-4 w-4 ${isActive ? "text-primary-foreground" : "text-primary"}`} />
                  <div className={`mt-2 text-[12px] font-semibold leading-tight ${isActive ? "text-primary-foreground" : ""}`}>{tab.label}</div>
                  <div className={`mt-0.5 text-[10px] font-medium tracking-wide ${isActive ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
                    {tab.count}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-6">
          <div className="mb-3 flex items-center gap-3 px-1 deadly-rise" style={{ animationDelay: "480ms" }}>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary deadly-float">
              <activeTabData.icon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black leading-tight sm:text-xl">{activeTabData.title}</h2>
              <p className="text-sm text-muted-foreground">{activeTabData.desc}</p>
            </div>
          </div>

          <div className="space-y-3">
            {isAdminTab
              ? adminLinks.map((item, index) =>
                  item.href === "/produk" ? (
                    <Link
                      key={item.title}
                      to="/produk"
                      className="deadly-rise flex items-center gap-3 rounded-[22px] border border-primary/40 bg-secondary px-3 py-3.5 transition hover:border-primary"
                      style={{ animationDelay: `${560 + index * 70}ms` }}
                    >
                      <img src={logoAsset.url} alt="" aria-hidden="true" className="h-12 w-12 shrink-0 rounded-2xl object-contain deadly-pop" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <div className="truncate text-base font-black leading-tight">{item.title}</div>
                          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-black text-primary">{item.badge}</span>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">{item.desc}</div>
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-primary" />
                    </Link>
                  ) : (
                    <a
                      key={item.title}
                      href={item.href}
                      className="deadly-rise flex items-center gap-3 rounded-[22px] border border-border bg-card px-3 py-3.5 transition hover:border-primary"
                      style={{ animationDelay: `${560 + index * 70}ms` }}
                    >
                      <img src={logoAsset.url} alt="" aria-hidden="true" className="h-12 w-12 shrink-0 rounded-2xl object-contain deadly-pop" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <div className="truncate text-base font-black leading-tight">{item.title}</div>
                          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-black text-primary">{item.badge}</span>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">{item.desc}</div>
                      </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-primary" />
                  </a>
                ),
              )
              : (activeTab === "grup-jb" ? jbGroups : stockGroups).map((item, index) => (
                  <div
                    key={item.title}
                    className="deadly-rise flex items-center gap-3 rounded-[22px] border border-border bg-card px-3 py-3.5"
                    style={{ animationDelay: `${560 + index * 70}ms` }}
                  >
                    <img src={logoAsset.url} alt="" aria-hidden="true" className="h-12 w-12 shrink-0 rounded-2xl object-contain deadly-pop" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-base font-black leading-tight">{item.title}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
