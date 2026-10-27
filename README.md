# 🎮 EduGaming — Gamified Learning Platform

> **"Level Up Your Knowledge."**  
> Platform edukasi interaktif modern yang menggabungkan pembelajaran akademik kurikulum sekolah menengah dengan elemen gamifikasi tingkat lanjut: XP, Leveling System, Daily Quests, Learning Streak, Badges & Achievements, serta Quiz Center real-time.

---

## 🌟 Fitur Utama

### 1. 📊 Dashboard Gamifikasi Modern
- **Welcome Hero**: Salam pembuka interaktif dengan gelar rank akademik dan tombol *Quick Start Quiz*.
- **Stat Cards Real-time**: Memantau Total XP, Level Pengguna, Modul Materi Selesai, dan Akurasi Kuis.
- **Daily Quests (Misi Harian)**: Misi harian otomatis yang melacak progres aktual dan menyediakan tombol klaim bonus XP satu kali per hari.
- **Learning Streak**: Melacak konsistensi hari belajar berturut-turut dengan penanganan pergantian tanggal yang aman.
- **Activity Chart (Recharts)**: Grafik visual interaktif akumulasi XP dan kuis 7 hari terakhir.
- **Continue Learning Widget**: Mengarahkan pemain ke materi berikutnya secara cepat.
- **Recent Activity**: Riwayat kuis dan materi yang baru saja diselesaikan.

### 2. 📚 Katalog Materi Akademik (Learning Catalog)
- **7 Kategori Pembelajaran**:
  1. Matematika (Eksponen, Logaritma, Turunan Kalkulus)
  2. Informatika (Stack, Queue, Jaringan OSI/TCP, Kriptografi)
  3. IPA / Sains (Termodinamika Gas, Genetika Mendel, Reaksi Redoks)
  4. Bahasa Indonesia (Teks Argumentasi, Kaidah EYD V, Majas)
  5. Bahasa Inggris (Conditionals, Inversion, Academic Vocab)
  6. IPS / Sosial (Kebijakan Fiskal/Moneter, Stratifikasi Durkheim/Marx, Geografi)
  7. Pengetahuan Umum (Literasi Finansial, Compound Interest, AI Transformers)
- **Multi-Filter & Pencarian**: Pencarian judul/tag, filter kategori, filter tingkat kesulitan (*Easy, Medium, Hard*), dan filter status belajar (*Belum Dimulai, Sedang Dipelajari, Selesai*).
- **Progres per Modul**: Indikator persentase penyelesaian submateri per kursus.

### 3. 📖 Halaman Belajar Mendalam (Lesson Detail)
- Konten edukasi asli dalam Bahasa Indonesia yang berbobot untuk tingkat SMA/SMK.
- **Tujuan Pembelajaran** terukur.
- **Daftar Submateri** terstruktur.
- **Konten Penjelasan** dengan callout konsep inti.
- **Contoh Soal & Langkah Pembahasan** langkah demi langkah.
- **Rangkuman Materi**.
- Tombol **Tandai Selesai (+25 XP)** yang terproteksi dari duplikasi.
- Navigasi materi sebelumnya dan materi berikutnya.
- Tombol langsung untuk menguji pemahaman di Quiz Center.

### 4. 🧠 Quiz Center & Arena Gameplay
- **Konfigurasi Fleksibel**:
  - Pilihan Kategori (Semua Kategori atau Kategori Tertentu).
  - Pilihan Kesulitan (*Easy, Medium, Hard, Campuran*).
  - Pilihan Jumlah Soal (*5, 10, 15, 20, 25, 30 soal*).
  - Pengaturan Timer Opsional (30 detik per soal).
- **Bank Soal Besar & Valid**: Lebih dari **210 soal unik** dengan kunci jawaban akurat dan penjelasan konseptual.
- **Acak Soal & Acak Pilihan**: Pilihan ganda diacak tanpa merusak kunci jawaban.
- **Gameplay Interaktif**:
  - Pemilihan jawaban dengan kunci konfirmasi.
  - Feedback instan visual (*Hijau untuk Benar, Merah untuk Salah*).
  - Pembahasan langsung muncul setelah soal dikonfirmasi.
  - Efek audio sintetis (*Web Audio API*) tanpa ketergantungan berkas eksternal.
  - Dialog konfirmasi saat ingin keluar dari kuis.

### 5. 🏆 Halaman Hasil Kuis (Quiz Result)
- Skor akhir, rincian jawaban benar/salah, persentase akurasi, durasi pengerjaan, dan XP yang diperoleh.
- Pesan motivasi berdasarkan performa.
- **Anti-Exploit XP**: XP hanya diberikan satu kali per sesi dan tidak berlipat ganda saat halaman dimuat ulang.
- **Review Soal**: Tinjauan detail setiap nomor dengan kunci jawaban dan pembahasan.
- **Fitur Ulangi Soal yang Salah**: Memungkinkan pengulangan spesifik untuk nomor yang keliru.
- Animasi confetti perayaan (*canvas-confetti*) untuk skor tinggi.

### 6. 🏆 Papan Peringkat (Leaderboard) & Liga Kompetitif
- **Simulasi Liga Pelajar**: Membandingkan posisi rank pemain secara real-time dengan pelajar rival virtual.
- **Top 3 Podium**: Kartu podium khusus untuk Medali Emas (#1), Perak (#2), dan Perunggu (#3).
- **Tab Periode Fleksibel**: Pilihan tinjauan peringkat *Sepanjang Masa* vs *Minggu Ini*.
- **Pencarian Rival**: Kotak pencarian cepat untuk mencari nama pelajar di daftar peringkat.

### 7. 🔖 Bookmark / Simpanan Materi & Soal Favorit
- **Simpan Materi Penting**: Tombol simpan (*Bookmark*) di setiap halaman materi pelajaran.
- **Simpan Soal Menantang**: Ikon bookmark langsung pada kartu soal kuis untuk ditinjau pembahasannya kemudian.
- **Halaman Khusus Simpanan**: Filter tab untuk materi dan soal tersimpan dengan tombol hapus serta pencarian cepat.

### 8. 💾 Cadangan & Pemulihan Data (Backup & Restore JSON)
- **Ekspor Data (JSON)**: Mengunduh berkas cadangan berisi XP, level, streak, quest, kuis, badge, dan materi tersimpan.
- **Impor Data (JSON)**: Memulihkan kembali semua progres belajar tanpa kehilangan data saat berpindah perangkat atau browser.

### 9. 🗂️ Kuis Evaluasi Per Modul (Mini Quiz 5 Soal)
- Tombol evaluasi langsung di halaman modul materi yang meluncurkan 5 soal spesifik sesuai topik dan tingkat kesulitan materi yang baru saja dibaca.

### 10. 🎖️ Achievements & Badges
- 8 Badge pencapaian yang terbuka secara dinamis berdasarkan aksi nyata (First Step, Quick Learner, Perfect Score, Knowledge Hunter, Consistency Champion, Rising Star, Century Club, The Polymath).
- Indikator badge terkunci vs terbuka dengan tanggal perolehan dan progres menuju syarat buka.

### 11. 👤 Profil & Statistik
- Penggantian nama tampilan pengguna.
- Pemilihan 6 avatar karakter (*Cyber Ninja, Astro Scholar, Dragon Mage, Pixel Hero, Quantum Owl, Zen Master*).
- Rincian performa dan akurasi per kategori mata pelajaran.

### 12. ⚙️ Pengaturan & Fleksibilitas
- **Dark Mode & Light Mode**: Tema visual modern dengan latar gelap `#0B0D12` sebagai tema utama dan alternatif tema terang yang bersih.
- Pengaturan suara efek kuis (*on/off*).
- Pengaturan timer kuis (*on/off*).
- **Reset Seluruh Progres**: Mengembalikan aplikasi ke kondisi default pengguna baru dengan dialog konfirmasi aman.

---

## 🛠️ Tech Stack

- **React 19** — Library UI deklaratif modern.
- **Vite** — Build tool dan development server berkecepatan tinggi.
- **Tailwind CSS v3** — Utility-first styling framework dengan kustomisasi tema Dark/Light.
- **React Router DOM v7** — Navigasi SPA client-side routing.
- **Lucide React** — Ikon vektor modern dan konsisten.
- **Recharts** — Grafik area perkembangan belajar interaktif.
- **Canvas Confetti** — Efek visual perayaan level up dan kuis selesai.
- **Web Audio API** — Efek suara sintetis tanpa memerlukan berkas audio eksternal.
- **localStorage** — Penyimpanan status offline-first tanpa database eksternal.

---

## 📂 Struktur Folder Proyek

```text
website-belajar/
├── public/
│   └── favicon.svg              # Favicon EduGaming
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── dashboard/           # Widget Dashboard (WelcomeHero, Quests, ActivityChart, dll)
│   │   ├── gamification/        # AchievementCard, Streak, XP components
│   │   ├── layout/              # AppLayout, Sidebar, Topbar, MobileDrawer
│   │   ├── learning/            # CourseCard, CategoryPills
│   │   ├── quiz/                # QuestionCard, QuizTimer, Config
│   │   └── ui/                  # StatCard, ProgressBar, Badges, Toast, Modals
│   ├── context/
│   │   ├── GameContext.jsx      # Central Gamification State & Actions
│   │   └── ThemeContext.jsx     # Dark & Light Mode Theme Context
│   ├── data/
│   │   ├── courses.js           # Katalog kursus dan kategori
│   │   ├── lessons.js           # Konten pembelajaran akademik lengkap
│   │   └── questions/           # Bank soal 210+ soal terstruktur
│   │       ├── matematika.js
│   │       ├── informatika.js
│   │       ├── ipa.js
│   │       ├── bahasaIndonesia.js
│   │       ├── bahasaInggris.js
│   │       ├── ips.js
│   │       ├── pengetahuanUmum.js
│   │       └── index.js
│   ├── lib/
│   │   ├── achievements.js      # Definisi dan evaluator badge
│   │   ├── quests.js            # Daily quest manager & reset per hari
│   │   ├── sound.js             # Web Audio API synthesizer
│   │   ├── storage.js           # LocalStorage wrapper & schema
│   │   ├── streak.js            # Safe date comparison & streak logic
│   │   └── xp.js                # XP rules & tiered level formula
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Courses.jsx
│   │   ├── LessonDetail.jsx
│   │   ├── QuizCenter.jsx
│   │   ├── QuizPlay.jsx
│   │   ├── QuizResult.jsx
│   │   ├── Achievements.jsx
│   │   ├── Profile.jsx
│   │   ├── Settings.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx                  # Main Router setup
│   ├── index.css                # Tailwind directives & CSS variables
│   └── main.jsx                 # Entry point
├── .gitignore
├── index.html                   # HTML template dengan SEO meta & Google Fonts
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json                  # SPA routing rewrite untuk Vercel
└── README.md
```

---

## 🚀 Panduan Menjalankan Aplikasi Secara Lokal

### Prasyarat
- Node.js versi 18 atau yang lebih baru.
- npm versi 9 atau yang lebih baru.

### Langkah Instalasi
1. Buka terminal pada direktori proyek:
   ```bash
   cd d:/website-belajar
   ```
2. Pasang semua dependensi proyek:
   ```bash
   npm install
   ```
3. Jalankan development server:
   ```bash
   npm run dev
   ```
4. Buka peramban di alamat:
   ```text
   http://localhost:5173/
   ```

### Pemeriksaan Build Produksi
Untuk memastikan tidak ada galat dan memverifikasi berkas bundel produksi:
```bash
npm run build
```
Hasil kompilasi siap saji akan dibuat di folder `dist/`. Anda dapat mengujinya dengan:
```bash
npm run preview
```

---

## 🌐 Panduan Deployment ke Vercel

Aplikasi ini sudah dipersiapkan sepenuhnya untuk deployment instan ke Vercel:

1. **Konfigurasi Rewrite SPA (`vercel.json`)**:
   Berkas `vercel.json` telah disediakan dengan konfigurasi:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
   Hal ini menjamin bahwa seluruh rute seperti `/courses`, `/quiz`, `/achievements`, `/profile`, dan `/settings` dapat diakses langsung tanpa menyebabkan HTTP 404 saat pengguna melakukan refresh halaman.

2. **Deploy via GitHub**:
   - Inisialisasi repositori Git dan push ke GitHub:
     ```bash
     git init
     git add .
     git commit -m "feat: complete EduGaming gamified platform"
     git branch -M main
     git remote add origin <URL_REPOSITORY_GITHUB_ANDA>
     git push -u origin main
     ```
   - Masuk ke dashboard [Vercel](https://vercel.com).
   - Klik **"Add New"** > **"Project"**, lalu pilih repositori GitHub Anda.
   - Framework preset akan otomatis terdeteksi sebagai **Vite**.
   - Klik **Deploy**. Selesai!

---

## 💾 Penjelasan Penyimpanan Data Lokal (Offline-First)

EduGaming dirancang sebagai aplikasi *frontend standalone* tanpa memerlukan login akun atau backend server:
- Seluruh progres (Total XP, Level, Learning Streak, Daily Quests, Modul Selesai, Riwayat Kuis, Status Badge, dan Pengaturan Tema/Suara) disimpan secara aman di **localStorage** browser pengguna.
- Data akan tetap tersimpan meskipun halaman dimuat ulang (*refresh*) atau peramban ditutup.
- **Catatan**: Data tersimpan secara lokal pada peramban dan perangkat yang sedang digunakan, sehingga tidak otomatis tersinkronisasi ke peramban atau perangkat lain. Pengguna dapat mereset progres kapan saja melalui menu **Pengaturan**.

---

## 📜 Lisensi & Hak Cipta

Dibuat dengan ❤️ untuk kemajuan pendidikan modern dan portofolio profesional frontend developer. Bebas dikembangkan lebih lanjut!
