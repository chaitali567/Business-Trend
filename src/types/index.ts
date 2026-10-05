export type Category =
  | 'Viral Trends'
  | 'Consumer Psychology'
  | 'Social Media'
  | 'Fashion & Beauty'
  | 'Food & Lifestyle'
  | 'Business & Marketing'
  | 'Pop Culture'
  | 'Technology';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  content: string; // HTML markup or paragraphs
  keyPoints?: string[];
  quote?: {
    text: string;
    source: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: Category;
  author: Author;
  publishedDate: string;
  readTime: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageCaption?: string;
  tags: string[];
  featured?: boolean;
  editorialSection?: 'trending' | 'business' | 'why_we_buy' | 'internet' | 'whats_next';
  toc: { id: string; title: string }[];
  hook: string;
  sections: ArticleSection[];
  whyItMatters: string;
  whatBrandsCanLearn: string[];
  keyTakeaways: string[];
  relatedSlugs: string[];
}
