import "./style.css";

// Tab Manager untuk handle tab switching
class TabManager {
  constructor() {
    this.tabButtons = document.querySelectorAll(".tab-button");
    this.tabPanes = document.querySelectorAll(".tab-pane");
    this.init();
  }

  init() {
    this.tabButtons.forEach((button) => {
      button.addEventListener("click", () =>
        this.switchTab(button.dataset.tab)
      );
    });
  }

  switchTab(tabId) {
    // Remove active class dari semua buttons dan panes
    this.tabButtons.forEach((btn) => btn.classList.remove("active"));
    this.tabPanes.forEach((pane) => pane.classList.remove("active"));

    // Add active class ke selected tab
    const selectedButton = document.querySelector(`[data-tab="${tabId}"]`);
    const selectedPane = document.getElementById(tabId);

    if (selectedButton) selectedButton.classList.add("active");
    if (selectedPane) selectedPane.classList.add("active");
  }
}

// Image Processor untuk semua operasi image processing
class ImageProcessor {
  constructor(sourceCanvas) {
    this.sourceCanvas = sourceCanvas;
    this.sourceCtx = sourceCanvas.getContext("2d", {
      willReadFrequently: true,
    });
  }

  // Get image data dari source canvas
  getImageData() {
    return this.sourceCtx.getImageData(
      0,
      0,
      this.sourceCanvas.width,
      this.sourceCanvas.height
    );
  }

  // Draw image data ke target canvas
  drawToCanvas(imageData, targetCanvas) {
    targetCanvas.width = imageData.width;
    targetCanvas.height = imageData.height;
    const ctx = targetCanvas.getContext("2d");
    ctx.putImageData(imageData, 0, 0);
  }

  // Konversi ke Grayscale menggunakan luminance formula
  toGrayscale() {
    const imageData = this.getImageData();
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const gray = Math.round(
        0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      );
      data[i] = gray; // R
      data[i + 1] = gray; // G
      data[i + 2] = gray; // B
      // Alpha (i+3) tetap sama
    }

    return imageData;
  }

  // Konversi ke Binary dengan threshold
  toBinary(threshold = 128) {
    const imageData = this.getImageData();
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const gray = Math.round(
        0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      );
      const binary = gray >= threshold ? 255 : 0;
      data[i] = binary; // R
      data[i + 1] = binary; // G
      data[i + 2] = binary; // B
    }

    return imageData;
  }

  // Adjust brightness
  adjustBrightness(value) {
    const imageData = this.getImageData();
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = this.clamp(data[i] + value); // R
      data[i + 1] = this.clamp(data[i + 1] + value); // G
      data[i + 2] = this.clamp(data[i + 2] + value); // B
    }

    return imageData;
  }

  // Arithmetic operations dengan konstanta
  arithmeticConstant(operation, constant) {
    const imageData = this.getImageData();
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      switch (operation) {
        case "add":
          data[i] = this.clamp(data[i] + constant);
          data[i + 1] = this.clamp(data[i + 1] + constant);
          data[i + 2] = this.clamp(data[i + 2] + constant);
          break;
        case "subtract":
          data[i] = this.clamp(data[i] - constant);
          data[i + 1] = this.clamp(data[i + 1] - constant);
          data[i + 2] = this.clamp(data[i + 2] - constant);
          break;
        case "multiply":
          data[i] = this.clamp(data[i] * constant);
          data[i + 1] = this.clamp(data[i + 1] * constant);
          data[i + 2] = this.clamp(data[i + 2] * constant);
          break;
      }
    }

    return imageData;
  }

  // Arithmetic operations dengan image lain
  arithmeticImage(operation, otherImageData) {
    const imageData = this.getImageData();
    const data1 = imageData.data;
    const data2 = otherImageData.data;

    // Pastikan ukuran sama
    if (data1.length !== data2.length) {
      alert("Ukuran gambar harus sama!");
      return imageData;
    }

    for (let i = 0; i < data1.length; i += 4) {
      switch (operation) {
        case "add":
          data1[i] = this.clamp(data1[i] + data2[i]);
          data1[i + 1] = this.clamp(data1[i + 1] + data2[i + 1]);
          data1[i + 2] = this.clamp(data1[i + 2] + data2[i + 2]);
          break;
        case "subtract":
          data1[i] = this.clamp(data1[i] - data2[i]);
          data1[i + 1] = this.clamp(data1[i + 1] - data2[i + 1]);
          data1[i + 2] = this.clamp(data1[i + 2] - data2[i + 2]);
          break;
        case "multiply":
          data1[i] = this.clamp((data1[i] * data2[i]) / 255);
          data1[i + 1] = this.clamp((data1[i + 1] * data2[i + 1]) / 255);
          data1[i + 2] = this.clamp((data1[i + 2] * data2[i + 2]) / 255);
          break;
      }
    }

    return imageData;
  }

  // Boolean operations
  booleanOperation(operation, otherImageData) {
    const imageData = this.getImageData();
    const data1 = imageData.data;
    const data2 = otherImageData.data;

    // Pastikan ukuran sama
    if (data1.length !== data2.length) {
      alert("Ukuran gambar harus sama!");
      return imageData;
    }

    for (let i = 0; i < data1.length; i += 4) {
      switch (operation) {
        case "and":
          data1[i] = data1[i] & data2[i];
          data1[i + 1] = data1[i + 1] & data2[i + 1];
          data1[i + 2] = data1[i + 2] & data2[i + 2];
          break;
        case "or":
          data1[i] = data1[i] | data2[i];
          data1[i + 1] = data1[i + 1] | data2[i + 1];
          data1[i + 2] = data1[i + 2] | data2[i + 2];
          break;
        case "xor":
          data1[i] = data1[i] ^ data2[i];
          data1[i + 1] = data1[i + 1] ^ data2[i + 1];
          data1[i + 2] = data1[i + 2] ^ data2[i + 2];
          break;
      }
    }

    return imageData;
  }

  // Rotasi 90 derajat searah jarum jam
  rotate90() {
    const srcData = this.getImageData();
    const width = srcData.width;
    const height = srcData.height;

    const destData = new ImageData(height, width);
    const src = srcData.data;
    const dest = destData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const srcIdx = (y * width + x) * 4;
        const destX = height - 1 - y;
        const destY = x;
        const destIdx = (destY * height + destX) * 4;

        dest[destIdx] = src[srcIdx];
        dest[destIdx + 1] = src[srcIdx + 1];
        dest[destIdx + 2] = src[srcIdx + 2];
        dest[destIdx + 3] = src[srcIdx + 3];
      }
    }

    return destData;
  }

  // Rotasi 180 derajat
  rotate180() {
    const srcData = this.getImageData();
    const width = srcData.width;
    const height = srcData.height;

    const destData = new ImageData(width, height);
    const src = srcData.data;
    const dest = destData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const srcIdx = (y * width + x) * 4;
        const destX = width - 1 - x;
        const destY = height - 1 - y;
        const destIdx = (destY * width + destX) * 4;

        dest[destIdx] = src[srcIdx];
        dest[destIdx + 1] = src[srcIdx + 1];
        dest[destIdx + 2] = src[srcIdx + 2];
        dest[destIdx + 3] = src[srcIdx + 3];
      }
    }

    return destData;
  }

  // Rotasi 270 derajat (atau -90)
  rotate270() {
    const srcData = this.getImageData();
    const width = srcData.width;
    const height = srcData.height;

    const destData = new ImageData(height, width);
    const src = srcData.data;
    const dest = destData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const srcIdx = (y * width + x) * 4;
        const destX = y;
        const destY = width - 1 - x;
        const destIdx = (destY * height + destX) * 4;

        dest[destIdx] = src[srcIdx];
        dest[destIdx + 1] = src[srcIdx + 1];
        dest[destIdx + 2] = src[srcIdx + 2];
        dest[destIdx + 3] = src[srcIdx + 3];
      }
    }

    return destData;
  }

  // Flip Horizontal
  flipHorizontal() {
    const srcData = this.getImageData();
    const width = srcData.width;
    const height = srcData.height;

    const destData = new ImageData(width, height);
    const src = srcData.data;
    const dest = destData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const srcIdx = (y * width + x) * 4;
        const destX = width - 1 - x;
        const destIdx = (y * width + destX) * 4;

        dest[destIdx] = src[srcIdx];
        dest[destIdx + 1] = src[srcIdx + 1];
        dest[destIdx + 2] = src[srcIdx + 2];
        dest[destIdx + 3] = src[srcIdx + 3];
      }
    }

    return destData;
  }

  // Flip Vertical
  flipVertical() {
    const srcData = this.getImageData();
    const width = srcData.width;
    const height = srcData.height;

    const destData = new ImageData(width, height);
    const src = srcData.data;
    const dest = destData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const srcIdx = (y * width + x) * 4;
        const destY = height - 1 - y;
        const destIdx = (destY * width + x) * 4;

        dest[destIdx] = src[srcIdx];
        dest[destIdx + 1] = src[srcIdx + 1];
        dest[destIdx + 2] = src[srcIdx + 2];
        dest[destIdx + 3] = src[srcIdx + 3];
      }
    }

    return destData;
  }

  // Helper untuk clamp nilai RGB
  clamp(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
  }

  // Calculate histogram untuk satu channel
  calculateHistogram(imageData, channel = "gray") {
    const histogram = new Array(256).fill(0);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      let value;
      if (channel === "gray") {
        // Luminance formula
        value = Math.round(
          0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
        );
      } else if (channel === "r") {
        value = data[i];
      } else if (channel === "g") {
        value = data[i + 1];
      } else if (channel === "b") {
        value = data[i + 2];
      }
      histogram[value]++;
    }

    return histogram;
  }

  // Find two peaks in histogram untuk auto-threshold
  findTwoPeaks(histogram) {
    // Smooth histogram dengan moving average
    const smoothed = [];
    const windowSize = 5;
    for (let i = 0; i < histogram.length; i++) {
      let sum = 0;
      let count = 0;
      for (let j = -windowSize; j <= windowSize; j++) {
        const idx = i + j;
        if (idx >= 0 && idx < histogram.length) {
          sum += histogram[idx];
          count++;
        }
      }
      smoothed[i] = sum / count;
    }

    // Find local maxima
    const peaks = [];
    for (let i = 1; i < smoothed.length - 1; i++) {
      if (smoothed[i] > smoothed[i - 1] && smoothed[i] > smoothed[i + 1]) {
        peaks.push({ value: i, height: smoothed[i] });
      }
    }

    // Sort by height dan ambil 2 tertinggi
    peaks.sort((a, b) => b.height - a.height);

    if (peaks.length >= 2) {
      // Return 2 peaks dengan value terurut (yang kecil dulu)
      const peak1 = peaks[0].value;
      const peak2 = peaks[1].value;
      return peak1 < peak2 ? [peak1, peak2] : [peak2, peak1];
    } else if (peaks.length === 1) {
      // Jika hanya 1 peak, gunakan median sebagai peak kedua
      return [peaks[0].value, 128];
    } else {
      // Fallback ke default
      return [64, 192];
    }
  }

  // Histogram Equalization
  histogramEqualization() {
    const imageData = this.getImageData();
    const data = imageData.data;
    const totalPixels = imageData.width * imageData.height;

    // Calculate histogram untuk grayscale
    const histogram = this.calculateHistogram(imageData, "gray");

    // Calculate CDF (Cumulative Distribution Function)
    const cdf = new Array(256);
    cdf[0] = histogram[0];
    for (let i = 1; i < 256; i++) {
      cdf[i] = cdf[i - 1] + histogram[i];
    }

    // Normalize CDF
    const cdfMin = cdf.find((val) => val > 0);
    const lookupTable = new Array(256);
    for (let i = 0; i < 256; i++) {
      lookupTable[i] = Math.round(
        ((cdf[i] - cdfMin) / (totalPixels - cdfMin)) * 255
      );
    }

    // Apply equalization
    for (let i = 0; i < data.length; i += 4) {
      const gray = Math.round(
        0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      );
      const newValue = lookupTable[gray];
      data[i] = newValue; // R
      data[i + 1] = newValue; // G
      data[i + 2] = newValue; // B
    }

    return imageData;
  }

  // Calculate statistics (mean & standard deviation)
  calculateStats(imageData) {
    const data = imageData.data;
    let sum = 0;
    let count = 0;

    // Calculate mean
    for (let i = 0; i < data.length; i += 4) {
      const gray = Math.round(
        0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      );
      sum += gray;
      count++;
    }
    const mean = sum / count;

    // Calculate standard deviation
    let varianceSum = 0;
    for (let i = 0; i < data.length; i += 4) {
      const gray = Math.round(
        0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      );
      varianceSum += Math.pow(gray - mean, 2);
    }
    const std = Math.sqrt(varianceSum / count);

    return { mean: mean.toFixed(2), std: std.toFixed(2) };
  }

  // Extract channel data from ImageData
  extractChannelData(imageData, channel = "gray") {
    const data = imageData.data;
    const values = [];

    for (let i = 0; i < data.length; i += 4) {
      let value;
      if (channel === "gray") {
        value = Math.round(
          0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
        );
      } else if (channel === "r") {
        value = data[i];
      } else if (channel === "g") {
        value = data[i + 1];
      } else if (channel === "b") {
        value = data[i + 2];
      }
      values.push(value);
    }

    return values;
  }

  // Calculate comprehensive statistics untuk satu channel
  calculateComprehensiveStats(values) {
    if (!values || values.length === 0) {
      return {};
    }

    const n = values.length;

    // Mean
    const mean = values.reduce((a, b) => a + b) / n;

    // Min & Max
    const min = Math.min(...values);
    const max = Math.max(...values);

    // Standard Deviation
    const variance =
      values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
    const std = Math.sqrt(variance);

    // Skewness (moment ketiga / std^3)
    const skewness =
      std > 0
        ? values.reduce((sum, val) => sum + Math.pow(val - mean, 3), 0) /
          (n * Math.pow(std, 3))
        : 0;

    // Kurtosis (moment keempat / std^4 - 3)
    const kurtosis =
      std > 0
        ? values.reduce((sum, val) => sum + Math.pow(val - mean, 4), 0) /
            (n * Math.pow(std, 4)) -
          3
        : 0;

    // Entropy
    const histogram = new Array(256).fill(0);
    for (let val of values) {
      histogram[Math.round(val)]++;
    }

    let entropy = 0;
    for (let count of histogram) {
      if (count > 0) {
        const probability = count / n;
        entropy -= probability * Math.log2(probability);
      }
    }

    return {
      mean: mean.toFixed(2),
      std: std.toFixed(2),
      skewness: skewness.toFixed(4),
      kurtosis: kurtosis.toFixed(4),
      entropy: entropy.toFixed(4),
      min: min,
      max: max,
    };
  }

  // Calculate Pearson Correlation antara dua array
  pearsonCorrelation(data1, data2) {
    if (data1.length !== data2.length) {
      return null;
    }

    const n = data1.length;
    const mean1 = data1.reduce((a, b) => a + b, 0) / n;
    const mean2 = data2.reduce((a, b) => a + b, 0) / n;

    let numerator = 0;
    let sum1 = 0;
    let sum2 = 0;

    for (let i = 0; i < n; i++) {
      const d1 = data1[i] - mean1;
      const d2 = data2[i] - mean2;
      numerator += d1 * d2;
      sum1 += d1 * d1;
      sum2 += d2 * d2;
    }

    const denominator = Math.sqrt(sum1 * sum2);

    if (denominator === 0) {
      return 0;
    }

    return numerator / denominator;
  }

  // Calculate Chi-Square distance antara dua histogram
  chiSquareDistance(hist1, hist2) {
    if (hist1.length !== hist2.length) {
      return null;
    }

    let chiSquare = 0;

    for (let i = 0; i < hist1.length; i++) {
      const denom = hist1[i] + hist2[i];
      if (denom !== 0) {
        const diff = hist1[i] - hist2[i];
        chiSquare += (diff * diff) / denom;
      }
    }

    return (chiSquare / 2).toFixed(4);
  }

  // Calculate Euclidean Distance antara dua array
  euclideanDistance(data1, data2) {
    if (data1.length !== data2.length) {
      return null;
    }

    let sumSquares = 0;
    for (let i = 0; i < data1.length; i++) {
      const diff = data1[i] - data2[i];
      sumSquares += diff * diff;
    }

    return Math.sqrt(sumSquares).toFixed(2);
  }

  // Calculate Manhattan Distance antara dua array
  manhattanDistance(data1, data2) {
    if (data1.length !== data2.length) {
      return null;
    }

    let sum = 0;
    for (let i = 0; i < data1.length; i++) {
      sum += Math.abs(data1[i] - data2[i]);
    }

    return sum.toFixed(2);
  }

  // Calculate Structural Similarity Index (SSIM)
  // Simplified version untuk imaginary data
  structuralSimilarity(imageData1, imageData2) {
    // Resize imageData2 ke ukuran imageData1 jika perlu
    let resizedData2 = imageData2;
    if (
      imageData1.width !== imageData2.width ||
      imageData1.height !== imageData2.height
    ) {
      resizedData2 = this.resizeImageDataForComparison(
        imageData2,
        imageData1.width,
        imageData1.height
      );
    }

    const data1 = imageData1.data;
    const data2 = resizedData2.data;
    const n = Math.min(data1.length, data2.length);

    const c1 = 6.5025;
    const c2 = 58.5225;
    let ssimSum = 0;
    const windowSize = 11;

    // Calculate SSIM untuk luminance (grayscale)
    for (let i = 0; i < n - windowSize * 4; i += windowSize * 4) {
      const window1 = [];
      const window2 = [];

      for (let j = 0; j < windowSize && i + j * 4 < n; j++) {
        const idx = i + j * 4;
        window1.push(
          0.299 * data1[idx] + 0.587 * data1[idx + 1] + 0.114 * data1[idx + 2]
        );
        window2.push(
          0.299 * data2[idx] + 0.587 * data2[idx + 1] + 0.114 * data2[idx + 2]
        );
      }

      const mean1 = window1.reduce((a, b) => a + b) / window1.length;
      const mean2 = window2.reduce((a, b) => a + b) / window2.length;

      let var1 = 0;
      let var2 = 0;
      let covar = 0;

      for (let j = 0; j < window1.length; j++) {
        var1 += Math.pow(window1[j] - mean1, 2);
        var2 += Math.pow(window2[j] - mean2, 2);
        covar += (window1[j] - mean1) * (window2[j] - mean2);
      }

      var1 /= window1.length;
      var2 /= window2.length;
      covar /= window1.length;

      const numerator = (2 * mean1 * mean2 + c1) * (2 * covar + c2);
      const denominator =
        (mean1 * mean1 + mean2 * mean2 + c1) * (var1 + var2 + c2);

      ssimSum += numerator / denominator;
    }

    const windowCount = Math.floor((n - windowSize * 4) / (windowSize * 4));
    return windowCount > 0 ? (ssimSum / windowCount).toFixed(4) : "0.0000";
  }

  // Helper untuk resize ImageData untuk comparison
  resizeImageDataForComparison(imageData, targetWidth, targetHeight) {
    const srcCanvas = document.createElement("canvas");
    srcCanvas.width = imageData.width;
    srcCanvas.height = imageData.height;
    const srcCtx = srcCanvas.getContext("2d");
    srcCtx.putImageData(imageData, 0, 0);

    const dstCanvas = document.createElement("canvas");
    dstCanvas.width = targetWidth;
    dstCanvas.height = targetHeight;
    const dstCtx = dstCanvas.getContext("2d");
    dstCtx.drawImage(srcCanvas, 0, 0, targetWidth, targetHeight);

    return dstCtx.getImageData(0, 0, targetWidth, targetHeight);
  }
}

class PixelReader {
  constructor() {
    this.canvas = document.getElementById("imageCanvas");
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
    this.imageInput = document.getElementById("imageInput");
    this.imagePreview = document.getElementById("imagePreview");
    this.pixelList = document.getElementById("pixelList");
    this.showAllPixels = document.getElementById("showAllPixels");
    this.hoverInfo = document.getElementById("hoverInfo");
    this.imageSize = document.getElementById("imageSize");
    this.tabSection = document.getElementById("tabSection");

    this.pixelX = document.getElementById("pixelX");
    this.pixelY = document.getElementById("pixelY");
    this.searchButton = document.getElementById("searchPixel");
    this.searchResult = document.getElementById("searchResult");

    this.currentImage = null;
    this.pixelDataArray = [];

    // Initialize processor
    this.processor = null;

    // Storage untuk second images (arithmetic & boolean operations)
    this.secondImage = null;
    this.booleanSecondImage = null;

    // Storage untuk statistics second image
    this.statsSecondImage = null;
    this.statsSecondImageData = null;

    this.init();
  }

  init() {
    this.imageInput.addEventListener("change", (e) =>
      this.handleImageUpload(e)
    );
    this.showAllPixels.addEventListener("change", () =>
      this.updatePixelDisplay()
    );
    this.canvas.addEventListener("mousemove", (e) => this.handleCanvasHover(e));
    this.canvas.addEventListener("mouseleave", () => this.hideHoverInfo());

    // Grayscale tab (auto-convert on tab open)
    document
      .getElementById("resetImageGrayscale")
      .addEventListener("click", () =>
        this.resetCanvas("processCanvasGrayscale")
      );

    // Binary tab with real-time threshold slider
    const thresholdSlider = document.getElementById("thresholdSlider");
    thresholdSlider.addEventListener("input", (e) => {
      document.getElementById("thresholdValue").textContent = e.target.value;
      this.applyBinaryRealtime();
    });
    document
      .getElementById("resetImageBinary")
      .addEventListener("click", () => this.resetCanvas("processCanvasBinary"));

    // Brightness tab with real-time slider
    const brightnessSlider = document.getElementById("brightnessSlider");
    brightnessSlider.addEventListener("input", (e) => {
      document.getElementById("brightnessValue").textContent = e.target.value;
      this.applyBrightnessRealtime();
    });
    document
      .getElementById("resetImage2")
      .addEventListener("click", () => this.resetCanvas("processCanvas2"));

    // Arithmetic controls
    document
      .getElementById("arithmeticMode")
      .addEventListener("change", (e) => this.toggleArithmeticMode(e));
    document
      .getElementById("secondImageInput")
      .addEventListener("change", (e) => this.handleSecondImageUpload(e));
    document
      .getElementById("applyArithmetic")
      .addEventListener("click", () => this.applyArithmeticOperation());
    document
      .getElementById("resetImage3")
      .addEventListener("click", () => this.resetCanvas("processCanvas3"));

    // Boolean controls
    document
      .getElementById("booleanImageInput")
      .addEventListener("change", (e) => this.handleBooleanImageUpload(e));
    document
      .getElementById("applyBoolean")
      .addEventListener("click", () => this.applyBooleanOperation());
    document
      .getElementById("resetImage4")
      .addEventListener("click", () => this.resetCanvas("processCanvas4"));

    // Geometry controls
    document
      .getElementById("rotate90")
      .addEventListener("click", () => this.applyRotation(90));
    document
      .getElementById("rotate180")
      .addEventListener("click", () => this.applyRotation(180));
    document
      .getElementById("rotate270")
      .addEventListener("click", () => this.applyRotation(270));
    document
      .getElementById("flipHorizontal")
      .addEventListener("click", () => this.applyFlip("horizontal"));
    document
      .getElementById("flipVertical")
      .addEventListener("click", () => this.applyFlip("vertical"));
    document
      .getElementById("resetImage5")
      .addEventListener("click", () => this.resetCanvas("processCanvas5"));

    // Tab change listener untuk auto-apply grayscale
    document.querySelectorAll(".tab-button").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.handleTabChange(e.target.dataset.tab)
      );
    });

    this.searchButton.addEventListener("click", () => this.searchPixelAt());

    // Setup search for all matrix tabs
    this.setupPixelSearch("Grayscale", "processCanvasGrayscale");
    this.setupPixelSearch("Binary", "processCanvasBinary");
    this.setupPixelSearch("Brightness", "processCanvas2");
    this.setupPixelSearch("Arithmetic", "processCanvas3");
    this.setupPixelSearch("Boolean", "processCanvas4");
    this.setupPixelSearch("Geometry", "processCanvas5");

    // Histogram controls
    document
      .getElementById("generateHistogram")
      .addEventListener("click", () => this.generateHistogram());
    document
      .getElementById("autoThresholdBinary")
      .addEventListener("click", () => this.applyAutoThresholdBinary());
    document
      .getElementById("applyEqualization")
      .addEventListener("click", () => this.applyHistogramEqualization());
    document
      .getElementById("resetEqualization")
      .addEventListener("click", () => this.resetEqualization());

    // Statistics controls
    document
      .getElementById("analyzeFirstImage")
      .addEventListener("click", () => this.analyzeFirstImage());
    document
      .getElementById("statsSecondImageInput")
      .addEventListener("change", (e) => this.handleStatsSecondImageUpload(e));
    document
      .getElementById("analyzeSecondImage")
      .addEventListener("click", () => this.analyzeSecondImage());
    document
      .getElementById("analyzeMatching")
      .addEventListener("click", () => this.analyzeMatching());
  }

  setupPixelSearch(tabId, canvasId) {
    const searchButton = document.getElementById(`searchPixel${tabId}`);
    const pixelXInput = document.getElementById(`pixelX${tabId}`);
    const pixelYInput = document.getElementById(`pixelY${tabId}`);
    const searchResultDiv = document.getElementById(`searchResult${tabId}`);
    const canvas = document.getElementById(canvasId);

    searchButton.addEventListener("click", () =>
      this.searchPixelOnCanvas(
        canvas,
        pixelXInput,
        pixelYInput,
        searchResultDiv
      )
    );
  }

  handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Visual feedback untuk upload
    const uploadButton = document.querySelector(".upload-button");
    uploadButton.textContent = "⏳ Memproses...";
    uploadButton.style.pointerEvents = "none";

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        this.currentImage = img;
        this.drawImage(img);
        this.readPixels();
        this.processor = new ImageProcessor(this.canvas);

        // Show tab section dengan animasi
        this.tabSection.classList.remove("hidden");

        // Success feedback
        uploadButton.textContent = "✅ Gambar Berhasil Di-upload!";
        uploadButton.classList.add("success-uploaded");

        setTimeout(() => {
          uploadButton.textContent = "📤 Upload Gambar Lain";
          uploadButton.classList.remove("success-uploaded");
          uploadButton.style.pointerEvents = "auto";
        }, 2000);

        // Hide welcome guide setelah upload
        const welcomeGuide = document.getElementById("welcomeGuide");
        if (welcomeGuide) {
          setTimeout(() => {
            welcomeGuide.style.opacity = "0";
            welcomeGuide.style.transition = "opacity 0.5s ease";
            setTimeout(() => welcomeGuide.classList.add("hidden"), 500);
          }, 1000);
        }

        // Reset all process canvases
        this.resetAllCanvases();

        console.log(`✅ Image loaded: ${img.width}x${img.height} pixels`);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  drawImage(img) {
    // Set canvas size to match image
    this.canvas.width = img.width;
    this.canvas.height = img.height;

    // Draw image on canvas
    this.ctx.drawImage(img, 0, 0);

    // Show preview
    this.imagePreview.classList.remove("hidden");
    this.imageSize.textContent = `Ukuran: ${img.width} x ${
      img.height
    } pixel (Total: ${img.width * img.height} pixel)`;
  }

  readPixels() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const imageData = this.ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    this.pixelDataArray = [];

    // Read all pixels
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];

        this.pixelDataArray.push({
          x,
          y,
          r,
          g,
          b,
          a,
        });
      }
    }

    console.log(`Total pixel yang dibaca: ${this.pixelDataArray.length}`);
    this.updatePixelDisplay();
  }

  updatePixelDisplay() {
    // Tampilkan tabel 100x100 pixel
    this.displayPixelTable(500, 500);
  }

  displayPixelTable(tableWidth, tableHeight) {
    // Ambil pixel 500x500 dari kiri atas
    const width = Math.min(tableWidth, this.canvas.width);
    const height = Math.min(tableHeight, this.canvas.height);
    if (width === 0 || height === 0) {
      this.pixelList.innerHTML =
        '<div class="loading">Gambar belum diunggah atau terlalu kecil.</div>';
      return;
    }
    let html = '<div class="table-wrapper"><table class="pixel-table">';
    html += "<thead><tr><th></th>";
    for (let x = 0; x < width; x++) {
      html += `<th>${x}</th>`;
    }
    html += "</tr></thead>";
    html += "<tbody>";
    for (let y = 0; y < height; y++) {
      html += `<tr><th>${y}</th>`;
      for (let x = 0; x < width; x++) {
        const idx = y * this.canvas.width + x;
        const pixel = this.pixelDataArray[idx];
        if (pixel) {
          const brightness =
            0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;
          const isLight = brightness > 180;
          const lightClass = isLight ? " light-bg" : "";
          html += `<td class="${lightClass}" style="background:rgb(${pixel.r},${pixel.g},${pixel.b});font-size:7px;" title="x(${x}),y(${y}) RGB(${pixel.r},${pixel.g},${pixel.b})">${pixel.r},${pixel.g},${pixel.b}</td>`;
        } else {
          html += "<td></td>";
        }
      }
      html += "</tr>";
    }
    html += "</tbody></table></div>";
    this.pixelList.innerHTML = html;
  }

  // Display matrix untuk processing canvases
  displayMatrix(canvas, targetElementId, maxSize = 100) {
    const targetElement = document.getElementById(targetElementId);
    if (!targetElement || !canvas || canvas.width === 0) {
      if (targetElement) {
        targetElement.innerHTML =
          '<div class="loading">Tidak ada data untuk ditampilkan</div>';
      }
      return;
    }

    const width = Math.min(maxSize, canvas.width);
    const height = Math.min(maxSize, canvas.height);

    // Get image data from canvas
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let html = '<div class="table-wrapper"><table class="pixel-table">';
    html += "<thead><tr><th></th>";
    for (let x = 0; x < width; x++) {
      html += `<th>${x}</th>`;
    }
    html += "</tr></thead>";
    html += "<tbody>";

    for (let y = 0; y < height; y++) {
      html += `<tr><th>${y}</th>`;
      for (let x = 0; x < width; x++) {
        const idx = (y * canvas.width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        const isLight = brightness > 180;
        const lightClass = isLight ? " light-bg" : "";

        html += `<td class="${lightClass}" style="background:rgb(${r},${g},${b});font-size:7px;" title="x(${x}),y(${y}) RGB(${r},${g},${b})">${r},${g},${b}</td>`;
      }
      html += "</tr>";
    }
    html += "</tbody></table></div>";
    targetElement.innerHTML = html;
  }

  handleCanvasHover(event) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    const x = Math.floor((event.clientX - rect.left) * scaleX);
    const y = Math.floor((event.clientY - rect.top) * scaleY);

    const pixel = this.pixelDataArray.find((p) => p.x === x && p.y === y);

    if (pixel) {
      this.showHoverInfo(event, pixel);
    }
  }

  showHoverInfo(event, pixel) {
    const hoverCoord = document.getElementById("hoverCoord");
    const hoverRGB = document.getElementById("hoverRGB");
    const hoverColor = document.getElementById("hoverColor");

    hoverCoord.textContent = `x(${pixel.x}), y(${pixel.y})`;
    hoverRGB.textContent = `R:${pixel.r}, G:${pixel.g}, B:${pixel.b}`;
    hoverColor.style.backgroundColor = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;

    this.hoverInfo.style.left = event.pageX + 20 + "px";
    this.hoverInfo.style.top = event.pageY - 50 + "px";
    this.hoverInfo.classList.remove("hidden");
  }

  hideHoverInfo() {
    this.hoverInfo.classList.add("hidden");
  }

  // Handle tab change - auto apply untuk grayscale
  handleTabChange(tabId) {
    if (tabId === "grayscale" && this.processor) {
      // Auto-apply grayscale saat tab dibuka
      setTimeout(() => this.applyGrayscale(), 100);
    } else if (tabId === "binary" && this.processor) {
      // Auto-apply binary saat tab dibuka
      setTimeout(() => this.applyBinaryRealtime(), 100);
    } else if (tabId === "brightness" && this.processor) {
      // Reset brightness slider to 0 when entering tab
      const slider = document.getElementById("brightnessSlider");
      if (slider.value !== "0") {
        slider.value = 0;
        document.getElementById("brightnessValue").textContent = "0";
      }
      setTimeout(() => this.applyBrightnessRealtime(), 100);
    }
  }

  // === Binary & Grayscale Features ===
  applyGrayscale() {
    if (!this.processor) {
      alert("Upload gambar terlebih dahulu!");
      return;
    }
    const canvas = document.getElementById("processCanvasGrayscale");
    const imageData = this.processor.toGrayscale();
    this.processor.drawToCanvas(imageData, canvas);

    // Display matrix
    this.displayMatrix(canvas, "matrixListGrayscale");
  }

  applyBinaryRealtime() {
    if (!this.processor) return;

    const threshold = parseInt(
      document.getElementById("thresholdSlider").value
    );
    const canvas = document.getElementById("processCanvasBinary");
    const imageData = this.processor.toBinary(threshold);
    this.processor.drawToCanvas(imageData, canvas);

    // Display matrix
    this.displayMatrix(canvas, "matrixListBinary");
  }

  // === Brightness Feature ===
  applyBrightnessRealtime() {
    if (!this.processor) return;

    const value = parseInt(document.getElementById("brightnessSlider").value);
    const canvas = document.getElementById("processCanvas2");
    const imageData = this.processor.adjustBrightness(value);
    this.processor.drawToCanvas(imageData, canvas);

    // Display matrix
    this.displayMatrix(canvas, "matrixList2");
  }

  // === Arithmetic Features ===
  toggleArithmeticMode(event) {
    const mode = event.target.value;
    const constantGroup = document.getElementById("constantGroup");
    const imageGroup = document.getElementById("imageGroup");

    if (mode === "constant") {
      constantGroup.style.display = "block";
      imageGroup.style.display = "none";
    } else {
      constantGroup.style.display = "none";
      imageGroup.style.display = "block";
    }
  }

  // Helper function untuk resize image agar sama dengan target size
  resizeImageData(imageData, targetWidth, targetHeight) {
    // Buat temporary canvas untuk original image
    const srcCanvas = document.createElement("canvas");
    srcCanvas.width = imageData.width;
    srcCanvas.height = imageData.height;
    const srcCtx = srcCanvas.getContext("2d");
    srcCtx.putImageData(imageData, 0, 0);

    // Buat canvas untuk hasil resize
    const dstCanvas = document.createElement("canvas");
    dstCanvas.width = targetWidth;
    dstCanvas.height = targetHeight;
    const dstCtx = dstCanvas.getContext("2d");

    // Resize dengan drawImage (automatic interpolation)
    dstCtx.drawImage(srcCanvas, 0, 0, targetWidth, targetHeight);

    // Return resized ImageData
    return dstCtx.getImageData(0, 0, targetWidth, targetHeight);
  }

  handleSecondImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusText = document.getElementById("arithmeticImageStatus");

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        this.secondImage = ctx.getImageData(0, 0, img.width, img.height);

        // Update status
        if (statusText) {
          if (
            this.currentImage &&
            (img.width !== this.currentImage.width ||
              img.height !== this.currentImage.height)
          ) {
            statusText.textContent = `✅ ${img.width}x${img.height} (akan di-resize ke ${this.currentImage.width}x${this.currentImage.height})`;
            statusText.className = "status-text warning";
          } else {
            statusText.textContent = `✅ ${img.width}x${img.height}`;
            statusText.className = "status-text success";
          }
        }

        console.log(
          `✅ Gambar kedua untuk Arithmetic berhasil di-upload: ${img.width}x${img.height}`
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  applyArithmeticOperation() {
    if (!this.processor) {
      alert("Upload gambar terlebih dahulu!");
      return;
    }

    const operation = document.getElementById("arithmeticOp").value;
    const mode = document.getElementById("arithmeticMode").value;
    const canvas = document.getElementById("processCanvas3");

    let imageData;
    if (mode === "constant") {
      const constant = parseFloat(
        document.getElementById("constantValue").value
      );
      imageData = this.processor.arithmeticConstant(operation, constant);
    } else {
      if (!this.secondImage) {
        alert("Upload gambar kedua terlebih dahulu!");
        return;
      }

      // Auto-resize gambar kedua jika ukurannya berbeda
      let processedSecondImage = this.secondImage;
      if (
        this.currentImage &&
        (this.secondImage.width !== this.currentImage.width ||
          this.secondImage.height !== this.currentImage.height)
      ) {
        console.log(
          `🔄 Resize gambar kedua dari ${this.secondImage.width}x${this.secondImage.height} ke ${this.currentImage.width}x${this.currentImage.height}`
        );
        processedSecondImage = this.resizeImageData(
          this.secondImage,
          this.currentImage.width,
          this.currentImage.height
        );
      }

      imageData = this.processor.arithmeticImage(
        operation,
        processedSecondImage
      );
    }

    this.processor.drawToCanvas(imageData, canvas);

    // Display matrix
    this.displayMatrix(canvas, "matrixList3");
  }

  // === Boolean Features ===
  handleBooleanImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusText = document.getElementById("image2Status");
    const statusPreview = document.getElementById("image2StatusPreview");

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Draw ke canvas preview
        const canvas1 = document.getElementById("booleanCanvas1");
        const canvas2 = document.getElementById("booleanCanvas2");

        // Draw original ke canvas1 (jika belum ada)
        if (this.currentImage && canvas1.width === 0) {
          canvas1.width = this.currentImage.width;
          canvas1.height = this.currentImage.height;
          const ctx1 = canvas1.getContext("2d");
          ctx1.drawImage(this.currentImage, 0, 0);
        }

        // Draw second image ke canvas2
        canvas2.width = img.width;
        canvas2.height = img.height;
        const ctx2 = canvas2.getContext("2d");
        ctx2.drawImage(img, 0, 0);

        // Simpan image data untuk operasi boolean
        this.booleanSecondImage = ctx2.getImageData(
          0,
          0,
          img.width,
          img.height
        );

        // Update status text
        const sizeText = `${img.width}x${img.height}`;
        const needsResize =
          this.currentImage &&
          (img.width !== this.currentImage.width ||
            img.height !== this.currentImage.height);

        if (statusText) {
          if (needsResize) {
            statusText.textContent = `✅ ${sizeText} (akan di-resize ke ${this.currentImage.width}x${this.currentImage.height})`;
            statusText.className = "status-text warning";
          } else {
            statusText.textContent = `✅ ${sizeText}`;
            statusText.className = "status-text success";
          }
        }

        if (statusPreview) {
          statusPreview.textContent = needsResize
            ? `⚠️ Gambar akan di-resize`
            : `✅ Ukuran sama`;
          statusPreview.className = needsResize
            ? "status-text warning"
            : "status-text success";
        }

        console.log(
          `✅ Gambar kedua untuk Boolean berhasil di-upload: ${sizeText}`
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  applyBooleanOperation() {
    if (!this.processor) {
      alert("Upload gambar terlebih dahulu!");
      return;
    }
    if (!this.booleanSecondImage) {
      alert("Upload gambar kedua terlebih dahulu!");
      return;
    }

    // Auto-resize gambar kedua jika ukurannya berbeda
    let processedSecondImage = this.booleanSecondImage;
    if (
      this.currentImage &&
      (this.booleanSecondImage.width !== this.currentImage.width ||
        this.booleanSecondImage.height !== this.currentImage.height)
    ) {
      console.log(
        `🔄 Resize gambar kedua dari ${this.booleanSecondImage.width}x${this.booleanSecondImage.height} ke ${this.currentImage.width}x${this.currentImage.height}`
      );
      processedSecondImage = this.resizeImageData(
        this.booleanSecondImage,
        this.currentImage.width,
        this.currentImage.height
      );
    }

    const operation = document.getElementById("booleanOp").value;
    const canvas = document.getElementById("processCanvas4");
    const imageData = this.processor.booleanOperation(
      operation,
      processedSecondImage
    );
    this.processor.drawToCanvas(imageData, canvas);

    // Display matrix
    this.displayMatrix(canvas, "matrixList4");
  }

  // === Geometry Features ===
  applyRotation(degrees) {
    if (!this.processor) {
      alert("Upload gambar terlebih dahulu!");
      return;
    }

    const canvas = document.getElementById("processCanvas5");
    let imageData;

    switch (degrees) {
      case 90:
        imageData = this.processor.rotate90();
        break;
      case 180:
        imageData = this.processor.rotate180();
        break;
      case 270:
        imageData = this.processor.rotate270();
        break;
    }

    this.processor.drawToCanvas(imageData, canvas);

    // Update processor dengan canvas baru untuk rotasi berturut-turut
    this.processor = new ImageProcessor(canvas);

    // Display matrix
    this.displayMatrix(canvas, "matrixList5");
  }

  applyFlip(direction) {
    if (!this.processor) {
      alert("Upload gambar terlebih dahulu!");
      return;
    }

    const canvas = document.getElementById("processCanvas5");
    let imageData;

    if (direction === "horizontal") {
      imageData = this.processor.flipHorizontal();
    } else {
      imageData = this.processor.flipVertical();
    }

    this.processor.drawToCanvas(imageData, canvas);

    // Update processor
    this.processor = new ImageProcessor(canvas);

    // Display matrix
    this.displayMatrix(canvas, "matrixList5");
  }

  // === Helper Methods ===
  resetCanvas(canvasId) {
    if (!this.currentImage) return;

    const canvas = document.getElementById(canvasId);
    canvas.width = this.currentImage.width;
    canvas.height = this.currentImage.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(this.currentImage, 0, 0);

    // Reset processor ke original image
    this.processor = new ImageProcessor(this.canvas);

    // Update matrix display based on canvas
    const matrixMap = {
      processCanvasGrayscale: "matrixListGrayscale",
      processCanvasBinary: "matrixListBinary",
      processCanvas2: "matrixList2",
      processCanvas3: "matrixList3",
      processCanvas4: "matrixList4",
      processCanvas5: "matrixList5",
    };

    const matrixId = matrixMap[canvasId];
    if (matrixId) {
      this.displayMatrix(canvas, matrixId);
    }
  }

  resetAllCanvases() {
    if (!this.currentImage) return;

    const canvases = [
      "processCanvasGrayscale",
      "processCanvasBinary",
      "processCanvas2",
      "processCanvas3",
      "processCanvas4",
      "processCanvas5",
    ];
    const matrixIds = [
      "matrixListGrayscale",
      "matrixListBinary",
      "matrixList2",
      "matrixList3",
      "matrixList4",
      "matrixList5",
    ];

    canvases.forEach((id, index) => {
      const canvas = document.getElementById(id);
      canvas.width = this.currentImage.width;
      canvas.height = this.currentImage.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(this.currentImage, 0, 0);

      // Display initial matrix
      this.displayMatrix(canvas, matrixIds[index]);
    });

    // Reset boolean preview canvas 1 (untuk menampilkan original image)
    const canvas1 = document.getElementById("booleanCanvas1");
    canvas1.width = this.currentImage.width;
    canvas1.height = this.currentImage.height;
    const ctx1 = canvas1.getContext("2d");
    ctx1.drawImage(this.currentImage, 0, 0);

    // Clear boolean canvas 2 (akan diisi saat user upload image kedua)
    const canvas2 = document.getElementById("booleanCanvas2");
    canvas2.width = 0;
    canvas2.height = 0;

    // Reset second image data
    this.booleanSecondImage = null;
    this.secondImage = null;
  }

  searchPixelAt() {
    const x = parseInt(this.pixelX.value);
    const y = parseInt(this.pixelY.value);

    if (isNaN(x) || isNaN(y)) {
      alert("Masukkan koordinat X dan Y yang valid");
      return;
    }

    if (x < 0 || x >= this.canvas.width || y < 0 || y >= this.canvas.height) {
      alert("Koordinat di luar batas gambar");
      return;
    }

    const pixelData = this.pixelDataArray.find((p) => p.x === x && p.y === y);

    if (pixelData) {
      this.searchResult.style.display = "block";
      this.searchResult.innerHTML = `
        <strong>Pixel pada (${x}, ${y}):</strong><br>
        R: ${pixelData.r}<br>
        G: ${pixelData.g}<br>
        B: ${pixelData.b}<br>
      `;
    }
  }

  searchPixelOnCanvas(canvas, xInput, yInput, resultDiv) {
    const x = parseInt(xInput.value);
    const y = parseInt(yInput.value);

    if (isNaN(x) || isNaN(y)) {
      alert("Masukkan koordinat X dan Y yang valid");
      return;
    }

    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
      alert("Koordinat di luar batas gambar");
      return;
    }

    const ctx = canvas.getContext("2d");
    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const r = pixelData[0];
    const g = pixelData[1];
    const b = pixelData[2];

    if (resultDiv) {
      resultDiv.style.display = "block";
      resultDiv.innerHTML = `
        <strong>Pixel pada (${x}, ${y}):</strong><br>
        R: ${r}<br>
        G: ${g}<br>
        B: ${b}<br>
        <div class="color-box" style="width: 50px; height: 20px; background-color: rgb(${r}, ${g}, ${b}); border: 1px solid #fff; margin-top: 5px;"></div>
      `;
    } else {
      alert(`Pixel at (${x}, ${y}): R=${r}, G=${g}, B=${b}`);
    }
  }

  // === Histogram Processing Features ===
  generateHistogram() {
    if (!this.processor) {
      alert("Upload gambar terlebih dahulu!");
      return;
    }

    const imageData = this.processor.getImageData();

    // Calculate histograms untuk setiap channel
    const histR = this.processor.calculateHistogram(imageData, "r");
    const histG = this.processor.calculateHistogram(imageData, "g");
    const histB = this.processor.calculateHistogram(imageData, "b");
    const histGray = this.processor.calculateHistogram(imageData, "gray");

    // Draw histogram charts
    this.drawHistogramChart("histogramRed", histR, "#ef4444");
    this.drawHistogramChart("histogramGreen", histG, "#22c55e");
    this.drawHistogramChart("histogramBlue", histB, "#3b82f6");
    this.drawHistogramChart("histogramGray", histGray, "#94a3b8");

    // Draw histogram gabungan RGB
    this.drawCombinedHistogram("histogramCombined", histR, histG, histB);

    // Display histogram data table
    this.displayHistogramTable(histR, histG, histB, histGray);

    console.log("✅ Histogram berhasil di-generate!");
  }

  drawHistogramChart(canvasId, histogram, color) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Margin untuk sumbu - diperbesar untuk angka yang lebih panjang
    const marginLeft = 60;
    const marginBottom = 40;
    const marginTop = 10;
    const marginRight = 20;
    const chartWidth = width - marginLeft - marginRight;
    const chartHeight = height - marginBottom - marginTop;

    // Clear canvas
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, width, height);

    // Find max value untuk normalisasi
    const maxValue = Math.max(...histogram);

    // Draw Y-axis (frekuensi)
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(marginLeft, marginTop);
    ctx.lineTo(marginLeft, height - marginBottom);
    ctx.stroke();

    // Draw X-axis (nilai intensitas)
    ctx.beginPath();
    ctx.moveTo(marginLeft, height - marginBottom);
    ctx.lineTo(width - marginRight, height - marginBottom);
    ctx.stroke();

    // Draw Y-axis labels (frekuensi)
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "11px monospace";
    ctx.textAlign = "right";
    const numYTicks = 5;
    for (let i = 0; i <= numYTicks; i++) {
      const value = Math.round((maxValue / numYTicks) * (numYTicks - i));
      const y = marginTop + (chartHeight / numYTicks) * i;
      ctx.fillText(value.toString(), marginLeft - 5, y + 4);

      // Draw grid line
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(marginLeft, y);
      ctx.lineTo(width - marginRight, y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw X-axis labels (nilai intensitas 0-255)
    ctx.textAlign = "center";
    const xLabels = [0, 64, 128, 192, 255];
    for (let label of xLabels) {
      const x = marginLeft + (label / 255) * chartWidth;
      ctx.fillText(label.toString(), x, height - marginBottom + 18);

      // Draw tick mark
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, height - marginBottom);
      ctx.lineTo(x, height - marginBottom + 5);
      ctx.stroke();
    }

    // Draw bars
    ctx.fillStyle = color;
    for (let i = 0; i < 256; i++) {
      const barHeight = (histogram[i] / maxValue) * chartHeight;
      const x = marginLeft + (i / 255) * chartWidth;
      const y = height - marginBottom - barHeight;
      const barWidth = chartWidth / 256;
      ctx.fillRect(x, y, barWidth, barHeight);
    }

    // Draw axis titles
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "bold 12px monospace";
    ctx.textAlign = "center";

    // X-axis title
    ctx.fillText(
      "Nilai Intensitas (0-255)",
      marginLeft + chartWidth / 2,
      height - 5
    );

    // Y-axis title (rotated)
    ctx.save();
    ctx.translate(15, marginTop + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Frekuensi", 0, 0);
    ctx.restore();
  }

  drawCombinedHistogram(canvasId, histR, histG, histB) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Margin untuk sumbu - sama dengan single histogram
    const marginLeft = 60;
    const marginBottom = 40;
    const marginTop = 10;
    const marginRight = 20;
    const chartWidth = width - marginLeft - marginRight;
    const chartHeight = height - marginBottom - marginTop;

    // Clear canvas
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, width, height);

    // Find max value dari semua channel untuk normalisasi
    const maxR = Math.max(...histR);
    const maxG = Math.max(...histG);
    const maxB = Math.max(...histB);
    const maxValue = Math.max(maxR, maxG, maxB);

    // Draw Y-axis (frekuensi)
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(marginLeft, marginTop);
    ctx.lineTo(marginLeft, height - marginBottom);
    ctx.stroke();

    // Draw X-axis (nilai intensitas)
    ctx.beginPath();
    ctx.moveTo(marginLeft, height - marginBottom);
    ctx.lineTo(width - marginRight, height - marginBottom);
    ctx.stroke();

    // Draw Y-axis labels (frekuensi)
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "11px monospace";
    ctx.textAlign = "right";
    const numYTicks = 5;
    for (let i = 0; i <= numYTicks; i++) {
      const value = Math.round((maxValue / numYTicks) * (numYTicks - i));
      const y = marginTop + (chartHeight / numYTicks) * i;
      ctx.fillText(value.toString(), marginLeft - 5, y + 4);

      // Draw grid line
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(marginLeft, y);
      ctx.lineTo(width - marginRight, y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw X-axis labels (nilai intensitas 0-255)
    ctx.textAlign = "center";
    const xLabels = [0, 64, 128, 192, 255];
    for (let label of xLabels) {
      const x = marginLeft + (label / 255) * chartWidth;
      ctx.fillText(label.toString(), x, height - marginBottom + 18);

      // Draw tick mark
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, height - marginBottom);
      ctx.lineTo(x, height - marginBottom + 5);
      ctx.stroke();
    }

    // Draw bars untuk semua channel dengan transparansi
    const barWidth = chartWidth / 256;

    // Draw Red channel dengan opacity
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = "#ef4444";
    for (let i = 0; i < 256; i++) {
      const barHeight = (histR[i] / maxValue) * chartHeight;
      const x = marginLeft + (i / 255) * chartWidth;
      const y = height - marginBottom - barHeight;
      ctx.fillRect(x, y, barWidth, barHeight);
    }

    // Draw Green channel dengan opacity
    ctx.fillStyle = "#22c55e";
    for (let i = 0; i < 256; i++) {
      const barHeight = (histG[i] / maxValue) * chartHeight;
      const x = marginLeft + (i / 255) * chartWidth;
      const y = height - marginBottom - barHeight;
      ctx.fillRect(x, y, barWidth, barHeight);
    }

    // Draw Blue channel dengan opacity
    ctx.fillStyle = "#3b82f6";
    for (let i = 0; i < 256; i++) {
      const barHeight = (histB[i] / maxValue) * chartHeight;
      const x = marginLeft + (i / 255) * chartWidth;
      const y = height - marginBottom - barHeight;
      ctx.fillRect(x, y, barWidth, barHeight);
    }

    // Reset opacity
    ctx.globalAlpha = 1.0;

    // Draw axis titles
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "bold 12px monospace";
    ctx.textAlign = "center";

    // X-axis title
    ctx.fillText(
      "Nilai Intensitas (0-255)",
      marginLeft + chartWidth / 2,
      height - 5
    );

    // Y-axis title (rotated)
    ctx.save();
    ctx.translate(15, marginTop + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Frekuensi", 0, 0);
    ctx.restore();

    // Draw legend untuk combined histogram
    const legendX = width - marginRight - 100;
    const legendY = marginTop + 20;
    const legendSize = 15;
    const legendSpacing = 25;

    // Red legend
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(legendX, legendY, legendSize, legendSize);
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "12px monospace";
    ctx.textAlign = "left";
    ctx.fillText("Red", legendX + legendSize + 5, legendY + 12);

    // Green legend
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(legendX, legendY + legendSpacing, legendSize, legendSize);
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(
      "Green",
      legendX + legendSize + 5,
      legendY + legendSpacing + 12
    );

    // Blue legend
    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(legendX, legendY + legendSpacing * 2, legendSize, legendSize);
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(
      "Blue",
      legendX + legendSize + 5,
      legendY + legendSpacing * 2 + 12
    );
  }

  displayHistogramTable(histR, histG, histB, histGray) {
    const tableDiv = document.getElementById("histogramTable");

    // Display hanya setiap 5 nilai untuk menghemat space
    let html = '<table class="histogram-data-table">';
    html +=
      "<thead><tr><th>Value</th><th>Red</th><th>Green</th><th>Blue</th><th>Gray</th></tr></thead>";
    html += "<tbody>";

    for (let i = 0; i < 256; i += 5) {
      html += `<tr>
        <td>${i}</td>
        <td>${histR[i]}</td>
        <td>${histG[i]}</td>
        <td>${histB[i]}</td>
        <td>${histGray[i]}</td>
      </tr>`;
    }

    html += "</tbody></table>";
    tableDiv.innerHTML = html;
  }

  applyAutoThresholdBinary() {
    if (!this.processor) {
      alert("Upload gambar terlebih dahulu!");
      return;
    }

    const imageData = this.processor.getImageData();
    const histGray = this.processor.calculateHistogram(imageData, "gray");

    // Find two peaks
    const peaks = this.processor.findTwoPeaks(histGray);
    const threshold = Math.round((peaks[0] + peaks[1]) / 2);

    // Display threshold info
    document.getElementById("thresholdInfo").classList.remove("hidden");
    document.getElementById("autoThresholdValue").textContent = threshold;
    document.getElementById("peak1Value").textContent = peaks[0];
    document.getElementById("peak2Value").textContent = peaks[1];

    // Apply binary dengan threshold otomatis
    const binaryData = this.processor.toBinary(threshold);
    const canvas = document.getElementById("histogramBinaryCanvas");
    this.processor.drawToCanvas(binaryData, canvas);

    console.log(
      `✅ Auto-threshold binary applied with threshold=${threshold} (peaks: ${peaks[0]}, ${peaks[1]})`
    );
  }

  applyHistogramEqualization() {
    if (!this.processor) {
      alert("Upload gambar terlebih dahulu!");
      return;
    }

    // Get original image stats
    const originalData = this.processor.getImageData();
    const statsBefore = this.processor.calculateStats(originalData);

    // Display before stats
    document.getElementById("meanBefore").textContent = statsBefore.mean;
    document.getElementById("stdBefore").textContent = statsBefore.std;

    // Draw original to before canvas
    const beforeCanvas = document.getElementById("equalizationBefore");
    beforeCanvas.width = this.currentImage.width;
    beforeCanvas.height = this.currentImage.height;
    const beforeCtx = beforeCanvas.getContext("2d");
    beforeCtx.drawImage(this.currentImage, 0, 0);

    // Calculate histogram before
    const histBefore = this.processor.calculateHistogram(originalData, "gray");

    // Apply equalization
    const equalizedData = this.processor.histogramEqualization();
    const afterCanvas = document.getElementById("equalizationAfter");
    this.processor.drawToCanvas(equalizedData, afterCanvas);

    // Get stats after equalization
    const statsAfter = this.processor.calculateStats(equalizedData);
    document.getElementById("meanAfter").textContent = statsAfter.mean;
    document.getElementById("stdAfter").textContent = statsAfter.std;

    // Calculate histogram after
    const histAfter = this.processor.calculateHistogram(equalizedData, "gray");

    // Draw comparison histograms
    this.drawHistogramChart("histogramBeforeEq", histBefore, "#94a3b8");
    this.drawHistogramChart("histogramAfterEq", histAfter, "#3b82f6");

    console.log("✅ Histogram equalization applied!");
    console.log(
      `📊 Stats: Mean ${statsBefore.mean} → ${statsAfter.mean}, Std ${statsBefore.std} → ${statsAfter.std}`
    );
  }

  resetEqualization() {
    if (!this.currentImage) return;

    // Reset after canvas to original
    const afterCanvas = document.getElementById("equalizationAfter");
    afterCanvas.width = this.currentImage.width;
    afterCanvas.height = this.currentImage.height;
    const ctx = afterCanvas.getContext("2d");
    ctx.drawImage(this.currentImage, 0, 0);

    // Clear stats
    document.getElementById("meanAfter").textContent = "-";
    document.getElementById("stdAfter").textContent = "-";

    // Clear after histogram
    const histCanvas = document.getElementById("histogramAfterEq");
    const histCtx = histCanvas.getContext("2d");
    histCtx.fillStyle = "#1e293b";
    histCtx.fillRect(0, 0, histCanvas.width, histCanvas.height);

    console.log("🔄 Equalization reset");
  }

  // === Statistics Features ===
  analyzeFirstImage() {
    if (!this.processor) {
      alert("Upload gambar terlebih dahulu!");
      return;
    }

    const imageData = this.processor.getImageData();

    // Extract data untuk setiap channel
    const dataR = this.processor.extractChannelData(imageData, "r");
    const dataG = this.processor.extractChannelData(imageData, "g");
    const dataB = this.processor.extractChannelData(imageData, "b");
    const dataGray = this.processor.extractChannelData(imageData, "gray");

    // Hitung statistik untuk setiap channel
    const statsR = this.processor.calculateComprehensiveStats(dataR);
    const statsG = this.processor.calculateComprehensiveStats(dataG);
    const statsB = this.processor.calculateComprehensiveStats(dataB);
    const statsGray = this.processor.calculateComprehensiveStats(dataGray);

    // Tampilkan hasil di tabel
    this.displayFirstImageStats(statsR, statsG, statsB, statsGray);

    console.log("✅ Statistik gambar pertama berhasil dihitung!");
  }

  displayFirstImageStats(statsR, statsG, statsB, statsGray) {
    const statsDiv = document.getElementById("firstImageStats");
    statsDiv.classList.remove("hidden");

    // Update table dengan nilai statistik
    document.getElementById("stats1MeanR").textContent = statsR.mean;
    document.getElementById("stats1MeanG").textContent = statsG.mean;
    document.getElementById("stats1MeanB").textContent = statsB.mean;
    document.getElementById("stats1MeanGray").textContent = statsGray.mean;

    document.getElementById("stats1StdR").textContent = statsR.std;
    document.getElementById("stats1StdG").textContent = statsG.std;
    document.getElementById("stats1StdB").textContent = statsB.std;
    document.getElementById("stats1StdGray").textContent = statsGray.std;

    document.getElementById("stats1SkewR").textContent = statsR.skewness;
    document.getElementById("stats1SkewG").textContent = statsG.skewness;
    document.getElementById("stats1SkewB").textContent = statsB.skewness;
    document.getElementById("stats1SkewGray").textContent = statsGray.skewness;

    document.getElementById("stats1KurtR").textContent = statsR.kurtosis;
    document.getElementById("stats1KurtG").textContent = statsG.kurtosis;
    document.getElementById("stats1KurtB").textContent = statsB.kurtosis;
    document.getElementById("stats1KurtGray").textContent = statsGray.kurtosis;

    document.getElementById("stats1EntrR").textContent = statsR.entropy;
    document.getElementById("stats1EntrG").textContent = statsG.entropy;
    document.getElementById("stats1EntrB").textContent = statsB.entropy;
    document.getElementById("stats1EntrGray").textContent = statsGray.entropy;

    document.getElementById("stats1MinR").textContent = statsR.min;
    document.getElementById("stats1MinG").textContent = statsG.min;
    document.getElementById("stats1MinB").textContent = statsB.min;
    document.getElementById("stats1MinGray").textContent = statsGray.min;

    document.getElementById("stats1MaxR").textContent = statsR.max;
    document.getElementById("stats1MaxG").textContent = statsG.max;
    document.getElementById("stats1MaxB").textContent = statsB.max;
    document.getElementById("stats1MaxGray").textContent = statsGray.max;
  }

  analyzeSecondImage() {
    if (!this.statsSecondImageData) {
      alert("Upload gambar kedua terlebih dahulu!");
      return;
    }

    // Buat temporary ImageProcessor untuk gambar kedua
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = this.statsSecondImage.width;
    tempCanvas.height = this.statsSecondImage.height;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(this.statsSecondImage, 0, 0);
    const tempProcessor = new ImageProcessor(tempCanvas);

    const imageData = this.statsSecondImageData;

    // Extract data untuk setiap channel
    const dataR = tempProcessor.extractChannelData(imageData, "r");
    const dataG = tempProcessor.extractChannelData(imageData, "g");
    const dataB = tempProcessor.extractChannelData(imageData, "b");
    const dataGray = tempProcessor.extractChannelData(imageData, "gray");

    // Hitung statistik untuk setiap channel
    const statsR = tempProcessor.calculateComprehensiveStats(dataR);
    const statsG = tempProcessor.calculateComprehensiveStats(dataG);
    const statsB = tempProcessor.calculateComprehensiveStats(dataB);
    const statsGray = tempProcessor.calculateComprehensiveStats(dataGray);

    // Tampilkan hasil di tabel
    this.displaySecondImageStats(statsR, statsG, statsB, statsGray);

    console.log("✅ Statistik gambar kedua berhasil dihitung!");
  }

  displaySecondImageStats(statsR, statsG, statsB, statsGray) {
    const statsDiv = document.getElementById("secondImageStats");
    statsDiv.classList.remove("hidden");

    // Update table dengan nilai statistik
    document.getElementById("stats2MeanR").textContent = statsR.mean;
    document.getElementById("stats2MeanG").textContent = statsG.mean;
    document.getElementById("stats2MeanB").textContent = statsB.mean;
    document.getElementById("stats2MeanGray").textContent = statsGray.mean;

    document.getElementById("stats2StdR").textContent = statsR.std;
    document.getElementById("stats2StdG").textContent = statsG.std;
    document.getElementById("stats2StdB").textContent = statsB.std;
    document.getElementById("stats2StdGray").textContent = statsGray.std;

    document.getElementById("stats2SkewR").textContent = statsR.skewness;
    document.getElementById("stats2SkewG").textContent = statsG.skewness;
    document.getElementById("stats2SkewB").textContent = statsB.skewness;
    document.getElementById("stats2SkewGray").textContent = statsGray.skewness;

    document.getElementById("stats2KurtR").textContent = statsR.kurtosis;
    document.getElementById("stats2KurtG").textContent = statsG.kurtosis;
    document.getElementById("stats2KurtB").textContent = statsB.kurtosis;
    document.getElementById("stats2KurtGray").textContent = statsGray.kurtosis;

    document.getElementById("stats2EntrR").textContent = statsR.entropy;
    document.getElementById("stats2EntrG").textContent = statsG.entropy;
    document.getElementById("stats2EntrB").textContent = statsB.entropy;
    document.getElementById("stats2EntrGray").textContent = statsGray.entropy;

    document.getElementById("stats2MinR").textContent = statsR.min;
    document.getElementById("stats2MinG").textContent = statsG.min;
    document.getElementById("stats2MinB").textContent = statsB.min;
    document.getElementById("stats2MinGray").textContent = statsGray.min;

    document.getElementById("stats2MaxR").textContent = statsR.max;
    document.getElementById("stats2MaxG").textContent = statsG.max;
    document.getElementById("stats2MaxB").textContent = statsB.max;
    document.getElementById("stats2MaxGray").textContent = statsGray.max;
  }

  handleStatsSecondImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusText = document.getElementById("statsImage2Status");

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        this.statsSecondImage = img;
        this.statsSecondImageData = ctx.getImageData(
          0,
          0,
          img.width,
          img.height
        );

        // Update status
        if (statusText) {
          if (
            this.currentImage &&
            (img.width !== this.currentImage.width ||
              img.height !== this.currentImage.height)
          ) {
            statusText.textContent = `✅ ${img.width}x${img.height} (akan di-resize)`;
            statusText.className = "status-text warning";
          } else {
            statusText.textContent = `✅ ${img.width}x${img.height}`;
            statusText.className = "status-text success";
          }
        }

        // Enable analyze buttons
        document.getElementById("analyzeSecondImage").disabled = false;
        document.getElementById("analyzeMatching").disabled = false;

        console.log(
          `✅ Gambar kedua untuk Statistics berhasil di-upload: ${img.width}x${img.height}`
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  analyzeMatching() {
    if (!this.processor) {
      alert("Upload gambar pertama terlebih dahulu!");
      return;
    }

    if (!this.statsSecondImageData) {
      alert("Upload gambar kedua terlebih dahulu!");
      return;
    }

    // Get image data dari kedua gambar
    const imageData1 = this.processor.getImageData();
    let imageData2 = this.statsSecondImageData;

    // Resize imageData2 jika ukuran berbeda
    if (
      imageData1.width !== imageData2.width ||
      imageData1.height !== imageData2.height
    ) {
      imageData2 = this.processor.resizeImageDataForComparison(
        imageData2,
        imageData1.width,
        imageData1.height
      );
    }

    // Extract channel data
    const data1R = this.processor.extractChannelData(imageData1, "r");
    const data1G = this.processor.extractChannelData(imageData1, "g");
    const data1B = this.processor.extractChannelData(imageData1, "b");
    const data1Gray = this.processor.extractChannelData(imageData1, "gray");

    const data2R = this.processor.extractChannelData(imageData2, "r");
    const data2G = this.processor.extractChannelData(imageData2, "g");
    const data2B = this.processor.extractChannelData(imageData2, "b");
    const data2Gray = this.processor.extractChannelData(imageData2, "gray");

    // Calculate Pearson Correlation
    const pearsonR = this.processor.pearsonCorrelation(data1R, data2R);
    const pearsonG = this.processor.pearsonCorrelation(data1G, data2G);
    const pearsonB = this.processor.pearsonCorrelation(data1B, data2B);
    const pearsonGray = this.processor.pearsonCorrelation(data1Gray, data2Gray);

    // Calculate Chi-Square distance (perlu histogram)
    const hist1R = this.processor.calculateHistogram(imageData1, "r");
    const hist1G = this.processor.calculateHistogram(imageData1, "g");
    const hist1B = this.processor.calculateHistogram(imageData1, "b");
    const hist1Gray = this.processor.calculateHistogram(imageData1, "gray");

    const hist2R = this.processor.calculateHistogram(imageData2, "r");
    const hist2G = this.processor.calculateHistogram(imageData2, "g");
    const hist2B = this.processor.calculateHistogram(imageData2, "b");
    const hist2Gray = this.processor.calculateHistogram(imageData2, "gray");

    const chiR = this.processor.chiSquareDistance(hist1R, hist2R);
    const chiG = this.processor.chiSquareDistance(hist1G, hist2G);
    const chiB = this.processor.chiSquareDistance(hist1B, hist2B);
    const chiGray = this.processor.chiSquareDistance(hist1Gray, hist2Gray);

    // Calculate Euclidean Distance
    const eucR = this.processor.euclideanDistance(data1R, data2R);
    const eucG = this.processor.euclideanDistance(data1G, data2G);
    const eucB = this.processor.euclideanDistance(data1B, data2B);
    const eucGray = this.processor.euclideanDistance(data1Gray, data2Gray);

    // Calculate Manhattan Distance
    const manhR = this.processor.manhattanDistance(data1R, data2R);
    const manhG = this.processor.manhattanDistance(data1G, data2G);
    const manhB = this.processor.manhattanDistance(data1B, data2B);
    const manhGray = this.processor.manhattanDistance(data1Gray, data2Gray);

    // Calculate SSIM
    const ssim = this.processor.structuralSimilarity(imageData1, imageData2);

    // Display results
    this.displayMatchingStats(
      pearsonR,
      pearsonG,
      pearsonB,
      pearsonGray,
      chiR,
      chiG,
      chiB,
      chiGray,
      eucR,
      eucG,
      eucB,
      eucGray,
      manhR,
      manhG,
      manhB,
      manhGray,
      ssim
    );

    // Display images preview
    this.displayMatchingImages(imageData1, imageData2);

    console.log("✅ Analisis matching berhasil dihitung!");
  }

  displayMatchingStats(
    pearsonR,
    pearsonG,
    pearsonB,
    pearsonGray,
    chiR,
    chiG,
    chiB,
    chiGray,
    eucR,
    eucG,
    eucB,
    eucGray,
    manhR,
    manhG,
    manhB,
    manhGray,
    ssim
  ) {
    const statsDiv = document.getElementById("matchingStats");
    statsDiv.classList.remove("hidden");

    // Update Pearson Correlation
    document.getElementById("matchPearsonR").textContent = pearsonR.toFixed(4);
    document.getElementById("matchPearsonG").textContent = pearsonG.toFixed(4);
    document.getElementById("matchPearsonB").textContent = pearsonB.toFixed(4);
    document.getElementById("matchPearsonGray").textContent =
      pearsonGray.toFixed(4);

    // Update Chi-Square
    document.getElementById("matchChiR").textContent = chiR;
    document.getElementById("matchChiG").textContent = chiG;
    document.getElementById("matchChiB").textContent = chiB;
    document.getElementById("matchChiGray").textContent = chiGray;

    // Update Euclidean Distance
    document.getElementById("matchEucR").textContent = eucR;
    document.getElementById("matchEucG").textContent = eucG;
    document.getElementById("matchEucB").textContent = eucB;
    document.getElementById("matchEucGray").textContent = eucGray;

    // Update Manhattan Distance
    document.getElementById("matchManhR").textContent = manhR;
    document.getElementById("matchManhG").textContent = manhG;
    document.getElementById("matchManhB").textContent = manhB;
    document.getElementById("matchManhGray").textContent = manhGray;

    // Update SSIM
    document.getElementById("matchSSIM").textContent = ssim;

    // Calculate average Pearson correlation
    const pearsonAvg = (
      (parseFloat(pearsonR) +
        parseFloat(pearsonG) +
        parseFloat(pearsonB) +
        parseFloat(pearsonGray)) /
      4
    ).toFixed(4);
    document.getElementById("pearsonAvg").textContent = pearsonAvg;
    document.getElementById("ssimValue").textContent = ssim;

    // Determine match status
    let matchStatus = "Tidak Mirip";
    if (parseFloat(pearsonAvg) > 0.9 && parseFloat(ssim) > 0.9) {
      matchStatus = "✅ Sangat Mirip (Sama)";
    } else if (parseFloat(pearsonAvg) > 0.7 && parseFloat(ssim) > 0.7) {
      matchStatus = "🟡 Mirip";
    } else if (parseFloat(pearsonAvg) > 0.5) {
      matchStatus = "🟠 Agak Mirip";
    } else if (parseFloat(pearsonAvg) < 0) {
      matchStatus = "🔴 Sangat Berbeda (Terbalik)";
    }

    document.getElementById("matchStatus").textContent = matchStatus;
  }

  displayMatchingImages(imageData1, imageData2) {
    // Draw first image
    const canvas1 = document.getElementById("statsCanvas1");
    canvas1.width = imageData1.width;
    canvas1.height = imageData1.height;
    const ctx1 = canvas1.getContext("2d");
    ctx1.putImageData(imageData1, 0, 0);

    // Draw second image (resized ke ukuran yang sama jika perlu)
    const canvas2 = document.getElementById("statsCanvas2");
    canvas2.width = imageData2.width;
    canvas2.height = imageData2.height;
    const ctx2 = canvas2.getContext("2d");
    ctx2.putImageData(imageData2, 0, 0);
  }
}

// Initialize the app
new TabManager();
new PixelReader();

console.log("🎨 Image Processing App initialized!");
console.log(
  "✨ Features: Pixel Data, Binary/Grayscale, Brightness, Arithmetic, Boolean, Geometry"
);
console.log("📚 Beginner-friendly mode: ON");
console.log("🌙 Dark theme: ACTIVE");

// Welcome message untuk first-time users
setTimeout(() => {
  const welcomeGuide = document.getElementById("welcomeGuide");
  if (welcomeGuide && !sessionStorage.getItem("visited")) {
    welcomeGuide.style.animation = "fadeIn 0.5s ease";
    sessionStorage.setItem("visited", "true");
  }
}, 500);

// Add keyboard shortcuts hint
document.addEventListener("keydown", (e) => {
  // Ctrl+H untuk toggle welcome guide
  if (e.ctrlKey && e.key === "h") {
    e.preventDefault();
    const welcomeGuide = document.getElementById("welcomeGuide");
    if (welcomeGuide) {
      welcomeGuide.classList.toggle("hidden");
    }
  }
});
