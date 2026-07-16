# Dokumentasi Alur User dan Pembayaran Imron Shop

Dokumen ini menjelaskan alur frontend yang dipakai di project Imron Shop, terutama dari user melihat produk sampai pembayaran masuk status diproses oleh admin.

## Ringkasan Sistem

Imron Shop adalah website jual beli dan rental akun game. User bisa melihat produk, membuka detail, menambahkan ke keranjang, login, checkout, upload bukti pembayaran, lalu menunggu validasi admin.

Sistem pembayaran saat ini masih dummy/manual. Tidak ada payment gateway asli. User memilih metode pembayaran, transfer manual, lalu upload bukti transfer.

## Role

### User
- Melihat produk dan rental.
- Melihat detail produk.
- Menyukai produk.
- Menambahkan produk ke keranjang.
- Login atau daftar sebelum membeli.
- Checkout.
- Upload bukti pembayaran.
- Melihat status pesanan.
- Melihat struk/status pembayaran.

### Admin
- Belum ada halaman admin penuh.
- Secara konsep, admin harus memeriksa bukti transfer.
- Admin nanti yang mengubah status dari `processing` menjadi `paid`.

## Status Order

### `pending`
Order sudah dibuat, tapi user belum upload bukti pembayaran.

### `processing`
User sudah upload bukti transfer. Pesanan masuk tahap diproses dan menunggu acc admin.

### `paid`
Pembayaran sudah divalidasi admin. Status ini untuk order yang sudah benar-benar lunas.

### `failed`
Pembayaran gagal atau ditolak.

## Alur Utama Pembelian Produk

1. User membuka halaman home.
2. User memilih produk dari section produk, flash sale, produk sold, atau katalog.
3. User masuk ke halaman detail produk.
4. User klik tombol `Beli Sekarang`.
5. Sistem mengecek apakah user sudah login.
6. Jika belum login, user diarahkan ke halaman login.
7. Setelah login, user diarahkan kembali ke proses checkout.
8. Di checkout, user mengisi data pembeli:
   - Nama lengkap
   - Email
   - Nomor WhatsApp
9. User memilih metode pembayaran manual.
10. Sistem membuat order dengan status `pending`.
11. User diarahkan ke halaman pembayaran.
12. User transfer sesuai metode yang dipilih.
13. User upload bukti transfer.
14. Setelah bukti dikirim, status order berubah menjadi `processing`.
15. User diarahkan ke halaman struk/status pembayaran.
16. Struk menampilkan bahwa pembayaran sedang diproses dan menunggu acc admin.
17. Admin nanti memeriksa bukti transfer.
18. Jika valid, admin mengubah status menjadi `paid`.

## Alur Rental Akun

1. User membuka halaman rental.
2. User memilih akun rental.
3. User masuk ke detail produk rental.
4. User memilih durasi rental.
5. User klik `Rental Sekarang`.
6. Sistem memasukkan item rental ke checkout sesuai durasi yang dipilih.
7. Alur setelah itu sama seperti pembelian produk:
   - Login jika belum login
   - Checkout
   - Pilih metode pembayaran
   - Upload bukti
   - Status menjadi `processing`
   - Menunggu acc admin

## Alur Keranjang

1. User membuka detail produk.
2. User klik `Keranjang`.
3. Produk masuk ke keranjang.
4. User membuka halaman keranjang.
5. User klik checkout.
6. Jika belum login, user diarahkan ke login.
7. Setelah login, user lanjut ke checkout.
8. Order dibuat setelah data pembeli dan metode pembayaran selesai.

Catatan: semua produk bersifat satuan, jadi tidak ada fitur plus/minus quantity.

## Alur Login Redirect

Beberapa aksi wajib login:
- Beli produk
- Rental produk
- Checkout
- Komentar di kabar/feed
- Akses profil/akun

Jika user belum login, sistem mengarahkan ke `/masuk`.

Idealnya halaman login membawa parameter `redirect`, sehingga setelah login user kembali ke halaman asal.

Contoh:
- Dari profil: `/masuk?redirect=/profil`
- Dari checkout: `/masuk?redirect=/checkout`
- Dari detail produk: kembali ke checkout setelah produk dimasukkan ke keranjang
- Dari kabar/feed: kembali ke `/kabar`

## Alur Pembayaran Manual

Metode pembayaran yang tersedia:
- DANA
- GoPay
- Mandiri
- QRIS

Alur:
1. User memilih metode pembayaran di checkout.
2. User diarahkan ke halaman pembayaran order.
3. Halaman pembayaran menampilkan:
   - Nomor invoice
   - Metode pembayaran
   - Nomor tujuan atau QRIS dummy
   - Nama pemilik rekening/e-wallet
   - Total bayar
   - Upload bukti transfer
4. User upload bukti transfer.
5. Sistem menyimpan bukti dalam order.
6. Sistem mengubah status menjadi `processing`.
7. User diarahkan ke halaman struk/status.

## Halaman Struk

Halaman struk saat ini bukan bukti pembayaran final.

Jika status order `processing`, struk harus menampilkan:
- Bukti transfer sudah diterima.
- Pesanan sedang diproses.
- Menunggu acc admin.

Jika status order `paid`, struk boleh menampilkan:
- Pembayaran lunas.
- Order selesai/berhasil.

## Data Order

Struktur order utama:

```ts
{
  id: string;
  userId: string | null;
  items: {
    slug: string;
    title: string;
    price: number;
    qty: number;
  }[];
  total: number;
  buyer: {
    name: string;
    email: string;
    phone: string;
  };
  payment: string;
  status: "pending" | "processing" | "paid" | "failed";
  createdAt: number;
  submittedAt?: number;
  paidAt?: number;
  proofImage?: string;
  gateway?: {
    provider: string;
    transactionId: string;
    reference: string;
    channel: string;
    note: string;
  };
}
```

## Halaman yang Terlibat

### Home
Menampilkan banner, shortcut, info terbaru, flash sale, produk terbaru, produk sold, rental akun, dan kategori game.

### Produk
Menampilkan semua produk, filter kategori, filter harga, filter status ready/sold, pagination, dan produk terjual.

### Detail Produk
Menampilkan gambar, informasi produk, harga, stok, fitur share, suka, keranjang, dan tombol beli/rental.

### Keranjang
Menampilkan produk yang dipilih sebelum checkout.

### Checkout
Mengumpulkan data pembeli dan metode pembayaran.

### Pembayaran
Menampilkan instruksi transfer dan upload bukti pembayaran.

### Sukses / Struk
Menampilkan struk/status pembayaran. Untuk upload bukti baru, statusnya `processing`, bukan `paid`.

### Pesanan
Menampilkan riwayat order user dan status order.

### Profil / Akun
Menampilkan profil user, wishlist, keranjang, riwayat pesanan, pengaturan dummy, dan upload foto profil.

### Kabar
Feed seperti komunitas/testimoni. User bisa like, komentar, dan share. Komentar wajib login.

## Yang Harus Ada di Admin Nanti

### Dashboard
- Total order
- Order pending
- Order processing
- Order paid
- Total omzet
- Produk sold
- Produk stok aktif

### Verifikasi Pembayaran
- Lihat order `processing`
- Lihat bukti transfer
- Approve menjadi `paid`
- Reject menjadi `failed`
- Catatan admin

### Produk
- Tambah produk
- Edit produk
- Hapus produk
- Tandai produk sold
- Upload foto produk
- Atur stok

### Rental
- Tambah akun rental
- Edit durasi rental
- Aktif/nonaktif rental
- Kelola antrian

### Feed / Kabar
- Admin posting kabar
- Edit posting
- Hapus komentar
- Pin posting

### User
- Lihat data user
- Lihat riwayat order user
- Blokir user
- Reset password dummy

## Catatan Penting

- Payment gateway masih dummy/manual.
- Upload bukti tidak boleh langsung dianggap lunas.
- Status setelah upload bukti adalah `processing`.
- Status `paid` hanya boleh terjadi setelah admin acc.
- Produk satuan, jadi tidak perlu quantity plus/minus.
- Produk sold tetap ditampilkan di frontend sebagai bukti/testimoni stok terjual.
- Semua produk saat ini masih memakai logo sebagai foto sementara.

