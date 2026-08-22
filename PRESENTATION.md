PRESENTATION NOTES — Kedai Prasmar

Tujuan
------
Menyiapkan versi siap bimbingan/sidang dari website Kedai Prasmar: tampilan rapi, mode presentasi bersih, Asisten AI yang stabil dan dapat menjawab tanpa API key (fallback), serta dokumentasi singkat bagi penguji.

Ringkasan Perubahan (apa yang telah dibuat)
------------------------------------------
1. Landing / Home
   - Mode Presentasi: buka beranda dengan ?presentation=1 (mis. http://localhost:5173/#/?presentation=1) untuk tampilan minimal, lebih formal, animasi dikurangi.
   - Ilustrasi "Perjalanan Kedai Prasmar" menggunakan gambar lokal (/public/images/story.jpg) untuk menghindari missing asset.
   - Pembenahan tata letak dan responsive untuk mobile.

2. Navbar & Footer
   - Mobile menu diperbaiki (tap area, posisi panel, z-index) agar tautan (Beranda, Menu, Lokasi, Asisten AI, Dashboard) muncul dengan benar.
   - Footer disederhanakan untuk presentasi; tetap informatif.

3. Menu
   - Gambar menu memakai <picture> dengan fallback .webp apabila tersedia; onError mengganti ke /images/placeholder-food.jpg sehingga tidak ada area kosong.

4. Asisten AI (ChatAI)
   - Code-splitting: ChatAI di-lazy-load untuk mengurangi ukuran bundle awal.
   - Stabilitas: jika VITE_GROQ_API_KEY tidak diset atau Groq gagal, Asisten memberi jawaban fallback lokal (rekomendasi, harga, lokasi, jam buka). Ini menjaga demo tetap berjalan tanpa koneksi ke API eksternal.
   - Fitur presentasi:
     - "Singkat: ON/OFF" (concise mode) — instruksi ke model agar jawab 1-2 kalimat.
     - Tombol Bersihkan percakapan (trash) — reset ke pesan pembuka.
     - Tombol Salin pada balasan AI — salin teks balasan ke clipboard.
   - TTS (Text-to-Speech): pemecahan kalimat dan variasi kecil pada pitch/rate untuk mengurangi kesan robotik. TTS optional (toggle Suara) dan Auto-play.

Bagaimana Menjalankan (lokal)
-----------------------------
1. Siapkan environment (opsional: VITE_GROQ_API_KEY)
   - Jika ingin Asisten AI bekerja via Groq, buat file .env di root project dan tambahkan:
     VITE_GROQ_API_KEY=token_anda
   - Jika tidak ada key, Asisten akan pakai jawaban fallback lokal.

2. Jalankan development server
   - npm install  # jika belum
   - npm run dev
   - Buka: http://localhost:5173/ (atau sesuai terminal)

3. Build produksi (untuk verifikasi)
   - npm run build
   - Hasil akan ada di folder dist/

Langkah Demo (script singkat untuk 6–8 menit)
---------------------------------------------
1. (30s) Buka beranda default. Jelaskan desain, hero, CTA. Tunjukkan mode presentasi:
   - Buka /#/?presentation=1, tunjukkan tampilan minimal dan jelaskan tujuan (lebih formal, tanpa animasi).

2. (1 min) Bagian Cerita Kami
   - Tunjukkan ilustrasi lokal "Perjalanan Kedai Prasmar" dan statistik pelanggan.

3. (1 min) Menu & Responsiveness
   - Buka halaman Menu, tunjukkan grid produk, filter, favorit, dan tombol tambah. Perlihatkan bahwa gambar memiliki fallback jika rusak.
   - Uji responsif dengan device emulator (mobile) — buka menu dan navbar mobile.

4. (2–3 min) Asisten AI (fokus utama demo)
   - Buka /#/chat-ai
   - Tunjukkan fitur header: toggle suara, pilihan voice, tombol "Singkat" dan tombol trash (bersihkan chat).
   - Menjelaskan fallback: cabut (atau jangan set) API key lalu kirim pertanyaan: "Menu makanan apa yang paling enak?" — Asisten tetap menjawab dengan fallback lokal.
   - Aktifkan Singkat: kirim pertanyaan lain dan tunjukkan jawaban 1–2 kalimat.
   - Jika punya API key: tambah .env, restart dev server, tunjukkan respons model via Groq (lebih kaya). Jika tidak, jelaskan ini bisa diaktifkan.
   - Peragakan TTS: aktifkan Suara, klik "Putar Suara" pada jawaban atau aktifkan Auto untuk mendengar.

5. (30s) Ringkas & Tanya
   - Sampaikan keunggulan: stabil tanpa key (cadangan), presentasi-ready mode, UX mobile-friendly.
   - Siapkan 1–2 jawaban singkat jika penguji bertanya teknis.

Checklist Pra-Sidang (5 menit sebelum)
-------------------------------------
- [ ] Jalankan npm run dev dan pastikan http://localhost:5173/ dapat diakses
- [ ] (Opsional) Jika ingin model online aktif: tambahkan VITE_GROQ_API_KEY di .env lalu restart dev server
- [ ] Tutup tab/devtools yang tidak perlu, matikan notifikasi
- [ ] Siapkan device untuk mobile preview (handphone/inspector)
- [ ] Pastikan volume speaker/headset untuk TTS sudah diatur

Notes Teknis & Keterbatasan
--------------------------
- Kualitas TTS tergantung pada voice engine browser/perangkat. Untuk kualitas studio (mirip Gemini/ChatGPT voices), integrasi cloud TTS (Google/Azure/ElevenLabs) diperlukan.
- 404 pada refresh di hosting statis: HashRouter sudah digunakan untuk menghindarinya. Kalau ingin clean URLs, harus atur rewrite ke index.html pada hosting.
- Ukuran bundle: ChatAI di-lazy-load, tetapi masih ada peringatan beberapa chunk > 500 KB — boleh dioptimalkan lebih lanjut jika diperlukan.

Jika Anda ingin, saya bisa (pilih salah satu):
- Integrasikan TTS cloud premium (butuh API key & backend proxy)
- Buatkan slide singkat (PowerPoint / PDF) dari poin-poin ini untuk presentasi
- Optimasi performa lebih lanjut (manualChunks, dynamic imports lain)

---
Tanggal pembuatan: 2026-08-21
Pembuat perubahan: Copilot + Anda (kode sudah diterapkan di repo lokal).