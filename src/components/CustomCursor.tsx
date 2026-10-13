import React, { useEffect, useRef, useState } from 'react';

type CursorVariant = 'default' | 'hover' | 'view' | 'text';

export const CustomCursor: React.FC = () => {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  // References for direct DOM transform updates for peak 60/120fps performance
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Positional coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // 1. Only enable on devices with hover capability and fine pointer (mouse/trackpad)
    const mediaFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const checkDevice = () => {
      setIsEnabled(mediaFinePointer.matches);
    };

    checkDevice();
    mediaFinePointer.addEventListener('change', checkDevice);

    if (!mediaFinePointer.matches) {
      return () => {
        mediaFinePointer.removeEventListener('change', checkDevice);
      };
    }

    // Add class to body to hide system cursor gracefully on fine pointer devices
    document.documentElement.classList.add('custom-cursor-active');

    // 2. Event listeners for mouse tracking
    const handlePointerMove = (e: PointerEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
      }

      // Fast synchronous inner dot update
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleWindowBlur = () => setIsVisible(false);

    // 3. Dynamic target detection for interactive elements
    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if target is inside a disabled button/input
      const disabledEl = target.closest('button:disabled, [aria-disabled="true"]');
      if (disabledEl) {
        setVariant('default');
        return;
      }

      // Check for photo view zones
      const viewEl = target.closest(
        '[data-cursor="view"], .group[data-cursor="view"], [data-photo-item]'
      );
      if (viewEl) {
        setVariant('view');
        return;
      }

      // Check for text inputs
      const textInput = target.closest(
        'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea'
      );
      if (textInput) {
        setVariant('text');
        return;
      }

      // Check for interactive clickables
      const interactiveEl = target.closest(
        'a, button, [role="button"], input[type="submit"], input[type="button"], label[for], [data-cursor="pointer"], .cursor-pointer'
      );
      if (interactiveEl) {
        setVariant('hover');
        return;
      }

      setVariant('default');
    };

    // 4. Smooth physics animation loop for outer ring (Lerp)
    const lerpFactor = prefersReducedMotion.matches ? 1 : 0.2;

    const render = () => {
      // Smooth interpolation for outer trailing ring
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handlePointerOver, { passive: true });
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      mediaFinePointer.removeEventListener('change', checkDevice);
      document.documentElement.classList.remove('custom-cursor-active');
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handlePointerOver);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [isVisible]);

  if (!isEnabled) {
    return null;
  }

  // Ring dimension & style based on variant
  const getRingStyles = () => {
    switch (variant) {
      case 'view':
        return {
          size: 'w-20 h-20 -translate-x-10 -translate-y-10',
          border: 'border-white/80 bg-black/65 backdrop-blur-[2px] shadow-[0_0_25px_rgba(255,255,255,0.15)]',
          scale: isPressed ? 'scale-90' : 'scale-100',
        };
      case 'hover':
        return {
          size: 'w-12 h-12 -translate-x-6 -translate-y-6',
          border: 'border-white/70 bg-white/[0.08] backdrop-blur-[1px] shadow-[0_0_20px_rgba(255,255,255,0.12)]',
          scale: isPressed ? 'scale-80' : 'scale-100',
        };
      case 'text':
        return {
          size: 'w-6 h-6 -translate-x-3 -translate-y-3',
          border: 'border-white/30 bg-transparent',
          scale: 'scale-75 opacity-40',
        };
      default:
        return {
          size: 'w-8 h-8 -translate-x-4 -translate-y-4',
          border: 'border-white/35 bg-transparent shadow-[0_0_12px_rgba(255,255,255,0.05)]',
          scale: isPressed ? 'scale-75' : 'scale-100',
        };
    }
  };

  const ringStyle = getRingStyles();

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Outer Smooth Trailing Ring */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 will-change-transform pointer-events-none"
      >
        <div
          className={`flex items-center justify-center rounded-full border transition-all duration-300 ease-out select-none ${ringStyle.size} ${ringStyle.border} ${ringStyle.scale}`}
        >
          {variant === 'view' && (
            <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#F5F5F2] font-semibold select-none animate-in fade-in duration-200">
              VIEW
            </span>
          )}
        </div>
      </div>

      {/* Inner Immediate Follow Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 will-change-transform pointer-events-none"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ease-out ${
            variant === 'view'
              ? 'w-0 h-0 opacity-0'
              : variant === 'hover'
              ? 'w-1.5 h-1.5 bg-white opacity-40 scale-75'
              : variant === 'text'
              ? 'w-0.5 h-3 bg-white/70 rounded-none'
              : 'w-1.5 h-1.5 bg-[#F5F5F2] shadow-[0_0_6px_rgba(255,255,255,0.9)] ' +
                (isPressed ? 'scale-75' : 'scale-100')
          }`}
        />
      </div>
    </div>
  );
};
