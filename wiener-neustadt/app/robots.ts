import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    // TODO: sitemap-URL nach Domain-Registrierung eintragen
  };
}
