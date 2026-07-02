/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow swapping placeholder food imagery for remote assets (e.g. a CMS/CDN)
    // by adding hostnames here. Local files in /public need no entry.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // The shipped placeholders are first-party SVGs in /public/images.
    // When you replace them with real .jpg/.webp photos you can remove these.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
