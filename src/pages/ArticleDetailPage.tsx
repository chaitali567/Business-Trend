import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Article } from '../types';
import { ARTICLES } from '../data/articles';
import { ShareToolbar } from '../components/ShareToolbar';
import { ArticleCard } from '../components/ArticleCard';
import { SEOHead } from '../components/SEOHead';
import { ArrowLeft, Clock, Calendar, CheckCircle2, Lightbulb, TrendingUp, BookOpen } from 'lucide-react';

interface ArticleDetailPageProps {
  article?: Article;
  allArticles?: Article[];
  onSelectArticle?: (slug: string) => void;
  onNavigate?: (path: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article: propArticle,
  allArticles = ARTICLES,
  onSelectArticle,
  onNavigate: propNavigate,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const onNavigate = propNavigate || ((path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const article =
    propArticle ||
    allArticles.find((a) => a.slug === slug || a.legacySlugs?.includes(slug || ''));

  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [article]);

  useEffect(() => {
    if (!article) return;
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (let i = article.sections.length - 1; i >= 0; i--) {
        const sec = article.sections[i];
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sec.id);
          return;
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#d9381e] font-bold block">
          404 Error
        </span>
        <h1 className="font-display text-3xl font-bold text-stone-900 uppercase">
          Article Not Found
        </h1>
        <p className="text-stone-600 text-sm max-w-md mx-auto">
          The requested analysis may have moved or does not exist.
        </p>
        <div className="pt-2">
          <Link
            to="/articles"
            className="inline-block bg-[#121211] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 hover:bg-[#d9381e] transition-colors rounded-[2px]"
          >
            Return to Article Archive
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = allArticles.filter((a) =>
    article.relatedSlugs.includes(a.slug)
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <article className="pb-24">
      <SEOHead
        title={article.metaTitle || article.title}
        description={article.metaDescription || article.shortDescription}
        canonicalPath={`/${article.slug}`}
        ogImage={typeof article.heroImage === 'string' ? article.heroImage : undefined}
        ogType="article"
        publishedDate={article.publishedDate}
        authorName={article.author.name}
      />

      {/* Editorial Header Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-mono text-stone-400">
          <Link to="/" className="hover:text-stone-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/articles" className="hover:text-stone-900 transition-colors">
            Articles
          </Link>
          <span>/</span>
          <Link
            to={`/categories/${encodeURIComponent(article.category)}`}
            className="hover:text-stone-900 transition-colors"
          >
            {article.category}
          </Link>
          <span>/</span>
          <span className="text-stone-400 truncate max-w-[200px] sm:max-w-xs">
            {article.title}
          </span>
        </nav>

        {/* Back Link */}
        <div>
          <Link
            to="/articles"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-[#d9381e] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </Link>
        </div>

        {/* Category Eyebrow */}
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#d9381e]">
          <span>{article.category}</span>
          <span className="text-stone-300">/</span>
          <span className="text-stone-500 font-mono tracking-normal">Investigation</span>
        </div>

        {/* Contemporary Sans Headline */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#121211] leading-[1.12]">
          {article.title}
        </h1>

        {/* Dek / Subtitle */}
        <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-normal">
          {article.shortDescription}
        </p>

        {/* Publication Byline */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#e6e5df]">
          <div className="flex items-center gap-2.5 text-xs text-stone-600 font-medium">
            <span className="font-semibold text-stone-900">The Business Behind the Trend</span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-1 text-stone-500">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              {article.publishedDate}
            </span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-1 text-stone-500">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Share & Bookmark Action Toolbar */}
        <ShareToolbar article={article} />
      </div>

      {/* Hero Visual Asset */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <figure className="space-y-3">
          <div className="overflow-hidden aspect-[16/9] bg-stone-100 border border-[#e6e5df]">
            <img
              src={article.heroImage}
              alt={article.heroImageAlt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          {article.heroImageCaption && (
            <figcaption className="text-xs text-stone-500 font-serif italic text-center max-w-2xl mx-auto">
              {article.heroImageCaption}
            </figcaption>
          )}
        </figure>
      </div>

      {/* Two-Column Reading Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sticky Table of Contents Sidebar */}
          <aside className="lg:col-span-4 hidden lg:block sticky top-24 space-y-6">
            <div className="bg-white p-5 border border-[#e6e5df] space-y-3 rounded-[2px]">
              <div className="flex items-center gap-2 pb-2 border-b border-[#e6e5df]">
                <BookOpen className="w-4 h-4 text-[#d9381e]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone-900">
                  Contents
                </span>
              </div>
              <nav className="space-y-1">
                {article.toc.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left text-xs py-1.5 px-2 rounded-[2px] transition-all cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-[#121211] text-white font-medium pl-3'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-stone-400 mr-2">
                      0{idx + 1}
                    </span>
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Diagnostic Metadata Card */}
            <div className="bg-stone-50/80 p-5 border border-[#e6e5df] space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                Tags & Verticals
              </span>
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white border border-[#e6e5df] px-2 py-0.5 text-[11px] text-stone-600 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* Core Article Body Content */}
          <div className="lg:col-span-8 space-y-12 min-w-0">
            {/* The Hook (Lead In) */}
            <div className="bg-white p-6 sm:p-8 border-l-2 border-[#d9381e] border-y border-r border-[#e6e5df]">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d9381e] block mb-2 font-mono">
                The Core Mystery
              </span>
              <p className="font-display text-lg sm:text-xl text-[#121211] leading-relaxed">
                {article.hook}
              </p>
            </div>

            {/* Sections */}
            <div className="prose-editorial space-y-12">
              {article.sections.map((section, idx) => (
                <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
                  <div className="flex items-baseline gap-3 pb-2 border-b border-[#e6e5df]">
                    <span className="font-mono text-xs font-bold text-[#d9381e]">
                      0{idx + 1}
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl text-[#121211] !m-0 !p-0">
                      {section.title}
                    </h2>
                  </div>

                  {/* Body Markup */}
                  <div
                    className="text-stone-800 leading-relaxed text-base space-y-4 font-normal"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />

                  {/* Section Key Points (if present) */}
                  {section.keyPoints && section.keyPoints.length > 0 && (
                    <div className="bg-stone-50 p-4 border border-[#e6e5df] my-4 space-y-2 rounded-[2px]">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-600 block">
                        Core Takeaways:
                      </span>
                      <ul className="space-y-1.5 text-xs text-stone-700">
                        {section.keyPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-[#d9381e] font-bold">›</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Section Quote (if present) */}
                  {section.quote && (
                    <blockquote className="my-6 pl-4 border-l-2 border-[#121211] space-y-1">
                      <p className="font-accent-serif italic text-base sm:text-lg text-stone-900 leading-relaxed">
                        "{section.quote.text}"
                      </p>
                      <cite className="block text-[11px] font-mono text-stone-500 not-italic uppercase tracking-wider">
                        — {section.quote.source}
                      </cite>
                    </blockquote>
                  )}
                </section>
              ))}
            </div>

            {/* Why It Matters Callout */}
            <div className="bg-[#121211] text-white p-6 sm:p-8 space-y-3 rounded-[2px]">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#d9381e]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>The Macro Verdict</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-white">
                Why It Matters
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {article.whyItMatters}
              </p>
            </div>

            {/* What Brands Can Learn (Bullet Matrix) */}
            <div className="bg-white p-6 sm:p-8 border border-[#e6e5df] space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#d9381e]">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Strategic Playbook</span>
              </div>
              <h3 className="font-display text-xl text-[#121211]">
                What Other Brands Can Learn
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {article.whatBrandsCanLearn.map((lesson, lIdx) => (
                  <div key={lIdx} className="flex items-start gap-2.5 p-3 bg-stone-50/70 border border-[#e6e5df]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-stone-700 leading-relaxed">{lesson}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Takeaways Summary List */}
            <div className="border border-[#e6e5df] p-6 space-y-3 bg-[#fbfbfa]">
              <h4 className="font-display text-base text-[#121211] uppercase tracking-wide">
                Key Takeaways Summary
              </h4>
              <ul className="space-y-2 text-xs text-stone-700">
                {article.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2">
                    <span className="font-mono text-stone-400 font-bold">{tIdx + 1}.</span>
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Editorial Mission Note */}
            <div className="p-5 bg-white border-l-2 border-[#d9381e] border-y border-r border-[#e6e5df] space-y-1">
              <p className="font-display text-sm text-[#121211]">
                The Business Behind the Trend
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                We look beyond viral moments and TikTok hype to explain the real business, marketing, and psychology behind popular products in plain English anyone can understand.
              </p>
            </div>

            {/* Footer Navigation */}
            <div className="pt-6 border-t border-[#e6e5df] flex items-center justify-between text-xs font-semibold">
              <Link
                to="/articles"
                className="inline-flex items-center gap-1.5 text-stone-600 hover:text-[#d9381e] uppercase tracking-wider"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to All Articles</span>
              </Link>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-stone-500 hover:text-stone-900 uppercase tracking-wider cursor-pointer"
              >
                Back to Top ↑
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 mt-16 border-t border-[#e6e5df]">
          <div className="space-y-1 mb-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#d9381e] font-bold block">
              Related Analysis
            </span>
            <h3 className="font-display text-2xl text-[#121211] uppercase tracking-tight">
              Recommended Investigations
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {relatedArticles.map((rel) => (
              <ArticleCard
                key={rel.id}
                article={rel}
                onSelect={onSelectArticle}
                variant="standard"
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
