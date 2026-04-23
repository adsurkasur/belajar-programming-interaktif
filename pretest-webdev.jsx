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
        explanation: "Bayangkan website seperti rumah: HTML adalah rangka dan pembagian ruangnya (struktur), CSS adalah cat dan tata interiornya (tampilan), JavaScript adalah listrik dan tombol yang membuat semuanya bereaksi (interaktivitas). Istilah 'struktur' artinya susunan elemen di halaman; 'interaktivitas' artinya halaman bisa merespons aksi user seperti klik, ketik, atau submit.",
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
        explanation: "Responsive design artinya tampilan web menyesuaikan ukuran layar tanpa membuat user zoom-in/zoom-out terus-menerus. Istilah 'viewport' berarti area layar yang terlihat oleh user, dan 'media query' adalah aturan CSS yang aktif hanya pada ukuran layar tertentu. Tujuannya: teks tetap terbaca, tombol tetap mudah ditekan, dan layout tetap rapi di desktop, tablet, maupun mobile.",
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
        explanation: "DOM adalah 'versi objek' dari HTML di memori browser. Istilah 'objek' berarti data yang punya properti dan bisa diakses lewat JavaScript; istilah 'node' berarti satu bagian di tree DOM (misalnya <div>, teks, atau atribut). Dengan DOM, kita bisa ubah isi halaman saat aplikasi berjalan, contohnya mengganti teks tombol setelah user menekan tombol itu.",
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
        explanation: "Tag <script> adalah cara resmi memasukkan JavaScript ke halaman HTML. Script bisa ditulis langsung di file HTML (inline) atau dipisah ke file lain lalu dipanggil dengan src. Posisi script penting karena memengaruhi kapan kode jalan: kalau dijalankan terlalu cepat, elemen HTML yang ingin diakses mungkin belum terbentuk di DOM.",
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
        explanation: "Perbedaan besar ada di 'scope' dan apakah nilainya boleh diubah. Scope adalah area kode tempat variabel bisa diakses; 'block scope' artinya variabel hanya hidup di dalam kurung kurawal { ... } tempat ia dibuat. let dan const memakai block scope, sedangkan var lebih longgar (function scope) sehingga lebih rawan bug. const dipakai jika nilai tidak akan diganti, let dipakai jika nilai memang perlu berubah.",
      },
      {
        id: "js2",
        text: "Apa output dari kode berikut?\n\nconsole.log(typeof null)",
        type: "multiple",
        options: ["'null'", "'undefined'", "'object'", "'boolean'"],
        answer: 2,
        explanation: "Jawaban ini memang terlihat aneh, tapi benar secara perilaku JavaScript: typeof null menghasilkan 'object'. null sendiri artinya 'sengaja kosong' (bukan belum didefinisikan). Ini terjadi karena alasan historis di versi awal JavaScript, lalu dipertahankan agar kode lama yang sudah ada tidak tiba-tiba rusak (backward compatibility).",
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
        explanation: "async/await dipakai untuk menangani proses yang butuh waktu (misalnya ambil data API) tanpa membuat kode berantakan. Promise adalah objek yang mewakili hasil 'nanti', sedangkan await berarti 'tunggu hasil ini dulu' di dalam fungsi async. Kode jadi terasa seperti urutan langkah normal, tetapi JavaScript tetap non-blocking (tidak membekukan seluruh aplikasi saat menunggu).",
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
        explanation: "Callback function adalah fungsi yang dikirim sebagai input ke fungsi lain, lalu dijalankan belakangan pada momen tertentu. Contoh: saat user klik tombol, browser memanggil fungsi callback yang kita daftarkan. Pola ini penting untuk event dan operasi asynchronous, tetapi kalau callback bersarang terlalu dalam, alur kode jadi sulit dibaca.",
      },
      {
        id: "js5",
        text: "Apa output dari: [1, 2, 3].map(x => x * 2)?",
        type: "multiple",
        options: ["6", "[2, 4, 6]", "[1, 2, 3, 1, 2, 3]", "undefined"],
        answer: 1,
        explanation: "Array adalah daftar nilai berurutan, misalnya [1, 2, 3]. method .map() membaca setiap elemen lalu menghasilkan array baru berdasarkan fungsi transformasi yang kita berikan. Di contoh ini tiap angka dikali 2, jadi hasilnya [2, 4, 6]. Penting: array awal tidak berubah; .map() membuat hasil baru.",
      },
    ],
  },
  {
    id: "typescript",
    title: "TypeScript",
    icon: "🔷",
    color: "#60a5fa",
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
        explanation: "TypeScript bisa dianggap JavaScript yang diberi label tipe data. 'Tipe statis' berarti tipe dicek saat development (sebelum dijalankan), misalnya memastikan nama harus string, bukan angka. Kode TypeScript nanti tetap diubah (compile) menjadi JavaScript untuk dijalankan di browser atau Node.js.",
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
        explanation: "Keuntungan utama TypeScript adalah error tipe bisa ketahuan lebih awal, bahkan sebelum aplikasi dijalankan. Contoh: fungsi minta string tapi kita kirim number, editor/kompiler langsung memberi peringatan. Ini mengurangi bug runtime, membuat refactor lebih aman, dan membantu tim memahami kontrak data antar fungsi.",
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
        explanation: "Pada function greet(name: string): string, bagian name: string artinya input name wajib bertipe string. Bagian ): string artinya hasil return fungsi juga harus string. Jadi TypeScript membantu menjaga konsistensi: jika input atau output tidak sesuai tipe yang dijanjikan, akan muncul error saat pengecekan kode.",
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
        explanation: "Interface adalah blueprint bentuk data. Misalnya kita definisikan bahwa User harus punya name (string) dan age (number), maka object yang tidak punya properti itu dianggap tidak valid. Ini memudahkan pemula karena aturan bentuk data jadi jelas dan konsisten di seluruh kode.",
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
        explanation: "Git adalah alat untuk mencatat riwayat perubahan kode di komputer kamu (version control). GitHub adalah layanan online untuk menyimpan repo Git dan berkolaborasi dengan tim. Jadi bedanya sederhana: Git = mesin pencatat versinya, GitHub = tempat berbagi, review, dan kerja barengnya.",
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
        explanation: "git commit menyimpan perubahan yang sudah kamu pilih (staged) menjadi satu catatan versi baru di repo lokal. Anggap seperti 'save point' dengan pesan penjelas. Setelah commit, perubahan belum otomatis ada di GitHub; untuk mengirim ke remote, kamu perlu git push.",
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
        explanation: "Branch adalah cabang kerja terpisah dari main agar kamu bisa eksperimen atau bangun fitur tanpa mengganggu kode utama. Saat fitur sudah stabil, perubahan digabungkan kembali ke main lewat proses merge atau rebase. Pola ini membuat kerja tim lebih aman dan terstruktur.",
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
        explanation: "git fetch hanya mengambil update terbaru dari remote ke lokal, tetapi tidak langsung mencampur ke branch aktif. git pull melakukan dua langkah sekaligus: fetch + gabungkan ke branch aktif. Jadi pull lebih 'langsung berubah', sedangkan fetch lebih aman untuk cek dulu sebelum merge.",
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
        explanation: "git reset --soft HEAD~1 membatalkan commit terakhir, tetapi isi perubahannya tetap ada (masih siap di-commit ulang). Ini cocok kalau pesan commit salah atau ingin menggabungkan commit. Berbeda dengan --hard yang bisa membuang perubahan, sedangkan revert membuat commit baru untuk membalik efek commit lama.",
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
        explanation: "Node.js adalah lingkungan (runtime) untuk menjalankan JavaScript di luar browser, terutama di server. Istilah 'runtime' artinya tempat kode dieksekusi. Dengan Node.js, JavaScript bisa dipakai untuk backend API, script otomatisasi, dan tools command line, bukan hanya untuk tombol/interaksi di halaman web.",
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
        explanation: "package.json adalah file identitas dan konfigurasi utama proyek JavaScript. Di dalamnya ada nama proyek, versi, daftar paket yang dibutuhkan, serta scripts seperti npm run dev/build/test. Ini membantu semua anggota tim menjalankan perintah yang sama dengan cara yang konsisten.",
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
        explanation: "dependencies adalah paket yang dibutuhkan aplikasi saat benar-benar berjalan (runtime), misalnya React di aplikasi frontend. devDependencies adalah alat bantu saat pengembangan, seperti linter atau bundler. Ringkasnya: dependencies untuk 'jalanin aplikasi', devDependencies untuk 'bangun dan cek aplikasi'.",
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
        explanation: "Saat menjalankan npm install, npm membaca package.json lalu mengunduh paket ke folder node_modules. npm juga membuat/menyesuaikan package-lock.json yang mencatat versi detail paket agar hasil instalasi konsisten antar komputer dan CI. Ini penting supaya aplikasi tidak 'jalan di laptop A tapi error di laptop B'.",
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
        explanation: "React adalah library untuk membuat UI dari komponen kecil yang bisa dipakai ulang. props adalah data dari parent ke child, sedangkan state adalah data internal komponen yang bisa berubah. Saat state berubah, React memperbarui tampilan yang perlu saja, sehingga pengelolaan UI lebih terstruktur dan efisien.",
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
        explanation: "Next.js adalah framework di atas React yang menambahkan fitur siap pakai untuk aplikasi produksi. Contohnya routing berbasis file (nama file jadi URL), pilihan rendering server/static, dan optimasi performa bawaan. Jadi developer tidak perlu merakit semua konfigurasi penting dari nol.",
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
        explanation: "SSR (Server-Side Rendering) artinya HTML dibentuk di server lalu dikirim ke browser dalam kondisi sudah berisi konten. Keuntungannya: halaman awal biasanya lebih cepat terlihat dan lebih ramah SEO. Setelah HTML tampil, JavaScript melakukan hydration, yaitu 'menyambungkan' event interaktif ke HTML yang sudah ada.",
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
        explanation: "'use client' adalah penanda bahwa komponen harus berjalan di browser (client), bukan hanya dirender di server. Ini wajib jika komponen memakai useState, useEffect, event handler (onClick), atau akses object browser seperti window. Tanpa directive ini, komponen App Router dianggap Server Component secara default.",
      },
    ],
  },
  {
    id: "database",
    title: "SQL & Database",
    icon: "🗄️",
    color: "#6cb0e8",
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
        explanation: "SQL (Structured Query Language) adalah bahasa untuk berkomunikasi dengan database relasional seperti PostgreSQL/MySQL. Dengan SQL, kita bisa membaca data (SELECT), menambah data (INSERT), mengubah data (UPDATE), dan menghapus data (DELETE). Jadi SQL bukan bahasa UI, tetapi bahasa pengelolaan data.",
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
        explanation: "Perintah SELECT * FROM users WHERE age > 18 berarti: ambil data dari tabel users, lalu pilih hanya baris yang umur (age) lebih dari 18. Tanda * berarti semua kolom diambil. Query ini bersifat read-only, jadi tidak mengubah data di database.",
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
        explanation: "Primary key adalah kolom identitas unik untuk setiap baris data. 'Unik' artinya tidak boleh ada dua baris dengan nilai yang sama, dan tidak boleh kosong (NULL). Ini penting agar satu data bisa dirujuk dengan pasti, misalnya saat menghubungkan tabel users dan orders.",
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
        explanation: "Supabase adalah layanan Backend-as-a-Service (BaaS) berbasis PostgreSQL. Artinya, banyak kebutuhan backend sudah disediakan: database, login/auth, storage file, realtime, dan lain-lain. Ini membantu pemula fokus ke fitur aplikasi tanpa harus menyiapkan backend dari nol.",
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
        explanation: "Deployment adalah proses memindahkan aplikasi dari lingkungan pengembangan ke lingkungan production agar bisa dipakai user sungguhan. Biasanya meliputi build (membuat file siap rilis), set environment variable, upload ke server/platform, lalu pengecekan akhir apakah aplikasi berjalan normal.",
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
        explanation: "CI/CD adalah alur otomatis dari perubahan kode sampai siap rilis. CI (Continuous Integration) biasanya menjalankan build dan test setiap ada perubahan agar bug cepat ketahuan. CD (Continuous Delivery/Deployment) melanjutkan proses ke tahap rilis, baik rilis manual terkontrol maupun otomatis setelah syarat kualitas terpenuhi.",
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
        explanation: "File .env menyimpan nilai konfigurasi seperti API key, database URL, atau secret token. Nilai ini dipisahkan dari source code supaya tidak ikut tersebar saat kode dibagikan. Selain lebih aman, cara ini juga memudahkan karena nilai untuk dev, staging, dan production bisa berbeda tanpa ubah kode aplikasi.",
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
        explanation: "GitHub Actions adalah fitur otomatisasi di GitHub yang dijalankan lewat file workflow berformat YAML. Workflow bisa aktif saat event tertentu, misalnya push atau pull request, lalu menjalankan job seperti test, lint, build, sampai deploy. Tujuannya mengurangi pekerjaan manual berulang dan menjaga proses rilis konsisten.",
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
        explanation: "Vibe coding adalah gaya kerja di mana developer memberi instruksi bahasa natural ke AI untuk membuat draft kode lebih cepat. Ini bagus untuk mempercepat prototipe, tetapi kode hasil AI tetap harus dipahami oleh developer. Jadi AI membantu kecepatan, bukan menggantikan tanggung jawab teknis seperti review dan testing.",
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
        explanation: "Tools AI coding biasanya membantu dengan memberi saran kode, mengisi boilerplate (kode dasar berulang), atau membuat draft fungsi dari deskripsi. Ini mempercepat kerja, terutama untuk tugas rutin. Namun hasilnya harus tetap diverifikasi: apakah sesuai requirement, aman, dan lolos test.",
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
        explanation: "Perbedaan utama coding agent dengan chat AI biasa adalah level aksinya. Chat AI cenderung menjawab teks, sedangkan coding agent bisa ikut bekerja di konteks proyek: membaca file, mengubah kode, dan menjalankan perintah terminal. Karena itu, agent lebih cocok untuk alur kerja coding end-to-end, bukan sekadar tanya-jawab konsep.",
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
        explanation: "GitHub Copilot bekerja seperti pair programmer AI: memberi autocomplete, saran blok kode, dan contoh implementasi sesuai konteks file yang sedang dibuka. Ini sangat membantu produktivitas menulis kode harian. Tetapi keputusan arsitektur, validasi bisnis, dan quality assurance tetap peran developer.",
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
        explanation: "Risiko vibe coding muncul saat tim terlalu cepat menerima output AI tanpa memahami detailnya. Akibatnya bisa muncul technical debt (utang teknis): kode sulit dirawat, tidak konsisten, atau punya celah keamanan tersembunyi. Solusinya sama seperti kode manual: lakukan linting, testing, code review, dan dokumentasi yang cukup.",
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
  "ai-coding": { low: "Perlu fondasi penggunaan AI coding dari awal", mid: "Sudah kenal tool AI, perlu pendalaman praktik aman", high: "Pemahaman AI coding sudah solid" },
};

const termTooltips = {
  "array": "Struktur data berbentuk daftar nilai berurutan, contoh: [1, 2, 3].",
  "runtime": "Lingkungan tempat kode dijalankan, misalnya browser atau Node.js.",
  "viewport": "Area layar yang terlihat user saat ini pada browser.",
  "media query": "Aturan CSS yang aktif pada kondisi tertentu, misalnya lebar layar tertentu.",
  "fluid layout": "Layout yang ukurannya fleksibel mengikuti ukuran layar, bukan ukuran tetap.",
  "scope": "Area kode tempat variabel bisa diakses.",
  "block scope": "Variabel hanya bisa diakses di dalam blok kurung kurawal { ... } tempat dideklarasikan.",
  "function scope": "Variabel bisa diakses di seluruh isi fungsi tempat variabel dibuat.",
  "mutability": "Kemampuan nilai/objek untuk diubah setelah dibuat.",
  "variabel": "Tempat menyimpan nilai di dalam program, biasanya diberi nama.",
  "promise": "Objek yang mewakili hasil operasi asynchronous yang akan selesai nanti (berhasil/gagal).",
  "asynchronous": "Proses yang berjalan tanpa menghentikan proses utama aplikasi.",
  "non-blocking": "Proses menunggu tidak membekukan keseluruhan aplikasi atau UI.",
  "event loop": "Mekanisme JavaScript untuk memproses tugas asynchronous secara bergantian.",
  "event": "Kejadian seperti klik, submit, ketik, atau scroll yang dapat ditangani kode.",
  "event handler": "Fungsi yang dipanggil saat event tertentu terjadi.",
  "dom": "Representasi dokumen HTML sebagai objek yang bisa dibaca/diubah lewat JavaScript.",
  "node": "Satu elemen di tree DOM, bisa berupa tag HTML, teks, atau atribut.",
  "tree": "Struktur hierarki seperti pohon: ada parent (induk) dan child (turunan).",
  "objek": "Tipe data berisi pasangan kunci-nilai (property: value).",
  "property": "Atribut atau field yang dimiliki sebuah objek.",
  "inline": "Ditulis langsung di tempat pemakaian, tidak dipisah ke file lain.",
  "src": "Atribut sumber file eksternal, misalnya script atau gambar.",
  "compile": "Proses mengubah kode sumber menjadi bentuk lain sebelum dijalankan.",
  "compile time": "Tahap pengecekan/kompilasi kode sebelum aplikasi dijalankan.",
  "static typing": "Sistem tipe data yang dicek saat development sebelum runtime.",
  "type mismatch": "Kondisi saat tipe data yang diberikan tidak sesuai tipe yang diharapkan.",
  "string": "Tipe data teks, misalnya 'halo'.",
  "number": "Tipe data angka, misalnya 42 atau 3.14.",
  "boolean": "Tipe data logika dengan dua nilai: true atau false.",
  "refactor": "Merapikan struktur kode tanpa mengubah perilaku fitur.",
  "dependency": "Paket/library yang dibutuhkan aplikasi untuk berjalan.",
  "dependencies": "Kumpulan paket yang dibutuhkan aplikasi saat runtime.",
  "devdependencies": "Kumpulan paket yang dibutuhkan saat development.",
  "devdependency": "Paket yang dibutuhkan saat development, bukan saat aplikasi production berjalan.",
  "package.json": "File manifest proyek JavaScript berisi metadata, dependencies, dan scripts.",
  "node_modules": "Folder tempat paket hasil install npm disimpan.",
  "package-lock.json": "File yang mengunci versi detail paket agar instalasi konsisten.",
  "linter": "Tool untuk memeriksa kualitas kode dan aturan gaya penulisan.",
  "bundler": "Tool yang menggabungkan banyak file kode menjadi bundle siap pakai.",
  "compiler": "Tool yang menerjemahkan kode dari satu bentuk ke bentuk lain.",
  "hydration": "Proses mengaktifkan interaktivitas JavaScript pada HTML yang sudah dirender duluan.",
  "use client": "Direktif Next.js agar komponen dieksekusi di browser (client-side).",
  "client component": "Komponen yang berjalan di browser dan bisa memakai hooks/event.",
  "server component": "Komponen yang dirender di server sebelum dikirim ke browser.",
  "props": "Data yang dikirim dari komponen parent ke komponen child.",
  "state": "Data internal komponen yang bisa berubah dan memicu render ulang.",
  "reconciliation": "Proses React membandingkan perubahan untuk update DOM secara efisien.",
  "ssr": "Server-Side Rendering: HTML dibuat di server sebelum dikirim ke browser.",
  "seo": "Search Engine Optimization: optimasi agar halaman mudah ditemukan mesin pencari.",
  "repository": "Tempat penyimpanan project dan histori perubahannya.",
  "commit": "Snapshot perubahan kode pada satu titik waktu.",
  "branch": "Cabang kerja terpisah dari branch utama.",
  "merge": "Menggabungkan perubahan dari satu branch ke branch lain.",
  "rebase": "Memindahkan basis histori commit agar linier/rapi.",
  "staging area": "Area sementara untuk memilih perubahan sebelum commit.",
  "origin": "Nama default remote repository pada Git.",
  "backward compatibility": "Menjaga perilaku lama agar kode versi sebelumnya tidak rusak.",
  "technical debt": "Konsekuensi jangka panjang dari keputusan cepat yang membuat kode lebih sulit dirawat.",
  "linting": "Pemeriksaan otomatis kualitas/aturan gaya kode.",
  "code review": "Proses meninjau kode oleh developer lain sebelum digabungkan.",
  "boilerplate": "Kode dasar berulang yang biasanya jadi kerangka awal.",
  "yaml": "Format teks untuk konfigurasi terstruktur, sering dipakai di CI/CD.",
  "workflow": "Urutan proses otomatis yang didefinisikan dalam CI/CD.",
  "quality gate": "Syarat kualitas yang harus lolos sebelum lanjut tahap berikutnya.",
  "environment variable": "Konfigurasi dari luar kode, misalnya API key atau URL database.",
  "production": "Lingkungan aplikasi yang dipakai user nyata.",
  "staging": "Lingkungan uji sebelum aplikasi dirilis ke production.",
  "build": "Proses menyiapkan kode menjadi paket siap deploy.",
  "deploy": "Proses merilis aplikasi ke server/platform agar bisa diakses user.",
  "ci/cd": "Otomatisasi build, test, dan rilis aplikasi.",
  "pipeline": "Rangkaian tahap otomatis dari build, test, sampai deploy.",
  "api": "Application Programming Interface, antarmuka komunikasi antar sistem/aplikasi.",
  "sql": "Structured Query Language, bahasa untuk membaca dan mengelola data di database relasional.",
  "query": "Perintah untuk meminta atau memanipulasi data di database.",
  "select": "Kata kunci SQL untuk mengambil data dari tabel.",
  "from": "Kata kunci SQL untuk menentukan sumber tabel data.",
  "where": "Kata kunci SQL untuk memberi kondisi/filter data.",
  "relational database": "Database berbasis tabel yang saling berhubungan lewat key.",
  "table": "Kumpulan data berbentuk baris dan kolom di database.",
  "row": "Satu baris data (record) di dalam tabel.",
  "column": "Kolom/field yang mewakili jenis data tertentu pada tabel.",
  "record": "Satu entri data lengkap dalam tabel; sinonim dari row.",
  "filter": "Proses menyaring data sesuai kondisi tertentu.",
  "primary key": "Kolom unik untuk mengidentifikasi setiap baris di tabel.",
  "edge cases": "Kondisi khusus/ekstrem yang jarang terjadi tetapi tetap harus ditangani.",
};

const PRETEST_STORAGE_KEY = "wd.pretest.progress.v1";

const globalStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes popIn {
    0% { transform: scale(0.9); opacity: 0; }
    60% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes pulseSoft {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.03); }
  }
  .animate-fade-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
  .animate-pop-in { animation: popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
  .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; opacity: 0; }
  
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
  
  .hover-scale { transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, filter 0.2s; }
  .hover-scale:hover { transform: scale(1.04); box-shadow: 0 10px 25px rgba(0,0,0,0.4); filter: brightness(1.1); z-index: 2; }
  .hover-scale:active { transform: scale(0.96); }

  .hover-glow:hover { box-shadow: 0 0 20px rgba(255, 185, 111, 0.3); }

  .text-hover { transition: opacity 0.2s, color 0.2s; }
  .text-hover:hover { opacity: 0.8; }

  .option-btn { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
  .option-btn:hover:not(:disabled) { transform: translateX(8px); background: #3a2a1f !important; border-color: #8c634c !important; }
  .option-btn:active:not(:disabled) { transform: scale(0.98); }

  .progress-fill-anim { transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); }
  
  .score-pulse { animation: pulseSoft 2s infinite ease-in-out; }
`;

export default function Pretest() {
  const [phase, setPhase] = useState("intro"); // intro | quiz | result
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [scores, setScores] = useState({});
  const [animateIn, setAnimateIn] = useState(true);
  const [activeTerm, setActiveTerm] = useState(null);
  const [hasLoadedProgress, setHasLoadedProgress] = useState(false);
  const [resetNotice, setResetNotice] = useState("");

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

  useEffect(() => {
    try {
      const savedRaw = localStorage.getItem(PRETEST_STORAGE_KEY);
      if (!savedRaw) {
        setHasLoadedProgress(true);
        return;
      }

      const saved = JSON.parse(savedRaw);
      if (saved && typeof saved === "object") {
        if (["intro", "quiz", "result"].includes(saved.phase)) setPhase(saved.phase);
        if (Number.isInteger(saved.currentSection)) {
          const safeSection = Math.max(0, Math.min(saved.currentSection, shuffledSections.length - 1));
          setCurrentSection(safeSection);
        }
        if (Number.isInteger(saved.currentQ)) {
          const sectionLength =
            shuffledSections[Math.max(0, Math.min(saved.currentSection ?? 0, shuffledSections.length - 1))]?.questions
              ?.length ?? 1;
          const safeQ = Math.max(0, Math.min(saved.currentQ, sectionLength - 1));
          setCurrentQ(safeQ);
        }
        if (saved.answers && typeof saved.answers === "object") setAnswers(saved.answers);
        if (saved.scores && typeof saved.scores === "object") setScores(saved.scores);
      }
    } catch (_) {
      // Ignore invalid persisted payloads and continue with defaults.
    } finally {
      setHasLoadedProgress(true);
    }
  }, [shuffledSections]);

  useEffect(() => {
    if (!hasLoadedProgress) return;
    try {
      const payload = {
        phase,
        currentSection,
        currentQ,
        answers,
        scores,
      };
      localStorage.setItem(PRETEST_STORAGE_KEY, JSON.stringify(payload));
    } catch (_) {
      // Ignore storage failures in constrained browser modes.
    }
  }, [hasLoadedProgress, phase, currentSection, currentQ, answers, scores]);

  useEffect(() => {
    if (!resetNotice) return;
    const timer = setTimeout(() => setResetNotice(""), 2500);
    return () => clearTimeout(timer);
  }, [resetNotice]);

  const [mountedResult, setMountedResult] = useState(false);
  useEffect(() => {
    if (phase === "result") {
      const t = setTimeout(() => setMountedResult(true), 100);
      return () => clearTimeout(t);
    } else {
      setMountedResult(false);
    }
  }, [phase]);

  function handleGoHome() {
    setPhase("intro");
    setSelected(null);
    setRevealed(false);
    setActiveTerm(null);
  }

  function handleResetProgress() {
    try {
      localStorage.removeItem(PRETEST_STORAGE_KEY);
    } catch (_) {
      // Ignore storage errors and still reset in-memory state.
    }

    setPhase("intro");
    setCurrentSection(0);
    setCurrentQ(0);
    setAnswers({});
    setScores({});
    setSelected(null);
    setRevealed(false);
    setAnimateIn(true);
    setActiveTerm(null);
    setResetNotice("Progress sudah direset!");
  }

  function handleSelect(idx) {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    const isCorrect = idx === question.answer;
    setAnswers((prev) => ({ ...prev, [question.id]: { selected: idx, correct: isCorrect } }));
  }

  function handleNext() {
    setAnimateIn(false);
    setActiveTerm(null);
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

  const tooltipPattern = useMemo(() => {
    const keys = Object.keys(termTooltips)
      .sort((a, b) => b.length - a.length)
      .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    return new RegExp(`(^|[^A-Za-z0-9_])(${keys.join("|")})(?=$|[^A-Za-z0-9_])`, "gi");
  }, []);

  const renderExplanationWithTooltips = (text) => {
    const nodes = [];
    let lastIndex = 0;
    let nodeIndex = 0;
    let match;

    tooltipPattern.lastIndex = 0;
    while ((match = tooltipPattern.exec(text)) !== null) {
      const matchStart = match.index;
      const fullMatch = match[0];
      const leadingBoundary = match[1] || "";
      const termText = match[2];
      const leadingLength = leadingBoundary.length;
      const termStart = matchStart + leadingLength;

      if (lastIndex < matchStart) {
        nodes.push(<span key={`exp-${nodeIndex++}`}>{text.slice(lastIndex, matchStart)}</span>);
      }

      if (leadingBoundary) {
        nodes.push(<span key={`exp-${nodeIndex++}`}>{leadingBoundary}</span>);
      }

      const termDefinition = termTooltips[termText.toLowerCase()];
      if (termDefinition) {
        nodes.push(
          <button
            key={`exp-${nodeIndex++}`}
            type="button"
            style={styles.tooltipTermButton}
            title={termDefinition}
            aria-label={`${termText}: ${termDefinition}`}
            onClick={() =>
              setActiveTerm((prev) =>
                prev?.term === termText ? null : { term: termText, definition: termDefinition },
              )
            }
          >
            {termText}
          </button>,
        );
      } else {
        nodes.push(<span key={`exp-${nodeIndex++}`}>{termText}</span>);
      }

      lastIndex = termStart + termText.length;

      if (tooltipPattern.lastIndex === matchStart) {
        tooltipPattern.lastIndex += fullMatch.length || 1;
      }
    }

    if (lastIndex < text.length) {
      nodes.push(<span key={`exp-${nodeIndex++}`}>{text.slice(lastIndex)}</span>);
    }

    return nodes;
  };

  const csvEscape = (value) => {
    const asString = `${value ?? ""}`;
    return `"${asString.replace(/"/g, '""')}"`;
  };

  const toCsvLine = (items) => items.map(csvEscape).join(",");

  const downloadTextFile = (filename, content, mimeType = "text/csv;charset=utf-8;") => {
    const bom = "\uFEFF";
    const blob = new Blob([bom, content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const handleExportResults = () => {
    const now = new Date();
    const ts = now.toISOString();
    const lines = [];

    lines.push(toCsvLine(["SUMMARY"]));
    lines.push(toCsvLine(["exported_at", ts]));
    lines.push(toCsvLine(["overall_score", `${overallScore}/${overallTotal}`]));
    lines.push(toCsvLine(["overall_percent", `${overallPct}%`]));
    lines.push("");

    lines.push(toCsvLine(["SECTION_ANALYTICS"]));
    lines.push(
      toCsvLine([
        "section_id",
        "section_title",
        "score",
        "total",
        "percent",
        "level_label",
        "recommendation",
      ]),
    );
    sections.forEach((sectionItem) => {
      const sc = scores[sectionItem.id] || { score: 0, total: sectionItem.questions.length, pct: 0 };
      const level = getLevel(sc.pct);
      lines.push(
        toCsvLine([
          sectionItem.id,
          sectionItem.title,
          sc.score,
          sc.total,
          Math.round(sc.pct),
          getLevelLabel(sc.pct),
          levelDescriptions[sectionItem.id][level],
        ]),
      );
    });
    lines.push("");

    lines.push(toCsvLine(["QUESTION_DETAILS"]));
    lines.push(
      toCsvLine([
        "section_id",
        "section_title",
        "question_id",
        "question_text",
        "selected_option_index",
        "selected_option_text",
        "correct_option_index",
        "correct_option_text",
        "is_correct",
        "explanation",
      ]),
    );

    shuffledSections.forEach((sectionItem) => {
      sectionItem.questions.forEach((questionItem) => {
        const answerItem = answers[questionItem.id] || {};
        const selectedIndex = Number.isInteger(answerItem.selected) ? answerItem.selected : "";
        const selectedText = Number.isInteger(answerItem.selected)
          ? questionItem.options[answerItem.selected] || ""
          : "";
        const correctIndex = questionItem.answer;
        const correctText = questionItem.options[questionItem.answer] || "";
        lines.push(
          toCsvLine([
            sectionItem.id,
            sectionItem.title,
            questionItem.id,
            questionItem.text,
            selectedIndex,
            selectedText,
            correctIndex,
            correctText,
            answerItem.correct ? "TRUE" : "FALSE",
            questionItem.explanation,
          ]),
        );
      });
    });

    const fileSafeDate = ts.replace(/[:.]/g, "-");
    downloadTextFile(`hasil-pretest-${fileSafeDate}.csv`, lines.join("\n"));
  };

  const whatsappMessage = `Halo Ade, saya sudah menyelesaikan pretest web dev dengan skor ${overallPct}% (${overallScore}/${overallTotal}). Saya akan kirim file export CSV hasil pretest sebagai lampiran.`;
  const whatsappLink = `https://wa.me/6282228471559?text=${encodeURIComponent(whatsappMessage)}`;
  const resetButtonLabel = resetNotice ? "PROGRESS SUDAH DIRESET!" : "RESET PROGRESS";

  const styles = {
    root: {
      minHeight: "100vh",
      width: "100%",
      maxWidth: "100vw",
      boxSizing: "border-box",
      background: "radial-gradient(circle at 22% 0%, #2a2019 0%, #1d1815 38%, #131110 100%)",
      fontFamily: "'Plus Jakarta Sans', 'Segoe UI Variable', 'Segoe UI', 'Helvetica Neue', sans-serif",
      color: "#f1e8df",
      padding: "0 12px 24px",
      overflowX: "hidden",
    },
    header: {
      background: "linear-gradient(135deg, #241b16 0%, #2b201a 100%)",
      borderBottom: "1px solid #4a352a",
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
    headerHomeGroup: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexWrap: "wrap",
    },
    logoButton: {
      fontSize: "15px",
      color: "#ffbd7a",
      letterSpacing: "1.6px",
      fontWeight: "700",
      background: "transparent",
      border: "none",
      padding: 0,
      margin: 0,
      cursor: "pointer",
      textAlign: "left",
    },
    logoHint: {
      fontSize: "11px",
      color: "#5e8f83",
      letterSpacing: "0.5px",
    },
    logoHintButton: {
      fontSize: "12px",
      color: "#efd4bf",
      letterSpacing: "0.3px",
      background: "transparent",
      border: "none",
      padding: 0,
      margin: 0,
      cursor: "pointer",
      textAlign: "left",
    },
    progressBar: {
      height: "6px",
      background: "#4a352a",
      borderRadius: "999px",
      overflow: "hidden",
      width: "220px",
    },
    progressFill: {
      height: "100%",
      background: "linear-gradient(90deg, #ffb869, #ff7e62)",
      transition: "width 0.5s ease",
      width: `${progress}%`,
      borderRadius: "999px",
    },
    main: {
      maxWidth: "880px",
      margin: "0 auto",
      padding: "40px 24px",
    },
    card: {
      background: "linear-gradient(180deg, #221a15 0%, #1b1613 100%)",
      border: "1px solid #4b372b",
      borderRadius: "16px",
      padding: "36px",
      marginBottom: "16px",
      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.32)",
    },
    intro: {
      textAlign: "center",
      padding: "48px 32px",
    },
    introTitle: {
      fontSize: "40px",
      fontWeight: "900",
      letterSpacing: "-1px",
      marginBottom: "8px",
      color: "#ffd8a7",
    },
    introSub: {
      color: "#e6c7b1",
      fontSize: "14px",
      letterSpacing: "2px",
      marginBottom: "32px",
      textTransform: "uppercase",
    },
    introDesc: {
      color: "#e4d4c7",
      lineHeight: "1.9",
      marginBottom: "40px",
      fontSize: "16px",
      maxWidth: "680px",
      margin: "0 auto 40px",
    },
    startBtn: {
      background: "linear-gradient(135deg, #ffb96f, #ff8a66)",
      color: "#26160f",
      border: "none",
      borderRadius: "10px",
      padding: "15px 42px",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
      letterSpacing: "1.3px",
      textTransform: "uppercase",
      transition: "all 0.22s",
    },
    resetBtn: {
      background: "transparent",
      color: "#f0ddcf",
      border: "1px solid #7a5642",
      borderRadius: "10px",
      padding: "11px 15px",
      fontSize: "13px",
      fontWeight: "700",
      cursor: "pointer",
      letterSpacing: "0.5px",
    },
    sectionBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "#2a2019",
      border: `1px solid ${section?.color || "#333"}22`,
      borderRadius: "20px",
      padding: "7px 14px",
      fontSize: "13px",
      color: section?.color || "#f0ddcf",
      marginBottom: "24px",
      letterSpacing: "1px",
    },
    qNum: {
      fontSize: "12px",
      color: "#e3c9b6",
      marginBottom: "12px",
      letterSpacing: "1px",
    },
    qText: {
      fontSize: "19px",
      lineHeight: "1.8",
      marginBottom: "28px",
      color: "#fff2e8",
      whiteSpace: "pre-line",
    },
    options: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    optionBtn: (idx) => {
      let bg = "#2a201a";
      let border = "#584131";
      let color = "#f0dfd2";
      if (revealed) {
        if (idx === question.answer) { bg = "#2f2615"; border = "#ffb869"; color = "#ffd9aa"; }
        else if (idx === selected && idx !== question.answer) { bg = "#3a1f1b"; border = "#ff8b77"; color = "#ffb2a6"; }
        else { bg = "#211916"; border = "#5c4335"; color = "#dbc5b3"; }
      } else if (selected === idx) {
        bg = "#35251f"; border = "#f0a86a"; color = "#ffd8b1";
      }
      return {
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: "10px",
        padding: "16px 18px",
        textAlign: "left",
        cursor: revealed ? "default" : "pointer",
        color,
        fontSize: "15px",
        lineHeight: "1.6",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
      };
    },
    optionLabel: (idx) => ({
      flexShrink: 0,
      width: "22px",
      height: "22px",
      borderRadius: "50%",
      background: revealed && idx === question?.answer ? "#ffb869" : "#5a4032",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "11px",
      fontWeight: "700",
      color: revealed && idx === question?.answer ? "#2f1b11" : "#e2cfc0",
      marginTop: "1px",
    }),
    explanation: {
      background: "#2b2119",
      border: "1px solid #7f5a43",
      borderRadius: "10px",
      padding: "18px",
      marginTop: "16px",
      fontSize: "15px",
      color: "#f5e4d7",
      lineHeight: "1.85",
    },
    tooltipTermButton: {
      background: "transparent",
      border: "none",
      padding: 0,
      margin: 0,
      font: "inherit",
      lineHeight: "inherit",
      textAlign: "left",
      borderBottom: "1px dashed #ffb474",
      cursor: "help",
      color: "#ffe4c8",
    },
    tooltipHint: {
      marginTop: "10px",
      color: "#f0cfb4",
      fontSize: "12px",
    },
    tooltipPanel: {
      marginTop: "10px",
      padding: "12px 14px",
      borderRadius: "10px",
      background: "#32261f",
      border: "1px solid #8d6248",
      color: "#ffe7d1",
      fontSize: "13px",
      lineHeight: "1.7",
    },
    nextBtn: {
      marginTop: "24px",
      background: "linear-gradient(135deg, #ffb96f, #ff8763)",
      color: "#2b1a12",
      border: "none",
      borderRadius: "10px",
      padding: "13px 30px",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      letterSpacing: "1px",
      display: "block",
      marginLeft: "auto",
    },
    resultHeader: {
      textAlign: "center",
      padding: "32px 0",
      borderBottom: "1px solid #4b372b",
      marginBottom: "32px",
    },
    bigScore: {
      fontSize: "72px",
      fontWeight: "900",
      background: overallPct >= 75
        ? "linear-gradient(135deg, #ffc47a, #ff9567)"
        : overallPct >= 40
        ? "linear-gradient(135deg, #ffd689, #ffac72)"
        : "linear-gradient(135deg, #ff9c84, #ff6c6c)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      lineHeight: 1,
    },
    sectionResult: {
      background: "#261d18",
      border: "1px solid #503b2e",
      borderRadius: "12px",
      padding: "22px",
      marginBottom: "12px",
    },
    sectionResultBar: (pct, color) => ({
      height: "6px",
      background: "#4a352a",
      borderRadius: "2px",
      overflow: "hidden",
      marginTop: "8px",
    }),
    sectionResultFill: (pct, color) => ({
      height: "100%",
      width: mountedResult ? `${pct}%` : "0%",
      background: color,
      borderRadius: "2px",
      transition: "width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
    }),
    recommendation: {
      background: "#2a1f19",
      border: "1px solid #5e4333",
      borderRadius: "12px",
      padding: "22px",
      marginTop: "24px",
    },
    actionRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginTop: "16px",
    },
    exportBtn: {
      background: "linear-gradient(135deg, #ffb86e, #ff8a66)",
      color: "#2c1a12",
      border: "none",
      borderRadius: "10px",
      padding: "11px 15px",
      fontSize: "13px",
      fontWeight: "700",
      cursor: "pointer",
      letterSpacing: "0.5px",
    },
    waBtn: {
      background: "#2a211b",
      color: "#ffe7cf",
      border: "1px solid #8a624c",
      borderRadius: "10px",
      padding: "11px 15px",
      fontSize: "13px",
      fontWeight: "700",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
    },
    tag: (color) => ({
      display: "inline-block",
      background: `${color}22`,
      border: `1px solid ${color}44`,
      color,
      borderRadius: "4px",
      padding: "2px 8px",
      fontSize: "12px",
      fontWeight: "700",
      letterSpacing: "1px",
    }),
  };

  const resetButtonStyle = resetNotice
    ? {
        ...styles.resetBtn,
        background: "#4a2f1f",
        border: "1px solid #f0a968",
        color: "#ffd9ad",
      }
    : styles.resetBtn;

  const renderIntro = () => (
    <div style={styles.intro}>
      <div style={{ fontSize: "56px", marginBottom: "16px" }}>🧪</div>
      <div style={styles.introTitle}>Web Dev Pretest</div>
      <div style={styles.introSub}>Baseline Assessment · {totalQuestions} Soal · ~15 Menit</div>
      <p style={styles.introDesc}>
        Kerjakan sesuai pemahaman saat ini — tidak ada yang benar atau salah secara absolut.
        Hasil pretest ini digunakan untuk menyusun modul belajar yang sesuai dengan kebutuhanmu.
        <br /><br />
        Topik yang diuji: Web Fundamentals · JavaScript · TypeScript · Git · Node.js/NPM · React/Next.js · SQL/Database · Deployment & CI/CD.
        Setelah selesai, export hasil pretest lalu kirim ke Ade melalui WhatsApp.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "40px" }}>
        {sections.map((s) => (
          <span key={s.id} style={{ background: `${s.color}1a`, border: `1px solid ${s.color}40`, color: s.color, borderRadius: "18px", padding: "5px 12px", fontSize: "13px" }}>
            {s.icon} {s.title}
          </span>
        ))}
      </div>
      <button style={styles.startBtn} onClick={() => setPhase("quiz")}>
        MULAI PRETEST →
      </button>
      <div style={{ marginTop: "14px" }}>
        <button type="button" style={resetButtonStyle} onClick={handleResetProgress}>
          {resetButtonLabel}
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div style={{ opacity: animateIn ? 1 : 0, transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)", transform: animateIn ? "translateY(0) scale(1)" : "translateY(15px) scale(0.98)" }}>
      <div style={styles.sectionBadge} className="animate-pop-in">
        {section.icon} {section.title}
        <span style={{ color: "#b89d89", marginLeft: "4px" }}>
          · {currentQ + 1}/{section.questions.length}
        </span>
      </div>
      <div style={styles.qNum} className="animate-fade-in delay-100">
        Q{answeredCount + 1} / {totalQuestions}
      </div>
      <div style={styles.qText} className="animate-fade-up delay-100">{question.text}</div>
      <div style={styles.options} className="animate-fade-up delay-200">
        {question.options.map((opt, idx) => (
          <button key={idx} style={styles.optionBtn(idx)} className="option-btn" onClick={() => handleSelect(idx)} disabled={revealed}>
            <span style={styles.optionLabel(idx)}>
              {revealed && idx === question.answer ? "✓" : ["A", "B", "C", "D"][idx]}
            </span>
            <span>{opt}</span>
          </button>
        ))}
      </div>
      {revealed && (
        <div style={styles.explanation} className="animate-fade-up delay-100">
          💡 <strong>Penjelasan:</strong> {renderExplanationWithTooltips(question.explanation)}
          <div style={styles.tooltipHint}>Tip: hover (desktop) atau tap (mobile) istilah bergaris putus-putus untuk melihat definisi.</div>
          {activeTerm && (
            <div style={styles.tooltipPanel} className="animate-pop-in">
              <strong>{activeTerm.term}</strong>: {activeTerm.definition}
            </div>
          )}
        </div>
      )}
      {revealed && (
        <button style={styles.nextBtn} className="hover-scale animate-fade-up delay-200" onClick={handleNext}>
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
    <div className="animate-fade-up">
      <div style={styles.resultHeader}>
        <div style={{ fontSize: "14px", color: "#d0b29d", letterSpacing: "1.8px", marginBottom: "16px" }} className="animate-fade-in delay-100">HASIL PRETEST</div>
        <div style={styles.bigScore} className="animate-pop-in delay-200 score-pulse">{overallPct}%</div>
        <div style={{ fontSize: "16px", color: "#e2ccbc", marginTop: "10px" }} className="animate-fade-up delay-300">
          {overallScore} / {overallTotal} soal benar
        </div>
        <div style={{ marginTop: "16px", fontSize: "15px", color: overallPct >= 75 ? "#ffd29b" : overallPct >= 40 ? "#ffcc83" : "#ff9f8d" }} className="animate-fade-up delay-400">
          {overallPct >= 75 ? "🎯 Baseline kuat — modul bisa fokus ke advanced topics" : overallPct >= 40 ? "📚 Baseline cukup — modul dari intermediate level" : "🌱 Baseline awal — modul dari fundamentals"}
        </div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "12px", color: "#d0b29d", letterSpacing: "1.8px", marginBottom: "16px" }} className="animate-fade-in delay-300">BREAKDOWN PER TOPIK</div>
        {sections.map((s, idx) => {
          const sc = scores[s.id] || { score: 0, total: s.questions.length, pct: 0 };
          const level = getLevel(sc.pct);
          const lc = getLevelColor(sc.pct);
          const animDelay = `${300 + idx * 50}ms`;
          return (
            <div key={s.id} style={{...styles.sectionResult, animationDelay: animDelay}} className="animate-fade-up hover-scale">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>{s.icon}</span>
                  <span style={{ fontSize: "15px", fontWeight: "700" }}>{s.title}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "13px", color: "#d3b8a4" }}>{sc.score}/{sc.total}</span>
                  <span style={styles.tag(lc)}>{getLevelLabel(sc.pct)}</span>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: lc }}>{Math.round(sc.pct)}%</span>
                </div>
              </div>
              <div style={styles.sectionResultBar(sc.pct, s.color)}>
                <div style={styles.sectionResultFill(sc.pct, s.color)} />
              </div>
              <div style={{ fontSize: "13px", color: "#d3b8a4", marginTop: "9px" }}>
                → {levelDescriptions[s.id]?.[level] || "Perlu evaluasi detail untuk topik ini"}
              </div>
            </div>
          );
        })}
      </div>

      <div style={styles.recommendation} className="animate-fade-up delay-500">
        <div style={{ fontSize: "12px", color: "#f0b98f", letterSpacing: "1.8px", marginBottom: "16px" }}>📋 REKOMENDASI MODUL</div>
        <div style={{ fontSize: "14px", color: "#eddacc", lineHeight: "2" }}>
          {Object.entries(scores).map(([id, sc]) => {
            const s = sections.find((x) => x.id === id);
            const level = getLevel(sc.pct);
            if (level === "low") return <div key={id}>⚠️ <strong style={{ color: "#ff9f8d" }}>{s?.title}</strong> — Modul full dari awal, butuh lebih banyak contoh & latihan</div>;
            if (level === "mid") return <div key={id}>📌 <strong style={{ color: "#ffd08f" }}>{s?.title}</strong> — Skip basics, fokus ke praktik dan edge cases</div>;
            return <div key={id}>✅ <strong style={{ color: "#ffbe85" }}>{s?.title}</strong> — Review singkat, langsung ke project-based learning</div>;
          })}
        </div>
        <div style={{ marginTop: "20px", padding: "18px", background: "#2b211b", borderRadius: "10px", fontSize: "13px", color: "#dec5b2", lineHeight: "1.9", border: "1px solid #624535" }}>
          <strong style={{ color: "#ffe3cc" }}>📤 Langkah Selanjutnya:</strong><br />
          1) Klik tombol export untuk mengunduh hasil lengkap (CSV).<br />
          2) Kirim file CSV itu ke Ade via WhatsApp dengan klik/tap tombol di bawah.<br />
          3) Sertakan catatan singkat jika ada topik yang paling ingin dipelajari dulu.
          <div style={styles.actionRow}>
            <button style={styles.exportBtn} className="hover-scale" onClick={handleExportResults}>EXPORT HASIL PRETEST (CSV)</button>
            <a href={whatsappLink} target="_blank" rel="noreferrer" style={styles.waBtn} className="hover-scale">KIRIM KE ADE VIA WHATSAPP</a>
            <button type="button" style={resetButtonStyle} className="hover-scale" onClick={handleResetProgress}>{resetButtonLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
    <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
    <div style={styles.root}>
      <div style={styles.header}>
        <div style={styles.headerHomeGroup}>
          <button type="button" style={styles.logoButton} className="text-hover" onClick={handleGoHome}>
            WD.PRETEST
          </button>
          <button type="button" style={styles.logoHintButton} className="text-hover" onClick={handleGoHome}>
            klik/tap untuk kembali ke layar awal
          </button>
        </div>
        {phase === "quiz" && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="animate-fade-in">
            <div style={{ fontSize: "12px", color: "#f0d5c0" }}>{Math.round(progress)}%</div>
            <div style={styles.progressBar}>
              <div style={styles.progressFill} className="progress-fill-anim" />
            </div>
          </div>
        )}
        {phase === "result" && <div style={{ fontSize: "12px", color: "#ffbe85", letterSpacing: "1px" }}>SELESAI ✓</div>}
      </div>
      <div style={styles.main}>
        <div style={styles.card}>
          {phase === "intro" && renderIntro()}
          {phase === "quiz" && renderQuiz()}
          {phase === "result" && renderResult()}
        </div>
      </div>
    </div>
    </>
  );
}
