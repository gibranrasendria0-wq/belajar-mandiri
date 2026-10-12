// Educational lessons data with high quality Indonesian academic content

export const LESSONS = [
  {
    id: 'les-mat-01-01',
    courseId: 'mat-01',
    title: 'Sifat Dasar Eksponen dan Persamaan Eksponensial',
    category: 'matematika',
    difficulty: 'Easy',
    duration: '10 Menit',
    xpReward: 25,
    order: 1,
    objectives: [
      'Memahami sifat perkalian, pembagian, dan perpangkatan bilangan eksponen.',
      'Menyelesaikan persamaan eksponensial sederhana bentuk a^f(x) = a^g(x).',
      'Menerapkan bentuk kuadrat pada persamaan eksponen berakar real.',
    ],
    submaterials: [
      { id: 'sub-1', title: '1. Konsep & Definisi Eksponen' },
      { id: 'sub-2', title: '2. Delapan Sifat Pokok Eksponen' },
      { id: 'sub-3', title: '3. Menyelesaikan Persamaan Eksponensial' },
      { id: 'sub-4', title: '4. Studi Kasus Pemodelan Nyata' },
    ],
    contentSections: [
      {
        heading: '1. Pengertian Bilangan Berpangkat (Eksponen)',
        body: 'Eksponen merupakan bentuk perkalian berulang dari suatu bilangan pokok (basis) dengan dirinya sendiri sebanyak n kali. Bentuk umum ditulis aⁿ = a × a × ... × a (sebanyak n faktor), dengan a disebut basis dan n disebut pangkat atau eksponen.',
        callout: 'Ingat aturan dasar: bilangan apa pun yang dipangkatkan 0 bernilai 1 (a⁰ = 1, dengan syarat a ≠ 0). Sedangkan pangkat negatif merepresentasikan kebalikan pecahan: a⁻ⁿ = 1 / aⁿ.',
      },
      {
        heading: '2. Delapan Sifat Penting yang Wajib Dikuasai',
        body: `Dalam manipulasi aljabar, delapan sifat berikut adalah fondasi utama:
1. aᵐ × aⁿ = aᵐ⁺ⁿ (Perkalian basis sama → pangkat dijumlahkan)
2. aᵐ / aⁿ = aᵐ⁻ⁿ (Pembagian basis sama → pangkat dikurangkan)
3. (aᵐ)ⁿ = aᵐˣⁿ (Pangkat dipangkatkan → pangkat dikalikan)
4. (a × b)ⁿ = aⁿ × bⁿ (Pangkat perkalian didistribusikan)
5. (a / b)ⁿ = aⁿ / bⁿ (Pangkat pembagian didistribusikan)
6. a⁰ = 1 (untuk a ≠ 0)
7. a⁻ⁿ = 1 / aⁿ
8. a^(m/n) = ⁿ√(aᵐ) (Pangkat pecahan identik dengan bentuk akar)`,
      },
      {
        heading: '3. Menyelesaikan Persamaan a^f(x) = a^g(x)',
        body: 'Jika basis kedua ruas sudah sama (a > 0 dan a ≠ 1), maka penyelesaian persamaan ditentukan dengan menyamakan kedua pangkatnya, yaitu f(x) = g(x). Jika basis belum sama, ubah basis menjadi bilangan prima terkecil yang sama terlebih dahulu.',
      },
    ],
    sampleProblem: {
      question: 'Tentukan nilai x yang memenuhi persamaan: 4^(2x - 1) = 8^(x + 3)',
      steps: [
        'Langkah 1: Identifikasi basis 4 dan 8. Keduanya adalah perpangkatan dari basis 2. Tuliskan 4 = 2² dan 8 = 2³.',
        'Langkah 2: Substitusi ke persamaan: (2²)^(2x - 1) = (2³)^(x + 3)',
        'Langkah 3: Gunakan sifat (aᵐ)ⁿ = aᵐˣⁿ → 2^(4x - 2) = 2^(3x + 9)',
        'Langkah 4: Karena basis sudah sama (2), samakan pangkatnya: 4x - 2 = 3x + 9',
        'Langkah 5: Pindahkan suku aljabar: 4x - 3x = 9 + 2 → x = 11.',
      ],
      answer: 'Himpunan penyelesaian adalah x = 11.',
    },
    summary: 'Eksponen mempermudah perhitungan bilangan sangat besar atau kecil. Kunci menyelesaikan persamaan eksponensial adalah menyamakan basis kedua ruas sebelum menyamakan pangkat aljabar.',
  },
  {
    id: 'les-mat-01-02',
    courseId: 'mat-01',
    title: 'Konsep Logaritma dan Sifat Operasinya',
    category: 'matematika',
    difficulty: 'Medium',
    duration: '12 Menit',
    xpReward: 25,
    order: 2,
    objectives: [
      'Menjelaskan kaitan logaritma sebagai invers dari eksponen.',
      'Menguasai sifat penjumlahan, pengurangan, dan perpangkatan logaritma.',
      'Menghitung nilai logaritma dengan pergantian basis.',
    ],
    submaterials: [
      { id: 'sub-1', title: '1. Definisi Logaritma sebagai Invers' },
      { id: 'sub-2', title: '2. Syarat Basis dan Numerus' },
      { id: 'sub-3', title: '3. Sifat-sifat Penjumlahan dan Perkalian' },
      { id: 'sub-4', title: '4. Aturan Perubahan Basis Logaritma' },
    ],
    contentSections: [
      {
        heading: '1. Definisi dan Hubungan dengan Eksponen',
        body: 'Logaritma adalah operasi invers dari eksponen. Jika aᵇ = c, maka bentuk logaritmanya adalah ᵃlog c = b. Di sini a adalah basis (syarat: a > 0 dan a ≠ 1), c adalah numerus (syarat: c > 0), dan b adalah hasil logaritma.',
        callout: 'Kaidah krusial: Numerus tidak boleh negatif atau nol! Jika basis bernilai 10, biasanya angka 10 tidak dituliskan, misalnya log 100 = 2.',
      },
      {
        heading: '2. Sifat-sifat Logaritma yang Sering Muncul',
        body: `Berikut adalah sifat inti logaritma:
• ᵃlog (x × y) = ᵃlog x + ᵃlog y
• ᵃlog (x / y) = ᵃlog x - ᵃlog y
• ᵃlog (xⁿ) = n × ᵃlog x
• ᵃlog b = (ᶜlog b) / (ᶜlog a)
• ᵃlog b × ᵇlog c = ᵃlog c
• a^(ᵃlog b) = b`,
      },
    ],
    sampleProblem: {
      question: 'Jika ²log 3 = a dan ²log 5 = b, nyatakan ²log 45 dalam bentuk a dan b!',
      steps: [
        'Langkah 1: Faktorisasi angka 45 menjadi perkalian faktor prima: 45 = 9 × 5 = 3² × 5.',
        'Langkah 2: Tuliskan ²log 45 = ²log (3² × 5).',
        'Langkah 3: Gunakan sifat perkalian logaritma: ²log (3² × 5) = ²log (3²) + ²log 5.',
        'Langkah 4: Gunakan sifat pangkat: ²log (3²) = 2 × ²log 3.',
        'Langkah 5: Substitusi nilai ²log 3 = a dan ²log 5 = b → 2a + b.',
      ],
      answer: 'Hasil akhir adalah 2a + b.',
    },
    summary: 'Logaritma mengubah perkalian menjadi penjumlahan dan pangkat menjadi pengali. Sangat berguna dalam menghitung skala pH kimia, intensitas gempa Richter, dan pertumbuhan logaritmik.',
  },
  {
    id: 'les-mat-01-03',
    courseId: 'mat-01',
    title: 'Aplikasi Pertumbuhan dan Peluruhan Logaritmik',
    category: 'matematika',
    difficulty: 'Hard',
    duration: '13 Menit',
    xpReward: 25,
    order: 3,
    objectives: [
      'Menerapkan rumus pertumbuhan eksponensial Mt = M₀(1 + r)ᵗ.',
      'Menghitung waktu paruh dalam peluruhan radioaktif.',
      'Memecahkan masalah bunga majemuk perbankan secara analitis.',
    ],
    submaterials: [
      { id: 'sub-1', title: '1. Model Pertumbuhan Eksponensial' },
      { id: 'sub-2', title: '2. Model Peluruhan dan Waktu Paruh' },
      { id: 'sub-3', title: '3. Perhitungan Bunga Majemuk' },
    ],
    contentSections: [
      {
        heading: '1. Model Pertumbuhan Alami',
        body: 'Pertumbuhan populasi bakteri atau modal sering kali dirumuskan dengan N(t) = N₀ × (1 + r)ᵗ, di mana N₀ adalah kuantitas mula-mula, r adalah laju pertumbuhan per periode, dan t adalah lama waktu.',
      },
      {
        heading: '2. Model Peluruhan Radioaktif',
        body: 'Zat radioaktif meluruh sesuai rumus N(t) = N₀ × (1/2)^(t / T), dengan T adalah waktu paruh (half-life), yaitu durasi yang dibutuhkan agar massa zat berkurang menjadi separuh dari nilai semula.',
      },
    ],
    sampleProblem: {
      question: 'Suatu koloni bakteri berjumlah 500 membelah diri menjadi dua setiap 20 menit. Berapakah jumlah bakteri setelah 2 jam?',
      steps: [
        'Langkah 1: Tentukan nilai awal N₀ = 500.',
        'Langkah 2: Konversi durasi 2 jam ke menit: 2 × 60 = 120 menit.',
        'Langkah 3: Hitung periode pembelahan t = 120 / 20 = 6 kali pembelahan.',
        'Langkah 4: Rumus pembelahan dua kali lipat: N(t) = N₀ × 2ᵗ = 500 × 2⁶.',
        'Langkah 5: 2⁶ = 64 → N(t) = 500 × 64 = 32.000 bakteri.',
      ],
      answer: 'Setelah 2 jam, populasi bakteri bertambah menjadi 32.000.',
    },
    summary: 'Eksponen memodelkan fenomena yang mengalami akselerasi kelipatan secara konstan, sementara logaritma digunakan untuk mencari waktu (t) yang dibutuhkan untuk mencapai target tertentu.',
  },
  {
    id: 'les-info-01-01',
    courseId: 'info-01',
    title: 'Stack (Tumpukan) dan Prinsip LIFO',
    category: 'informatika',
    difficulty: 'Easy',
    duration: '10 Menit',
    xpReward: 25,
    order: 1,
    objectives: [
      'Memahami mekanisme Last In First Out (LIFO).',
      'Mengimplementasikan operasi Push, Pop, Peek, dan IsEmpty.',
      'Mengenal aplikasi Stack dalam Undo/Redo dan Call Stack fungsi.',
    ],
    submaterials: [
      { id: 'sub-1', title: '1. Analogi dan Konsep LIFO' },
      { id: 'sub-2', title: '2. Empat Operasi Inti Stack' },
      { id: 'sub-3', title: '3. Kompleksitas Waktu O(1)' },
      { id: 'sub-4', title: '4. Aplikasi Nyata di Industri Software' },
    ],
    contentSections: [
      {
        heading: '1. Apa itu Stack?',
        body: 'Stack (tumpukan) adalah struktur data linear di mana penambahan elemen baru dan pengambilan elemen lama hanya dapat dilakukan dari satu ujung yang disebut puncak (top). Prinsip kerjanya adalah LIFO (Last In, First Out)—elemen yang paling terakhir dimasukkan adalah elemen yang paling pertama keluar, persis seperti tumpukan piring di meja makan.',
      },
      {
        heading: '2. Operasi Dasar pada Stack',
        body: `Operasi utama pada Stack:
• Push(item): Menambahkan elemen baru ke puncak tumpukan (O(1)).
• Pop(): Menghapus dan mengembalikan elemen yang berada di puncak (O(1)).
• Peek() / Top(): Melihat elemen paling atas tanpa menghapusnya (O(1)).
• IsEmpty(): Memeriksa apakah tumpukan kosong (O(1)).
• IsFull(): Memeriksa apakah kapasitas array tumpukan telah penuh.`,
        callout: 'Kelebihan stack adalah kecepatan eksekusi O(1) konstan karena pointer selalu mengarah ke posisi puncak (top).',
      },
      {
        heading: '3. Penerapan di Dunia Nyata',
        body: 'Setiap compiler atau browser menggunakan Call Stack untuk melacak pemanggilan fungsi rekursif. Fitur Ctrl+Z (Undo) pada aplikasi text editor dan riwayat tombol "Back" pada web browser juga memanfaatkan struktur data stack.',
      },
    ],
    sampleProblem: {
      question: 'Diketahui stack kosong S. Dilakukan operasi berurutan: Push(10), Push(20), Push(30), Pop(), Push(40), Pop(), Peek(). Elemen apa yang dikembalikan oleh fungsi Peek()?',
      steps: [
        '1. Mulai: Stack []',
        '2. Push(10) → [10]',
        '3. Push(20) → [10, 20]',
        '4. Push(30) → [10, 20, 30]',
        '5. Pop() mengeluarkan elemen teratas yaitu 30 → Stack kembali menjadi [10, 20]',
        '6. Push(40) → [10, 20, 40]',
        '7. Pop() mengeluarkan 40 → Stack menjadi [10, 20]',
        '8. Peek() membaca elemen teratas saat ini tanpa menghapusnya, yaitu 20.',
      ],
      answer: 'Elemen yang dikembalikan oleh Peek() adalah 20.',
    },
    summary: 'Stack adalah struktur data LIFO yang sangat efisien untuk membalikkan urutan data, mengecek kecocokan tanda kurung (parentheses matching), dan manajemen eksekusi thread runtime.',
  },
  {
    id: 'les-info-01-02',
    courseId: 'info-01',
    title: 'Queue (Antrean) dan Prinsip FIFO',
    category: 'informatika',
    difficulty: 'Medium',
    duration: '12 Menit',
    xpReward: 25,
    order: 2,
    objectives: [
      'Menjelaskan perbedaan mendasar FIFO vs LIFO.',
      'Memahami Enqueue, Dequeue, Circular Queue, dan Priority Queue.',
      'Menganalisis sistem antrean pesan pada arsitektur modern (Message Broker).',
    ],
    submaterials: [
      { id: 'sub-1', title: '1. Konsep First In First Out (FIFO)' },
      { id: 'sub-2', title: '2. Operasi Enqueue & Dequeue' },
      { id: 'sub-3', title: '3. Circular Queue & Memory Utilization' },
      { id: 'sub-4', title: '4. Priority Queue & Heaps' },
    ],
    contentSections: [
      {
        heading: '1. Mekanisme Kerja Queue',
        body: 'Queue beroperasi berdasarkan kaidah FIFO (First In, First Out). Elemen baru ditambahkan di bagian belakang (rear/tail), sementara pengambilan elemen dilakukan dari bagian depan (front/head). Seperti antrean loket tiket, siapa yang datang lebih dulu akan dilayani terlebih dahulu.',
      },
      {
        heading: '2. Circular Queue untuk Efisiensi Ruang',
        body: 'Pada implementasi array linear, setelah banyak operasi dequeue, ruang kosong di bagian depan bisa terbuang. Circular Queue mengatasi masalah ini dengan menghubungkan kembali indeks terakhir ke indeks awal menggunakan rumus modulo: rear = (rear + 1) % KAPASITAS.',
      },
    ],
    sampleProblem: {
      question: 'Mengapa algoritma Breadth-First Search (BFS) pada graf menggunakan Queue dan bukan Stack?',
      steps: [
        '1. BFS menelusuri graf lapis demi lapis (level-order traversal).',
        '2. Semua simpul tetangga pada kedalaman k harus dikunjungi sebelum melangkah ke kedalaman k + 1.',
        '3. Sifat FIFO pada Queue menjamin simpul yang ditemukan lebih awal dieksplorasi lebih awal.',
        '4. Jika menggunakan Stack (LIFO), penelusuran akan langsung masuk ke cabang terdalam, yang sebenarnya merupakan algoritma Depth-First Search (DFS).',
      ],
      answer: 'Karena FIFO menjamin penelusuran simpul tetangga secara merata per level kedalaman graf.',
    },
    summary: 'Queue adalah fondasi pengatur antrean cetak printer, manajemen request asynchronous pada server web, dan algoritma penjelajahan graf BFS.',
  },
  {
    id: 'les-ipa-01-01',
    courseId: 'ipa-01',
    title: 'Hukum Pertama Termodinamika & Konservasi Energi',
    category: 'ipa',
    difficulty: 'Medium',
    duration: '12 Menit',
    xpReward: 25,
    order: 1,
    objectives: [
      'Memahami formulasi Q = ΔU + W.',
      'Membedakan proses Isokhorik, Isobarik, Isotermal, dan Adiabatik.',
      'Menghitung usaha yang dilakukan gas pada diagram P-V.',
    ],
    submaterials: [
      { id: 'sub-1', title: '1. Energi Dalam dan Kalor' },
      { id: 'sub-2', title: '2. Usaha Luar Gas (W)' },
      { id: 'sub-3', title: '3. 4 Proses Termodinamika Khusus' },
    ],
    contentSections: [
      {
        heading: '1. Formulasi Hukum Pertama Termodinamika',
        body: 'Hukum Pertama Termodinamika menyatakan bahwa energi tidak dapat diciptakan atau dimusnahkan, melainkan hanya berubah bentuk. Untuk sistem gas ideal, kalor (Q) yang diserap sistem digunakan untuk menambah energi dalam sistem (ΔU) dan melakukan usaha luar (W): Q = ΔU + W.',
        callout: 'Konvensi tanda:\n• Q positif (+) jika sistem menerima/menyerap kalor.\n• Q negatif (-) jika sistem melepas kalor.\n• W positif (+) jika sistem melakukan usaha (volume membesar / ekspansi).\n• W negatif (-) jika sistem menerima usaha dari lingkungan (kompresi).',
      },
      {
        heading: '2. Empat Proses Khusus',
        body: `1. Isobarik (Tekanan Konstan): W = P × ΔV = P(V₂ - V₁).
2. Isokhorik (Volume Konstan): ΔV = 0 sehingga W = 0, akibatnya Q = ΔU.
3. Isotermal (Suhu Konstan): ΔT = 0 sehingga ΔU = 0, akibatnya Q = W.
4. Adiabatik (Tanpa Pertukaran Kalor): Q = 0 sehingga W = -ΔU.`,
      },
    ],
    sampleProblem: {
      question: 'Suatu gas ideal menyerap kalor sebesar 1.200 Joule dari lingkungan dan melakukan usaha luar sebesar 450 Joule. Berapakah perubahan energi dalam gas tersebut?',
      steps: [
        '1. Diketahui Q = +1.200 J (menyerap kalor).',
        '2. Usaha W = +450 J (melakukan usaha).',
        '3. Rumus: Q = ΔU + W → ΔU = Q - W.',
        '4. Hitung: ΔU = 1.200 - 450 = 750 Joule.',
      ],
      answer: 'Perubahan energi dalam gas bertambah sebesar 750 Joule.',
    },
    summary: 'Hukum Pertama Termodinamika mengaitkan kalor, usaha, dan energi dalam. Perilaku gas sangat bergantung pada variabel yang dibuat konstan selama proses termodinamika.',
  },
  {
    id: 'les-bind-01-01',
    courseId: 'bind-01',
    title: 'Struktur Teks Argumentasi & Penalaran Logis',
    category: 'bahasa-indonesia',
    difficulty: 'Easy',
    duration: '10 Menit',
    xpReward: 25,
    order: 1,
    objectives: [
      'Mengidentifikasi tesis, rangkaian argumen, dan reiterasi/rekomendasi.',
      'Membedakan fakta objektif dengan klaim opini subjektif.',
      'Mengenali kesesatan berpikir (logical fallacies) seperti Ad Hominem dan Strawman.',
    ],
    submaterials: [
      { id: 'sub-1', title: '1. Struktur Bangunan Teks Argumentasi' },
      { id: 'sub-2', title: '2. Fakta vs Opini' },
      { id: 'sub-3', title: '3. Kohesi & Konjungsi Kausalitas' },
      { id: 'sub-4', title: '4. Mengenali Kesesatan Berpikir' },
    ],
    contentSections: [
      {
        heading: '1. Anatomi Teks Argumentasi',
        body: 'Teks argumentasi bertujuan meyakinkan pembaca agar menerima pandangan atau sikap penulis melalui penalaran yang sistematis dan bukti yang sahih. Strukturnya terdiri atas: (1) Pendahuluan/Tesis berisi pernyataan sudut pandang topik, (2) Tubuh Argumen berisi data, fakta, analogi, dan telaah kausalitas, dan (3) Penegasan Ulang/Kesimpulan yang menyimpulkan premis-premis sebelumnya.',
      },
      {
        heading: '2. Menghindari Fallacy (Kesesatan Logika)',
        body: `Argumen yang sehat tidak menyerang pribadi lawan (Ad Hominem), tidak melebih-lebihkan argumen lawan secara keliru (Strawman), dan tidak mengasumsikan korelasi sebagai sebab-akibat (Post Hoc Ergo Propter Hoc).`,
      },
    ],
    sampleProblem: {
      question: 'Manakah di antara pernyataan berikut yang tergolong fakta objektif: (A) "Jurusan Informatika adalah jurusan paling menyenangkan di kampus", atau (B) "Berdasarkan data BPS tahun 2023, pengguna internet di Indonesia mencapai 215,6 juta jiwa"?',
      steps: [
        '1. Analisis pernyataan A: Kata "paling menyenangkan" bersifat relatif, subjektif, dan tergantung selera individu, sehingga ini adalah OPINI.',
        '2. Analisis pernyataan B: Terdapat rujukan sumber resmi (BPS), tahun spesifik (2023), dan angka kuantitatif yang dapat diverifikasi kebenarannya, sehingga ini adalah FAKTA.',
      ],
      answer: 'Pernyataan (B) adalah fakta objektif.',
    },
    summary: 'Teks argumentasi yang kuat berpijak pada data empiris, kohesi gramatikal yang runtut, dan penalaran logis yang bebas dari logical fallacy.',
  },
  {
    id: 'les-bing-01-01',
    courseId: 'bing-01',
    title: 'Conditional Sentences: Zero, First, Second, & Third',
    category: 'bahasa-inggris',
    difficulty: 'Medium',
    duration: '11 Menit',
    xpReward: 25,
    order: 1,
    objectives: [
      'Membedakan 4 tipe kalimat pengandaian dalam bahasa Inggris.',
      'Menguasai kombinasi tenses (Present, Future, Past Simple, Past Perfect).',
      'Memahami penggunaan "Unless" dan struktur Inversion formal.',
    ],
    submaterials: [
      { id: 'sub-1', title: '1. Summary Matrix of 4 Types' },
      { id: 'sub-2', title: '2. Type 0 & Type 1 (Real Situations)' },
      { id: 'sub-3', title: '3. Type 2 & Type 3 (Unreal/Hypothetical)' },
      { id: 'sub-4', title: '4. Advanced Inversion Structure' },
    ],
    contentSections: [
      {
        heading: '1. The 4 Main Conditionals Overview',
        body: `• Type 0 (General Truth): If + Present Simple, Present Simple.
Example: If you heat ice, it melts.

• Type 1 (Real Possibility in Future): If + Present Simple, will + Verb 1.
Example: If you study hard, you will pass the exam.

• Type 2 (Hypothetical/Unreal Present): If + Past Simple, would + Verb 1.
Note: Use "were" for all subjects in formal English (If I were you, I would accept the offer).

• Type 3 (Unreal Past / Regret): If + Past Perfect (had + V3), would have + Verb 3.
Example: If she had left earlier, she wouldn't have missed the train.`,
      },
    ],
    sampleProblem: {
      question: 'Lengkapi kalimat berikut: "If we _____ (know) about the traffic jam yesterday, we _____ (take) the alternative route."',
      steps: [
        '1. Perhatikan keterangan waktu "yesterday", yang menandakan situasi penyesalan di masa lalu (unreal past).',
        '2. Gunakan Conditional Type 3.',
        '3. If-clause membutuhkan past perfect: had known.',
        '4. Main clause membutuhkan modal perfect: would have taken.',
      ],
      answer: 'If we had known about the traffic jam yesterday, we would have taken the alternative route.',
    },
    summary: 'Mastering conditionals allows you to discuss scientific facts (Type 0), plans (Type 1), hypothetical dreams (Type 2), and past reflections or regrets (Type 3) with linguistic accuracy.',
  },
  {
    id: 'les-ips-01-01',
    courseId: 'ips-01',
    title: 'Kebijakan Moneter vs Kebijakan Fiskal',
    category: 'ips',
    difficulty: 'Medium',
    duration: '12 Menit',
    xpReward: 25,
    order: 1,
    objectives: [
      'Mengetahui perbedaan peran Bank Sentral vs Kementerian Keuangan.',
      'Memahami instrumen operasi pasar terbuka, Giro Wajib Minimum, dan diskonto.',
      'Menganalisis kebijakan ekspansif vs kontraktif dalam mengendalikan inflasi.',
    ],
    submaterials: [
      { id: 'sub-1', title: '1. Otoritas Pengambil Kebijakan' },
      { id: 'sub-2', title: '2. Instrumen Kebijakan Moneter' },
      { id: 'sub-3', title: '3. Instrumen Kebijakan Fiskal' },
      { id: 'sub-4', title: '4. Respons terhadap Inflasi dan Resesi' },
    ],
    contentSections: [
      {
        heading: '1. Siapa yang Mengendalikan Apa?',
        body: 'Kebijakan Moneter dikelola secara independen oleh Bank Sentral (di Indonesia: Bank Indonesia) untuk mengendalikan jumlah uang beredar (JUB) dan stabilitas nilai tukar serta inflasi. Sedangkan Kebijakan Fiskal dikelola oleh Pemerintah/Kementerian Keuangan melalui pengelolaan APBN, penerimaan pajak, dan belanja negara (government spending).',
      },
      {
        heading: '2. Kebijakan untuk Meredam Inflasi Tinggi',
        body: 'Saat inflasi melonjak tinggi, otoritas menerapkan kebijakan kontraktif (tight policy): Bank Sentral menaikkan suku bunga acuan (BI Rate) dan menaikkan rasio cadangan wajib minimum bank. Pada saat yang sama, pemerintah dapat memangkas belanja negara agar peredaran uang mereda.',
      },
    ],
    sampleProblem: {
      question: 'Tindakan apa yang dapat dilakukan Bank Indonesia jika jumlah uang yang beredar di masyarakat terlalu banyak dan memicu kenaikan harga barang?',
      steps: [
        '1. Permasalahan: Kelebihan jumlah uang beredar yang memicu inflasi.',
        '2. Solusi: Menerapkan kebijakan moneter kontraktif.',
        '3. Instrumen: Menjual Surat Berharga Negara (SBN) dalam Operasi Pasar Terbuka untuk menyerap likuiditas masyarakat.',
        '4. Tindakan lain: Menaikkan tingkat suku bunga diskonto dan menaikkan giro wajib minimum.',
      ],
      answer: 'Menjual surat berharga ke pasar dan menaikkan suku bunga acuan.',
    },
    summary: 'Kebijakan moneter mengatur aliran uang dan kredit melalui sistem perbankan, sementara kebijakan fiskal menggerakkan perekonomian melalui instrumen anggaran belanja dan pajak negara.',
  },
  {
    id: 'les-umum-01-01',
    courseId: 'umum-01',
    title: 'Kekuatan Bunga Berbunga (Compound Interest) & Arus Kas',
    category: 'pengetahuan-umum',
    difficulty: 'Easy',
    duration: '10 Menit',
    xpReward: 25,
    order: 1,
    objectives: [
      'Memahami konsep waktu dari uang (Time Value of Money).',
      'Menghitung pertumbuhan eksponensial compound interest.',
      'Menyusun piramida keuangan dasar: Dana Darurat, Asuransi, dan Investasi.',
    ],
    submaterials: [
      { id: 'sub-1', title: '1. Time Value of Money' },
      { id: 'sub-2', title: '2. Cara Kerja Bunga Berbunga' },
      { id: 'sub-3', title: '3. Aturan 50-30-20 dalam Budgeting' },
      { id: 'sub-4', title: '4. Membangun Dana Darurat' },
    ],
    contentSections: [
      {
        heading: '1. Mengapa Waktu adalah Sekutu Terbaik Investor?',
        body: 'Albert Einstein pernah menyebut bunga majemuk (compound interest) sebagai keajaiban dunia ke-8. Dalam bunga majemuk, imbal hasil yang Anda dapatkan tidak hanya berasal dari modal pokok awal, tetapi juga dari akumulasi keuntungan yang diinvestasikan kembali. Rumus dasarnya adalah A = P(1 + r/n)^(nt).',
      },
      {
        heading: '2. Metode Pengelolaan Kas 50/30/20',
        body: `Pembagian alokasi pendapatan bulanan yang seimbang:
• 50% untuk Kebutuhan Pokok (Needs): Makanan, tempat tinggal, transportasi, tagihan listrik/air.
• 30% untuk Keinginan (Wants): Hobi, hiburan, makan di restoran, langganan streaming.
• 20% untuk Tabungan & Investasi (Savings/Investments): Dana darurat dan instrumen investasi jangka panjang.`,
      },
    ],
    sampleProblem: {
      question: 'Jika seseorang menginvestasikan Rp 10.000.000 dengan imbal hasil tahunan rata-rata 10% per tahun secara bunga majemuk tahunan, berapa perkiraan nilainya setelah 3 tahun?',
      steps: [
        '1. Tahun ke-1: Rp 10.000.000 + 10% = Rp 11.000.000.',
        '2. Tahun ke-2: Bunga 10% dihitung dari Rp 11.000.000 = Rp 1.100.000 → Menjadi Rp 12.100.000.',
        '3. Tahun ke-3: Bunga 10% dihitung dari Rp 12.100.000 = Rp 1.210.000 → Menjadi Rp 13.310.000.',
      ],
      answer: 'Nilai investasi tumbuh menjadi Rp 13.310.000.',
    },
    summary: 'Mulai berinvestasi lebih awal dengan disiplin dan pemahaman risiko memberikan dampak eksponensial berkat efek akumulasi compound interest.',
  },
];
