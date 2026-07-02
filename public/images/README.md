# Bilder / Images

This folder ships **first-party SVG placeholders** so the site renders fully
out-of-the-box. Replace them with real, optimized food photography — the layout
and lazy-loading stay identical.

## How to swap in real photos

1. Drop your optimized images here (recommended: **WebP or AVIF**, sRGB).
2. Either keep the same filenames, **or** point to the new files in
   `content/site.ts` (every image path lives there).
3. If you switch from `.svg` to `.jpg/.webp`, you can remove the
   `dangerouslyAllowSVG` block in `next.config.mjs` (only needed for the SVG placeholders).

## Recommended assets & sizes

| File | Used in | Suggested size | Subject |
|------|---------|----------------|---------|
| `hero-teppanyaki` | Hero background | 1920×1200 | Teppanyaki grill, flames, action |
| `about-sushi-counter` | About section | 1080×1290 (5:6) | Fresh sushi / sashimi platter |
| `station-sushi` | Stations | 1000×1250 (4:5) | Sushi chef rolling maki |
| `station-teppanyaki` | Stations | 1000×1250 (4:5) | Teppanyaki plate, steam |
| `station-wok` | Stations | 1000×1250 (4:5) | Flaming wok |
| `gallery-1 … gallery-6` | Gallery grid | 1200×1200 (1&4: 1200×1600 tall) | Dishes, ambience |

## Tips
- Compress before committing (e.g. Squoosh, `sharp`, or an image CDN).
- Keep alt text meaningful — edit the `alt` fields in `content/site.ts`.
- For best LCP, the hero image is `priority` loaded; keep it well-compressed.
