import { useState, useEffect, useMemo } from "react";

const sections = [
  {
    id: "web-basics",
    title: "Web Fundamentals",
    icon: "🌐",
    color: "#00d4aa",
    questions: [
      {
        id: "wb1",
        text: "Apa perbedaan utama antara HTML, CSS, dan JavaScript?",
        type: "multiple",
        options: [
          "HTML = struktur, CSS = tampilan, JS = interaktivitas",
          "HTML = markup konten, CSS = logika tampilan, JS = penyimpanan data",
          "HTML = struktur, CSS = style visual, JS = logika dan manajemen data",
          "HTML = teks, CSS = fungsi interaktif, JS = desain tampilan",
        ],
        answer: 0,
        explanation: "HTML menentukan struktur dokumen (heading, paragraf, form, tabel), CSS mengatur presentasi visual (layout, warna, tipografi), dan JavaScript menambahkan perilaku dinamis (event handling, validasi, manipulasi DOM). Ketiganya saling melengkapi: struktur tanpa style terlihat polos, style tanpa struktur tidak bermakna, dan interaktivitas tanpa keduanya tidak punya konteks.",
      },
      {
        id: "wb2",
        text: "Apa yang dimaksud dengan 'responsive design'?",
        type: "multiple",
        options: [
          "Website yang tampilannya tetap optimal di berbagai ukuran layar dan perangkat",
          "Website yang cepat loading-nya meskipun di koneksi lambat",
          "Website yang bisa diakses tanpa koneksi internet",
          "Website yang punya animasi dan efek interaktif berlebihan",
        ],
        answer: 0,
        explanation: "Responsive design berarti satu codebase UI bisa beradaptasi ke berbagai ukuran viewport menggunakan teknik seperti fluid layout, media query, dan elemen fleksibel. Tujuannya bukan hanya mengecilkan tampilan, tetapi menjaga keterbacaan, jarak klik, dan hirarki konten tetap baik di desktop, tablet, maupun mobile.",
      },
      {
        id: "wb3",
        text: "Apa itu DOM (Document Object Model)?",
        type: "multiple",
        options: [
          "Sistem penyimpanan yang mirip database untuk data website",
          "Library atau framework yang membantu membuat halaman web",
          "Representasi struktur HTML sebagai objek yang bisa dimanipulasi JS",
          "Protokol komunikasi antara browser dan server",
        ],
        answer: 2,
        explanation: "DOM (Document Object Model) adalah representasi tree dari dokumen HTML yang diekspos sebagai objek JavaScript. Karena berbentuk objek, kita bisa membaca dan mengubah node (elemen, atribut, teks) saat runtime, misalnya menambah elemen baru, mengganti isi teks, atau merespons klik pengguna.",
      },
      {
        id: "wb4",
        text: "Apa fungsi tag <script> di HTML?",
        type: "multiple",
        options: [
          "Memuat file CSS eksternal ke dalam halaman",
          "Menyisipkan kode JavaScript ke halaman HTML",
          "Mendefinisikan struktur tabel HTML secara otomatis",
          "Menjalankan koneksi database dari browser",
        ],
        answer: 1,
        explanation: "Tag <script> memberi tahu browser untuk memuat dan mengeksekusi JavaScript. Kode bisa ditulis langsung (inline) atau dari file eksternal (src). Urutan peletakan script memengaruhi kapan kode dijalankan terhadap DOM, karena script dapat menunggu parsing selesai atau langsung dieksekusi tergantung konfigurasi.",
      },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript",
    icon: "⚡",
    color: "#f7df1e",
    questions: [
      {
        id: "js1",
        text: "Apa perbedaan 'let', 'const', dan 'var' di JavaScript?",
        type: "multiple",
        options: [
          "var = function-scoped, let = block-scoped, const = block-scoped; semua bisa di-reassign",
          "var = function-scoped bisa re-declare, let = block-scoped bisa re-assign, const = block-scoped tidak bisa re-assign",
          "var = function-scoped, let = block-scoped, const = block-scoped; semua bisa diredeclare",
          "const hanya untuk string, let untuk angka, var untuk boolean",
        ],
        answer: 1,
        explanation: "Perbedaan utamanya ada pada scope dan mutability. var memiliki function scope dan bisa dideklarasikan ulang, sehingga lebih mudah menimbulkan bug pada kode modern. let memiliki block scope dan bisa di-assign ulang, sedangkan const juga block scope tetapi binding variabelnya tidak bisa diganti. Karena itu, praktik umum adalah default ke const, gunakan let jika nilainya memang berubah.",
      },
      {
        id: "js2",
        text: "Apa output dari kode berikut?\n\nconsole.log(typeof null)",
        type: "multiple",
        options: ["'null'", "'undefined'", "'object'", "'boolean'"],
        answer: 2,
        explanation: "typeof null menghasilkan 'object' karena keputusan historis pada implementasi awal JavaScript. Secara konsep null merepresentasikan 'nilai kosong sengaja', tetapi operator typeof tetap mengembalikan 'object' demi backward compatibility agar kode lama tidak rusak.",
      },
      {
        id: "js3",
        text: "Apa yang dimaksud dengan 'async/await' di JavaScript?",
        type: "multiple",
        options: [
          "Cara untuk menulis kode paralel dengan thread terpisah",
          "Syntax sugar untuk menulis Promise-based code secara synchronous-looking",
          "Metode untuk mempercepat eksekusi JavaScript dengan optimasi runtime",
          "Fitur eksternal untuk membuat HTTP request secara otomatis",
        ],
        answer: 1,
        explanation: "async/await adalah sintaks untuk bekerja dengan Promise memakai alur yang lebih mudah dibaca. Fungsi async selalu mengembalikan Promise, dan await menunggu Promise settle tanpa memblokir event loop. Ini membuat error handling (try/catch) dan alur langkah-per-langkah jauh lebih jelas dibanding rantai callback panjang.",
      },
      {
        id: "js4",
        text: "Apa itu 'callback function'?",
        type: "multiple",
        options: [
          "Fungsi yang memanggil dirinya sendiri berulang kali",
          "Fungsi yang dikirim sebagai argumen ke fungsi lain dan dipanggil kemudian",
          "Fungsi yang hanya boleh mengembalikan nilai boolean",
          "Fungsi yang digunakan khusus untuk request API",
        ],
        answer: 1,
        explanation: "Callback adalah fungsi yang dipassing ke fungsi lain untuk dipanggil di waktu tertentu, misalnya setelah I/O selesai atau saat event terjadi. Pola ini fundamental di JavaScript karena banyak operasi bersifat asynchronous. Kelemahannya, callback bertingkat bisa sulit dibaca, sehingga sering digantikan Promise dan async/await.",
      },
      {
        id: "js5",
        text: "Apa output dari: [1, 2, 3].map(x => x * 2)?",
        type: "multiple",
        options: ["6", "[2, 4, 6]", "[1, 2, 3, 1, 2, 3]", "undefined"],
        answer: 1,
        explanation: ".map() melakukan transformasi setiap elemen array dan mengembalikan array baru dengan panjang yang sama. Pada contoh ini, tiap angka dikali 2 sehingga hasilnya [2, 4, 6]. Array asal tetap utuh karena map bersifat non-mutating terhadap array sumber.",
      },
    ],
  },
  {
    id: "typescript",
    title: "TypeScript",
    icon: "🔷",
    color: "#3178c6",
    questions: [
      {
        id: "ts1",
        text: "Apa itu TypeScript dan hubungannya dengan JavaScript?",
        type: "multiple",
        options: [
          "TypeScript adalah bahasa yang sepenuhnya berbeda dari JavaScript",
          "TypeScript adalah superset JavaScript yang menambahkan static typing",
          "TypeScript adalah versi JavaScript khusus untuk backend saja",
          "TypeScript hanya bisa dijalankan di Node.js, tidak di browser",
        ],
        answer: 1,
        explanation: "TypeScript adalah JavaScript + sistem tipe statis. Artinya, sintaks JavaScript tetap berlaku, tetapi compiler TypeScript menambahkan pemeriksaan tipe sebelum kode dijalankan. Hasil akhirnya tetap JavaScript, namun dengan jaring pengaman tambahan saat development.",
      },
      {
        id: "ts2",
        text: "Apa keuntungan utama menggunakan TypeScript?",
        type: "multiple",
        options: [
          "Kode berjalan lebih cepat saat runtime karena optimisasi otomatis",
          "Tidak perlu lagi belajar JavaScript karena TypeScript menggantikan sepenuhnya",
          "Error bisa terdeteksi saat development (compile time) sebelum kode dijalankan",
          "File JavaScript menjadi lebih kecil ukurannya karena tipe statis",
        ],
        answer: 2,
        explanation: "Manfaat utama TypeScript adalah menangkap type mismatch lebih awal (compile time), misalnya fungsi yang seharusnya menerima string malah diberi number. Dengan deteksi dini, bug yang biasanya baru muncul saat runtime bisa dicegah, sehingga refactor lebih aman dan debugging lebih cepat.",
      },
      {
        id: "ts3",
        text: "Dari kode TypeScript berikut, mana yang BENAR?\n\nfunction greet(name: string): string { ... }",
        type: "multiple",
        options: [
          "name harus selalu berupa angka",
          "Fungsi menerima string dan mengembalikan string — jika dipanggil dengan angka, TypeScript akan error",
          "': string' setelah name tidak ada artinya",
          "Fungsi ini tidak bisa dipanggil dari JavaScript",
        ],
        answer: 1,
        explanation: "Deklarasi name: string berarti argumen harus bertipe string, sedangkan ): string berarti nilai balik fungsi harus string. Jika dipanggil dengan tipe lain (misalnya number), TypeScript akan memberi error saat proses compile/checking sebelum aplikasi dijalankan.",
      },
      {
        id: "ts4",
        text: "Apa itu 'interface' di TypeScript?",
        type: "multiple",
        options: [
          "Sama persis dengan class di JavaScript",
          "Kontrak/blueprint yang mendefinisikan bentuk (shape) dari sebuah objek",
          "Cara untuk import modul eksternal",
          "Syntax khusus untuk menulis loop",
        ],
        answer: 1,
        explanation: "Interface mendefinisikan struktur data yang diharapkan, misalnya properti apa yang wajib ada dan tipe masing-masing. Ini berfungsi sebagai kontrak antarbagian kode, sehingga object yang tidak sesuai bentuknya bisa ditolak lebih awal oleh TypeScript.",
      },
    ],
  },
  {
    id: "git",
    title: "Git & GitHub",
    icon: "🌿",
    color: "#f05032",
    questions: [
      {
        id: "git1",
        text: "Apa perbedaan antara Git dan GitHub?",
        type: "multiple",
        options: [
          "Keduanya sama-sama sistem version control dengan fitur yang identik",
          "Git = version control system (tool lokal), GitHub = platform hosting repository Git",
          "GitHub adalah versi cloud dari Git yang menjaga semua branch tetap sinkron",
          "Git hanya untuk Linux, GitHub untuk Windows",
        ],
        answer: 1,
        explanation: "Git adalah sistem version control yang melacak perubahan kode sebagai commit di repository lokal. GitHub adalah platform hosting kolaboratif untuk repository Git, menyediakan fitur seperti pull request, review, dan issue tracking. Jadi Git adalah tool inti, GitHub adalah layanan kolaborasinya.",
      },
      {
        id: "git2",
        text: "Apa yang dilakukan perintah 'git commit -m \"message\"'?",
        type: "multiple",
        options: [
          "Mengunggah perubahan ke remote repository seperti GitHub",
          "Menyimpan snapshot perubahan ke repository lokal dengan pesan deskripsi",
          "Membuat branch baru di repository lokal dengan nama baru",
          "Menggabungkan branch saat ini dengan branch lain",
        ],
        answer: 1,
        explanation: "git commit merekam perubahan yang sudah di-stage menjadi snapshot baru di histori lokal. Commit bersifat lokal dulu, sehingga belum muncul di remote. Agar commit terkirim ke GitHub atau origin lain, langkah lanjutannya adalah git push.",
      },
      {
        id: "git3",
        text: "Apa itu 'branching' dalam Git?",
        type: "multiple",
        options: [
          "Menghapus file dari repository",
          "Membuat jalur pengembangan paralel yang independen dari branch utama",
          "Mengunduh repository dari GitHub",
          "Membalikkan commit terakhir",
        ],
        answer: 1,
        explanation: "Branch adalah jalur histori terpisah dari branch utama. Dengan branch, tim bisa mengerjakan fitur atau bugfix secara paralel tanpa langsung mengganggu main. Setelah stabil dan lolos review/test, perubahan digabung (merge/rebase) ke branch target.",
      },
      {
        id: "git4",
        text: "Apa perbedaan 'git pull' dan 'git fetch'?",
        type: "multiple",
        options: [
          "Keduanya identik",
          "git pull = fetch + merge otomatis, git fetch = hanya download tanpa merge",
          "git fetch lebih baru dari git pull",
          "git pull hanya untuk branch main, git fetch untuk semua branch",
        ],
        answer: 1,
        explanation: "git fetch hanya menyinkronkan referensi remote ke lokal (mengunduh update histori) tanpa mengubah branch aktif. git pull menjalankan fetch lalu langsung mengintegrasikan update ke branch saat ini (umumnya merge atau rebase), sehingga working branch bisa langsung berubah.",
      },
      {
        id: "git5",
        text: "Kamu salah commit sesuatu dan ingin membatalkan commit terakhir tapi TETAP menyimpan perubahan di file (unstaged). Perintah apa yang digunakan?",
        type: "multiple",
        options: [
          "git revert HEAD",
          "git reset --hard HEAD~1",
          "git reset --soft HEAD~1",
          "git checkout HEAD~1",
        ],
        answer: 2,
        explanation: "git reset --soft HEAD~1 memundurkan pointer commit satu langkah, tetapi isi perubahan tetap ada di staging area sehingga mudah diperbaiki lalu commit ulang. Berbeda dengan --hard yang membuang perubahan dari working tree, dan revert yang tidak menghapus histori melainkan menambah commit pembalik.",
      },
    ],
  },
  {
    id: "nodejs",
    title: "Node.js & NPM",
    icon: "📦",
    color: "#68a063",
    questions: [
      {
        id: "node1",
        text: "Apa itu Node.js?",
        type: "multiple",
        options: [
          "Framework CSS untuk membuat tampilan",
          "JavaScript runtime yang memungkinkan JS berjalan di server (di luar browser)",
          "Database untuk menyimpan data",
          "Tool untuk membuat mobile app",
        ],
        answer: 1,
        explanation: "Node.js adalah runtime yang menjalankan JavaScript di sisi server menggunakan mesin V8. Dengan Node.js, JavaScript bisa dipakai untuk backend, CLI tool, automation, dan layanan jaringan, bukan hanya untuk interaksi di browser.",
      },
      {
        id: "node2",
        text: "Apa fungsi file 'package.json'?",
        type: "multiple",
        options: [
          "File konfigurasi untuk menjalankan style dan tampilan website",
          "Menyimpan semua kode JavaScript project dalam satu tempat",
          "Mendefinisikan metadata project, dependencies, dan scripts yang bisa dijalankan",
          "File yang berisi konfigurasi sensitif seperti password dan API keys",
        ],
        answer: 2,
        explanation: "package.json adalah file manifest proyek JavaScript/Node.js. Di dalamnya ada metadata proyek, daftar dependency, devDependency, serta scripts yang menstandardkan command seperti dev, build, dan test agar workflow tim konsisten.",
      },
      {
        id: "node3",
        text: "Apa perbedaan 'dependencies' dan 'devDependencies' di package.json?",
        type: "multiple",
        options: [
          "Tidak ada perbedaan, keduanya sama",
          "dependencies = dibutuhkan di production, devDependencies = hanya untuk development (testing, build tools)",
          "devDependencies lebih penting dari dependencies",
          "dependencies untuk frontend, devDependencies untuk backend",
        ],
        answer: 1,
        explanation: "dependencies berisi paket yang dibutuhkan aplikasi saat runtime production, misalnya React pada aplikasi client. devDependencies berisi alat bantu development seperti linter, bundler, atau compiler yang tidak wajib berjalan di production server.",
      },
      {
        id: "node4",
        text: "Apa yang terjadi saat kamu menjalankan 'npm install'?",
        type: "multiple",
        options: [
          "Menginstall runtime Node.js ke komputer",
          "Mengupload project ke server hosting",
          "Mengunduh semua packages yang terdaftar di package.json ke folder node_modules",
          "Menjalankan semua script test yang tersedia di project",
        ],
        answer: 2,
        explanation: "npm install membaca package.json lalu menginstal paket ke node_modules sesuai aturan versi. npm juga membuat/memperbarui package-lock.json agar versi paket yang dipasang lebih reproducible, sehingga lingkungan lokal dan CI lebih konsisten.",
      },
    ],
  },
  {
    id: "nextjs",
    title: "React & Next.js",
    icon: "⚛️",
    color: "#61dafb",
    questions: [
      {
        id: "next1",
        text: "Apa itu React dan apa konsep utamanya?",
        type: "multiple",
        options: [
          "Database library dari Facebook",
          "Library JavaScript untuk membangun UI menggunakan komponen yang reusable",
          "Framework full-stack untuk membuat website",
          "Tool untuk mengoptimasi gambar di website",
        ],
        answer: 1,
        explanation: "React adalah library untuk membangun UI berbasis komponen reusable. Data mengalir melalui props, state mengatur kondisi lokal komponen, dan React melakukan update DOM secara efisien dengan mekanisme rekonsiliasi sehingga rendering lebih terkelola.",
      },
      {
        id: "next2",
        text: "Apa yang membedakan Next.js dari React biasa?",
        type: "multiple",
        options: [
          "Next.js bukan React, melainkan framework yang sama sekali tidak menggunakan React",
          "Next.js adalah React framework yang menambahkan routing, SSR, SSG, API routes, dan optimasi bawaan",
          "Next.js hanya dibuat untuk aplikasi mobile dan bukan web",
          "Next.js biasanya lebih lambat daripada React biasa karena overhead tambahan",
        ],
        answer: 1,
        explanation: "Next.js adalah framework React yang menambahkan fitur arsitektural seperti routing berbasis file, rendering server/static, dan optimasi bawaan. Dengan ini, developer tidak perlu merakit semua tooling dari nol untuk kebutuhan produksi seperti SEO, performa, dan struktur aplikasi.",
      },
      {
        id: "next3",
        text: "Apa itu 'Server-Side Rendering' (SSR)?",
        type: "multiple",
        options: [
          "HTML dirender di browser pengguna menggunakan JavaScript",
          "HTML digenerate di server sebelum dikirim ke browser",
          "Website disimpan di database sebelum ditampilkan",
          "Rendering dilakukan di CDN (Content Delivery Network)",
        ],
        answer: 1,
        explanation: "SSR (Server-Side Rendering) berarti server membangun HTML lebih dulu sebelum respons dikirim ke browser. Dampaknya, konten awal lebih cepat terlihat dan mudah diindeks mesin pencari. Setelah itu, JavaScript melakukan hydration agar halaman menjadi interaktif penuh.",
      },
      {
        id: "next4",
        text: "Di Next.js App Router, apa yang dimaksud dengan 'use client' directive?",
        type: "multiple",
        options: [
          "Menandai komponen agar dirender di server saja tanpa lifecycle browser",
          "Menandai komponen sebagai Client Component yang bisa menggunakan hooks dan event handlers",
          "Direktif khusus untuk mengimport library eksternal di Next.js",
          "Perintah khusus untuk men-deploy aplikasi Next.js ke Vercel",
        ],
        answer: 1,
        explanation: "Direktif 'use client' memberi tahu Next.js bahwa komponen harus dijalankan di browser (client-side), bukan hanya di server. Ini diperlukan saat komponen memakai state, effect, akses API browser, atau event handler. Tanpa direktif ini, komponen App Router diperlakukan sebagai Server Component secara default.",
      },
    ],
  },
  {
    id: "database",
    title: "SQL & Database",
    icon: "🗄️",
    color: "#336791",
    questions: [
      {
        id: "db1",
        text: "Apa itu SQL?",
        type: "multiple",
        options: [
          "Bahasa pemrograman untuk membuat website",
          "Structured Query Language — bahasa untuk berinteraksi dengan relational database",
          "Bahasa untuk menulis API di backend",
          "Format penyimpanan data di database NoSQL",
        ],
        answer: 1,
        explanation: "SQL (Structured Query Language) adalah bahasa deklaratif untuk mengelola data di relational database. SQL dipakai untuk query data (SELECT), perubahan data (INSERT/UPDATE/DELETE), dan definisi struktur tabel/index sesuai kebutuhan aplikasi.",
      },
      {
        id: "db2",
        text: "Apa yang dilakukan query SQL berikut?\n\nSELECT * FROM users WHERE age > 18",
        type: "multiple",
        options: [
          "Menghapus semua user yang berumur di atas 18",
          "Mencoba membuat tabel baru bernama users",
          "Mengambil semua kolom dari tabel users untuk baris yang age-nya lebih dari 18",
          "Mengubah umur semua user menjadi 18",
        ],
        answer: 2,
        explanation: "Query ini membaca tabel users lalu memfilter baris dengan syarat age > 18. Kata kunci SELECT * berarti semua kolom dikembalikan untuk baris yang lolos filter. Perintah ini hanya membaca data, tidak mengubah isi tabel.",
      },
      {
        id: "db3",
        text: "Apa itu 'primary key' di database relasional?",
        type: "multiple",
        options: [
          "Password untuk mengakses database",
          "Kolom pertama di setiap tabel",
          "Identifier unik yang membedakan setiap baris dalam tabel",
          "Kunci enkripsi untuk data sensitif",
        ],
        answer: 2,
        explanation: "Primary key adalah identitas unik tiap record pada tabel relasional. Nilainya harus unik dan tidak boleh NULL agar setiap baris bisa direferensikan dengan pasti, misalnya untuk join antar tabel dan menjaga integritas data.",
      },
      {
        id: "db4",
        text: "Apa itu Supabase?",
        type: "multiple",
        options: [
          "Framework JavaScript untuk frontend",
          "Open-source Firebase alternative yang menggunakan PostgreSQL sebagai basis datanya",
          "Tool khusus untuk membuat mobile app",
          "Bahasa pemrograman untuk backend",
        ],
        answer: 1,
        explanation: "Supabase adalah platform BaaS berbasis PostgreSQL yang menyediakan komponen backend siap pakai seperti database, autentikasi, storage, realtime, dan fungsi edge. Tujuannya mempercepat pengembangan tanpa membangun semua infrastruktur backend dari nol.",
      },
    ],
  },
  {
    id: "deployment",
    title: "Deployment & CI/CD",
    icon: "🚀",
    color: "#ff6b6b",
    questions: [
      {
        id: "dep1",
        text: "Apa yang dimaksud dengan 'deployment'?",
        type: "multiple",
        options: [
          "Proses menulis kode aplikasi",
          "Proses membuat database",
          "Proses memindahkan aplikasi dari environment development ke server agar bisa diakses publik",
          "Proses testing aplikasi sebelum diluncurkan",
        ],
        answer: 2,
        explanation: "Deployment adalah proses merilis aplikasi ke environment production agar bisa diakses pengguna nyata. Biasanya mencakup build artefak, konfigurasi environment, upload ke server/platform, lalu verifikasi bahwa aplikasi berjalan stabil setelah rilis.",
      },
      {
        id: "dep2",
        text: "Apa itu CI/CD?",
        type: "multiple",
        options: [
          "Istilah untuk menulis kode dengan bantuan AI assistant seperti Copilot",
          "Continuous Integration / Continuous Deployment — otomatisasi build, test, dan deploy saat ada perubahan kode",
          "Nama dua framework JavaScript populer yang biasa digunakan di frontend",
          "Protokol khusus untuk komunikasi antara frontend dan backend",
        ],
        answer: 1,
        explanation: "CI/CD adalah pipeline otomatis untuk menjaga kualitas dan kecepatan rilis. CI (Continuous Integration) menjalankan build/test pada perubahan kode, sedangkan CD (Continuous Delivery/Deployment) menyiapkan atau langsung merilis versi baru setelah quality gate terpenuhi.",
      },
      {
        id: "dep3",
        text: "Apa itu environment variable (.env)?",
        type: "multiple",
        options: [
          "File untuk menyimpan gambar dan aset website",
          "Konfigurasi sensitif (API keys, passwords, URLs) yang disimpan terpisah dari kode untuk keamanan",
          "Script untuk menjalankan test otomatis",
          "File konfigurasi untuk mengatur tampilan website",
        ],
        answer: 1,
        explanation: "File .env menyimpan variabel konfigurasi yang bisa berbeda antar environment, seperti API key, database URL, dan secret. Nilai ini dipisahkan dari source code agar lebih aman dan mudah dikelola saat berpindah dari development ke staging atau production.",
      },
      {
        id: "dep4",
        text: "Apa itu GitHub Actions?",
        type: "multiple",
        options: [
          "Fitur GitHub untuk memberi bintang dan bookmark repository",
          "Platform GitHub untuk hosting website static secara gratis",
          "Automation platform bawaan GitHub untuk CI/CD — bisa otomatis build/test/deploy saat ada push atau PR",
          "Tool di GitHub yang membantu membuat dokumentasi proyek secara otomatis",
        ],
        answer: 2,
        explanation: "GitHub Actions adalah layanan automasi berbasis workflow YAML di repository GitHub. Workflow dapat dipicu event seperti push atau pull request untuk menjalankan job build, test, lint, hingga deploy secara konsisten tanpa proses manual berulang.",
      },
    ],
  },
  {
    id: "ai-coding",
    title: "AI & Vibe Coding",
    icon: "🤖",
    color: "#8b5cf6",
    questions: [
      {
        id: "ai1",
        text: "Apa yang dimaksud dengan vibe coding dalam konteks software development?",
        type: "multiple",
        options: [
          "Praktik coding yang bergantung pada asisten AI untuk menghasilkan kode dari perintah bahasa alami",
          "Teknik debugging otomatis yang memeriksa performa server",
          "Metode menulis kode manual tanpa bantuan AI",
          "Proses mengoptimasi database agar lebih cepat",
        ],
        answer: 0,
        explanation: "Vibe coding adalah pendekatan pengembangan di mana developer memberi instruksi natural language ke AI untuk menghasilkan draft kode dengan cepat. Nilai utamanya ada pada percepatan ide ke prototipe, tetapi kualitas akhir tetap bergantung pada review teknis, pengujian, dan pemahaman developer terhadap kode yang dihasilkan.",
      },
      {
        id: "ai2",
        text: "Dalam vibe coding, tools seperti GitHub Copilot, Gemini Code Assist, dan Claude Code biasanya digunakan untuk...",
        type: "multiple",
        options: [
          "Menghasilkan kode dari deskripsi natural language dan memberi saran sementara programmer tetap memeriksa hasilnya",
          "Menjalankan server database di cloud secara otomatis",
          "Menerapkan patch keamanan tanpa perlu review kode",
          "Mengubah aplikasi mobile menjadi desktop tanpa menulis ulang",
        ],
        answer: 0,
        explanation: "Tool seperti Copilot, Gemini Code Assist, atau Claude Code berperan sebagai akselerator penulisan kode: memberi saran, melengkapi boilerplate, atau membuat draft fungsi. Namun output AI tidak boleh dianggap final; tetap perlu code review, validasi requirement, dan test otomatis/manual.",
      },
      {
        id: "ai3",
        text: "Penggunaan Claude Code dibanding chat AI biasa paling tepat karena...",
        type: "multiple",
        options: [
          "Claude Code bisa mengedit file langsung dan menjalankan tugas coding lewat terminal, bukan hanya merespon teks",
          "Claude Code hanya memberi ringkasan artikel, tidak membantu menulis kode",
          "Claude Code adalah bahasa pemrograman baru dari Anthropic",
          "Claude Code menggantikan semua dependency dengan library terbaru",
        ],
        answer: 0,
        explanation: "Keunggulan coding agent seperti Claude Code dibanding chat AI umum adalah kemampuannya bekerja langsung pada konteks engineering: membaca/mengubah file, mengeksekusi command, dan mengikuti alur task coding. Artinya, AI tidak hanya menjawab teori, tetapi dapat membantu eksekusi workflow pengembangan secara end-to-end.",
      },
      {
        id: "ai4",
        text: "GitHub Copilot awalnya dibangun di atas OpenAI Codex dan fungsi utamanya adalah...",
        type: "multiple",
        options: [
          "Melengkapi kode, memberi saran fungsi, dan membantu developer menulis kode lebih cepat",
          "Menghosting repository GitHub secara otomatis",
          "Menjalankan unit test ketika kode di-push",
          "Menerjemahkan kode menjadi gambar UI",
        ],
        answer: 0,
        explanation: "GitHub Copilot berfungsi sebagai AI pair programmer yang memberi autocomplete, saran implementasi fungsi, dan template berdasarkan konteks kode aktif. Fokus utamanya meningkatkan produktivitas penulisan kode, bukan menggantikan proses desain arsitektur, review, dan pengujian.",
      },
      {
        id: "ai5",
        text: "Apa risiko utama vibe coding untuk proyek serius?",
        type: "multiple",
        options: [
          "Kode mungkin tidak mudah dimengerti atau mengandung bug karena developer tidak memahami setiap barisnya",
          "Kode langsung sempurna tanpa perlu pengujian",
          "AI akan selalu memilih UI yang paling menarik secara visual",
          "Vibe coding membatasi software hanya bisa berjalan di browser",
        ],
        answer: 0,
        explanation: "Risiko utama vibe coding adalah technical debt tersembunyi: kode tampak berjalan tetapi tidak dipahami tim, tidak konsisten dengan arsitektur, atau punya celah keamanan. Karena itu, output AI harus melalui standar engineering yang sama seperti kode manual: linting, testing, review, dan observabilitas yang memadai.",
      },
    ],
  },
];

const levelDescriptions = {
  "web-basics": { low: "Perlu mulai dari fundamental HTML/CSS/JS", mid: "Dasar web cukup, perlu pendalaman", high: "Fondasi web sudah solid" },
  javascript: { low: "JS masih sangat dasar — fokus ke fundamentals", mid: "JS lumayan, perlu kuasai async & modern syntax", high: "JS sudah cukup kuat" },
  typescript: { low: "TypeScript belum familiar — mulai dari awal", mid: "Paham konsep TS, perlu praktek lebih", high: "TypeScript sudah dipahami" },
  git: { low: "Git perlu diajarkan dari awal", mid: "Git basics oke, perlu advanced commands", high: "Git sudah lancar" },
  nodejs: { low: "Node/NPM perlu dikenalkan dari nol", mid: "Paham dasar, perlu lebih dalam", high: "Node.js ecosystem sudah familiar" },
  nextjs: { low: "React/Next.js belum dikenal — mulai dari komponen", mid: "Paham konsep, perlu lebih banyak praktek", high: "Framework sudah dipahami" },
  database: { low: "SQL/Database perlu diajarkan dari fundamental", mid: "Dasar SQL oke, perlu Supabase specifics", high: "Database concepts sudah kuat" },
  deployment: { low: "Deployment & CI/CD masih asing", mid: "Konsep deployment cukup, perlu praktek CI/CD", high: "Deployment pipeline sudah paham" },
};

export default function Pretest() {
  const [phase, setPhase] = useState("intro"); // intro | quiz | result
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [scores, setScores] = useState({});
  const [animateIn, setAnimateIn] = useState(true);

  const shuffleArray = (items) => {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  const shuffleQuestion = (questionItem) => {
    const optionPairs = questionItem.options.map((optionText, idx) => ({ optionText, idx }));
    const shuffledPairs = shuffleArray(optionPairs);
    const correctIndex = shuffledPairs.findIndex((pair) => pair.idx === questionItem.answer);
    return {
      ...questionItem,
      options: shuffledPairs.map((pair) => pair.optionText),
      answer: correctIndex,
    };
  };

  const shuffledSections = useMemo(
    () =>
      sections.map((sectionItem) => ({
        ...sectionItem,
        questions: shuffleArray(sectionItem.questions.map(shuffleQuestion)),
      })),
    [],
  );

  const section = shuffledSections[currentSection];
  const question = section?.questions[currentQ];

  const totalQuestions = shuffledSections.reduce((a, s) => a + s.questions.length, 0);
  const answeredCount = Object.keys(answers).length;

  function handleSelect(idx) {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    const isCorrect = idx === question.answer;
    setAnswers((prev) => ({ ...prev, [question.id]: { selected: idx, correct: isCorrect } }));
  }

  function handleNext() {
    setAnimateIn(false);
    setTimeout(() => {
      const nextQ = currentQ + 1;
      if (nextQ < section.questions.length) {
        setCurrentQ(nextQ);
      } else {
        // Calculate section score
        const sectionScore = section.questions.reduce((acc, q) => {
          return acc + (answers[q.id]?.correct ? 1 : 0);
        }, 0);
        const currentAnswer = answers[question.id];
        const extra = currentAnswer ? 0 : selected === question.answer ? 1 : 0;
        const finalScore = sectionScore + extra;
        const pct = (finalScore / section.questions.length) * 100;
        setScores((prev) => ({ ...prev, [section.id]: { score: finalScore, total: section.questions.length, pct } }));

        const nextSection = currentSection + 1;
        if (nextSection < sections.length) {
          setCurrentSection(nextSection);
          setCurrentQ(0);
        } else {
          setPhase("result");
        }
      }
      setSelected(null);
      setRevealed(false);
      setAnimateIn(true);
    }, 200);
  }

  const progress = (answeredCount / totalQuestions) * 100;

  const overallScore = Object.values(scores).reduce((a, s) => a + s.score, 0);
  const overallTotal = Object.values(scores).reduce((a, s) => a + s.total, 0);
  const overallPct = overallTotal > 0 ? Math.round((overallScore / overallTotal) * 100) : 0;

  const getLevel = (pct) => (pct >= 75 ? "high" : pct >= 40 ? "mid" : "low");
  const getLevelLabel = (pct) => (pct >= 75 ? "Solid ✓" : pct >= 40 ? "Cukup ~" : "Perlu Belajar ✗");
  const getLevelColor = (pct) => (pct >= 75 ? "#00d4aa" : pct >= 40 ? "#ffd60a" : "#ff6b6b");

  const styles = {
    root: {
      minHeight: "100vh",
      width: "100%",
      maxWidth: "100vw",
      boxSizing: "border-box",
      background: "#0d0d0d",
      fontFamily: "'Courier New', 'Fira Code', monospace",
      color: "#e0e0e0",
      padding: "0 12px 24px",
      overflowX: "hidden",
    },
    header: {
      background: "linear-gradient(135deg, #111 0%, #1a1a2e 100%)",
      borderBottom: "1px solid #222",
      padding: "16px 24px",
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      alignItems: "center",
      justifyContent: "space-between",
      width: "calc(100% + 24px)",
      marginLeft: "-12px",
      marginRight: "-12px",
      position: "sticky",
      top: 0,
      zIndex: 10,
    },
    logo: {
      fontSize: "14px",
      color: "#00d4aa",
      letterSpacing: "2px",
      fontWeight: "700",
    },
    progressBar: {
      height: "3px",
      background: "#222",
      borderRadius: "2px",
      overflow: "hidden",
      width: "200px",
    },
    progressFill: {
      height: "100%",
      background: "linear-gradient(90deg, #00d4aa, #7c3aed)",
      transition: "width 0.5s ease",
      width: `${progress}%`,
      borderRadius: "2px",
    },
    main: {
      maxWidth: "760px",
      margin: "0 auto",
      padding: "32px 24px",
    },
    card: {
      background: "#111",
      border: "1px solid #1f1f1f",
      borderRadius: "12px",
      padding: "32px",
      marginBottom: "16px",
    },
    intro: {
      textAlign: "center",
      padding: "48px 32px",
    },
    introTitle: {
      fontSize: "32px",
      fontWeight: "900",
      letterSpacing: "-1px",
      marginBottom: "8px",
      background: "linear-gradient(135deg, #00d4aa, #7c3aed)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    introSub: {
      color: "#666",
      fontSize: "13px",
      letterSpacing: "3px",
      marginBottom: "32px",
      textTransform: "uppercase",
    },
    introDesc: {
      color: "#aaa",
      lineHeight: "1.8",
      marginBottom: "40px",
      fontSize: "14px",
      maxWidth: "540px",
      margin: "0 auto 40px",
    },
    startBtn: {
      background: "linear-gradient(135deg, #00d4aa, #0099cc)",
      color: "#000",
      border: "none",
      borderRadius: "8px",
      padding: "14px 40px",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      letterSpacing: "2px",
      textTransform: "uppercase",
      transition: "all 0.2s",
    },
    sectionBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "#1a1a1a",
      border: `1px solid ${section?.color || "#333"}22`,
      borderRadius: "20px",
      padding: "6px 14px",
      fontSize: "12px",
      color: section?.color || "#aaa",
      marginBottom: "24px",
      letterSpacing: "1px",
    },
    qNum: {
      fontSize: "11px",
      color: "#444",
      marginBottom: "12px",
      letterSpacing: "1px",
    },
    qText: {
      fontSize: "16px",
      lineHeight: "1.7",
      marginBottom: "28px",
      color: "#e8e8e8",
      whiteSpace: "pre-line",
    },
    options: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    optionBtn: (idx) => {
      let bg = "#181818";
      let border = "#2a2a2a";
      let color = "#ccc";
      if (revealed) {
        if (idx === question.answer) { bg = "#003d2e"; border = "#00d4aa"; color = "#00d4aa"; }
        else if (idx === selected && idx !== question.answer) { bg = "#2d1515"; border = "#ff6b6b"; color = "#ff6b6b"; }
        else { bg = "#141414"; border = "#1f1f1f"; color = "#555"; }
      } else if (selected === idx) {
        bg = "#1a1a35"; border = "#7c3aed"; color = "#a78bfa";
      }
      return {
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: "8px",
        padding: "14px 16px",
        textAlign: "left",
        cursor: revealed ? "default" : "pointer",
        color,
        fontSize: "13px",
        lineHeight: "1.5",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
      };
    },
    optionLabel: (idx) => ({
      flexShrink: 0,
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      background: revealed && idx === question?.answer ? "#00d4aa" : "#2a2a2a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10px",
      fontWeight: "700",
      color: revealed && idx === question?.answer ? "#000" : "#666",
      marginTop: "1px",
    }),
    explanation: {
      background: "#0a1a15",
      border: "1px solid #00d4aa22",
      borderRadius: "8px",
      padding: "16px",
      marginTop: "16px",
      fontSize: "13px",
      color: "#7ecbb0",
      lineHeight: "1.7",
    },
    nextBtn: {
      marginTop: "24px",
      background: "#00d4aa",
      color: "#000",
      border: "none",
      borderRadius: "8px",
      padding: "12px 28px",
      fontSize: "13px",
      fontWeight: "700",
      cursor: "pointer",
      letterSpacing: "1px",
      display: "block",
      marginLeft: "auto",
    },
    resultHeader: {
      textAlign: "center",
      padding: "32px 0",
      borderBottom: "1px solid #1f1f1f",
      marginBottom: "32px",
    },
    bigScore: {
      fontSize: "72px",
      fontWeight: "900",
      background: overallPct >= 75
        ? "linear-gradient(135deg, #00d4aa, #00cc88)"
        : overallPct >= 40
        ? "linear-gradient(135deg, #ffd60a, #ff9500)"
        : "linear-gradient(135deg, #ff6b6b, #cc0000)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      lineHeight: 1,
    },
    sectionResult: {
      background: "#111",
      border: "1px solid #1f1f1f",
      borderRadius: "10px",
      padding: "20px",
      marginBottom: "12px",
    },
    sectionResultBar: (pct, color) => ({
      height: "4px",
      background: "#1f1f1f",
      borderRadius: "2px",
      overflow: "hidden",
      marginTop: "8px",
    }),
    sectionResultFill: (pct, color) => ({
      height: "100%",
      width: `${pct}%`,
      background: color,
      borderRadius: "2px",
      transition: "width 1s ease",
    }),
    recommendation: {
      background: "#0a0a1a",
      border: "1px solid #7c3aed33",
      borderRadius: "10px",
      padding: "20px",
      marginTop: "24px",
    },
    tag: (color) => ({
      display: "inline-block",
      background: `${color}22`,
      border: `1px solid ${color}44`,
      color,
      borderRadius: "4px",
      padding: "2px 8px",
      fontSize: "11px",
      fontWeight: "700",
      letterSpacing: "1px",
    }),
  };

  const renderIntro = () => (
    <div style={styles.intro}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>🧪</div>
      <div style={styles.introTitle}>Web Dev Pretest</div>
      <div style={styles.introSub}>Baseline Assessment · {totalQuestions} Soal · ~15 Menit</div>
      <p style={styles.introDesc}>
        Kerjakan sesuai pemahaman saat ini — tidak ada yang benar atau salah secara absolut.
        Hasil pretest ini digunakan untuk menyusun modul belajar yang sesuai dengan kebutuhanmu.
        <br /><br />
        Topik yang diuji: Web Fundamentals · JavaScript · TypeScript · Git · Node.js/NPM · React/Next.js · SQL/Database · Deployment & CI/CD
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "40px" }}>
        {sections.map((s) => (
          <span key={s.id} style={{ background: `${s.color}15`, border: `1px solid ${s.color}33`, color: s.color, borderRadius: "16px", padding: "4px 12px", fontSize: "12px" }}>
            {s.icon} {s.title}
          </span>
        ))}
      </div>
      <button style={styles.startBtn} onClick={() => setPhase("quiz")}>
        MULAI PRETEST →
      </button>
    </div>
  );

  const renderQuiz = () => (
    <div style={{ opacity: animateIn ? 1 : 0, transition: "opacity 0.2s", transform: animateIn ? "translateY(0)" : "translateY(10px)" }}>
      <div style={styles.sectionBadge}>
        {section.icon} {section.title}
        <span style={{ color: "#444", marginLeft: "4px" }}>
          · {currentQ + 1}/{section.questions.length}
        </span>
      </div>
      <div style={styles.qNum}>
        Q{answeredCount + 1} / {totalQuestions}
      </div>
      <div style={styles.qText}>{question.text}</div>
      <div style={styles.options}>
        {question.options.map((opt, idx) => (
          <button key={idx} style={styles.optionBtn(idx)} onClick={() => handleSelect(idx)}>
            <span style={styles.optionLabel(idx)}>
              {revealed && idx === question.answer ? "✓" : ["A", "B", "C", "D"][idx]}
            </span>
            <span>{opt}</span>
          </button>
        ))}
      </div>
      {revealed && (
        <div style={styles.explanation}>
          💡 <strong>Penjelasan:</strong> {question.explanation}
        </div>
      )}
      {revealed && (
        <button style={styles.nextBtn} onClick={handleNext}>
          {currentQ + 1 < section.questions.length
            ? "LANJUT →"
            : currentSection + 1 < sections.length
            ? `TOPIK BERIKUTNYA: ${sections[currentSection + 1]?.title.toUpperCase()} →`
            : "LIHAT HASIL →"}
        </button>
      )}
    </div>
  );

  const renderResult = () => (
    <div>
      <div style={styles.resultHeader}>
        <div style={{ fontSize: "13px", color: "#555", letterSpacing: "2px", marginBottom: "16px" }}>HASIL PRETEST</div>
        <div style={styles.bigScore}>{overallPct}%</div>
        <div style={{ fontSize: "14px", color: "#666", marginTop: "8px" }}>
          {overallScore} / {overallTotal} soal benar
        </div>
        <div style={{ marginTop: "16px", fontSize: "14px", color: overallPct >= 75 ? "#00d4aa" : overallPct >= 40 ? "#ffd60a" : "#ff6b6b" }}>
          {overallPct >= 75 ? "🎯 Baseline kuat — modul bisa fokus ke advanced topics" : overallPct >= 40 ? "📚 Baseline cukup — modul dari intermediate level" : "🌱 Baseline awal — modul dari fundamentals"}
        </div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "11px", color: "#444", letterSpacing: "2px", marginBottom: "16px" }}>BREAKDOWN PER TOPIK</div>
        {sections.map((s) => {
          const sc = scores[s.id] || { score: 0, total: s.questions.length, pct: 0 };
          const level = getLevel(sc.pct);
          const lc = getLevelColor(sc.pct);
          return (
            <div key={s.id} style={styles.sectionResult}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>{s.icon}</span>
                  <span style={{ fontSize: "13px", fontWeight: "700" }}>{s.title}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#555" }}>{sc.score}/{sc.total}</span>
                  <span style={styles.tag(lc)}>{getLevelLabel(sc.pct)}</span>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: lc }}>{Math.round(sc.pct)}%</span>
                </div>
              </div>
              <div style={styles.sectionResultBar(sc.pct, s.color)}>
                <div style={styles.sectionResultFill(sc.pct, s.color)} />
              </div>
              <div style={{ fontSize: "12px", color: "#555", marginTop: "8px" }}>
                → {levelDescriptions[s.id][level]}
              </div>
            </div>
          );
        })}
      </div>

      <div style={styles.recommendation}>
        <div style={{ fontSize: "11px", color: "#7c3aed", letterSpacing: "2px", marginBottom: "16px" }}>📋 REKOMENDASI MODUL</div>
        <div style={{ fontSize: "13px", color: "#aaa", lineHeight: "2" }}>
          {Object.entries(scores).map(([id, sc]) => {
            const s = sections.find((x) => x.id === id);
            const level = getLevel(sc.pct);
            if (level === "low") return <div key={id}>⚠️ <strong style={{ color: "#ff6b6b" }}>{s?.title}</strong> — Modul full dari awal, butuh lebih banyak contoh & latihan</div>;
            if (level === "mid") return <div key={id}>📌 <strong style={{ color: "#ffd60a" }}>{s?.title}</strong> — Skip basics, fokus ke praktik dan edge cases</div>;
            return <div key={id}>✅ <strong style={{ color: "#00d4aa" }}>{s?.title}</strong> — Review singkat, langsung ke project-based learning</div>;
          })}
        </div>
        <div style={{ marginTop: "20px", padding: "16px", background: "#111", borderRadius: "8px", fontSize: "12px", color: "#555", lineHeight: "1.8" }}>
          <strong style={{ color: "#aaa" }}>📤 Langkah Selanjutnya:</strong><br />
          Screenshot / share hasil ini ke mentor kamu.<br />
          Hasil ini akan digunakan untuk menyusun modul belajar yang tailored ke kebutuhanmu.
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <div style={styles.logo}>WD.PRETEST</div>
        {phase === "quiz" && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "11px", color: "#444" }}>{Math.round(progress)}%</div>
            <div style={styles.progressBar}>
              <div style={styles.progressFill} />
            </div>
          </div>
        )}
        {phase === "result" && <div style={{ fontSize: "11px", color: "#00d4aa", letterSpacing: "1px" }}>SELESAI ✓</div>}
      </div>
      <div style={styles.main}>
        <div style={styles.card}>
          {phase === "intro" && renderIntro()}
          {phase === "quiz" && renderQuiz()}
          {phase === "result" && renderResult()}
        </div>
      </div>
    </div>
  );
}
