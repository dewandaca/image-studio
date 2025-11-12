# 🌳 Tree Detection - Complete Usage Tutorial

## 📱 Interface Overview

Aplikasi Pixel Reader sekarang memiliki **8 fitur utama** dengan fitur baru **Tree Detection** di tab terakhir.

### Sidebar Navigation

```
┌─ 📊 Pixel Data
├─ 🌑 Grayscale
├─ ⚫⚪ Binary
├─ 💡 Brightness
├─ ➕ Arithmetic
├─ 🔣 Boolean
├─ 🔄 Geometry
├─ 📊 Histogram
├─ 📈 Statistics
└─ 🌳 Tree Detection ← BARU!
```

## 🎯 Langkah Demi Langkah Menggunakan Tree Detection

### FASE 1: PERSIAPAN (3 menit)

#### 1.1 Siapkan Gambar

Pilih salah satu:

- **Google Maps Satellite** (recommended) - buka maps.google.com
- Foto outdoor/hutan dari smartphone
- Foto tanaman indoor
- Gambar forest dari dataset apapun

Format yang didukung: JPG, PNG

#### 1.2 Buka Aplikasi

Akses aplikasi Pixel Reader di:

```
http://localhost:5174/  (jika development)
atau akses deployed version
```

### FASE 2: UPLOAD GAMBAR (2 menit)

#### 2.1 Upload

```
1. Klik tombol "📤 Upload Gambar" (besar di tengah)
2. Pilih file dari komputer
3. Tunggu preview muncul
   - Preview canvas akan menampilkan gambar asli
   - Informasi ukuran akan ditampilkan (misal: 800x600 pixel)
   - Sidebar akan muncul dengan daftar tab
```

#### 2.2 Verifikasi Upload Sukses

Cek:

- ✅ Preview gambar muncul
- ✅ "Ukuran: [width] x [height] pixel" muncul
- ✅ Sidebar tab muncul dengan 9 tombol

### FASE 3: BUKA TREE DETECTION (1 menit)

#### 3.1 Klik Tab

Scroll sidebar ke bawah, klik tombol **"🌳 Tree Detection"**

#### 3.2 Tab Terbuka

Konten tab akan menampilkan:

- Judul: "🌳 Deteksi Pohon / Vegetasi (Color Segmentation)"
- Deskripsi fitur
- Section "Pengaturan Rentang Hue"
- 4 slider untuk parameter
- 2 tombol (Deteksi & Reset)

### FASE 4: DETEKSI (1-2 menit)

#### 4.1 Default Parameter (Recommended)

Slider sudah set optimal untuk foto satelit:

```
Hue Min: 40°          ← warna hijau minimal
Hue Max: 100°         ← warna hijau maksimal
Saturation Min: 20%   ← kejenuhan minimal
Value Min: 30%        ← kecerahan minimal
```

**Untuk google maps: JANGAN UBAH, langsung klik Deteksi!**

#### 4.2 Klik Tombol "🔍 Deteksi Pohon"

```
Atau jika ingin adjust slider terlebih dahulu:
- Geser Hue Min ke kanan/kiri untuk expand/shrink rentang hue
- Geser saturation untuk filter warna kurang/lebih jenuh
- Geser value untuk include area lebih terang/gelap
- Hasil update OTOMATIS saat slider bergerak (real-time)
```

### FASE 5: BACA HASIL (1 menit)

#### 5.1 Hasil Utama - JAWABAN M6

Lihat section "Hasil Deteksi" (kartu di atas):

```
RENTANG HSV YANG DIDETEKSI:
🎨 Hue: 40° - 100°
🔆 Saturation: ≥ 20%
⚡ Value: ≥ 30%

HASIL DETEKSI:
Total Piksel: 480,000
Piksel Pohon: 96,000  ← ⭐ INI JAWABAN M6
Persentase: 20%
```

**Format Penulisan Jawaban:**

```
"Jumlah piksel yang terdeteksi sebagai warna pohon adalah 96,000 pixel"
atau
"96,000 piksel" (simple)
```

#### 5.2 Progress Bar

Bawah section hasil menampilkan progress bar visual:

```
[████████░░░░░░░░░░░░] 20%
```

Semakin panjang = semakin banyak pohon terdeteksi.

#### 5.3 Visualisasi Kanvas

Dua gambar ditampilkan side-by-side:

**KIRI - Highlight Mode:**

```
Area pohon di-brighten (lebih terang)
Area bukan pohon tetap normal
Untuk visual clear hasil deteksi
```

**KANAN - Binary Mask:**

```
Area pohon: PUTIH (255, 255, 255)
Area bukan pohon: HITAM (0, 0, 0)
Untuk verifikasi binary accuracy
```

#### 5.4 Sampel Pixel List

Bagian bawah menampilkan daftar 100 pixel pertama yang terdeteksi:

```
Pixel 1:  Pos: (45, 120)  RGB(34, 156, 78)   HSV(110°, 78%, 61%)
Pixel 2:  Pos: (46, 120)  RGB(35, 158, 80)   HSV(111°, 79%, 62%)
...
```

Gunakan untuk verify hasil akurat atau tidak.

### FASE 6: DOKUMENTASI (2 menit)

#### 6.1 Screenshot Hasil

Ambil screenshot 3 bagian:

1. **Full tab** - untuk laporan overview
2. **Hasil Deteksi card** - untuk value numerik
3. **Canvas visualization** - untuk bukti visual

#### 6.2 Catat di Laporan

```
TUGAS M6 - TREE DETECTION:

Input: Google Maps Satellite - Area Hutan [nama lokasi]
Ukuran Gambar: [width]x[height] pixel
Total Piksel: [value]
Piksel Pohon: [value] ← JAWABAN UTAMA
Persentase: [percentage]%

Parameter HSV:
- Hue: 40°-100°
- Saturation Min: 20%
- Value Min: 30%

Status: ✅ Berhasil terdeteksi
```

## 🎛️ Parameter Customization

### Kapan Perlu Ubah Parameter?

**Untuk Google Maps Satellite**: ❌ Jangan ubah, default sudah optimal

**Untuk Foto Natural (outdoor dengan lighting alami):**

```
Hue Min: 35° (dari 40, expand ke kuning)
Hue Max: 110° (dari 100, expand ke biru-hijau)
Saturation Min: 15% (dari 20, lebih lembut)
Value Min: 40% (dari 30, filter area gelap)
```

**Untuk Foto Indoor (tanaman rumah dengan cahaya terbatas):**

```
Hue Min: 40° (tetap)
Hue Max: 100° (tetap)
Saturation Min: 10% (dari 20, deteksi warna kusam)
Value Min: 20% (dari 30, include bayangan)
```

**Untuk Dark Forest (hutan gelap):**

```
Hue Min: 35° (dari 40)
Hue Max: 95° (dari 100)
Saturation Min: 25% (dari 20, filter lebih ketat)
Value Min: 20% (dari 30, include area gelap)
```

### Debug: Terlalu Banyak Deteksi

Jika hasil mendeteksi background non-pohon:

```
OPSI 1 (Recommended):
Geser Saturation Min → KANAN (20% → 30-35%)
Result: Hanya warna hijau jenuh yang terdeteksi

OPSI 2:
Geser Value Min → KANAN (30% → 40-45%)
Result: Hanya area terang yang terdeteksi

OPSI 3:
Perkecil Hue range: Max dari 100° → 90°
Result: Lebih fokus hijau murni
```

### Debug: Kurang Deteksi

Jika hasil mendeteksi terlalu sedikit pixel:

```
OPSI 1 (Recommended):
Geser Saturation Min → KIRI (20% → 10-15%)
Result: Warna hijau kusam juga terdeteksi

OPSI 2:
Geser Value Min → KIRI (30% → 20-25%)
Result: Area gelap & bayangan juga terdeteksi

OPSI 3:
Perlebar Hue range: Max dari 100° → 110°
Result: Include warna kuning-hijau
```

## 📊 Contoh Output Real

### Contoh 1: Google Maps Satellite - Hutan Tropis

```
Input: Screenshot Google Maps - Area hutan di Indonesia
Ukuran: 960 x 720 pixel (691,200 total pixel)

HASIL:
Total Piksel: 691,200
Piksel Pohon: 345,600
Persentase: 50%

Interpretasi: Setengah dari area adalah vegetasi/pohon
```

### Contoh 2: Foto Natural - Pohon di Taman

```
Input: Foto iPhone 12 - Taman dengan pohon berbunga
Ukuran: 3024 x 4032 pixel (12,192,768 total pixel)

PARAMETER CUSTOM:
Hue Min: 35° (adjust untuk include bunga kuning)
Hue Max: 110°
Saturation Min: 15%
Value Min: 40%

HASIL:
Total Piksel: 12,192,768
Piksel Pohon: 4,064,256
Persentase: 33.35%

Interpretasi: 1/3 dari area adalah pohon/vegetasi
```

### Contoh 3: Foto Indoor - Tanaman dalam Ruangan

```
Input: Foto smartphone - Pot tanaman di rumah
Ukuran: 1920 x 1080 pixel (2,073,600 total pixel)

PARAMETER CUSTOM:
Hue Min: 40°
Hue Max: 100°
Saturation Min: 10% (adjust untuk hijau kusam)
Value Min: 20%

HASIL:
Total Piksel: 2,073,600
Piksel Pohon: 124,416
Persentase: 6%

Interpretasi: Tanaman hanya occupies ~6% dari frame
```

## 🎨 Color Wheel Reference

Pada tab Tree Detection ada section "Referensi Color Wheel HSV" yang menampilkan:

```
HUECOLOR WHEEL (0° - 360°):

🔴 0°: Merah
🟠 30°: Orange
🟡 60°: Kuning
🟢 120°: Hijau Sempurna
🔵 240°: Biru
🟣 300°: Magenta

📌 UNTUK POHON/VEGETASI: GUNAKAN 40°-100° (warna hijau)
```

Reference ini membantu understand HSV color space.

## 💡 Tips Pro

**Tip 1: Real-Time Adjustment**
Tidak perlu klik tombol deteksi setiap kali ubah slider. Geser slider → hasil update instantly. Cari parameter terbaik dengan visual feedback real-time.

**Tip 2: Batch Processing**
Jika ada multiple gambar:

1. Process gambar 1 → catat hasil
2. Reset tab (klik 🔄 Reset Deteksi)
3. Upload gambar 2 → repeat deteksi
4. Compare hasil antar gambar

**Tip 3: Zoom In/Out**
Jika result canvas terlalu kecil di layar laptop:

- Browser zoom: Ctrl++ (zoom in) atau Ctrl+- (zoom out)
- Result akan scale accordingly

**Tip 4: Binary Mask Verification**
Gunakan white (putih) di binary mask untuk double-check hasil:

- Pixel putih = terdeteksi sebagai pohon
- Hitung manual jika ingin verify

**Tip 5: Screenshot for Docs**
Ambil 3 screenshot untuk laporan:

1. **Full interface** - show parameter yang digunakan
2. **Result card** - show numerik values
3. **Canvas side-by-side** - show visual evidence

## 🔧 Troubleshooting

| Issue                                 | Solusi                                                                     |
| ------------------------------------- | -------------------------------------------------------------------------- |
| Tab Tree Detection tidak muncul       | Pastikan sudah upload gambar, baru tab akan muncul                         |
| Gambar tidak load di Tree Detection   | Refresh browser (F5) atau re-upload gambar                                 |
| Slider tidak bergerak                 | Klik & drag slider handle (titik biru)                                     |
| Hasil tidak berubah saat ubah slider  | Tunggu sebentar (processing running), atau klik tombol Deteksi manual      |
| Canvas hasil kosong/hitam             | Gambar terlalu gelap atau parameter terlalu ketat, ubah Value Min ke bawah |
| Hasil mendeteksi seluruh gambar putih | Parameter terlalu longgar, naikkan Saturation Min atau Value Min           |

## 📱 Responsive Design

Tree Detection berfungsi optimal di:

- ✅ **Desktop** (1920x1080 ke atas)
- ✅ **Laptop** (1366x768)
- ✅ **Tablet** (768x1024)
- ✅ **Mobile** (375x667) - scroll untuk lihat semua element

## 🎓 Penggunaan untuk M6

### Checklist Lengkap untuk Submit:

- [ ] Upload gambar yang sesuai (satellite/pohon)
- [ ] Buka tab Tree Detection
- [ ] Catat nilai default atau custom parameter
- [ ] Klik "Deteksi Pohon"
- [ ] Catat **"Piksel Pohon"** → JAWABAN M6
- [ ] Screenshot hasil (full interface)
- [ ] Screenshot result card dengan value
- [ ] Screenshot canvas visualization
- [ ] Tulis interpretasi hasil
- [ ] Submit laporan dengan screenshot + values

### Format Laporan M6:

```
LAPORAN TUGAS M6 - TREE DETECTION

OBJEKTIF:
Mendeteksi warna pohon pada citra satelit menggunakan
HSV Color Segmentation dan menghitung jumlah pixel terdeteksi.

METODE:
1. Aplikasi: Pixel Reader + fitur Tree Detection
2. Model warna: HSV (Hue-Saturation-Value)
3. Algoritma: Pixel-by-pixel HSV range checking

PARAMETER:
Hue Min: 40°, Hue Max: 100°
Saturation Min: 20%, Value Min: 30%

HASIL:
Total Pixel: [dari aplikasi]
Pixel Pohon: [dari aplikasi] ← JAWABAN
Persentase: [dari aplikasi]%

KESIMPULAN:
Aplikasi berhasil mendeteksi [percentage]% area
sebagai warna pohon, atau setara [detectedPixels] pixel
dari total [totalPixels] pixel.
```

---

**Semoga berhasil dengan Tugas M6! 🌳🎉**
