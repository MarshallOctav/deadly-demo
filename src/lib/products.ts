export type Product = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  rank: string;
  price: number;
  originalPrice?: number;
  rating: number;
  sold: number;
  stock: number;
  description: string;
  features: string[];
  binding: string;
  isRental?: boolean;
  durations?: { label: string; price: number }[];
  badge?: string;
  buyer?: string;
  soldAt?: string;
};

export type Category = {
  slug: string;
  name: string;
  count: number;
};

export const categories: Category[] = [
  { slug: "free-fire", name: "Free Fire", count: 86 },
  { slug: "mlbb", name: "MLBB", count: 34 },
];

const ffFeatures = [
  "Full akses akun",
  "Data sesuai deskripsi",
  "Bisa cek video/foto sebelum bayar",
  "Garansi bantuan login",
  "Proses kirim cepat",
];

export const products: Product[] = [
  {
    slug: "free-fire-n732",
    title: "FREE FIRE N732",
    category: "Free Fire",
    categorySlug: "free-fire",
    rank: "Pelajar",
    price: 700000,
    rating: 5,
    sold: 18,
    stock: 1,
    description: "Akun Free Fire siap pakai dengan spek pelajar, cocok untuk push rank dan koleksi bundle harian.",
    features: ffFeatures,
    binding: "Facebook",
  },
  {
    slug: "free-fire-n731",
    title: "FREE FIRE N731",
    category: "Free Fire",
    categorySlug: "free-fire",
    rank: "Pelajar",
    price: 700000,
    rating: 4.9,
    sold: 21,
    stock: 1,
    description: "Akun Free Fire pelajar dengan data aman dan siap proses cepat lewat admin.",
    features: ffFeatures,
    binding: "Facebook",
  },
  {
    slug: "free-fire-n730",
    title: "FREE FIRE N730",
    category: "Free Fire",
    categorySlug: "free-fire",
    rank: "Pelajar",
    price: 650000,
    rating: 5,
    sold: 27,
    stock: 1,
    description: "Akun Free Fire ekonomis dengan koleksi aktif, cocok untuk pemakaian harian.",
    features: ffFeatures,
    binding: "Google",
  },
  {
    slug: "free-fire-n729",
    title: "FREE FIRE N729",
    category: "Free Fire",
    categorySlug: "free-fire",
    rank: "Pelajar",
    price: 650000,
    rating: 4.8,
    sold: 16,
    stock: 1,
    description: "Akun Free Fire pilihan pelajar, harga ringan dan proses transaksi cepat.",
    features: ffFeatures,
    binding: "Facebook",
  },
  {
    slug: "free-fire-s296",
    title: "FREE FIRE S296",
    category: "Free Fire",
    categorySlug: "free-fire",
    rank: "Premium",
    price: 2500000,
    rating: 5,
    sold: 11,
    stock: 1,
    description: "Akun Free Fire premium dengan koleksi lebih lengkap untuk pembeli yang ingin akun sultan.",
    features: ["Bundle premium", "Skin senjata pilihan", "Full akses", "Aman cek data", "Garansi bantuan login"],
    binding: "Facebook",
  },
  {
    slug: "free-fire-s298",
    title: "FREE FIRE S298",
    category: "Free Fire",
    categorySlug: "free-fire",
    rank: "Premium",
    price: 5000000,
    rating: 5,
    sold: 7,
    stock: 1,
    description: "Akun Free Fire premium spek tinggi dengan koleksi langka dan data lengkap.",
    features: ["Koleksi sultan", "Bundle langka", "Skin senjata banyak", "Full akses", "Garansi bantuan login"],
    binding: "Facebook",
  },
  {
    slug: "free-fire-s297",
    title: "FREE FIRE S297",
    category: "Free Fire",
    categorySlug: "free-fire",
    rank: "Pelajar",
    price: 1300000,
    rating: 4.9,
    sold: 1,
    stock: 0,
    description: "Akun Free Fire sudah terjual, ditampilkan sebagai contoh riwayat transaksi toko.",
    features: ffFeatures,
    binding: "Facebook",
    badge: "Terjual",
    buyer: "W***",
    soldAt: "Hari ini, 23:43 WIB",
  },
  {
    slug: "mlbb-r222",
    title: "MLBB R222",
    category: "MLBB",
    categorySlug: "mlbb",
    rank: "Premium",
    price: 5300000,
    originalPrice: 6500000,
    rating: 5,
    sold: 8,
    stock: 2,
    description: "Akun MLBB premium dengan koleksi skin tebal, rank tinggi, dan full akses.",
    features: ["Rank tinggi", "Banyak skin epic", "Hero lengkap", "Full akses", "Garansi bantuan login"],
    binding: "Moonton",
    badge: "Flash Sale",
  },
  {
    slug: "free-fire-rr010",
    title: "FREE FIRE RR010",
    category: "Free Fire",
    categorySlug: "free-fire",
    rank: "Reguler",
    price: 1400000,
    originalPrice: 1900000,
    rating: 5,
    sold: 24,
    stock: 1,
    description: "Akun Free Fire reguler promo flash sale dengan harga hemat.",
    features: ffFeatures,
    binding: "Google",
    badge: "Flash Sale",
  },
  {
    slug: "free-fire-c80",
    title: "FREE FIRE C80",
    category: "Free Fire",
    categorySlug: "free-fire",
    rank: "Pelajar",
    price: 1050000,
    originalPrice: 1200000,
    rating: 4.9,
    sold: 31,
    stock: 3,
    description: "Akun Free Fire promo panas dengan potongan harga dan stok terbatas.",
    features: ffFeatures,
    binding: "Facebook",
    badge: "HOT",
  },
  {
    slug: "free-fire-c78",
    title: "FREE FIRE C78",
    category: "Free Fire",
    categorySlug: "free-fire",
    rank: "Reguler",
    price: 1400000,
    originalPrice: 1500000,
    rating: 5,
    sold: 19,
    stock: 2,
    description: "Akun Free Fire reguler dengan diskon khusus hari ini.",
    features: ffFeatures,
    binding: "Facebook",
    badge: "HOT",
  },
  {
    slug: "free-fire-c75",
    title: "FREE FIRE C75",
    category: "Free Fire",
    categorySlug: "free-fire",
    rank: "Pelajar",
    price: 800000,
    originalPrice: 1000000,
    rating: 4.8,
    sold: 22,
    stock: 4,
    description: "Akun Free Fire pelajar dengan harga flash sale.",
    features: ffFeatures,
    binding: "Google",
    badge: "HOT",
  },
  {
    slug: "mlbb-rental-preview",
    title: "MLBB RANKED HEMAT",
    category: "MLBB",
    categorySlug: "mlbb",
    rank: "Rental",
    price: 35000,
    rating: 5,
    sold: 42,
    stock: 6,
    description: "Akun MLBB rental untuk coba akun rank tinggi tanpa beli permanen.",
    features: ["Durasi fleksibel", "Data dikirim setelah bayar", "Bantuan admin", "Cocok coba skin", "Akses sesuai slot"],
    binding: "Moonton",
    isRental: true,
    durations: [
      { label: "1 JAM", price: 30000 },
      { label: "2 JAM", price: 40000 },
      { label: "3 JAM", price: 50000 },
      { label: "6 Jam", price: 75000 },
      { label: "PAKET BEGADANG 9 JAM 21:00-06:00 WIB", price: 90000 },
      { label: "PAKET HEMAT 12 JAM", price: 110000 },
    ],
  },
];

export const rentalProducts: Product[] = Array.from({ length: 35 }, (_, i) => {
  const no = String(35 - i).padStart(2, "0");
  const premium = i % 6 === 0;
  const pelajar = i % 3 === 0;
  const price = 30000;
  return {
    slug: `free-fire-rental-${no}`,
    title: `FREE FIRE RENTAL ${no}`,
    category: "Free Fire",
    categorySlug: "free-fire",
    rank: premium ? "Premium" : pelajar ? "Pelajar" : "Reguler",
    price,
    rating: 5,
    sold: 12 + i,
    stock: 1,
    description: "Akun rental Free Fire dengan durasi fleksibel dan bantuan admin sampai bisa login.",
    features: ["1 jam sampai 1 bulan", "Slot terbatas", "Data dikirim setelah bayar", "Bantuan login", "Cocok coba akun sultan"],
    binding: "Facebook",
    isRental: true,
    durations: [
      { label: "1 JAM", price },
      { label: "2 JAM", price: 40000 },
      { label: "3 JAM", price: 50000 },
      { label: "6 Jam", price: 75000 },
      { label: "PAKET BEGADANG 9 JAM 21:00-06:00 WIB", price: 90000 },
      { label: "PAKET HEMAT 12 JAM", price: 110000 },
    ],
  };
});

export const allProducts = [...products, ...rentalProducts];
export const flashSaleProducts = products.filter((p) => p.originalPrice);
export const soldProducts = allProducts.filter((p) => p.stock === 0 || p.badge?.toLowerCase() === "terjual");

export const infoCards = [
  { title: "Info Terbaru 1", desc: "Update stok akun premium, jadwal promo, dan info nomor resmi Deadly Store.", count: 6 },
  { title: "Info Terbaru 2", desc: "Pengumuman flash sale dan katalog rental akun game premium.", count: 6 },
  { title: "Info Terbaru 3", desc: "Panduan transaksi aman, bukti transfer, dan bantuan order.", count: 6 },
];

export const quickLinks = [
  { title: "Free Fire", desc: "Produk utama paling lengkap" },
  { title: "FF 100rb - 2jt", desc: "Akun harga pelajar sampai reguler" },
  { title: "FF 2jt - 100jt", desc: "Akun sultan dan koleksi premium" },
  { title: "Stok Akun", desc: "Cari akun spek terlengkap" },
  { title: "Testimoni / Sold", desc: "Riwayat akun terjual" },
];

export const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export const getProduct = (slug: string) => allProducts.find((p) => p.slug === slug);
export const getByCategory = (catSlug: string) => allProducts.filter((p) => p.categorySlug === catSlug);

