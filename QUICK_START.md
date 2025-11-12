# 🌳 Quick Start Guide - Tree Detection Feature

## 3 Langkah Cepat untuk M6 Tugas

### Langkah 1️⃣: Persiapan Gambar

- Ambil screenshot gambar satelit dari Google Maps (area dengan pohon/vegetasi)
- Atau gunakan foto natural outdoor dengan area hijau
- Simpan dengan format JPG atau PNG

### Langkah 2️⃣: Upload & Buka Tree Detection

1. Buka aplikasi di browser
2. Klik "📤 Upload Gambar" → pilih file
3. Tunggu preview muncul
4. Klik tab "🌳 Tree Detection" di sidebar

### Langkah 3️⃣: Deteksi & Catat Hasil

1. **Default setting sudah optimal untuk foto satelit dengan hijau tua** ✅

   - Hue Min: 40°
   - Hue Max: 100°
   - Saturation Min: **15%** (baru! untuk tangkap hijau tua)
   - Value Min: **15%** (baru! untuk tangkap area gelap)

2. Klik "🔍 Deteksi Pohon"

3. **Catat hasil** di section "Hasil Deteksi":
   - ✅ **Total Piksel**: [lihat angka]
   - ✅ **Piksel Pohon**: [lihat angka] ← JAWABAN TUGAS M6
   - ✅ **Persentase**: [lihat persen]

### Contoh Output

```
Total Piksel: 480,000
Piksel Pohon: 96,000
Persentase: 20%

→ JAWABAN: 96,000 piksel terdeteksi sebagai warna pohon
```

## Jika Hasil Tidak Bagus?

### ❌ Hijau Tua TIDAK Terdeteksi?

**PERTAMA coba ini:**

- Value Min: 15% → **10%** ← sangat penting untuk hijau gelap!
- Saturation Min: 15% → **10%**

### ❌ Terlalu Banyak Deteksi?

Geser slider ini ke KANAN:

- Saturation Min: 15% → 35%
- Value Min: 15% → 45%

### ❌ Kurang Deteksi?

Geser slider ini ke KIRI:

- Saturation Min: 15% → **10%**
- Value Min: 15% → **10%** ⚠️ **UNTUK HIJAU GELAP**
- Hue Max: 100° → 110°

### ❌ Masih Kurang?

Gunakan setting alternatif untuk hijau ekstrem gelap:

- Hue Min: 35° (bukan 40°)
- Hue Max: 110° (bukan 100°)
- Saturation Min: 10% (bukan 15%)
- **Value Min: 5-10%** ← key untuk hijau super gelap

## Real-Time Adjustment

**Tidak perlu klik tombol setiap kali!**
Setiap kali Anda geser slider, hasil akan update otomatis. Cari setting yang paling akurat.

## Hasil untuk Laporan M6

Copy-paste ke laporan Anda:

```
HASIL DETEKSI POHON (Tree Detection):
- Gambar Input: [nama file]
- Ukuran: [width]x[height] pixel
- Total Piksel: [angka]
- Piksel Pohon (Terdeteksi): [angka] ← ANSWER
- Persentase Area Pohon: [persen]%
- Parameter HSV Yang Digunakan:
  * Hue: 40°-100°
  * Saturation Min: 15%
  * Value Min: 15%
```

## Common Issues

| Masalah                | Solusi                                            |
| ---------------------- | ------------------------------------------------- |
| Gambar tidak load      | Refresh browser, coba format JPG                  |
| Canvas kosong          | Pastikan gambar sudah ter-upload sebelum buka tab |
| Hijau gelap terlewat   | **Turunkan Value Min ke 10%** ← solution          |
| Hanya deteksi sedikit  | Kurangi Saturation Min & Value Min                |
| Deteksi terlalu banyak | Naikkan Saturation Min & Value Min                |
| Ingin hitung manual?   | Binary mask (putih) di kanan = pohon terdeteksi   |

## Tips Sukses

✅ **Gunakan Google Maps Satellite** → hasil paling akurat
✅ **Default setting sudah optimal untuk hijau tua** ← UPDATED
✅ **Real-time adjustment** → geser slider lihat hasil langsung
✅ **Catat nilai pohon** → itu jawaban tugas M6 Anda
✅ **Screenshot hasil** → untuk laporan/dokumentasi

---

**Selesai!** 🎉 Nilai "Piksel Pohon" adalah jawaban Anda untuk Tugas M6.
