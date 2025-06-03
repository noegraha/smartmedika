# SmartMedika

SmartMedika adalah aplikasi sistem informasi rumah sakit berbasis web yang komprehensif, dibangun menggunakan React.js, Ant Design, dan berbagai pustaka JavaScript modern lainnya. Proyek ini dirancang untuk mengelola berbagai aspek operasional rumah sakit, mulai dari pendaftaran pasien, rekam medis, farmasi, penunjang medis (seperti HD, ESWL, Bank Darah, Radioterapi), hingga manajemen pengguna dan bridging dengan sistem eksternal seperti SatuSehat dan BPJS VClaim.

## Teknologi yang Digunakan

* **Frontend:** React.js
* **UI Framework:** Ant Design (antd), antd-mobile
* **State Management/Data Fetching:** React Query (terlihat di `package.json`), Context API
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Build Tooling:** Create React App (CRA) dengan `react-app-rewired` dan `customize-cra` untuk kustomisasi Webpack/Babel.
* **Tanggal & Waktu:** Day.js, Moment.js, Moment-timezone
* **Fitur Spesifik:**
    * `face-api.js`, `react-webcam`: Untuk fitur deteksi dan pengenalan wajah.
    * `react-beautiful-dnd`: Untuk fungsionalitas drag-and-drop (perhatikan kompatibilitas React versi 18 ke bawah).
    * `@react-pdf/renderer`: Untuk pembuatan dokumen PDF (perhatikan kompatibilitas React versi 17 ke bawah).
    * `html-to-image`, `html2canvas`, `jspdf`, `xlsx`, `papaparse`: Untuk ekspor data dan laporan.
    * `react-barcode`, `recordrtc`, `react-idle-timer`, `react-hotkeys-hook`.

## Fitur Utama

Berdasarkan struktur folder `src/pages` dan dependensi, SmartMedika mencakup modul-modul berikut:

* **Manajemen Pengguna & Pengaturan Aplikasi:**
    * Master User, Group, Modul, dan Hak Akses (`appsetting`)
    * Changelog Aplikasi
    * Face Detection & Recognition untuk autentikasi/identifikasi (`usersetting`, `tools`)
* **Pendaftaran & Rawat Jalan:**
    * Pendaftaran Pasien, Anamnesa, Pemeriksaan Fisik
    * Diagnosis (ICD-10, SNOMED CT), Prosedur (ICD-9-CM, SNOMED CT)
    * Order Resep, Order Penunjang (Lab, Radiologi)
    * Bridging BPJS VClaim (Surat Kontrol, Rujuk Balik)
    * SatuSehat Integration (Encounter, Observation, Medication, etc.)
* **Rawat Inap:**
    * Manajemen Pasien Rawat Inap, Transfer Ruang/Penjamin
    * Askep (Asuhan Keperawatan)
    * Pemeriksaan Harian (CPPT, TTV, EWS, dll.)
    * Manajemen Kamar & Bed
* **Instalasi Gawat Darurat (IGD):**
    * Triase, CPPT IGD
    * Order Penunjang IGD
* **Farmasi:**
    * Transaksi Resep, Pengembalian Resep
    * Riwayat Resep Pasien
* **Penunjang Medis:**
    * **Hemodialisa (HD):** Assesment, Instruksi Medik, Monitoring Dialisis, Laporan.
    * **ESWL:** Form Tindakan, Hasil.
    * **Bank Darah:** Order Darah, Pelayanan Darah, Manajemen Stok.
    * **Kemoterapi:** Protokol Kemoterapi, Pelayanan Kemoterapi.
    * **Radioterapi:** Jadwal Radioterapi, Pelayanan Radioterapi.
    * **Gizi:** Asuhan Gizi, Screening Gizi.
    * **Laboratorium & Patologi Anatomi (Lab PA):** Order, Hasil.
* **Bridging & Integrasi:**
    * SatuSehat (Encounter, Patient, Observation, Medication, Procedure, etc.)
    * BPJS VClaim (Surat Kontrol, PRB, etc.)
    * Bridging SITB
* **Laporan & Dashboard:**
    * Dashboard Rawat Jalan, Rawat Inap, Askep, ESWL, HD.
    * Laporan Statistik Kunjungan, Diagnosis, dll.
* **Tools:**
    * Sinkronisasi data (ICD, Billing)
    * Fitur pengenalan suara (Speech-to-Text), rekam audio
    * Modul Face Detection & Recognition

## Persyaratan Sistem

* Node.js (Disarankan versi LTS, seperti 18.x.x atau 20.x.x, karena masalah kompatibilitas dengan React 19 dan beberapa pustaka)
* npm atau Yarn

## Instalasi

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek secara lokal:

1.  **Clone repositori:**
    ```bash
    git clone <URL_REPOSITORI_ANDA>
    cd smartmedika
    ```

2.  **Hapus `node_modules` dan *lock file* yang ada (untuk membersihkan instalasi sebelumnya):**
    ```bash
    rm -rf node_modules
    del package-lock.json # Untuk Windows
    # Jika menggunakan Yarn: rm yarn.lock

    npm cache clean --force # Bersihkan cache npm
    # Jika menggunakan Yarn: yarn cache clean
    ```

3.  **Pastikan versi React yang benar di `package.json` (penting untuk menghindari konflik):**
    Karena `react-beautiful-dnd` (dan mungkin `@react-pdf/renderer`) belum sepenuhnya mendukung React 19, disarankan untuk mematok `react` dan `react-dom` ke versi `18.2.0`.
    Buka `package.json` dan pastikan baris-baris berikut **tanpa tanda `^` atau `~`**:
    ```json
    "dependencies": {
      "react": "18.2.0",
      "react-dom": "18.2.0",
      "react-scripts": "5.0.1",
      "react-beautiful-dnd": "^13.1.1",
      "@react-pdf/renderer": "^1.6.17", // Atau versi yang lebih baru jika tersedia dan kompatibel
      "next": "^15.3.3", // Atau versi yang diinginkan
      // ... dependensi lainnya
    }
    ```

4.  **Instal semua dependensi:**
    ```bash
    npm install
    # atau
    # yarn install
    ```

5.  **Jalankan aplikasi di mode pengembangan:**
    ```bash
    npm start
    # atau
    # yarn start
    ```
    Aplikasi akan berjalan di `http://localhost:3000` (atau port lain yang tersedia).

## Catatan Penting Mengenai Migrasi ke Next.js

Proyek ini saat ini menggunakan Create React App (`react-scripts`). Jika Anda berencana untuk memigrasikannya sepenuhnya ke Next.js, Anda perlu melakukan langkah-langkah tambahan:

1.  **Struktur Proyek Next.js:** Pindahkan komponen halaman Anda ke dalam folder `pages/` sesuai konvensi Next.js.
2.  **Routing:** Ganti `react-router-dom` dengan sistem *routing* berbasis file Next.js.
3.  **Data Fetching:** Sesuaikan metode *data fetching* Anda menggunakan `getServerSideProps` atau `getStaticProps` untuk SSR/SSG.
4.  **Konfigurasi Webpack/Babel:** Konfigurasi kustom di `config-overrides.js` (untuk Less loader dan Ant Design) perlu direplikasi di `next.config.js`. Ant Design memiliki plugin khusus untuk Next.js.
5.  **Uji Kompatibilitas:** Perhatikan pustaka seperti `react-beautiful-dnd` dan `@react-pdf/renderer`. Jika Anda ingin menggunakan React 19 atau versi Next.js yang lebih baru yang memerlukan React 19, Anda *harus* mencari alternatif untuk pustaka yang tidak kompatibel ini atau menemukan *fork* yang mendukung React versi terbaru.

## Kontribusi

Untuk berkontribusi pada proyek ini, silakan ikuti alur kerja standar GitHub (fork, buat branch, commit perubahan, buat pull request).

## Lisensi

[Tentukan jenis lisensi di sini, contoh: MIT License]
