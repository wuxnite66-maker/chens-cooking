// Bildverarbeitung – läuft vollständig im Browser (Canvas, keine Uploads,
// kein API-Key nötig). Die Funktionen sind bewusst als austauschbare
// "Provider" gebaut: Wer echte ML-Modelle (z. B. remove.bg, Replicate,
// U²-Net im Browser) einstecken will, ersetzt einfach die jeweilige Funktion.

const PROCESS_MAX = 1600; // längste Kante beim Verarbeiten (Tempo/Qualität)

export interface ImageResult {
  dataUrl: string;
  width: number;
  height: number;
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Bild konnte nicht geladen werden"));
    img.src = src;
  });
}

function makeCanvas(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function fitDimensions(w: number, h: number, max: number) {
  if (w <= max && h <= max) return { w, h };
  const scale = max / Math.max(w, h);
  return { w: Math.round(w * scale), h: Math.round(h * scale) };
}

async function toImageData(
  src: string,
  max = PROCESS_MAX,
): Promise<{ ctx: CanvasRenderingContext2D; data: ImageData }> {
  const img = await loadImage(src);
  const { w, h } = fitDimensions(img.naturalWidth, img.naturalHeight, max);
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, w, h);
  return { ctx, data: ctx.getImageData(0, 0, w, h) };
}

function clamp(v: number) {
  return v < 0 ? 0 : v > 255 ? 255 : v;
}

// ── Hintergrund entfernen ────────────────────────────────────────────────
// Flood-Fill vom Bildrand: Pixel, die farblich den Ecken ähneln UND mit dem
// Rand verbunden sind, gelten als Hintergrund. So bleibt das Kleidungsstück
// erhalten, auch wenn es eine ähnliche Farbe wie der Hintergrund hat, solange
// es nicht direkt mit dem Rand verbunden ist.
export interface RemoveBgOptions {
  /** Zielhintergrund: Hex ("#ffffff") oder "transparent" */
  background?: string;
  /** Toleranz 0–100 (höher = mehr wird als Hintergrund erkannt) */
  tolerance?: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace("#", "");
  const n =
    m.length === 3
      ? m
          .split("")
          .map((c) => c + c)
          .join("")
      : m;
  const int = parseInt(n, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

export async function removeBackground(
  src: string,
  opts: RemoveBgOptions = {},
): Promise<ImageResult> {
  const background = opts.background ?? "#f4f4f5";
  const tolerance = opts.tolerance ?? 32;
  const { data } = await toImageData(src);
  const { width, height } = data;
  const px = data.data;

  // Referenz-Hintergrundfarbe aus den vier Ecken mitteln.
  const corners = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ];
  let rr = 0,
    gg = 0,
    bb = 0;
  for (const [x, y] of corners) {
    const i = (y * width + x) * 4;
    rr += px[i];
    gg += px[i + 1];
    bb += px[i + 2];
  }
  const bgR = rr / 4,
    bgG = gg / 4,
    bgB = bb / 4;

  // Toleranz auf Farbdistanz umrechnen (Summe der Kanaldifferenzen).
  const thresh = 30 + tolerance * 4.5;

  const isBgLike = (i: number) => {
    const d =
      Math.abs(px[i] - bgR) +
      Math.abs(px[i + 1] - bgG) +
      Math.abs(px[i + 2] - bgB);
    return d < thresh;
  };

  const mask = new Uint8Array(width * height); // 1 = Hintergrund
  const stack: number[] = [];

  // Startpunkte: alle Randpixel, die hintergrundähnlich sind.
  for (let x = 0; x < width; x++) {
    for (const y of [0, height - 1]) stack.push(y * width + x);
  }
  for (let y = 0; y < height; y++) {
    for (const x of [0, width - 1]) stack.push(y * width + x);
  }

  while (stack.length) {
    const p = stack.pop()!;
    if (mask[p]) continue;
    if (!isBgLike(p * 4)) continue;
    mask[p] = 1;
    const x = p % width;
    const y = (p - x) / width;
    if (x > 0) stack.push(p - 1);
    if (x < width - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - width);
    if (y < height - 1) stack.push(p + width);
  }

  // Maske anwenden.
  const transparent = background === "transparent";
  const [tr, tg, tb] = transparent ? [0, 0, 0] : hexToRgb(background);
  for (let p = 0; p < mask.length; p++) {
    if (!mask[p]) continue;
    const i = p * 4;
    if (transparent) {
      px[i + 3] = 0;
    } else {
      px[i] = tr;
      px[i + 1] = tg;
      px[i + 2] = tb;
    }
  }

  const out = makeCanvas(width, height);
  const octx = out.getContext("2d")!;
  octx.putImageData(data, 0, 0);
  return {
    dataUrl: out.toDataURL(transparent ? "image/png" : "image/jpeg", 0.92),
    width,
    height,
  };
}

// ── Automatische Verbesserung ────────────────────────────────────────────
export interface EnhanceOptions {
  brightness?: number; // -100..100
  contrast?: number; // -100..100
  saturation?: number; // -100..100
  sharpen?: number; // 0..100
  /** true = Werte automatisch anhand des Histogramms wählen */
  auto?: boolean;
}

export async function enhance(
  src: string,
  opts: EnhanceOptions = {},
): Promise<ImageResult> {
  const { data } = await toImageData(src);
  const px = data.data;
  const { width, height } = data;

  let brightness = opts.brightness ?? 0;
  let contrast = opts.contrast ?? 0;
  let saturation = opts.saturation ?? 0;
  const sharpen = opts.sharpen ?? 0;

  if (opts.auto) {
    // simple Auto-Werte: durchschnittliche Helligkeit messen und ausgleichen
    let sum = 0;
    for (let i = 0; i < px.length; i += 4) {
      sum += (px[i] + px[i + 1] + px[i + 2]) / 3;
    }
    const avg = sum / (px.length / 4);
    brightness = clampRange((128 - avg) * 0.45, -30, 40);
    contrast = 14;
    saturation = 12;
  }

  const cf = (259 * (contrast + 255)) / (255 * (259 - contrast));
  const satF = 1 + saturation / 100;

  for (let i = 0; i < px.length; i += 4) {
    let r = px[i],
      g = px[i + 1],
      b = px[i + 2];
    // Helligkeit
    r += brightness;
    g += brightness;
    b += brightness;
    // Kontrast
    r = cf * (r - 128) + 128;
    g = cf * (g - 128) + 128;
    b = cf * (b - 128) + 128;
    // Sättigung (um Luminanz herum)
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    r = lum + (r - lum) * satF;
    g = lum + (g - lum) * satF;
    b = lum + (b - lum) * satF;
    px[i] = clamp(r);
    px[i + 1] = clamp(g);
    px[i + 2] = clamp(b);
  }

  let result = data;
  if (sharpen > 0) result = applySharpen(data, sharpen / 100);

  const out = makeCanvas(width, height);
  out.getContext("2d")!.putImageData(result, 0, 0);
  return { dataUrl: out.toDataURL("image/jpeg", 0.92), width, height };
}

function clampRange(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

// Unsharp Mask über eine 3×3-Faltung.
function applySharpen(data: ImageData, amount: number): ImageData {
  const { width, height } = data;
  const src = data.data;
  const out = new Uint8ClampedArray(src);
  const k = amount; // Stärke
  const center = 1 + 4 * k;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4;
      for (let c = 0; c < 3; c++) {
        const o = i + c;
        const val =
          center * src[o] -
          k * src[o - 4] -
          k * src[o + 4] -
          k * src[o - width * 4] -
          k * src[o + width * 4];
        out[o] = clamp(val);
      }
    }
  }
  return new ImageData(out, width, height);
}

// ── Upscaling ────────────────────────────────────────────────────────────
// Hochwertige Neuskalierung des Browsers (bikubisch). Kein ML-Super-Resolution,
// aber ein echter, sichtbarer Qualitätsgewinn bei kleinen Bildern.
export async function upscale(
  src: string,
  factor = 2,
): Promise<ImageResult> {
  const img = await loadImage(src);
  const w = Math.round(img.naturalWidth * factor);
  const h = Math.round(img.naturalHeight * factor);
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, w, h);
  return { dataUrl: canvas.toDataURL("image/jpeg", 0.94), width: w, height: h };
}

// ── Virtuelles Model (Demo-Platzhalter) ──────────────────────────────────
// Echtes Try-on braucht ein generatives Modell. Diese Funktion stellt das
// Kleidungsstück in einem sauberen Studio-Setting mit angedeuteter
// Model-Silhouette dar – deutlich als Demo gekennzeichnet.
export async function virtualModel(src: string): Promise<ImageResult> {
  const img = await loadImage(src);
  const W = 900;
  const H = 1200;
  const canvas = makeCanvas(W, H);
  const ctx = canvas.getContext("2d")!;

  // Studio-Verlauf
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#eef1f6");
  grad.addColorStop(1, "#d7dbe4");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // weiche Model-Silhouette
  ctx.fillStyle = "rgba(120,130,150,0.18)";
  ctx.beginPath();
  ctx.ellipse(W / 2, 210, 90, 110, 0, 0, Math.PI * 2); // Kopf
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(W / 2 - 190, 340);
  ctx.quadraticCurveTo(W / 2, 300, W / 2 + 190, 340);
  ctx.lineTo(W / 2 + 150, H);
  ctx.lineTo(W / 2 - 150, H);
  ctx.closePath();
  ctx.fill();

  // Kleidungsstück mittig, mit Schatten
  const scale = Math.min((W * 0.7) / img.naturalWidth, (H * 0.62) / img.naturalHeight);
  const gw = img.naturalWidth * scale;
  const gh = img.naturalHeight * scale;
  const gx = (W - gw) / 2;
  const gy = 300;
  ctx.shadowColor = "rgba(0,0,0,0.18)";
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 20;
  ctx.drawImage(img, gx, gy, gw, gh);
  ctx.shadowColor = "transparent";

  // Demo-Badge
  ctx.fillStyle = "rgba(17,24,39,0.82)";
  ctx.font = "600 24px system-ui, sans-serif";
  const label = "KI-Model · Demo";
  const tw = ctx.measureText(label).width;
  ctx.beginPath();
  roundRect(ctx, W / 2 - tw / 2 - 16, H - 60, tw + 32, 40, 20);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.fillText(label, W / 2 - tw / 2, H - 33);

  return { dataUrl: canvas.toDataURL("image/jpeg", 0.9), width: W, height: H };
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
}

// ── Wasserzeichen (optional beim Export) ─────────────────────────────────
export async function addWatermark(
  src: string,
  text: string,
): Promise<ImageResult> {
  const img = await loadImage(src);
  const canvas = makeCanvas(img.naturalWidth, img.naturalHeight);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  const pad = Math.round(img.naturalWidth * 0.02);
  const fs = Math.max(16, Math.round(img.naturalWidth * 0.03));
  ctx.font = `600 ${fs}px system-ui, sans-serif`;
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.strokeStyle = "rgba(0,0,0,0.35)";
  ctx.lineWidth = 2;
  ctx.textBaseline = "bottom";
  ctx.strokeText(text, pad, canvas.height - pad);
  ctx.fillText(text, pad, canvas.height - pad);
  return {
    dataUrl: canvas.toDataURL("image/jpeg", 0.92),
    width: canvas.width,
    height: canvas.height,
  };
}

// ── Hilfen ───────────────────────────────────────────────────────────────
export async function getDimensions(
  src: string,
): Promise<{ width: number; height: number }> {
  const img = await loadImage(src);
  return { width: img.naturalWidth, height: img.naturalHeight };
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
