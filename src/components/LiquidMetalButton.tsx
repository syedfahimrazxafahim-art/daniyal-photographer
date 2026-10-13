import React, { useRef, useState } from 'react';

interface LiquidMetalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  ariaLabel?: string;
}

export const LiquidMetalButton: React.FC<LiquidMetalButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  ariaLabel,
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-sans text-xs tracking-wider uppercase font-medium transition-all duration-300 select-none overflow-hidden group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/80';

  const variantStyles = {
    primary:
      'px-7 py-3.5 text-[#050505] bg-[#F5F5F2] hover:bg-white rounded-none shadow-[0_0_25px_rgba(255,255,255,0.08)]',
    secondary:
      'px-7 py-3.5 text-[#F5F5F2] bg-transparent border border-white/20 hover:border-white/60 rounded-none backdrop-blur-sm',
    ghost:
      'px-5 py-2.5 text-[#F5F5F2]/90 hover:text-white bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 rounded-none',
  }[variant];

  // Liquid metal reflective gradient mapping
  const metalHighlightStyle: React.CSSProperties = {
    background: isHovered
      ? `radial-gradient(circle 90px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.45) 0%, rgba(220,225,230,0.18) 40%, transparent 80%)`
      : 'radial-gradient(circle 90px at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
    transition: isHovered ? 'background 0.08s ease-out' : 'background 0.4s ease-out',
  };

  const metalBorderSheen: React.CSSProperties = {
    background: isHovered
      ? `radial-gradient(circle 120px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.85) 0%, rgba(180,185,190,0.2) 60%, transparent 100%)`
      : 'transparent',
  };

  const innerContent = (
    <>
      {/* Liquid Metal Border Sheen Layer */}
      <span
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={metalBorderSheen}
        aria-hidden="true"
      />

      {/* Liquid Metal Specular Fluid Highlight */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={metalHighlightStyle}
        aria-hidden="true"
      />

      {/* Subtle sweeping liquid light line */}
      <span
        className="absolute -inset-full w-[200%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
        aria-hidden="true"
      />

      {/* Button Text with letter-spacing */}
      <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className={`${baseStyles} ${variantStyles} ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={ariaLabel}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel}
    >
      {innerContent}
    </button>
  );
};
