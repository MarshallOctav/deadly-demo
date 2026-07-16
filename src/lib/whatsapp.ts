import type { CartItem } from "@/lib/cart";
import { formatIDR, type Product } from "@/lib/products";

export const ADMIN_WHATSAPP = "6285797179752";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function productWhatsAppMessage(product: Product, duration?: { label: string; price: number }) {
  const price = duration?.price ?? product.price;
  return [
    "Halo admin Deadly Store, saya mau pesan produk ini:",
    "",
    `Produk: ${product.title}`,
    `Kategori: ${product.category}`,
    `Rank: ${product.rank}`,
    duration ? `Durasi: ${duration.label}` : "",
    `Harga: ${formatIDR(price)}`,
    "",
    "Mohon info ketersediaan dan proses ordernya.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildProductWhatsAppUrl(product: Product, duration?: { label: string; price: number }) {
  return buildWhatsAppUrl(productWhatsAppMessage(product, duration));
}

export function cartWhatsAppMessage(
  items: CartItem[],
  total: number,
  buyer?: { name: string; email: string; phone: string },
  orderId?: string,
) {
  return [
    "Halo admin Deadly Store, saya mau pesan:",
    orderId ? `Invoice lokal: ${orderId}` : "",
    buyer?.name ? `Nama: ${buyer.name}` : "",
    buyer?.phone ? `WhatsApp: ${buyer.phone}` : "",
    buyer?.email ? `Email: ${buyer.email}` : "",
    "",
    ...items.map((item, index) => `${index + 1}. ${item.title} - ${formatIDR(item.price)}`),
    "",
    `Total: ${formatIDR(total)}`,
    "",
    "Mohon dibantu cek stok dan proses pembayarannya.",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

