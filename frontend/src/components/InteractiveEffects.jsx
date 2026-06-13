import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const InteractiveEffects = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

      setScrollProgress(progress);
      setShowButton(scrollTop > 450);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[70]">
        <div
          className="h-full bg-black transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Link
        to="/feedback"
        className="fixed right-4 bottom-24 z-50 bg-black text-white rounded-full px-5 py-3 shadow-2xl font-semibold hover:bg-gray-800 hover:-translate-y-1 active:scale-95 transition hidden sm:flex items-center gap-2"
      >
        <span>Связаться</span>
        <span>→</span>
      </Link>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed right-4 bottom-6 z-50 w-12 h-12 bg-white text-black border border-gray-200 rounded-full shadow-2xl font-black hover:bg-black hover:text-white hover:-translate-y-1 active:scale-95 transition"
          aria-label="Наверх"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default InteractiveEffects;