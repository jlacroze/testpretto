import styles from "./page.module.css";
import { Post } from "../../lib/types";
import { Metadata } from "next";

//  TypeScript propre : typage de Params et Post
type Params = { slug?: string | string[] };

// Mock des articles (identique à l'accueil)
//  Résilience : contenu mocké pour éviter un échec si WordPress est down
//  TypeScript : Post est typé
const mockPosts: Post[] = [
  {
    id: 1,
    slug: "pret-immobilier",
    title: "Tout savoir sur le prêt immobilier",
    excerpt: "Découvrez comment obtenir le meilleur taux pour votre prêt...",
    content: "<p>Contenu complet de l'article sur le prêt immobilier...</p>",
    date: "2025-11-03",
    modified: "2025-11-03",
  },
  {
    id: 2,
    slug: "renegociation-taux",
    title: "Faut-il renégocier son taux en 2025 ?",
    excerpt:
      "Les taux changent rapidement — on vous explique comment en profiter...",
    content: "<p>Contenu complet sur la renégociation des taux...</p>",
    date: "2025-11-02",
    modified: "2025-11-02",
  },
  {
    id: 3,
    slug: "assurance-emprunteur",
    title: "L'assurance emprunteur expliquée",
    excerpt: "Tout ce que vous devez savoir sur l'assurance emprunteur...",
    content: "<p>Contenu complet sur l'assurance emprunteur...</p>",
    date: "2025-11-01",
    modified: "2025-11-01",
  },
];

//  ISR : page statique avec revalidation toutes les 60 secondes
export const revalidate = 60;

//  Metadata SEO dynamique
//  Génération statique optimisée : Next.js App Router appelle generateMetadata avant le rendu
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params; //  ISR / App Router : params est un promise
  const slugParam = resolvedParams.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  if (!slug) return { title: "Article introuvable" }; //  Résilience

  const post = mockPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article introuvable" }; //  Résilience

  return {
    title: post.title, //  SEO : titre dynamique
    description: post.excerpt, //  SEO : meta description
    openGraph: {
      title: post.title, //  SEO / OG : title
      description: post.excerpt, // SEO / OG : description
      url: `https://www.pretto.fr/${post.slug}`, //  SEO / OG : URL
      type: "article", //  SEO / OG : type article
    },
    alternates: { canonical: `https://www.pretto.fr/${post.slug}` }, //  SEO : canonical dynamique
  };
}

//  Page article avec ISR, SEO et résilience
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const resolvedParams = await params;
  const slugParam = resolvedParams.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  if (!slug) return <p>Slug introuvable</p>; //  Résilience : fallback

  const post = mockPosts.find((p) => p.slug === slug);
  if (!post)
    return (
      <p>
        Le contenu est temporairement indisponible. Veuillez réessayer plus
        tard.
      </p>
    ); //  Résilience

  return (
    <main className={styles.container}>
      {/*  SEO / Accessibilité : titre h1 dynamique */}
      <h1>{post.title}</h1>
      {/*  Performance : contenu statique ou ISR, rendu rapide */}
      <article
        className={styles.articleContent}
        dangerouslySetInnerHTML={{ __html: post.content }} //  Résilience / mock
      />
    </main>
  );
}
