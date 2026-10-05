import React from 'react';
import { Article } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { NewsletterBox } from '../components/NewsletterBox';
import { ArrowRight, ArrowUpRight, TrendingUp, Briefcase, Brain, Share2, Compass, Layers } from 'lucide-react';

interface HomePageProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  articles,
  onSelectArticle,
  onNavigate,
}) => {
  // Featured lead story (Matcha)
  const featuredArticle = articles.find((a) => a.slug === 'why-is-matcha-suddenly-everywhere') || articles[0];

  // SECTION 1: TRENDING NOW (Matcha, Stanley, Labubu)
  const trendingArticles = articles.filter((a) =>
    ['how-labubu-became-a-global-obsession', 'why-does-everyone-want-a-stanley'].includes(a.slug)
  );

  // SECTION 2: THE BUSINESS BEHIND IT (Stanley, Subscriptions)
  const businessArticles = articles.filter((a) =>
    ['why-does-everyone-want-a-stanley', 'why-is-everything-becoming-a-subscription'].includes(a.slug)
  );

  // SECTION 3: WHY WE BUY (Consumer psychology: Labubu, Scarcity Drops, Gen Z)
  const whyWeBuyArticles = articles.filter((a) =>
    ['how-labubu-became-a-global-obsession', 'why-limited-edition-products-sell-so-fast', 'why-brands-are-obsessed-with-gen-z'].includes(a.slug)
  );

  // SECTION 4: INTERNET MADE IT BIG (Going Viral, Influencer businesses)
  const internetArticles = articles.filter((a) =>
    ['the-business-of-going-viral', 'how-influencers-became-businesses'].includes(a.slug)
  );

  // SECTION 5: LATEST STORIES (All 10 numbered overview)
  const latestArticles = [...articles].reverse();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="border-b border-[#e6e5df] pt-8 sm:pt-12 pb-12 sm:pb-16 bg-[#fbfbfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-end">
            <div className="lg:col-span-8 space-y-4">
              {/* Eyebrow */}
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d9381e]">
                <span>Trend Intelligence</span>
                <span className="text-stone-300">/</span>
                <span className="text-stone-600 font-mono">By Chaitali Kalal · Issue 01</span>
              </div>

              {/* Main Headline (Contemporary Bold Sans) */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#121211] leading-[1.12] uppercase">
                We don’t just tell you <br />
                what’s trending. <br />
                <span className="text-stone-500 font-normal">We explain why it wins.</span>
              </h1>
            </div>

            {/* Editorial Descriptor & CTA */}
            <div className="lg:col-span-4 space-y-4 lg:border-l lg:border-[#e6e5df] lg:pl-8 pb-1">
              <p className="text-stone-600 text-sm leading-relaxed">
                A digital publication analyzing the business models, evolutionary psychology, marketing mechanics, and creator economies behind today’s cultural obsessions.
              </p>

              <div className="flex items-center gap-4 pt-1">
                <button
                  onClick={() => onNavigate('/articles')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#121211] text-white px-4 py-2.5 hover:bg-[#d9381e] transition-colors cursor-pointer rounded-[2px]"
                >
                  <span>Explore All 10 Cases</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onNavigate('/about')}
                  className="text-xs font-semibold text-stone-600 hover:text-[#121211] transition-colors py-2"
                >
                  About Manifesto →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED STORY (Asymmetrical Lead Diagnostic) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#e6e5df]">
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-stone-500 font-bold">
              Featured Diagnostic
            </span>
            <span className="text-xs text-stone-400 font-medium">Editor’s Selection</span>
          </div>

          <ArticleCard
            article={featuredArticle}
            onSelect={onSelectArticle}
            variant="featured"
          />
        </div>
      </section>

      {/* 3. 01 / TRENDING NOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex items-end justify-between pb-3 border-b border-[#e6e5df]">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#d9381e] font-bold block">
                01 / Focus
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#121211] uppercase tracking-tight">
                Trending Now
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/categories/Viral%20Trends')}
              className="text-xs font-semibold text-stone-500 hover:text-[#d9381e] transition-colors flex items-center gap-1"
            >
              <span>View Viral Index</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Asymmetrical 2-column: 1 Horizontal Lead + 1 Numbered list */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <ArticleCard
                article={trendingArticles[0]}
                onSelect={onSelectArticle}
                variant="standard"
              />
            </div>

            <div className="lg:col-span-5 bg-white border border-[#e6e5df] p-6 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 font-bold block pb-2 border-b border-[#e6e5df]">
                Trending Cultural Case
              </span>
              <ArticleCard
                article={trendingArticles[1]}
                onSelect={onSelectArticle}
                variant="numbered"
                indexNumber={2}
              />
              <div className="pt-2">
                <p className="text-xs text-stone-500 leading-relaxed italic">
                  “When a functional blue-collar outdoor tool turns into an everyday fashion accessory, margins expand by over 400%.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 02 / THE BUSINESS BEHIND IT */}
      <section className="bg-stone-50/80 border-y border-[#e6e5df] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-end justify-between pb-3 border-b border-[#e6e5df]">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#d9381e] font-bold block">
                02 / Strategy
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#121211] uppercase tracking-tight">
                The Business Behind It
              </h2>
            </div>
            <p className="hidden md:block text-xs text-stone-500 max-w-xs text-right">
              P&L balance-sheets, recurring subscription valuations, and agile fast-follow supply networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {businessArticles.map((art) => (
              <ArticleCard
                key={art.id}
                article={art}
                onSelect={onSelectArticle}
                variant="horizontal"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. 03 / WHY WE BUY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between pb-3 border-b border-[#e6e5df]">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#d9381e] font-bold block">
              03 / Psychology
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#121211] uppercase tracking-tight">
              Why We Buy
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/categories/Consumer%20Psychology')}
            className="text-xs font-semibold text-stone-500 hover:text-[#d9381e] transition-colors flex items-center gap-1"
          >
            <span>All Psychology Cases</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {whyWeBuyArticles.map((art, idx) => (
            <ArticleCard
              key={art.id + idx}
              article={art}
              onSelect={onSelectArticle}
              variant="standard"
            />
          ))}
        </div>
      </section>

      {/* 6. 04 / INTERNET MADE IT BIG */}
      <section className="bg-white border-y border-[#e6e5df] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-end justify-between pb-3 border-b border-[#e6e5df]">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#d9381e] font-bold block">
                04 / Virality
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#121211] uppercase tracking-tight">
                Internet Made It Big
              </h2>
            </div>
            <p className="text-xs text-stone-500 hidden sm:block">
              Short-form algorithms, sound indexing, and creator equity transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <ArticleCard
                article={internetArticles[0]}
                onSelect={onSelectArticle}
                variant="featured"
              />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-stone-50 p-6 border border-[#e6e5df] space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#d9381e] font-bold">
                  The Zero-CAC Moat
                </span>
                <h3 className="font-display text-xl text-[#121211] leading-snug">
                  How Creators Are Outcompeting Legacy CPG Giants
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  While traditional brands spend millions on customer acquisition, top creators utilize parasocial loyalty to launch nine-figure brands with zero ad spend.
                </p>
              </div>

              <ArticleCard
                article={internetArticles[1]}
                onSelect={onSelectArticle}
                variant="horizontal"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. 05 / LATEST STORIES (Numbered Archive Stream) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between pb-3 border-b border-[#e6e5df]">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#d9381e] font-bold block">
              05 / Archive
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#121211] uppercase tracking-tight">
              Complete Editorial Collection
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/articles')}
            className="text-xs font-bold uppercase tracking-wider text-[#d9381e] hover:underline"
          >
            Open Filtered Search →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 divide-y md:divide-y-0 divide-[#e6e5df]">
          {latestArticles.slice(0, 8).map((art, idx) => (
            <ArticleCard
              key={art.id}
              article={art}
              onSelect={onSelectArticle}
              variant="numbered"
              indexNumber={idx + 1}
            />
          ))}
        </div>
      </section>

      {/* 8. NEWSLETTER SIGNUP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterBox />
      </section>
    </div>
  );
};
