# **🎨 Image Studio \- Dokumentasi Lengkap**

**Status:** ✅ PRODUCTION READY | **Version:** 1.0.0 | **Build:** ✅ PASSING (0 errors) | **Last Updated:** November 5, 2025

## **🎯 Ringkasan Aplikasi**

Pixel Reader adalah aplikasi web **image processing** yang dibangun dengan **vanilla JavaScript** dan **HTML5 Canvas API** untuk manipulasi pixel. Aplikasi ini menggunakan **Vite** sebagai _build tool_ dan diimplementasikan dengan arsitektur **Single Page Application (SPA)** menggunakan navigasi tab.

### **Keunggulan Utama:**

- ✅ **Tanpa dependencies eksternal** (Pure Vanilla JavaScript).
- ✅ **Client-side processing** (Aman, Privat, dan _Offline capable_).
- ✅ **User-friendly interface** dan **Responsive design**.
- ✅ **7 Fitur utama** untuk analisis dan transformasi citra.

## **📝 Daftar Isi**

1. [🚀 Quick Start](https://www.google.com/search?q=%23-quick-start)
2. [✅ 7 Fitur Utama](https://www.google.com/search?q=%23-7-fitur-utama)
3. [📋 Dokumentasi Fitur Lengkap](https://www.google.com/search?q=%23-dokumentasi-fitur-lengkap)
   - [1\. Pixel Data](https://www.google.com/search?q=%231%EF%B8%8F%E2%83%A3-fitur-pixel-data-analisis-pixel)
   - [2\. Binary & Grayscale](https://www.google.com/search?q=%232%EF%B8%8F%E2%83%A3-fitur-binary--grayscale-konversi-format)
   - [3\. Brightness](https://www.google.com/search?q=%233%EF%B8%8F%E2%83%A3-fitur-brightness-penyesuaian-kecerahan)
   - [4\. Arithmetic](https://www.google.com/search?q=%234%EF%B8%8F%E2%83%A3-fitur-arithmetic-operasi-matematika)
   - [5\. Boolean](https://www.google.com/search?q=%235%EF%B8%8F%E2%83%A3-fitur-boolean-operasi-bitwise)
   - [6\. Geometry](https://www.google.com/search?q=%236%EF%B8%8F%E2%83%A3-fitur-geometry-transformasi-geometri)
   - [7\. Statistics](https://www.google.com/search?q=%237%EF%B8%8F%E2%83%A3-fitur-statistics-analisis-statistik)
4. [🏗️ Arsitektur Teknis](https://www.google.com/search?q=%23-arsitektur-teknis)
5. [📊 Performance & Browser Support](https://www.google.com/search?q=%23-performance--browser-support)
6. [🎓 Use Cases](https://www.google.com/search?q=%23-use-cases)
7. [🐛 Troubleshooting](https://www.google.com/search?q=%23-troubleshooting)
8. [📚 Referensi & Resources](https://www.google.com/search?q=%23-referensi--resources)
9. [🎉 Kesimpulan](https://www.google.com/search?q=%23-kesimpulan)

## **🚀 Quick Start**

### **Installation & Development**

\# Install dependencies  
npm install

\# Run development server  
npm run dev  
\# Buka http://localhost:5173/

### **Production Build**

\# Build untuk production  
npm run build

\# Preview production build  
npm run preview

## **✅ 8 Fitur Utama**

| No  | Fitur                  | Deskripsi                                                                  |
| :-- | :--------------------- | :------------------------------------------------------------------------- |
| 1   | **Pixel Data**         | Analisis pixel individual dalam format tabel interaktif                    |
| 2   | **Binary & Grayscale** | Konversi citra ke binary atau grayscale dengan _threshold_ adjustable      |
| 3   | **Brightness**         | Sesuaikan kecerahan gambar (-100 hingga \+100)                             |
| 4   | **Arithmetic**         | Operasi matematika pixel-wise (add, subtract, multiply)                    |
| 5   | **Boolean**            | Operasi bitwise (AND, OR, XOR) antar dua citra                             |
| 6   | **Geometry**           | Transformasi geometri (rotasi, flip)                                       |
| 7   | **Statistics**         | Analisis statistik mendalam (7 metrik per channel & 5 metrik perbandingan) |
| 8   | **🌳 Tree Detection**  | Deteksi warna pohon/vegetasi menggunakan HSV segmentasi (M6 Assignment)    |

## **📋 Dokumentasi Fitur Lengkap**

## **📋 Dokumentasi Fitur Lengkap**

### **1️⃣ Fitur: Pixel Data (Analisis Pixel)**

**Deskripsi:** Menampilkan data pixel gambar dalam format tabel interaktif dengan _hover information_.

**Fungsi:**

- Tabel pixel 500×500 pertama.
- Hover pixel untuk melihat koordinat (x, y) dan nilai RGB.
- Warna teks otomatis berdasarkan **Luminance** background untuk keterbacaan.

Formula Luminance & Warna Teks:

$$brightness \= 0.299 \\times R \+ 0.587 \\times G \+ 0.114 \\times B$$

- Jika $brightness \> 180 \\to$ teks **hitam**.
- Jika $brightness \\le 180 \\to$ teks **putih**.

### **2️⃣ Fitur: Binary & Grayscale (Konversi Format)**

**Deskripsi:** Mengkonversi citra berwarna menjadi grayscale atau binary dengan kontrol _threshold_.

#### **A. Grayscale Conversion**

$$gray \= 0.299 \\times R \+ 0.587 \\times G \+ 0.114 \\times B$$

#### **B. Binary Conversion**

$$\\text{binary} \= \\begin{cases} 255 & \\text{jika } gray \\geq threshold \\\\ 0 & \\text{jika } gray \< threshold \\end{cases}$$

Fitur: Adjustable threshold slider (0-255, default 128\) dengan real-time preview.

### **3️⃣ Fitur: Brightness (Penyesuaian Kecerahan)**

**Deskripsi:** Menambah atau mengurangi kecerahan semua pixel gambar.

Formula:

$$RGB\_{new} \= \\text{clamp}(RGB\_{old} \+ \\text{brightness\\\_value})$$

Range: \-100 (gelap) hingga \+100 (terang).

### **4️⃣ Fitur: Arithmetic (Operasi Matematika)**

**Deskripsi:** Melakukan operasi matematika pixel-wise pada gambar.

#### **Mode 1: Constant Arithmetic**

Operasi dengan nilai konstanta ($c$):

$$RGB\_{result} \= \\text{clamp}(RGB\_{source} \\oplus c)$$

$\\oplus$ dapat berupa: \+ (add), \- (subtract), atau × (multiply).

#### **Mode 2: Two-Image Arithmetic**

Operasi antara dua gambar (harus ukuran sama):

$$RGB\_{result} \= \\text{clamp}(RGB\_{image1} \\oplus RGB\_{image2})$$

Fitur Multiply Normalization: Untuk mencegah overflow pada operasi perkalian:

$$result \= \\text{clamp}\\left(\\frac{image1\[i\] \\times image2\[i\]}{255}\\right)$$

### **5️⃣ Fitur: Boolean (Operasi Bitwise)**

**Deskripsi:** Melakukan operasi bitwise antara dua citra (harus ukuran sama).

| Operasi | Simbol | Formula                                                | Interpretasi                                                                    |
| :------ | :----- | :----------------------------------------------------- | :------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| **AND** | &      | $result\[i\] \= image1\[i\] \\text{ AND } image2\[i\]$ | Hasil lebih **gelap**. Hanya pixel 1 di kedua image tetap 1\.                   |
| **OR**  |        |                                                        | $result\[i\] \= image1\[i\] \\text{ OR } image2\[i\]$                           | Hasil lebih **terang**. Pixel 1 di salah satu image tetap 1\. |
| **XOR** | ^      | $result\[i\] \= image1\[i\] \\text{ XOR } image2\[i\]$ | Hanya pixel yang **berbeda** akan bernilai 1\. Berguna untuk deteksi perbedaan. |

### **6️⃣ Fitur: Geometry (Transformasi Geometri)**

**Deskripsi:** Melakukan transformasi geometri pada gambar (rotasi dan flip).

#### **Rotasi**

| Transformasi       | Dimensi              | Mapping Pixel (x,y) |
| :----------------- | :------------------- | :------------------ |
| **90° Clockwise**  | $(W, H) \\to (H, W)$ | $(H-1-y, x)$        |
| **180°**           | $(W, H) \\to (W, H)$ | $(W-1-x, H-1-y)$    |
| **270° Clockwise** | $(W, H) \\to (H, W)$ | $(y, W-1-x)$        |

#### **Flip (Pencerminan)**

| Transformasi   | Mapping Pixel               | Interpretasi      |
| :------------- | :-------------------------- | :---------------- |
| **Horizontal** | $destX \= width \- 1 \- x$  | Mirror Left-Right |
| **Vertical**   | $destY \= height \- 1 \- y$ | Mirror Top-Bottom |

### **7️⃣ Fitur: Statistics (Analisis Statistik)**

**Deskripsi:** Menghitung metrik statistik mendalam dari gambar, baik _single image_ maupun perbandingan dua gambar.

#### **A. Statistik Gambar Tunggal (7 Metrik × 4 Channel)**

Setiap metrik dihitung untuk: 🔴 **Red**, 🟢 **Green**, 🔵 **Blue**, ⚪ **Grayscale**.

| Metrik       | Formula                                             | Range                             | Interpretasi                             |
| :----------- | :-------------------------------------------------- | :-------------------------------- | :--------------------------------------- |
| **Mean**     | $\\mu \= \\frac{1}{n}\\sum x\_i$                    | 0-255                             | Tingkat terang rata-rata                 |
| **Std Dev**  | $\\sigma \= \\sqrt{\\frac{1}{n}\\sum(x\_i-\\mu)^2}$ | 0-128                             | Variasi warna (tinggi=beragam)           |
| **Skewness** | $\\frac{\\sum(x\_i-\\mu)^3}{n\\sigma^3}$            | $-\\infty \\text{ to } \+\\infty$ | Asimetri distribusi (+ terang, \- gelap) |
| **Kurtosis** | $\\frac{\\sum(x\_i-\\mu)^4}{n\\sigma^4} \- 3$       | $-\\infty \\text{ to } \+\\infty$ | Keruncingan puncak (+tajam, \-landai)    |
| **Entropy**  | $-\\sum p(i)\\log\_2 p(i)$                          | 0-8                               | Kompleksitas (tinggi=detail banyak)      |
| **Min**      | Minimum value                                       | 0-255                             | Nilai intensitas terendah                |
| **Max**      | Maximum value                                       | 0-255                             | Nilai intensitas tertinggi               |

#### **B. Metrik Perbandingan Dua Gambar (5 Metrik)**

| Metrik                  | Formula                                                                                                   | Range    | Mirip Jika |
| :---------------------- | :-------------------------------------------------------------------------------------------------------- | :------- | :--------- | --------- |
| **Pearson Correlation** | $r \= \\frac{\\sum(x\_i-\\bar{x})(y\_i-\\bar{y})}{\\sqrt{\\sum(x\_i-\\bar{x})^2 \\sum(y\_i-\\bar{y})^2}}$ | \-1 to 1 | $\> 0.9$   |
| **Chi-Square**          | $\\chi^2 \= \\frac{1}{2}\\sum\\frac{(h\_1(i)-h\_2(i))^2}{h\_1(i)+h\_2(i)}$                                | 0-∞      | $\< 100$   |
| **Euclidean**           | $d\_E \= \\sqrt{\\sum(x\_i-y\_i)^2}$                                                                      | 0-∞      | $\< 1000$  |
| **Manhattan**           | $d_M \= \\sum\\                                                                                           | x_i-y_i$ | 0-∞        | $\< 5000$ |
| **SSIM**                | Structural Similarity Index                                                                               | \-1 to 1 | $\> 0.9$   |

#### **Auto-Interpretation Status**

Interpretasi multi-metrik untuk akurasi lebih baik:

| Status                         | Kondisi                          | Arti                                                |
| :----------------------------- | :------------------------------- | :-------------------------------------------------- |
| ✅ **Sangat Mirip (Identik)**  | SSIM > 0.9 AND Pearson > 0.9     | Gambar hampir identik dalam struktur dan skala      |
| ✅ **Sangat Mirip (Sama)**     | SSIM > 0.9 AND Pearson > 0.5     | Struktur sama, skala mirip                          |
| 🟡 **Mirip (Beda Brightness)** | SSIM > 0.9 AND 0 ≤ Pearson < 0.5 | Struktur sama tapi beda brightness/kontras          |
| 🟠 **Mirip tapi Terbalik**     | SSIM > 0.9 AND Pearson < 0       | Struktur sama tapi pixel values terbalik (inverted) |
| 🟡 **Mirip**                   | SSIM 0.7-0.9 AND Pearson 0.7-0.9 | Kesamaan signifikan                                 |
| 🟠 **Agak Mirip**              | SSIM > 0.5 OR Pearson > 0.5      | Kesamaan moderat                                    |
| 🔴 **Terbalik**                | Pearson < -0.5                   | Gambar terbalik (negative correlation)              |
| 🔴 **Sangat Berbeda**          | SSIM < 0.5 AND Pearson < 0.5     | Gambar berbeda                                      |

**🔍 Penjelasan Perbedaan Metrik:**

- **SSIM (Structural Similarity)**: Mengukur kemiripan **struktur visual** (spatial similarity) - berguna mendeteksi gambar yang terlihat sama meskipun brightness berbeda
- **Pearson Correlation**: Mengukur **hubungan linear** antara pixel values - sensitif terhadap skala dan offset brightness

**Contoh Kasus:**

- Gambar A: Foto asli
- Gambar B: Foto yang sama tapi lebih gelap/terang (brightness shift)
- Hasil: SSIM **tinggi** (mirip struktur ✅), Pearson **rendah/negatif** (skala berbeda)
- Interpretasi: "🟡 **Mirip (Beda Brightness)**" ← **CORRECT!** (bukan "berbeda")

### **8️⃣ Fitur: 🌳 Tree Detection (Deteksi Pohon/Vegetasi)**

**Deskripsi:** Mendeteksi warna pohon/vegetasi dalam citra menggunakan **HSV Color Segmentation** dan menghitung jumlah piksel yang terdeteksi. Fitur ini dirancang khusus untuk **Tugas M6 Pengolahan Citra Digital**.

#### **A. Konsep HSV**

HSV (Hue, Saturation, Value) adalah model warna yang memisahkan informasi warna dari kecerahan:

- **Hue (Warna)**: 0°-360° pada color wheel, menunjukkan warna asli
- **Saturation (Kejenuhan)**: 0%-100%, mengukur intensitas warna (0% = abu-abu, 100% = warna murni)
- **Value (Kecerahan)**: 0%-100%, mengukur tingkat pencahayaan (0% = hitam, 100% = terang)

**Mengapa HSV untuk Deteksi Pohon?**

1. **Pemisahan Warna dari Kecerahan**: Perubahan lighting tidak mempengaruhi rentang Hue
2. **Intuitif**: Mudah mendefinisikan rentang warna hijau dibanding RGB kompleks
3. **Tahan terhadap variasi lighting**: Ideal untuk foto satelit Google Maps

#### **B. Algoritma Deteksi**

```
Input: Gambar RGB original
Loop setiap pixel:
  1. Convert RGB(r, g, b) → HSV(h, s, v)
  2. Check: if (h dalam [hueMin, hueMax])
              AND (s ≥ saturationMin)
              AND (v ≥ valueMin)
              then pixelDetected++
  3. Create mask (white = detected, black = not detected)
Output:
  - Total piksel terdeteksi
  - Persentase deteksi
  - Visual highlight & binary mask
```

#### **C. Parameter Segmentasi**

| Parameter      | Default | Range  | Deskripsi                                   |
| :------------- | :------ | :----- | :------------------------------------------ |
| **Hue Min**    | 40°     | 0-360° | Batas bawah warna hijau pada color wheel    |
| **Hue Max**    | 100°    | 0-360° | Batas atas warna hijau pada color wheel     |
| **Saturation** | 15%     | 0-100% | Minimum kejenuhan (tangkap hijau tua/kusam) |
| **Value Min**  | 15%     | 0-100% | Minimum kecerahan (tangkap area gelap)      |

#### **D. Rekomendasi Parameter per Jenis Gambar**

| Gambar Type       | Hue Min | Hue Max | Sat Min | Val Min | Catatan                                        |
| :---------------- | :------ | :------ | :------ | :------ | :--------------------------------------------- |
| **Satelit**       | 40°     | 100°    | 15%     | 15%     | ← **DEFAULT BARU** (optimal untuk Google Maps) |
| **Natural Foto**  | 35°     | 110°    | 15%     | 40%     | Variasi hijau terang-gelap, lighting alami     |
| **Hijau Tua**     | 40°     | 100°    | 10%     | 10%     | Untuk area dengan shadows & hijau gelap        |
| **Indoor Plant**  | 40°     | 100°    | 10%     | 20%     | Hijau kusam, pencahayaan terbatas              |
| **Dark Forest**   | 35°     | 95°     | 15%     | 15%     | Area gelap, jenuh, untuk hutan tebal           |
| **Padang Rumput** | 45°     | 105°    | 15%     | 50%     | Hijau terang, area terbuka dengan cahaya       |

#### **E. Output & Interpretasi**

Hasil deteksi ditampilkan dalam tiga format:

1. **Statistik Numerik**

   - Total Piksel: Jumlah total pixel dalam gambar
   - Piksel Pohon: **Jawaban Tugas M6** ✅ (jumlah pixel terdeteksi)
   - Persentase: (Piksel Pohon / Total Piksel) × 100%

2. **Progress Bar Visual**

   - Animasi gradient bar menunjukkan persentase deteksi

3. **Visualisasi Kanvas**

   - **Highlight Mode** (kiri): Area pohon di-brighten untuk visual jelas
   - **Binary Mask** (kanan): Putih = pohon, Hitam = bukan pohon

4. **Sampel Piksel Terdeteksi**
   - Koordinat (X, Y) dan nilai RGB/HSV dari 100 pixel pertama
   - Untuk verifikasi akurasi deteksi

#### **F. Tips Optimisasi**

**Jika Hijau TIDAK Terdeteksi (Under-Detection)**

Banyak area pohon terlewat, terutama hijau gelap:

- ⚠️ **PERTAMA**: Turunkan **Value Min** ke 10-15% (deteksi area gelap/hijau gelap)
- ↓ Turunkan **Saturation Min** ke 10-15% (deteksi hijau kusam)
- → Perlebar **Hue range** menjadi 30°-110° (termasuk kuning & biru)

**Jika Deteksi Terlalu Banyak (Over-Detection)**

Pixel non-pohon ikut terdeteksi:

- ↑ Naikkan **Saturation Min** ke 30-40% (filter ketat)
- ↑ Naikkan **Value Min** ke 40-50% (filter pencahayaan)
- ← Perkecil **Hue range** menjadi 50°-90° (fokus hijau murni)

**Real-Time Adjustment**

Tidak perlu klik tombol setiap kali! Setiap menggeser slider, hasil update otomatis untuk quick feedback.

#### **G. Contoh Use Case: Google Maps Satellite**

1. Ambil screenshot area hutan dari Google Maps
2. Upload ke Tree Detection
3. Default setting sudah optimal untuk hijau tua (Hue 40-100°, Sat 15%, Val 15%) ✅
4. Klik "🔍 Deteksi Pohon"
5. Baca hasil: **Piksel Pohon** = Jawaban Tugas M6
6. Screenshot hasil untuk laporan

---## **🏗️ Arsitektur Teknis**

### **Core Components**

1. **TabManager**: Mengelola SPA navigation dan perpindahan tab.
2. **ImageProcessor**: _Pure image processing functions_ (tidak tergantung DOM), berisi 13+ metode statistik dan transformasi.
3. **PixelReader**: _Main application controller_, menghubungkan UI dengan ImageProcessor.

### **Canvas Context Configuration**

Menggunakan _flag_ willReadFrequently: true pada getContext("2d") untuk mengoptimalkan performa saat membaca pixel berulang kali.

### **Multiple Canvas Strategy**

Setiap fitur operasi memiliki **dedicated canvas** (processCanvas1-5, statsCanvas1-2) untuk memungkinkan _user_ berpindah tab tanpa kehilangan hasil operasi sebelumnya.

### **Data Flow**

1\. User upload image → FileReader API → Image object  
2\. Image drawn ke canvas → ctx.drawImage()  
3\. Canvas pixels extracted → ctx.getImageData() → ImageData (RGBA array flat)  
4\. ImageProcessor operations → new ImageData → ctx.putImageData()  
5\. Result di-display di canvas

## **📊 Performance & Browser Support**

### **Kompleksitas Algoritma**

| Operasi                    | Time              | Space           |
| :------------------------- | :---------------- | :-------------- |
| Mean/Std/Skewness/Kurtosis | $O(n)$            | $O(1)$          |
| Entropy Calculation        | $O(256)$          | $O(256)$        |
| Pearson Correlation        | $O(n)$            | $O(1)$          |
| Geometric Transform        | $O(n)$            | $O(1)$          |
| SSIM Calculation           | $O(n/windowSize)$ | $O(windowSize)$ |

### **Browser Compatibility**

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## **🎓 Use Cases**

1. **Image Simplification untuk OCR**: Konversi ke **Binary** dengan _threshold_ yang disesuaikan (biasanya 80-150).
2. **Deteksi Perubahan Gambar**: Gunakan fitur **Statistics** dan cek **Pearson Correlation** ($\> 0.95$ \= likely sama).
3. **Brightness Normalization**: Gunakan fitur **Brightness** untuk menyeimbangkan gambar.
4. **Image Alignment Check**: Verifikasi ukuran gambar sebelum operasi **Arithmetic** atau **Boolean**.

## **🐛 Troubleshooting**

| Problem                        | Solusi                                                          |
| :----------------------------- | :-------------------------------------------------------------- |
| Gambar tidak muncul di preview | Refresh page, pastikan format supported (JPG, PNG)              |
| Button operasi disabled        | Upload gambar terlebih dahulu di tab utama                      |
| "Ukuran gambar berbeda" alert  | Untuk Arithmetic/Boolean, kedua gambar **harus sama** ukurannya |
| Kalkulasi statistik lambat     | Gambar terlalu besar? Coba gambar lebih kecil                   |
| Build error Node.js version    | Gunakan Node.js 22.12+ (untuk Vite 7.x)                         |

## **📚 Referensi & Resources**

### **Dokumentasi**

1. **Canvas API**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas\_API
2. **ImageData**: https://developer.mozilla.org/en-US/docs/Web/API/ImageData
3. **Vite**: https://vitejs.dev/

### **Matematika & Algoritma**

1. **Pearson Correlation**: https://en.wikipedia.org/wiki/Pearson\_correlation\_coefficient
2. **Chi-Square Test**: https://en.wikipedia.org/wiki/Chi-squared\_test
3. **SSIM**: https://en.wikipedia.org/wiki/Structural\_similarity
4. **Entropy**: https://en.wikipedia.org/wiki/Entropy\_(information\_theory)
5. **Skewness & Kurtosis**: https://en.wikipedia.org/wiki/Skewness

## **🎉 Kesimpulan**

Pixel Reader adalah aplikasi **production-ready** untuk image processing dengan:

- 7 fitur utama yang comprehensive
- Pure vanilla JavaScript (zero dependencies)
- Responsive design
- Offline capable
- Secure (client-side only)

Status: ✅ PRODUCTION READY  
Quality: ⭐⭐⭐⭐⭐  
Last Updated: November 5, 2025  
**Happy Image Processing\! 🎨**
