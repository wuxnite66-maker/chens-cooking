import type { MetadataRoute } from "next";

// TODO: nach Domain-Registrierung auf die echte URL umstellen
const BASE = "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/buffet", "/speisekarte", "/galerie", "/ueber-uns", "/reservierung", "/kontakt"];
  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
