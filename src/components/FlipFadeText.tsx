import React, { useEffect, useState } from 'react';

interface FlipFadeTextProps {
  words?: string[];
  staticText?: string;
  className?: string;
  interval?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const FlipFadeText: React.FC<FlipFadeTextProps> = ({
  words = [],
  staticText,
  className = '',
  interval = 3200,
  as: Component = 'span',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (!words.length || words.length <= 1) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsFlipping(false);
      }, 350);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  if (staticText) {
    const textWords = staticText.split(' ');
    return (
      <Component className={`inline-block [perspective:1000px] ${className}`}>
        {textWords.map((word, idx) => (
          <span
            key={idx}
            className="inline-block transition-all duration-700 ease-out"
            style={{
              transitionDelay: `${idx * 60}ms`,
            }}
          >
            {word}&nbsp;
          </span>
        ))}
      </Component>
    );
  }

  const activeWord = words[currentIndex] || '';

  return (
    <Component className={`inline-block [perspective:1000px] align-baseline ${className}`}>
      <span
        className={`inline-block origin-bottom transition-all duration-350 ease-out ${
          isFlipping
            ? 'opacity-0 [transform:rotateX(70deg)_translateY(-10px)] blur-[1px]'
            : 'opacity-100 [transform:rotateX(0deg)_translateY(0)] blur-0'
        }`}
      >
        {activeWord}
      </span>
    </Component>
  );
};
