import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#fbfbfa]/95 backdrop-blur-md border-[#e6e5df] shadow-[0_2px_8px_rgba(0,0,0,0.03)]'
          : 'bg-[#fbfbfa] border-[#e6e5df]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo - Left */}
          <div className="flex items-center">
            <button
              onClick={() => handleLinkClick('/')}
              className="text-left group cursor-pointer focus:outline-hidden"
              aria-label="The Business Behind the Trend Homepage"
            >
              <span className="block font-display text-lg sm:text-xl tracking-tight text-[#121211] group-hover:text-[#d9381e] transition-colors uppercase">
                The Business Behind the Trend
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-[0.16em] text-stone-500 font-medium">
                By Chaitali Kalal · Why Things Become Popular & Who Makes Money
              </span>
            </button>
          </div>

          {/* Desktop Navigation - Center / Right */}
          <nav className="hidden md:flex items-center space-x-7 text-[13px] font-medium tracking-tight text-stone-700">
            <button
              onClick={() => handleLinkClick('/articles')}
              className={`hover:text-[#121211] transition-colors py-1 cursor-pointer hover-underline-animation ${
                currentPath === '/articles' ? 'text-[#121211] font-semibold text-[#d9381e]' : ''
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => handleLinkClick('/categories')}
              className={`hover:text-[#121211] transition-colors py-1 cursor-pointer hover-underline-animation ${
                currentPath.startsWith('/categories') ? 'text-[#121211] font-semibold text-[#d9381e]' : ''
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => handleLinkClick('/about')}
              className={`hover:text-[#121211] transition-colors py-1 cursor-pointer hover-underline-animation ${
                currentPath === '/about' ? 'text-[#121211] font-semibold text-[#d9381e]' : ''
              }`}
            >
              About
            </button>

            {/* Subtle Divider */}
            <span className="text-stone-300 select-none">/</span>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-[#121211] transition-colors cursor-pointer py-1"
              aria-label="Search articles"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
              <span className="hidden lg:inline text-[10px] text-stone-400 font-mono ml-0.5">⌘K</span>
            </button>

            {/* Compact Subscribe Button */}
            <button
              onClick={() => {
                const el = document.getElementById('newsletter-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  handleLinkClick('/about');
                }
              }}
              className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-[#121211] text-white px-3.5 py-1.5 hover:bg-[#d9381e] transition-colors cursor-pointer rounded-[2px]"
            >
              <span>Subscribe</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-700 hover:text-stone-900 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-800 hover:text-stone-900 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fbfbfa] border-b border-[#e6e5df] px-5 py-6 space-y-5 animate-in fade-in duration-150">
          <div className="flex flex-col space-y-4 text-base font-semibold tracking-tight text-[#121211]">
            <button
              onClick={() => handleLinkClick('/')}
              className="text-left py-1 hover:text-[#d9381e] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('/articles')}
              className="text-left py-1 hover:text-[#d9381e] transition-colors"
            >
              Latest Articles (10)
            </button>
            <button
              onClick={() => handleLinkClick('/categories')}
              className="text-left py-1 hover:text-[#d9381e] transition-colors"
            >
              Browse Categories
            </button>
            <button
              onClick={() => handleLinkClick('/about')}
              className="text-left py-1 hover:text-[#d9381e] transition-colors"
            >
              About the Publication
            </button>
          </div>

          <div className="pt-4 border-t border-[#e6e5df] flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-[#121211]"
            >
              <Search className="w-4 h-4" />
              <span>Search Archive</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('newsletter-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-[#121211] text-white px-3.5 py-2 rounded-[2px]"
            >
              <span>Subscribe Free</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
