import React, { useState, useMemo } from 'react';
import { Article } from '../types';
import { CATEGORIES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { Search, Filter, SlidersHorizontal, X, Calendar } from 'lucide-react';

interface ArticlesPageProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
  initialCategory?: string | null;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({
  articles,
  onSelectArticle,
  initialCategory = null,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [sortBy, setSortBy] = useState<'newest' | 'readTime' | 'alpha'>('newest');

  const filteredArticles = useMemo(() => {
    return articles
      .filter((art) => {
        if (selectedCategory && art.category !== selectedCategory) {
          return false;
        }

        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = art.title.toLowerCase().includes(q);
        const matchDesc = art.shortDescription.toLowerCase().includes(q);
        const matchCat = art.category.toLowerCase().includes(q);
        const matchAuthor = art.author.name.toLowerCase().includes(q);
        const matchTags = art.tags.some((t) => t.toLowerCase().includes(q));
        const matchHook = art.hook.toLowerCase().includes(q);
        return matchTitle || matchDesc || matchCat || matchAuthor || matchTags || matchHook;
      })
      .sort((a, b) => {
        if (sortBy === 'alpha') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'readTime') {
          const aTime = parseInt(a.readTime, 10) || 0;
          const bTime = parseInt(b.readTime, 10) || 0;
          return bTime - aTime;
        }
        return parseInt(b.id, 10) - parseInt(a.id, 10);
      });
  }, [articles, selectedCategory, searchQuery, sortBy]);

  const hasActiveFilters = !!selectedCategory || !!searchQuery.trim();

  const resetFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-[#e6e5df] pb-6 space-y-2">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#d9381e]">
          <Calendar className="w-3.5 h-3.5" />
          <span>The Diagnostic Archive</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-[#121211] uppercase tracking-tight">
          All Analyses & Case Studies
        </h1>
        <p className="text-stone-600 text-sm max-w-2xl leading-relaxed">
          Ten comprehensive business breakdowns detailing why modern trends erupt, the marketing architectures behind them, and who captures the profit.
        </p>
      </div>

      {/* Control Bar: Search, Category Buttons, Sorting */}
      <div className="space-y-4 bg-white p-5 sm:p-6 border border-[#e6e5df]">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic, brand, psychological trigger (e.g. Stanley, Labubu, Matcha, Gen Z, Dupe)..."
            className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-[#e6e5df] text-stone-900 placeholder-stone-400 text-sm focus:outline-hidden focus:border-[#121211] transition-colors rounded-[2px]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filters (Clean modern segmented controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Topic:
          </span>
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 text-xs font-semibold shrink-0 transition-colors cursor-pointer border rounded-[2px] ${
              selectedCategory === null
                ? 'bg-[#121211] text-white border-[#121211]'
                : 'bg-stone-50 text-stone-700 border-[#e6e5df] hover:bg-stone-100'
            }`}
          >
            All ({articles.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = articles.filter((a) => a.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                className={`px-3 py-1 text-xs font-semibold shrink-0 transition-colors cursor-pointer border rounded-[2px] ${
                  selectedCategory === cat
                    ? 'bg-[#d9381e] text-white border-[#d9381e]'
                    : 'bg-stone-50 text-stone-700 border-[#e6e5df] hover:bg-stone-100'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Bottom Filter Summary & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#e6e5df] text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-stone-900">{filteredArticles.length}</strong> of{' '}
              {articles.length} studies
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[#d9381e] hover:underline font-semibold flex items-center gap-1 cursor-pointer ml-2"
              >
                <X className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3 h-3 text-stone-400" />
            <span className="text-stone-400 uppercase tracking-wider text-[10px] font-bold">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-50 border border-[#e6e5df] text-stone-700 text-xs py-1 px-2.5 rounded-[2px] focus:outline-hidden focus:border-[#121211] cursor-pointer"
            >
              <option value="newest">Publication Order (Default)</option>
              <option value="readTime">Longest Read Time</option>
              <option value="alpha">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="py-20 text-center bg-white border border-[#e6e5df] p-8 space-y-4">
          <p className="font-display text-2xl text-stone-800">
            No diagnostic found for your criteria.
          </p>
          <p className="text-stone-500 text-xs max-w-sm mx-auto">
            Try adjusting your search terms or clearing selected topic filters.
          </p>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 bg-[#121211] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 hover:bg-[#d9381e] transition-colors cursor-pointer rounded-[2px]"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
              variant="standard"
            />
          ))}
        </div>
      )}
    </div>
  );
};
