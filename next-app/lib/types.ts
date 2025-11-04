export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  seo?: {
    title?: string;
    metaDesc?: string;
    image?: string;
  };
};
