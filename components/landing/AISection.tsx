"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

const ICONS = [
  {
    label: "Instagram",
    startAngle: -Math.PI / 2,      // top
    radius: 115,
    speed: gsap.utils.random(5, 15) * 0.001,
    bg: "#E1306C",
    svg: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    startAngle: Math.PI / 2,       // bottom
    radius: 115,
    speed: gsap.utils.random(5, 15) * 0.001,
    bg: "#010101",
    svg: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    ),
  },
  {
    label: "Threads",
    startAngle: Math.PI,            // left
    radius: 115,
    speed: gsap.utils.random(5, 15) * 0.001,
    bg: "#1a1a1a",
    svg: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.848 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 012.062.1v-.57c0-.934-.299-1.684-.891-2.228-.63-.579-1.53-.871-2.677-.871-1.165 0-2.047.28-2.623.831-.52.497-.798 1.154-.828 1.953l-2.043-.204c.095-1.335.628-2.449 1.583-3.31C9.066 5.965 10.403 5.5 12.006 5.5c1.628 0 2.997.516 3.97 1.492.945.948 1.452 2.27 1.452 3.822v.494c.666.216 1.244.535 1.716.954 1.018.897 1.58 2.159 1.58 3.556 0 .188-.009.376-.027.562-.144 1.54-.848 2.955-2.026 4.099C17.143 21.74 15.054 22.5 12.186 24z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    startAngle: 0,                  // right
    radius: 115,
    speed: gsap.utils.random(5, 15) * 0.001,
    bg: "#FF0000",
    svg: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
];

export function AISection() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Mascot float
    gsap.to(mascotRef.current, {
      y: -8, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut",
    });

    // Ring rotation
    gsap.to(ring1Ref.current, { rotation: 360,  duration: gsap.utils.random(10, 15), repeat: -1, ease: "none" });
    gsap.to(ring2Ref.current, { rotation: -360, duration: gsap.utils.random(5, 25), repeat: -1, ease: "none" });

    // Orbit icons via ticker
    const angles = ICONS.map((icon) => icon.startAngle);

    const tick = () => {
      ICONS.forEach((icon, i) => {
        angles[i] += icon.speed;
        const el = iconRefs.current[i];
        if (!el) return;
        gsap.set(el, {
          x: Math.cos(angles[i]) * icon.radius,
          y: Math.sin(angles[i]) * icon.radius,
        });
      });
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <section className="w-full py-24 px-6" style={{ background: "linear-gradient(180deg, #EFF7F3 0%, #E8F0F8 100%)" }}>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-12">

        <ScrollReveal direction="left" className="flex-1">
          <h2 className="text-5xl font-black text-[#3BA87A] leading-tight">
            All with our<br />Solvi AI
          </h2>
        </ScrollReveal>

        {/* Orbit system */}
        <div ref={orbitRef} className="relative flex items-center justify-center" style={{ width: 300, height: 300 }}>
          {/* Dashed rings */}
          <div ref={ring1Ref} className="absolute rounded-full border-2 border-dashed border-red-400 opacity-60"
            style={{ width: 250, height: 250 }} />
          <div ref={ring2Ref} className="absolute rounded-full border-2 border-dashed border-blue-400 opacity-60"
            style={{ width: 185, height: 185 }} />

          {/* Center mascot */}
          <div ref={mascotRef} className="relative z-10 w-16 h-16 rounded-full overflow-hidden shadow-lg shadow-green-200">
            <Image src="/icon.png" alt="Solvi" fill sizes="64px" className="object-cover" />
          </div>

          {/* Orbiting icons */}
          {ICONS.map((icon, i) => (
            <div
              key={icon.label}
              ref={(el) => { iconRefs.current[i] = el; }}
              className="absolute top-1/2 left-1/2 z-20"
              style={{
                transform: `translate(calc(-50% + ${Math.cos(icon.startAngle) * icon.radius}px), calc(-50% + ${Math.sin(icon.startAngle) * icon.radius}px))`,
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                style={{ backgroundColor: icon.bg }}
                title={icon.label}
              >
                {icon.svg}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
