# Analyse Critique du Code Gatsby

## 1. Temps de build trop long

Le code crée toutes les pages WordPress à chaque build (`createPages`) et génère le sitemap/RSS manuellement.  
Avec 1500+ pages, le build prend ~15 min et augmente avec le contenu.  
**Impact** : les rédacteurs ne peuvent pas voir les previews rapidement → productivité réduite.

**Code problématique :**

```js
posts.forEach((post, index) => {
  const previousPost = index === 0 ? null : posts[index - 1]
  const nextPost = index === posts.length - 1 ? null : posts[index + 1]

  createPage({
    path: `/actualites/${post.slug}`,
    component: require.resolve('./src/templates/Post.js'),
    context: {
      id: post.id,
      slug: post.slug,
      previousPost,
      nextPost,
      rates: rates.slice(0, 10), // Last 10 rates
    }
  })
  //  Problème : Chaque page est générée individuellement → build complet très long pour un grand nombre de page
})


## 2. Récupération des données externe non résiliente

- Fetch des taux Pretto et des avis Trustpilot synchrones et paginés.
- Pas de retry si l’API tombe, pas de gestion des erreurs.
  **Impact** : build fragile et risque d’échec complet si une API externe est indisponible.

// Fetch Trustpilot reviews avec pagination
let allReviews = []
let page = 1
let hasMore = true

while (hasMore) {
  const reviewsResponse = await fetch(`https://api.trustpilot.com/reviews?page=${page}`)
  const data = await reviewsResponse.json()
  allReviews = [...allReviews, ...data.reviews]
  hasMore = data.hasNextPage
  page++
  //Problème : Fetch synchrone et boucle sans retry → si l’API tombe, le build échoue
}

## 3. Génération manuelle de sitemap et RSS

- Utilisation de `fs.writeFileSync` sur toutes les pages → non scalable.
- Pas d’automatisation ni de vérification de contenu.
  **Impact** : risque d’erreurs SEO et de pages manquantes dans le sitemap.

const fs = require('fs')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${posts.map(post => `
    <url>
      <loc>https://www.pretto.fr/actualites/${post.slug}</loc>
      <lastmod>${post.modified}</lastmod>
    </url>
  `).join('')}
</urlset>
`
fs.writeFileSync('./public/sitemap-posts.xml', sitemap)
//Problème : Génération manuelle et synchrone → non scalable si le nombre de pages augmente

## Conclusion

Le code actuel fonctionne mais n’est pas scalable ni résilient.
La migration vers un framework moderne avec build incrémental (Next.js ISR) permettra :

- des builds rapides,
- une meilleure résilience des fetchs externes,
- un sitemap et RSS automatiques et fiables.
```
