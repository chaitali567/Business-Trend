import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Clock, FileText } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>(ARTICLES);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults(ARTICLES);
      return;
    }

    const filtered = ARTICLES.filter((art) => {
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchDesc = art.shortDescription.toLowerCase().includes(q);
      const matchCat = art.category.toLowerCase().includes(q);
      const matchTags = art.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchAuthor = art.author.name.toLowerCase().includes(q);
      const matchHook = art.hook.toLowerCase().includes(q);
      const matchWhyItMatters = art.whyItMatters.toLowerCase().includes(q);
      const matchSections = art.sections.some(
        (s) => s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q)
      );
      return (
        matchTitle ||
        matchDesc ||
        matchCat ||
        matchTags ||
        matchAuthor ||
        matchHook ||
        matchWhyItMatters ||
        matchSections
      );
    });

    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (slug: string) => {
    onSelectArticle(slug);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[#fbfbfa] border border-[#e6e5df] shadow-xl overflow-hidden flex flex-col max-h-[85vh] rounded-[2px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#e6e5df] bg-white">
          <Search className="w-4 h-4 text-stone-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search trends, marketing strategies, or psychology (e.g. Stanley, Labubu, Matcha, Gen Z)..."
            className="flex-1 bg-transparent border-none outline-hidden text-sm text-stone-900 placeholder-stone-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 p-1 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 p-1 text-stone-400 hover:text-stone-700 rounded-sm cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick topic buttons */}
        <div className="px-4 py-2 bg-stone-50 border-b border-[#e6e5df] flex items-center gap-1.5 overflow-x-auto text-[11px] text-stone-600">
          <span className="font-mono text-stone-400 uppercase tracking-wider text-[10px] shrink-0">
            Suggested:
          </span>
          {['Matcha', 'Stanley', 'Labubu', 'Gen Z', 'Dupes', 'Subscriptions', 'Virality'].map(
            (term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="shrink-0 bg-white hover:bg-stone-200 border border-[#e6e5df] px-2 py-0.5 rounded-[2px] transition-colors cursor-pointer text-[11px]"
              >
                {term}
              </button>
            )
          )}
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-2 divide-y divide-[#e6e5df] flex-1">
          <div className="flex items-center justify-between pb-1.5 text-xs text-stone-400 font-mono">
            <span>
              {results.length} {results.length === 1 ? 'diagnostic' : 'diagnostics'} found
            </span>
            <span>ESC to exit</span>
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <FileText className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="font-display text-base text-stone-800">
                No matching analysis found for "{query}"
              </p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try searching for topics like "matcha", "influencer", "stanley", "scarcity", or "dupe".
              </p>
            </div>
          ) : (
            results.map((article) => (
              <div
                key={article.id}
                onClick={() => handleSelect(article.slug)}
                className="pt-3 group cursor-pointer hover:bg-white p-2.5 rounded-[2px] transition-colors"
              >
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#d9381e] mb-1">
                  <span>{article.category}</span>
                  <span className="text-stone-300">/</span>
                  <span className="text-stone-500 font-normal tracking-normal flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-display text-base text-stone-900 group-hover:text-[#d9381e] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                  {article.shortDescription}
                </p>

                <div className="flex items-center justify-between mt-2 pt-1 text-[11px] text-stone-400">
                  <span className="text-stone-500 font-medium">{article.publishedDate}</span>
                  <span className="flex items-center gap-1 text-[#d9381e] font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Case
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
