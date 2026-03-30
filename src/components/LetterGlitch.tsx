'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

const MOBILE_BREAKPOINT_PX = 768;
/** En escritorio no animamos todas las celdas a la vez; ahorra CPU en grillas grandes. */
const MAX_LETTERS = 2600;

export type LetterGlitchProps = {
  glitchColors?: string[];
  className?: string;
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  characters?: string;
};

type LetterCell = {
  char: string;
  color: string;
  targetColor: string;
  colorProgress: number;
};

const defaultGlitchColors = ['#2b4539', '#61dca3', '#61b3dc'];
const defaultChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const expanded = hex.replace(shorthandRegex, (_m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(expanded);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function parseColorToRgb(input: string): { r: number; g: number; b: number } | null {
  const fromHex = hexToRgb(input);
  if (fromHex) return fromHex;
  const m = input.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
  if (m) return { r: +m[1], g: +m[2], b: +m[3] };
  return null;
}

function interpolateColor(
  start: { r: number; g: number; b: number },
  end: { r: number; g: number; b: number },
  factor: number
): string {
  return `rgb(${Math.round(start.r + (end.r - start.r) * factor)}, ${Math.round(
    start.g + (end.g - start.g) * factor
  )}, ${Math.round(start.b + (end.b - start.b) * factor)})`;
}

/**
 * Columnas/filas que cubren todo el rectángulo con como mucho MAX_LETTERS celdas.
 * cellW/cellH = w/cols y h/rows (sin bandas vacías a los lados).
 */
function gridDimensions(w: number, h: number): { cols: number; rows: number; cellW: number; cellH: number } {
  const MIN_CELL_W = 7;
  const MIN_CELL_H = 12;
  if (w < 1 || h < 1) {
    return { cols: 1, rows: 1, cellW: 1, cellH: 1 };
  }

  let cols = Math.max(1, Math.ceil(w / MIN_CELL_W));
  let rows = Math.max(1, Math.ceil(h / MIN_CELL_H));

  if (cols * rows > MAX_LETTERS) {
    const scale = Math.sqrt((cols * rows) / MAX_LETTERS);
    cols = Math.max(4, Math.floor(cols / scale));
    rows = Math.max(4, Math.floor(rows / scale));
    while (cols * rows > MAX_LETTERS && (cols > 4 || rows > 4)) {
      if (cols >= rows) cols -= 1;
      else rows -= 1;
    }
  }

  const cellW = w / cols;
  const cellH = h / rows;
  return { cols, rows, cellW, cellH };
}

export default function LetterGlitch({
  glitchColors = defaultGlitchColors,
  className = '',
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = defaultChars,
}: LetterGlitchProps) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT_PX
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT_PX);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);
  const letters = useRef<LetterCell[]>([]);
  const grid = useRef({ columns: 0, rows: 0, cellW: 10, cellH: 20 });
  const cssSizeRef = useRef({ w: 1, h: 1 });
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(Date.now());

  const lettersAndSymbols = Array.from(characters);

  const effectiveGlitchMs = isMobile ? Math.round(glitchSpeed * 1.45) : glitchSpeed;
  const updateFraction = isMobile ? 0.028 : 0.038;

  const getRandomChar = () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];

  const getRandomColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)];

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { ...grid.current, columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }));
  };

  const drawLetters = () => {
    if (!contextRef.current || letters.current.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = contextRef.current;
    const { columns, cellW, cellH } = grid.current;
    const { w: cw, h: ch } = cssSizeRef.current;
    ctx.clearRect(0, 0, cw, ch);
    const fs = Math.max(8, Math.min(22, Math.floor(Math.min(cellW, cellH) * 0.78)));
    ctx.font = `${fs}px monospace`;
    ctx.textBaseline = 'top';

    letters.current.forEach((letter, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      const x = col * cellW;
      const y = row * cellH;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    const rawDpr = window.devicePixelRatio || 1;
    const wide = window.innerWidth >= 1024;
    const dpr = Math.min(rawDpr, wide ? 1 : isMobile ? 1 : 1.35);

    const rect = root.getBoundingClientRect();
    const cssW = Math.max(1, Math.floor(rect.width));
    const cssH = Math.max(1, Math.floor(rect.height));
    cssSizeRef.current = { w: cssW, h: cssH };

    const { cols, rows, cellW, cellH } = gridDimensions(cssW, cssH);
    grid.current = { columns: cols, rows, cellW, cellH };

    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (ctx) {
      contextRef.current = ctx;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    initializeLetters(cols, rows);
    drawLetters();
  };

  const updateLetters = () => {
    if (!letters.current.length) return;
    const n = letters.current.length;
    const updateCount = Math.max(1, Math.floor(n * updateFraction));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * n);
      const cell = letters.current[index];
      if (!cell) continue;

      cell.char = getRandomChar();
      cell.targetColor = getRandomColor();

      if (!smooth) {
        cell.color = cell.targetColor;
        cell.colorProgress = 1;
      } else {
        cell.colorProgress = 0;
      }
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    const step = isMobile ? 0.04 : 0.055;
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += step;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const startRgb = parseColorToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
          needsRedraw = true;
        }
      }
    });
    if (needsRedraw) drawLetters();
  };

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    let running = true;

    const scheduleNext = () => {
      if (!running) return;
      animationRef.current = requestAnimationFrame(tick);
    };

    const tick = () => {
      if (!running) return;

      const visible = isVisibleRef.current;
      if (!visible) {
        scheduleNext();
        return;
      }

      const now = Date.now();
      if (now - lastGlitchTime.current >= effectiveGlitchMs) {
        updateLetters();
        drawLetters();
        lastGlitchTime.current = now;
      }
      if (smooth) handleSmoothTransitions();

      scheduleNext();
    };

    resizeCanvas();
    tick();

    const ro = new ResizeObserver(() => {
      resizeCanvas();
    });
    ro.observe(root);

    const handleWinResize = () => {
      requestAnimationFrame(() => {
        if (running) resizeCanvas();
      });
    };
    window.addEventListener('resize', handleWinResize, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisibleRef.current = entry.isIntersecting && entry.intersectionRatio > 0;
      },
      { threshold: [0, 0.05, 0.1] }
    );
    io.observe(canvas);

    return () => {
      running = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleWinResize);
      try {
        ro.disconnect();
      } catch {
        /* noop */
      }
      try {
        io.disconnect();
      } catch {
        /* noop */
      }
    };
  }, [glitchSpeed, smooth, glitchColors.join(','), characters, isMobile, effectiveGlitchMs, updateFraction]);

  const containerStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    minHeight: '100%',
    minWidth: '100%',
    backgroundColor: '#000000',
    overflow: 'hidden',
  };

  const canvasStyle: CSSProperties = {
    display: 'block',
    width: '100%',
    height: '100%',
  };

  const outerVignetteStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)',
  };

  const centerVignetteStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
  };

  return (
    <div ref={rootRef} style={containerStyle} className={className}>
      <canvas ref={canvasRef} style={canvasStyle} />
      {outerVignette ? <div style={outerVignetteStyle} /> : null}
      {centerVignette ? <div style={centerVignetteStyle} /> : null}
    </div>
  );
}
