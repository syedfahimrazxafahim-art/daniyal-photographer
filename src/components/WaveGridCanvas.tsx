import React, { useEffect, useRef } from 'react';

interface WaveGridCanvasProps {
  className?: string;
  opacity?: number;
}

export const WaveGridCanvas: React.FC<WaveGridCanvasProps> = ({
  className = '',
  opacity = 0.28,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse interactive coordinates
    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
      isHovered: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = width * 0.5;
      mouse.targetY = height * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Wave grid parameters (refined luxury monochrome aesthetic)
    const cols = 28;
    const rows = 16;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const cellW = width / (cols - 1);
      const cellH = height / (rows - 1);

      // Calculate 2D grid points with wave elevation
      const points: { x: number; y: number; alpha: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        points[r] = [];
        const baseY = r * cellH;

        for (let c = 0; c < cols; c++) {
          const baseX = c * cellW;

          // Spatial wave math: subtle double sine oscillation
          const distToMouse = Math.hypot(baseX - mouse.x, baseY - mouse.y);
          const mouseFactor = mouse.isHovered ? Math.max(0, 1 - distToMouse / 380) : 0;
          const mouseWave = Math.sin(distToMouse * 0.02 - time * 2) * 12 * mouseFactor;

          const wave1 = Math.sin(c * 0.28 + time * 0.8) * 10;
          const wave2 = Math.cos(r * 0.35 + time * 0.6) * 8;
          const wave3 = Math.sin((c + r) * 0.18 + time * 1.1) * 6;

          const offsetY = (wave1 + wave2 + wave3) * 0.7 + mouseWave;
          const offsetX = Math.cos(r * 0.3 + time * 0.7) * 4;

          // Fade out towards extreme top and bottom edges for seamless cinematic blending
          const edgeFadeY = Math.sin((r / (rows - 1)) * Math.PI);
          const edgeFadeX = Math.sin((c / (cols - 1)) * Math.PI);
          const pointAlpha = Math.max(0.06, edgeFadeY * edgeFadeX * 0.7);

          points[r][c] = {
            x: baseX + offsetX,
            y: baseY + offsetY,
            alpha: pointAlpha,
          };
        }
      }

      // Draw horizontal wave lines with subtle silver shimmer
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];
          if (c === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            // Bezier curve for silky smooth organic flow
            const prev = points[r][c - 1];
            const cx = (prev.x + pt.x) / 2;
            const cy = (prev.y + pt.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
          }
        }
        ctx.strokeStyle = `rgba(245, 245, 242, ${(opacity * 0.6).toFixed(3)})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();
      }

      // Draw vertical wave lines
      for (let c = 0; c < cols; c += 2) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const pt = points[r][c];
          if (r === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            const prev = points[r - 1][c];
            const cx = (prev.x + pt.x) / 2;
            const cy = (prev.y + pt.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
          }
        }
        ctx.strokeStyle = `rgba(245, 245, 242, ${(opacity * 0.35).toFixed(3)})`;
        ctx.lineWidth = 0.65;
        ctx.stroke();
      }

      // Draw delicate intersection node glints on every alternate intersection
      for (let r = 1; r < rows - 1; r += 2) {
        for (let c = 1; c < cols - 1; c += 2) {
          const pt = points[r][c];
          const glint = (Math.sin(c * 1.5 + r * 1.2 + time * 1.5) + 1) * 0.5;
          const nodeAlpha = pt.alpha * opacity * (0.4 + glint * 0.6);

          if (nodeAlpha > 0.05) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${nodeAlpha.toFixed(3)})`;
            ctx.fill();
          }
        }
      }

      if (!prefersReducedMotion) {
        time += 0.016;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-10 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};
