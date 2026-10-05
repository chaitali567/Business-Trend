import React, { useEffect, useState } from 'react';
import { Article } from '../types';
import { ShareToolbar } from '../components/ShareToolbar';
import { ArticleCard } from '../components/ArticleCard';
import { ArrowLeft, Clock, Calendar, CheckCircle2, Lightbulb, TrendingUp, BookOpen } from 'lucide-react';

interface ArticleDetailPageProps {
  article: Article;
  allArticles: Article[];
  onSelectArticle: (slug: string) => void;
  onNavigate: (path: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  allArticles,
  onSelectArticle,
  onNavigate,
}) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    document.title = `${article.title} — The Business Behind the Trend`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', article.shortDescription);
    }
  }, [article]);

  useEffect(() => {
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
    <article className="min-h-screen bg-[#fbfbfa] pb-24">
      {/* Header Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-10 space-y-6">
        {/* Breadcrumb Navigation */}
        <nav
          className="flex items-center gap-2 text-xs text-stone-500 font-medium"
          aria-label="Breadcrumb"
        >
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate(`/categories/${encodeURIComponent(article.category)}`)}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            {article.category}
          </button>
          <span>/</span>
          <span className="text-stone-400 truncate max-w-[200px] sm:max-w-xs">
            {article.title}
          </span>
        </nav>

        {/* Back Link */}
        <div>
          <button
            onClick={() => onNavigate('/articles')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-[#d9381e] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </button>
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

      {/* Hero Image Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <figure className="space-y-2">
          <div className="overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-stone-100 border border-[#e6e5df]">
            <img
              src={article.heroImage}
              alt={article.heroImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          {article.heroImageCaption && (
            <figcaption className="text-xs text-stone-500 text-left pt-1 font-mono">
              {article.heroImageCaption}
            </figcaption>
          )}
        </figure>
      </div>

      {/* Main Editorial Grid: Sticky TOC Sidebar + Proportional Reading Measure */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sticky Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
            <div className="p-5 bg-white border border-[#e6e5df] space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#e6e5df] text-[11px] font-bold uppercase tracking-[0.14em] text-stone-800">
                <BookOpen className="w-3.5 h-3.5 text-[#d9381e]" />
                <span>Contents</span>
              </div>

              <nav className="space-y-1 text-xs">
                {article.toc.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left py-1.5 transition-colors cursor-pointer leading-snug ${
                      activeSection === item.id
                        ? 'text-[#d9381e] font-bold pl-2 border-l-2 border-[#d9381e]'
                        : 'text-stone-600 hover:text-stone-900 pl-2 border-l-2 border-transparent'
                    }`}
                  >
                    <span className="text-stone-400 mr-1.5 font-mono text-[10px]">
                      0{idx + 1}.
                    </span>
                    {item.title}
                  </button>
                ))}
              </nav>

              <div className="pt-3 border-t border-[#e6e5df] space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-stone-600 bg-stone-100 px-2 py-0.5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Reading Column (Strict 68ch max measure) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Lead Hook */}
            <div className="p-5 sm:p-6 bg-stone-50 border-l-2 border-[#d9381e]">
              <p className="text-lg sm:text-xl font-normal leading-relaxed text-[#121211]">
                {article.hook}
              </p>
            </div>

            {/* Structured Sections */}
            <div className="prose-editorial">
              {article.sections.map((section, idx) => (
                <section key={section.id} id={section.id} className="scroll-mt-24 space-y-3">
                  <h2>
                    <span className="text-stone-400 font-mono text-sm mr-2 font-normal">
                      0{idx + 1} /
                    </span>
                    {section.title}
                  </h2>

                  <div
                    dangerouslySetInnerHTML={{ __html: section.content }}
                    className="space-y-4"
                  />

                  {section.quote && (
                    <blockquote className="my-6">
                      <p className="font-accent-serif font-normal italic text-lg text-stone-800">
                        “{section.quote.text}”
                      </p>
                      <cite className="block text-xs font-sans not-italic text-stone-500 mt-2 font-semibold">
                        — {section.quote.source}
                      </cite>
                    </blockquote>
                  )}

                  {section.keyPoints && section.keyPoints.length > 0 && (
                    <div className="my-6 bg-stone-50 border-l-2 border-stone-400 p-4 space-y-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-stone-700">
                        Operational Takeaway:
                      </p>
                      <ul className="text-xs sm:text-sm text-stone-700 space-y-1 pl-4 list-disc">
                        {section.keyPoints.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* "Why It Matters" Callout */}
            <div className="bg-[#121211] text-white p-6 sm:p-8 space-y-3 border-l-4 border-[#d9381e]">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#d9381e]">
                <TrendingUp className="w-4 h-4" />
                <span>Macro Implication</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-white">
                Why It Matters
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {article.whyItMatters}
              </p>
            </div>

            {/* "What Brands Can Learn" Section */}
            <div className="bg-white p-6 sm:p-8 border border-[#e6e5df] space-y-4">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#d9381e]">
                <Lightbulb className="w-4 h-4" />
                <span>Strategic Playbook</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-[#121211]">
                What Brands Can Learn
              </h3>
              <div className="space-y-3 pt-2">
                {article.whatBrandsCanLearn.map((lesson, lIdx) => (
                  <div key={lIdx} className="flex items-start gap-3 text-sm text-stone-700">
                    <span className="font-mono text-xs font-bold text-[#d9381e] bg-[#d9381e]/10 px-2 py-0.5 rounded-[2px] shrink-0 mt-0.5">
                      0{lIdx + 1}
                    </span>
                    <p className="leading-relaxed">{lesson}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Executive Takeaways */}
            <div className="bg-stone-50 p-6 sm:p-8 border border-[#e6e5df] space-y-4">
              <h3 className="font-display text-xl text-[#121211] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Key Executive Takeaways</span>
              </h3>
              <ul className="space-y-2 text-sm text-stone-700 pl-4 list-disc">
                {article.keyTakeaways.map((item, kIdx) => (
                  <li key={kIdx} className="leading-relaxed">
                    {item}
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
              <button
                onClick={() => onNavigate('/articles')}
                className="inline-flex items-center gap-1.5 text-stone-600 hover:text-[#d9381e] uppercase tracking-wider cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to All Articles</span>
              </button>
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
