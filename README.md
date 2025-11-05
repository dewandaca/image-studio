# **🎨 Image Studio \- Dokumentasi Lengkap**

**Status:** ✅ PRODUCTION READY | **Version:** 1.0.0 | **Build:** ✅ PASSING (0 errors) | **Last Updated:** November 5, 2025

## **🎯 Ringkasan Aplikasi**

Pixel Reader adalah aplikasi web **image processing** yang dibangun dengan **vanilla JavaScript** dan **HTML5 Canvas API** untuk manipulasi pixel. Aplikasi ini menggunakan **Vite** sebagai *build tool* dan diimplementasikan dengan arsitektur **Single Page Application (SPA)** menggunakan navigasi tab.

### **Keunggulan Utama:**

* ✅ **Tanpa dependencies eksternal** (Pure Vanilla JavaScript).  
* ✅ **Client-side processing** (Aman, Privat, dan *Offline capable*).  
* ✅ **User-friendly interface** dan **Responsive design**.  
* ✅ **7 Fitur utama** untuk analisis dan transformasi citra.

## **📝 Daftar Isi**

1. [🚀 Quick Start](https://www.google.com/search?q=%23-quick-start)  
2. [✅ 7 Fitur Utama](https://www.google.com/search?q=%23-7-fitur-utama)  
3. [📋 Dokumentasi Fitur Lengkap](https://www.google.com/search?q=%23-dokumentasi-fitur-lengkap)  
   * [1\. Pixel Data](https://www.google.com/search?q=%231%EF%B8%8F%E2%83%A3-fitur-pixel-data-analisis-pixel)  
   * [2\. Binary & Grayscale](https://www.google.com/search?q=%232%EF%B8%8F%E2%83%A3-fitur-binary--grayscale-konversi-format)  
   * [3\. Brightness](https://www.google.com/search?q=%233%EF%B8%8F%E2%83%A3-fitur-brightness-penyesuaian-kecerahan)  
   * [4\. Arithmetic](https://www.google.com/search?q=%234%EF%B8%8F%E2%83%A3-fitur-arithmetic-operasi-matematika)  
   * [5\. Boolean](https://www.google.com/search?q=%235%EF%B8%8F%E2%83%A3-fitur-boolean-operasi-bitwise)  
   * [6\. Geometry](https://www.google.com/search?q=%236%EF%B8%8F%E2%83%A3-fitur-geometry-transformasi-geometri)  
   * [7\. Statistics](https://www.google.com/search?q=%237%EF%B8%8F%E2%83%A3-fitur-statistics-analisis-statistik)  
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

## **✅ 7 Fitur Utama**

| No | Fitur | Deskripsi |
| :---- | :---- | :---- |
| 1 | **Pixel Data** | Analisis pixel individual dalam format tabel interaktif |
| 2 | **Binary & Grayscale** | Konversi citra ke binary atau grayscale dengan *threshold* adjustable |
| 3 | **Brightness** | Sesuaikan kecerahan gambar (-100 hingga \+100) |
| 4 | **Arithmetic** | Operasi matematika pixel-wise (add, subtract, multiply) |
| 5 | **Boolean** | Operasi bitwise (AND, OR, XOR) antar dua citra |
| 6 | **Geometry** | Transformasi geometri (rotasi, flip) |
| 7 | **Statistics** | Analisis statistik mendalam (7 metrik per channel & 5 metrik perbandingan) |

## **📋 Dokumentasi Fitur Lengkap**

### **1️⃣ Fitur: Pixel Data (Analisis Pixel)**

**Deskripsi:** Menampilkan data pixel gambar dalam format tabel interaktif dengan *hover information*.

**Fungsi:**

* Tabel pixel 500×500 pertama.  
* Hover pixel untuk melihat koordinat (x, y) dan nilai RGB.  
* Warna teks otomatis berdasarkan **Luminance** background untuk keterbacaan.

Formula Luminance & Warna Teks:

$$brightness \= 0.299 \\times R \+ 0.587 \\times G \+ 0.114 \\times B$$

* Jika $brightness \> 180 \\to$ teks **hitam**.  
* Jika $brightness \\le 180 \\to$ teks **putih**.

### **2️⃣ Fitur: Binary & Grayscale (Konversi Format)**

**Deskripsi:** Mengkonversi citra berwarna menjadi grayscale atau binary dengan kontrol *threshold*.

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

| Operasi | Simbol | Formula | Interpretasi |
| :---- | :---- | :---- | :---- |
| **AND** | & | $result\[i\] \= image1\[i\] \\text{ AND } image2\[i\]$ | Hasil lebih **gelap**. Hanya pixel 1 di kedua image tetap 1\. |
| **OR** | | | $result\[i\] \= image1\[i\] \\text{ OR } image2\[i\]$ | Hasil lebih **terang**. Pixel 1 di salah satu image tetap 1\. |
| **XOR** | ^ | $result\[i\] \= image1\[i\] \\text{ XOR } image2\[i\]$ | Hanya pixel yang **berbeda** akan bernilai 1\. Berguna untuk deteksi perbedaan. |

### **6️⃣ Fitur: Geometry (Transformasi Geometri)**

**Deskripsi:** Melakukan transformasi geometri pada gambar (rotasi dan flip).

#### **Rotasi**

| Transformasi | Dimensi | Mapping Pixel (x,y) |
| :---- | :---- | :---- |
| **90° Clockwise** | $(W, H) \\to (H, W)$ | $(H-1-y, x)$ |
| **180°** | $(W, H) \\to (W, H)$ | $(W-1-x, H-1-y)$ |
| **270° Clockwise** | $(W, H) \\to (H, W)$ | $(y, W-1-x)$ |

#### **Flip (Pencerminan)**

| Transformasi | Mapping Pixel | Interpretasi |
| :---- | :---- | :---- |
| **Horizontal** | $destX \= width \- 1 \- x$ | Mirror Left-Right |
| **Vertical** | $destY \= height \- 1 \- y$ | Mirror Top-Bottom |

### **7️⃣ Fitur: Statistics (Analisis Statistik)**

**Deskripsi:** Menghitung metrik statistik mendalam dari gambar, baik *single image* maupun perbandingan dua gambar.

#### **A. Statistik Gambar Tunggal (7 Metrik × 4 Channel)**

Setiap metrik dihitung untuk: 🔴 **Red**, 🟢 **Green**, 🔵 **Blue**, ⚪ **Grayscale**.

| Metrik | Formula | Range | Interpretasi |
| :---- | :---- | :---- | :---- |
| **Mean** | $\\mu \= \\frac{1}{n}\\sum x\_i$ | 0-255 | Tingkat terang rata-rata |
| **Std Dev** | $\\sigma \= \\sqrt{\\frac{1}{n}\\sum(x\_i-\\mu)^2}$ | 0-128 | Variasi warna (tinggi=beragam) |
| **Skewness** | $\\frac{\\sum(x\_i-\\mu)^3}{n\\sigma^3}$ | $-\\infty \\text{ to } \+\\infty$ | Asimetri distribusi (+ terang, \- gelap) |
| **Kurtosis** | $\\frac{\\sum(x\_i-\\mu)^4}{n\\sigma^4} \- 3$ | $-\\infty \\text{ to } \+\\infty$ | Keruncingan puncak (+tajam, \-landai) |
| **Entropy** | $-\\sum p(i)\\log\_2 p(i)$ | 0-8 | Kompleksitas (tinggi=detail banyak) |
| **Min** | Minimum value | 0-255 | Nilai intensitas terendah |
| **Max** | Maximum value | 0-255 | Nilai intensitas tertinggi |

#### **B. Metrik Perbandingan Dua Gambar (5 Metrik)**

| Metrik | Formula | Range | Mirip Jika |
| :---- | :---- | :---- | :---- |
| **Pearson Correlation** | $r \= \\frac{\\sum(x\_i-\\bar{x})(y\_i-\\bar{y})}{\\sqrt{\\sum(x\_i-\\bar{x})^2 \\sum(y\_i-\\bar{y})^2}}$ | \-1 to 1 | $\> 0.9$ |
| **Chi-Square** | $\\chi^2 \= \\frac{1}{2}\\sum\\frac{(h\_1(i)-h\_2(i))^2}{h\_1(i)+h\_2(i)}$ | 0-∞ | $\< 100$ |
| **Euclidean** | $d\_E \= \\sqrt{\\sum(x\_i-y\_i)^2}$ | 0-∞ | $\< 1000$ |
| **Manhattan** | $d\_M \= \\sum\\|x\_i-y\_i$ | 0-∞ | $\< 5000$ |
| **SSIM** | Structural Similarity Index | \-1 to 1 | $\> 0.9$ |

#### **Auto-Interpretation Status**

| Status | Pearson | SSIM | Arti |
| :---- | :---- | :---- | :---- |
| ✅ **Sangat Mirip** | $\> 0.9$ | $\> 0.9$ | Gambar hampir identik |
| 🟡 **Mirip** | 0.7-0.9 | 0.7-0.9 | Kesamaan signifikan |
| 🟠 **Agak Mirip** | 0.5-0.7 | 0.5-0.7 | Kesamaan moderat |
| 🔴 **Tidak Mirip** | $\< 0.5$ | $\< 0.5$ | Gambar berbeda |

## **🏗️ Arsitektur Teknis**

### **Core Components**

1. **TabManager**: Mengelola SPA navigation dan perpindahan tab.  
2. **ImageProcessor**: *Pure image processing functions* (tidak tergantung DOM), berisi 13+ metode statistik dan transformasi.  
3. **PixelReader**: *Main application controller*, menghubungkan UI dengan ImageProcessor.

### **Canvas Context Configuration**

Menggunakan *flag* willReadFrequently: true pada getContext("2d") untuk mengoptimalkan performa saat membaca pixel berulang kali.

### **Multiple Canvas Strategy**

Setiap fitur operasi memiliki **dedicated canvas** (processCanvas1-5, statsCanvas1-2) untuk memungkinkan *user* berpindah tab tanpa kehilangan hasil operasi sebelumnya.

### **Data Flow**

1\. User upload image → FileReader API → Image object  
2\. Image drawn ke canvas → ctx.drawImage()  
3\. Canvas pixels extracted → ctx.getImageData() → ImageData (RGBA array flat)  
4\. ImageProcessor operations → new ImageData → ctx.putImageData()  
5\. Result di-display di canvas

## **📊 Performance & Browser Support**

### **Kompleksitas Algoritma**

| Operasi | Time | Space |
| :---- | :---- | :---- |
| Mean/Std/Skewness/Kurtosis | $O(n)$ | $O(1)$ |
| Entropy Calculation | $O(256)$ | $O(256)$ |
| Pearson Correlation | $O(n)$ | $O(1)$ |
| Geometric Transform | $O(n)$ | $O(1)$ |
| SSIM Calculation | $O(n/windowSize)$ | $O(windowSize)$ |

### **Browser Compatibility**

* ✅ Chrome 90+  
* ✅ Firefox 88+  
* ✅ Safari 14+  
* ✅ Edge 90+

## **🎓 Use Cases**

1. **Image Simplification untuk OCR**: Konversi ke **Binary** dengan *threshold* yang disesuaikan (biasanya 80-150).  
2. **Deteksi Perubahan Gambar**: Gunakan fitur **Statistics** dan cek **Pearson Correlation** ($\> 0.95$ \= likely sama).  
3. **Brightness Normalization**: Gunakan fitur **Brightness** untuk menyeimbangkan gambar.  
4. **Image Alignment Check**: Verifikasi ukuran gambar sebelum operasi **Arithmetic** atau **Boolean**.

## **🐛 Troubleshooting**

| Problem | Solusi |
| :---- | :---- |
| Gambar tidak muncul di preview | Refresh page, pastikan format supported (JPG, PNG) |
| Button operasi disabled | Upload gambar terlebih dahulu di tab utama |
| "Ukuran gambar berbeda" alert | Untuk Arithmetic/Boolean, kedua gambar **harus sama** ukurannya |
| Kalkulasi statistik lambat | Gambar terlalu besar? Coba gambar lebih kecil |
| Build error Node.js version | Gunakan Node.js 22.12+ (untuk Vite 7.x) |

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

* 7 fitur utama yang comprehensive  
* Pure vanilla JavaScript (zero dependencies)  
* Responsive design  
* Offline capable  
* Secure (client-side only)

Status: ✅ PRODUCTION READY  
Quality: ⭐⭐⭐⭐⭐  
Last Updated: November 5, 2025  
**Happy Image Processing\! 🎨**