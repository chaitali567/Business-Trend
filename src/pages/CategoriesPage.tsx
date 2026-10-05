import React, { useState } from 'react';
import { Article, Category } from '../types';
import { CATEGORIES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { Layers } from 'lucide-react';

interface CategoriesPageProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
  activeCategory?: string | null;
  onSelectCategory?: (category: string) => void;
}

const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  'Viral Trends':
    'Unpacking the rapid ascent, creator mechanics, and monetization engines behind spontaneous global internet frenzies.',
  'Consumer Psychology':
    'The neurological biases, loss aversion, cognitive shortcuts, and status signaling driving everyday purchase decisions.',
  'Social Media':
    'Algorithmic architecture, recommendation models, retention curves, and the engineering of human attention.',
  'Fashion & Beauty':
    'The evolution of cosmetic formulas, fast-follow supply chains, luxury prestige, and the disruptive #dupe economy.',
  'Food & Lifestyle':
    'How beverage rituals, boutique cafés, and wellness branding transform basic agricultural goods into high-margin luxury.',
  'Business & Marketing':
    'Behind-the-scenes corporate turnarounds, retail drop mechanics, subscription economics, and strategic positioning.',
  'Pop Culture':
    'Collectibles, the 20-year nostalgia pendulum, designer toys, and subcultural fandoms crossing into the mainstream.',
  'Technology':
    'Software business models, recurring billing engines, hardware monetization, and platform shifts.',
};

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  articles,
  onSelectArticle,
  activeCategory = null,
  onSelectCategory,
}) => {
  const [selectedCat, setSelectedCat] = useState<string | null>(activeCategory);

  const matchingArticles = articles.filter(
    (a) => !selectedCat || a.category === selectedCat
  );

  const handleCategoryClick = (cat: string) => {
    setSelectedCat(cat);
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-[#e6e5df] pb-6 space-y-2">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#d9381e]">
          <Layers className="w-3.5 h-3.5" />
          <span>Subject Directory</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-[#121211] uppercase tracking-tight">
          Browse by Subject Matter
        </h1>
        <p className="text-stone-600 text-sm max-w-2xl leading-relaxed">
          Eight distinct analytical verticals mapping modern consumer culture, behavioral psychology, and commercial strategy.
        </p>
      </div>

      {/* Category Selection Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CATEGORIES.map((cat) => {
          const count = articles.filter((a) => a.category === cat).length;
          const isSelected = selectedCat === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`p-4 text-left border transition-all cursor-pointer rounded-[2px] ${
                isSelected
                  ? 'bg-[#121211] text-white border-[#121211]'
                  : 'bg-white text-stone-800 border-[#e6e5df] hover:border-stone-400'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span
                  className={`font-bold uppercase tracking-[0.14em] text-[9px] ${
                    isSelected ? 'text-[#d9381e]' : 'text-stone-400'
                  }`}
                >
                  Vertical
                </span>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-stone-400' : 'text-stone-500'}`}>
                  {count} {count === 1 ? 'case' : 'cases'}
                </span>
              </div>
              <h3 className="font-display text-sm sm:text-base leading-snug">
                {cat}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Focus Vertical Info */}
      {selectedCat && (
        <div className="bg-white p-6 border-l-2 border-[#d9381e] border-y border-r border-[#e6e5df] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d9381e]">
              Selected Vertical
            </span>
            <button
              onClick={() => setSelectedCat(null)}
              className="text-xs text-stone-500 hover:text-stone-900 underline cursor-pointer"
            >
              Show all cases
            </button>
          </div>
          <h2 className="font-display text-2xl text-[#121211]">
            {selectedCat}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
            {CATEGORY_DESCRIPTIONS[selectedCat as Category] ||
              'Investigating the underlying business and psychological forces.'}
          </p>
        </div>
      )}

      {/* Articles Display */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-stone-500 font-medium pb-2 border-b border-[#e6e5df]">
          <span>
            Displaying {matchingArticles.length} {matchingArticles.length === 1 ? 'case study' : 'case studies'}{' '}
            {selectedCat ? `under ${selectedCat}` : 'across all verticals'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {matchingArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
              variant="standard"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
