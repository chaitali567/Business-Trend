import React from 'react';
import { Article } from '../types';
import { ArrowUpRight, Clock } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (slug: string) => void;
  variant?: 'standard' | 'horizontal' | 'compact' | 'featured' | 'numbered';
  indexNumber?: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  variant = 'standard',
  indexNumber,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelect(article.slug);
  };

  // 1. FEATURED CARD (Side by side on desktop, stacked with image on top on mobile)
  if (variant === 'featured') {
    return (
      <article
        onClick={handleClick}
        className="group cursor-pointer grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center bg-white border border-[#e6e5df] p-5 sm:p-7 lg:p-8 hover:border-stone-400 transition-colors duration-200 w-full min-w-0 overflow-hidden"
      >
        {/* Image Column */}
        <div className="w-full md:col-span-6 min-w-0 max-w-full overflow-hidden shrink-0">
          <div className="w-full aspect-[16/10] overflow-hidden bg-stone-100 relative min-w-0 max-w-full rounded-[2px]">
            <img
              src={article.heroImage}
              alt={article.heroImageAlt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out block"
            />
          </div>
        </div>

        {/* Text Column */}
        <div className="w-full md:col-span-6 min-w-0 flex flex-col justify-between py-1 space-y-4">
          <div className="space-y-3">
            {/* Category Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#d9381e]">
              <span>{article.category}</span>
              <span className="text-stone-300">/</span>
              <span className="text-stone-500 font-medium tracking-normal">Lead Analysis</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl text-[#121211] group-hover:text-[#d9381e] transition-colors leading-[1.18] break-words">
              {article.title}
            </h2>

            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
              {article.shortDescription}
            </p>
          </div>

          <div className="pt-4 border-t border-[#e6e5df] flex items-center justify-between text-xs text-stone-500 font-medium">
            <div className="flex items-center gap-2">
              <span className="text-stone-900 font-semibold">{article.publishedDate}</span>
              <span className="text-stone-300">·</span>
              <span>{article.readTime}</span>
            </div>

            <span className="inline-flex items-center gap-1 font-semibold text-[#121211] group-hover:text-[#d9381e] transition-colors">
              <span>Read Case</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  // 2. HORIZONTAL EDITORIAL CARD (Side by side on desktop, stacked on mobile)
  if (variant === 'horizontal') {
    return (
      <article
        onClick={handleClick}
        className="group cursor-pointer grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 items-center pb-6 border-b border-[#e6e5df] transition-colors w-full min-w-0 overflow-hidden"
      >
        {/* Image Column */}
        <div className="w-full sm:col-span-5 min-w-0 max-w-full overflow-hidden shrink-0">
          <div className="w-full aspect-[16/10] overflow-hidden bg-stone-100 relative min-w-0 max-w-full rounded-[2px]">
            <img
              src={article.heroImage}
              alt={article.heroImageAlt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out block"
            />
          </div>
        </div>

        {/* Text Column */}
        <div className="w-full sm:col-span-7 min-w-0 space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#d9381e]">
            <span>{article.category}</span>
            <span className="text-stone-300">/</span>
            <span className="text-stone-500 font-normal tracking-normal">{article.readTime}</span>
          </div>

          <h3 className="font-display text-base sm:text-lg text-[#121211] group-hover:text-[#d9381e] transition-colors leading-snug break-words">
            {article.title}
          </h3>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {article.shortDescription}
          </p>

          <div className="pt-1 text-[11px] text-stone-500 flex items-center justify-between">
            <span className="text-stone-600 font-medium">{article.publishedDate}</span>
            <span className="text-stone-400 font-medium">{article.readTime}</span>
          </div>
        </div>
      </article>
    );
  }

  // 3. NUMBERED ARTICLE ROW (Editorial list)
  if (variant === 'numbered') {
    const formattedNumber = indexNumber !== undefined ? String(indexNumber).padStart(2, '0') : '01';
    return (
      <article
        onClick={handleClick}
        className="group cursor-pointer py-4 border-b border-[#e6e5df] flex items-start gap-4 transition-colors hover:border-stone-400 w-full min-w-0"
      >
        <span className="font-mono text-sm sm:text-base font-bold text-stone-400 group-hover:text-[#d9381e] transition-colors pt-0.5 shrink-0">
          {formattedNumber}
        </span>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#d9381e]">
            <span>{article.category}</span>
            <span className="text-stone-300">/</span>
            <span className="text-stone-500 font-normal tracking-normal">{article.readTime}</span>
          </div>

          <h3 className="font-display text-base sm:text-lg text-[#121211] group-hover:text-[#d9381e] transition-colors leading-snug break-words">
            {article.title}
          </h3>

          <p className="text-stone-600 text-xs leading-relaxed line-clamp-2 pt-0.5">
            {article.shortDescription}
          </p>
        </div>

        <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#d9381e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-1" />
      </article>
    );
  }

  // 4. COMPACT ROW (Minimal text-only card)
  if (variant === 'compact') {
    return (
      <article
        onClick={handleClick}
        className="group cursor-pointer py-3.5 border-b border-[#e6e5df] space-y-1.5 transition-colors w-full min-w-0"
      >
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#d9381e]">
          <span>{article.category}</span>
          <span className="text-stone-300">/</span>
          <span className="text-stone-400 font-normal tracking-normal">{article.readTime}</span>
        </div>

        <h4 className="font-display text-sm sm:text-base text-[#121211] group-hover:text-[#d9381e] transition-colors leading-snug break-words">
          {article.title}
        </h4>

        <p className="text-stone-600 text-xs line-clamp-2">
          {article.shortDescription}
        </p>
      </article>
    );
  }

  // 5. STANDARD GRID CARD (Clean 16/10 image with structured content below)
  return (
    <article
      onClick={handleClick}
      className="group cursor-pointer flex flex-col bg-white border border-[#e6e5df] hover:border-stone-400 transition-colors duration-200 h-full w-full min-w-0 overflow-hidden"
    >
      <div className="w-full aspect-[16/10] overflow-hidden bg-stone-100 relative min-w-0 max-w-full shrink-0">
        <img
          src={article.heroImage}
          alt={article.heroImageAlt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out block"
        />
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3 min-w-0">
        <div className="space-y-2">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#d9381e]">
            <span>{article.category}</span>
            <span className="text-stone-300">/</span>
            <span className="text-stone-500 font-normal tracking-normal flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {article.readTime}
            </span>
          </div>

          {/* Contemporary Sans Title */}
          <h3 className="font-display text-lg sm:text-xl text-[#121211] group-hover:text-[#d9381e] transition-colors leading-snug break-words">
            {article.title}
          </h3>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {article.shortDescription}
          </p>
        </div>

        <div className="pt-3 border-t border-[#e6e5df] flex items-center justify-between text-xs text-stone-500">
          <span className="font-medium text-stone-700">{article.publishedDate}</span>
          <span className="text-stone-400 font-medium">{article.readTime}</span>
        </div>
      </div>
    </article>
  );
};
