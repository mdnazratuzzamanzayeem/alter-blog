import React, { useState, useEffect } from 'react';
import { Clock, Search, BookOpen } from 'lucide-react';
import { ARTICLES } from './data/articles';
import { ArticleView } from './components/ArticleView';
import { BottomNav } from './components/BottomNav';
import { ContactForm } from './components/ContactForm';

type ViewMode = 'home' | 'blogs' | 'about' | 'contact' | 'privacy' | 'terms' | string;

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('alter-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('alter-theme', theme);
  }, [theme]);

  // Sync hash routing if user comes with a direct link (e.g. #post-period)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentView(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const openView = (viewId: string) => {
    setCurrentView(viewId);
    window.location.hash = viewId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const filteredArticles = ARTICLES.filter(art => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const isArticleView = currentView.startsWith('post-');

  return (
    <div className="relative min-h-screen text-[var(--text-main)] transition-colors duration-300">
      {/* Dynamic Ambient Blur Mesh */}
      <div className="bg-mesh" aria-hidden="true" />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-8 pb-32">
        {/* ================= HOME VIEW ================= */}
        {currentView === 'home' && (
          <section className="animate-in fade-in duration-500">
            {/* Hero (Pure and minimal) */}
            <div className="text-center mb-12 sm:mb-16 pt-4">
              <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[var(--text-main)] mb-4">
                Alter
              </h1>
              <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-light leading-relaxed">
                Dispatches and essays on education, society, and culture. A sanctuary for focused reading.
              </p>
            </div>

            {/* Bento Grid (Showing ONLY latest three blogs on home screen) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto">
              {/* Spotlight: The Country Half Its People Cannot Freely Move Through */}
              <div
                onClick={() => openView('post-movement')}
                className="md:col-span-12 p-8 sm:p-12 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-[var(--glass-shadow)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--text-main)] text-[var(--bg-color)]">
                      Society & Human Rights
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-[var(--text-main)] mb-4 leading-tight group-hover:text-[var(--text-muted)] transition-colors">
                    The Country Half Its People Cannot Freely Move Through: Patriarchy, Harassment, and the Family Travel Trap
                  </h2>
                  <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mb-6 line-clamp-3">
                    In the streets, villages, and even homes of Bangladesh in 2026, women and children live in perpetual fear. No neighbourhood feels safe. No hour of the day guarantees security. Almost daily, reports emerge of rape, gang rape, sexual assault, and murders following these violations. This is not a sporadic crisis; it is a national emergency that exposes the hollow promises of governance.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-light)] font-medium pt-2 border-t border-[var(--glass-border)]">
                  <Clock className="w-4 h-4" />
                  <span>12 min read • Oct 5, 2026</span>
                </div>
              </div>

              {/* Half Card 1: Why Does Half the Population Bleed in Silence? */}
              <div
                onClick={() => openView('post-period')}
                className="md:col-span-6 p-7 sm:p-8 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-[var(--glass-shadow)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--text-main)] text-[var(--bg-color)] mb-4">
                    Society & Health
                  </span>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--text-main)] mb-3 leading-snug group-hover:text-[var(--text-muted)] transition-colors">
                    Why Does Half the Population Bleed in Silence?
                  </h2>
                  <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                    Every single month, roughly half the people in Bangladesh and South Asia who are of reproductive age go through something that is completely normal, biologically unremarkable, and utterly essential to human continuation — and yet, somehow, it remains one of the most unspeakable subjects in the region.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-light)] font-medium pt-2 border-t border-[var(--glass-border)]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>8 min read • Sept 9, 2026</span>
                </div>
              </div>

              {/* Half Card 2: Free Tabs for SSC Toppers */}
              <div
                onClick={() => openView('post-tabs')}
                className="md:col-span-6 p-7 sm:p-8 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-[var(--glass-shadow)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--text-main)] text-[var(--bg-color)] mb-4">
                    Technology & Policy
                  </span>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--text-main)] mb-3 leading-snug group-hover:text-[var(--text-muted)] transition-colors">
                    Free Tabs for SSC Toppers
                  </h2>
                  <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                    A look at the newly announced device giveaway for SSC 2026's GPA-5 achievers, read against the country's track record with the Doel laptop and its unresolved e-waste crisis.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-light)] font-medium pt-2 border-t border-[var(--glass-border)]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>6 min read • Sept 9, 2026</span>
                </div>
              </div>
            </div>

            {/* Link to full Journal */}
            <div className="mt-10 text-center">
              <button
                onClick={() => openView('blogs')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-hover)] transition-all cursor-pointer group shadow-sm"
              >
                <span>Explore all dispatches in The Journal</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </section>
        )}

        {/* ================= JOURNAL / BLOGS VIEW ================= */}
        {currentView === 'blogs' && (
          <section className="animate-in fade-in duration-500 max-w-4xl mx-auto">
            {/* Newspaper Header */}
            <div className="text-center mb-10">
              <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text-main)] mb-2">
                The Journal
              </h1>
              <div className="text-xs sm:text-sm uppercase tracking-widest text-[var(--text-light)] font-semibold mb-6">
                Latest Dispatches & Essays
              </div>
              <div className="border-t-4 border-b border-[var(--text-main)] h-2.5 mx-auto w-full max-w-3xl" />
            </div>

            {/* Filter and Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-light)]" />
                <input
                  type="text"
                  placeholder="Search dispatches..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm text-[var(--text-main)] placeholder-[var(--text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--text-main)]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'society', label: 'Society & Rights' },
                  { id: 'policy', label: 'Policy & Tech' },
                  { id: 'education', label: 'Education' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[var(--text-main)] text-[var(--bg-color)] shadow-sm'
                        : 'bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Newspaper Feed */}
            <div className="flex flex-col gap-12">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-16 text-[var(--text-muted)]">
                  <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p>No dispatches found matching your search.</p>
                </div>
              ) : (
                filteredArticles.map((art, idx) => (
                  <article
                    key={art.id}
                    className={`pb-12 ${
                      idx !== filteredArticles.length - 1 ? 'border-b border-[var(--glass-border)]' : ''
                    }`}
                  >
                    <div className="text-xs uppercase tracking-wider text-[var(--text-light)] font-semibold mb-2">
                      {art.date} • {art.readTime}
                    </div>
                    <h2
                      onClick={() => openView(art.id)}
                      className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-3 leading-snug cursor-pointer hover:text-[var(--text-muted)] transition-colors"
                    >
                      {art.title}
                    </h2>
                    <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mb-4 text-justify">
                      {art.excerpt}
                    </p>
                    <button
                      onClick={() => openView(art.id)}
                      className="inline-block text-sm font-semibold text-[var(--text-main)] border-b border-[var(--text-main)] pb-0.5 hover:opacity-75 transition-opacity cursor-pointer"
                    >
                      Read Full Article →
                    </button>
                  </article>
                ))
              )}
            </div>
          </section>
        )}

        {/* ================= ARTICLE VIEW ================= */}
        {isArticleView && (
          <section className="animate-in fade-in duration-500">
            <ArticleView
              articleId={currentView}
              onBack={() => openView('blogs')}
              onNavigateArticle={id => openView(id)}
            />
          </section>
        )}

        {/* ================= ABOUT VIEW ================= */}
        {currentView === 'about' && (
          <section className="animate-in fade-in duration-500 max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text-main)] text-center mb-3">
              About Alter
            </h1>
            <p className="text-xl text-[var(--text-muted)] text-center font-light mb-12">
              A sanctuary for focused reading.
            </p>

            <div className="editorial-prose">
              <p>
                Alter was born out of a desire to strip away the noise of the modern web. In an era of infinite scrolling, aggressive pop-ups, and visual clutter, we wanted to create a space that respects the reader's attention.
              </p>

              <h2>Our Philosophy</h2>
              <p>
                We believe that digital experiences should feel as premium and tactile as a high-fashion editorial magazine. We believe in creating a sense of depth and hierarchy without relying on heavy, distracting imagery.
              </p>

              <p>
                Typography is our primary medium. The contrast between the elegant, structural strokes of Playfair Display and the clean, utilitarian geometry of Inter creates a tension that is both beautiful and highly readable.
              </p>

              <h2>The Mission</h2>
              <p>
                To provide thorough, rigorous dispatches on critical social developments, policy debates, and human rights issues in Bangladesh and South Asia that demand clear, honest inspection rather than polite silence.
              </p>
            </div>
          </section>
        )}

        {/* ================= CONTACT VIEW ================= */}
        {currentView === 'contact' && (
          <section className="animate-in fade-in duration-500 max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text-main)] text-center mb-3">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-muted)] text-center font-light mb-12">
              Have a project in mind or just want to say hello? Send us a message.
            </p>

            <ContactForm />
          </section>
        )}

        {/* ================= PRIVACY POLICY VIEW ================= */}
        {currentView === 'privacy' && (
          <section className="animate-in fade-in duration-500 max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-main)] text-center mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-[var(--text-light)] text-center mb-10">Last updated: July 2026</p>

            <div className="editorial-prose">
              <h2>1. Data Collection</h2>
              <p>
                We believe in data minimalism. Alter only collects the information strictly necessary to provide you with a seamless reading experience. We do not use third-party tracking cookies or invasive analytics.
              </p>

              <h2>2. Use of Information</h2>
              <p>
                Any information submitted through our contact forms is used solely for the purpose of responding to your inquiry. We will never sell, rent, or distribute your email address to third parties.
              </p>

              <h2>3. Local Storage</h2>
              <p>
                We use local browser storage to save your reading preferences (such as your Light/Dark theme settings) to ensure a consistent experience across sessions. This data never leaves your device.
              </p>
            </div>
          </section>
        )}

        {/* ================= TERMS VIEW ================= */}
        {currentView === 'terms' && (
          <section className="animate-in fade-in duration-500 max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-main)] text-center mb-2">
              Terms of Service
            </h1>
            <p className="text-sm text-[var(--text-light)] text-center mb-10">Please read these terms carefully before using Alter.</p>

            <div className="editorial-prose">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using Alter, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>

              <h2>2. Intellectual Property</h2>
              <p>
                All content published on Alter, including text, typography choices, layout design, and code structure, is the property of Alter Studio. You may not reproduce, distribute, or create derivative works without explicit permission.
              </p>

              <h2>3. User Conduct</h2>
              <p>
                Users agree to use the site for lawful purposes only. Any attempt to compromise the security of the site, bypass navigation structures, or scrape content automatically is strictly prohibited.
              </p>
            </div>
          </section>
        )}

        {/* Subtle Editorial Footer */}
        <footer className="mt-24 pt-8 border-t border-[var(--glass-border)] text-center text-xs text-[var(--text-light)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Alter. Dispatches and essays on education, society, and culture.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => openView('privacy')}
              className="hover:text-[var(--text-main)] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => openView('terms')}
              className="hover:text-[var(--text-main)] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </footer>
      </main>

      {/* Floating Bottom Navigation (Optimized for mobile) */}
      <BottomNav
        currentView={currentView}
        onSelectView={openView}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}
