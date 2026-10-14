import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
  Navigate,
  Link,
} from 'react-router-dom';
import { ARTICLES } from './data/articles';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AboutPage } from './pages/AboutPage';

// Scroll to top automatically when location changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

// Redirect legacy /article/:slug to /:slug
function LegacyArticleRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/${slug}`} replace />;
}

// 404 Not Found Page
function NotFoundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
      <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#d9381e] font-bold block">
        404 — Page Not Found
      </span>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 uppercase">
        Page Not Found
      </h1>
      <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
        The requested URL does not match any publication article or category in our archives.
      </p>
      <div className="pt-3 flex items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-block bg-[#121211] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 hover:bg-[#d9381e] transition-colors rounded-[2px]"
        >
          Return Home
        </Link>
        <Link
          to="/articles"
          className="inline-block bg-white border border-[#e6e5df] text-stone-700 text-xs font-bold uppercase tracking-wider px-5 py-3 hover:border-stone-400 transition-colors rounded-[2px]"
        >
          Browse All 10 Cases
        </Link>
      </div>
    </div>
  );
}

function MainLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Keyboard shortcut Cmd+K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectArticle = (slug: string) => {
    navigate(`/${slug}`);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8] text-[#1c1917]">
      <ScrollToTop />

      {/* Editorial Navbar */}
      <Navbar
        currentPath={location.pathname}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        <Routes>
          {/* 1. Homepage: / */}
          <Route
            path="/"
            element={
              <HomePage
                articles={ARTICLES}
                onSelectArticle={handleSelectArticle}
                onNavigate={handleNavigate}
              />
            }
          />

          {/* 2. All Articles Directory: /articles */}
          <Route
            path="/articles"
            element={
              <ArticlesPage
                articles={ARTICLES}
                onSelectArticle={handleSelectArticle}
              />
            }
          />

          {/* 3. Categories Overview: /categories */}
          <Route
            path="/categories"
            element={
              <CategoriesPage
                articles={ARTICLES}
                onSelectArticle={handleSelectArticle}
              />
            }
          />

          {/* 4. Category Filtered View: /categories/:category */}
          <Route
            path="/categories/:category"
            element={
              <CategoriesPage
                articles={ARTICLES}
                onSelectArticle={handleSelectArticle}
              />
            }
          />

          {/* 5. Editorial About Manifesto: /about */}
          <Route path="/about" element={<AboutPage />} />

          {/* 6. Legacy Route Alias /article/:slug -> /:slug */}
          <Route path="/article/:slug" element={<LegacyArticleRedirect />} />

          {/* 7. Individual Article Detail: /:slug (e.g. /why-is-matcha-suddenly-everywhere) */}
          <Route
            path="/:slug"
            element={
              <ArticleDetailPage
                allArticles={ARTICLES}
                onSelectArticle={handleSelectArticle}
                onNavigate={handleNavigate}
              />
            }
          />

          {/* 8. Fallback 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Editorial Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Interactive Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectArticle={handleSelectArticle}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}
