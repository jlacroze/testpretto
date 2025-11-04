// app/rss/route.ts
import { NextResponse } from "next/server";

//  Route API qui génère un flux RSS dynamique
//  Performance : ne nécessite pas de build complet, génération à la volée
export async function GET() {
  //  Résilience minimale : récupération des 10 derniers posts via API WordPress
  // (on pourrait ajouter un try/catch pour gérer un WordPress down)
  const res = await fetch(
    "https://example.com/wp-json/wp/v2/posts?per_page=10"
  );
  const posts = await res.json();

  //  Performance : map rapide sur un nombre limité de posts (10)
  //  SEO : génération d'un flux RSS pour indexation et abonnés
  const items = posts
    .map(
      (post: any) => `
      <item>
        <title>${post.title.rendered}</title>
        <link>https://www.pretto.fr/actualites/${post.slug}</link>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description>${post.excerpt.rendered}</description>
      </item>`
    )
    .join("");

  //  SEO : RSS valide pour que les moteurs/agrégateurs récupèrent les articles
  const xml = `<?xml version="1.0"?>
  <rss version="2.0">
    <channel>
      <title>Pretto Actualités</title>
      <link>https://www.pretto.fr/actualites</link>
      <description>Dernières actualités immobilières</description>
      ${items}
    </channel>
  </rss>`;

  //  TypeScript propre : NextResponse utilisé pour retourner XML
  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
