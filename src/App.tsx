import React, { useState, useEffect } from 'react';
import { ARTICLES, CATEGORIES } from './data/articles';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [searchOpen, setSearchOpen] = useState(false);

  // Sync with browser history popstate (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

  const navigateTo = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectArticle = (slug: string) => {
    navigateTo(`/article/${slug}`);
  };

  // Route parsing
  const renderCurrentView = () => {
    // 1. Article Detail Page: /article/:slug
    if (currentPath.startsWith('/article/')) {
      const slug = currentPath.replace('/article/', '').split('?')[0].split('/')[0];
      const article = ARTICLES.find((a) => a.slug === slug);
      if (article) {
        return (
          <ArticleDetailPage
            article={article}
            allArticles={ARTICLES}
            onSelectArticle={handleSelectArticle}
            onNavigate={navigateTo}
          />
        );
      }
      // Fallback if slug not found
      return (
        <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
          <h2 className="font-editorial-serif text-3xl font-bold text-stone-900">
            Article Not Found
          </h2>
          <p className="text-stone-600 text-sm">
            The requested analysis may have moved or does not exist.
          </p>
          <button
            onClick={() => navigateTo('/articles')}
            className="inline-block bg-[#1c1917] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 hover:bg-[#c23b22] transition-colors"
          >
            Return to Article Archive
          </button>
        </div>
      );
    }

    // 2. Articles Directory: /articles
    if (currentPath === '/articles') {
      return (
        <ArticlesPage
          articles={ARTICLES}
          onSelectArticle={handleSelectArticle}
        />
      );
    }

    // 3. Category Specific Page: /categories/:category
    if (currentPath.startsWith('/categories/')) {
      const encodedCat = currentPath.replace('/categories/', '').split('?')[0];
      const categoryName = decodeURIComponent(encodedCat);
      return (
        <CategoriesPage
          articles={ARTICLES}
          onSelectArticle={handleSelectArticle}
          activeCategory={categoryName}
          onSelectCategory={(cat) => navigateTo(`/categories/${encodeURIComponent(cat)}`)}
        />
      );
    }

    // 4. Categories Overview: /categories
    if (currentPath === '/categories') {
      return (
        <CategoriesPage
          articles={ARTICLES}
          onSelectArticle={handleSelectArticle}
          onSelectCategory={(cat) => navigateTo(`/categories/${encodeURIComponent(cat)}`)}
        />
      );
    }

    // 5. About Page: /about
    if (currentPath === '/about') {
      return <AboutPage />;
    }

    // Default: Home Page
    return (
      <HomePage
        articles={ARTICLES}
        onSelectArticle={handleSelectArticle}
        onNavigate={navigateTo}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8] text-[#1c1917]">
      {/* Editorial Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">{renderCurrentView()}</main>

      {/* Editorial Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Global Interactive Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectArticle={handleSelectArticle}
      />
    </div>
  );
}
