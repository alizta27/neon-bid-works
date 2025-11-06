# KerjaAja - Platform Freelancing Sosial

## 🎯 Deskripsi
KerjaAja adalah platform freelancing bergaya media sosial seperti TikTok/Instagram yang memungkinkan pengguna untuk mengunggah foto atau video pekerjaan - baik untuk mencari jasa maupun menawarkan keahlian.

## 🎨 Desain
- **Tema**: Retro-Modern Ceria
- **Palet Warna**:
  - `#F0E491` - Light Yellow (warna dasar cerah)
  - `#BBC863` - Light Greenish-Yellow (tone lembut)
  - `#31694E` - Deep Green (kontras profesional)
  - `#658C58` - Muted Green (warna pelengkap)
- **Mobile-First**: Dioptimalkan untuk smartphone dengan ukuran font minimal 11px
- **Font**: Poppins untuk keterbacaan optimal

## 🚀 Fitur Utama
1. **Feed Vertikal** - Scroll seperti TikTok/Reels untuk melihat pekerjaan
2. **Posting Pekerjaan** - Unggah foto/video dengan deskripsi dan kategori
3. **Sistem Interaksi**:
   - Like/Suka pada postingan
   - Komentar dengan avatar dan timestamp
   - Penawaran/Bid dengan nominal dan pesan
4. **Pencarian & Filter** - Cari berdasarkan kata kunci dan kategori
5. **Profil Pengguna** - Edit profil, lihat postingan, dan token
6. **Dashboard** - Statistik aktivitas dan performa
7. **Bottom Navigation** - Navigasi mobile yang intuitif

## 🏗️ Struktur Aplikasi

### Halaman
- `/` - Beranda (Feed)
- `/search` - Pencarian & Filter
- `/upload` - Unggah Pekerjaan Baru
- `/dashboard` - Dashboard Statistik
- `/profile` - Profil Pengguna
- `/post/:id` - Detail Postingan

### Komponen Utama
- `BottomNav` - Navigasi bawah dengan 5 menu
- `FeedCard` - Kartu postingan dengan foto, deskripsi, dan interaksi
- `CommentSheet` - Bottom sheet untuk komentar
- `BidSheet` - Bottom sheet untuk penawaran
- `UploadSheet` - Form upload pekerjaan
- `EditProfileSheet` - Form edit profil
- `SearchBar` - Pencarian dengan filter kategori
- `ProfileHeader` - Header profil dengan avatar dan statistik
- `DashboardCard` - Kartu statistik dashboard

## 💾 Penyimpanan Data
Semua data disimpan di **LocalStorage** dengan key `kerjaaja_data`:
- User profile (username, avatar, bio, tokens)
- Posts (foto, deskripsi, kategori, likes, comments, bids)
- Interactions (like, comment, bid)

## 🛠️ Tech Stack
- **React** - UI Framework
- **Zustand** - State Management
- **Wouter** - Routing
- **React Hook Form** - Form Management
- **Radix UI** - UI Primitives (Dialog, Sheet, Avatar, dll)
- **Tailwind CSS** - Styling
- **LocalStorage** - Data Persistence

## 📱 Responsive Design
- Mobile: < 640px (optimized)
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎯 Kategori Pekerjaan
- Desain Grafis
- Pemrograman
- Fotografi
- Videografi
- Penulisan
- Marketing
- Renovasi
- Kerajinan
- Katering
- Lainnya

## 🔄 State Management (Zustand)
Store global mencakup:
- `currentUser` - Data pengguna saat ini
- `posts` - Array semua postingan
- `searchQuery` - Query pencarian
- `selectedCategory` - Kategori yang dipilih
- Actions: `addPost`, `toggleLike`, `addComment`, `addBid`, `updateCurrentUser`

## 📝 Catatan Pengembangan
- UI menggunakan Bahasa Indonesia
- Kode menggunakan Bahasa Inggris
- Font size minimum 11px untuk mobile
- Semua interaksi real-time dengan localStorage
- Data dummy tersedia untuk demonstrasi

## 🎨 Design System
Lihat `design_guidelines.md` untuk panduan desain lengkap termasuk:
- Filosofi desain
- Palet warna
- Tipografi
- Layout sistem
- Komponen library
- Animasi & interaksi
- Accessibility guidelines
