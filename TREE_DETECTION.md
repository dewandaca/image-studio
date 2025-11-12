# 🌳 Tree/Color Detection Feature - Dokumentasi

## Ikhtisar

Fitur **Tree Detection** adalah tool untuk mendeteksi warna pohon/vegetasi dalam citra menggunakan **HSV Color Segmentation**. Fitur ini dirancang khusus untuk **Tugas M6 Pengolahan Citra** yang meminta penghitungan jumlah piksel yang terdeteksi sebagai "warna pohon".

## Konsep Dasar

### HSV Color Model

HSV (Hue, Saturation, Value) adalah model warna yang memisahkan informasi warna dari kecerahan:

- **Hue (Warna)**: Rentang 0°-360°, menunjukkan warna pada color wheel
- **Saturation (Kejenuhan)**: Rentang 0%-100%, mengukur intensitas warna (0% = abu-abu, 100% = warna murni)
- **Value (Kecerahan)**: Rentang 0%-100%, mengukur tingkat kecerahan pixel (0% = hitam, 100% = terang)

### Mengapa HSV untuk Deteksi Pohon?

HSV lebih baik daripada RGB untuk segmentasi warna karena:

1. **Pemisahan Warna dari Kecerahan**: Perubahan pencahayaan tidak mempengaruhi rentang Hue
2. **Intuitif**: Mudah mendefinisikan rentang warna hijau (pohon) dibanding RGB yang kompleks
3. **Tahan Terhadap Variasi Lighting**: Foto satelit Google Maps sering memiliki lighting yang berbeda

### Rentang Warna Hijau dalam HSV

Pada color wheel HSV (0°-360°):

- 🔴 **0°**: Merah
- 🟠 **30°**: Orange
- 🟡 **60°**: Kuning
- 🟢 **120°**: Hijau Sempurna
- 🔵 **240°**: Biru
- 🟣 **300°**: Magenta

**Untuk pohon/vegetasi**, gunakan rentang Hue: **40°-100°** (warna hijau dengan toleransi)

## Cara Menggunakan Fitur

### Step 1: Upload Gambar

1. Klik tombol **"📤 Upload Gambar"** di halaman utama
2. Pilih citra yang ingin dianalisis (bisa dari Google Maps Satellite, foto natural, dst)
3. Tunggu gambar di-load

### Step 2: Buka Tab "🌳 Tree Detection"

Setelah gambar di-upload, sidebar akan menampilkan daftar tab. Klik tab **"🌳 Tree Detection"**

### Step 3: Sesuaikan Parameter HSV

#### A. Rentang Hue (Warna)

- **Hue Min** (default: 40°)
- **Hue Max** (default: 100°)

Geser slider untuk menyesuaikan rentang warna hijau yang ingin dideteksi:

- Gunakan 40°-100° untuk hijau standar
- Gunakan 35°-110° jika ingin lebih luas (termasuk kuning & hijau biru)
- Gunakan 45°-95° untuk hijau murni saja

#### B. Saturation Min (Kejenuhan Minimum)

Default: **15%** (diperbaharui untuk tangkap hijau tua)

Nilai ini mengontrol "kemurnian" warna hijau:

- **Lebih rendah (10-15%)**: Deteksi hijau kusam, HIJAU TUA, dan gelap (recommended untuk satellite imagery)
- **Medium (20-30%)**: Untuk foto natural dan satelit standard
- **Lebih tinggi (40-50%)**: Hanya deteksi hijau cerah/jenuh (mengurangi noise)

#### C. Value Min (Kecerahan Minimum)

Default: **15%** (diperbaharui untuk tangkap hijau gelap)

Nilai ini mengontrol tingkat pencahayaan:

- **Lebih rendah (10-20%)**: Deteksi area gelap TERMASUK POHON GELAP dan bayangan 🌳
- **Medium (25-35%)**: Untuk hasil balanced
- **Lebih tinggi (50-60%)**: Hanya deteksi area terang (mengurangi background gelap)

⚠️ **PENTING**: Jika hijau tua tidak terdeteksi, turunkan **Value Min** ke 10-15%

### Step 4: Jalankan Deteksi

Klik tombol **"🔍 Deteksi Pohon"** untuk menjalankan analisis

Atau gunakan **real-time detection**: Setiap kali Anda menggeser slider, hasil akan update secara otomatis

### Step 5: Analisis Hasil

#### Hasil Ditampilkan Dalam Tiga Bagian:

1. **Statistik Deteksi** (Kanan Atas)

   - Total Piksel: Jumlah total piksel dalam gambar
   - Piksel Pohon: Jumlah piksel yang terdeteksi sebagai warna pohon ✅
   - Persentase: Persentase area yang adalah pohon

2. **Progress Bar**

   - Visualisasi persentase deteksi dengan animasi
   - Warna gradient menunjukkan intensitas deteksi

3. **Kanvas Hasil**:

   - **Kiri**: Highlight visualization (area pohon di-highlight dengan warna cerah)
   - **Kanan**: Binary mask (putih = pohon, hitam = bukan pohon)

4. **Sampel Piksel Terdeteksi**
   - Menampilkan koordinat (X, Y) dan nilai RGB/HSV dari 100 pixel pertama yang terdeteksi
   - Berguna untuk verifikasi hasil akurat atau tidak

## Tips Optimisasi

### Untuk Gambar Satelit Google Maps (Standard)

```
Hue Min: 40°
Hue Max: 100°
Saturation Min: 15%
Value Min: 15%
```

Karakteristik: Warna hijau gelap, jenuh, dengan kontras tinggi
✅ **Ini adalah default baru - sudah optimal untuk hijau tua**

### Untuk Hijau Gelap/Tua Ekstrem

```
Hue Min: 40°
Hue Max: 100°
Saturation Min: 10%
Value Min: 10%
```

Gunakan jika still tidak terdeteksi - untuk area dengan shadows atau hijau sangat tua.

### Untuk Foto Natural (Outdoor)

```
Hue Min: 35°
Hue Max: 110°
Saturation Min: 15%
Value Min: 40%
```

Karakteristik: Variasi hijau terang-gelap, lighting alami

### Untuk Foto Indoor (Plant dalam rumah)

```
Hue Min: 40°
Hue Max: 100°
Saturation Min: 10%
Value Min: 20%
```

Karakteristik: Hijau kusam, pencahayaan terbatas

### Mengatasi Over-Detection (Terlalu Banyak Deteksi)

Jika hasil mendeteksi terlalu banyak pixel yang bukan pohon:

1. **Naikan Saturation Min** ke 30-40% (filter warna lebih ketat)
2. **Naikan Value Min** ke 40-50% (filter pencahayaan lebih ketat)
3. **Perkecil Hue range** menjadi 50°-90° (fokus hijau murni saja)

### Mengatasi Under-Detection (Kurang Deteksi)

Jika hasil mendeteksi terlalu sedikit pixel pohon:

1. **Turunkan Saturation Min** ke 10-15% (deteksi hijau kusam)
2. **Turunkan Value Min** ke 20-25% (deteksi area gelap)
3. **Perlebar Hue range** menjadi 30°-110° (termasuk kuning & biru)

## Output & Interpretasi

### Metrik Utama

| Metrik                  | Rumus                                | Interpretasi           |
| ----------------------- | ------------------------------------ | ---------------------- |
| **Jumlah Piksel Pohon** | Hitung pixel dimana HSV sesuai range | Output utama tugas M6  |
| **Persentase**          | (Piksel Pohon / Total Piksel) × 100  | Proporsi area vegetasi |
| **Progress Visual**     | Bar chart dinamis                    | Quick visual check     |

### Contoh Output

Untuk gambar 800x600 (480,000 total pixel):

- Jika mendeteksi 96,000 piksel pohon = **20%** area adalah pohon
- Jika mendeteksi 144,000 piksel pohon = **30%** area adalah pohon
- Jika mendeteksi 240,000 piksel pohon = **50%** area adalah pohon

## Implementasi Teknis

### Algorithm Flow

```
1. Input: Gambar RGB original
2. Loop setiap pixel:
   a. Convert RGB → HSV
   b. Check if (H dalam range) AND (S ≥ min) AND (V ≥ min)
   c. If TRUE → pixel terdeteksi (count++)
   d. Else → pixel tidak terdeteksi
3. Output:
   - Jumlah piksel terdeteksi
   - Persentase
   - Highlight mask (white/black visualization)
4. Display hasil di canvas
```

### Konversi RGB ke HSV

```javascript
rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // Hue (0-360°)
  if (delta === 0) h = 0;
  else if (max === r) h = 60 * (((g - b) / delta) % 6);
  else if (max === g) h = 60 * ((b - r) / delta + 2);
  else h = 60 * ((r - g) / delta + 4);

  // Saturation (0-100%)
  s = max === 0 ? 0 : (delta / max) * 100;

  // Value (0-100%)
  v = max * 100;

  return { h, s, v };
}
```

## Advanced Features

### Real-Time Detection

Setiap menggeser slider, deteksi akan otomatis update tanpa perlu klik tombol

### Visual Highlight

Dua visualisasi ditampilkan:

1. **Highlight Mode**: Pixel pohon di-brighten untuk visual lebih jelas
2. **Binary Mask**: Pixel pohon = putih (255), non-pohon = hitam (0)

### Sample Pixels List

Menampilkan sampel 100 pixel terdeteksi pertama dengan:

- Koordinat (X, Y)
- Nilai RGB original
- Nilai HSV untuk verification

## Troubleshooting

### Masalah: Tidak ada pixel yang terdeteksi

**Solusi**:

1. Cek apakah gambar benar-benar memiliki area hijau
2. Turunkan Saturation Min dan Value Min
3. Perlebar Hue range (misal 30°-120°)

### Masalah: Terlalu banyak false positive (background terdeteksi)

**Solusi**:

1. Naikan Saturation Min (lebih ketat pada kejenuhan)
2. Naikan Value Min (filter pencahayaan)
3. Perkecil Hue range ke 45°-95° (hijau murni)

### Masalah: Canvas tidak menampilkan hasil

**Solusi**:

1. Pastikan gambar sudah ter-upload dengan benar
2. Refresh halaman (F5)
3. Cek console browser untuk error message

## Integrasi dengan Tugas M6

### Requirement Tugas

✅ Program komputer untuk deteksi warna pohon
✅ Menggunakan HSV/Hue untuk segmentasi
✅ Output: Jumlah total piksel terdeteksi
✅ Gambar dari Google Maps Satellite (supported)
✅ Visual feedback & statistik

### Deliverable

Gunakan fitur ini untuk:

1. Upload citra satelit area dengan pohon
2. Sesuaikan parameter HSV sampai hasil optimal
3. Catat nilai: **Total Piksel Pohon** dan **Persentase**
4. Dokumentasikan parameter yang digunakan
5. Screenshot hasil detection untuk laporan

## Performance Notes

- **Processing Speed**: Real-time untuk gambar < 5MP
- **Memory Usage**: Optimal untuk desktop/laptop
- **Browser Support**: Chrome, Firefox, Safari, Edge (ES6+)

## Future Improvements

Fitur yang bisa ditambahkan di masa depan:

- [ ] Area-based filtering (misal hanya detect cluster > N pixel)
- [ ] Multiple color range detection (simultaneous detection)
- [ ] Export hasil ke JSON/CSV
- [ ] Batch processing untuk multiple images
- [ ] ML-based tree detection (OpenCV.js integration)

---

**Dibuat untuk**: Praktikum Pengolahan Citra Digital (Semester 4, 2025)
**Target Tugas**: M6 Tree Detection & Color Segmentation
**Mode Operasi**: Real-time, Interactive
**Tech Stack**: Vanilla JS, Canvas API, HSV Color Model
