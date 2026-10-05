import React, { useEffect, useState, useRef } from 'react';
import { Home, BookOpen, User, Mail, Moon, Sun } from 'lucide-react';

interface BottomNavProps {
  currentView: string;
  onSelectView: (view: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onSelectView,
  theme,
  onToggleTheme
}) => {
  const [opacity, setOpacity] = useState(1);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const resetIdleTimer = () => {
      setOpacity(1);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      idleTimerRef.current = setTimeout(() => {
        if (!isHoveredRef.current) {
          setOpacity(0.4);
        }
      }, 3500);
    };

    const events = ['mousemove', 'scroll', 'touchstart', 'click', 'keydown'];
    events.forEach(event => window.addEventListener(event, resetIdleTimer, { passive: true }));
    resetIdleTimer();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      events.forEach(event => window.removeEventListener(event, resetIdleTimer));
    };
  }, []);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setOpacity(1);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    idleTimerRef.current = setTimeout(() => {
      setOpacity(0.4);
    }, 3000);
  };

  // If viewing an article, highlight 'blogs' (Journal)
  const isJournalActive = currentView === 'blogs' || currentView.startsWith('post-');

  return (
    <nav
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ opacity }}
      className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-between sm:justify-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full z-40 transition-all duration-500 ease-out shadow-2xl glass-panel w-auto max-w-[92vw] sm:max-w-max border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl select-none"
      aria-label="Main Navigation"
    >
      <button
        onClick={() => onSelectView('home')}
        className={`flex flex-col items-center justify-center gap-0.5 sm:gap-1 px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer min-h-[42px] touch-manipulation ${
          currentView === 'home'
            ? 'text-[var(--text-main)] bg-[var(--glass-active)] shadow-inner'
            : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-hover)] active:scale-95'
        }`}
        aria-label="Home"
      >
        <Home className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        <span className="text-[11px] font-semibold tracking-wide">Home</span>
      </button>

      <button
        onClick={() => onSelectView('blogs')}
        className={`flex flex-col items-center justify-center gap-0.5 sm:gap-1 px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer min-h-[42px] touch-manipulation ${
          isJournalActive
            ? 'text-[var(--text-main)] bg-[var(--glass-active)] shadow-inner'
            : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-hover)] active:scale-95'
        }`}
        aria-label="Journal"
      >
        <BookOpen className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        <span className="text-[11px] font-semibold tracking-wide">Journal</span>
      </button>

      <button
        onClick={() => onSelectView('about')}
        className={`flex flex-col items-center justify-center gap-0.5 sm:gap-1 px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer min-h-[42px] touch-manipulation ${
          currentView === 'about'
            ? 'text-[var(--text-main)] bg-[var(--glass-active)] shadow-inner'
            : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-hover)] active:scale-95'
        }`}
        aria-label="About"
      >
        <User className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        <span className="text-[11px] font-semibold tracking-wide">About</span>
      </button>

      <button
        onClick={() => onSelectView('contact')}
        className={`flex flex-col items-center justify-center gap-0.5 sm:gap-1 px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer min-h-[42px] touch-manipulation ${
          currentView === 'contact'
            ? 'text-[var(--text-main)] bg-[var(--glass-active)] shadow-inner'
            : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-hover)] active:scale-95'
        }`}
        aria-label="Contact"
      >
        <Mail className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        <span className="text-[11px] font-semibold tracking-wide">Contact</span>
      </button>

      <div className="w-[1px] h-6 bg-[var(--glass-border)] mx-1 shrink-0" />

      <button
        onClick={onToggleTheme}
        className="flex flex-col items-center justify-center gap-0.5 sm:gap-1 px-3 sm:px-3.5 py-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-hover)] active:scale-95 transition-all duration-300 cursor-pointer min-h-[42px] touch-manipulation"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-amber-300 transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" />
        )}
        <span className="text-[11px] font-semibold tracking-wide">Theme</span>
      </button>
    </nav>
  );
};
