# 🎨 Pixel Reader - Image Processing Studio

**Status:** ✅ PRODUCTION READY | **Version:** 1.0 | **Last Updated:** November 19, 2025

Aplikasi web vanilla JavaScript untuk image processing dengan 11 fitur lengkap.

## 🚀 Quick Start

```bash
npm install
npm run dev
# Buka http://localhost:5173
```

## ✨ 11 Fitur Utama

| Fitur                 | Deskripsi                                        |
| --------------------- | ------------------------------------------------ |
| 📊 **Pixel Data**     | Tabel RGB 500x500 dengan hover info              |
| 🌑 **Grayscale**      | Konversi luminance (0.299R + 0.587G + 0.114B)    |
| ⚫⚪ **Binary**       | Threshold-based conversion (adjustable 0-255)    |
| 💡 **Brightness**     | Adjust luminance (-100 to +100)                  |
| ➕ **Arithmetic**     | Add/subtract/multiply (constant atau dua gambar) |
| 🔣 **Boolean**        | AND, OR, XOR bitwise operations                  |
| 🔄 **Geometry**       | Rotasi 90°/180°/270° & flip horizontal/vertical  |
| 📈 **Histogram**      | RGB, Grayscale, Equalization                     |
| 📊 **Statistics**     | Mean, Std, Skewness, Kurtosis, Entropy, Min/Max  |
| 🌳 **Tree Detection** | HSV color segmentation (deteksi pohon/vegetasi)  |
| 🔍 **Edge Detection** | Sobel/Prewitt dengan matriks konvolusi ✨        |

## 🔍 Edge Detection - Matriks Konvolusi

**Menampilkan DUALAMPILAN:**

### 1️⃣ Matriks Konvolusi 5x5 Pixel Pertama (Quick Preview)
- **Gx** (Horizontal Gradient) - gradient kiri-kanan
- **Gy** (Vertical Gradient) - gradient atas-bawah
- **Magnitude** - kekuatan edge: √(Gx² + Gy²)

### 2️⃣ Matriks Konvolusi Lengkap (Full Matrix)
- Tampilan **LENGKAP** (WxH) di bawah preview 5x5
- Gx, Gy, Magnitude untuk seluruh gambar
- Scrollable horizontal untuk gambar besar

### Format Output (Monospace):
```
🔹 5x5 PIXEL PERTAMA:
Gx (Horizontal Gradient):
[-8.0,  -5.0,  20.0,  25.0,   0.0]
[-9.0,  -5.0,  21.0,  25.0,   0.0]
[......]

🔹 MATRIKS LENGKAP (WxH):
Gx (Horizontal Gradient) - Full:
[rows × cols matrix dengan scroll...]
```

### Sobel Kernel:

```
Gx:              Gy:
[-1, 0, 1]       [-1, -2, -1]
[-2, 0, 2]       [ 0,  0,  0]
[-1, 0, 1]       [ 1,  2,  1]
```

## 🏗️ Arsitektur

### 3 Main Classes:

1. **TabManager** - SPA tab navigation & switching
2. **ImageProcessor** - Pure image operations (grayscale, binary, edge detection, dll)
3. **PixelReader** - Main controller, UI management, event handling

### Data Flow:

```
Upload Image → Canvas → getImageData() → ImageProcessor → putImageData() → Display
```

## 💻 Technology Stack

- **Framework**: Vanilla JavaScript (ES6+)
- **Canvas API**: HTML5 Canvas 2D (`willReadFrequently: true`)
- **Build Tool**: Vite 5.4.11+
- **Node**: 22.12+ recommended
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## 📋 Instruksi Penggunaan

### 1. Upload Gambar

```
Click "📤 Upload Gambar" → select file
```

### 2. Apply Edge Detection

```
1. Click tab "🔍 Edge Detection"
2. Pilih kernel: Sobel atau Prewitt
3. Click "✨ Apply Edge Detection"
4. Lihat matriks konvolusi 5x5 pixel pertama
```

### 3. Interpretasi Hasil

- **Gx**: Negatif = gradien dari kiri, Positif = gradien dari kanan
- **Gy**: Negatif = gradien dari atas, Positif = gradien dari bawah
- **Magnitude**: Nilai edge keseluruhan (0-255)

## 🔧 Development

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Build production (output: dist/)
npm run preview   # Preview production build
```

## 📁 File Structure

```
src/
├── main.js          (3500+ lines - TabManager, ImageProcessor, PixelReader)
└── style.css        (Dark theme styling)
index.html           (Entry point)
package.json         (Dependencies)
```

## 🌙 UI Theme

- **Dark Mode**: Slate/Blue gradient
- **Primary**: #3b82f6 (Blue)
- **Background**: #0f172a (Very dark)
- **Text**: #e2e8f0 (Light gray)
- **Responsive**: Mobile-friendly

## 🎓 Key Algorithms

### Pixel Reading:

```javascript
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4; // RGBA
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const a = data[idx + 3];
  }
}
```

### Convolution (Edge Detection):

```javascript
sum = 0;
for (ky = -1; ky <= 1; ky++) {
  for (kx = -1; kx <= 1; kx++) {
    sum += kernel[ky + 1][kx + 1] * image[y + ky][x + kx];
  }
}
result = sum;
```

### Magnitude:

```javascript
magnitude = √(Gx² + Gy²)
```

## 🌳 Tree Detection (HSV Color Segmentation)

**Parameters:**

- Hue: 40°-100° (green range)
- Saturation: ≥15% (color intensity)
- Value: ≥15% (brightness)

**Output:** Jumlah pixel terdeteksi (untuk M6 assignment)

## 📊 Statistics Features

### Single Image (7 metrics × 4 channels):

- Mean, Standard Deviation
- Skewness, Kurtosis
- Entropy
- Min, Max

### Two-Image Comparison (5 metrics):

- Pearson Correlation
- Chi-Square Distance
- Euclidean Distance
- Manhattan Distance
- SSIM (Structural Similarity)

## 🐛 Troubleshooting

| Masalah                   | Solusi                                    |
| ------------------------- | ----------------------------------------- |
| Matrix tidak muncul       | Upload gambar dan buka tab Edge Detection |
| Nilai nilai terlihat aneh | Normalisasi dengan `/4` sudah benar       |
| Browser canvas blur       | Gunakan canvas native resolution          |
| Performance lambat        | Gunakan gambar < 1000x1000                |
| Build error               | Update Node.js ke 22.12+                  |

## 📦 Dependencies

**Runtime**: NONE (fully standalone)

**Development**:

- vite 5.4.11
- @vitejs/plugin-basic-ssl (optional)

## 🚢 Production Deployment

```bash
npm run build
# Deploy dist/ folder to:
# - GitHub Pages
# - Vercel
# - Netlify
# - Any static hosting
```

## 🔐 Browser Support

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+

**Requirements:**

- HTML5 Canvas API
- ES6+ JavaScript
- CSS3 Grid/Flexbox
- FileReader API

## 📚 Code Examples

### Apply Grayscale:

```javascript
const result = this.processor.applyGrayscale();
ctx.putImageData(result, 0, 0);
```

### Apply Edge Detection:

```javascript
const result = this.processor.sobelEdgeDetection();
this.displayConvolutionMatrices(result, "sobel");
```

### Get Statistics:

```javascript
const stats = this.processor.getImageStatistics();
console.log(stats); // Mean, Std, Min, Max, etc
```

## 🌟 Key Features

✨ **Pure Vanilla JS** - No frameworks, 100% custom  
✨ **Real-time Processing** - Instant manipulation  
✨ **Dark Theme** - Professional appearance  
✨ **Educational** - Clear, well-structured code  
✨ **11+ Operations** - Comprehensive image processing

---

**Ready to process images?**

```bash
npm run dev # Let's go! 🎨
```

**Project for:** 4IA01 Praktikum PC  
**Maintained by:** GitHub Copilot
