import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  Check,
  Clock,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { Article, ARTICLES } from '../data/articles';
import { ArticlePostMovement } from './ArticlePostMovement';
import { ArticlePostPeriod } from './ArticlePostPeriod';
import { ArticlePostTabs } from './ArticlePostTabs';
import { ArticlePostCollapse } from './ArticlePostCollapse';

interface ArticleViewProps {
  articleId: string;
  onBack: () => void;
  onNavigateArticle: (id: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  articleId,
  onBack,
  onNavigateArticle
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSizeClass, setFontSizeClass] = useState<'text-base' | 'text-lg' | 'text-xl'>('text-base');
  const [scrollProgress, setScrollProgress] = useState(0);

  const article = ARTICLES.find(a => a.id === articleId) || ARTICLES[0];
  const currentIndex = ARTICLES.findIndex(a => a.id === article.id);
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : ARTICLES[0];
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [articleId]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.subtitle,
          url: window.location.href
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const renderContent = () => {
    switch (article.id) {
      case 'post-movement':
        return <ArticlePostMovement />;
      case 'post-period':
        return <ArticlePostPeriod />;
      case 'post-tabs':
        return <ArticlePostTabs />;
      case 'post-collapse':
        return <ArticlePostCollapse />;
      default:
        return <ArticlePostMovement />;
    }
  };

  return (
    <div className="w-full">
      {/* Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-[var(--text-main)] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
      />

      {/* Top Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-main)] hover:bg-[var(--glass-hover)] transition-all shadow-sm cursor-pointer hover:-translate-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium text-sm">Back</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Font Size Adjusters */}
          <div className="inline-flex items-center bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full p-1 text-xs text-[var(--text-muted)]">
            <button
              onClick={() => setFontSizeClass('text-base')}
              className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                fontSizeClass === 'text-base'
                  ? 'bg-[var(--text-main)] text-[var(--bg-color)] font-semibold'
                  : 'hover:text-[var(--text-main)]'
              }`}
              title="Standard font size"
            >
              A
            </button>
            <button
              onClick={() => setFontSizeClass('text-lg')}
              className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer text-sm ${
                fontSizeClass === 'text-lg'
                  ? 'bg-[var(--text-main)] text-[var(--bg-color)] font-semibold'
                  : 'hover:text-[var(--text-main)]'
              }`}
              title="Larger font size"
            >
              A+
            </button>
            <button
              onClick={() => setFontSizeClass('text-xl')}
              className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer text-base font-bold ${
                fontSizeClass === 'text-xl'
                  ? 'bg-[var(--text-main)] text-[var(--bg-color)] font-semibold'
                  : 'hover:text-[var(--text-main)]'
              }`}
              title="Largest font size"
            >
              A++
            </button>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-main)] hover:bg-[var(--glass-hover)] transition-all text-xs font-medium cursor-pointer"
            title="Share this essay"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Title & Editorial Metadata */}
      <header className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--text-main)] text-[var(--bg-color)] mb-4">
          {article.tag}
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-main)] leading-tight mb-4">
          {article.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-[var(--text-light)] mb-6">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {article.date}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
        </div>
        <p className="text-lg sm:text-xl text-[var(--text-muted)] font-light leading-relaxed max-w-3xl mx-auto italic border-l-2 sm:border-l-0 sm:border-y border-[var(--glass-border)] py-4 px-4 sm:px-0">
          {article.subtitle}
        </p>
      </header>

      {/* Article Body */}
      <article className={`max-w-3xl mx-auto ${fontSizeClass}`}>
        {renderContent()}
      </article>

      {/* Article Footer & Next Article Link */}
      <div className="max-w-3xl mx-auto mt-16 pt-10 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-center justify-between gap-6">
        {prevArticle ? (
          <button
            onClick={() => onNavigateArticle(prevArticle.id)}
            className="flex flex-col items-start gap-1 p-4 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-hover)] transition-all cursor-pointer w-full sm:w-1/2 text-left"
          >
            <span className="text-xs uppercase tracking-wider text-[var(--text-light)] flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Previous Essay
            </span>
            <span className="font-heading font-bold text-sm sm:text-base text-[var(--text-main)] line-clamp-1">
              {prevArticle.shortTitle}
            </span>
          </button>
        ) : (
          <div className="hidden sm:block sm:w-1/2" />
        )}

        {nextArticle && nextArticle.id !== article.id && (
          <button
            onClick={() => onNavigateArticle(nextArticle.id)}
            className="flex flex-col items-end gap-1 p-4 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-hover)] transition-all cursor-pointer w-full sm:w-1/2 text-right"
          >
            <span className="text-xs uppercase tracking-wider text-[var(--text-light)] flex items-center gap-1">
              Next Essay <ArrowRight className="w-3 h-3" />
            </span>
            <span className="font-heading font-bold text-sm sm:text-base text-[var(--text-main)] line-clamp-1">
              {nextArticle.shortTitle}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
