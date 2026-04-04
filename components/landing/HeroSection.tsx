"use client";

import { Mascot } from "@/components/ui/mascot";
import { useUiStore } from "@/hooks/useUiStore";
import { gsap } from "@/lib/gsap";
import { RunTextAnim } from "@/transitions/RunTextAnim";
import { useEffect, useRef } from "react";
import { BeaconWrap } from "@/components/landing/testing";


export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const downloadButtonRef = useRef<HTMLAnchorElement>(null);
  const setCustomCursorText = useUiStore((s) => s.setCursorText);
  const setCurtainDone = useUiStore((s) => s.setCurtainDone);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setCurtainDone(),
      });

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
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.32 },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();

  }, [setCurtainDone]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-125 bg-[#E8F4F0] overflow-hidden h-[80vh]"
      style={{ borderRadius: "0 0 50% 50% / 0 0 80px 80px" }}
    >
      {/* Mascot slides in after section drop (delay matches clipPath duration) */}
      <Mascot delay={0.8} />

      {/* Hero content */}
      <div className="flex flex-col items-center text-center px-6 pt-16 pb-24 max-w-xl mx-auto ">
        <h1 className="hero-content text-7xl tracking-tight text-gray-900 font-editorial font-[800] italic">
          Welcome
        </h1>

        <p className="hero-content mt-4 text-lg font-bold text-gray-900 flex flex-wrap items-center justify-center gap-2 font-editorial font-[400] italic">
          to your new
          <div className="-rotate-1">
            <BeaconWrap color="#4F46E5" rayCount={20} gap={10} speed={1.5} sideWeight={2}>
              <span className="bg-[#F5C842] text-gray-900 font-bold px-4 py-1.5 rounded-full text-base">
                bookmark partner
              </span>
            </BeaconWrap>

          </div>
          organised
        </p>


        <p className="hero-content mt-5 text-sm text-gray-500 max-w-[350px] leading-relaxed font-inter font-[800]">
          Scroll less aimlessly, create more intentionally. Everything you save, finally in one place
        </p>

        <a
          ref={downloadButtonRef}
          href="#download"
          onMouseEnter={() => setCustomCursorText("yes click this")}
          onMouseLeave={() => setCustomCursorText("")}
          className="hero-content mt-8 inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-[#73B7FF] text-black font-semibold text-sm hover:bg-[#9bdcee] transition-colors shadow-md shadow-blue-200"
        >
          <span style={{ display: "inline-flex", lineHeight: 1.15 }} className="text-2xl font-bold text-black">
            {/* <RunTextAnim text="D" delay={0.3} len={3} total={0.41} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />
            <RunTextAnim text="o" delay={0.17} len={2} total={0.13} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />
            <RunTextAnim text="w" delay={1.08} len={3} total={0.22} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />
            <RunTextAnim text="n" delay={0.84} len={2} total={0.24} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />
            <RunTextAnim text="l" delay={0.63} len={2} total={0.44} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />
            <RunTextAnim text="o" delay={1.19} len={2} total={0.13} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />
            <RunTextAnim text="a" delay={1.06} len={2} total={0.23} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />
            <RunTextAnim text="d" delay={1.03} len={3} total={0.41} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} /> */}
            <RunTextAnim text="Download" delay={0.03} len={2} total={0.21} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />

            <div style={{ width: 12 }}>

            </div>
            <RunTextAnim text="Solvi" delay={0.03} len={3} total={0.41} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />

            {/* <RunTextAnim text="S" delay={1.23} len={3} total={0.41} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />
            <RunTextAnim text="o" delay={0.17} len={2} total={0.23} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />
            <RunTextAnim text="l" delay={0.63} len={2} total={0.14} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />
            <RunTextAnim text="v" delay={1.01} len={2} total={0.23} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />
            <RunTextAnim text="i" delay={0.42} len={2} total={0.14} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} /> */}
        </span>
        </a>
      </div>
    </section>
  );
}
