# Audit SEO du Code Gatsby

## 1. Problèmes identifiés

### a) Structured Data manquant

Le code ne fournit aucun JSON-LD ou Schema.org pour les articles.  
**Impact** : Google n’a pas les informations pour enrichir les résultats (rich snippets).

### b) Open Graph incomplet

Les balises OG pour le partage social sont absentes ou incomplètes.  
**Impact** : mauvaise présentation des articles sur Facebook, LinkedIn ou Twitter → moins de trafic social.

### c) Canonical URLs et meta tags

Les URLs canoniques sont générées mais non garanties dynamiques, et certaines meta tags (robots, auteur, date) sont manquantes.  
**Impact** : risque de contenu dupliqué et mauvaise indexation par Google.

## 2. Solution proposée dans Next.js

- **Structured Data** : JSON-LD avec type `Article` pour chaque page.
- **Open Graph complet** : title, description, url, image, type.
- **Meta tags** : description, canonical, robots si nécessaire, dates de publication/modification au format ISO.
- **Résultat attendu** : meilleure indexation SEO, prévention du duplicate content et enrichissement des résultats Google.
