import styles from "./page.module.css";
import Link from "next/link";
import { Post } from "../lib/types";

//  ISR : permet la génération statique avec revalidation toutes les 60 secondes
export const revalidate = 60; // ISR

// Mock de 3 articles
//  Résilience : contenu mocké
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

// Composant page d'accueil
export default function HomePage() {
  return (
    <main className={styles.container}>
      <h1>Actualités Pretto 🏡</h1>

      {/*  Performance : affichage statique de la liste, rapide */}
      {/*  TypeScript : mockPosts est typé, map garantit sécurité des props */}
      <ul className={styles.list}>
        {mockPosts.map((post) => (
          <li key={post.id} className={styles.item}>
            {/*  Génération statique / ISR : chaque lien renvoie à [slug]/page.tsx */}
            <Link href={`/${post.slug}`}>
              {/*  SEO / accessibilité : titres h2 pour chaque article */}
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <small>
                Publié le {new Date(post.date).toLocaleDateString()}
              </small>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
