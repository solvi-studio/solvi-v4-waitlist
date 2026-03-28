"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { Mascot } from "@/components/ui/mascot";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Section drops down: clipPath reveals from top → bottom, curve stays throughout
      tl.fromTo(
        sectionRef.current,
        { clipPath: "inset(0 0 100% 0 round 0 0 50% 50% / 0 0 80px 80px)" },
        { clipPath: "inset(0 0 0% 0 round 0 0 50% 50% / 0 0 80px 80px)", duration: 1.1 }
      );

      // Content fades up after section is revealed
      tl.fromTo(
        ".hero-content",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[500px] bg-[#E8F4F0] overflow-hidden"
      style={{ borderRadius: "0 0 50% 50% / 0 0 80px 80px" }}
    >
      {/* Mascot slides in after section drop (delay matches clipPath duration) */}
      <Mascot delay={0.8} />

      {/* Hero content */}
      <div className="flex flex-col items-center text-center px-6 pt-16 pb-24 max-w-xl mx-auto">
        <h1 className="hero-content text-7xl font-black tracking-tight text-gray-900">
          Welcome
        </h1>

        <p className="hero-content mt-4 text-lg font-bold text-gray-900 flex flex-wrap items-center justify-center gap-2">
          to your new
          <span className="bg-[#F5C842] text-gray-900 font-bold px-4 py-1.5 rounded-full text-base">
            bookmark partner
          </span>
          organised
        </p>

        <p className="hero-content mt-5 text-sm text-gray-500 max-w-xs leading-relaxed">
          Scroll less aimlessly, create more intentionally. Everything you save, finally in one place
        </p>

        <a
          href="#download"
          className="hero-content mt-8 inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-[#73B7FF] text-black font-semibold text-sm hover:bg-[#9bdcee] transition-colors shadow-md shadow-blue-200"
        >
          Download Solvi
        </a>
      </div>
    </section>
  );
}
