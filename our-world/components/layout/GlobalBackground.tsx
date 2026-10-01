"use client";

// Subtle ambient particle coordinates (deterministic to ensure SSR & client match identically)
const ambientParticles = [
  { id: 1, top: "18%", left: "12%", size: 4, opacity: 0.25, duration: 9, delay: 0 },
  { id: 2, top: "28%", left: "82%", size: 6, opacity: 0.18, duration: 12, delay: 1.5 },
  { id: 3, top: "62%", left: "8%", size: 5, opacity: 0.2, duration: 10, delay: 3 },
  { id: 4, top: "75%", left: "88%", size: 4, opacity: 0.22, duration: 11, delay: 0.8 },
  { id: 5, top: "45%", left: "92%", size: 3, opacity: 0.15, duration: 8, delay: 2.2 },
  { id: 6, top: "85%", left: "22%", size: 5, opacity: 0.18, duration: 13, delay: 4 },
];

const ambientHearts = [
  { id: "h1", top: "22%", left: "86%", size: 14, opacity: 0.14, duration: 14, delay: 1 },
  { id: "h2", top: "70%", left: "14%", size: 12, opacity: 0.12, duration: 16, delay: 3.5 },
  { id: "h3", top: "38%", left: "6%", size: 10, opacity: 0.1, duration: 12, delay: 2 },
  { id: "h4", top: "82%", left: "78%", size: 16, opacity: 0.12, duration: 15, delay: 0.5 },
];

export function GlobalBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {/* Base warm background layer */}
      <div className="absolute inset-0 bg-background" />

      {/* Romantic ambient radial gradient orbs */}
      <div
        className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 200, 200, 0.45) 0%, rgba(255, 248, 239, 0) 70%)",
        }}
      />
      <div
        className="absolute top-1/4 -right-32 h-[600px] w-[600px] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(182, 111, 120, 0.25) 0%, rgba(243, 228, 214, 0) 70%)",
        }}
      />
      <div
        className="absolute -bottom-40 left-1/3 h-[550px] w-[550px] rounded-full blur-3xl opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(118, 41, 58, 0.16) 0%, rgba(255, 248, 239, 0) 75%)",
        }}
      />

      {/* Subtle paper grain / organic texture */}
      <div
        className="absolute inset-0 opacity-[0.032] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Minimal ambient floating particles and subtle decorative hearts with CSS-driven reduced motion support */}
      <div className="absolute inset-0 motion-reduce:hidden">
        {ambientParticles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-rose-muted/60 animate-pulse"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {ambientHearts.map((h) => (
          <svg
            key={h.id}
            viewBox="0 0 24 24"
            className="absolute text-rose-muted fill-current animate-float"
            style={{
              top: h.top,
              left: h.left,
              width: `${h.size}px`,
              height: `${h.size}px`,
              opacity: h.opacity,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
            }}
            aria-hidden="true"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ))}
      </div>
    </div>
  );
}
