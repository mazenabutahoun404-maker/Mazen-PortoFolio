import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import * as THREE from "three";

const SECTION_THEMES = [
  { id: "hero", name: "The Void", color: "#00d4ff", color2: "#7c3aed", bg: "#020408" },
  { id: "about", name: "Nebula Core", color: "#ff6b35", color2: "#fbbf24", bg: "#080402" },
  { id: "skills", name: "Cyber Grid", color: "#00ff88", color2: "#00d4ff", bg: "#010a04" },
  { id: "projects", name: "Deep Orbit", color: "#ff3cac", color2: "#7c3aed", bg: "#060008" },
  { id: "experience", name: "Star Forge", color: "#fbbf24", color2: "#ff6b35", bg: "#080600" },
  { id: "services", name: "Pulse Array", color: "#00d4ff", color2: "#00ff88", bg: "#000a0a" },
  { id: "contact", name: "Event Horizon", color: "#ff3cac", color2: "#00d4ff", bg: "#080004" },
];

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Services", "Contact"];

const SKILLS = [
  { icon: "⚛", name: "React", cat: "Core Framework", desc: "Building dynamic, component-driven interfaces with blazing-fast virtual DOM rendering." },
  { icon: "▲", name: "Next.js", cat: "Full Stack", desc: "Server-side rendering, static generation, and API routes for production-grade apps." },
  { icon: "🌀", name: "Three.js", cat: "3D Engine", desc: "Crafting immersive 3D scenes, custom shaders, and real-time visual experiences on the web." },
  { icon: "🎭", name: "Framer Motion", cat: "Animation", desc: "Declarative animations and gesture-driven interactions for fluid React interfaces." },
  { icon: "⚡", name: "TypeScript", cat: "Language", desc: "Type-safe development with enhanced IDE support, catching errors before runtime." },
  { icon: "🎨", name: "Tailwind CSS", cat: "Styling", desc: "Utility-first CSS for rapid UI development with consistent, responsive design systems." },
  { icon: "🔥", name: "GSAP", cat: "Animation", desc: "High-performance timeline animations and scroll-driven cinematic sequences." },
  { icon: "🖥", name: "WebGL", cat: "Graphics", desc: "Low-level GPU-accelerated rendering for custom visual effects and data visualizations." },
  { icon: "🔷", name: "React Query", cat: "State", desc: "Powerful async state management with caching, background refetching, and pagination." },
  { icon: "📱", name: "Flutter", cat: "Mobile", desc: "Cross-platform mobile development delivering native performance from a single codebase." },
  { icon: "📦", name: "Vite", cat: "Tooling", desc: "Lightning-fast build tool with instant HMR and optimized production bundling." },
  { icon: "🎯", name: "Zustand", cat: "State", desc: "Minimal, flexible state management with zero boilerplate and intuitive API." },
];

const PROJECTS = [
  { emoji: "🧠", bg: "linear-gradient(135deg,#1a0515,#360a2b,#ff3cac33)", tags: ["Flagship", "In Progress", "Mega Project"], name: "Think", desc: "My biggest endeavor yet. A revolutionary platform currently in active development that aims to redefine standard workflows." },
  { emoji: "🏥", bg: "linear-gradient(135deg,#0a0f1e,#0d2040,#00d4ff22)", tags: ["Major System", "React", "TypeScript"], name: "Clinics System", desc: "A comprehensive management system for clinics with appointment scheduling, inventory tracking, and patient records." },
  { emoji: "🎨", bg: "linear-gradient(135deg,#1a0a2e,#2d1b69,#7c3aed33)", tags: ["Flagship UI", "Three.js", "GSAP"], name: "Octagram Portfolio", desc: "A stunning, high-performance portfolio showcasing projects with immersive 3D interactions and modern web aesthetics." },
];

const TIMELINE = [
  { date: "Present", company: "Octagram Team", role: "Founder & CTO ", desc: "Established the Octagram development team to deliver high-quality software solutions, focusing on modern aesthetics and robust systems." },
  { date: "Present", company: "University", role: "2nd Year Student", desc: "Currently in my second year of university, actively balancing academic studies with professional software development." },
  { date: "Past", company: "SMT Group Company", role: "Software Developer", desc: "Worked for a year on building and maintaining web applications, refining system implementations and optimizing frontend performance." },
];

const SERVICES = [
  { num: "01", name: "Immersive Web Experiences", desc: "Cinematic 3D environments, scroll-driven storytelling, and physics-based interactions that leave users speechless." },
  { num: "02", name: "Design Systems Architecture", desc: "Scalable, themeable component libraries built with atomic design — the invisible backbone of beautiful products." },
  { num: "03", name: "Bug Fixing & System Maintenance", desc: "Expert troubleshooting to identify and fix complex bugs, ensuring systems run smoothly and efficiently without downtime." },
  { num: "04", name: "3D & WebGL Development", desc: "Custom Three.js scenes, real-time shaders, and interactive 3D visualisations for the spatial computing era." },
  { num: "05", name: "Technical Leadership", desc: "Frontend architecture consulting, code reviews, and mentoring — elevating engineering culture across organisations." },
  { num: "06", name: "Motion & Animation", desc: "GSAP and Framer Motion mastery — micro-interactions and ambient animations that turn static UI into living art." },
];

const SOCIALS = [
  { icon: "✉", name: "Email", url: "#contact", color: "#ff6b35" },
  { icon: "in", name: "LinkedIn", url: "https://www.linkedin.com/in/mazen-abutahoun-7273b5235/", color: "#00d4ff" },
  { icon: "⌥", name: "GitHub", url: "https://github.com/mazenabutahoun404-maker", color: "#00ff88" },
  { icon: "✦", name: "Instagram", url: "https://www.instagram.com/mazen_abutahoun/", color: "#ff3cac" },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function SpaceIn({ children, delay = 0, className = "", style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const { ref, visible } = useInView(0.06);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(70px) scale(0.93)",
      filter: visible ? "blur(0px)" : "blur(8px)",
      transition: `opacity 1.1s cubic-bezier(.16,1,.3,1) ${delay}s, transform 1.2s cubic-bezier(.16,1,.3,1) ${delay}s, filter 1s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function SL({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
      <div style={{ width: 36, height: 1, background: color }} />
      <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: ".6rem", letterSpacing: ".4em", color, textTransform: "uppercase" }}>{children}</span>
    </div>
  );
}

function GT({ children, c1, c2 }: { children: React.ReactNode; c1: string; c2: string }) {
  return <span style={{ background: `linear-gradient(135deg,${c1},${c2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{children}</span>;
}

function GDiv({ light }: { light: boolean }) {
  return <div style={{ height: 1, background: light ? "linear-gradient(90deg,transparent,rgba(0,0,0,.15),transparent)" : "linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)" }} />;
}

/* ─── Customized GSAP 3D Cubes Component for Tech Arsenal ─── */
interface CubesProps {
  cols?: number;
  rows?: number;
  maxAngle?: number;
  radius?: number;
  cellGap?: number;
  borderStyle?: string;
  faceColor?: string;
  rippleColor?: string;
  rippleSpeed?: number;
  autoAnimate?: boolean;
  rippleOnClick?: boolean;
  skills?: { icon: string; name: string; cat: string; desc: string }[];
  accentColor?: string;
  textPri?: string;
  light?: boolean;
}

const Cubes: React.FC<CubesProps> = ({
  cols = 6,
  rows = 4,
  maxAngle = 48,
  radius = 2.5,
  cellGap = 34,
  borderStyle = '2px dashed rgba(0, 255, 136, 0.65)',
  faceColor = 'rgba(8, 28, 18, 0.95)',
  rippleColor = '#00ff88',
  rippleSpeed = 1.5,
  autoAnimate = true,
  rippleOnClick = true,
  skills = [],
  accentColor = '#00ff88',
  textPri = '#ffffff',
  light = false
}) => {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userActiveRef = useRef(false);
  const simPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const simTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const simRAFRef = useRef<number | null>(null);

  const skillPositions = useRef<Map<number, typeof skills[0]>>(new Map());
  if (skillPositions.current.size === 0 && skills.length > 0) {
    const totalCells = cols * rows;
    const positions = [0, 1, 3, 4, 6, 8, 10, 11, 13, 15, 17, 19, 21, 22];
    skills.forEach((skill, i) => {
      if (i < positions.length) {
        skillPositions.current.set(positions[i], skill);
      }
    });
  }

  const tiltAt = useCallback(
    (rowCenter: number, colCenter: number) => {
      if (!sceneRef.current) return;
      const isMobile = window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches;
      const effectiveMaxAngle = isMobile ? 20 : maxAngle;
      const effectiveRadius = isMobile ? 2.0 : radius;

      sceneRef.current.querySelectorAll<HTMLDivElement>('.cube').forEach(cube => {
        const r = +cube.dataset.row!;
        const c = +cube.dataset.col!;
        const dist = Math.hypot(r - rowCenter, c - colCenter);
        if (dist <= effectiveRadius) {
          const colDiff = colCenter - c;
          const rowDiff = rowCenter - r;
          const rotY = (colDiff / effectiveRadius) * effectiveMaxAngle;
          const rotX = -(rowDiff / effectiveRadius) * effectiveMaxAngle;

          gsap.to(cube, {
            duration: 1.4,
            ease: 'power2.out',
            overwrite: 'auto',
            rotateX: rotX,
            rotateY: rotY,
            scale: 1,
            z: 0
          });
        } else {
          gsap.to(cube, {
            duration: 1.8,
            ease: 'power2.out',
            overwrite: 'auto',
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            z: 0
          });
        }
      });
    },
    [radius, maxAngle]
  );

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      userActiveRef.current = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      const rect = sceneRef.current!.getBoundingClientRect();
      const cellW = rect.width / cols;
      const cellH = rect.height / rows;
      const colCenter = (e.clientX - rect.left) / cellW;
      const rowCenter = (e.clientY - rect.top) / cellH;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));

      idleTimerRef.current = setTimeout(() => {
        userActiveRef.current = false;
      }, 3000);
    },
    [cols, rows, tiltAt]
  );

  const resetAll = useCallback(() => {
    if (!sceneRef.current) return;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      userActiveRef.current = false;
    }, 3000);

    sceneRef.current.querySelectorAll<HTMLDivElement>('.cube').forEach(cube =>
      gsap.to(cube, {
        duration: 1.6,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        z: 0,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    );
  }, []);

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      userActiveRef.current = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      const rect = sceneRef.current!.getBoundingClientRect();
      const cellW = rect.width / cols;
      const cellH = rect.height / rows;

      const touch = e.touches[0];
      const colCenter = (touch.clientX - rect.left) / cellW;
      const rowCenter = (touch.clientY - rect.top) / cellH;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));

      idleTimerRef.current = setTimeout(() => {
        userActiveRef.current = false;
      }, 3000);
    },
    [cols, rows, tiltAt]
  );

  const onClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!rippleOnClick || !sceneRef.current) return;
      const rect = sceneRef.current.getBoundingClientRect();
      const cellW = rect.width / cols;
      const cellH = rect.height / rows;

      const clientX = (e as MouseEvent).clientX || ((e as TouchEvent).touches && (e as TouchEvent).touches[0] && (e as TouchEvent).touches[0].clientX);
      const clientY = (e as MouseEvent).clientY || ((e as TouchEvent).touches && (e as TouchEvent).touches[0] && (e as TouchEvent).touches[0].clientY);

      if (!clientX || !clientY) return;

      const colHit = Math.floor((clientX - rect.left) / cellW);
      const rowHit = Math.floor((clientY - rect.top) / cellH);

      const spreadDelay = 0.08 / rippleSpeed;
      const animDuration = 0.25 / rippleSpeed;
      const holdTime = 0.25 / rippleSpeed;

      const rings: Record<number, HTMLDivElement[]> = {};
      sceneRef.current.querySelectorAll<HTMLDivElement>('.cube').forEach(cube => {
        const r = +cube.dataset.row!;
        const c = +cube.dataset.col!;
        const dist = Math.hypot(r - rowHit, c - colHit);
        const ring = Math.round(dist);
        if (!rings[ring]) rings[ring] = [];
        rings[ring].push(cube);
      });

      const normalBg = light
        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(230, 255, 240, 0.94))'
        : 'linear-gradient(135deg, #0e2a1b, #071c11)';
      const normalShadow = light
        ? '0 4px 15px rgba(0,0,0,0.06), inset 0 0 12px rgba(0,180,100,0.15)'
        : `0 6px 20px rgba(0,0,0,0.7), 0 0 15px ${accentColor}25, inset 0 0 12px ${accentColor}25`;
      const normalBorder = light ? '2px dashed rgba(0, 180, 100, 0.8)' : `2px dashed ${accentColor}dd`;

      Object.keys(rings)
        .map(Number)
        .sort((a, b) => a - b)
        .forEach(ring => {
          const delay = ring * spreadDelay;
          const cubesInRing = rings[ring];
          // Target side faces only (indices 0, 1, 2, 3, 5 - excluding index 4 front face)
          const sideFaces = cubesInRing.flatMap(cube => {
            const faces = Array.from(cube.querySelectorAll<HTMLElement>('.cube-face'));
            return faces.filter((_, idx) => idx !== 4);
          });

          gsap.to(sideFaces, {
            background: rippleColor,
            borderColor: rippleColor,
            duration: animDuration,
            delay,
            ease: 'power2.out'
          });
          gsap.to(sideFaces, {
            background: normalBg,
            borderColor: normalBorder,
            duration: animDuration * 1.5,
            delay: delay + animDuration + holdTime,
            ease: 'power3.out'
          });
        });
    },
    [rippleOnClick, cols, rows, accentColor, rippleColor, rippleSpeed, light]
  );

  useEffect(() => {
    if (!autoAnimate || !sceneRef.current) return;

    let isVisible = false;
    let randomTimer: ReturnType<typeof setInterval> | null = null;

    const triggerRandomCubes = () => {
      if (!sceneRef.current || !isVisible) return;
      const isMobile = window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches;

      // Desktop: Only rotate randomly if mouse has been away/idle for 3s (!userActiveRef.current)
      // Mobile: ALWAYS randomly rotate cubes all the time!
      if (isMobile || !userActiveRef.current) {
        const allCubes = Array.from(sceneRef.current.querySelectorAll<HTMLDivElement>('.cube'));
        if (allCubes.length === 0) return;

        // Pick 3 to 5 random cubes
        const count = Math.floor(Math.random() * 3) + 3;
        const shuffled = [...allCubes].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, count);

        selected.forEach(cube => {
          const rx = (Math.random() - 0.5) * 44;
          const ry = (Math.random() - 0.5) * 52;
          const rz = (Math.random() - 0.5) * 10;

          gsap.to(cube, {
            rotateX: rx,
            rotateY: ry,
            z: rz,
            duration: 1.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
            repeatDelay: 0.6,
            overwrite: 'auto'
          });
        });
      }
    };

    randomTimer = setInterval(triggerRandomCubes, 1800);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        triggerRandomCubes();
      }
    }, { threshold: 0.1 });

    observer.observe(sceneRef.current);

    return () => {
      observer.disconnect();
      if (randomTimer) clearInterval(randomTimer);
    };
  }, [autoAnimate]);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    el.addEventListener('pointermove', onPointerMove, { passive: true });
    el.addEventListener('pointerleave', resetAll, { passive: true });
    el.addEventListener('click', onClick);

    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', resetAll, { passive: true });

    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerleave', resetAll);
      el.removeEventListener('click', onClick);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', resetAll);

      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [onPointerMove, resetAll, onClick, onTouchMove]);

  const unifiedFaceStyle: React.CSSProperties = {
    background: light
      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(230, 255, 240, 0.94))'
      : 'linear-gradient(135deg, #0e2a1b, #071c11)',
    border: light
      ? '2px dashed rgba(0, 180, 100, 0.8)'
      : `2px dashed ${accentColor}dd`,
    boxShadow: light
      ? '0 4px 15px rgba(0,0,0,0.06), inset 0 0 12px rgba(0,180,100,0.15)'
      : `0 6px 20px rgba(0,0,0,0.7), 0 0 15px ${accentColor}25, inset 0 0 12px ${accentColor}25`,
    backfaceVisibility: 'hidden',
  };

  return (
    <div className="w-full flex justify-center items-center py-4">
      <div
        ref={sceneRef}
        className="cubes-custom-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 70px)`,
          gridTemplateRows: `repeat(${rows}, 70px)`,
          gap: `${cellGap}px`,
          justifyContent: 'center',
          perspective: '1000px',
          margin: '0 auto',
        }}
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((__, c) => {
            const index = r * cols + c;
            const skill = skillPositions.current.get(index);

            return (
              <div
                key={`${r}-${c}`}
                className="cube relative w-[70px] h-[70px] aspect-square [transform-style:preserve-3d] cursor-pointer [will-change:transform]"
                data-row={r}
                data-col={c}
              >
                {/* Top face */}
                <div
                  className="cube-face absolute inset-0 flex items-center justify-center rounded-lg"
                  style={{
                    ...unifiedFaceStyle,
                    transform: 'translateY(-50%) rotateX(90deg)',
                  }}
                />
                {/* Bottom face */}
                <div
                  className="cube-face absolute inset-0 flex items-center justify-center rounded-lg"
                  style={{
                    ...unifiedFaceStyle,
                    transform: 'translateY(50%) rotateX(-90deg)',
                  }}
                />
                {/* Left face */}
                <div
                  className="cube-face absolute inset-0 flex items-center justify-center rounded-lg"
                  style={{
                    ...unifiedFaceStyle,
                    transform: 'translateX(-50%) rotateY(-90deg)',
                  }}
                />
                {/* Right face */}
                <div
                  className="cube-face absolute inset-0 flex items-center justify-center rounded-lg"
                  style={{
                    ...unifiedFaceStyle,
                    transform: 'translateX(50%) rotateY(90deg)',
                  }}
                />
                {/* Front face (Solid Unified Face + Bright Logos) */}
                <div
                  className="cube-face absolute inset-0 flex flex-col items-center justify-center rounded-lg select-none p-1.5 transition-all duration-300 z-10"
                  style={{
                    ...unifiedFaceStyle,
                    transform: 'rotateY(-90deg) translateX(50%) rotateY(90deg) translateZ(1px)',
                  }}
                >
                  {skill ? (
                    <>
                      <div
                        className="cube-icon"
                        style={{
                          fontSize: '1.85rem',
                          marginBottom: '.15rem',
                          filter: `drop-shadow(0 0 8px ${accentColor}) drop-shadow(0 0 16px ${accentColor}aa)`,
                          color: '#ffffff'
                        }}
                      >
                        {skill.icon}
                      </div>
                      <div
                        className="cube-name"
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                          fontSize: '.65rem',
                          letterSpacing: '.05em',
                          fontWeight: 900,
                          color: light ? '#04140b' : '#ffffff',
                          textAlign: 'center',
                          lineHeight: 1.1,
                          textShadow: light ? 'none' : `0 0 10px ${accentColor}aa, 0 1px 3px #000000`
                        }}
                      >
                        {skill.name}
                      </div>
                      <div
                        className="cube-cat"
                        style={{
                          fontSize: '.42rem',
                          color: light ? '#007a3d' : accentColor,
                          letterSpacing: '.12em',
                          textTransform: 'uppercase',
                          marginTop: '.12rem',
                          fontWeight: 800,
                          textShadow: light ? 'none' : `0 0 8px ${accentColor}`
                        }}
                      >
                        {skill.cat}
                      </div>
                    </>
                  ) : (
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: accentColor, boxShadow: `0 0 12px ${accentColor}` }} />
                  )}
                </div>
                {/* Back face */}
                <div
                  className="cube-face absolute inset-0 flex items-center justify-center rounded-lg"
                  style={{
                    ...unifiedFaceStyle,
                    transform: 'rotateY(90deg) translateX(-50%) rotateY(-90deg)',
                  }}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActive] = useState(0);
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lightRef = useRef(light);
  useEffect(() => { lightRef.current = light; }, [light]);

  const theme = SECTION_THEMES[activeSection];

  // ── active section tracker ────────────────────────────────────────
  useEffect(() => {
    const ids = SECTION_THEMES.map(s => s.id);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { const i = ids.indexOf(e.target.id); if (i !== -1) setActive(i); } });
    }, { threshold: 0.35 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // ── Three.js ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current) return;
    const cleanupThree = initThree();
    return () => {
      if (cleanupThree) cleanupThree();
    };
  }, []);

  function NavLogo({ ac, ac2 }: { ac: string; ac2: string }) {
    return (
      <div style={{
        fontFamily: "'Orbitron',sans-serif",
        fontSize: "1.05rem",
        fontWeight: 900,
        position: "relative",
        zIndex: 10000,          // above EVERYTHING including overlay
        isolation: "isolate",   // creates own stacking context
        display: "inline-block",
      }}>
        {/* invisible but selectable text for accessibility */}
        <span style={{ opacity: 0, position: "absolute", userSelect: "none" }}>MA.</span>
        {/* visible gradient via SVG text — never affected by backdrop or overlay */}
        <svg width="52" height="28" viewBox="0 0 52 28" style={{ overflow: "visible", display: "block" }}>
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={ac} />
              <stop offset="100%" stopColor={ac2} />
            </linearGradient>
          </defs>
          <text
            x="0" y="22"
            fill="url(#logoGrad)"
            fontFamily="'Orbitron',sans-serif"
            fontWeight="900"
            fontSize="20"
            style={{ transition: "fill .6s ease" }}
          >MA.</text>
        </svg>
      </div>
    );
  }

  function initThree() {
    const canvas = canvasRef.current!;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.debug.checkShaderErrors = false;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 1000);
    camera.position.z = 6;

    // ═══════════════════════════════════════════════
    // SHARED — Stars (dense)
    const starPos = new Float32Array(5000 * 3).map(() => (Math.random() - .5) * 500);
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(sGeo, new THREE.PointsMaterial({ color: 0xffffff, size: .1, sizeAttenuation: true, transparent: true, opacity: .8 }));
    scene.add(stars);

    // SHARED — Big classic rings (the originals)
    const bigRings: any[] = [];
    for (let i = 0; i < 7; i++) {
      const r = new THREE.Mesh(
        new THREE.TorusGeometry(3 + i * 2.2, .012 + i * .004, 8, 120),
        new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x00d4ff : 0x7c3aed, transparent: true, opacity: .35 - i * .04 })
      );
      r.rotation.x = Math.random() * Math.PI; r.rotation.y = Math.random() * Math.PI;
      r.userData = { ri: i };
      bigRings.push(r); scene.add(r);
    }

    // SHARED — Floating icosahedra (classic)
    const isos: any[] = [];
    for (let i = 0; i < 14; i++) {
      const m = new THREE.Mesh(
        new THREE.IcosahedronGeometry(.08 + Math.random() * .3, 0),
        new THREE.MeshPhongMaterial({ color: i % 2 === 0 ? 0x00d4ff : 0x7c3aed, emissive: i % 2 === 0 ? 0x003344 : 0x1a0044, wireframe: true, transparent: true, opacity: .55 })
      );
      m.position.set((Math.random() - .5) * 20, (Math.random() - .5) * 18, (Math.random() - .5) * 12 - 2);
      m.userData = { vx: (Math.random() - .5) * .003, vy: (Math.random() - .5) * .003 };
      isos.push(m); scene.add(m);
    }

    // SHARED — Octahedra (classic)
    const octs: any[] = [];
    for (let i = 0; i < 8; i++) {
      const m = new THREE.Mesh(
        new THREE.OctahedronGeometry(.1 + Math.random() * .2, 0),
        new THREE.MeshPhongMaterial({ color: 0xff3cac, emissive: 0x330011, wireframe: true, transparent: true, opacity: .45 })
      );
      m.position.set((Math.random() - .5) * 18, (Math.random() - .5) * 16, (Math.random() - .5) * 12 - 3);
      m.userData = { vx: (Math.random() - .5) * .004, vy: (Math.random() - .5) * .004 };
      octs.push(m); scene.add(m);
    }

    // SHARED — Floating cubes (classic)
    const cubes: any[] = [];
    for (let i = 0; i < 18; i++) {
      const c = new THREE.Mesh(
        new THREE.BoxGeometry(.12 + Math.random() * .22, .12 + Math.random() * .22, .12 + Math.random() * .22),
        new THREE.MeshPhongMaterial({ color: i % 3 === 0 ? 0x00ff88 : i % 3 === 1 ? 0x00d4ff : 0x7c3aed, emissive: 0x001111, wireframe: Math.random() > .4, transparent: true, opacity: .65 })
      );
      c.position.set((Math.random() - .5) * 22, (Math.random() - .5) * 20, (Math.random() - .5) * 14 - 2);
      c.userData = { vx: (Math.random() - .5) * .003, vy: (Math.random() - .5) * .003, rz: (Math.random() - .5) * .018 };
      cubes.push(c); scene.add(c);
    }

    // SHARED — Comets
    const comets: any[] = [];
    for (let i = 0; i < 5; i++) {
      const cometGroup = new THREE.Group();
      const head = new THREE.Mesh(new THREE.SphereGeometry(.06, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      // tail particles
      const tailPos = new Float32Array(30 * 3);
      for (let j = 0; j < 30; j++) {
        tailPos[j * 3] = -j * .12; tailPos[j * 3 + 1] = (Math.random() - .5) * .04 * j; tailPos[j * 3 + 2] = (Math.random() - .5) * .04 * j;
      }
      const tailGeo = new THREE.BufferGeometry(); tailGeo.setAttribute("position", new THREE.BufferAttribute(tailPos, 3));
      const tail = new THREE.Points(tailGeo, new THREE.PointsMaterial({ color: 0x00d4ff, size: .04, transparent: true, opacity: .7, sizeAttenuation: true }));
      cometGroup.add(head); cometGroup.add(tail);
      cometGroup.position.set(Math.random() * 30 - 15, Math.random() * 20 - 10, Math.random() * 10 - 20);
      cometGroup.rotation.z = Math.random() * Math.PI;
      cometGroup.userData = {
        vx: -(Math.random() * .08 + .04),
        vy: (Math.random() - .5) * .02,
        startX: 15 + Math.random() * 10,
        startY: Math.random() * 20 - 10,
        startZ: Math.random() * 10 - 20,
      };
      comets.push(cometGroup); scene.add(cometGroup);
    }

    // ═══════════════════════════════════════════════
    // HERO GROUP — Warp tunnel + ship + energy orbs
    const heroGroup = new THREE.Group();
    const warpRings: any[] = [];
    for (let i = 0; i < 24; i++) {
      const r = new THREE.Mesh(
        new THREE.TorusGeometry(1.2 + i * .28, .006, 6, 80),
        new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x00d4ff : 0x7c3aed, transparent: true, opacity: .5 - i * .018 })
      );
      r.position.z = -i * 1.0; r.rotation.x = Math.PI / 2;
      r.userData = { idx: i };
      warpRings.push(r); heroGroup.add(r);
    }
    const heroSphere = new THREE.Mesh(new THREE.SphereGeometry(.5, 32, 32), new THREE.MeshPhongMaterial({ color: 0x001133, emissive: 0x002266, shininess: 200 }));
    heroGroup.add(heroSphere);
    // Energy orbs
    const energyOrbs: any[] = [];
    for (let i = 0; i < 6; i++) {
      const orb = new THREE.Mesh(new THREE.SphereGeometry(.05 + Math.random() * .04, 12, 12), new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x00ffdd : 0xaa00ff }));
      orb.position.set((Math.random() - .5) * 8, (Math.random() - .5) * 6, (Math.random() - .5) * 4);
      orb.userData = { ox: orb.position.x, oy: orb.position.y, phase: i * 1.1 };
      const ol = new THREE.PointLight(i % 2 === 0 ? 0x00ffdd : 0xaa00ff, 1.5, 5); orb.add(ol);
      energyOrbs.push(orb); heroGroup.add(orb);
    }
    scene.add(heroGroup);

    // HERO — Spaceship
    const shipGroup = new THREE.Group();
    const fuselage = new THREE.Mesh(new THREE.SphereGeometry(.18, 12, 8), new THREE.MeshPhongMaterial({ color: 0xaaccff, emissive: 0x002244, shininess: 120 }));
    fuselage.scale.set(2.8, .55, .55);
    const cockpit = new THREE.Mesh(new THREE.SphereGeometry(.13, 12, 8), new THREE.MeshPhongMaterial({ color: 0x00d4ff, emissive: 0x003366, shininess: 200, transparent: true, opacity: .85 }));
    cockpit.position.set(.24, .07, 0);
    const wMat = new THREE.MeshPhongMaterial({ color: 0x7799cc, emissive: 0x001133 });
    const wL = new THREE.Mesh(new THREE.ConeGeometry(.2, .6, 4), wMat); wL.rotation.z = -Math.PI / 2; wL.position.set(-.08, -.25, .28); wL.scale.set(.6, 1, .22);
    const wR = wL.clone(); wR.position.z = -.28;
    const eL = new THREE.Mesh(new THREE.CylinderGeometry(.06, .09, .15, 12), new THREE.MeshPhongMaterial({ color: 0x00d4ff, emissive: 0x00aaff })); eL.rotation.z = Math.PI / 2; eL.position.set(-.48, -.1, .18);
    const eR = eL.clone(); eR.position.z = -.18;
    const exLight = new THREE.PointLight(0x00aaff, 2, 3); exLight.position.set(-.6, 0, 0);
    [fuselage, cockpit, wL, wR, eL, eR, exLight].forEach(m => shipGroup.add(m));
    shipGroup.position.set(4, .5, 0); scene.add(shipGroup);

    // ═══════════════════════════════════════════════
    // ABOUT GROUP — Orange nebula
    const aboutGroup = new THREE.Group(); aboutGroup.position.y = -30;
    const nbCount = 1000, nbPos = new Float32Array(nbCount * 3), nbCol = new Float32Array(nbCount * 3);
    for (let i = 0; i < nbCount; i++) {
      const theta = Math.random() * Math.PI * 2, phi = Math.acos(2 * Math.random() - 1), r = 2 + Math.random() * 4;
      nbPos[i * 3] = r * Math.sin(phi) * Math.cos(theta); nbPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * .5; nbPos[i * 3 + 2] = r * Math.cos(phi);
      nbCol[i * 3] = 1; nbCol[i * 3 + 1] = .3 + Math.random() * .3; nbCol[i * 3 + 2] = .05;
    }
    const nbGeo = new THREE.BufferGeometry(); nbGeo.setAttribute("position", new THREE.BufferAttribute(nbPos, 3)); nbGeo.setAttribute("color", new THREE.BufferAttribute(nbCol, 3));
    aboutGroup.add(new THREE.Points(nbGeo, new THREE.PointsMaterial({ size: .18, vertexColors: true, transparent: true, opacity: .7, sizeAttenuation: true })));
    const coreStar = new THREE.Mesh(new THREE.SphereGeometry(.4, 32, 32), new THREE.MeshBasicMaterial({ color: 0xff8c00 }));
    const coreLight = new THREE.PointLight(0xff6b35, 4, 16); aboutGroup.add(coreStar); aboutGroup.add(coreLight);
    const debris: any[] = [];
    for (let i = 0; i < 20; i++) {
      const d = new THREE.Mesh(new THREE.DodecahedronGeometry(.04 + Math.random() * .1, 0), new THREE.MeshPhongMaterial({ color: 0xff6b35, emissive: 0x441100 }));
      const a = (i / 20) * Math.PI * 2, rr = 1.5 + Math.random() * 2;
      d.position.set(Math.cos(a) * rr, (Math.random() - .5) * .8, Math.sin(a) * rr);
      d.userData = { angle: a, speed: .004 + Math.random() * .004, rr };
      debris.push(d); aboutGroup.add(d);
    }
    scene.add(aboutGroup);

    // ═══════════════════════════════════════════════
    // SKILLS GROUP — Cyber grid
    const skillsGroup = new THREE.Group(); skillsGroup.position.y = -60;
    const gridHelper = new THREE.GridHelper(24, 24, 0x00ff88, 0x003322);
    (gridHelper.material as any).transparent = true; (gridHelper.material as any).opacity = .35;
    gridHelper.position.y = -2.5; skillsGroup.add(gridHelper);
    const skillCubes: any[] = [];
    for (let i = 0; i < 22; i++) {
      const c = new THREE.Mesh(new THREE.BoxGeometry(.14 + Math.random() * .24, .14 + Math.random() * .24, .14 + Math.random() * .24), new THREE.MeshPhongMaterial({ color: 0x00ff88, emissive: 0x003311, wireframe: Math.random() > .45, transparent: true, opacity: .7 }));
      c.position.set((Math.random() - .5) * 14, (Math.random() - .5) * 10, (Math.random() - .5) * 10 - 2);
      c.userData = { vx: (Math.random() - .5) * .003, vy: (Math.random() - .5) * .003, rz: (Math.random() - .5) * .02 };
      skillCubes.push(c); skillsGroup.add(c);
    }
    const holoLight = new THREE.PointLight(0x00ff88, 3, 14); holoLight.position.set(-5, 0, -3); skillsGroup.add(holoLight);
    const holo = new THREE.Mesh(new THREE.CylinderGeometry(.01, 1.4, 3.5, 6, 1, true), new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: .1, side: THREE.DoubleSide }));
    holo.position.set(-5, 0, -3); skillsGroup.add(holo);
    scene.add(skillsGroup);

    // ═══════════════════════════════════════════════
    // PROJECTS GROUP — Deep orbit planet
    const projGroup = new THREE.Group(); projGroup.position.y = -90;
    const bigPlanet = new THREE.Mesh(new THREE.SphereGeometry(1.8, 32, 32), new THREE.MeshPhongMaterial({ color: 0x1a003a, emissive: 0x0d0022, shininess: 60 }));
    bigPlanet.position.set(-4, 0, -10);
    const pr1 = new THREE.Mesh(new THREE.TorusGeometry(2.8, .06, 4, 100), new THREE.MeshBasicMaterial({ color: 0xff3cac, transparent: true, opacity: .6 }));
    const pr2 = new THREE.Mesh(new THREE.TorusGeometry(3.4, .03, 4, 100), new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: .35 }));
    pr1.rotation.x = pr2.rotation.x = Math.PI / 3; bigPlanet.add(pr1); bigPlanet.add(pr2); projGroup.add(bigPlanet);
    const pLight = new THREE.PointLight(0xff3cac, 2, 22); pLight.position.set(-4, 0, -6); projGroup.add(pLight);
    const sats: any[] = [];
    for (let i = 0; i < 5; i++) {
      const s = new THREE.Mesh(new THREE.IcosahedronGeometry(.12, 0), new THREE.MeshPhongMaterial({ color: 0xff3cac, emissive: 0x440011, wireframe: true }));
      s.userData = { angle: (i / 5) * Math.PI * 2, speed: .006 + i * .001, r: 6.5 + i * .4 };
      sats.push(s); projGroup.add(s);
    }
    const worm = new THREE.Mesh(new THREE.TorusGeometry(.8, .4, 16, 60), new THREE.MeshPhongMaterial({ color: 0x7c3aed, emissive: 0x330066, transparent: true, opacity: .7 }));
    worm.position.set(5, 1, -5); worm.rotation.y = Math.PI / 6; projGroup.add(worm);
    const wLight = new THREE.PointLight(0x7c3aed, 3, 9); wLight.position.copy(worm.position); projGroup.add(wLight);
    // Moon
    const moon = new THREE.Mesh(new THREE.SphereGeometry(.28, 16, 16), new THREE.MeshPhongMaterial({ color: 0x334466, emissive: 0x000011 }));
    projGroup.add(moon);
    scene.add(projGroup);

    // ═══════════════════════════════════════════════
    // EXPERIENCE GROUP — Star forge / sun
    const expGroup = new THREE.Group(); expGroup.position.y = -120;
    const sun = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffaa00 }));
    sun.position.set(5, 2, -14); expGroup.add(sun);
    const sunLight = new THREE.PointLight(0xfbbf24, 5, 45); sunLight.position.copy(sun.position); expGroup.add(sunLight);
    const coronaPos = new Float32Array(350 * 3);
    for (let i = 0; i < 350; i++) {
      const theta = Math.random() * Math.PI * 2, phi = Math.acos(2 * Math.random() - 1), r = 2.3 + Math.random() * .9;
      coronaPos[i * 3] = sun.position.x + r * Math.sin(phi) * Math.cos(theta); coronaPos[i * 3 + 1] = sun.position.y + r * Math.sin(phi) * Math.sin(theta); coronaPos[i * 3 + 2] = sun.position.z + r * Math.cos(phi);
    }
    const cGeo = new THREE.BufferGeometry(); cGeo.setAttribute("position", new THREE.BufferAttribute(coronaPos, 3));
    expGroup.add(new THREE.Points(cGeo, new THREE.PointsMaterial({ color: 0xff8800, size: .12, transparent: true, opacity: .6 })));
    const orbitals: any[] = [];
    [[.3, 0x3366ff, .012], [.5, 0xff4400, .008], [.22, 0x44ff88, .015]].forEach(([sz, col, spd], i) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(sz as number, 16, 16), new THREE.MeshPhongMaterial({ color: col as number, emissive: 0x111111 }));
      m.userData = { angle: i * 2.1, speed: spd as number, r: 4 + i * 1.5, sp: sun.position };
      orbitals.push(m); expGroup.add(m);
    });
    // Asteroid belt
    const asteroids: any[] = [];
    for (let i = 0; i < 35; i++) {
      const a = new THREE.Mesh(new THREE.DodecahedronGeometry(.04 + Math.random() * .09, 0), new THREE.MeshPhongMaterial({ color: 0x556677, emissive: 0x111122 }));
      const angle = (i / 35) * Math.PI * 2, rr = 8 + Math.random() * 3;
      a.position.set(Math.cos(angle) * rr + sun.position.x, (Math.random() - .5) * 2 + sun.position.y, Math.sin(angle) * rr + sun.position.z);
      a.userData = { angle, speed: .0003 + Math.random() * .0004, rr, sp: sun.position };
      asteroids.push(a); expGroup.add(a);
    }
    scene.add(expGroup);

    // ═══════════════════════════════════════════════
    // SERVICES GROUP — Pulse array
    const servGroup = new THREE.Group(); servGroup.position.y = -150;
    const pulseRings: any[] = [];
    for (let i = 0; i < 10; i++) {
      const r = new THREE.Mesh(new THREE.TorusGeometry(.5 + i * .7, .012, 8, 80), new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x00d4ff : 0x00ff88, transparent: true, opacity: .5 }));
      r.position.set(0, 0, -i * 1.4); r.userData = { phase: i * .4 };
      pulseRings.push(r); servGroup.add(r);
    }
    // colMesh removed per user request
    const colLight = new THREE.PointLight(0x00d4ff, 4, 14); servGroup.add(colLight);
    const hexes: any[] = [];
    for (let i = 0; i < 14; i++) {
      const h = new THREE.Mesh(new THREE.CylinderGeometry(.2, .2, .04, 6), new THREE.MeshPhongMaterial({ color: 0x00ff88, emissive: 0x003322, transparent: true, opacity: .6 }));
      const a = (i / 14) * Math.PI * 2; h.position.set(Math.cos(a) * 4.5, Math.sin(a * 2) * 1.2, Math.sin(a) * 4.5 - 2);
      hexes.push(h); servGroup.add(h);
    }
    scene.add(servGroup);

    // ═══════════════════════════════════════════════
    // CONTACT GROUP — Event horizon black hole
    const contactGroup = new THREE.Group(); contactGroup.position.y = -176;
    const accretionRings: any[] = [];
    for (let i = 0; i < 28; i++) {
      const hsl = new THREE.Color(); hsl.setHSL(.85 - i * .02, .9, .5 + i * .006);
      const r = new THREE.Mesh(new THREE.TorusGeometry(.6 + i * .17, .014 + i * .003, 6, 100), new THREE.MeshBasicMaterial({ color: hsl, transparent: true, opacity: .7 - i * .022 }));
      r.rotation.x = Math.PI / 2 + i * .014; r.userData = { phase: i * .14, speed: .007 + i * .001 };
      accretionRings.push(r); contactGroup.add(r);
    }
    contactGroup.add(new THREE.Mesh(new THREE.SphereGeometry(.55, 32, 32), new THREE.MeshBasicMaterial({ color: 0x000000 })));
    const ehLight = new THREE.PointLight(0xff3cac, 5, 22); ehLight.position.set(0, 0, 2); contactGroup.add(ehLight);
    const distPos = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) { const a = Math.random() * Math.PI * 2, r = .8 + Math.random() * 2.8; distPos[i * 3] = Math.cos(a) * r; distPos[i * 3 + 1] = (Math.random() - .5) * .3; distPos[i * 3 + 2] = Math.sin(a) * r; }
    const dGeo = new THREE.BufferGeometry(); dGeo.setAttribute("position", new THREE.BufferAttribute(distPos, 3));
    contactGroup.add(new THREE.Points(dGeo, new THREE.PointsMaterial({ color: 0xff3cac, size: .055, transparent: true, opacity: .75 })));
    scene.add(contactGroup);

    // Lights
    scene.add(new THREE.AmbientLight(0x112244, 2));
    const pl1 = new THREE.PointLight(0x00d4ff, 3, 30); pl1.position.set(0, 0, 3); scene.add(pl1);
    const pl2 = new THREE.PointLight(0x7c3aed, 2, 25); pl2.position.set(-5, 5, -5); scene.add(pl2);

    let mx = 0, my = 0, camTx = 0, camTy = 0, sy = 0, shipAngle = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX / innerWidth - .5) * 2; my = -(e.clientY / innerHeight - .5) * 2; };
    const onScroll = () => { sy = window.scrollY; };
    const onResize = () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); };
    addEventListener("mousemove", onMouse); addEventListener("scroll", onScroll); addEventListener("resize", onResize);

    let alive = true;
    let rafId: number | null = null;
    (function loop() {
      if (!alive) return;
      rafId = requestAnimationFrame(loop);
      const t = Date.now() * .001;

      // Camera travel
      const totalH = document.documentElement.scrollHeight - innerHeight;
      const prog = totalH > 0 ? sy / totalH : 0;
      const targetCamY = -prog * 180;
      camera.position.y += (targetCamY - camera.position.y) * .04;
      camTx += (mx - camTx) * .03; camTy += (my - camTy) * .03;
      camera.position.x += (camTx * 1.5 - camera.position.x) * .06;
      camera.position.z = 6 + Math.sin(prog * Math.PI) * .6;
      camera.lookAt(camera.position.x * .1, camera.position.y, 0);

      // SHARED — stars slow rotation
      stars.rotation.y = t * .00015; stars.rotation.x = t * .00007;
      stars.material.color.setHex(lightRef.current ? 0x0a0f1e : 0xffffff);

      // SHARED — big rings
      bigRings.forEach((r, i) => { r.rotation.z += .0006 * (i + 1); r.rotation.x += .0003 * (i + 1); });

      // SHARED — isos
      isos.forEach(m => { m.rotation.x += .005; m.rotation.y += .007; m.position.x += m.userData.vx; m.position.y += m.userData.vy; if (Math.abs(m.position.x) > 10) m.userData.vx *= -1; if (Math.abs(m.position.y) > 9) m.userData.vy *= -1; });

      // SHARED — octs
      octs.forEach(m => { m.rotation.x -= .006; m.rotation.z += .004; m.position.x += m.userData.vx; m.position.y += m.userData.vy; if (Math.abs(m.position.x) > 9) m.userData.vx *= -1; if (Math.abs(m.position.y) > 8) m.userData.vy *= -1; });

      // SHARED — cubes
      cubes.forEach(c => { c.rotation.x += .007; c.rotation.z += c.userData.rz; c.position.x += c.userData.vx; c.position.y += c.userData.vy; if (Math.abs(c.position.x) > 11) c.userData.vx *= -1; if (Math.abs(c.position.y) > 10) c.userData.vy *= -1; });

      // SHARED — comets
      comets.forEach(c => {
        c.position.x += c.userData.vx; c.position.y += c.userData.vy;
        if (c.position.x < -20) { c.position.x = c.userData.startX; c.position.y = c.userData.startY; c.position.z = c.userData.startZ; }
      });

      // SHARED — pl1 orbit
      pl1.position.x = Math.sin(t) * 4; pl1.position.y = Math.cos(t * .7) * 2.5;

      // HERO
      heroSphere.rotation.y += .008;
      warpRings.forEach((r, i) => { r.rotation.z += .004 + i * .0003; r.scale.setScalar(1 + .03 * Math.sin(t * 1.5 + i * .25)); });
      energyOrbs.forEach(o => { o.position.x = o.userData.ox + Math.sin(t * .7 + o.userData.phase) * 1.2; o.position.y = o.userData.oy + Math.cos(t * .5 + o.userData.phase) * .8; o.scale.setScalar(.8 + .3 * Math.sin(t * 3 + o.userData.phase)); });
      shipAngle += .005;
      shipGroup.position.x = Math.cos(shipAngle) * 4;
      shipGroup.position.z = Math.sin(shipAngle) * 4;
      shipGroup.position.y = Math.sin(shipAngle * 1.5) * 1;
      shipGroup.rotation.y = -shipAngle + Math.PI / 2;
      shipGroup.rotation.z = Math.sin(shipAngle * 1.5) * .12;
      exLight.intensity = 1.8 + Math.sin(t * 8) * .5;

      // ABOUT
      const nArr = nbGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < nArr.length; i += 3) nArr[i] += .0005 * Math.sin(t * .8 + i * .08);
      nbGeo.attributes.position.needsUpdate = true;
      coreStar.scale.setScalar(.88 + .18 * Math.sin(t * 2));
      coreLight.intensity = 3 + 2.5 * Math.sin(t * 1.5);
      debris.forEach(d => { d.userData.angle += d.userData.speed; d.position.x = Math.cos(d.userData.angle) * d.userData.rr; d.position.z = Math.sin(d.userData.angle) * d.userData.rr; d.rotation.x += .01; });

      // SKILLS
      skillCubes.forEach(c => { c.rotation.x += .008; c.rotation.z += c.userData.rz; c.position.x += c.userData.vx; c.position.y += c.userData.vy; if (Math.abs(c.position.x) > 7) c.userData.vx *= -1; if (Math.abs(c.position.y) > 5) c.userData.vy *= -1; });
      holo.rotation.y += .008; holoLight.intensity = 2 + 1.8 * Math.sin(t * 3);
      gridHelper.position.y = -2.5 + .12 * Math.sin(t * .5);

      // PROJECTS
      bigPlanet.rotation.y += .003; pr1.rotation.z += .004; pr2.rotation.z -= .002;
      sats.forEach(s => { s.userData.angle += s.userData.speed; s.position.x = Math.cos(s.userData.angle) * s.userData.r - 4; s.position.z = Math.sin(s.userData.angle) * s.userData.r - 10; s.rotation.x += .01; });
      worm.rotation.z += .006; worm.scale.setScalar(.94 + .09 * Math.sin(t * 2));
      pLight.intensity = 1.5 + 1.2 * Math.sin(t * 1.8);
      moon.position.x = bigPlanet.position.x + Math.cos(t * .5) * 2.8;
      moon.position.z = bigPlanet.position.z + Math.sin(t * .5) * 2.8;
      moon.position.y = bigPlanet.position.y + Math.sin(t * .3) * .5;

      // EXPERIENCE
      sun.rotation.y += .004; sun.scale.setScalar(1 + .022 * Math.sin(t * 1.2));
      orbitals.forEach(o => { o.userData.angle += o.userData.speed; const sp = o.userData.sp; const r = o.userData.r; o.position.x = sp.x + Math.cos(o.userData.angle) * r; o.position.z = sp.z + Math.sin(o.userData.angle) * r; o.position.y = sp.y + Math.sin(o.userData.angle * .7) * .5; o.rotation.y += .01; });
      sunLight.intensity = 4 + 2 * Math.sin(t * .8);
      asteroids.forEach(a => { a.userData.angle += a.userData.speed; const sp = a.userData.sp; a.position.x = sp.x + Math.cos(a.userData.angle) * a.userData.rr; a.position.z = sp.z + Math.sin(a.userData.angle) * a.userData.rr; a.rotation.x += .01; });

      // SERVICES
      pulseRings.forEach((r, i) => { r.rotation.z += .003 * (i % 2 === 0 ? 1 : -1); (r.material as any).opacity = .28 + .28 * Math.sin(t * 2 + r.userData.phase); r.scale.setScalar(.93 + .1 * Math.sin(t * 1.5 + r.userData.phase)); });
      hexes.forEach((h, i) => { h.rotation.y += .01; h.position.y = Math.sin(t * .8 + i * .5) * 1.3; });
      colLight.intensity = 3 + 2.5 * Math.sin(t * 4);

      // CONTACT
      accretionRings.forEach(r => { r.rotation.z += r.userData.speed * (Math.random() > .5 ? 1 : -1); r.rotation.x = Math.PI / 2 + Math.sin(t * .3 + r.userData.phase) * .06; });
      ehLight.intensity = 4 + 3 * Math.sin(t * 2.5);

      try {
        renderer.render(scene, camera);
      } catch { }
    })();

    return () => {
      alive = false;
      if (rafId) cancelAnimationFrame(rafId);
      removeEventListener("mousemove", onMouse);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
      try {
        scene.clear();
        renderer.dispose();
      } catch { }
    };
  }

  // ── cursor ────────────────────────────────────────────────────────
  useEffect(() => {
    let cx = 0, cy = 0, tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; if (cursorDotRef.current) { cursorDotRef.current.style.left = tx + "px"; cursorDotRef.current.style.top = ty + "px"; } };
    document.addEventListener("mousemove", onMove);
    let alive = true;
    (function loop() { if (!alive) return; cx += (tx - cx) * .12; cy += (ty - cy) * .12; if (cursorRef.current) { cursorRef.current.style.left = cx - 10 + "px"; cursorRef.current.style.top = cy - 10 + "px"; } requestAnimationFrame(loop); })();
    return () => { alive = false; document.removeEventListener("mousemove", onMove); };
  }, []);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);
  const heroT = (d: number) => ({ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(28px)", transition: `opacity 1s ease ${d}s, transform 1s ease ${d}s` });

  // ── light mode tokens ─────────────────────────────────────────────
  const ac = theme.color;
  const ac2 = theme.color2;
  const textPri = light ? "#0a0f1e" : "#ffffff";
  const textSec = light ? "#2a2a4a" : "rgba(255,255,255,.55)";
  const textMut = light ? "#5a5a8a" : "rgba(255,255,255,.32)";
  const navBg = light ? "rgba(240,245,255,.88)" : "rgba(2,4,8,.65)";
  const inputBg = light ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.04)";
  const inputBdr = light ? `${ac}40` : "rgba(255,255,255,.12)";

  function gradH(ac: string, ac2: string): import("csstype").Property.Background<string | number> {
    return `linear-gradient(180deg, ${ac}, ${ac2})`;
  }

  // ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Space Grotesk', sans-serif;
          background: ${light ? "#e8eeff" : "#020408"};
          color: ${textPri};
          overflow-x: hidden;
          transition: background 1s ease, color .6s ease;
        }
        ::selection { background: ${ac}; color: ${light ? "#fff" : "#000"}; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${ac}; border-radius: 2px; }

        @keyframes floatUp { 0%{transform:translateY(100vh) scale(0);opacity:0} 10%{opacity:.8} 90%{opacity:.25} 100%{transform:translateY(-10vh);opacity:0} }
        @keyframes orbitSpin { from{transform:translate(-50%,-50%) rotate(0)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes scrollPulse { 0%,100%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} }
        @keyframes sectionGlow { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes warpFly { 0%{transform:translateZ(-8px) scale(.3);opacity:0} 100%{transform:translateZ(0) scale(1);opacity:1} }
        @keyframes pulse { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes heroGradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }


        .orbit-1 { animation: orbitSpin 8s linear infinite; }
        .orbit-2 { animation: orbitSpin 14s linear infinite reverse; }
        .orbit-3 { animation: orbitSpin 22s linear infinite; }
        .scroll-pulse { animation: scrollPulse 2s ease-in-out infinite; }
        .zone-dot { animation: sectionGlow 2s ease-in-out infinite; }
        .availability-dot { animation: pulse 2s ease-in-out infinite; }

        /* Light mode canvas overlay */
        #light-overlay {
          position: fixed; 
          inset: 0; 
          pointer-events: none; 
          z-index: 0;
        }

        /* Hamburger */
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 2px; border-radius: 2px; transition: all .3s ease; }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex; }
          .mobile-menu {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 200;
            display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2rem;
            background: ${light ? "rgba(232,238,255,.97)" : "rgba(2,4,8,.97)"};
            backdrop-filter: blur(24px);
            transform: ${menuOpen ? "translateX(0)" : "translateX(100%)"};
            transition: transform .4s cubic-bezier(.16,1,.3,1);
          }
          .section-nav { display: none !important; }
          .stat-row { gap: 1.5rem !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .skills-grid-inner { grid-template-columns: repeat(2, 1fr) !important; }
          .projects-grid-inner { grid-template-columns: 1fr !important; }
          .services-grid-inner { grid-template-columns: 1fr !important; }
          .about-grid-inner { grid-template-columns: 1fr !important; }
          .timeline-inner { padding-left: 1.5rem !important; }
          .hero-name { font-size: clamp(2.8rem,12vw,5rem) !important; }
          .hero-cta { flex-direction: column !important; align-items: center !important; }
        }

        .hero-name {
          background-size: 200% auto !important;
          animation: heroGradient 6s ease infinite;
        }

        .btn-gradient-shadow {
          position: relative;
        }
        .btn-gradient-shadow::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: inherit;
          background-image: inherit;
          background-size: inherit;
          animation: heroGradient 4s linear infinite;
          filter: blur(15px);
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .btn-gradient-shadow:hover::before {
          opacity: 0.65;
          transform: translateY(4px) scale(1.05);
        }

        @media (max-width: 480px) {
          .skills-grid-inner { grid-template-columns: repeat(2, 1fr) !important; }
          .nav-logo-text { font-size: .95rem !important; }
        }

        .space-input {
          background: ${inputBg}; border: 1px solid ${inputBdr}; border-radius: 8px;
          padding: .85rem 1.2rem; color: ${textPri}; font-family: 'Space Grotesk', sans-serif;
          font-size: .9rem; width: 100%; outline: none;
          transition: border-color .3s, box-shadow .3s;
        }
        .space-input::placeholder { color: ${textMut}; }
        .space-input:focus { border-color: ${ac}; box-shadow: 0 0 20px ${ac}22; }

        .card-hover {
          transition: all .35s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px) scale(1.01);
        }
      `}</style>

      {/* canvas */}
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />
      <div id="light-overlay" />

      {/* ambient particles */}
      <div style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none", overflow: "hidden" }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} style={{
            position: "absolute", borderRadius: "50%",
            width: Math.random() * 2.5 + .8, height: Math.random() * 2.5 + .8,
            left: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? ac : ac2,
            opacity: Math.random() * .35 + .08,
            animation: `floatUp ${Math.random() * 12 + 10}s ${Math.random() * 8}s linear infinite`,
            transition: "background 1s ease",
          }} />
        ))}
      </div>

      {/* cursor — hidden on touch & mobile */}
      <div ref={cursorRef} className="custom-cursor" style={{ position: "fixed", pointerEvents: "none", zIndex: 9999, width: 20, height: 20, border: `1px solid ${ac}`, borderRadius: "50%", transition: "border-color .5s, width .3s, height .3s" }} />
      <div ref={cursorDotRef} className="custom-cursor" style={{ position: "fixed", pointerEvents: "none", zIndex: 9999, width: 5, height: 5, background: ac, borderRadius: "50%", transform: "translate(-50%,-50%)", transition: "background .5s" }} />

      {/* section dot navigator */}
      <div className="section-nav" style={{ position: "fixed", bottom: "2rem", right: "1.5rem", zIndex: 50, display: "flex", flexDirection: "column", gap: ".45rem", alignItems: "flex-end" }}>
        {SECTION_THEMES.map((s, i) => (
          <button key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
            style={{ display: "flex", alignItems: "center", gap: ".45rem", background: "transparent", border: "none", cursor: "pointer", opacity: activeSection === i ? 1 : .3, transition: "opacity .4s, transform .3s", transform: activeSection === i ? "translateX(0)" : "translateX(6px)" }}>
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: ".5rem", letterSpacing: ".18em", color: s.color, textTransform: "uppercase", opacity: activeSection === i ? 1 : 0, transition: "opacity .3s" }}>{s.name}</span>
            <div style={{ width: activeSection === i ? 22 : 5, height: 2, background: s.color, borderRadius: 2, transition: "width .4s ease", boxShadow: activeSection === i ? `0 0 8px ${s.color}` : "none" }} />
          </button>
        ))}
      </div>

      {/* ════ NAV ══════════════════════════════════════════════════ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem", backdropFilter: "blur(24px)", background: navBg, borderBottom: `1px solid ${ac}18`, transition: "background 1s ease, border-color .8s ease" }}>

        <NavLogo ac={ac} ac2={ac2} />

        {/* desktop links */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <ul style={{ display: "flex", gap: "1.8rem", listStyle: "none" }}>
            {NAV_LINKS.map(l => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} style={{ textDecoration: "none", color: textSec, fontSize: ".72rem", letterSpacing: ".15em", textTransform: "uppercase", transition: "color .3s", fontFamily: "'Space Grotesk',sans-serif" }}
                  onMouseEnter={e => e.currentTarget.style.color = ac}
                  onMouseLeave={e => e.currentTarget.style.color = textSec}
                >{l}</a>
              </li>
            ))}
          </ul>

          <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: ".52rem", letterSpacing: ".22em", color: ac, border: `1px solid ${ac}35`, padding: ".28rem .7rem", borderRadius: 50, textTransform: "uppercase", display: "flex", alignItems: "center", gap: ".4rem", transition: "color .8s, border-color .8s" }}>
            <div className="zone-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: ac, boxShadow: `0 0 6px ${ac}` }} />
            {theme.name}
          </div>

          <button onClick={() => setLight(v => !v)} style={{ fontFamily: "'Orbitron',sans-serif", fontSize: ".62rem", letterSpacing: ".18em", border: `1px solid ${ac}`, color: ac, background: `${ac}10`, padding: ".38rem .9rem", borderRadius: 50, cursor: "pointer", textTransform: "uppercase", transition: "all .4s" }}>
            {light ? "🌌 Night" : "☄️ Light"}
          </button>
        </div>

        {/* mobile right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={() => setLight(v => !v)} style={{ fontFamily: "'Orbitron',sans-serif", fontSize: ".6rem", border: `1px solid ${ac}`, color: ac, background: `${ac}10`, padding: ".32rem .75rem", borderRadius: 50, cursor: "pointer", display: "none" }} className="mobile-theme-btn">
            {light ? "🌌" : "☄️"}
          </button>
          <div className="hamburger" onClick={() => setMenuOpen(v => !v)}>
            <span style={{ background: ac, transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ background: ac, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ background: ac, transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </div>
        </div>
      </nav>

      {/* mobile menu */}
      <div className="mobile-menu">
        <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "transparent", border: "none", cursor: "pointer", fontFamily: "'Orbitron',sans-serif", fontSize: ".7rem", letterSpacing: ".2em", color: ac }}>✕ Close</button>
        {NAV_LINKS.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
            style={{ textDecoration: "none", color: textPri, fontSize: "1.4rem", fontFamily: "'Orbitron',sans-serif", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", transition: "color .3s" }}
            onMouseEnter={e => e.currentTarget.style.color = ac}
            onMouseLeave={e => e.currentTarget.style.color = textPri}
          >{l}</a>
        ))}

      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "6rem 1.5rem 3rem", position: "relative", zIndex: 3, }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,transparent 25%,rgba(0,0,0,.5) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
          <div style={{ ...heroT(.05), display: "inline-flex", alignItems: "center", gap: ".5rem", marginBottom: "1.5rem", padding: ".32rem 1rem", borderRadius: 50, border: `1px solid ${SECTION_THEMES[0].color}35`, background: `${SECTION_THEMES[0].color}0a`, fontFamily: "'Orbitron',sans-serif", fontSize: ".58rem", letterSpacing: ".28em", color: SECTION_THEMES[0].color, textTransform: "uppercase" }}>
            <span className="availability-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: SECTION_THEMES[0].color, boxShadow: `0 0 8px ${SECTION_THEMES[0].color}`, display: "inline-block" }} />
            Architect of the Future Web
          </div>
          <div style={{ ...heroT(.2), fontFamily: "'Orbitron',sans-serif", fontSize: ".68rem", letterSpacing: ".45em", color: SECTION_THEMES[0].color, textTransform: "uppercase", marginBottom: ".9rem" }}>
            Senior Frontend Engineer
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1, type: "spring", stiffness: 80, damping: 18
            }}
            className="hero-name"
            style={{
              ...heroT(.38),
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(3rem, 10vw, 8rem)",
              fontWeight: 900,
              lineHeight: .92,
              letterSpacing: "-.02em",
              marginBottom: "1.4rem",
              width: "fit-content",
              backgroundImage: light
                ? "linear-gradient(135deg, #000000ff 0%, #13aaff 45%, #833aed 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #00d4ff 45%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Mazen<br />AbuTahoun
          </motion.h1>
          <p style={{ ...heroT(.6), fontSize: "clamp(.9rem,2.5vw,1.25rem)", color: light ? "rgba(10,15,46,.6)" : "rgba(255,255,255,.5)", marginBottom: "2rem", letterSpacing: ".04em", maxWidth: 520, margin: "0 auto 2rem" }}>
            Crafting Digital Universes &amp; Immersive Experiences
          </p>

          <div className="hero-cta" style={{ ...heroT(.95), display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#projects" style={{ display: "inline-block", padding: ".82rem 2rem", borderRadius: 50, background: `linear-gradient(135deg,${SECTION_THEMES[0].color},${SECTION_THEMES[0].color2})`, color: "#fff", fontFamily: "'Orbitron',sans-serif", fontSize: ".68rem", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 700, textDecoration: "none", transition: "transform .3s, box-shadow .3s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 35px ${SECTION_THEMES[0].color}45`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
            >View Work</a>
            <a href="#contact" style={{ display: "inline-block", padding: ".82rem 2rem", borderRadius: 50, border: `1px solid ${SECTION_THEMES[0].color}`, color: SECTION_THEMES[0].color, fontFamily: "'Orbitron',sans-serif", fontSize: ".68rem", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 700, textDecoration: "none", background: `${SECTION_THEMES[0].color}0d`, transition: "transform .3s, box-shadow .3s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 35px ${SECTION_THEMES[0].color}25`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
            >Contact Me</a>
          </div>

          <div style={{ ...heroT(1.2), position: "absolute", bottom: "-6rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem" }}>
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: ".55rem", letterSpacing: ".3em", color: light ? "rgba(10,15,46,.4)" : "rgba(255,255,255,.28)", textTransform: "uppercase" }}>Enter the void</span>
            <div className="scroll-pulse" style={{ width: 1, height: 55, background: `linear-gradient(to bottom,${SECTION_THEMES[0].color},transparent)` }} />
          </div>

        </div>

      </section>

      <GDiv light={light} />

      {/* ════ ABOUT ════════════════════════════════════════════════ */}
      <section id="about" style={{ minHeight: "100vh", padding: "7rem 1.5rem", position: "relative", zIndex: 3, display: "flex", alignItems: "center", background: light ? `radial-gradient(ellipse at 30% 50%,${SECTION_THEMES[1].color}08 0%,transparent 60%)` : `radial-gradient(ellipse at 30% 50%,${SECTION_THEMES[1].color}05 0%,transparent 60%)` }}>
        <div style={{ position: "absolute", top: "2.5rem", left: "50%", transform: "translateX(-50%)", fontFamily: "'Orbitron',sans-serif", fontSize: ".55rem", letterSpacing: ".45em", color: SECTION_THEMES[1].color, textTransform: "uppercase", opacity: .45, whiteSpace: "nowrap" }}>
          ✦ Entering {SECTION_THEMES[1].name} ✦
        </div>
        <div className="about-grid-inner" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", width: "100%" }}>
          <SpaceIn>
            <SL color={SECTION_THEMES[1].color}>Origin Story</SL>
            <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.9rem,5vw,3.1rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: "1.4rem" }}>
              <GT c1={SECTION_THEMES[1].color} c2={SECTION_THEMES[1].color2}>Engineer.</GT>
              <br /><span style={{ color: textPri }}>Creator.</span><br /><span style={{ color: textPri }}>Visionary.</span>
            </h2>
            <p style={{ color: textSec, lineHeight: 1.95, marginBottom: "1.4rem", fontSize: "1rem" }}>I am Mazen Abutahoun — a Senior Frontend Engineer who builds experiences that transcend conventional web design. I don't just write code; I architect digital worlds that breathe, react, and inspire.</p>
            <p style={{ color: textSec, lineHeight: 1.95, fontSize: "1rem" }}>With deep expertise across the modern frontend stack, I bridge engineering precision with creative artistry — crafting interfaces that feel alive, intelligent, and genuinely unforgettable.</p>
            <div className="stat-row" style={{ display: "flex", gap: "2.5rem", marginTop: "2.2rem" }}>
              {[["2+", "Years"], ["10+", "Projects"], ["∞", "Ambition"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "2.3rem", fontWeight: 900, background: gradH(SECTION_THEMES[1].color, SECTION_THEMES[1].color2), WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
                  <div style={{ fontSize: ".68rem", letterSpacing: ".2em", color: textMut, textTransform: "uppercase", marginTop: ".28rem" }}>{l}</div>
                </div>
              ))}
            </div>
          </SpaceIn>
          <SpaceIn delay={.2} className="hidden md:flex" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 300, height: 300 }}>
              {[{ cls: "orbit-1", sz: 90 }, { cls: "orbit-2", sz: 172 }, { cls: "orbit-3", sz: 278 }].map(({ cls, sz }) => (
                <div key={cls} className={cls} style={{ position: "absolute", top: "50%", left: "50%", width: sz, height: sz, border: `1px solid ${SECTION_THEMES[1].color}30`, borderRadius: "50%", transform: "translate(-50%,-50%)" }}>
                  <div style={{ position: "absolute", top: -4, left: "50%", marginLeft: -4, width: 8, height: 8, borderRadius: "50%", background: SECTION_THEMES[1].color, boxShadow: `0 0 12px ${SECTION_THEMES[1].color}` }} />
                </div>
              ))}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 38, height: 38, borderRadius: "50%", background: SECTION_THEMES[1].color, boxShadow: `0 0 30px 12px ${SECTION_THEMES[1].color}45`, opacity: .85 }} />
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Orbitron',sans-serif", fontSize: ".68rem", letterSpacing: ".18em", color: light ? "#0a0f1e" : "#fff", textAlign: "center", lineHeight: 2, marginTop: 52 }}>MAZEN<br />CORE</div>
            </div>
          </SpaceIn>
        </div>
      </section>

      <GDiv light={light} />

      {/* ════ SKILLS ═══════════════════════════════════════════════ */}
      <section id="skills" style={{ minHeight: "100vh", padding: "7rem 1.5rem", position: "relative", zIndex: 3, background: light ? `radial-gradient(ellipse at 70% 50%,${SECTION_THEMES[2].color}08 0%,transparent 60%)` : `radial-gradient(ellipse at 70% 50%,${SECTION_THEMES[2].color}04 0%,transparent 60%)` }}>
        <div style={{ position: "absolute", top: "2.5rem", left: "50%", transform: "translateX(-50%)", fontFamily: "'Orbitron',sans-serif", fontSize: ".55rem", letterSpacing: ".45em", color: SECTION_THEMES[2].color, textTransform: "uppercase", opacity: .45, whiteSpace: "nowrap" }}>
          ✦ Entering {SECTION_THEMES[2].name} ✦
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <SpaceIn><SL color={SECTION_THEMES[2].color}>Tech Arsenal</SL></SpaceIn>
          <SpaceIn delay={.1}>
            <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.9rem,5vw,3.1rem)", fontWeight: 900, background: gradH(SECTION_THEMES[2].color, SECTION_THEMES[2].color2), WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "2.5rem" }}>Skill Matrix</h2>
          </SpaceIn>
          <SpaceIn delay={.2}>
            <Cubes
              cols={6}
              rows={4}
              maxAngle={48}
              radius={2.5}
              cellGap={34}
              borderStyle={light ? "2px dashed rgba(0, 180, 100, 0.65)" : `2px dashed ${SECTION_THEMES[2].color}aa`}
              faceColor={light ? "rgba(240, 255, 245, 0.95)" : "rgba(8, 28, 18, 0.95)"}
              rippleColor={SECTION_THEMES[2].color}
              rippleSpeed={1.5}
              autoAnimate
              rippleOnClick
              skills={SKILLS}
              accentColor={SECTION_THEMES[2].color}
              textPri={textPri}
              light={light}
            />
          </SpaceIn>
        </div>
      </section>

      <GDiv light={light} />

      {/* ════ PROJECTS ═════════════════════════════════════════════ */}
      <section id="projects" style={{ minHeight: "100vh", padding: "7rem 1.5rem", position: "relative", zIndex: 3, background: light ? `radial-gradient(ellipse at 50% 60%,${SECTION_THEMES[3].color}08 0%,transparent 60%)` : `radial-gradient(ellipse at 50% 60%,${SECTION_THEMES[3].color}04 0%,transparent 60%)` }}>
        <div style={{ position: "absolute", top: "2.5rem", left: "50%", transform: "translateX(-50%)", fontFamily: "'Orbitron',sans-serif", fontSize: ".55rem", letterSpacing: ".45em", color: SECTION_THEMES[3].color, textTransform: "uppercase", opacity: .45, whiteSpace: "nowrap" }}>
          ✦ Entering {SECTION_THEMES[3].name} ✦
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <SpaceIn><SL color={SECTION_THEMES[3].color}>Flagship Endeavors</SL></SpaceIn>
          <SpaceIn delay={.1}>
            <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.9rem,5vw,3.1rem)", fontWeight: 900, background: `linear-gradient(135deg,${SECTION_THEMES[3].color},${SECTION_THEMES[3].color2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: ".6rem" }}>Major Projects</h2>
            <p style={{ color: textSec, fontSize: ".88rem", marginBottom: "2.5rem", maxWidth: 620, lineHeight: 1.6 }}>A curated selection of my primary, large-scale systems and flagship engineering projects.</p>
          </SpaceIn>
          <div className="projects-grid-inner" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.6rem" }}>
            {PROJECTS.map((p, i) => (
              <SpaceIn key={p.name} delay={i * .11}>
                <div style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${SECTION_THEMES[3].color}18`, transition: "all .5s ease", cursor: "pointer" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${SECTION_THEMES[3].color}55`; el.style.transform = "translateY(-8px) scale(1.01)"; el.style.boxShadow = `0 28px 70px rgba(0,0,0,.35),0 0 35px ${SECTION_THEMES[3].color}18`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${SECTION_THEMES[3].color}18`; el.style.transform = ""; el.style.boxShadow = "none"; }}
                >
                  <div style={{ height: 195, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.8rem", position: "relative", overflow: "hidden", transition: "transform .6s ease" }}>
                    {p.emoji}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(6,0,8,.92),transparent 55%)" }} />
                    <div style={{ position: "absolute", top: 0, right: 0, width: 55, height: 55, background: `radial-gradient(${SECTION_THEMES[3].color}35,transparent 70%)` }} />
                  </div>
                  <div style={{ padding: "1.4rem", background: light ? "rgba(245,235,255,.92)" : "rgba(10,0,18,.88)", backdropFilter: "blur(20px)" }}>
                    <div style={{ display: "flex", gap: ".45rem", flexWrap: "wrap", marginBottom: ".7rem" }}>
                      {p.tags.map(t => <span key={t} style={{ fontSize: ".58rem", letterSpacing: ".14em", color: SECTION_THEMES[3].color, border: `1px solid ${SECTION_THEMES[3].color}40`, padding: ".18rem .6rem", borderRadius: 50, textTransform: "uppercase" }}>{t}</span>)}
                    </div>
                    <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: ".95rem", fontWeight: 700, marginBottom: ".45rem", color: textPri }}>{p.name}</div>
                    <p style={{ fontSize: ".82rem", color: textSec, lineHeight: 1.75 }}>{p.desc}</p>
                    <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", marginTop: ".85rem", fontSize: ".7rem", letterSpacing: ".18em", color: SECTION_THEMES[3].color, textTransform: "uppercase", textDecoration: "none", transition: "gap .3s" }}
                      onMouseEnter={e => e.currentTarget.style.gap = ".75rem"}
                      onMouseLeave={e => e.currentTarget.style.gap = ".4rem"}
                    >Explore →</a>
                  </div>
                </div>
              </SpaceIn>
            ))}
          </div>
        </div>
      </section>

      <GDiv light={light} />

      {/* ════ EXPERIENCE ═══════════════════════════════════════════ */}
      <section id="experience" style={{ minHeight: "100vh", padding: "7rem 1.5rem", position: "relative", zIndex: 3, background: light ? `radial-gradient(ellipse at 20% 50%,${SECTION_THEMES[4].color}08 0%,transparent 60%)` : `radial-gradient(ellipse at 20% 50%,${SECTION_THEMES[4].color}04 0%,transparent 60%)` }}>
        <div style={{ position: "absolute", top: "2.5rem", left: "50%", transform: "translateX(-50%)", fontFamily: "'Orbitron',sans-serif", fontSize: ".55rem", letterSpacing: ".45em", color: SECTION_THEMES[4].color, textTransform: "uppercase", opacity: .45, whiteSpace: "nowrap" }}>
          ✦ Entering {SECTION_THEMES[4].name} ✦
        </div>
        <div style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}>
          <SpaceIn><SL color={SECTION_THEMES[4].color}>Career Journey</SL></SpaceIn>
          <SpaceIn delay={.1}>
            <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.9rem,5vw,3.1rem)", fontWeight: 900, background: `linear-gradient(135deg,${SECTION_THEMES[4].color},${SECTION_THEMES[4].color2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "2.5rem" }}>Experience</h2>
          </SpaceIn>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom,transparent,${SECTION_THEMES[4].color},${SECTION_THEMES[4].color2},transparent)` }} />
            {TIMELINE.map((item, i) => (
              <SpaceIn key={item.company} delay={i * .12} className="timeline-inner" style={{ paddingLeft: "2.5rem", paddingBottom: "2.5rem", position: "relative" }}>
                <div style={{ position: "absolute", left: -5, top: 6, width: 11, height: 11, borderRadius: "50%", background: SECTION_THEMES[4].color, boxShadow: `0 0 16px ${SECTION_THEMES[4].color},0 0 32px ${SECTION_THEMES[4].color}45` }} />
                <div style={{ background: light ? "rgba(255,255,255,.8)" : "rgba(10,8,0,.65)", border: `1px solid ${SECTION_THEMES[4].color}20`, borderRadius: 14, padding: "1.4rem 1.6rem", backdropFilter: "blur(12px)", transition: "border-color .3s, box-shadow .3s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${SECTION_THEMES[4].color}55`; el.style.boxShadow = `0 10px 35px ${SECTION_THEMES[4].color}12`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${SECTION_THEMES[4].color}20`; el.style.boxShadow = "none"; }}
                >
                  <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: ".58rem", letterSpacing: ".28em", color: SECTION_THEMES[4].color, textTransform: "uppercase", marginBottom: ".45rem" }}>{item.date}</div>
                  <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: textPri, marginBottom: ".28rem" }}>{item.company}</div>
                  <div style={{ fontSize: ".85rem", color: textSec, marginBottom: ".7rem" }}>{item.role}</div>
                  <div style={{ fontSize: ".82rem", color: textMut, lineHeight: 1.85 }}>{item.desc}</div>
                </div>
              </SpaceIn>
            ))}
          </div>
        </div>
      </section>

      <GDiv light={light} />

      {/* ════ SERVICES ═════════════════════════════════════════════ */}
      <section id="services" style={{ minHeight: "100vh", padding: "7rem 1.5rem", position: "relative", zIndex: 3, background: light ? `radial-gradient(ellipse at 80% 40%,${SECTION_THEMES[5].color}08 0%,transparent 60%)` : `radial-gradient(ellipse at 80% 40%,${SECTION_THEMES[5].color}04 0%,transparent 60%)` }}>
        <div style={{ position: "absolute", top: "2.5rem", left: "50%", transform: "translateX(-50%)", fontFamily: "'Orbitron',sans-serif", fontSize: ".55rem", letterSpacing: ".45em", color: SECTION_THEMES[5].color, textTransform: "uppercase", opacity: .45, whiteSpace: "nowrap" }}>
          ✦ Entering {SECTION_THEMES[5].name} ✦
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <SpaceIn><SL color={SECTION_THEMES[5].color}>Offerings</SL></SpaceIn>
          <SpaceIn delay={.1}>
            <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.9rem,5vw,3.1rem)", fontWeight: 900, background: `linear-gradient(135deg,${SECTION_THEMES[5].color},${SECTION_THEMES[5].color2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "2.5rem" }}>Services</h2>
          </SpaceIn>
          <div className="services-grid-inner" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "1.2rem" }}>
            {SERVICES.map((s, i) => (
              <SpaceIn key={s.num} delay={i * .07}>
                <div style={{ padding: "1.8rem", borderRadius: 16, cursor: "pointer", overflow: "hidden", position: "relative", border: `1px solid ${SECTION_THEMES[5].color}18`, background: light ? "rgba(255,255,255,.78)" : "rgba(0,10,10,.55)", backdropFilter: light ? "blur(12px)" : "blur(6px)", transition: "all .35s ease" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${SECTION_THEMES[5].color}55`; el.style.transform = "translateY(-5px)"; el.style.boxShadow = `0 18px 55px ${SECTION_THEMES[5].color}12`; el.style.background = light ? "rgba(255,255,255,.95)" : `${SECTION_THEMES[5].color}08`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${SECTION_THEMES[5].color}18`; el.style.transform = ""; el.style.boxShadow = "none"; el.style.background = light ? "rgba(255,255,255,.78)" : "rgba(0,10,10,.55)"; }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${SECTION_THEMES[5].color}55,transparent)`, opacity: .7 }} />
                  <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "2.6rem", fontWeight: 900, color: `${SECTION_THEMES[5].color2}20`, lineHeight: 1, marginBottom: ".9rem" }}>{s.num}</div>
                  <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: ".82rem", fontWeight: 700, letterSpacing: ".1em", marginBottom: ".7rem", color: textPri }}>{s.name}</div>
                  <div style={{ fontSize: ".82rem", color: textSec, lineHeight: 1.85 }}>{s.desc}</div>
                </div>
              </SpaceIn>
            ))}
          </div>
        </div>
      </section>

      <GDiv light={light} />

      {/* ════ CONTACT ══════════════════════════════════════════════ */}
      <section id="contact" style={{ minHeight: "100vh", padding: "7rem 1.5rem", position: "relative", zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center", background: light ? `radial-gradient(ellipse at 50% 50%,${SECTION_THEMES[6].color}08 0%,transparent 65%)` : `radial-gradient(ellipse at 50% 50%,${SECTION_THEMES[6].color}05 0%,transparent 65%)` }}>
        <div style={{ position: "absolute", top: "2.5rem", left: "50%", transform: "translateX(-50%)", fontFamily: "'Orbitron',sans-serif", fontSize: ".55rem", letterSpacing: ".45em", color: SECTION_THEMES[6].color, textTransform: "uppercase", opacity: .45, whiteSpace: "nowrap" }}>
          ✦ Entering {SECTION_THEMES[6].name} ✦
        </div>
        {/* decorative rings */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", overflow: "hidden", opacity: light ? .06 : .1 }}>
          {[180, 300, 420, 540].map(sz => (
            <div key={sz} style={{ position: "absolute", width: sz, height: sz, borderRadius: "50%", border: `1px solid ${SECTION_THEMES[6].color}`, animation: `orbitSpin ${sz / 18}s linear infinite ${sz % 60 === 0 ? "reverse" : ""}` }} />
          ))}
        </div>

        <SpaceIn style={{ maxWidth: 680, width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
          <SL color={SECTION_THEMES[6].color}>Transmission</SL>
          <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.9rem,5vw,3.4rem)", fontWeight: 900, background: `linear-gradient(135deg,${SECTION_THEMES[6].color},${SECTION_THEMES[6].color2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: ".9rem", lineHeight: 1.05 }}>
            Let's Build<br />the Future
          </h2>
          <p style={{ color: textSec, marginBottom: "2.2rem", fontSize: ".92rem", lineHeight: 1.9 }}>
            Have a vision? A project that pushes boundaries? Let's connect and create something extraordinary together.
          </p>
          <div style={{ display: "grid", gap: ".9rem", textAlign: "left" }}>
            <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".9rem" }}>
              {[["Name", "Your name", "text"], ["Email", "your@email.com", "email"]].map(([label, ph, type]) => (
                <div key={label}>
                  <label style={{ display: "block", marginBottom: ".45rem", fontFamily: "'Orbitron',sans-serif", fontSize: ".58rem", letterSpacing: ".28em", color: SECTION_THEMES[6].color, textTransform: "uppercase" }}>{label}</label>
                  <input type={type} placeholder={ph} className="space-input" />
                </div>
              ))}
            </div>
            <div>
              <label style={{ display: "block", marginBottom: ".45rem", fontFamily: "'Orbitron',sans-serif", fontSize: ".58rem", letterSpacing: ".28em", color: SECTION_THEMES[6].color, textTransform: "uppercase" }}>Subject</label>
              <input type="text" placeholder="What are we building?" className="space-input" />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: ".45rem", fontFamily: "'Orbitron',sans-serif", fontSize: ".58rem", letterSpacing: ".28em", color: SECTION_THEMES[6].color, textTransform: "uppercase" }}>Message</label>
              <textarea rows={4} placeholder="Tell me about your vision..." className="space-input" style={{ resize: "vertical" }} />
            </div>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}

              className="btn-gradient-shadow self-start rounded-full border-none text-white font-['Orbitron',sans-serif] text-[0.7rem] tracking-[0.22em] font-bold cursor-pointer uppercase transition-all duration-300 animate-[heroGradient_4s_linear_infinite]"
              style={{
                padding: "1.2rem 2.5rem",
                backgroundImage: `linear-gradient(135deg, ${SECTION_THEMES[6].color}, ${SECTION_THEMES[6].color2}, ${SECTION_THEMES[6].color})`,
                backgroundSize: "200% auto"
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-3px) scale(1.02)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; }}
            >Initiate Contact ↗
            </motion.button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "1.8rem", marginTop: "2.2rem", flexWrap: "wrap" }}>
            {SOCIALS.map(l => (
              <a key={l.name} href={l.url} target={l.name.toLowerCase() === "email" ? "_self" : "_blank"} style={{ color: textMut, fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase", textDecoration: "none", transition: "color .3s, text-shadow .3s, transform .3s", display: "inline-block" }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = l.color;
                  e.currentTarget.style.textShadow = `0 0 12px ${l.color}aa`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = textMut;
                  e.currentTarget.style.textShadow = "none";
                  e.currentTarget.style.transform = "";
                }}
              >{l.icon} {l.name}</a>
            ))}
          </div>

          <div style={{ marginTop: "4rem", paddingTop: "1.8rem", borderTop: `1px solid ${light ? "rgba(0,0,0,.08)" : "rgba(255,255,255,.06)"}`, fontSize: ".68rem", color: textMut, letterSpacing: ".22em", textTransform: "uppercase" }}>
            © 2025 Mazen Abutahoun — Architecting Tomorrow
          </div>
        </SpaceIn>
      </section>

      {/* mobile theme button in nav (CSS shows it on mobile) */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-theme-btn { display: block !important; }
          .nav-desktop { display: none !important; }
          .custom-cursor { display: none !important; }
        }
        @media (hover: none) and (pointer: coarse) {
          .custom-cursor { display: none !important; }
        }
        @media (max-width: 900px) {
          .cubes-custom-grid {
            grid-template-columns: repeat(6, 56px) !important;
            grid-template-rows: repeat(4, 56px) !important;
            gap: 16px !important;
            max-width: 100% !important;
          }
          .cubes-custom-grid .cube {
            width: 56px !important;
            height: 56px !important;
          }
        }
        @media (max-width: 600px) {
          .cubes-custom-grid {
            grid-template-columns: repeat(4, 48px) !important;
            grid-template-rows: repeat(6, 48px) !important;
            gap: 10px !important;
            max-width: 100% !important;
          }
          .cubes-custom-grid .cube {
            width: 48px !important;
            height: 48px !important;
          }
          .cubes-custom-grid .cube-icon {
            font-size: 1.25rem !important;
            margin-bottom: 0 !important;
          }
          .cubes-custom-grid .cube-name {
            font-size: 0.5rem !important;
          }
          .cubes-custom-grid .cube-cat {
            font-size: 0.35rem !important;
          }
        }
        @media (max-width: 400px) {
          .cubes-custom-grid {
            grid-template-columns: repeat(3, 44px) !important;
            grid-template-rows: repeat(8, 44px) !important;
            gap: 8px !important;
          }
          .cubes-custom-grid .cube {
            width: 44px !important;
            height: 44px !important;
          }
          .cubes-custom-grid .cube-icon {
            font-size: 1.15rem !important;
          }
          .cubes-custom-grid .cube-name {
            font-size: 0.44rem !important;
          }
          .cubes-custom-grid .cube-cat {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}