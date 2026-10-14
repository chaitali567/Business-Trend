import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/articles';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121211] text-white border-t border-stone-800 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-5 space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-white uppercase tracking-tight">
              The Business Behind the Trend
            </h2>
            <p className="text-[#d9381e] text-xs font-bold uppercase tracking-widest">
              Why things become popular — and who makes money from them.
            </p>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-md pt-1">
              A contemporary digital publication exploring consumer behavior, algorithmic virality,
              marketing strategy, and the economic architectures driving today’s cultural obsessions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
              Publication
            </h3>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link
                  to="/"
                  onClick={() => handleNav('/')}
                  className="hover:text-white transition-colors block"
                >
                  Front Page
                </Link>
              </li>
              <li>
                <Link
                  to="/articles"
                  onClick={() => handleNav('/articles')}
                  className="hover:text-white transition-colors block"
                >
                  All 10 Case Studies
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  onClick={() => handleNav('/categories')}
                  className="hover:text-white transition-colors block"
                >
                  Topic Directory
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={() => handleNav('/about')}
                  className="hover:text-white transition-colors block"
                >
                  Editorial Manifesto
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
              Coverage Verticals
            </h3>
            <div className="grid grid-cols-1 gap-1.5 text-xs text-stone-300">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <Link
                  key={cat}
                  to={`/categories/${encodeURIComponent(cat)}`}
                  onClick={() => handleNav(`/categories/${encodeURIComponent(cat)}`)}
                  className="text-left hover:text-white transition-colors truncate block"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Back to top */}
          <div className="md:col-span-2 space-y-4 flex flex-col justify-between items-start md:items-end">
            <div className="md:text-right">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                Standards
              </h3>
              <p className="text-[11px] text-stone-400 mt-1">
                Zero native ads. 100% independent market diagnostics.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-stone-300 hover:text-white border border-stone-700 px-3 py-2 rounded-[2px] hover:border-stone-500 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} The Business Behind the Trend. Founded & published by Chaitali Kalal.</p>
          <div className="flex items-center space-x-6">
            <Link to="/about" onClick={() => handleNav('/about')} className="hover:text-stone-300">
              Ethics & Rigor
            </Link>
            <Link to="/articles" onClick={() => handleNav('/articles')} className="hover:text-stone-300">
              Archive
            </Link>
            <span className="text-stone-600 font-mono">Designed for GitHub & Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
