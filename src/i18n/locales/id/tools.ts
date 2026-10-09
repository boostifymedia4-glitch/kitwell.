import type { ToolTextMap } from '../../toolText';

/** Translated names, descriptions, steps, FAQ and limits of the tools, keyed by tool slug. */
const tools: ToolTextMap = {
  'jpg-to-png': {
    name: 'JPG ke PNG',
    description: 'Ubah foto JPG dan JPEG menjadi gambar PNG tanpa kehilangan kualitas hanya dengan satu klik.',
    metaDescription: 'Ubah JPG ke PNG online gratis. Konversi banyak foto JPEG ke PNG langsung di browser Anda, tanpa unggah dan tanpa daftar.',
    steps: [
      'Letakkan satu atau beberapa file JPG ke alat ini, atau pilih dari perangkat Anda.',
      'Periksa pratinjau, lalu tekan Konversi.',
      'Unduh setiap PNG, atau unduh semuanya sebagai ZIP.',
    ],
    faq: [
      { q: 'Apakah mengubah JPG ke PNG meningkatkan kualitas?', a: 'Tidak. JPG bersifat lossy, sehingga detail yang hilang saat JPG disimpan tidak dapat dipulihkan. PNG hanya menyimpan piksel saat ini tanpa kehilangan kualitas lagi, yang berguna untuk penyuntingan atau pekerjaan dengan transparansi.' },
      { q: 'Mengapa PNG lebih besar daripada JPG?', a: 'PNG bersifat lossless dan biasanya menyimpan foto kurang efisien dibanding JPG. Gunakan JPG atau WebP jika ukuran file lebih penting daripada piksel yang persis sama.' },
      { q: 'Apakah gambar saya diunggah ke server?', a: 'Tidak. Gambar didekode dan dienkode ulang oleh browser Anda menggunakan Canvas API. Alat ini tidak mengirim file ke mana pun.' },
    ],
    limits: [
      'GIF atau WebP animasi dikonversi hanya dari bingkai pertamanya.',
      'Maksimum 25 MB per file dan 20 file per batch, agar browser Anda tetap responsif.',
      'Metadata EXIF dan profil warna tersemat tidak dipertahankan.',
    ],
  },
  'png-to-jpg': {
    name: 'PNG ke JPG',
    description: 'Ubah gambar PNG menjadi file JPG yang lebih kecil dengan kualitas yang dapat diatur.',
    metaDescription: 'Ubah PNG ke JPG online gratis. Pilih kualitas dan warna latar untuk gambar transparan. Diproses di browser Anda.',
    steps: [
      'Tambahkan file PNG Anda.',
      'Atur kualitas JPG dan warna latar untuk mengisi area transparan.',
      'Tekan Konversi lalu unduh hasilnya.',
    ],
    faq: [
      { q: 'Apa yang terjadi pada area transparan?', a: 'JPG tidak mendukung transparansi, jadi piksel transparan diisi dengan warna latar yang Anda pilih (putih secara default).' },
      { q: 'Pengaturan kualitas mana yang sebaiknya saya pakai?', a: '80–90 adalah keseimbangan yang baik untuk sebagian besar gambar. Di bawah sekitar 60, artefak kompresi mulai terlihat pada teks dan tepi yang tajam.' },
      { q: 'Apakah gambar saya diunggah ke server?', a: 'Tidak. Gambar didekode dan dienkode ulang oleh browser Anda menggunakan Canvas API. Alat ini tidak mengirim file ke mana pun.' },
    ],
    limits: [
      'GIF atau WebP animasi dikonversi hanya dari bingkai pertamanya.',
      'Maksimum 25 MB per file dan 20 file per batch, agar browser Anda tetap responsif.',
      'Metadata EXIF dan profil warna tersemat tidak dipertahankan.',
      'Transparansi diratakan ke satu warna solid karena JPG tidak dapat menyimpannya.',
    ],
  },
  'jpg-to-webp': {
    name: 'JPG ke WebP',
    description: 'Ubah foto JPG ke WebP modern untuk file yang lebih kecil dan halaman yang lebih cepat.',
    metaDescription: 'Ubah JPG ke WebP online gratis. Perkecil ukuran foto untuk web dengan kualitas yang dapat diatur, diproses lokal di browser Anda.',
    steps: [
      'Tambahkan file JPG Anda.',
      'Pilih kualitas WebP (80 adalah nilai awal yang wajar).',
      'Konversi lalu unduh.',
    ],
    faq: [
      { q: 'Apakah WebP lebih kecil daripada JPG?', a: 'Biasanya 20–35% lebih kecil pada kualitas visual yang serupa, meskipun hasilnya bergantung pada gambarnya.' },
      { q: 'Apakah semua browser mendukung WebP?', a: 'Semua browser utama saat ini dapat menampilkan WebP. Pengodean WebP di browser didukung di Chrome, Edge, Firefox, dan Safari terbaru; jika browser Anda tidak mendukungnya, alat ini akan memberi tahu Anda, bukan menghasilkan file yang salah.' },
      { q: 'Apakah gambar saya diunggah ke server?', a: 'Tidak. Gambar didekode dan dienkode ulang oleh browser Anda menggunakan Canvas API. Alat ini tidak mengirim file ke mana pun.' },
    ],
    limits: [
      'GIF atau WebP animasi dikonversi hanya dari bingkai pertamanya.',
      'Maksimum 25 MB per file dan 20 file per batch, agar browser Anda tetap responsif.',
      'Metadata EXIF dan profil warna tersemat tidak dipertahankan.',
      'Browser Anda harus mendukung pengodean WebP; browser yang tidak mendukung akan menampilkan pesan kesalahan.',
    ],
  },
  'png-to-webp': {
    name: 'PNG ke WebP',
    description: 'Ubah gambar PNG ke WebP dan pertahankan transparansi dengan ukuran jauh lebih kecil.',
    metaDescription: 'Ubah PNG ke WebP online gratis. Mempertahankan transparansi, memperkecil ukuran file, dan berjalan sepenuhnya di browser Anda.',
    steps: [
      'Tambahkan file PNG Anda.',
      'Pilih kualitas WebP.',
      'Konversi lalu unduh.',
    ],
    faq: [
      { q: 'Apakah transparansi dipertahankan?', a: 'Ya. WebP mendukung kanal alfa, sehingga PNG transparan tetap transparan.' },
      { q: 'Bisakah saya mendapatkan hasil lossless?', a: 'Atur kualitas ke 100 untuk ketelitian tertinggi. Browser menyandikan WebP secara lossy, jadi gunakan PNG jika Anda memerlukan salinan yang persis sama secara matematis.' },
      { q: 'Apakah gambar saya diunggah ke server?', a: 'Tidak. Gambar didekode dan dienkode ulang oleh browser Anda menggunakan Canvas API. Alat ini tidak mengirim file ke mana pun.' },
    ],
    limits: [
      'GIF atau WebP animasi dikonversi hanya dari bingkai pertamanya.',
      'Maksimum 25 MB per file dan 20 file per batch, agar browser Anda tetap responsif.',
      'Metadata EXIF dan profil warna tersemat tidak dipertahankan.',
      'Browser Anda harus mendukung pengodean WebP; browser yang tidak mendukung akan menampilkan pesan kesalahan.',
    ],
  },
  'webp-to-jpg': {
    name: 'WebP ke JPG',
    description: 'Ubah gambar WebP menjadi file JPG yang kompatibel di mana saja.',
    metaDescription: 'Ubah WebP ke JPG online gratis. Buat gambar WebP dapat dipakai di mana saja, dikonversi lokal di browser Anda.',
    steps: [
      'Tambahkan file WebP Anda.',
      'Atur kualitas dan warna latar untuk area transparan.',
      'Konversi lalu unduh.',
    ],
    faq: [
      { q: 'Mengapa mengubah WebP ke JPG?', a: 'Beberapa perangkat lunak lama, klien email, dan formulir unggah masih menolak WebP. JPG diterima hampir di mana saja.' },
      { q: 'Apakah gambar saya diunggah ke server?', a: 'Tidak. Gambar didekode dan dienkode ulang oleh browser Anda menggunakan Canvas API. Alat ini tidak mengirim file ke mana pun.' },
    ],
    limits: [
      'GIF atau WebP animasi dikonversi hanya dari bingkai pertamanya.',
      'Maksimum 25 MB per file dan 20 file per batch, agar browser Anda tetap responsif.',
      'Metadata EXIF dan profil warna tersemat tidak dipertahankan.',
      'Transparansi diratakan ke satu warna solid karena JPG tidak dapat menyimpannya.',
    ],
  },
  'webp-to-png': {
    name: 'WebP ke PNG',
    description: 'Ubah gambar WebP ke PNG tanpa kehilangan kualitas dan pertahankan transparansi.',
    metaDescription: 'Ubah WebP ke PNG online gratis. Mempertahankan transparansi dan berjalan sepenuhnya di browser Anda tanpa unggah.',
    steps: [
      'Tambahkan file WebP Anda.',
      'Tekan Konversi.',
      'Unduh file PNG.',
    ],
    faq: [
      { q: 'Apakah transparansi dipertahankan?', a: 'Ya. PNG mendukung transparansi, sehingga kanal alfa dari WebP ikut terbawa.' },
      { q: 'Apakah gambar saya diunggah ke server?', a: 'Tidak. Gambar didekode dan dienkode ulang oleh browser Anda menggunakan Canvas API. Alat ini tidak mengirim file ke mana pun.' },
    ],
    limits: [
      'GIF atau WebP animasi dikonversi hanya dari bingkai pertamanya.',
      'Maksimum 25 MB per file dan 20 file per batch, agar browser Anda tetap responsif.',
      'Metadata EXIF dan profil warna tersemat tidak dipertahankan.',
    ],
  },
  'image-compressor': {
    name: 'Kompresor Gambar',
    description: 'Perkecil ukuran file gambar dengan kualitas yang dapat diatur dan lihat penghematan yang tepat.',
    metaDescription: 'Kompres gambar JPG, PNG, dan WebP online gratis. Atur kualitas, batasi dimensi bila perlu, dan bandingkan ukuran file. Berjalan di browser Anda.',
    steps: [
      'Tambahkan gambar Anda.',
      'Pilih format output dan kualitas, serta lebar atau tinggi maksimum jika perlu.',
      'Kompres, bandingkan ukuran sebelum dan sesudah, lalu unduh.',
    ],
    faq: [
      { q: 'Bagaimana kompresor memperkecil ukuran?', a: 'Alat ini mengenkode ulang gambar pada kualitas yang Anda pilih dan juga dapat memperkecil dimensinya. Output PNG bersifat lossless, jadi ukurannya hanya mengecil jika Anda juga mengurangi dimensi.' },
      { q: 'Bagaimana jika hasilnya lebih besar daripada aslinya?', a: 'Hal ini bisa terjadi pada file yang sudah dioptimalkan. Alat ini menandainya agar Anda dapat mempertahankan file aslinya.' },
      { q: 'Apakah data EXIF atau lokasi dipertahankan?', a: 'Tidak. Pengodean ulang melalui canvas menghapus metadata EXIF seperti model kamera dan lokasi GPS, yang sering kali memang diinginkan sebelum membagikan foto. Profil warna juga tidak dipertahankan.' },
    ],
    limits: [
      'GIF atau WebP animasi dikonversi hanya dari bingkai pertamanya.',
      'Maksimum 25 MB per file dan 20 file per batch, agar browser Anda tetap responsif.',
      'Metadata EXIF dan profil warna tersemat tidak dipertahankan.',
      'Hasil terbaik didapat dari output JPG atau WebP; output PNG bersifat lossless dan mungkin tidak mengecil.',
    ],
  },
  'image-resizer': {
    name: 'Ubah Ukuran Gambar',
    description: 'Ubah ukuran gambar dengan piksel tepat atau persentase sambil menjaga rasio aspek.',
    metaDescription: 'Ubah ukuran gambar online gratis. Atur lebar dan tinggi tepat atau persentase, pertahankan rasio aspek, lalu unduh JPG, PNG, atau WebP.',
    steps: [
      'Tambahkan satu atau beberapa gambar.',
      'Pilih piksel atau persentase lalu masukkan ukuran baru. Biarkan kunci rasio aspek aktif agar gambar tidak terdistorsi.',
      'Ubah ukuran lalu unduh.',
    ],
    faq: [
      { q: 'Bisakah saya memperbesar gambar?', a: 'Bisa, tetapi memperbesar tidak dapat menambah detail, sehingga hasilnya akan tampak lebih lembut. Memperkecil memberikan kualitas terbaik.' },
      { q: 'Berapa ukuran output maksimum?', a: 'Browser membatasi ukuran canvas. Alat ini membatasi output hingga 16.000 px per sisi dan sekitar 100 megapiksel.' },
      { q: 'Apakah data EXIF atau lokasi dipertahankan?', a: 'Tidak. Pengodean ulang melalui canvas menghapus metadata EXIF seperti model kamera dan lokasi GPS, yang sering kali memang diinginkan sebelum membagikan foto. Profil warna juga tidak dipertahankan.' },
    ],
    limits: [
      'GIF atau WebP animasi dikonversi hanya dari bingkai pertamanya.',
      'Maksimum 25 MB per file dan 20 file per batch, agar browser Anda tetap responsif.',
      'Metadata EXIF dan profil warna tersemat tidak dipertahankan.',
      'Output dibatasi hingga 16.000 px per sisi.',
    ],
  },
  'image-cropper': {
    name: 'Pangkas Gambar',
    description: 'Pangkas gambar ke area tertentu atau rasio aspek tetap dengan pratinjau langsung.',
    metaDescription: 'Pangkas gambar online gratis. Pilih rasio aspek tetap atau atur nilai piksel tepat dengan pratinjau langsung. Diproses di browser Anda.',
    steps: [
      'Tambahkan gambar.',
      'Pilih rasio aspek atau seret kotak pangkas, lalu sesuaikan posisi dan ukuran dengan kolom angka.',
      'Tekan Pangkas lalu unduh.',
    ],
    faq: [
      { q: 'Apakah memangkas menurunkan kualitas?', a: 'Memangkas mempertahankan piksel asli. Kualitas hanya berubah jika Anda menyimpan sebagai JPG atau WebP dengan pengaturan kualitas yang lebih rendah.' },
      { q: 'Apakah gambar saya diunggah ke server?', a: 'Tidak. Gambar didekode dan dienkode ulang oleh browser Anda menggunakan Canvas API. Alat ini tidak mengirim file ke mana pun.' },
    ],
    limits: [
      'Satu gambar dalam satu waktu.',
      'Maksimum 25 MB per file.',
      'Gambar animasi memakai bingkai pertama.',
    ],
  },
  'image-rotator': {
    name: 'Putar Gambar',
    description: 'Putar gambar sebesar 90°, 180°, 270°, atau sudut kustom apa pun.',
    metaDescription: 'Putar gambar online gratis. Putar foto 90, 180, atau 270 derajat, atau dengan sudut kustom, langsung di browser Anda.',
    steps: [
      'Tambahkan gambar Anda.',
      'Pilih rotasi atau ketik sudut kustom.',
      'Terapkan lalu unduh.',
    ],
    faq: [
      { q: 'Apa yang terjadi pada rotasi dengan sudut selain sudut siku-siku?', a: 'Canvas diperbesar agar muat dengan gambar yang diputar. Untuk output JPG, sudut yang kosong diisi dengan latar yang Anda pilih; PNG dan WebP membiarkannya transparan.' },
      { q: 'Apakah gambar saya diunggah ke server?', a: 'Tidak. Gambar didekode dan dienkode ulang oleh browser Anda menggunakan Canvas API. Alat ini tidak mengirim file ke mana pun.' },
    ],
    limits: [
      'GIF atau WebP animasi dikonversi hanya dari bingkai pertamanya.',
      'Maksimum 25 MB per file dan 20 file per batch, agar browser Anda tetap responsif.',
      'Metadata EXIF dan profil warna tersemat tidak dipertahankan.',
    ],
  },
  'image-flipper': {
    name: 'Balik Gambar',
    description: 'Cerminkan gambar secara horizontal atau vertikal.',
    metaDescription: 'Balik gambar secara horizontal atau vertikal online gratis. Cerminkan foto di browser Anda tanpa unggah.',
    steps: [
      'Tambahkan gambar Anda.',
      'Pilih horizontal, vertikal, atau keduanya.',
      'Terapkan lalu unduh.',
    ],
    faq: [
      { q: 'Apa perbedaan antara pembalikan horizontal dan vertikal?', a: 'Pembalikan horizontal mencerminkan kiri dan kanan, seperti cermin. Pembalikan vertikal membalik gambar terbalik atas-bawah sepanjang sumbu horizontalnya.' },
      { q: 'Apakah gambar saya diunggah ke server?', a: 'Tidak. Gambar didekode dan dienkode ulang oleh browser Anda menggunakan Canvas API. Alat ini tidak mengirim file ke mana pun.' },
    ],
    limits: [
      'GIF atau WebP animasi dikonversi hanya dari bingkai pertamanya.',
      'Maksimum 25 MB per file dan 20 file per batch, agar browser Anda tetap responsif.',
      'Metadata EXIF dan profil warna tersemat tidak dipertahankan.',
    ],
  },
  'image-format-converter': {
    name: 'Konverter Format Gambar',
    description: 'Konversi antara JPG, PNG, dan WebP dengan satu alat yang fleksibel.',
    metaDescription: 'Konversi gambar antara JPG, PNG, dan WebP online gratis. Pilih format output dan kualitas, diproses lokal di browser Anda.',
    steps: [
      'Tambahkan gambar dalam format apa pun yang didukung.',
      'Pilih format output dan kualitas.',
      'Konversi lalu unduh.',
    ],
    faq: [
      { q: 'Format apa saja yang dapat saya gunakan?', a: 'Input: JPG, PNG, WebP, GIF, BMP, dan AVIF jika browser Anda dapat mendekodenya. Output: JPG, PNG, dan WebP.' },
      { q: 'Bagaimana dengan HEIC atau TIFF?', a: 'Browser tidak dapat mendekode HEIC atau TIFF secara bawaan, jadi format tersebut belum didukung.' },
      { q: 'Apakah gambar saya diunggah ke server?', a: 'Tidak. Gambar didekode dan dienkode ulang oleh browser Anda menggunakan Canvas API. Alat ini tidak mengirim file ke mana pun.' },
    ],
    limits: [
      'GIF atau WebP animasi dikonversi hanya dari bingkai pertamanya.',
      'Maksimum 25 MB per file dan 20 file per batch, agar browser Anda tetap responsif.',
      'Metadata EXIF dan profil warna tersemat tidak dipertahankan.',
      'File HEIC/HEIF, TIFF, dan RAW tidak didukung.',
    ],
  },
  'image-to-base64': {
    name: 'Gambar ke Base64',
    description: 'Sandikan gambar sebagai data URI Base64 untuk CSS, HTML, atau JSON.',
    metaDescription: 'Ubah gambar menjadi string Base64 atau data URI online gratis. Salin cuplikan HTML dan CSS siap pakai. Berjalan di browser Anda.',
    steps: [
      'Tambahkan gambar.',
      'Pilih gaya output: data URI, Base64 mentah, HTML <img>, atau CSS.',
      'Salin hasilnya.',
    ],
    faq: [
      { q: 'Kapan sebaiknya saya memakai gambar Base64?', a: 'Untuk ikon kecil di CSS atau email, saat satu permintaan tambahan lebih mahal daripada kenaikan ukuran sekitar 33%. Hindari untuk foto berukuran besar.' },
      { q: 'Apakah gambar saya diunggah ke server?', a: 'Tidak. Gambar didekode dan dienkode ulang oleh browser Anda menggunakan Canvas API. Alat ini tidak mengirim file ke mana pun.' },
    ],
    limits: [
      'Maksimum 5 MB per gambar, karena teks Base64 menjadi sangat besar.',
      'Satu gambar dalam satu waktu.',
    ],
  },
  'base64-to-image': {
    name: 'Base64 ke Gambar',
    description: 'Dekode string Base64 atau data URI kembali menjadi gambar yang dapat diunduh.',
    metaDescription: 'Ubah string Base64 atau data URI menjadi gambar online gratis. Pratinjau dan unduh PNG, JPG, WebP, atau GIF hasil dekode.',
    steps: [
      'Tempel string Base64 atau data URI lengkap.',
      'Gambar didekode dan langsung dipratinjau.',
      'Unduh gambar.',
    ],
    faq: [
      { q: 'Apakah saya memerlukan awalan “data:image/png;base64,”?', a: 'Tidak. Tanpa awalan, alat ini mendeteksi format dari tanda tangan file (PNG, JPG, GIF, WebP).' },
      { q: 'Mengapa saya mendapat pesan kesalahan?', a: 'String kemungkinan terpotong, berisi karakter tambahan, atau bukan gambar. Data SVG juga ditolak di sini demi keamanan.' },
    ],
    limits: [
      'Mendukung PNG, JPG, GIF, dan WebP. SVG sengaja tidak ditampilkan.',
      'Maksimum 10 MB data hasil dekode.',
    ],
  },
  'image-color-picker': {
    name: 'Pemilih Warna Gambar',
    description: 'Ambil warna persis dari gambar apa pun dan ekstrak palet warna dominannya.',
    metaDescription: 'Ambil warna dari gambar online gratis. Klik piksel mana pun untuk nilai HEX, RGB, dan HSL, lalu ekstrak palet warna dominan.',
    steps: [
      'Tambahkan gambar.',
      'Klik atau ketuk di mana saja pada gambar (atau gunakan tombol panah) untuk mengambil sampel piksel.',
      'Salin nilai HEX, RGB, atau HSL, atau salin dari palet yang diekstrak.',
    ],
    faq: [
      { q: 'Bagaimana palet dihitung?', a: 'Gambar diperkecil sampelnya dan warnanya dikelompokkan ke dalam beberapa wadah; wadah yang paling umum ditampilkan. Ini adalah perkiraan warna dominan, bukan daftar lengkap.' },
      { q: 'Apakah gambar saya diunggah ke server?', a: 'Tidak. Gambar didekode dan dienkode ulang oleh browser Anda menggunakan Canvas API. Alat ini tidak mengirim file ke mana pun.' },
    ],
    limits: [
      'Satu gambar dalam satu waktu.',
      'Warna diambil dari piksel sRGB yang ditampilkan; profil warna diabaikan.',
    ],
  },
  'image-watermark': {
    name: 'Watermark Gambar',
    description: 'Tambahkan watermark teks atau logo ke banyak gambar sekaligus, tunggal atau berulang.',
    metaDescription: 'Tambahkan watermark ke gambar online gratis. Bubuhkan teks atau logo pada foto JPG, PNG, dan WebP secara massal, dengan opasitas dan posisi. Berjalan di browser Anda.',
    steps: [
      'Tambahkan gambar Anda.',
      'Pilih teks atau logo, lalu atur ukuran, opasitas, posisi, dan tata letaknya.',
      'Terapkan lalu unduh hasilnya atau ZIP.',
    ],
    faq: [
      { q: 'Bisakah saya memakai aksara Urdu atau alfabet lain?', a: 'Bisa. Watermark gambar memakai font di perangkat Anda, sehingga aksara apa pun yang dapat ditampilkan sistem Anda akan berfungsi.' },
      { q: 'Apakah file asli saya berubah?', a: 'Tidak. Salinan yang diberi watermark disimpan sebagai file baru.' },
      { q: 'Apakah data EXIF atau lokasi dipertahankan?', a: 'Tidak. Pengodean ulang melalui canvas menghapus metadata EXIF seperti model kamera dan lokasi GPS, yang sering kali memang diinginkan sebelum membagikan foto. Profil warna juga tidak dipertahankan.' },
    ],
    limits: [
      'GIF atau WebP animasi dikonversi hanya dari bingkai pertamanya.',
      'Maksimum 25 MB per file dan 20 file per batch, agar browser Anda tetap responsif.',
      'Metadata EXIF dan profil warna tersemat tidak dipertahankan.',
      'File logo: PNG, JPG, atau WebP, hingga 25 MB.',
    ],
  },
  'svg-converter': {
    name: 'SVG ke PNG / JPG',
    description: 'Ubah grafik vektor SVG menjadi gambar PNG, JPG, atau WebP dalam ukuran apa pun.',
    metaDescription: 'Ubah SVG ke PNG atau JPG online gratis. Pilih skala atau lebar tepat untuk hasil tajam; PNG mempertahankan transparansi. Berjalan di browser Anda.',
    steps: [
      'Tambahkan file SVG Anda.',
      'Pilih PNG, JPG, atau WebP dan ukuran output.',
      'Konversi lalu unduh.',
    ],
    faq: [
      { q: 'Apakah gambar tetap tajam pada ukuran besar?', a: 'Ya. SVG digambar pada ukuran yang Anda pilih, sehingga ekspor 4× sama tajamnya dengan ekspor 1×.' },
      { q: 'Mengapa SVG saya terlihat berbeda?', a: 'Browser tidak mendukung setiap fitur SVG, dan SVG yang bergantung pada font atau gambar eksternal akan kembali ke bawaan. Sematkan font dan gambar di dalam SVG untuk hasil terbaik.' },
      { q: 'Apakah aman membuka file SVG di sini?', a: 'Ya. SVG digambar sebagai gambar, sehingga skrip di dalamnya tidak dijalankan.' },
      { q: 'Apakah gambar saya diunggah ke server?', a: 'Tidak. Gambar didekode dan dienkode ulang oleh browser Anda menggunakan Canvas API. Alat ini tidak mengirim file ke mana pun.' },
    ],
    limits: [
      'Maksimum 25 MB per file dan 20 file per batch.',
      'Font, gambar, dan gaya yang ditautkan dari luar SVG tidak dimuat.',
      'SVG tanpa ukuran memakai viewBox-nya, atau 300 × 150 px jika keduanya tidak diatur.',
    ],
  },
  'enlarge-image': {
    name: 'Perbesar Gambar',
    description: 'Perbesar gambar dengan resampling yang halus dan tajam, 2× hingga 4× atau ke lebar tertentu.',
    metaDescription: 'Perbesar gambar online gratis. Skalakan JPG, PNG, dan WebP 2×, 3×, 4× atau ke lebar tepat dengan resampling Lanczos dan penajaman opsional.',
    steps: [
      'Tambahkan gambar Anda.',
      'Pilih faktor atau lebar target, dan tentukan apakah akan dipertajam.',
      'Perbesar lalu unduh.',
    ],
    faq: [
      { q: 'Apakah ini peningkatan skala dengan AI?', a: 'Bukan. Alat ini memakai resampling berkualitas tinggi, yang membuat gambar yang diperbesar tampak halus dan bersih tetapi tidak dapat menciptakan detail yang hilang. Foto yang sangat kecil atau buram tetap akan terlihat lembut.' },
      { q: 'Seberapa besar hasilnya?', a: 'Hingga 16.000 px per sisi dan sekitar 100 megapiksel, tergantung kemampuan browser Anda.' },
      { q: 'Apakah data EXIF atau lokasi dipertahankan?', a: 'Tidak. Pengodean ulang melalui canvas menghapus metadata EXIF seperti model kamera dan lokasi GPS, yang sering kali memang diinginkan sebelum membagikan foto. Profil warna juga tidak dipertahankan.' },
    ],
    limits: [
      'GIF atau WebP animasi dikonversi hanya dari bingkai pertamanya.',
      'Maksimum 25 MB per file dan 20 file per batch, agar browser Anda tetap responsif.',
      'Metadata EXIF dan profil warna tersemat tidak dipertahankan.',
      'Alat ini tidak menambah detail, jadi bukan peningkatan skala dengan AI.',
      'Output dibatasi hingga 16.000 px per sisi.',
    ],
  },
  'blur-image-area': {
    name: 'Buramkan atau Piksel Area',
    description: 'Sembunyikan wajah, pelat nomor, atau detail pribadi dengan memburamkan, memikselkan, atau menutup area.',
    metaDescription: 'Buramkan atau pikselkan bagian gambar online gratis. Gambar kotak di atas wajah, pelat nomor, atau teks untuk menyembunyikannya, langsung di browser Anda.',
    steps: [
      'Tambahkan gambar.',
      'Seret pada gambar untuk menggambar kotak di atas bagian yang ingin Anda sembunyikan.',
      'Pilih buram, piksel, atau kotak hitam, terapkan, lalu unduh.',
    ],
    faq: [
      { q: 'Apakah memburamkan aman untuk detail sensitif?', a: 'Untuk apa pun yang harus tetap rahasia, seperti nomor identitas atau pelat nomor, gunakan kotak hitam. Buram dan pikselasi terkadang dapat dipulihkan sebagian.' },
      { q: 'Apakah wajah ditemukan secara otomatis?', a: 'Tidak. Anda menggambar kotaknya sendiri. Deteksi otomatis memerlukan model AI besar yang tidak disertakan.' },
      { q: 'Bisakah saya berubah pikiran?', a: 'Bisa. Hapus atau gambar ulang kotak sebelum Anda menerapkannya. File asli Anda tidak pernah diubah.' },
      { q: 'Apakah data EXIF atau lokasi dipertahankan?', a: 'Tidak. Pengodean ulang melalui canvas menghapus metadata EXIF seperti model kamera dan lokasi GPS, yang sering kali memang diinginkan sebelum membagikan foto. Profil warna juga tidak dipertahankan.' },
    ],
    limits: [
      'Satu gambar dalam satu waktu, hingga 25 MB.',
      'Area dipilih secara manual; tidak ada deteksi wajah.',
      'Gambar animasi memakai bingkai pertama.',
    ],
  },
  'qr-code-scanner': {
    name: 'Pemindai Kode QR',
    description: 'Baca kode QR dari foto dan tangkapan layar dan lihat isinya dengan jelas.',
    metaDescription: 'Pindai kode QR dari gambar online gratis. Unggah foto atau tangkapan layar untuk membaca tautan, teks, atau detail Wi-Fi. Berjalan di browser Anda.',
    steps: [
      'Tambahkan satu atau beberapa gambar yang berisi kode QR.',
      'Kode dibaca secara otomatis.',
      'Salin hasilnya, atau buka tautan setelah memeriksanya.',
    ],
    faq: [
      { q: 'Bisakah memindai dengan kamera saya?', a: 'Belum. Alat ini membaca kode QR dari file gambar. Di ponsel, ambil foto kodenya lalu pilih di sini, atau gunakan aplikasi kamera Anda.' },
      { q: 'Apakah aman membuka tautan hasil pindai?', a: 'Periksa alamatnya terlebih dahulu. Tautan lengkap ditampilkan, dan hanya tautan web (http atau https) yang dapat dibuka dari sini. Tautan skrip dan data tidak pernah dibuka.' },
      { q: 'Mengapa tidak ada kode yang ditemukan?', a: 'Kode mungkin buram, terpotong, terlalu kecil, atau berkontras rendah. Coba gambar yang lebih tajam dan lebih dekat yang menampilkan seluruh kode dengan margin yang jelas di sekelilingnya.' },
      { q: 'Apakah gambar saya diunggah?', a: 'Tidak. Gambar dibaca di browser Anda dan alat ini tidak mengirimkannya ke mana pun.' },
    ],
    limits: [
      'Hingga 10 gambar, masing-masing 25 MB.',
      'Satu kode dibaca per gambar.',
      'Hanya kode QR standar; barcode lain tidak didukung.',
    ],
  },
  'gif-maker': {
    name: 'Pembuat GIF',
    description: 'Ubah gambar Anda menjadi GIF animasi dengan pengaturan waktu, ukuran, dan pengulangan kustom.',
    metaDescription: 'Buat GIF animasi dari gambar online gratis. Susun ulang bingkai, atur jeda per bingkai, pilih ukuran dan pengulangan, lalu unduh GIF. Dibuat di browser Anda.',
    steps: [
      'Tambahkan dua gambar atau lebih (atau hanya satu untuk GIF diam).',
      'Seret untuk mengurutkan, atur lama tampil setiap bingkai, lalu pilih ukuran, pengulangan, dan warna.',
      'Buat GIF, pratinjau, dan unduh.',
    ],
    faq: [
      { q: 'Mengapa GIF saya sangat besar?', a: 'GIF menyimpan setiap bingkai sebagai gambar yang dibatasi 256 warna. Bingkai yang lebih sedikit, lebar yang lebih kecil, dan warna yang lebih sedikit semuanya memperkecil file. Alat ini menampilkan ukurannya begitu GIF dibuat.' },
      { q: 'Bisakah saya mempertahankan area transparan?', a: 'Bisa, aktifkan “Pertahankan area transparan” untuk gambar PNG atau WebP yang transparan. Transparansi GIF hanya aktif atau mati per piksel, sehingga tepi yang lembut menjadi kasar.' },
      { q: 'Apakah gambar saya diunggah ke server?', a: 'Tidak. Gambar didekode dan dienkode ulang oleh browser Anda menggunakan Canvas API. Alat ini tidak mengirim file ke mana pun.' },
    ],
    limits: [
      'Hingga 100 bingkai; semakin besar bingkainya, semakin banyak memori yang dibutuhkan browser Anda.',
      'GIF dibatasi 256 warna per bingkai, sehingga foto bisa tampak berbintik.',
      'Input animasi (GIF, WebP) hanya menyumbang bingkai pertamanya.',
    ],
  },
  'photo-editor': {
    name: 'Editor Foto',
    description: 'Sesuaikan, beri filter, putar, pangkas, dan tambahkan teks pada foto, dengan pratinjau langsung.',
    metaDescription: 'Editor foto online gratis. Sesuaikan warna, terapkan filter, putar, luruskan, pangkas, dan tambahkan teks, lalu unduh PNG, JPG, atau WebP. Pribadi, di browser Anda.',
    steps: [
      'Tambahkan foto.',
      'Gunakan tab untuk menyesuaikan warna, menerapkan filter, memutar atau memangkas, dan menambahkan teks. Pratinjau diperbarui seiring Anda bekerja.',
      'Pilih format lalu unduh foto hasil suntingan Anda.',
    ],
    faq: [
      { q: 'Apakah file asli diubah?', a: 'Tidak. File Anda tidak pernah dimodifikasi; gambar hasil suntingan dibuat sebagai unduhan baru.' },
      { q: 'Apakah mengekspor menurunkan kualitas?', a: 'PNG mempertahankan setiap piksel. JPG dan WebP bersifat lossy; gunakan kualitas 90 atau lebih tinggi agar foto tetap terlihat sama. Suntingan diterapkan pada ukuran penuh gambar Anda, bukan ukuran pratinjau.' },
      { q: 'Apakah gambar saya diunggah ke server?', a: 'Tidak. Gambar didekode dan dienkode ulang oleh browser Anda menggunakan Canvas API. Alat ini tidak mengirim file ke mana pun.' },
    ],
    limits: [
      'Satu foto dalam satu waktu, hingga 25 MB dan sekitar 50 megapiksel.',
      'Suntingan diterapkan dalam urutan tetap: putar dan pangkas, penyesuaian warna, buram dan pertajam, vinyet, lalu teks.',
      'Detail EXIF seperti lokasi tidak disalin ke gambar hasil suntingan.',
      'Tanpa lapisan, kuas, atau fitur AI.',
    ],
  },
  'jpg-to-pdf': {
    name: 'JPG ke PDF',
    description: 'Ubah foto JPG menjadi PDF, satu gambar per halaman.',
    metaDescription: 'Ubah JPG ke PDF online gratis. Pilih ukuran halaman, orientasi, dan margin. Data JPEG disematkan tanpa kompresi ulang.',
    steps: [
      'Tambahkan file JPG Anda lalu seret atau gunakan panah untuk mengatur urutannya.',
      'Pilih ukuran halaman, orientasi, dan margin.',
      'Buat PDF lalu unduh.',
    ],
    faq: [
      { q: 'Apakah kualitas gambar menurun?', a: 'Tidak. File JPG disematkan ke dalam PDF apa adanya, tanpa kompresi ulang.' },
      { q: 'Apakah PDF saya diunggah ke mana pun?', a: 'Tidak. PDF dibaca dan ditulis ulang oleh browser Anda. Alat ini tidak mengirim file ke server.' },
    ],
    limits: [
      'Maksimum 25 MB per gambar dan 100 gambar per PDF.',
      'Hanya gambar JPG yang diterima di sini; gunakan Gambar ke PDF untuk format campuran.',
    ],
  },
  'png-to-pdf': {
    name: 'PNG ke PDF',
    description: 'Ubah gambar PNG menjadi PDF dengan transparansi tetap terjaga.',
    metaDescription: 'Ubah PNG ke PDF online gratis. Pilih ukuran halaman dan margin; transparansi dipertahankan. Berjalan di browser Anda.',
    steps: [
      'Tambahkan file PNG Anda lalu atur urutannya.',
      'Pilih ukuran halaman, orientasi, dan margin.',
      'Buat PDF lalu unduh.',
    ],
    faq: [
      { q: 'Apakah transparansi dipertahankan?', a: 'Ya. Gambar PNG disematkan beserta kanal alfanya, sehingga area transparan menampilkan halaman putih di belakangnya.' },
      { q: 'Apakah PDF saya diunggah ke mana pun?', a: 'Tidak. PDF dibaca dan ditulis ulang oleh browser Anda. Alat ini tidak mengirim file ke server.' },
    ],
    limits: [
      'Maksimum 25 MB per gambar dan 100 gambar per PDF.',
      'Hanya gambar PNG yang diterima di sini; gunakan Gambar ke PDF untuk format campuran.',
    ],
  },
  'images-to-pdf': {
    name: 'Gambar ke PDF',
    description: 'Gabungkan gambar JPG dan PNG menjadi satu PDF dengan urutan pilihan Anda.',
    metaDescription: 'Gabungkan beberapa gambar menjadi satu PDF online gratis. Susun ulang halaman, pilih ukuran halaman dan margin. Diproses di browser Anda.',
    steps: [
      'Tambahkan gambar JPG dan PNG (letakkan beberapa sekaligus).',
      'Susun ulang urutannya, lalu pilih ukuran halaman, orientasi, dan margin.',
      'Buat PDF lalu unduh.',
    ],
    faq: [
      { q: 'Format gambar apa yang dapat dipakai?', a: 'JPG dan PNG disematkan langsung. WebP, GIF, dan BMP dikonversi ke PNG terlebih dahulu jika browser Anda dapat mendekodenya.' },
      { q: 'Apa fungsi “Sesuaikan dengan gambar”?', a: 'Setiap halaman diberi ukuran sesuai gambarnya, sehingga tidak ada yang diskalakan atau diberi ruang kosong. Pilih A4 atau Letter untuk halaman dokumen standar.' },
      { q: 'Apakah PDF saya diunggah ke mana pun?', a: 'Tidak. PDF dibaca dan ditulis ulang oleh browser Anda. Alat ini tidak mengirim file ke server.' },
    ],
    limits: [
      'Maksimum 25 MB per gambar dan 100 gambar per PDF.',
    ],
  },
  'merge-pdf': {
    name: 'Gabungkan PDF',
    description: 'Gabungkan beberapa file PDF menjadi satu dokumen dengan urutan pilihan Anda.',
    metaDescription: 'Gabungkan file PDF online gratis. Satukan beberapa PDF menjadi satu, atur urutannya, dan unduh seketika. Diproses di browser Anda.',
    steps: [
      'Tambahkan dua file PDF atau lebih.',
      'Susun sesuai urutan yang Anda inginkan dengan tombol panah.',
      'Gabungkan lalu unduh PDF gabungannya.',
    ],
    faq: [
      { q: 'Apakah penanda buku dan kolom formulir dipertahankan?', a: 'Halaman disalin beserta konten yang terlihat dan tautannya. Penanda buku tingkat dokumen dan data formulir interaktif tidak ikut terbawa.' },
      { q: 'Bisakah alat ini membuka PDF yang dilindungi kata sandi?', a: 'Tidak. PDF terenkripsi dideteksi dan ditolak dengan pesan yang jelas. Hapus kata sandinya terlebih dahulu dengan alat Buka Kunci PDF kami.' },
      { q: 'Apakah PDF saya diunggah ke mana pun?', a: 'Tidak. PDF dibaca dan ditulis ulang oleh browser Anda. Alat ini tidak mengirim file ke server.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'PDF yang dilindungi kata sandi (terenkripsi) tidak didukung.',
      'PDF yang sangat besar atau kompleks bergantung pada memori perangkat Anda.',
      'Penanda buku/kerangka dan kolom formulir dari file sumber tidak ikut digabungkan.',
    ],
  },
  'split-pdf': {
    name: 'Pisahkan PDF',
    description: 'Pisahkan PDF menurut rentang halaman, menjadi halaman tunggal, atau menjadi potongan berukuran tetap.',
    metaDescription: 'Pisahkan PDF online gratis. Bagi menurut rentang halaman, setiap halaman, atau setiap N halaman dan unduh sebagai ZIP. Berjalan di browser Anda.',
    steps: [
      'Tambahkan PDF.',
      'Pilih cara memisahkan: rentang kustom seperti 1-3, 4-6, setiap halaman, atau setiap N halaman.',
      'Pisahkan lalu unduh bagian-bagiannya satu per satu atau sebagai ZIP.',
    ],
    faq: [
      { q: 'Bagaimana cara menulis rentang?', a: 'Pisahkan file output dengan koma. Setiap file dapat berupa rentang (1-3), satu halaman (5), atau campuran yang dipisahkan tanda tambah (1-2+7). Contoh: 1-3, 4-6, 7+9.' },
      { q: 'Bisakah alat ini membuka PDF yang dilindungi kata sandi?', a: 'Tidak. PDF terenkripsi dideteksi dan ditolak dengan pesan yang jelas. Hapus kata sandinya terlebih dahulu dengan alat Buka Kunci PDF kami.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'PDF yang dilindungi kata sandi (terenkripsi) tidak didukung.',
      'PDF yang sangat besar atau kompleks bergantung pada memori perangkat Anda.',
    ],
  },
  'rotate-pdf': {
    name: 'Putar PDF',
    description: 'Putar halaman tertentu atau seluruh PDF, dengan pratinjau thumbnail.',
    metaDescription: 'Putar halaman PDF online gratis. Putar satu halaman atau semua halaman 90, 180, atau 270 derajat dan simpan PDF baru. Berjalan di browser Anda.',
    steps: [
      'Tambahkan PDF; halamannya muncul sebagai thumbnail.',
      'Putar halaman tertentu, atau putar semuanya sekaligus.',
      'Simpan PDF yang sudah diputar.',
    ],
    faq: [
      { q: 'Apakah rotasinya permanen?', a: 'Rotasi disimpan di PDF baru sebagai atribut rotasi halaman. Konten halaman tidak digambar ulang, sehingga tidak ada yang hilang.' },
      { q: 'Bisakah alat ini membuka PDF yang dilindungi kata sandi?', a: 'Tidak. PDF terenkripsi dideteksi dan ditolak dengan pesan yang jelas. Hapus kata sandinya terlebih dahulu dengan alat Buka Kunci PDF kami.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'PDF yang dilindungi kata sandi (terenkripsi) tidak didukung.',
      'PDF yang sangat besar atau kompleks bergantung pada memori perangkat Anda.',
    ],
  },
  'extract-pdf-pages': {
    name: 'Ekstrak Halaman PDF',
    description: 'Pilih halaman yang Anda butuhkan dari PDF dan simpan sebagai dokumen baru.',
    metaDescription: 'Ekstrak halaman dari PDF online gratis. Pilih halaman secara visual atau menurut rentang dan simpan PDF baru. Diproses di browser Anda.',
    steps: [
      'Tambahkan PDF.',
      'Klik thumbnail halaman untuk memilihnya, atau ketik rentang seperti 1-3, 8.',
      'Ekstrak lalu unduh PDF baru.',
    ],
    faq: [
      { q: 'Bisakah saya memakai ini untuk menghapus halaman?', a: 'Bisa. Pilih halaman yang ingin Anda simpan lalu ekstrak; sisanya tidak disertakan dalam file baru.' },
      { q: 'Bisakah alat ini membuka PDF yang dilindungi kata sandi?', a: 'Tidak. PDF terenkripsi dideteksi dan ditolak dengan pesan yang jelas. Hapus kata sandinya terlebih dahulu dengan alat Buka Kunci PDF kami.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'PDF yang dilindungi kata sandi (terenkripsi) tidak didukung.',
      'PDF yang sangat besar atau kompleks bergantung pada memori perangkat Anda.',
    ],
  },
  'reorder-pdf-pages': {
    name: 'Susun Ulang Halaman PDF',
    description: 'Atur ulang, hapus, dan putar halaman secara visual, lalu simpan hasilnya.',
    metaDescription: 'Susun ulang halaman PDF online gratis. Seret atau pindahkan halaman, hapus halaman yang tidak diperlukan, dan simpan PDF baru. Berjalan di browser Anda.',
    steps: [
      'Tambahkan PDF; halamannya muncul sebagai thumbnail.',
      'Seret halaman, atau gunakan tombol panah, untuk mengubah urutannya. Hapus halaman yang tidak Anda perlukan.',
      'Simpan PDF yang sudah disusun ulang.',
    ],
    faq: [
      { q: 'Bisakah saya menyusun ulang dengan keyboard?', a: 'Bisa. Gunakan tombol pindah lebih awal dan pindah lebih akhir pada setiap halaman.' },
      { q: 'Bisakah alat ini membuka PDF yang dilindungi kata sandi?', a: 'Tidak. PDF terenkripsi dideteksi dan ditolak dengan pesan yang jelas. Hapus kata sandinya terlebih dahulu dengan alat Buka Kunci PDF kami.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'PDF yang dilindungi kata sandi (terenkripsi) tidak didukung.',
      'PDF yang sangat besar atau kompleks bergantung pada memori perangkat Anda.',
    ],
  },
  'pdf-to-jpg': {
    name: 'PDF ke JPG',
    description: 'Render halaman PDF menjadi gambar JPG pada resolusi yang Anda pilih.',
    metaDescription: 'Ubah PDF ke JPG online gratis. Render setiap halaman atau sebagian halaman hingga 300 DPI dan unduh ZIP. Berjalan di browser Anda.',
    steps: [
      'Tambahkan PDF.',
      'Pilih resolusi dan, jika perlu, halaman mana yang akan dikonversi.',
      'Konversi lalu unduh gambar satu per satu atau sebagai ZIP.',
    ],
    faq: [
      { q: 'Resolusi mana yang sebaiknya saya pilih?', a: '150 DPI cocok untuk layar; 300 DPI untuk cetak. Nilai yang lebih tinggi menghasilkan gambar yang lebih besar dan membutuhkan lebih banyak memori.' },
      { q: 'Apakah halaman dirender dengan akurat?', a: 'Perenderan memakai PDF.js dari Mozilla, yang menangani sebagian besar PDF dengan baik. Font yang tidak umum atau grafik tingkat lanjut mungkin sedikit berbeda dari penampil lain.' },
      { q: 'Bisakah alat ini membuka PDF yang dilindungi kata sandi?', a: 'Tidak. PDF terenkripsi dideteksi dan ditolak dengan pesan yang jelas. Hapus kata sandinya terlebih dahulu dengan alat Buka Kunci PDF kami.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'PDF yang dilindungi kata sandi (terenkripsi) tidak didukung.',
      'PDF yang sangat besar atau kompleks bergantung pada memori perangkat Anda.',
      'Setiap halaman dibatasi sekitar 50 megapiksel.',
    ],
  },
  'pdf-to-png': {
    name: 'PDF ke PNG',
    description: 'Render halaman PDF menjadi gambar PNG yang tajam dan tanpa kehilangan kualitas.',
    metaDescription: 'Ubah PDF ke PNG online gratis. Render halaman hingga 300 DPI sebagai gambar lossless dan unduh ZIP. Berjalan di browser Anda.',
    steps: [
      'Tambahkan PDF.',
      'Pilih resolusi dan halaman.',
      'Konversi lalu unduh gambar satu per satu atau sebagai ZIP.',
    ],
    faq: [
      { q: 'Mengapa memilih PNG dibanding JPG?', a: 'PNG tetap tajam pada teks dan gambar garis serta mendukung transparansi. Ukuran file lebih besar daripada JPG.' },
      { q: 'Bisakah alat ini membuka PDF yang dilindungi kata sandi?', a: 'Tidak. PDF terenkripsi dideteksi dan ditolak dengan pesan yang jelas. Hapus kata sandinya terlebih dahulu dengan alat Buka Kunci PDF kami.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'PDF yang dilindungi kata sandi (terenkripsi) tidak didukung.',
      'PDF yang sangat besar atau kompleks bergantung pada memori perangkat Anda.',
      'Setiap halaman dibatasi sekitar 50 megapiksel.',
    ],
  },
  'pdf-viewer': {
    name: 'Penampil PDF',
    description: 'Buka dan baca PDF secara privat di browser Anda, dengan zoom dan navigasi halaman.',
    metaDescription: 'Lihat file PDF online gratis. Perbesar, lompat ke halaman, dan baca dokumen di browser Anda tanpa mengunggahnya ke mana pun.',
    steps: [
      'Tambahkan PDF.',
      'Gulir atau gunakan kontrol halaman untuk bernavigasi.',
      'Perbesar atau perkecil sesuai kebutuhan.',
    ],
    faq: [
      { q: 'Bisakah saya mengedit atau memberi anotasi pada PDF di sini?', a: 'Tidak. Ini adalah penampil hanya-baca. Gunakan alat halaman untuk memutar, menyusun ulang, atau mengekstrak halaman.' },
      { q: 'Bisakah alat ini membuka PDF yang dilindungi kata sandi?', a: 'Tidak. PDF terenkripsi dideteksi dan ditolak dengan pesan yang jelas. Hapus kata sandinya terlebih dahulu dengan alat Buka Kunci PDF kami.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'PDF yang dilindungi kata sandi (terenkripsi) tidak didukung.',
      'PDF yang sangat besar atau kompleks bergantung pada memori perangkat Anda.',
      'Hanya-baca: tanpa anotasi, pengisian formulir, atau pencarian teks.',
    ],
  },
  'pdf-metadata-viewer': {
    name: 'Penampil Metadata PDF',
    description: 'Periksa judul, penulis, tanggal pembuatan, jumlah halaman, ukuran halaman, dan versi PDF.',
    metaDescription: 'Lihat metadata PDF online gratis. Lihat judul, penulis, produsen, tanggal, jumlah halaman, dan ukuran halaman tanpa mengunggah file.',
    steps: [
      'Tambahkan PDF.',
      'Tinjau properti dokumen.',
      'Salin detailnya sebagai JSON jika Anda membutuhkannya.',
    ],
    faq: [
      { q: 'Mengapa sebagian metadata tidak ada?', a: 'Banyak PDF tidak mengisi setiap kolom. Hanya kolom yang benar-benar tersimpan di file yang ditampilkan.' },
      { q: 'Bisakah saya menghapus metadata?', a: 'Alat ini hanya membaca metadata. Alat ini tidak mengubah file.' },
      { q: 'Bisakah alat ini membuka PDF yang dilindungi kata sandi?', a: 'Tidak. PDF terenkripsi dideteksi dan ditolak dengan pesan yang jelas. Hapus kata sandinya terlebih dahulu dengan alat Buka Kunci PDF kami.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'PDF yang dilindungi kata sandi (terenkripsi) tidak didukung.',
      'PDF yang sangat besar atau kompleks bergantung pada memori perangkat Anda.',
      'Hanya-baca: metadata tidak dapat diedit atau dihapus di sini.',
    ],
  },
  'remove-pdf-pages': {
    name: 'Hapus Halaman PDF',
    description: 'Hapus halaman yang tidak Anda perlukan dan simpan sisanya sebagai PDF baru.',
    metaDescription: 'Hapus halaman dari PDF online gratis. Pilih halaman secara visual atau menurut rentang, hapus, dan unduh sisanya. Diproses di browser Anda.',
    steps: [
      'Tambahkan PDF; halamannya muncul sebagai thumbnail.',
      'Klik halaman yang ingin Anda hapus, atau ketik rentang seperti 2, 5-7.',
      'Hapus halaman tersebut lalu unduh PDF baru.',
    ],
    faq: [
      { q: 'Apakah file asli saya berubah?', a: 'Tidak. Anda mendapatkan PDF baru tanpa halaman yang dipilih. File asli Anda tetap seperti semula.' },
      { q: 'Bisakah saya menghapus semua halaman?', a: 'Tidak. Setidaknya satu halaman harus tetap ada.' },
      { q: 'Bisakah alat ini membuka PDF yang dilindungi kata sandi?', a: 'Tidak. PDF terenkripsi dideteksi dan ditolak dengan pesan yang jelas. Hapus kata sandinya terlebih dahulu dengan alat Buka Kunci PDF kami.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'PDF yang dilindungi kata sandi (terenkripsi) tidak didukung.',
      'PDF yang sangat besar atau kompleks bergantung pada memori perangkat Anda.',
    ],
  },
  'add-page-numbers': {
    name: 'Tambah Nomor Halaman',
    description: 'Beri nomor pada halaman PDF dengan pilihan posisi, format, dan gaya.',
    metaDescription: 'Tambahkan nomor halaman ke PDF online gratis. Pilih posisi, format seperti “Halaman 1 dari 10”, nomor awal, dan ukuran font. Berjalan di browser Anda.',
    steps: [
      'Tambahkan PDF.',
      'Pilih letak nomor, formatnya, dan halaman mana yang diberi nomor.',
      'Tambahkan nomor lalu unduh PDF.',
    ],
    faq: [
      { q: 'Bisakah saya melewati halaman sampul?', a: 'Bisa. Atur “Halaman pertama yang diberi nomor” ke 2, lalu pilih nomor yang harus ditampilkannya.' },
      { q: 'Apakah berfungsi pada halaman yang diputar?', a: 'Ya. Nomor ditempatkan relatif terhadap tampilan di layar, termasuk halaman yang diputar.' },
      { q: 'Font apa yang dipakai?', a: 'Helvetica, yang mencakup angka dan huruf Latin.' },
      { q: 'Bisakah alat ini membuka PDF yang dilindungi kata sandi?', a: 'Tidak. PDF terenkripsi dideteksi dan ditolak dengan pesan yang jelas. Hapus kata sandinya terlebih dahulu dengan alat Buka Kunci PDF kami.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'PDF yang dilindungi kata sandi (terenkripsi) tidak didukung.',
      'PDF yang sangat besar atau kompleks bergantung pada memori perangkat Anda.',
      'Nomor digambar di atas setiap halaman, tidak pernah di belakang konten yang sudah ada.',
      'Memakai font Helvetica bawaan.',
    ],
  },
  'watermark-pdf': {
    name: 'Watermark PDF',
    description: 'Bubuhkan teks atau gambar pada halaman PDF Anda dengan opasitas dan sudut yang dapat diatur.',
    metaDescription: 'Tambahkan watermark ke PDF online gratis. Bubuhkan teks atau gambar, di tengah atau berulang, dengan opasitas dan rotasi kustom. Diproses di browser Anda.',
    steps: [
      'Tambahkan PDF.',
      'Pilih watermark teks atau gambar, lalu atur ukuran, opasitas, sudut, dan tata letaknya.',
      'Terapkan ke semua halaman atau sebagian, lalu unduh.',
    ],
    faq: [
      { q: 'Bisakah watermark dihapus?', a: 'Watermark digambar di atas halaman dan bukan fitur keamanan. Siapa pun yang memiliki editor PDF dapat menghapusnya. Untuk perlindungan yang lebih kuat, gabungkan dengan Lindungi PDF.' },
      { q: 'Bisakah saya memakai aksara Urdu, Arab, atau alfabet lain?', a: 'Tidak sebagai teks yang diketik, karena font bawaan PDF hanya mencakup huruf Latin. Buat PNG transparan dari teks Anda dan gunakan opsi gambar sebagai gantinya.' },
      { q: 'Apakah watermark berada di depan atau di belakang teks halaman?', a: 'Di depan. Turunkan opasitas agar halaman tetap terbaca.' },
      { q: 'Bisakah alat ini membuka PDF yang dilindungi kata sandi?', a: 'Tidak. PDF terenkripsi dideteksi dan ditolak dengan pesan yang jelas. Hapus kata sandinya terlebih dahulu dengan alat Buka Kunci PDF kami.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'PDF yang dilindungi kata sandi (terenkripsi) tidak didukung.',
      'PDF yang sangat besar atau kompleks bergantung pada memori perangkat Anda.',
      'Watermark teks hanya mendukung huruf Latin, angka, dan simbol umum.',
      'Gambar watermark: PNG atau JPG, hingga 5 MB.',
      'Tanda digambar di atas konten halaman yang sudah ada.',
    ],
  },
  'crop-pdf': {
    name: 'Pangkas PDF',
    description: 'Potong margin atau pertahankan area tertentu di setiap halaman, dengan pratinjau halaman langsung.',
    metaDescription: 'Pangkas halaman PDF online gratis. Seret kotak pangkas pada pratinjau halaman atau ketik margin, lalu terapkan ke semua halaman atau halaman terpilih. Berjalan di browser Anda.',
    steps: [
      'Tambahkan PDF lalu pilih halaman untuk dipratinjau.',
      'Seret kotak atau ketik margin untuk memilih area yang dipertahankan.',
      'Pilih halaman yang akan dipangkas, lalu unduh.',
    ],
    faq: [
      { q: 'Apakah konten yang terpangkas dihapus?', a: 'Tidak. Pemangkasan mengubah area yang terlihat pada setiap halaman, tetapi konten di luarnya masih ada di dalam file. Jangan mengandalkan pemangkasan untuk menyembunyikan informasi sensitif.' },
      { q: 'Bagaimana jika halaman saya berukuran berbeda?', a: 'Proporsi yang sama diterapkan ke setiap halaman yang Anda pilih, sehingga halaman dengan ukuran berbeda dipotong dengan persentase yang sama.' },
      { q: 'Bisakah alat ini membuka PDF yang dilindungi kata sandi?', a: 'Tidak. PDF terenkripsi dideteksi dan ditolak dengan pesan yang jelas. Hapus kata sandinya terlebih dahulu dengan alat Buka Kunci PDF kami.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'PDF yang dilindungi kata sandi (terenkripsi) tidak didukung.',
      'PDF yang sangat besar atau kompleks bergantung pada memori perangkat Anda.',
      'Pemangkasan menyembunyikan konten; tidak menghapusnya.',
      'Area pangkas adalah persentase dari setiap halaman, bukan ukuran tetap dalam milimeter.',
    ],
  },
  'edit-pdf-metadata': {
    name: 'Edit Metadata PDF',
    description: 'Ubah judul, penulis, subjek, dan kata kunci PDF, atau hapus semua metadata.',
    metaDescription: 'Edit metadata PDF online gratis. Ubah judul, penulis, subjek, dan kata kunci, atau hapus semua properti dokumen. Diproses di browser Anda.',
    steps: [
      'Tambahkan PDF; properti saat ini terisi otomatis.',
      'Edit kolomnya, atau pilih Hapus semua metadata.',
      'Simpan dan unduh PDF yang sudah diperbarui.',
    ],
    faq: [
      { q: 'Apa yang dihapus oleh “Hapus semua metadata”?', a: 'Informasi dokumen (judul, penulis, subjek, kata kunci, pembuat, produsen, dan tanggal) serta metadata XMP yang tersemat. Teks halaman, gambar, atau komentar tidak disentuh.' },
      { q: 'Mengapa mengedit metadata?', a: 'Untuk memperbaiki judul yang salah di tab browser dan hasil pencarian, mencantumkan penulis yang benar, atau menghapus detail pribadi sebelum membagikan file.' },
      { q: 'Apakah mendukung teks non-Latin?', a: 'Ya. Judul dan penulis dalam aksara Urdu, Arab, Mandarin, dan lainnya tersimpan dengan benar.' },
      { q: 'Bisakah alat ini membuka PDF yang dilindungi kata sandi?', a: 'Tidak. PDF terenkripsi dideteksi dan ditolak dengan pesan yang jelas. Hapus kata sandinya terlebih dahulu dengan alat Buka Kunci PDF kami.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'PDF yang dilindungi kata sandi (terenkripsi) tidak didukung.',
      'PDF yang sangat besar atau kompleks bergantung pada memori perangkat Anda.',
      'Hanya properti tingkat dokumen yang diubah. Komentar, data formulir, dan konten halaman tetap seperti semula.',
    ],
  },
  'protect-pdf': {
    name: 'Lindungi PDF',
    description: 'Kunci PDF dengan kata sandi menggunakan enkripsi AES-256.',
    metaDescription: 'Lindungi PDF dengan kata sandi online gratis. Enkripsi AES-256 dilakukan di browser Anda; file dan kata sandi Anda tidak pernah diunggah.',
    steps: [
      'Tambahkan PDF.',
      'Ketik kata sandi dua kali dan pilih apa yang boleh dilakukan pembaca (cetak, salin, edit).',
      'Lindungi lalu unduh salinan terenkripsi.',
    ],
    faq: [
      { q: 'Seberapa kuat perlindungannya?', a: 'File dienkripsi dengan AES-256, standar enkripsi PDF terkuat. Dalam praktiknya, keamanan bergantung pada kata sandi Anda: gunakan yang panjang dan tidak Anda pakai di tempat lain.' },
      { q: 'Bagaimana jika saya lupa kata sandinya?', a: 'Kata sandi tidak dapat dipulihkan. Tidak ada yang disimpan atau dikirim ke mana pun, dan tidak ada fitur reset. Simpan file asli dan kata sandi Anda di tempat yang aman.' },
      { q: 'Apakah opsi cetak, salin, dan edit ditegakkan?', a: 'Itu adalah permintaan yang dipatuhi oleh sebagian besar program PDF, tetapi bukan pembatasan yang tak bisa ditembus. Kata sandilah yang benar-benar melindungi file.' },
      { q: 'Apakah kata sandi saya diunggah?', a: 'Tidak. Enkripsi dilakukan di browser Anda.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'Kata sandi: hingga 127 karakter standar (huruf, angka, dan simbol).',
      'PDF yang sudah memiliki kata sandi harus dibuka kuncinya terlebih dahulu.',
      'Pembaca PDF yang sangat lama (sebelum sekitar 2008) mungkin tidak dapat membuka file AES-256.',
    ],
  },
  'unlock-pdf': {
    name: 'Buka Kunci PDF',
    description: 'Hapus kata sandi dari PDF yang dapat Anda akses, sehingga dapat dibuka dengan bebas.',
    metaDescription: 'Buka kunci PDF yang dilindungi kata sandi online gratis. Masukkan kata sandi untuk menyimpan salinan tanpa perlindungan, diproses di browser Anda dan tidak pernah diunggah.',
    steps: [
      'Tambahkan PDF yang dilindungi.',
      'Masukkan kata sandinya jika diminta. PDF yang hanya membatasi pencetakan atau penyalinan tidak memerlukannya.',
      'Unduh salinan yang sudah dibuka kuncinya.',
    ],
    faq: [
      { q: 'Bisakah alat ini membuka kunci PDF jika saya lupa kata sandinya?', a: 'Tidak. Alat ini tidak pernah menebak atau membobol kata sandi. Alat ini menghapus perlindungan hanya jika Anda memberikan kata sandi yang benar, atau jika file hanya membatasi tindakan seperti mencetak.' },
      { q: 'Apakah ini diperbolehkan?', a: 'Gunakan hanya pada file yang Anda miliki atau yang Anda berwenang membukanya. Anda bertanggung jawab atas cara Anda menggunakan hasilnya.' },
      { q: 'Apakah kata sandi saya diunggah?', a: 'Tidak. Semuanya terjadi di browser Anda.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'Mendukung perlindungan kata sandi PDF standar (RC4 dan AES).',
      'Tanda tangan digital menjadi tidak valid setelah file disimpan ulang.',
      'File berbasis sertifikat atau yang dilindungi DRM tidak didukung.',
    ],
  },
  'extract-pdf-text': {
    name: 'Ekstrak Teks dari PDF',
    description: 'Salin semua teks yang dapat dipilih dari PDF, halaman demi halaman.',
    metaDescription: 'Ekstrak teks dari PDF online gratis. Dapatkan teks yang dapat dipilih dari setiap halaman atau rentang, lalu salin atau simpan sebagai .txt. Berjalan di browser Anda.',
    steps: [
      'Tambahkan PDF.',
      'Pilih semua halaman atau satu rentang, dan apakah pemisah halaman perlu ditandai.',
      'Salin teks atau unduh sebagai file .txt.',
    ],
    faq: [
      { q: 'Mengapa hasilnya kosong?', a: 'PDF kemungkinan adalah hasil pindai, yaitu gambar teks, bukan teks sebenarnya. Membacanya memerlukan OCR (pengenalan teks), yang tidak dilakukan oleh alat ini.' },
      { q: 'Apakah tata letak dipertahankan?', a: 'Baris dan paragraf disusun ulang sebaik mungkin, tetapi kolom, tabel, dan catatan kaki mungkin muncul dalam urutan yang berbeda.' },
      { q: 'Bisakah alat ini membuka PDF yang dilindungi kata sandi?', a: 'Tidak. PDF terenkripsi dideteksi dan ditolak dengan pesan yang jelas. Hapus kata sandinya terlebih dahulu dengan alat Buka Kunci PDF kami.' },
    ],
    limits: [
      'Maksimum 100 MB per PDF.',
      'PDF yang dilindungi kata sandi (terenkripsi) tidak didukung.',
      'PDF yang sangat besar atau kompleks bergantung pada memori perangkat Anda.',
      'Hanya teks asli yang diekstrak; halaman hasil pindai memerlukan OCR.',
      'Urutan baca mengikuti PDF dan dapat berbeda dari urutan visual pada tata letak yang kompleks.',
    ],
  },
  'compress-pdf': {
    name: 'Kompres PDF',
    description: 'Perkecil PDF dengan mengompresi ulang gambarnya sementara teks tetap dapat dipilih.',
    metaDescription: 'Kompres PDF online gratis. Kompres ulang gambar tersemat untuk memperkecil ukuran file sementara teks tetap dapat dipilih, atau ratakan halaman untuk file terkecil. Berjalan di browser Anda.',
    steps: [
      'Tambahkan PDF Anda.',
      'Pilih cara dan tingkat kekuatan kompresi: bawaannya mempertahankan teks agar dapat dipilih dan hanya mengompresi ulang gambar.',
      'Kompres, periksa ukuran yang dihemat, lalu unduh hasilnya.',
    ],
    faq: [
      { q: 'Mengapa PDF saya hampir tidak mengecil?', a: 'Mode standar mengompresi ulang gambar JPEG, sehingga paling berguna untuk PDF yang penuh foto atau hasil pindai. PDF yang sebagian besar berupa teks, atau yang gambarnya sudah kecil, tidak dapat mengecil banyak. Alat ini memberi tahu Anda jika tidak ada yang dapat dihemat, bukan berpura-pura.' },
      { q: 'Apakah kualitasnya akan memburuk?', a: 'Gambar kehilangan sebagian detail sebagai ganti ukuran; Ringan mempertahankannya hampir tidak berubah dan Kuat membuatnya tampak jelas lebih lembut. Teks dan grafik vektor tidak disentuh pada mode standar. Mode “Maksimum” mengubah setiap halaman menjadi gambar, sehingga teks tidak lagi dapat dipilih atau dicari.' },
      { q: 'Apakah PDF saya diunggah ke mana pun?', a: 'Tidak. PDF dibaca dan ditulis ulang oleh browser Anda. Alat ini tidak mengirim file ke server.' },
    ],
    limits: [
      'Hanya gambar JPEG tersemat yang dikompresi ulang. Gambar bergaya PNG (Flate), font, dan konten lain dibiarkan apa adanya.',
      'Mode Maksimum mengubah setiap halaman menjadi gambar: teks, tautan, dan kolom formulir berhenti berfungsi dan file tidak dapat dicari.',
      'Warna gambar yang dikompresi ulang dapat bergeser sangat sedikit.',
      'Maksimum 100 MB per PDF. PDF yang dilindungi kata sandi harus dibuka kuncinya terlebih dahulu.',
    ],
  },
  'ocr-pdf': {
    name: 'OCR PDF',
    description: 'Kenali teks pada PDF hasil pindai (bahasa Inggris) dan dapatkan PDF yang dapat dicari.',
    metaDescription: 'OCR PDF online gratis. Kenali teks bahasa Inggris pada PDF hasil pindai dan unduh PDF yang dapat dicari atau teks biasa. Mesin OCR berjalan lokal di browser Anda.',
    steps: [
      'Tambahkan PDF hasil pindai.',
      'Pilih halaman dan kualitasnya. Halaman yang sudah berisi teks yang dapat dipilih dapat dilewati.',
      'Jalankan OCR, tinjau teks yang dikenali, lalu unduh PDF yang dapat dicari atau file teks.',
    ],
    faq: [
      { q: 'Bahasa apa saja yang didukung?', a: 'Hanya bahasa Inggris untuk saat ini. Teks dalam bahasa lain akan salah terbaca. Bahasa lain dapat ditambahkan nanti tanpa mengubah cara kerja alat ini.' },
      { q: 'Apakah dokumen saya dikirim ke layanan OCR?', a: 'Tidak. Mesin pengenalan (Tesseract, dikompilasi ke WebAssembly) beserta data bahasa Inggrisnya disajikan dari situs web ini dan berjalan di dalam browser Anda. Dokumen tidak diunggah.' },
      { q: 'Seberapa akurat hasilnya?', a: 'Hasil pindai yang bersih dan lurus dari teks cetak pada 200 hingga 300 DPI memberikan hasil terbaik. Tulisan tangan, cetakan yang sangat kecil, halaman berkontras rendah atau miring menghasilkan lebih banyak kesalahan. Selalu periksa angka-angka penting.' },
    ],
    limits: [
      'Hanya bahasa Inggris. Tulisan tangan tidak dikenali secara andal.',
      'Halaman asli dipertahankan persis seperti adanya; lapisan teks tak terlihat ditambahkan agar teks dapat dicari dan disalin.',
      'OCR lambat pada dokumen besar (beberapa detik per halaman). Proses pertama juga memuat mesinnya (sekitar 3 MB).',
      'Maksimum 100 MB per PDF. Halaman yang sangat besar mungkin ditolak untuk melindungi browser Anda.',
    ],
  },
  'sign-pdf': {
    name: 'Tanda Tangani PDF',
    description: 'Gambar, ketik, atau unggah tanda tangan dan letakkan pada halaman PDF Anda.',
    metaDescription: 'Tanda tangani PDF online gratis. Gambar, ketik, atau unggah tanda tangan Anda, letakkan di halaman mana pun, dan unduh PDF yang sudah ditandatangani. Tanda tangan visual, di browser Anda.',
    steps: [
      'Tambahkan PDF yang perlu Anda tandatangani.',
      'Buat tanda tangan Anda dengan menggambarnya, mengetik nama Anda, atau mengunggah gambar.',
      'Seret tanda tangan ke tempat yang tepat pada halaman, pilih halaman mana yang diberi tanda tangan, lalu unduh PDF yang sudah ditandatangani.',
    ],
    faq: [
      { q: 'Apakah ini tanda tangan digital yang mengikat secara hukum?', a: 'Ini adalah tanda tangan visual: gambar tanda tangan Anda yang diletakkan pada halaman. Ini bukan tanda tangan digital kriptografis, tidak memiliki sertifikat, dan tidak dapat membuktikan siapa yang menandatangani atau mendeteksi perubahan berikutnya. Diterima atau tidaknya bergantung pada pihak yang memintanya. Beberapa organisasi mewajibkan layanan tanda tangan elektronik tersertifikasi.' },
      { q: 'Apakah tanda tangan saya disimpan di suatu tempat?', a: 'Tidak. Tanda tangan dibuat di browser Anda, hanya dipakai untuk file ini, dan dilupakan saat Anda meninggalkan atau memuat ulang halaman.' },
      { q: 'Apakah PDF saya diunggah ke mana pun?', a: 'Tidak. PDF dibaca dan ditulis ulang oleh browser Anda. Alat ini tidak mengirim file ke server.' },
    ],
    limits: [
      'Hanya tanda tangan visual: tanpa sertifikat, tanpa stempel waktu, tanpa deteksi pengubahan.',
      'Tanda tangan diletakkan sebagai gambar di atas halaman; tidak mengisi kolom tanda tangan pada formulir.',
      'Maksimum 100 MB per PDF. PDF yang dilindungi kata sandi harus dibuka kuncinya terlebih dahulu.',
    ],
  },
  'fill-pdf-forms': {
    name: 'Isi Formulir PDF',
    description: 'Isi kotak teks, kotak centang, dan menu pada formulir PDF yang dapat diisi.',
    metaDescription: 'Isi formulir PDF online gratis. Ketik pada kolom, centang kotak, dan pilih opsi di PDF yang dapat diisi, lalu unduh dalam bentuk dapat diedit atau diratakan. Di browser Anda.',
    steps: [
      'Tambahkan formulir PDF yang dapat diisi.',
      'Isi kolom yang tercantum di bawah nama file. Kolom dikelompokkan per halaman.',
      'Pilih apakah formulir tetap dapat diedit atau diratakan, lalu unduh PDF yang sudah diisi.',
    ],
    faq: [
      { q: 'PDF saya tidak menampilkan kolom apa pun. Mengapa?', a: 'Hanya PDF dengan kolom formulir sungguhan yang dapat diisi di sini. Formulir yang hanya berupa gambar atau teks biasa tidak memiliki kolom; gunakan Tanda Tangani PDF untuk menempatkan tanda tangan, atau alat Watermark untuk menambahkan teks. Formulir yang dibuat dengan XFA (sebagian formulir pemerintah dan bank) tidak didukung.' },
      { q: 'Apa fungsi perataan (flatten)?', a: 'Perataan menanamkan jawaban Anda ke halaman dan menghapus kolom formulir, sehingga jawaban tidak dapat diedit lagi. Gunakan untuk salinan yang Anda kirim; simpan salinan yang dapat diedit untuk Anda sendiri.' },
      { q: 'Apakah PDF saya diunggah ke mana pun?', a: 'Tidak. PDF dibaca dan ditulis ulang oleh browser Anda. Alat ini tidak mengirim file ke server.' },
    ],
    limits: [
      'Teks dapat memakai huruf Latin, angka, dan simbol umum (font formulir tidak mencakup alfabet lain).',
      'Kolom tanda tangan dan tombol ditampilkan tetapi tidak dapat diisi; gunakan Tanda Tangani PDF untuk tanda tangan.',
      'Formulir XFA (dinamis) tidak didukung.',
      'Maksimum 100 MB per PDF.',
    ],
  },
  'redact-pdf': {
    name: 'Sensor PDF',
    description: 'Hitamkan teks dan area secara permanen: halaman yang disensor dibangun ulang sebagai gambar.',
    metaDescription: 'Sensor PDF online gratis. Hitamkan nama, angka, dan area sehingga teks di bawahnya benar-benar dihapus, bukan sekadar ditutup. Berjalan di browser Anda; tidak ada yang diunggah.',
    steps: [
      'Tambahkan PDF Anda lalu pilih halaman.',
      'Gambar kotak di atas bagian yang harus hilang, atau cari kata, email, dan angka untuk menandainya secara otomatis.',
      'Terapkan penyensoran lalu unduh. Selalu periksa hasilnya sebelum membagikannya.',
    ],
    faq: [
      { q: 'Apakah teks yang tersembunyi benar-benar dihapus?', a: 'Ya. Setiap halaman yang memiliki sensor dibangun ulang sebagai gambar dengan kotak hitam yang sudah dilukis, sehingga teks dan objek di bawahnya tidak ada di file baru. Persegi panjang hitam yang digambar di atas teks, seperti pada banyak alat, akan membuat teksnya tetap dapat dipilih. Halaman yang tidak Anda sensor disalin tanpa perubahan.' },
      { q: 'Mengapa saya tidak bisa lagi memilih teks pada halaman yang disensor?', a: 'Karena halaman tersebut sekarang berupa gambar. Begitulah cara konten di bawahnya dihancurkan. Jalankan OCR PDF setelahnya jika Anda memerlukan teks yang dapat dicari; kata-kata yang disensor tetap hitam.' },
      { q: 'Apakah alat ini menemukan setiap kecocokan secara otomatis?', a: 'Pencarian menandai kecocokan yang berada di dalam satu baris teks. Frasa yang dipecah oleh PDF menjadi beberapa bagian, atau teks yang merupakan bagian dari gambar, mungkin terlewat. Tinjau setiap halaman dan gambar kotak secara manual jika perlu.' },
    ],
    limits: [
      'Halaman yang disensor menjadi gambar: tidak ada teks yang dapat dipilih, tautan, atau kolom formulir pada halaman tersebut.',
      'Pencarian otomatis hanya bekerja pada teks yang dapat dipilih dan hanya dalam satu rangkaian teks; halaman hasil pindai memerlukan kotak yang digambar manual.',
      'Properti dokumen (judul, penulis, dll.) dihapus dari hasil kecuali Anda memilih untuk mempertahankannya.',
      'Maksimum 100 MB per PDF.',
    ],
  },
  'compare-pdf': {
    name: 'Bandingkan PDF',
    description: 'Lihat apa yang berubah di antara dua PDF: perbedaan teks dan halaman yang disorot.',
    metaDescription: 'Bandingkan dua file PDF online gratis. Lihat kata yang ditambah dan dihapus halaman demi halaman serta sorot perbedaan visual antarversi. Diproses di browser Anda.',
    steps: [
      'Tambahkan PDF asli dan PDF revisi.',
      'Bandingkan keduanya: halaman didaftarkan beserta jumlah kata yang ditambah dan dihapus.',
      'Buka halaman untuk membaca perubahan teks, atau beralih ke tampilan visual untuk melihat area yang berubah dalam warna merah.',
    ],
    faq: [
      { q: 'Apa yang ditampilkan oleh perbandingan teks?', a: 'Untuk setiap halaman, kata yang ditambahkan (hijau) dan dihapus (merah) antara dokumen asli dan dokumen revisi, dengan teks yang tidak berubah diciutkan. Halaman dicocokkan berdasarkan nomor.' },
      { q: 'Bagaimana dengan PDF hasil pindai?', a: 'Hasil pindai tidak memiliki teks yang dapat dipilih, sehingga perbandingan teks tidak menemukan apa pun. Gunakan perbandingan visual, atau jalankan OCR PDF pada kedua file terlebih dahulu.' },
      { q: 'Apakah PDF saya diunggah ke mana pun?', a: 'Tidak. PDF dibaca dan ditulis ulang oleh browser Anda. Alat ini tidak mengirim file ke server.' },
    ],
    limits: [
      'Halaman dibandingkan berdasarkan nomor: jika ada halaman yang disisipkan, halaman berikutnya akan tampak berubah.',
      'Perbandingan visual merender setiap halaman pada resolusi layar; perbedaan kecil di bawah itu mungkin tidak terlihat.',
      'Hingga 100 halaman per file dibandingkan. PDF yang dilindungi kata sandi harus dibuka kuncinya terlebih dahulu.',
    ],
  },
  'word-counter': {
    name: 'Penghitung Kata',
    description: 'Hitung kata, karakter, dan kalimat, serta perkirakan waktu baca saat Anda mengetik.',
    metaDescription: 'Penghitung kata online gratis. Hitung kata, karakter, kalimat, dan paragraf serta perkirakan waktu baca dan waktu bicara secara instan.',
    steps: [
      'Ketik atau tempel teks Anda.',
      'Baca statistik langsung di atas editor.',
      'Gunakan Hapus untuk memulai dari awal.',
    ],
    faq: [
      { q: 'Bagaimana kata dihitung?', a: 'Kata adalah rangkaian karakter apa pun yang dipisahkan spasi kosong. Kata bergaris hubung dihitung satu dan angka dihitung sebagai kata.' },
      { q: 'Bagaimana waktu baca dihitung?', a: 'Waktu baca mengasumsikan 238 kata per menit dan waktu bicara 150 kata per menit, yang merupakan rata-rata umum untuk orang dewasa.' },
    ],
    limits: [
      'Penghitungan didasarkan pada spasi kosong, sehingga bahasa yang ditulis tanpa spasi (seperti Mandarin atau Jepang) akan menampilkan satu kata untuk setiap rangkaian teks.',
    ],
  },
  'character-counter': {
    name: 'Penghitung Karakter',
    description: 'Hitung karakter dengan dan tanpa spasi serta periksa teks terhadap batas panjang yang umum.',
    metaDescription: 'Penghitung karakter online gratis. Hitung karakter dengan dan tanpa spasi, byte, dan baris, serta periksa batas untuk postingan, meta tag, dan SMS.',
    steps: [
      'Ketik atau tempel teks Anda.',
      'Baca totalnya dan bilah batas.',
      'Sesuaikan teks Anda hingga muat.',
    ],
    faq: [
      { q: 'Apakah emoji dihitung sebagai satu karakter?', a: 'Ya. Penghitung ini menghitung karakter yang terlihat (grapheme cluster), sehingga emoji dihitung satu meskipun memakai beberapa byte.' },
      { q: 'Mengapa batas SMS saya berbeda?', a: 'Panjang SMS bergantung pada pengodean. Pesan dengan karakter non-Latin atau emoji memakai batas yang lebih pendek daripada acuan 160 karakter yang ditampilkan di sini.' },
    ],
    limits: [
      'Batas yang ditampilkan adalah pedoman umum dan berubah dari waktu ke waktu; periksa aturan terbaru di setiap platform.',
    ],
  },
  'case-converter': {
    name: 'Pengubah Huruf Besar/Kecil',
    description: 'Ubah teks menjadi huruf besar, kecil, judul, kalimat, camel, snake, kebab, dan lainnya.',
    metaDescription: 'Pengubah huruf besar/kecil online gratis. Ubah teks menjadi HURUF BESAR, huruf kecil, Huruf Judul, Huruf kalimat, camelCase, snake_case, kebab-case, dan lainnya.',
    steps: [
      'Tempel teks Anda.',
      'Pilih gaya huruf yang Anda inginkan.',
      'Salin hasil konversinya.',
    ],
    faq: [
      { q: 'Apakah Title Case menangani kata-kata kecil?', a: 'Ya. Kata pendek seperti “a”, “of”, dan “the” tetap huruf kecil kecuali berada di awal atau akhir teks.' },
    ],
    limits: [
      'Title case mengikuti aturan gaya bahasa Inggris yang umum dan mungkin tidak cocok untuk setiap panduan gaya.',
    ],
  },
  'remove-duplicate-lines': {
    name: 'Hapus Baris Duplikat',
    description: 'Hapus baris yang berulang dari daftar sambil mempertahankan urutan aslinya.',
    metaDescription: 'Penghapus baris duplikat online gratis. Hapus baris berulang dari daftar, dengan opsi untuk huruf besar/kecil, spasi, dan baris kosong.',
    steps: [
      'Tempel daftar Anda, satu item per baris.',
      'Pilih apakah huruf besar/kecil dan spasi diperhitungkan.',
      'Salin hasil tanpa duplikat.',
    ],
    faq: [
      { q: 'Salinan duplikat mana yang dipertahankan?', a: 'Kemunculan pertama dipertahankan dan yang berikutnya dihapus, sehingga urutan asli Anda terjaga.' },
    ],
    limits: [
      'Hanya bekerja pada baris utuh.',
    ],
  },
  'text-sorter': {
    name: 'Pengurut Teks',
    description: 'Urutkan baris secara alfabetis, numerik, menurut panjang, atau acak.',
    metaDescription: 'Pengurut teks online gratis. Urutkan baris A–Z, Z–A, numerik, menurut panjang, atau acak, dengan urutan tidak peka huruf besar/kecil dan urutan natural.',
    steps: [
      'Tempel baris Anda.',
      'Pilih metode pengurutan dan opsinya.',
      'Salin daftar yang sudah diurutkan.',
    ],
    faq: [
      { q: 'Apa itu pengurutan natural?', a: 'Pengurutan natural membandingkan angka yang tertanam berdasarkan nilainya, sehingga “item2” muncul sebelum “item10”.' },
    ],
    limits: [
      'Pengurutan alfabetis memakai aturan lokal browser Anda.',
    ],
  },
  'text-cleaner': {
    name: 'Pembersih Teks',
    description: 'Pangkas spasi, ciutkan spasi ganda, hapus baris kosong, dan buang karakter tak terlihat.',
    metaDescription: 'Pembersih teks online gratis. Hapus spasi berlebih, baris kosong, jeda baris, karakter tak terlihat, dan tanda kutip lengkung dari teks yang ditempel.',
    steps: [
      'Tempel teks Anda.',
      'Centang opsi pembersihan yang Anda perlukan.',
      'Salin teks yang sudah dibersihkan.',
    ],
    faq: [
      { q: 'Apa itu karakter tak terlihat?', a: 'Spasi lebar nol, tanda hubung lunak, dan penanda urutan byte sering terbawa saat menyalin dari halaman web dan dapat merusak kode atau perbandingan.' },
    ],
    limits: [
      'Operasi diterapkan dalam urutan tetap; jalankan alat ini dua kali jika Anda memerlukan urutan yang berbeda.',
    ],
  },
  'text-diff-checker': {
    name: 'Pembanding Teks',
    description: 'Bandingkan dua teks dan lihat dengan tepat baris dan kata mana yang berubah.',
    metaDescription: 'Pembanding teks online gratis. Bandingkan dua versi teks berdampingan dan sorot baris atau kata yang ditambah, dihapus, dan diubah.',
    steps: [
      'Tempel teks asli di kiri dan teks yang diubah di kanan.',
      'Pilih perbandingan per baris atau per kata.',
      'Tinjau perubahan yang disorot.',
    ],
    faq: [
      { q: 'Apa perbedaan antara mode baris dan mode kata?', a: 'Mode baris menandai seluruh baris yang berubah. Mode kata menyorot kata-kata persis di dalam teks, yang cocok untuk prosa.' },
    ],
    limits: [
      'Input yang sangat besar (lebih dari sekitar 200.000 karakter) mungkin lambat.',
    ],
  },
  'json-formatter': {
    name: 'Pemformat JSON',
    description: 'Format dan rapikan JSON dengan pilihan indentasi dan pengurutan kunci.',
    metaDescription: 'Pemformat dan pemerapi JSON online gratis. Rapikan JSON dengan 2 atau 4 spasi atau tab, urutkan kunci, dan lihat lokasi kesalahan yang tepat.',
    steps: [
      'Tempel JSON Anda.',
      'Pilih indentasi dan pengurutan.',
      'Salin atau unduh hasil yang sudah diformat.',
    ],
    faq: [
      { q: 'Apakah JSON saya dikirim ke server?', a: 'Tidak. Penguraian dan pemformatan terjadi di browser Anda dengan pengurai JSON bawaan.' },
      { q: 'Mengapa JSON saya ditolak?', a: 'JSON yang ketat tidak mengizinkan komentar, koma di akhir, atau tanda kutip tunggal. Pesan kesalahan menampilkan baris dan kolom masalahnya.' },
    ],
    limits: [
      'Angka yang lebih besar dari 2^53 kehilangan presisi karena browser menguraikannya sebagai floating point.',
    ],
  },
  'json-validator': {
    name: 'Validator JSON',
    description: 'Periksa apakah JSON valid dan dapatkan baris serta kolom kesalahan yang tepat.',
    metaDescription: 'Validator JSON online gratis. Periksa sintaks JSON dan temukan baris serta kolom kesalahan yang tepat, dengan ringkasan strukturnya.',
    steps: [
      'Tempel JSON Anda.',
      'Lihat seketika apakah JSON valid.',
      'Perbaiki kesalahan yang dilaporkan lalu periksa lagi.',
    ],
    faq: [
      { q: 'Apakah ini memvalidasi terhadap JSON Schema?', a: 'Tidak. Alat ini hanya memeriksa sintaks: apakah teks berupa JSON yang terbentuk dengan benar.' },
    ],
    limits: [
      'Hanya validasi sintaks; validasi JSON Schema tidak disertakan.',
    ],
  },
  'json-minifier': {
    name: 'Pemampat JSON',
    description: 'Hapus spasi kosong dari JSON agar sepadat mungkin.',
    metaDescription: 'Pemampat JSON online gratis. Buang spasi kosong dari JSON untuk memperkecil payload, dan lihat berapa byte yang dihemat.',
    steps: [
      'Tempel JSON Anda.',
      'Output yang dimampatkan muncul beserta ukuran yang dihemat.',
      'Salin atau unduh.',
    ],
    faq: [
      { q: 'Apakah memampatkan mengubah data?', a: 'Tidak. Hanya spasi kosong yang tidak berarti yang dihapus; kunci, nilai, dan urutan tidak berubah.' },
    ],
    limits: [
      'Angka yang lebih besar dari 2^53 kehilangan presisi karena browser menguraikannya sebagai floating point.',
    ],
  },
  'xml-formatter': {
    name: 'Pemformat XML',
    description: 'Rapikan atau mampatkan XML dan tangkap tag yang tidak cocok atau tidak ditutup.',
    metaDescription: 'Pemformat XML online gratis. Rapikan atau mampatkan XML dengan indentasi yang dapat diatur dan deteksi tag yang tidak cocok atau tidak ditutup.',
    steps: [
      'Tempel XML Anda.',
      'Pilih Format atau Mampatkan dan indentasinya.',
      'Salin hasilnya.',
    ],
    faq: [
      { q: 'Seberapa menyeluruh XML divalidasi?', a: 'Alat ini memeriksa penumpukan tag, tag yang tidak ditutup, serta komentar atau CDATA yang tidak diakhiri. Alat ini tidak memvalidasi terhadap skema DTD atau XSD.' },
    ],
    limits: [
      'Hanya pemeriksaan struktural; tanpa validasi DTD atau XSD.',
    ],
  },
  'url-encoder-decoder': {
    name: 'Enkoder / Dekoder URL',
    description: 'Enkode atau dekode persen pada URL dan nilai query string.',
    metaDescription: 'Enkoder dan dekoder URL online gratis. Enkode teks dengan persen untuk URL atau dekode string yang sudah dienkode, untuk URL lengkap atau komponen tunggal.',
    steps: [
      'Pilih Enkode atau Dekode.',
      'Tempel teks atau URL Anda.',
      'Salin hasilnya.',
    ],
    faq: [
      { q: 'Komponen atau URL lengkap?', a: 'Gunakan Komponen untuk satu nilai seperti parameter query; alat ini mengenkode karakter seperti / ? & =. Gunakan URL Lengkap untuk membiarkan struktur URL tetap utuh.' },
    ],
    limits: [
      'Dekode gagal pada urutan persen yang salah bentuk, seperti satu % saja.',
    ],
  },
  'html-encoder-decoder': {
    name: 'Enkoder / Dekoder HTML',
    description: 'Escape karakter khusus sebagai entitas HTML atau dekode entitas kembali menjadi teks.',
    metaDescription: 'Enkoder dan dekoder HTML online gratis. Escape <, >, & dan tanda kutip sebagai entitas HTML, atau dekode entitas bernama dan numerik.',
    steps: [
      'Pilih Enkode atau Dekode.',
      'Tempel teks Anda.',
      'Salin hasilnya.',
    ],
    faq: [
      { q: 'Apakah pengodean membuat input pengguna aman untuk HTML?', a: 'Meng-escape lima karakter khusus membuat teks aman di dalam konten elemen HTML dan atribut bertanda kutip. Ini bukan pengganti pustaka templating atau sanitizer yang tepat dalam konteks lain.' },
    ],
    limits: [
      'Dekode mendukung entitas bernama yang umum ditambah semua entitas numerik.',
    ],
  },
  'base64-encoder-decoder': {
    name: 'Enkoder / Dekoder Base64',
    description: 'Enkode teks ke Base64 atau dekode Base64 kembali ke teks, dengan dukungan UTF-8 penuh.',
    metaDescription: 'Enkoder dan dekoder Base64 online gratis. Ubah teks ke Base64 dan sebaliknya dengan dukungan UTF-8 dan alfabet aman-URL opsional.',
    steps: [
      'Pilih Enkode atau Dekode.',
      'Tempel teks Anda.',
      'Salin hasilnya.',
    ],
    faq: [
      { q: 'Apakah Base64 itu enkripsi?', a: 'Bukan. Base64 adalah pengodean, bukan enkripsi. Siapa pun dapat mendekodenya, jadi jangan pernah memakainya untuk melindungi rahasia.' },
      { q: 'Apa itu Base64 aman-URL?', a: 'Varian ini menukar + dan / dengan - dan _ serta membuang padding = agar nilainya dapat ditempatkan dengan aman di URL dan nama file.' },
    ],
    limits: [
      'Untuk data gambar, gunakan Gambar ke Base64 dan Base64 ke Gambar.',
    ],
  },
  'regex-tester': {
    name: 'Penguji Regex',
    description: 'Uji ekspresi reguler JavaScript dengan penyorotan kecocokan langsung dan grup tangkapan.',
    metaDescription: 'Penguji regex online gratis untuk JavaScript. Lihat kecocokan, grup tangkapan, dan grup bernama secara langsung, serta pratinjau penggantian.',
    steps: [
      'Masukkan pola dan pilih flag.',
      'Tempel teks yang akan diuji.',
      'Tinjau kecocokan, grup, dan pratinjau penggantian.',
    ],
    faq: [
      { q: 'Varian regex apa yang dipakai?', a: 'Ekspresi reguler JavaScript (ECMAScript), seperti yang diimplementasikan browser Anda. PCRE, Python, dan varian lain berbeda dalam beberapa fitur.' },
      { q: 'Mengapa halaman saya membeku pada beberapa pola?', a: 'Pola dengan pengulangan bersarang dapat melakukan backtracking secara katastrofik. Pencocokan berjalan di worker latar belakang dan dihentikan setelah 1,5 detik, sehingga pola yang lepas kendali tidak dapat membekukan halaman, tetapi Anda tetap sebaiknya menghindari pola seperti (a+)+.' },
    ],
    limits: [
      'Hanya sintaks regex JavaScript.',
      'Pencocokan berhenti setelah 5.000 kecocokan atau 1,5 detik.',
    ],
  },
  'markdown-previewer': {
    name: 'Pratinjau Markdown',
    description: 'Tulis Markdown dan lihat pratinjau langsung yang aman dan tersanitasi di sampingnya.',
    metaDescription: 'Pratinjau Markdown online gratis. Tulis Markdown gaya GitHub dan lihat pratinjau HTML tersanitasi secara langsung, lalu salin HTML-nya.',
    steps: [
      'Tulis atau tempel Markdown di sebelah kiri.',
      'Lihat hasil render di sebelah kanan.',
      'Salin Markdown atau HTML yang dihasilkan.',
    ],
    faq: [
      { q: 'Apakah pratinjaunya aman?', a: 'Ya. HTML yang dihasilkan disanitasi dengan DOMPurify sebelum ditampilkan, sehingga skrip dan event handler dihapus.' },
    ],
    limits: [
      'Markdown gaya GitHub melalui pustaka marked; tanpa ekstensi matematika atau diagram.',
    ],
  },
  'password-generator': {
    name: 'Pembuat Kata Sandi',
    description: 'Buat kata sandi yang kuat: acak sepenuhnya, atau yang mudah diingat berbasis nama dan kata.',
    metaDescription: 'Pembuat kata sandi gratis: kata sandi acak sepenuhnya, atau berbasis nama seperti Nvidia132@Star dengan angka, huruf kapital, dan simbol acak. Berjalan di browser Anda.',
    steps: [
      'Pilih gaya: Nama + kata untuk yang mudah diingat, atau Acak sepenuhnya untuk keamanan maksimum.',
      'Atur panjang, jumlah kata sandi yang Anda butuhkan, dan jenis karakter yang disertakan.',
      'Salin kata sandi dan simpan di pengelola kata sandi.',
    ],
    faq: [
      { q: 'Apakah kata sandi yang dibuat disimpan atau dikirim ke mana pun?', a: 'Tidak. Kata sandi dibuat di browser Anda menggunakan crypto.getRandomValues dan tidak pernah dikirim atau disimpan.' },
      { q: 'Apakah kata sandi seperti Tesla2026#Tech aman?', a: 'Lebih baik daripada kata biasa, tetapi lebih lemah daripada teks acak. Siapa pun yang menebak dapat memulai dari daftar nama terkenal, jadi kekuatan sebenarnya berasal dari jumlah kemungkinan, yang ditampilkan dalam bit. Gunakan kata sandi berbasis nama untuk akun berisiko rendah dan yang acak sepenuhnya untuk email, perbankan, dan pengelola kata sandi.' },
      { q: 'Mengapa hanya beberapa simbol?', a: 'Kata sandi yang dibuat hanya memakai empat simbol @ # $ * karena diterima oleh hampir setiap situs web dan mudah diketik di keyboard apa pun.' },
      { q: 'Seberapa panjang sebaiknya kata sandi?', a: 'Minimal 16 karakter untuk akun penting. Panjang lebih penting daripada kerumitan.' },
    ],
    limits: [
      'Kata sandi berbasis nama lebih mudah diingat tetapi lebih lemah daripada yang acak sepenuhnya. Kekuatan yang ditampilkan mengasumsikan penyerang yang tahu cara pembuatannya.',
      'Basis data kata adalah daftar nama pilihan dalam huruf Latin; ini bukan daftar kata sandi yang paling banyak dipakai.',
      'Perkiraan kekuatan didasarkan pada kemungkinan kombinasi, bukan pada basis data kebocoran.',
    ],
  },
  'uuid-generator': {
    name: 'Pembuat UUID',
    description: 'Buat UUID versi 4 acak dalam jumlah besar dengan opsi format.',
    metaDescription: 'Pembuat UUID online gratis. Buat UUID v4 acak dalam jumlah besar, dalam huruf besar, tanpa tanda hubung, atau dengan kurung kurawal, memakai keacakan kriptografis.',
    steps: [
      'Pilih jumlah UUID dan formatnya.',
      'Buat.',
      'Salin daftarnya.',
    ],
    faq: [
      { q: 'Bisakah dua UUID bertabrakan?', a: 'UUID versi 4 memiliki 122 bit acak, sehingga kemungkinan tabrakan dapat diabaikan dalam praktik.' },
    ],
    limits: [
      'Hanya UUID versi 4 (acak) yang dibuat.',
    ],
  },
  'timestamp-converter': {
    name: 'Pengubah Timestamp',
    description: 'Ubah timestamp Unix menjadi tanggal yang mudah dibaca dan sebaliknya, di zona waktu mana pun.',
    metaDescription: 'Pengubah timestamp Unix online gratis. Ubah detik atau milidetik epoch menjadi tanggal dalam UTC dan waktu lokal, serta tanggal kembali menjadi timestamp.',
    steps: [
      'Masukkan timestamp Unix atau pilih tanggal.',
      'Baca hasilnya dalam UTC, zona lokal Anda, dan ISO 8601.',
      'Salin nilai mana pun.',
    ],
    faq: [
      { q: 'Detik atau milidetik?', a: 'Timestamp dengan 13 digit atau lebih diperlakukan sebagai milidetik, yang lebih pendek sebagai detik. Anda dapat menimpanya secara manual.' },
    ],
    limits: [
      'Rentang yang didukung adalah rentang tanggal JavaScript: kira-kira tahun -271821 hingga 275760.',
    ],
  },
  'color-converter': {
    name: 'Pengubah Warna',
    description: 'Ubah warna antara HEX, RGB, HSL, dan HSV, dengan pratinjau langsung dan pemeriksaan kontras.',
    metaDescription: 'Pengubah warna online gratis. Ubah nilai HEX, RGB, HSL, dan HSV, pratinjau warnanya, dan periksa rasio kontras WCAG.',
    steps: [
      'Masukkan warna dalam format apa pun atau gunakan pemilih.',
      'Lihat setiap format diperbarui.',
      'Salin nilai yang Anda butuhkan.',
    ],
    faq: [
      { q: 'Apa yang ditampilkan oleh pemeriksaan kontras?', a: 'Pemeriksaan ini menampilkan rasio kontras WCAG warna terhadap teks putih dan hitam, yang membantu Anda memilih kombinasi yang mudah dibaca.' },
    ],
    limits: [
      'Hanya sRGB; ruang CSS Color 4 seperti LAB, LCH, dan Display-P3 tidak didukung.',
      'Nilai transparansi (alfa) diterima tetapi diabaikan.',
    ],
  },
  'qr-code-generator': {
    name: 'Pembuat Kode QR',
    description: 'Buat kode QR untuk tautan, teks, Wi-Fi, email, atau nomor telepon, sebagai PNG atau SVG.',
    metaDescription: 'Pembuat kode QR gratis. Buat kode QR untuk URL, teks, Wi-Fi, email, dan nomor telepon lalu unduh sebagai PNG atau SVG. Dibuat di browser Anda.',
    steps: [
      'Pilih isi kode dan lengkapi detailnya.',
      'Sesuaikan ukuran, warna, dan koreksi kesalahan jika Anda mau.',
      'Unduh PNG atau SVG, dan uji dengan ponsel Anda sebelum mencetak.',
    ],
    faq: [
      { q: 'Apakah kode ini kedaluwarsa?', a: 'Tidak. Ini adalah kode statis: data disimpan di dalam kode itu sendiri, sehingga berfungsi selamanya dan tidak ada yang dilacak.' },
      { q: 'Tingkat koreksi kesalahan mana yang sebaiknya saya pilih?', a: 'Sedang cocok untuk sebagian besar penggunaan. Pilih Quartile atau Tinggi jika kode mungkin kotor atau rusak, tetapi tingkat yang lebih tinggi membuat kode lebih padat dan lebih sulit dipindai pada ukuran kecil.' },
      { q: 'Bisakah saya memakai kode ini secara komersial?', a: 'Bisa. Standar kode QR bersifat terbuka, dan kode yang dibuat di sini tidak dikenai biaya, watermark, atau pelacakan dari kami.' },
      { q: 'Apakah data saya dikirim ke mana pun?', a: 'Tidak. Kode dibuat di browser Anda, dan kata sandi Wi-Fi yang Anda masukkan tetap berada di perangkat Anda.' },
    ],
    limits: [
      'Hanya kode statis: tanpa pelacakan pemindaian dan tanpa kode yang dapat diedit.',
      'Teks yang sangat panjang menghasilkan kode padat yang sulit dipindai, jadi buatlah singkat.',
      'Warna gelap di atas terang dengan kontras kuat paling mudah dipindai.',
    ],
  },
};
export default tools;
