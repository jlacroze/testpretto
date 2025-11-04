// app/sitemap.ts
import type { MetadataRoute } from "next";

//  Route pour générer un sitemap XML dynamique
//  SEO : permet aux moteurs de recherche d'indexer toutes les pages articles
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  //  Résilience minimale : récupération des posts depuis WordPress
  // (on pourrait ajouter un try/catch pour gérer un WordPress down)
  const res = await fetch(
    "https://example.com/wp-json/wp/v2/posts?per_page=100" // récupère 100 articles max
  );
  const posts = await res.json();

  const baseUrl = "https://www.pretto.fr";

  //  Performance : transformation simple en URLs sitemap
  //  SEO : inclut lastModified pour chaque page → meilleure indexation
  const urls = posts.map((post: any) => ({
    url: `${baseUrl}/actualites/${post.slug}`,
    lastModified: post.modified,
  }));

  //  SEO : inclut la page d'accueil et toutes les pages articles
  return [{ url: baseUrl, lastModified: new Date().toISOString() }, ...urls];
}
