import React, { useState } from 'react';
import { Share2, Bookmark, Check, Twitter, Linkedin, Printer } from 'lucide-react';
import { Article } from '../types';

interface ShareToolbarProps {
  article: Article;
}

export const ShareToolbar: React.FC<ShareToolbarProps> = ({ article }) => {
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(() => {
    try {
      const saved = localStorage.getItem('tb_bookmarked_' + article.slug);
      return !!saved;
    } catch {
      return false;
    }
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleBookmark = () => {
    try {
      if (isBookmarked) {
        localStorage.removeItem('tb_bookmarked_' + article.slug);
        setIsBookmarked(false);
      } else {
        localStorage.setItem('tb_bookmarked_' + article.slug, 'true');
        setIsBookmarked(true);
      }
    } catch {
      setIsBookmarked(!isBookmarked);
    }
  };

  const shareTwitter = () => {
    const text = encodeURIComponent(
      `"${article.title}" — The Business Behind the Trend`
    );
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const shareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center justify-between py-3.5 border-y border-[#e6e5df] text-stone-600 text-xs">
      <div className="flex items-center gap-2">
        <span className="font-bold uppercase tracking-wider text-stone-400 text-[10px]">
          Share:
        </span>
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 hover:bg-stone-200/60 rounded-[2px] transition-colors cursor-pointer text-stone-700 font-medium"
          title="Copy link"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>

        <button
          onClick={shareTwitter}
          className="p-1.5 hover:bg-stone-200/60 rounded-[2px] transition-colors cursor-pointer text-stone-700"
          title="Share to X"
        >
          <Twitter className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={shareLinkedIn}
          className="p-1.5 hover:bg-stone-200/60 rounded-[2px] transition-colors cursor-pointer text-stone-700"
          title="Share to LinkedIn"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleToggleBookmark}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] transition-colors cursor-pointer ${
            isBookmarked
              ? 'bg-[#d9381e]/10 text-[#d9381e] font-semibold'
              : 'hover:bg-stone-200/60 text-stone-700 font-medium'
          }`}
          title="Save to bookmarks"
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          <span>{isBookmarked ? 'Saved' : 'Save'}</span>
        </button>

        <button
          onClick={handlePrint}
          className="p-1.5 hover:bg-stone-200/60 rounded-[2px] transition-colors cursor-pointer text-stone-700 hidden sm:inline-flex"
          title="Print or Save PDF"
        >
          <Printer className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
