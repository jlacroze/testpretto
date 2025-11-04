# Projet Migration Gatsby → Next.js

Ce projet est une migration d’un site Gatsby existant vers Next.js afin d’optimiser les performances, la résilience, et le SEO, tout en permettant un build incrémental et une prévisualisation rapide pour les équipes de contenu.

---

## 1. Choix de la Stack

- **Framework : Next.js 14+ (App Router)**  
  Justification :
  - Support natif du **Incremental Static Regeneration (ISR)** pour des builds rapides et incrémentaux.
  - **TypeScript** intégré pour un code robuste et typé.
  - Gestion simplifiée du **SEO et des metadata dynamiques** via `generateMetadata()`.
  - Flexibilité pour intégrer des sources externes (WordPress, APIs, RSS, etc.).
- **CSS Modules** pour le style localisé, permettant d’éviter les conflits globaux.
- **React 19+** pour le rendu côté client et l’utilisation des dernières fonctionnalités.

---

## 2. Stratégie de Rendering

- **ISR (Incremental Static Regeneration)** :
  - Chaque page d’article est générée statiquement à la première requête puis régénérée toutes les `revalidate = 60s`.
  - Avantage : les builds complets sont évités même avec 1500+ pages.
- **SSG (Static Site Generation)** pour la page d’accueil avec la liste des articles mockés.
- **SSR** limité à certaines routes dynamiques si besoin, mais la majorité du site reste **pré-générée statiquement**.

---

## 3. Stratégie de Caching

- Les pages statiques sont **cachées côté CDN** (Vercel ou autre hébergeur compatible Next.js) pour un accès rapide à 500k visiteurs/mois.
- ISR permet de **rafraîchir uniquement les pages modifiées** sans rebuild complet.
- Les appels API externes (WordPress, RSS, Trustpilot) utilisent une logique de **retry et fallback** pour garantir la disponibilité même si l’API est temporairement down.

---

## 4. SEO Implementation

- **Structured Data (JSON-LD)** pour chaque article :

```ts
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      author: { "@type": "Person", name: "Pretto" },
      datePublished: post.date,
      dateModified: post.modified,
      url: `https://www.pretto.fr/${post.slug}`,
    }),
  }}
/>
```

## Installation

1. **Cloner le dépôt :**
```bash
git clone https://github.com/jlacroze/testpretto.git

cd testpretto

npm install

npm run dev

Vous devriez avoir cette structure de projet :

app/
  [slug]/page.tsx         # Page article dynamique
  [slug]/page.module.css
  page.tsx                # Page d'accueil avec liste des articles
  page.module.css
  rss/route.ts             # Génération du flux RSS
sitemap.ts                 # Génération du sitemap
lib/
  types.ts                 # Types TypeScript
  fetchWithRetry.ts        # Wrapper fetch résilient
